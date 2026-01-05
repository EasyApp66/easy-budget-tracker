import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    if (isForgotPassword) {
      setIsForgotPassword(false);
      setError('');
    } else {
      navigate('/');
    }
  };

  const handleForgotPassword = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setError('');

    if (!email) {
      setError('Bitte gib deine E-Mail-Adresse ein');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        toast.success('E-Mail zum Zurücksetzen des Passworts wurde gesendet!');
        setIsForgotPassword(false);
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setError('');

    if (!email || !password) {
      setError('Bitte alle Felder ausfüllen');
      return;
    }

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    setIsLoading(true);

    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Passwörter stimmen nicht überein');
        setIsLoading(false);
        return;
      }
      const { error } = await register(email, password);
      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        toast.success('Konto erfolgreich erstellt!');
        navigate('/budget');
      }
    } else {
      const { error } = await login(email, password);
      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        navigate('/budget');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8 safe-top">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center haptic-tap mb-8"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-display text-4xl text-foreground leading-tight">
          {isForgotPassword 
            ? 'Passwort vergessen' 
            : isRegister 
              ? 'Konto erstellen' 
              : 'Willkommen zurück'}
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          {isForgotPassword
            ? 'Gib deine E-Mail ein, um dein Passwort zurückzusetzen'
            : isRegister 
              ? 'Erstelle ein neues Konto' 
              : 'Melde dich an, um fortzufahren'}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
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

        {!isForgotPassword && (
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
        )}

        {isRegister && !isForgotPassword && (
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
      <div className="mt-8 space-y-4">
        {isForgotPassword ? (
          <>
            <button
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl haptic-tap transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? 'Wird gesendet...' : 'Link senden'}
            </button>
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setError('');
              }}
              className="w-full text-muted-foreground text-center py-2"
            >
              Zurück zur <span className="text-primary font-semibold">Anmeldung</span>
            </button>
          </>
        ) : (
          <>
            {!isRegister && (
              <button 
                onClick={() => {
                  setIsForgotPassword(true);
                  setError('');
                }}
                className="w-full text-primary font-semibold text-center py-2"
              >
                Passwort vergessen?
              </button>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl haptic-tap transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? 'Wird geladen...' : isRegister ? 'Registrieren' : 'Anmelden'}
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
          </>
        )}
      </div>
    </div>
  );
}
