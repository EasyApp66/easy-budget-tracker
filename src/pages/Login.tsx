import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login, register, language } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    DE: {
      forgotPasswordTitle: 'Passwort vergessen',
      createAccountTitle: 'Konto erstellen',
      welcomeBackTitle: 'Willkommen zurück',
      forgotPasswordSubtitle: 'Gib deine E-Mail ein, um dein Passwort zurückzusetzen',
      createAccountSubtitle: 'Erstelle ein neues Konto',
      loginSubtitle: 'Melde dich an, um fortzufahren',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'deine@email.com',
      passwordLabel: 'Passwort',
      confirmPasswordLabel: 'Passwort bestätigen',
      sendLink: 'Link senden',
      sending: 'Wird gesendet...',
      backToLogin: 'Zurück zur',
      login: 'Anmeldung',
      forgotPassword: 'Passwort vergessen?',
      loading: 'Wird geladen...',
      registerBtn: 'Registrieren',
      loginBtn: 'Anmelden',
      alreadyHaveAccount: 'Bereits ein Konto?',
      noAccount: 'Noch kein Konto?',
      fillAllFields: 'Bitte alle Felder ausfüllen',
      passwordMinLength: 'Passwort muss mindestens 6 Zeichen lang sein',
      passwordsNoMatch: 'Passwörter stimmen nicht überein',
      accountCreated: 'Konto erfolgreich erstellt!',
      resetEmailSent: 'E-Mail zum Zurücksetzen des Passworts wurde gesendet!',
      enterEmail: 'Bitte gib deine E-Mail-Adresse ein',
      errorOccurred: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.',
    },
    EN: {
      forgotPasswordTitle: 'Forgot Password',
      createAccountTitle: 'Create Account',
      welcomeBackTitle: 'Welcome Back',
      forgotPasswordSubtitle: 'Enter your email to reset your password',
      createAccountSubtitle: 'Create a new account',
      loginSubtitle: 'Sign in to continue',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      sendLink: 'Send Link',
      sending: 'Sending...',
      backToLogin: 'Back to',
      login: 'Login',
      forgotPassword: 'Forgot password?',
      loading: 'Loading...',
      registerBtn: 'Register',
      loginBtn: 'Sign In',
      alreadyHaveAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      fillAllFields: 'Please fill in all fields',
      passwordMinLength: 'Password must be at least 6 characters',
      passwordsNoMatch: "Passwords don't match",
      accountCreated: 'Account created successfully!',
      resetEmailSent: 'Password reset email has been sent!',
      enterEmail: 'Please enter your email address',
      errorOccurred: 'An error occurred. Please try again.',
    },
    FR: {
      forgotPasswordTitle: 'Mot de passe oublié',
      createAccountTitle: 'Créer un compte',
      welcomeBackTitle: 'Bon retour',
      forgotPasswordSubtitle: 'Entrez votre email pour réinitialiser votre mot de passe',
      createAccountSubtitle: 'Créer un nouveau compte',
      loginSubtitle: 'Connectez-vous pour continuer',
      emailLabel: 'Email',
      emailPlaceholder: 'votre@email.com',
      passwordLabel: 'Mot de passe',
      confirmPasswordLabel: 'Confirmer le mot de passe',
      sendLink: 'Envoyer le lien',
      sending: 'Envoi en cours...',
      backToLogin: 'Retour à la',
      login: 'Connexion',
      forgotPassword: 'Mot de passe oublié?',
      loading: 'Chargement...',
      registerBtn: "S'inscrire",
      loginBtn: 'Se connecter',
      alreadyHaveAccount: 'Déjà un compte?',
      noAccount: "Pas encore de compte?",
      fillAllFields: 'Veuillez remplir tous les champs',
      passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères',
      passwordsNoMatch: 'Les mots de passe ne correspondent pas',
      accountCreated: 'Compte créé avec succès!',
      resetEmailSent: 'Email de réinitialisation envoyé!',
      enterEmail: 'Veuillez entrer votre adresse email',
      errorOccurred: 'Une erreur est survenue. Veuillez réessayer.',
    },
    IT: {
      forgotPasswordTitle: 'Password dimenticata',
      createAccountTitle: 'Crea account',
      welcomeBackTitle: 'Bentornato',
      forgotPasswordSubtitle: 'Inserisci la tua email per reimpostare la password',
      createAccountSubtitle: 'Crea un nuovo account',
      loginSubtitle: 'Accedi per continuare',
      emailLabel: 'Email',
      emailPlaceholder: 'tua@email.com',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Conferma password',
      sendLink: 'Invia link',
      sending: 'Invio in corso...',
      backToLogin: 'Torna al',
      login: 'Login',
      forgotPassword: 'Password dimenticata?',
      loading: 'Caricamento...',
      registerBtn: 'Registrati',
      loginBtn: 'Accedi',
      alreadyHaveAccount: 'Hai già un account?',
      noAccount: 'Non hai un account?',
      fillAllFields: 'Compila tutti i campi',
      passwordMinLength: 'La password deve contenere almeno 6 caratteri',
      passwordsNoMatch: 'Le password non corrispondono',
      accountCreated: 'Account creato con successo!',
      resetEmailSent: 'Email di reimpostazione inviata!',
      enterEmail: 'Inserisci il tuo indirizzo email',
      errorOccurred: 'Si è verificato un errore. Riprova.',
    },
    ES: {
      forgotPasswordTitle: 'Olvidé mi contraseña',
      createAccountTitle: 'Crear cuenta',
      welcomeBackTitle: 'Bienvenido de nuevo',
      forgotPasswordSubtitle: 'Introduce tu email para restablecer tu contraseña',
      createAccountSubtitle: 'Crear una nueva cuenta',
      loginSubtitle: 'Inicia sesión para continuar',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      passwordLabel: 'Contraseña',
      confirmPasswordLabel: 'Confirmar contraseña',
      sendLink: 'Enviar enlace',
      sending: 'Enviando...',
      backToLogin: 'Volver al',
      login: 'Inicio de sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      loading: 'Cargando...',
      registerBtn: 'Registrarse',
      loginBtn: 'Iniciar sesión',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      noAccount: '¿No tienes cuenta?',
      fillAllFields: 'Por favor completa todos los campos',
      passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
      passwordsNoMatch: 'Las contraseñas no coinciden',
      accountCreated: '¡Cuenta creada exitosamente!',
      resetEmailSent: '¡Email de restablecimiento enviado!',
      enterEmail: 'Por favor introduce tu dirección de email',
      errorOccurred: 'Ocurrió un error. Por favor intenta de nuevo.',
    },
    PT: {
      forgotPasswordTitle: 'Esqueci a senha',
      createAccountTitle: 'Criar conta',
      welcomeBackTitle: 'Bem-vindo de volta',
      forgotPasswordSubtitle: 'Insira seu email para redefinir sua senha',
      createAccountSubtitle: 'Criar uma nova conta',
      loginSubtitle: 'Faça login para continuar',
      emailLabel: 'Email',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      confirmPasswordLabel: 'Confirmar senha',
      sendLink: 'Enviar link',
      sending: 'Enviando...',
      backToLogin: 'Voltar ao',
      login: 'Login',
      forgotPassword: 'Esqueceu sua senha?',
      loading: 'Carregando...',
      registerBtn: 'Registrar',
      loginBtn: 'Entrar',
      alreadyHaveAccount: 'Já tem uma conta?',
      noAccount: 'Não tem conta?',
      fillAllFields: 'Por favor preencha todos os campos',
      passwordMinLength: 'A senha deve ter pelo menos 6 caracteres',
      passwordsNoMatch: 'As senhas não coincidem',
      accountCreated: 'Conta criada com sucesso!',
      resetEmailSent: 'Email de redefinição enviado!',
      enterEmail: 'Por favor insira seu endereço de email',
      errorOccurred: 'Ocorreu um erro. Por favor tente novamente.',
    },
  };

  const t = content[language];

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
      setError(t.enterEmail);
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
        toast.success(t.resetEmailSent);
        setIsForgotPassword(false);
      }
    } catch (err) {
      setError(t.errorOccurred);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    setError('');

    if (!email || !password) {
      setError(t.fillAllFields);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordMinLength);
      return;
    }

    setIsLoading(true);

    if (isRegister) {
      if (password !== confirmPassword) {
        setError(t.passwordsNoMatch);
        setIsLoading(false);
        return;
      }
      const { error } = await register(email, password);
      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        toast.success(t.accountCreated);
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
            ? t.forgotPasswordTitle 
            : isRegister 
              ? t.createAccountTitle 
              : t.welcomeBackTitle}
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          {isForgotPassword
            ? t.forgotPasswordSubtitle
            : isRegister 
              ? t.createAccountSubtitle 
              : t.loginSubtitle}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-label text-sm text-foreground mb-2 block">{t.emailLabel}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full bg-card rounded-xl px-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {!isForgotPassword && (
          <div>
            <label className="text-label text-sm text-foreground mb-2 block">{t.passwordLabel}</label>
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
            <label className="text-label text-sm text-foreground mb-2 block">{t.confirmPasswordLabel}</label>
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
              {isLoading ? t.sending : t.sendLink}
            </button>
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setError('');
              }}
              className="w-full text-muted-foreground text-center py-2"
            >
              {t.backToLogin} <span className="text-primary font-semibold">{t.login}</span>
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
                {t.forgotPassword}
              </button>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl haptic-tap transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? t.loading : isRegister ? t.registerBtn : t.loginBtn}
            </button>

            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="w-full text-muted-foreground text-center py-2"
            >
              {isRegister ? t.alreadyHaveAccount + ' ' : t.noAccount + ' '}
              <span className="text-primary font-semibold">
                {isRegister ? t.loginBtn : t.registerBtn}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
