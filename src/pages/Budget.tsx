import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Pencil } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { AddModal } from '@/components/AddModal';
import { ContextMenu } from '@/components/ContextMenu';
import { EditModal } from '@/components/EditModal';
import { PremiumPopup } from '@/components/PremiumPopup';
import { AnimatedNumber } from '@/components/AnimatedNumber';

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
    setBudget,
    language
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
  const [showEditTitle, setShowEditTitle] = useState(false);
  const [budgetTitle, setBudgetTitle] = useState(() => {
    return localStorage.getItem('easybudget_title') || 'BUDGET';
  });
  const [editTarget, setEditTarget] = useState<'month' | 'expense' | null>(null);

  const content = {
    DE: {
      total: 'TOTAL',
      remaining: 'BLEIBT',
      noExpenses: 'Keine Ausgaben',
      addExpenseHint: 'Tippe auf + um eine hinzuzufügen',
      noMonth: 'Kein Monat ausgewählt',
      createMonthHint: 'Erstelle einen Monat um zu beginnen',
      newExpense: 'Neue Ausgabe',
      expensePlaceholder: 'Name (z.B. ESSEN)',
      newEntry: 'Neuer Eintrag',
      monthPlaceholder: 'Name (z.B. JANUAR)',
      editName: 'Namen anpassen',
      duplicate: 'Duplizieren',
      unpin: 'Lösen',
      pin: 'Fixieren',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      editAmount: 'Zahl anpassen',
      editBudget: 'Budget anpassen',
      editTitle: 'Titel anpassen',
      amount: 'Betrag',
    },
    EN: {
      total: 'TOTAL',
      remaining: 'REMAINING',
      noExpenses: 'No expenses',
      addExpenseHint: 'Tap + to add one',
      noMonth: 'No month selected',
      createMonthHint: 'Create a month to start',
      newExpense: 'New Expense',
      expensePlaceholder: 'Name (e.g. FOOD)',
      newEntry: 'New Entry',
      monthPlaceholder: 'Name (e.g. JANUARY)',
      editName: 'Edit Name',
      duplicate: 'Duplicate',
      unpin: 'Unpin',
      pin: 'Pin',
      delete: 'Delete',
      cancel: 'Cancel',
      editAmount: 'Edit Amount',
      editBudget: 'Edit Budget',
      editTitle: 'Edit Title',
      amount: 'Amount',
    },
    FR: {
      total: 'TOTAL',
      remaining: 'RESTE',
      noExpenses: 'Aucune dépense',
      addExpenseHint: 'Appuyez sur + pour en ajouter',
      noMonth: 'Aucun mois sélectionné',
      createMonthHint: 'Créez un mois pour commencer',
      newExpense: 'Nouvelle dépense',
      expensePlaceholder: 'Nom (ex. NOURRITURE)',
      newEntry: 'Nouvelle entrée',
      monthPlaceholder: 'Nom (ex. JANVIER)',
      editName: 'Modifier le nom',
      duplicate: 'Dupliquer',
      unpin: 'Détacher',
      pin: 'Épingler',
      delete: 'Supprimer',
      cancel: 'Annuler',
      editAmount: 'Modifier le montant',
      editBudget: 'Modifier le budget',
      editTitle: 'Modifier le titre',
      amount: 'Montant',
    },
    IT: {
      total: 'TOTALE',
      remaining: 'RIMANENTE',
      noExpenses: 'Nessuna spesa',
      addExpenseHint: 'Tocca + per aggiungerne una',
      noMonth: 'Nessun mese selezionato',
      createMonthHint: 'Crea un mese per iniziare',
      newExpense: 'Nuova spesa',
      expensePlaceholder: 'Nome (es. CIBO)',
      newEntry: 'Nuova voce',
      monthPlaceholder: 'Nome (es. GENNAIO)',
      editName: 'Modifica nome',
      duplicate: 'Duplica',
      unpin: 'Sblocca',
      pin: 'Fissa',
      delete: 'Elimina',
      cancel: 'Annulla',
      editAmount: 'Modifica importo',
      editBudget: 'Modifica budget',
      editTitle: 'Modifica titolo',
      amount: 'Importo',
    },
    ES: {
      total: 'TOTAL',
      remaining: 'RESTANTE',
      noExpenses: 'Sin gastos',
      addExpenseHint: 'Toca + para añadir uno',
      noMonth: 'Ningún mes seleccionado',
      createMonthHint: 'Crea un mes para empezar',
      newExpense: 'Nuevo gasto',
      expensePlaceholder: 'Nombre (ej. COMIDA)',
      newEntry: 'Nueva entrada',
      monthPlaceholder: 'Nombre (ej. ENERO)',
      editName: 'Editar nombre',
      duplicate: 'Duplicar',
      unpin: 'Desfijar',
      pin: 'Fijar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      editAmount: 'Editar cantidad',
      editBudget: 'Editar presupuesto',
      editTitle: 'Editar título',
      amount: 'Cantidad',
    },
    PT: {
      total: 'TOTAL',
      remaining: 'RESTANTE',
      noExpenses: 'Sem despesas',
      addExpenseHint: 'Toque em + para adicionar',
      noMonth: 'Nenhum mês selecionado',
      createMonthHint: 'Crie um mês para começar',
      newExpense: 'Nova despesa',
      expensePlaceholder: 'Nome (ex. COMIDA)',
      newEntry: 'Nova entrada',
      monthPlaceholder: 'Nome (ex. JANEIRO)',
      editName: 'Editar nome',
      duplicate: 'Duplicar',
      unpin: 'Desafixar',
      pin: 'Fixar',
      delete: 'Excluir',
      cancel: 'Cancelar',
      editAmount: 'Editar valor',
      editBudget: 'Editar orçamento',
      editTitle: 'Editar título',
      amount: 'Valor',
    },
  };

  const t = content[language];

  useEffect(() => {
    localStorage.setItem('easybudget_title', budgetTitle);
  }, [budgetTitle]);

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

  return (
    <div className="min-h-screen bg-background pb-32 safe-top">
      <div className="px-4 pt-6 space-y-4">
        {/* Budget Card */}
        <div className="bg-card rounded-2xl p-5">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setShowEditTitle(true)}>
            <p className="text-label text-4xl font-black text-foreground">{budgetTitle}</p>
            <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="cursor-pointer" onClick={() => setShowEditBudget(true)}>
            <p className="text-display text-5xl text-foreground text-right mt-4">
              <AnimatedNumber value={activeMonth?.budget || 0} />
            </p>
          </div>
        </div>

        {/* Total & Remaining Card */}
        <div className="bg-card rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-label text-lg text-foreground">{t.total}</p>
            <p className="text-display text-3xl text-foreground">
              <AnimatedNumber value={total} />
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-label text-lg text-foreground">{t.remaining}</p>
            <p className={`text-display text-3xl ${remaining >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {remaining < 0 && '-'}<AnimatedNumber value={Math.abs(remaining)} />
            </p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-3 overflow-x-auto py-2">
          <button onClick={() => setShowAddMonth(true)} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 haptic-tap sticky left-0 z-10">
            <Plus strokeWidth={3} className="w-5 h-5 text-black" />
          </button>

          {sortedMonths.map(month => (
            <button
              key={month.id}
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(10);
                setActiveMonth(month.id);
              }}
              onMouseDown={() => handleLongPressStart('month', month.id)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              onTouchStart={() => handleLongPressStart('month', month.id)}
              onTouchEnd={handleLongPressEnd}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-full flex-shrink-0 haptic-tap transition-all duration-300
                ${month.id === activeMonthId ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}
                ${month.pinned ? 'border-2 border-primary' : 'border-2 border-transparent'}
              `}
            >
              <span className={`text-label text-sm ${month.id === activeMonthId ? 'text-primary-foreground' : ''}`}>{month.name}</span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  if ('vibrate' in navigator) navigator.vibrate(10);
                  deleteMonth(month.id);
                }}
                className="flex items-center justify-center"
              >
                <X className="w-5 h-5 text-destructive" strokeWidth={3} />
              </button>
            </button>
          ))}
        </div>

        {/* Expenses Grid */}
        <div className="grid grid-cols-2 gap-3">
          {sortedExpenses.map(expense => (
            <div
              key={expense.id}
              onMouseDown={() => handleLongPressStart('expense', expense.id)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              onTouchStart={() => handleLongPressStart('expense', expense.id)}
              onTouchEnd={handleLongPressEnd}
              className={`
                bg-card rounded-2xl p-4 aspect-square flex flex-col justify-between haptic-tap transition-all duration-300
                ${expense.pinned ? 'border-2 border-primary' : 'border-2 border-transparent'}
              `}
            >
              <div className="flex justify-between items-start">
                <p className="text-label text-base text-foreground leading-tight flex-1 pr-2">
                  {expense.name}
                </p>
                <button
                  onClick={() => {
                    if ('vibrate' in navigator) navigator.vibrate(10);
                    deleteExpense(expense.id);
                  }}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-6 h-6 text-destructive" strokeWidth={3} />
                </button>
              </div>
              <p className="text-display text-3xl text-foreground text-right">
                <AnimatedNumber value={expense.amount} />
              </p>
            </div>
          ))}
        </div>

        {sortedExpenses.length === 0 && activeMonth && (
          <div className="text-center py-12 text-muted-foreground">
            <p>{t.noExpenses}</p>
            <p className="text-sm mt-1">{t.addExpenseHint}</p>
          </div>
        )}

        {!activeMonth && (
          <div className="text-center py-12 text-muted-foreground">
            <p>{t.noMonth}</p>
            <p className="text-sm mt-1">{t.createMonthHint}</p>
          </div>
        )}
      </div>

      <BottomNav onAddClick={handleAddClick} />

      {/* Modals */}
      <AddModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onAdd={addExpense}
        title={t.newExpense}
        namePlaceholder={t.expensePlaceholder}
        amountPlaceholder={t.amount}
      />

      <AddModal
        isOpen={showAddMonth}
        onClose={() => setShowAddMonth(false)}
        onAdd={name => addMonth(name)}
        title={t.newEntry}
        namePlaceholder={t.monthPlaceholder}
        hideAmount
      />

      {/* Month Context Menu */}
      <ContextMenu
        isOpen={showMonthContext}
        onClose={() => setShowMonthContext(false)}
        options={[
          {
            label: t.editName,
            onClick: () => {
              setEditTarget('month');
              setShowEditName(true);
            }
          },
          {
            label: t.duplicate,
            onClick: () => selectedMonthId && duplicateMonth(selectedMonthId)
          },
          {
            label: months.find(m => m.id === selectedMonthId)?.pinned ? t.unpin : t.pin,
            onClick: () => selectedMonthId && pinMonth(selectedMonthId)
          },
          {
            label: t.delete,
            onClick: () => selectedMonthId && deleteMonth(selectedMonthId),
            destructive: true
          },
          {
            label: t.cancel,
            onClick: () => {}
          }
        ]}
      />

      {/* Expense Context Menu */}
      <ContextMenu
        isOpen={showExpenseContext}
        onClose={() => setShowExpenseContext(false)}
        options={[
          {
            label: t.editName,
            onClick: () => {
              setEditTarget('expense');
              setShowEditName(true);
            }
          },
          {
            label: t.editAmount,
            onClick: () => {
              setEditTarget('expense');
              setShowEditAmount(true);
            }
          },
          {
            label: t.duplicate,
            onClick: () => selectedExpenseId && duplicateExpense(selectedExpenseId)
          },
          {
            label: activeMonth?.expenses.find(e => e.id === selectedExpenseId)?.pinned ? t.unpin : t.pin,
            onClick: () => selectedExpenseId && pinExpense(selectedExpenseId)
          },
          {
            label: t.delete,
            onClick: () => selectedExpenseId && deleteExpense(selectedExpenseId),
            destructive: true
          },
          {
            label: t.cancel,
            onClick: () => {}
          }
        ]}
      />

      {/* Edit Modals */}
      <EditModal
        isOpen={showEditName}
        onClose={() => setShowEditName(false)}
        onSave={value => {
          if (editTarget === 'month' && selectedMonthId) {
            editMonthName(selectedMonthId, String(value));
          } else if (editTarget === 'expense' && selectedExpenseId) {
            editExpense(selectedExpenseId, String(value));
          }
        }}
        title={t.editName}
        currentValue={editTarget === 'month' ? months.find(m => m.id === selectedMonthId)?.name || '' : activeMonth?.expenses.find(e => e.id === selectedExpenseId)?.name || ''}
        type="text"
      />

      <EditModal
        isOpen={showEditAmount}
        onClose={() => setShowEditAmount(false)}
        onSave={value => {
          if (selectedExpenseId) {
            editExpense(selectedExpenseId, undefined, Number(value));
          }
        }}
        title={t.editAmount}
        currentValue={activeMonth?.expenses.find(e => e.id === selectedExpenseId)?.amount || 0}
        type="number"
      />

      <EditModal
        isOpen={showEditBudget}
        onClose={() => setShowEditBudget(false)}
        onSave={value => setBudget(Number(value))}
        title={t.editBudget}
        currentValue={activeMonth?.budget || 0}
        type="number"
      />

      <EditModal
        isOpen={showEditTitle}
        onClose={() => setShowEditTitle(false)}
        onSave={value => setBudgetTitle(String(value))}
        title={t.editTitle}
        currentValue={budgetTitle}
        type="text"
      />

      <PremiumPopup />
    </div>
  );
}
