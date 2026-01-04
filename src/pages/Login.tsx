import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useNavigation } from '@/contexts/NavigationContext';

export default function Login() {
  const { navigateTo, goBack } = useNavigation();
  const { login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleBack = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    goBack();
  };

  const handleSubmit = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setError('');

    if (!email || !password) {
      setError('Bitte alle Felder ausfüllen');
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Passwörter stimmen nicht überein');
        return;
      }
      if (register(email, password)) {
        navigateTo('/budget');
      }
    } else {
      if (login(email, password)) {
        navigateTo('/budget');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8 safe-top">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center haptic-tap mb-8 animate-fade-in"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      {/* Title */}
      <div className="mb-8 animate-slide-up">
        <h1 className="text-display text-4xl text-foreground leading-tight">
          {isRegister ? 'Konto erstellen' : 'Willkommen zurück'}
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          {isRegister ? 'Erstelle ein neues Konto' : 'Melde dich an, um fortzufahren'}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div>
          <label className="text-label text-sm text-foreground mb-2 block">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.com"
            className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div>
          <label className="text-label text-sm text-foreground mb-2 block">Passwort</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {isRegister && (
          <div>
            <label className="text-label text-sm text-foreground mb-2 block">Passwort bestätigen</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        )}

        {error && (
          <p className="text-destructive text-sm text-center">{error}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {!isRegister && (
          <button className="w-full text-primary font-semibold text-center py-2">
            Passwort vergessen?
          </button>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl haptic-tap transition-all active:scale-98"
        >
          {isRegister ? 'Registrieren' : 'Anmelden'}
        </button>

        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          className="w-full text-muted-foreground text-center py-2"
        >
          {isRegister ? 'Bereits ein Konto? ' : 'Noch kein Konto? '}
          <span className="text-primary font-semibold">
            {isRegister ? 'Anmelden' : 'Registrieren'}
          </span>
        </button>
      </div>
    </div>
  );
}
