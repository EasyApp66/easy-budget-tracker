import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  type: 'support' | 'bug' | 'suggestion';
  message: string;
  userEmail: string;
  userName?: string;
}

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-FEEDBACK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const { type, message, userEmail, userName }: FeedbackRequest = await req.json();
    logStep("Request received", { type, userEmail });

    if (!type || !message || !userEmail) {
      throw new Error("Missing required fields: type, message, userEmail");
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
            <p style="margin: 0 0 10px 0;"><strong>Von:</strong> ${userName || 'Unbekannt'}</p>
            <p style="margin: 0;"><strong>E-Mail:</strong> ${userEmail}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h3 style="color: #333; margin-top: 0;">Nachricht:</h3>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
