import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/contexts/AppContext';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, user } = useApp();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  const content = {
    DE: {
      verifying: 'Zahlung wird überprüft...',
      success: 'Zahlung erfolgreich!',
      premiumActive: 'Dein Premium-Status ist jetzt aktiv.',
      backToApp: 'Zurück zur App',
    },
    EN: {
      verifying: 'Verifying payment...',
      success: 'Payment successful!',
      premiumActive: 'Your premium status is now active.',
      backToApp: 'Back to app',
    },
  };

  const t = content[language];

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId || !user) {
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId },
        });

        if (error) {
          console.error('Verification error:', error);
        } else if (data?.success) {
          setSuccess(true);
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, user]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-card rounded-3xl p-8 text-center max-w-sm w-full">
        {verifying ? (
          <>
            <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-xl font-bold mb-2">{t.verifying}</h1>
          </>
        ) : (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t.success}</h1>
            <p className="text-muted-foreground mb-6">{t.premiumActive}</p>
            <button
              onClick={() => navigate('/profile')}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl haptic-tap"
            >
              {t.backToApp}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
