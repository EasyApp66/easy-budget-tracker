import React from 'react';

interface ContextMenuOption {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  options: ContextMenuOption[];
}

export function ContextMenu({ isOpen, onClose, options }: ContextMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-popover rounded-2xl w-[80%] max-w-xs overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              if ('vibrate' in navigator) navigator.vibrate(10);
              option.onClick();
              onClose();
            }}
            className={`
              w-full py-4 px-6 text-center font-bold text-lg transition-colors haptic-tap
              ${option.destructive ? 'text-destructive' : 'text-foreground'}
              ${index !== options.length - 1 ? 'border-b border-border/30' : ''}
              active:bg-secondary
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
