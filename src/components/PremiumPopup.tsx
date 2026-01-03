import React from 'react';
import { X, Star } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export function PremiumPopup() {
  const { showPremiumPopup, setShowPremiumPopup, language } = useApp();

  if (!showPremiumPopup) return null;

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
            <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl haptic-tap">
              {t.pay}
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
            <p className="text-primary text-xl font-bold mb-3">CHF 1.00/Monat</p>
            <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl haptic-tap">
              {t.pay}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
