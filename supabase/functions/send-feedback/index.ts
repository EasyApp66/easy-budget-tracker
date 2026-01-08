import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://esm.sh/zod@3.23.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const FeedbackSchema = z.object({
  type: z.enum(['support', 'bug', 'suggestion']),
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
  userEmail: z.string().email("Invalid email format").max(255),
  userName: z.string().max(100).optional(),
});

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-FEEDBACK] ${step}${detailsStr}`);
};

// Rate limit: 10 requests per hour per user
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");
    
    // Parse and validate input
    const rawBody = await req.json();
    const parseResult = FeedbackSchema.safeParse(rawBody);
    
    if (!parseResult.success) {
      logStep("Validation failed", { errors: parseResult.error.errors });
      return new Response(
        JSON.stringify({ error: "Invalid input. Please check your data and try again." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    const { type, message, userEmail, userName } = parseResult.data;
    logStep("Request validated", { type, userEmail });

    // Get user for rate limiting (optional - feedback can be sent without auth)
    const authHeader = req.headers.get("Authorization");
    let userId: string | null = null;
    
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      userId = data.user?.id ?? null;
    }

    // Rate limiting for authenticated users
    if (userId) {
      const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
      const { data: recentCalls, error: countError } = await supabaseClient
        .from('rate_limits')
        .select('id')
        .eq('user_id', userId)
        .eq('function_name', 'send-feedback')
        .gte('created_at', oneHourAgo);

      if (!countError && recentCalls && recentCalls.length >= RATE_LIMIT) {
        logStep("Rate limit exceeded", { userId, count: recentCalls.length });
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again later." }),
          { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Record this request
      await supabaseClient
        .from('rate_limits')
        .insert({ user_id: userId, function_name: 'send-feedback' });
    }

    const subjectMap = {
      support: '🆘 Support Anfrage',
      bug: '🐛 Bug Meldung',
      suggestion: '💡 Verbesserungsvorschlag',
    };

    const typeLabels = {
      support: 'Support Anfrage',
      bug: 'Bug Meldung',
      suggestion: 'Verbesserungsvorschlag',
    };

    // Sanitize message for HTML (basic XSS prevention)
    const sanitizedMessage = message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const sanitizedUserName = (userName || 'Unbekannt')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const emailResponse = await resend.emails.send({
      from: "Budget App <onboarding@resend.dev>",
      to: ["ivanmirosnic006@gmail.com"],
      subject: `${subjectMap[type]} - Budget App`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #10B981; padding-bottom: 10px;">
            ${subjectMap[type]}
          </h1>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Typ:</strong> ${typeLabels[type]}</p>
            <p style="margin: 0 0 10px 0;"><strong>Von:</strong> ${sanitizedUserName}</p>
            <p style="margin: 0;"><strong>E-Mail:</strong> ${userEmail}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h3 style="color: #333; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap; color: #555;">${sanitizedMessage}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Gesendet von der Budget App
          </p>
        </div>
      `,
    });

    logStep("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    logStep("ERROR", { message: error.message });
    // Return generic error message to client
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
