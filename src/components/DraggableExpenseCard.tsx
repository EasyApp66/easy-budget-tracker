import React, { useState, useRef } from 'react';
import { X, GripVertical } from 'lucide-react';
import { AnimatedNumber } from '@/components/AnimatedNumber';

interface Expense {
  id: string;
  name: string;
  amount: number;
  pinned: boolean;
}

interface DraggableExpenseCardProps {
  expense: Expense;
  index: number;
  totalUnpinned: number;
  onDelete: () => void;
  onLongPressStart: () => void;
  onLongPressEnd: () => void;
  onReorder: (newIndex: number) => void;
}

export function DraggableExpenseCard({
  expense,
  index,
  totalUnpinned,
  onDelete,
  onLongPressStart,
  onLongPressEnd,
  onReorder,
}: DraggableExpenseCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showReorderButtons, setShowReorderButtons] = useState(false);
  const tapTimer = useRef<NodeJS.Timeout | null>(null);
  const tapStartTime = useRef<number>(0);

  const handleTitleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (expense.pinned) return;
    e.stopPropagation();
    tapStartTime.current = Date.now();
    tapTimer.current = setTimeout(() => {
      // This is a long press, not a short tap
      tapTimer.current = null;
    }, 300);
  };

  const handleTitleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (expense.pinned) return;
    e.stopPropagation();
    
    const tapDuration = Date.now() - tapStartTime.current;
    
    if (tapTimer.current && tapDuration < 300) {
      // Short tap - toggle reorder mode
      clearTimeout(tapTimer.current);
      tapTimer.current = null;
      if ('vibrate' in navigator) navigator.vibrate(10);
      setShowReorderButtons(prev => !prev);
    }
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    
    let newIndex = index;
    
    // In a 2-column grid:
    // - left/right moves by 1
    // - up/down moves by 2 (one row)
    switch (direction) {
      case 'left':
        newIndex = Math.max(0, index - 1);
        break;
      case 'right':
        newIndex = Math.min(totalUnpinned - 1, index + 1);
        break;
      case 'up':
        newIndex = Math.max(0, index - 2);
        break;
      case 'down':
        newIndex = Math.min(totalUnpinned - 1, index + 2);
        break;
    }
    
    if (newIndex !== index) {
      onReorder(newIndex);
    }
  };

  return (
    <div
      onMouseDown={onLongPressStart}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={onLongPressStart}
      onTouchEnd={onLongPressEnd}
      className={`
        bg-card rounded-2xl p-4 aspect-square flex flex-col justify-between haptic-tap transition-all duration-300 relative
        ${expense.pinned ? 'border-2 border-primary' : 'border-2 border-transparent'}
        ${isDragging ? 'scale-105 shadow-lg z-10' : ''}
        ${showReorderButtons && !expense.pinned ? 'ring-2 ring-primary' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <p
          onMouseDown={handleTitleTouchStart}
          onMouseUp={handleTitleTouchEnd}
          onTouchStart={handleTitleTouchStart}
          onTouchEnd={handleTitleTouchEnd}
          className={`
            text-label text-base text-foreground leading-tight flex-1 pr-2 select-none
            ${!expense.pinned ? 'cursor-pointer active:bg-muted/50 rounded px-1 -mx-1' : ''}
          `}
        >
          {expense.name}
        </p>
        <button
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            onDelete();
          }}
          className="flex items-center justify-center flex-shrink-0"
        >
          <X className="w-6 h-6 text-destructive" strokeWidth={3} />
        </button>
      </div>

      {/* Reorder Controls */}
      {showReorderButtons && !expense.pinned && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
          <div className="grid grid-cols-3 gap-1">
            {/* Up */}
            <div className="col-start-2">
              <button
                onClick={() => handleMove('up')}
                disabled={index < 2}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="text-primary-foreground text-xl">↑</span>
              </button>
            </div>
            {/* Left */}
            <div className="col-start-1 row-start-2">
              <button
                onClick={() => handleMove('left')}
                disabled={index === 0}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="text-primary-foreground text-xl">←</span>
              </button>
            </div>
            {/* Close */}
            <div className="col-start-2 row-start-2">
              <button
                onClick={() => setShowReorderButtons(false)}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            {/* Right */}
            <div className="col-start-3 row-start-2">
              <button
                onClick={() => handleMove('right')}
                disabled={index === totalUnpinned - 1}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="text-primary-foreground text-xl">→</span>
              </button>
            </div>
            {/* Down */}
            <div className="col-start-2 row-start-3">
              <button
                onClick={() => handleMove('down')}
                disabled={index >= totalUnpinned - 2}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="text-primary-foreground text-xl">↓</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-display text-3xl text-foreground text-right">
        <AnimatedNumber value={expense.amount} />
      </p>
    </div>
  );
}
