import React, { useState } from 'react';
import { X, Heart, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AMOUNTS = [1, 5, 10, 20];

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const { language } = useApp();
  const [amount, setAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const content = {
    DE: {
      title: 'Spenden',
      subtitle: 'Unterstütze die Entwicklung der App',
      custom: 'Eigener Betrag',
      donate: 'Spenden',
      thanks: 'Vielen Dank! ❤️',
      error: 'Fehler beim Starten der Zahlung',
      minAmount: 'Mindestbetrag ist CHF 1.00',
    },
    EN: {
      title: 'Donate',
      subtitle: 'Support the development of the app',
      custom: 'Custom amount',
      donate: 'Donate',
      thanks: 'Thank you! ❤️',
      error: 'Error starting payment',
      minAmount: 'Minimum amount is CHF 1.00',
    },
    FR: {
      title: 'Faire un don',
      subtitle: 'Soutenez le développement de l\'app',
      custom: 'Montant personnalisé',
      donate: 'Donner',
      thanks: 'Merci beaucoup ! ❤️',
      error: 'Erreur lors du démarrage du paiement',
      minAmount: 'Le montant minimum est de CHF 1.00',
    },
  };

  const t = content[language];

  const handleDonate = async () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) {
      toast.error(t.minAmount);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-donation', {
        body: { amount: Math.round(finalAmount * 100) }, // Convert to cents
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        onClose();
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in p-6">
      <div className="bg-popover rounded-3xl w-full max-w-sm animate-scale-in relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground flex items-center justify-center haptic-tap"
        >
          <X className="w-5 h-5 text-background" />
        </button>

        <div className="p-6 pt-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
              <Heart className="w-8 h-8 text-destructive fill-destructive" />
            </div>
          </div>

          <h2 className="text-title text-2xl text-center mb-2">{t.title}</h2>
          <p className="text-muted-foreground text-center mb-6">{t.subtitle}</p>

          {/* Preset amounts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setAmount(preset);
                  setCustomAmount('');
                }}
                className={`py-3 rounded-xl font-bold transition-all ${
                  amount === preset && !customAmount
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground hover:bg-card/80'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Custom amount input */}
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">
              CHF
            </span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(0);
              }}
              placeholder={t.custom}
              min="1"
              step="0.01"
              className="w-full bg-card rounded-xl py-3 pl-14 pr-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleDonate}
            disabled={loading}
            className="w-full bg-destructive text-destructive-foreground font-bold py-3 rounded-xl haptic-tap disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Heart className="w-5 h-5" />
                {t.donate} CHF {customAmount || amount}.00
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
