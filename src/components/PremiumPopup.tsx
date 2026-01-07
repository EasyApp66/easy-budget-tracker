import React, { useState } from 'react';
import { X, Star, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Stripe Price IDs
const PRICES = {
  oneTime: 'price_1SlrGYJ21i7rapyctGujxbJu', // CHF 10 einmalig
  monthly: 'price_1SlrGoJ21i7rapycghqG6qhk', // CHF 1/Monat
};

export function PremiumPopup() {
  const { showPremiumPopup, setShowPremiumPopup, language } = useApp();
  const [loadingOneTime, setLoadingOneTime] = useState(false);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  if (!showPremiumPopup) return null;

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription', setLoading: (v: boolean) => void) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode },
      });

      if (error) {
        console.error('Checkout error:', error);
        toast.error(language === 'DE' ? 'Fehler beim Starten der Zahlung' : language === 'EN' ? 'Error starting payment' : 'Erreur lors du démarrage du paiement');
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(language === 'DE' ? 'Fehler beim Starten der Zahlung' : language === 'EN' ? 'Error starting payment' : 'Erreur lors du démarrage du paiement');
    } finally {
      setLoading(false);
    }
  };

  const content = {
    DE: {
      title: 'Premium Kaufen',
      subtitle: 'Erhalte unbegrenzte App-Funktionen:',
      features: [
        'Unbegrenzte Abo Counter',
        'Unbegrenzte Ausgabenliste',
        'Unbegrenzte Monate',
      ],
      oneTime: 'Einmalige Zahlung',
      monthly: 'Monatliches Abo',
      pay: 'Bezahlen',
      or: 'ODER',
    },
    EN: {
      title: 'Buy Premium',
      subtitle: 'Get unlimited app features:',
      features: [
        'Unlimited Subscription Counter',
        'Unlimited Expense List',
        'Unlimited Months',
      ],
      oneTime: 'One-time Payment',
      monthly: 'Monthly Subscription',
      pay: 'Pay',
      or: 'OR',
    },
    FR: {
      title: 'Acheter Premium',
      subtitle: "Obtenez des fonctionnalités illimitées:",
      features: [
        "Compteur d'abonnements illimité",
        'Liste de dépenses illimitée',
        'Mois illimités',
      ],
      oneTime: 'Paiement unique',
      monthly: 'Abonnement mensuel',
      pay: 'Payer',
      or: 'OU',
    },
    IT: {
      title: 'Acquista Premium',
      subtitle: 'Ottieni funzionalità illimitate:',
      features: [
        'Contatore abbonamenti illimitato',
        'Lista spese illimitata',
        'Mesi illimitati',
      ],
      oneTime: 'Pagamento unico',
      monthly: 'Abbonamento mensile',
      pay: 'Paga',
      or: 'OPPURE',
    },
    ES: {
      title: 'Comprar Premium',
      subtitle: 'Obtén funciones ilimitadas:',
      features: [
        'Contador de suscripciones ilimitado',
        'Lista de gastos ilimitada',
        'Meses ilimitados',
      ],
      oneTime: 'Pago único',
      monthly: 'Suscripción mensual',
      pay: 'Pagar',
      or: 'O',
    },
    PT: {
      title: 'Comprar Premium',
      subtitle: 'Obtenha recursos ilimitados:',
      features: [
        'Contador de assinaturas ilimitado',
        'Lista de despesas ilimitada',
        'Meses ilimitados',
      ],
      oneTime: 'Pagamento único',
      monthly: 'Assinatura mensal',
      pay: 'Pagar',
      or: 'OU',
    },
  };

  const t = content[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in p-6">
      <div className="bg-popover rounded-3xl w-full max-w-sm animate-scale-in relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setShowPremiumPopup(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground flex items-center justify-center haptic-tap"
        >
          <X className="w-5 h-5 text-background" />
        </button>

        <div className="p-6 pt-8">
          {/* Star icon */}
          <div className="flex justify-center mb-4">
            <Star className="w-12 h-12 text-primary fill-primary" />
          </div>

          {/* Title */}
          <h2 className="text-title text-2xl text-center mb-2">{t.title}</h2>
          <p className="text-muted-foreground text-center mb-6">{t.subtitle}</p>

          {/* Features */}
          <div className="bg-card rounded-2xl p-4 mb-6">
            <ul className="space-y-2">
              {t.features.map((feature, index) => (
                <li key={index} className="text-foreground flex items-center gap-2">
                  <span className="text-primary">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* One-time payment */}
          <div className="border-2 border-primary rounded-2xl p-4 mb-4">
            <p className="font-bold text-lg">{t.oneTime}</p>
            <p className="text-primary text-xl font-bold mb-3">CHF 10.00</p>
            <button 
              onClick={() => handleCheckout(PRICES.oneTime, 'payment', setLoadingOneTime)}
              disabled={loadingOneTime || loadingMonthly}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl haptic-tap disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loadingOneTime ? <Loader2 className="w-5 h-5 animate-spin" /> : t.pay}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm font-bold">{t.or}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Monthly */}
          <div className="border-2 border-primary rounded-2xl p-4">
            <p className="font-bold text-lg">{t.monthly}</p>
            <p className="text-primary text-xl font-bold mb-3">CHF 1.00/{language === 'DE' ? 'Monat' : language === 'EN' ? 'month' : language === 'FR' ? 'mois' : language === 'IT' ? 'mese' : language === 'ES' ? 'mes' : 'mês'}</p>
            <button 
              onClick={() => handleCheckout(PRICES.monthly, 'subscription', setLoadingMonthly)}
              disabled={loadingOneTime || loadingMonthly}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl haptic-tap disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loadingMonthly ? <Loader2 className="w-5 h-5 animate-spin" /> : t.pay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
