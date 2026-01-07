import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string | number) => void;
  title: string;
  currentValue: string | number;
  type: 'text' | 'number';
}

export function EditModal({ isOpen, onClose, onSave, title, currentValue, type }: EditModalProps) {
  const { language } = useApp();
  const [value, setValue] = useState(String(currentValue));

  const content = {
    DE: {
      cancel: 'Abbrechen',
      save: 'Speichern',
    },
    EN: {
      cancel: 'Cancel',
      save: 'Save',
    },
    FR: {
      cancel: 'Annuler',
      save: 'Enregistrer',
    },
  };

  const t = content[language];

  useEffect(() => {
    setValue(String(currentValue));
  }, [currentValue, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    if (type === 'number') {
      onSave(parseFloat(value) || 0);
    } else {
      onSave(value.toUpperCase());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      <div className="bg-popover rounded-2xl p-6 w-[90%] max-w-sm animate-scale-in">
        <h2 className="text-title text-xl text-center mb-6">{title}</h2>
        
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg text-center"
          autoFocus
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-secondary text-foreground font-bold py-4 rounded-xl haptic-tap transition-all"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-xl haptic-tap transition-all"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
