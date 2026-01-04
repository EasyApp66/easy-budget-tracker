import React, { useState } from 'react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, amount?: number) => boolean | Promise<boolean>;
  title: string;
  namePlaceholder: string;
  hideAmount?: boolean;
}

export function AddModal({ isOpen, onClose, onAdd, title, namePlaceholder, hideAmount = false }: AddModalProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              placeholder="Betrag"
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
            Abbrechen
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-xl haptic-tap transition-all disabled:opacity-50"
          >
            {isSubmitting ? '...' : 'Hinzufügen'}
          </button>
        </div>
      </div>
    </div>
  );
}
