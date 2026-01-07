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
    language,
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

  const content = {
    DE: {
      aboCosts: 'ABO KOSTEN',
      total: 'TOTAL',
      noAbos: 'Keine Abos',
      addHint: 'Tippe auf + um eins hinzuzufügen',
      swipeHint: '← Wischen zum Löschen • Wischen zum Fixieren →',
      newAbo: 'Neues Abo',
      namePlaceholder: 'Name (z.B. Netflix)',
      editName: 'Namen anpassen',
      editAmount: 'Zahl anpassen',
      duplicate: 'Duplizieren',
      unpin: 'Lösen',
      pin: 'Fixieren',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      amount: 'Betrag',
    },
    EN: {
      aboCosts: 'SUBSCRIPTION COSTS',
      total: 'TOTAL',
      noAbos: 'No subscriptions',
      addHint: 'Tap + to add one',
      swipeHint: '← Swipe to delete • Swipe to pin →',
      newAbo: 'New Subscription',
      namePlaceholder: 'Name (e.g. Netflix)',
      editName: 'Edit Name',
      editAmount: 'Edit Amount',
      duplicate: 'Duplicate',
      unpin: 'Unpin',
      pin: 'Pin',
      delete: 'Delete',
      cancel: 'Cancel',
      amount: 'Amount',
    },
    FR: {
      aboCosts: 'COÛTS ABONNEMENTS',
      total: 'TOTAL',
      noAbos: 'Aucun abonnement',
      addHint: 'Appuyez sur + pour en ajouter',
      swipeHint: '← Glisser pour supprimer • Glisser pour épingler →',
      newAbo: 'Nouvel abonnement',
      namePlaceholder: 'Nom (ex. Netflix)',
      editName: 'Modifier le nom',
      editAmount: 'Modifier le montant',
      duplicate: 'Dupliquer',
      unpin: 'Détacher',
      pin: 'Épingler',
      delete: 'Supprimer',
      cancel: 'Annuler',
      amount: 'Montant',
    },
    IT: {
      aboCosts: 'COSTI ABBONAMENTI',
      total: 'TOTALE',
      noAbos: 'Nessun abbonamento',
      addHint: 'Tocca + per aggiungerne uno',
      swipeHint: '← Scorri per eliminare • Scorri per fissare →',
      newAbo: 'Nuovo abbonamento',
      namePlaceholder: 'Nome (es. Netflix)',
      editName: 'Modifica nome',
      editAmount: 'Modifica importo',
      duplicate: 'Duplica',
      unpin: 'Sblocca',
      pin: 'Fissa',
      delete: 'Elimina',
      cancel: 'Annulla',
      amount: 'Importo',
    },
    ES: {
      aboCosts: 'COSTOS DE SUSCRIPCIONES',
      total: 'TOTAL',
      noAbos: 'Sin suscripciones',
      addHint: 'Toca + para añadir una',
      swipeHint: '← Desliza para eliminar • Desliza para fijar →',
      newAbo: 'Nueva suscripción',
      namePlaceholder: 'Nombre (ej. Netflix)',
      editName: 'Editar nombre',
      editAmount: 'Editar cantidad',
      duplicate: 'Duplicar',
      unpin: 'Desfijar',
      pin: 'Fijar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      amount: 'Cantidad',
    },
    PT: {
      aboCosts: 'CUSTOS DE ASSINATURAS',
      total: 'TOTAL',
      noAbos: 'Sem assinaturas',
      addHint: 'Toque em + para adicionar',
      swipeHint: '← Deslize para excluir • Deslize para fixar →',
      newAbo: 'Nova assinatura',
      namePlaceholder: 'Nome (ex. Netflix)',
      editName: 'Editar nome',
      editAmount: 'Editar valor',
      duplicate: 'Duplicar',
      unpin: 'Desafixar',
      pin: 'Fixar',
      delete: 'Excluir',
      cancel: 'Cancelar',
      amount: 'Valor',
    },
  };

  const t = content[language];

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

  return (
    <div className="min-h-screen bg-background pb-32 safe-top">
      <div className="px-4 pt-6 space-y-4">
        {/* Abo Zähler Card */}
        <div className="bg-card rounded-2xl p-5">
          <p className="text-label text-4xl font-black text-foreground">{t.aboCosts}</p>
          <p className="text-display text-5xl text-foreground text-right mt-4">
            <AnimatedNumber value={total} />
          </p>
        </div>

        {/* Total Count Card */}
        <div className="bg-card rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <p className="text-label text-lg text-foreground">{t.total}</p>
            <p className="text-display text-3xl text-foreground">
              {subscriptions.length}
            </p>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-3">
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
          <div className="text-center py-12 text-muted-foreground">
            <p>{t.noAbos}</p>
            <p className="text-sm mt-1">{t.addHint}</p>
          </div>
        )}

        {/* Swipe hints */}
        {subscriptions.length > 0 && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            {t.swipeHint}
          </p>
        )}
      </div>

      <BottomNav onAddClick={() => setShowAddSub(true)} />

      {/* Add Modal */}
      <AddModal
        isOpen={showAddSub}
        onClose={() => setShowAddSub(false)}
        onAdd={addSubscription}
        title={t.newAbo}
        namePlaceholder={t.namePlaceholder}
        amountPlaceholder={t.amount}
      />

      {/* Context Menu */}
      <ContextMenu
        isOpen={showContext}
        onClose={() => setShowContext(false)}
        options={[
          {
            label: t.editName,
            onClick: () => setShowEditName(true),
          },
          {
            label: t.editAmount,
            onClick: () => setShowEditAmount(true),
          },
          {
            label: t.duplicate,
            onClick: () => selectedSubId && duplicateSubscription(selectedSubId),
          },
          {
            label: subscriptions.find(s => s.id === selectedSubId)?.pinned ? t.unpin : t.pin,
            onClick: () => selectedSubId && pinSubscription(selectedSubId),
          },
          {
            label: t.delete,
            onClick: () => selectedSubId && deleteSubscription(selectedSubId),
            destructive: true,
          },
          {
            label: t.cancel,
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
        title={t.editName}
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
        title={t.editAmount}
        currentValue={subscriptions.find(s => s.id === selectedSubId)?.amount || 0}
        type="number"
      />

      <PremiumPopup />
    </div>
  );
}
