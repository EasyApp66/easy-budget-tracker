import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, amount?: number) => boolean | Promise<boolean>;
  title: string;
  namePlaceholder: string;
  amountPlaceholder?: string;
  hideAmount?: boolean;
}

export function AddModal({ isOpen, onClose, onAdd, title, namePlaceholder, amountPlaceholder, hideAmount = false }: AddModalProps) {
  const { language } = useApp();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    DE: {
      amount: 'Betrag',
      cancel: 'Abbrechen',
      add: 'Hinzufügen',
    },
    EN: {
      amount: 'Amount',
      cancel: 'Cancel',
      add: 'Add',
    },
    FR: {
      amount: 'Montant',
      cancel: 'Annuler',
      add: 'Ajouter',
    },
    IT: {
      amount: 'Importo',
      cancel: 'Annulla',
      add: 'Aggiungi',
    },
    ES: {
      amount: 'Cantidad',
      cancel: 'Cancelar',
      add: 'Añadir',
    },
    PT: {
      amount: 'Valor',
      cancel: 'Cancelar',
      add: 'Adicionar',
    },
  };

  const t = content[language];

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      if (hideAmount) {
        if (name) {
          const success = await onAdd(name.toUpperCase());
          if (success) {
            setName('');
            onClose();
          }
        }
      } else {
        if (name && amount) {
          const success = await onAdd(name.toUpperCase(), parseFloat(amount) || 0);
          if (success) {
            setName('');
            setAmount('');
            onClose();
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      <div className="bg-popover rounded-2xl p-6 w-[90%] max-w-sm animate-scale-in">
        <h2 className="text-title text-xl text-center mb-6">{title}</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePlaceholder}
            className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all text-label"
          />
          
          {!hideAmount && (
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={amountPlaceholder || t.amount}
              className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
            />
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 bg-secondary text-foreground font-bold py-4 rounded-xl haptic-tap transition-all disabled:opacity-50"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-xl haptic-tap transition-all disabled:opacity-50"
          >
            {isSubmitting ? '...' : t.add}
          </button>
        </div>
      </div>
    </div>
  );
}
