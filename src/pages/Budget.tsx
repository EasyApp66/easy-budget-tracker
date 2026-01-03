import React, { useState, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { AddModal } from '@/components/AddModal';
import { ContextMenu } from '@/components/ContextMenu';
import { EditModal } from '@/components/EditModal';
import { PremiumPopup } from '@/components/PremiumPopup';
export default function Budget() {
  const {
    months,
    activeMonthId,
    addMonth,
    deleteMonth,
    editMonthName,
    duplicateMonth,
    pinMonth,
    setActiveMonth,
    addExpense,
    deleteExpense,
    editExpense,
    duplicateExpense,
    pinExpense,
    setBudget
  } = useApp();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddMonth, setShowAddMonth] = useState(false);
  const [showMonthContext, setShowMonthContext] = useState(false);
  const [showExpenseContext, setShowExpenseContext] = useState(false);
  const [selectedMonthId, setSelectedMonthId] = useState<string | null>(null);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAmount, setShowEditAmount] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [editTarget, setEditTarget] = useState<'month' | 'expense' | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const activeMonth = months.find(m => m.id === activeMonthId);
  const total = activeMonth?.expenses.reduce((sum, e) => sum + e.amount, 0) || 0;
  const remaining = (activeMonth?.budget || 0) - total;

  // Sort months: pinned first
  const sortedMonths = [...months].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  // Sort expenses: pinned first
  const sortedExpenses = activeMonth ? [...activeMonth.expenses].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  }) : [];
  const handleLongPressStart = (type: 'month' | 'expense', id: string) => {
    longPressTimer.current = setTimeout(() => {
      if ('vibrate' in navigator) navigator.vibrate(20);
      if (type === 'month') {
        setSelectedMonthId(id);
        setShowMonthContext(true);
      } else {
        setSelectedExpenseId(id);
        setShowExpenseContext(true);
      }
    }, 600);
  };
  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };
  const handleAddClick = () => {
    setShowAddExpense(true);
  };
  const formatNumber = (num: number) => {
    return num.toLocaleString('de-CH');
  };
  return <div className="min-h-screen bg-background pb-32 safe-top">
      <div className="px-4 pt-6 space-y-4">
        {/* Budget Card */}
        <div className="bg-card rounded-2xl p-5 animate-slide-up cursor-pointer" onClick={() => setShowEditBudget(true)}>
          <p className="text-label text-lg text-foreground">BUDGET</p>
          <p className="text-display text-5xl text-foreground text-right mt-4">
            {formatNumber(activeMonth?.budget || 0)}
          </p>
        </div>

        {/* Total & Remaining Card */}
        <div className="bg-card rounded-2xl p-5 animate-slide-up" style={{
        animationDelay: '50ms'
      }}>
          <div className="flex justify-between items-center mb-4">
            <p className="text-label text-foreground text-3xl font-extrabold font-sans">BUDGET</p>
            <p className="text-display text-3xl text-foreground">
              {formatNumber(total)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-label text-lg text-foreground">BLEIBT</p>
            <p className={`text-display text-3xl ${remaining >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {remaining < 0 && '-'}{formatNumber(Math.abs(remaining))}
            </p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-3 overflow-x-auto py-2 animate-slide-up" style={{
        animationDelay: '100ms'
      }}>
          <button onClick={() => setShowAddMonth(true)} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 haptic-tap sticky left-0 z-10">
            <Plus className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
          </button>

          {sortedMonths.map(month => <button key={month.id} onClick={() => {
          if ('vibrate' in navigator) navigator.vibrate(10);
          setActiveMonth(month.id);
        }} onMouseDown={() => handleLongPressStart('month', month.id)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart('month', month.id)} onTouchEnd={handleLongPressEnd} className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full flex-shrink-0 haptic-tap transition-all duration-300
                ${month.id === activeMonthId ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}
                ${month.pinned ? 'border-2 border-primary' : 'border-2 border-transparent'}
              `}>
              <span className={`text-label text-sm ${month.id === activeMonthId ? 'text-primary-foreground' : ''}`}>{month.name}</span>
              <button onClick={e => {
            e.stopPropagation();
            if ('vibrate' in navigator) navigator.vibrate(10);
            deleteMonth(month.id);
          }} className="flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" strokeWidth={3} />
              </button>
            </button>)}
        </div>

        {/* Expenses Grid */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{
        animationDelay: '150ms'
      }}>
          {sortedExpenses.map(expense => <div key={expense.id} onMouseDown={() => handleLongPressStart('expense', expense.id)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart('expense', expense.id)} onTouchEnd={handleLongPressEnd} className={`
                bg-card rounded-2xl p-4 aspect-square flex flex-col justify-between haptic-tap transition-all
                ${expense.pinned ? 'ring-2 ring-primary' : ''}
              `}>
              <div className="flex justify-between items-start">
                <p className="text-label text-sm text-foreground leading-tight flex-1 pr-2">
                  {expense.name}
                </p>
                <button onClick={() => {
              if ('vibrate' in navigator) navigator.vibrate(10);
              deleteExpense(expense.id);
            }} className="flex items-center justify-center flex-shrink-0">
                  <X className="w-6 h-6 text-destructive" strokeWidth={3} />
                </button>
              </div>
              <p className="text-display text-3xl text-foreground text-right">
                {formatNumber(expense.amount)}
              </p>
            </div>)}
        </div>

        {sortedExpenses.length === 0 && activeMonth && <div className="text-center py-12 text-muted-foreground animate-fade-in">
            <p>Keine Ausgaben</p>
            <p className="text-sm mt-1">Tippe auf + um eine hinzuzufügen</p>
          </div>}

        {!activeMonth && <div className="text-center py-12 text-muted-foreground animate-fade-in">
            <p>Kein Monat ausgewählt</p>
            <p className="text-sm mt-1">Erstelle einen Monat um zu beginnen</p>
          </div>}
      </div>

      <BottomNav onAddClick={handleAddClick} />

      {/* Modals */}
      <AddModal isOpen={showAddExpense} onClose={() => setShowAddExpense(false)} onAdd={addExpense} title="Neue Ausgabe" namePlaceholder="Name (z.B. ESSEN)" />

      <AddModal isOpen={showAddMonth} onClose={() => setShowAddMonth(false)} onAdd={name => addMonth(name)} title="Neuer Eintrag" namePlaceholder="Name (z.B. JANUAR)" hideAmount />

      {/* Month Context Menu */}
      <ContextMenu isOpen={showMonthContext} onClose={() => setShowMonthContext(false)} options={[{
      label: 'Namen anpassen',
      onClick: () => {
        setEditTarget('month');
        setShowEditName(true);
      }
    }, {
      label: 'Duplizieren',
      onClick: () => selectedMonthId && duplicateMonth(selectedMonthId)
    }, {
      label: months.find(m => m.id === selectedMonthId)?.pinned ? 'Lösen' : 'Fixieren',
      onClick: () => selectedMonthId && pinMonth(selectedMonthId)
    }, {
      label: 'Löschen',
      onClick: () => selectedMonthId && deleteMonth(selectedMonthId),
      destructive: true
    }, {
      label: 'Abbrechen',
      onClick: () => {}
    }]} />

      {/* Expense Context Menu */}
      <ContextMenu isOpen={showExpenseContext} onClose={() => setShowExpenseContext(false)} options={[{
      label: 'Namen anpassen',
      onClick: () => {
        setEditTarget('expense');
        setShowEditName(true);
      }
    }, {
      label: 'Zahl anpassen',
      onClick: () => {
        setEditTarget('expense');
        setShowEditAmount(true);
      }
    }, {
      label: 'Duplizieren',
      onClick: () => selectedExpenseId && duplicateExpense(selectedExpenseId)
    }, {
      label: activeMonth?.expenses.find(e => e.id === selectedExpenseId)?.pinned ? 'Lösen' : 'Fixieren',
      onClick: () => selectedExpenseId && pinExpense(selectedExpenseId)
    }, {
      label: 'Löschen',
      onClick: () => selectedExpenseId && deleteExpense(selectedExpenseId),
      destructive: true
    }, {
      label: 'Abbrechen',
      onClick: () => {}
    }]} />

      {/* Edit Modals */}
      <EditModal isOpen={showEditName} onClose={() => setShowEditName(false)} onSave={value => {
      if (editTarget === 'month' && selectedMonthId) {
        editMonthName(selectedMonthId, String(value));
      } else if (editTarget === 'expense' && selectedExpenseId) {
        editExpense(selectedExpenseId, String(value));
      }
    }} title="Namen anpassen" currentValue={editTarget === 'month' ? months.find(m => m.id === selectedMonthId)?.name || '' : activeMonth?.expenses.find(e => e.id === selectedExpenseId)?.name || ''} type="text" />

      <EditModal isOpen={showEditAmount} onClose={() => setShowEditAmount(false)} onSave={value => {
      if (selectedExpenseId) {
        editExpense(selectedExpenseId, undefined, Number(value));
      }
    }} title="Zahl anpassen" currentValue={activeMonth?.expenses.find(e => e.id === selectedExpenseId)?.amount || 0} type="number" />

      <EditModal isOpen={showEditBudget} onClose={() => setShowEditBudget(false)} onSave={value => setBudget(Number(value))} title="Budget anpassen" currentValue={activeMonth?.budget || 0} type="number" />

      <PremiumPopup />
    </div>;
}