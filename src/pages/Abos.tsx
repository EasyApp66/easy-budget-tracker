import React, { useState, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { AddModal } from '@/components/AddModal';
import { ContextMenu } from '@/components/ContextMenu';
import { EditModal } from '@/components/EditModal';
import { PremiumPopup } from '@/components/PremiumPopup';
import { AnimatedNumber } from '@/components/AnimatedNumber';

export default function Abos() {
  const {
    subscriptions,
    addSubscription,
    deleteSubscription,
    editSubscription,
    duplicateSubscription,
    pinSubscription,
  } = useApp();

  const [showAddSub, setShowAddSub] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAmount, setShowEditAmount] = useState(false);
  const [swipedId, setSwipedId] = useState<string | null>(null);

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);

  const total = subscriptions.reduce((sum, s) => sum + s.amount, 0);

  // Sort subscriptions: pinned first
  const sortedSubs = [...subscriptions].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const handleLongPressStart = (id: string) => {
    longPressTimer.current = setTimeout(() => {
      if ('vibrate' in navigator) navigator.vibrate(20);
      setSelectedSubId(id);
      setShowContext(true);
    }, 600);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    touchStartX.current = e.touches[0].clientX;
    handleLongPressStart(id);
  };

  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    handleLongPressEnd();
    const diff = touchStartX.current - e.touches[0].clientX;
    
    if (diff > 50) {
      // Swipe left - delete
      setSwipedId(id);
    } else if (diff < -50) {
      // Swipe right - pin
      pinSubscription(id);
      if ('vibrate' in navigator) navigator.vibrate(10);
    }
  };

  const handleTouchEnd = (id: string) => {
    handleLongPressEnd();
    if (swipedId === id) {
      deleteSubscription(id);
      if ('vibrate' in navigator) navigator.vibrate(10);
    }
    setSwipedId(null);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('de-CH');
  };

  return (
    <div className="min-h-screen bg-background pb-32 safe-top">
      <div className="px-4 pt-6 space-y-4">
        {/* Abo Zähler Card */}
        <div className="bg-card rounded-2xl p-5 animate-slide-up">
          <p className="text-label text-4xl font-black text-foreground">ABO KOSTEN</p>
          <p className="text-display text-5xl text-foreground text-right mt-4">
            <AnimatedNumber value={total} />
          </p>
        </div>

        {/* Total Count Card */}
        <div className="bg-card rounded-2xl p-5 animate-slide-up" style={{ animationDelay: '50ms' }}>
          <div className="flex justify-between items-center">
            <p className="text-label text-lg text-foreground">TOTAL</p>
            <p className="text-display text-3xl text-foreground">
              {subscriptions.length}
            </p>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {sortedSubs.map((sub) => (
            <div
              key={sub.id}
              onTouchStart={(e) => handleTouchStart(e, sub.id)}
              onTouchMove={(e) => handleTouchMove(e, sub.id)}
              onTouchEnd={() => handleTouchEnd(sub.id)}
              onMouseDown={() => handleLongPressStart(sub.id)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              className={`
                bg-card rounded-2xl p-5 haptic-tap transition-all duration-300
                ${sub.pinned ? 'border-2 border-primary' : 'border-2 border-transparent'}
                ${swipedId === sub.id ? 'translate-x-[-100px] opacity-50' : 'translate-x-0'}
              `}
            >
              <div className="flex justify-between items-center">
                <p className="text-title text-lg text-foreground">{sub.name}</p>
                <p className="text-display text-2xl text-foreground">
                  <AnimatedNumber value={sub.amount} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {subscriptions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground animate-fade-in">
            <p>Keine Abos</p>
            <p className="text-sm mt-1">Tippe auf + um eins hinzuzufügen</p>
          </div>
        )}

        {/* Swipe hints */}
        {subscriptions.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-4 animate-fade-in">
            ← Wischen zum Löschen • Wischen zum Fixieren →
          </p>
        )}
      </div>

      <BottomNav onAddClick={() => setShowAddSub(true)} />

      {/* Add Modal */}
      <AddModal
        isOpen={showAddSub}
        onClose={() => setShowAddSub(false)}
        onAdd={addSubscription}
        title="Neues Abo"
        namePlaceholder="Name (z.B. Netflix)"
      />

      {/* Context Menu */}
      <ContextMenu
        isOpen={showContext}
        onClose={() => setShowContext(false)}
        options={[
          {
            label: 'Namen anpassen',
            onClick: () => setShowEditName(true),
          },
          {
            label: 'Zahl anpassen',
            onClick: () => setShowEditAmount(true),
          },
          {
            label: 'Duplizieren',
            onClick: () => selectedSubId && duplicateSubscription(selectedSubId),
          },
          {
            label: subscriptions.find(s => s.id === selectedSubId)?.pinned ? 'Lösen' : 'Fixieren',
            onClick: () => selectedSubId && pinSubscription(selectedSubId),
          },
          {
            label: 'Löschen',
            onClick: () => selectedSubId && deleteSubscription(selectedSubId),
            destructive: true,
          },
          {
            label: 'Abbrechen',
            onClick: () => {},
          },
        ]}
      />

      {/* Edit Modals */}
      <EditModal
        isOpen={showEditName}
        onClose={() => setShowEditName(false)}
        onSave={(value) => {
          if (selectedSubId) {
            editSubscription(selectedSubId, String(value));
          }
        }}
        title="Namen anpassen"
        currentValue={subscriptions.find(s => s.id === selectedSubId)?.name || ''}
        type="text"
      />

      <EditModal
        isOpen={showEditAmount}
        onClose={() => setShowEditAmount(false)}
        onSave={(value) => {
          if (selectedSubId) {
            editSubscription(selectedSubId, undefined, Number(value));
          }
        }}
        title="Zahl anpassen"
        currentValue={subscriptions.find(s => s.id === selectedSubId)?.amount || 0}
        type="number"
      />

      <PremiumPopup />
    </div>
  );
}
