import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Apple } from 'lucide-react';
import { AGBDialog, NutzungsbedingungenDialog, DatenschutzDialog } from '@/components/LegalDialogs';
import { useApp } from '@/contexts/AppContext';

export default function Welcome() {
  const navigate = useNavigate();
  const { language } = useApp();
  const [showNutzungsbedingungen, setShowNutzungsbedingungen] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showAGB, setShowAGB] = useState(false);

  const content = {
    DE: {
      hello: 'Hallo! Ich bin',
      track: 'Tracke',
      your: 'dein',
      budget: 'BUDGET',
      andYour: 'und deine',
      abos: 'ABOS',
      emailButton: 'Mit E-Mail fortfahren',
      appleButton: 'Mit Apple fortfahren',
      googleButton: 'Mit Google fortfahren',
      footer: 'Indem du fortfährst, bestätigst du, dass du die',
      termsOfUse: 'Nutzungsbedingungen',
      and: 'und die',
      privacy: 'Datenschutzerklärung',
      agb: 'AGBs',
      readText: 'gelesen hast.',
    },
    EN: {
      hello: "Hi! I'm",
      track: 'Track',
      your: 'your',
      budget: 'BUDGET',
      andYour: 'and your',
      abos: 'SUBSCRIPTIONS',
      emailButton: 'Continue with Email',
      appleButton: 'Continue with Apple',
      googleButton: 'Continue with Google',
      footer: 'By continuing, you confirm that you have read the',
      termsOfUse: 'Terms of Use',
      and: 'and the',
      privacy: 'Privacy Policy',
      agb: 'Terms & Conditions',
      readText: '.',
    },
    FR: {
      hello: 'Bonjour! Je suis',
      track: 'Suivez',
      your: 'votre',
      budget: 'BUDGET',
      andYour: 'et vos',
      abos: 'ABONNEMENTS',
      emailButton: 'Continuer avec Email',
      appleButton: 'Continuer avec Apple',
      googleButton: 'Continuer avec Google',
      footer: 'En continuant, vous confirmez avoir lu les',
      termsOfUse: "Conditions d'utilisation",
      and: 'et la',
      privacy: 'Politique de confidentialité',
      agb: 'CGV',
      readText: '.',
    },
    IT: {
      hello: 'Ciao! Sono',
      track: 'Traccia',
      your: 'il tuo',
      budget: 'BUDGET',
      andYour: 'e i tuoi',
      abos: 'ABBONAMENTI',
      emailButton: 'Continua con Email',
      appleButton: 'Continua con Apple',
      googleButton: 'Continua con Google',
      footer: 'Continuando, confermi di aver letto i',
      termsOfUse: "Termini d'uso",
      and: 'e la',
      privacy: 'Informativa sulla privacy',
      agb: 'Termini e Condizioni',
      readText: '.',
    },
    ES: {
      hello: '¡Hola! Soy',
      track: 'Rastrea',
      your: 'tu',
      budget: 'PRESUPUESTO',
      andYour: 'y tus',
      abos: 'SUSCRIPCIONES',
      emailButton: 'Continuar con Email',
      appleButton: 'Continuar con Apple',
      googleButton: 'Continuar con Google',
      footer: 'Al continuar, confirmas que has leído los',
      termsOfUse: 'Términos de uso',
      and: 'y la',
      privacy: 'Política de privacidad',
      agb: 'Términos y Condiciones',
      readText: '.',
    },
    PT: {
      hello: 'Olá! Eu sou',
      track: 'Rastreie',
      your: 'o seu',
      budget: 'ORÇAMENTO',
      andYour: 'e as suas',
      abos: 'ASSINATURAS',
      emailButton: 'Continuar com Email',
      appleButton: 'Continuar com Apple',
      googleButton: 'Continuar com Google',
      footer: 'Ao continuar, confirma que leu os',
      termsOfUse: 'Termos de uso',
      and: 'e a',
      privacy: 'Política de privacidade',
      agb: 'Termos e Condições',
      readText: '.',
    },
    JA: {
      hello: 'こんにちは！私は',
      track: '管理しよう',
      your: 'あなたの',
      budget: '予算',
      andYour: 'そして',
      abos: 'サブスク',
      emailButton: 'メールで続ける',
      appleButton: 'Appleで続ける',
      googleButton: 'Googleで続ける',
      footer: '続けることで、',
      termsOfUse: '利用規約',
      and: 'と',
      privacy: 'プライバシーポリシー',
      agb: '契約条件',
      readText: 'を読んだことを確認します。',
    },
  };

  const t = content[language];

  const handleEmailClick = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    navigate('/login');
  };

  const handleAppleClick = () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-12 safe-top">
      {/* Hero Text */}
      <div className="flex-1 flex flex-col justify-center">
        <div>
          <p className="text-display text-3xl text-foreground leading-tight">
            {t.hello}
          </p>
          <h1 className="text-display text-4xl text-primary leading-tight mt-1">
            EASY BUDGET
          </h1>
        </div>

        <div className="mt-12">
          <p className="text-display text-5xl text-foreground leading-tight">
            {t.track}
          </p>
          <p className="text-display text-5xl text-foreground leading-tight">
            {t.your}
          </p>
          <p className="text-display text-6xl text-primary leading-tight">
            {t.budget}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-display text-5xl text-foreground leading-tight">
            {t.andYour}
          </p>
          <p className="text-display text-6xl text-primary leading-tight">
            {t.abos}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-4 mb-8">
        <button
          onClick={handleEmailClick}
          className="w-full bg-primary text-primary-foreground font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 haptic-tap transition-all active:scale-98"
        >
          <Mail className="w-5 h-5" />
          {t.emailButton}
        </button>

        <button
          onClick={handleAppleClick}
          className="w-full bg-foreground text-background font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 haptic-tap transition-all active:scale-98"
        >
          <Apple className="w-5 h-5" />
          {t.appleButton}
        </button>

        <button
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            navigate('/login');
          }}
          className="w-full bg-card border border-border text-foreground font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-3 haptic-tap transition-all active:scale-98"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.googleButton}
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          {t.footer}{' '}
          <button 
            onClick={() => setShowNutzungsbedingungen(true)}
            className="text-primary underline"
          >
            {t.termsOfUse}
          </button>
          {' '}{t.and}{' '}
          <button 
            onClick={() => setShowDatenschutz(true)}
            className="text-primary underline"
          >
            {t.privacy}
          </button>
          {' '}{t.and}{' '}
          <button 
            onClick={() => setShowAGB(true)}
            className="text-primary underline"
          >
            {t.agb}
          </button>
          {' '}{t.readText}
        </p>
      </div>

      {/* Legal Dialogs */}
      <NutzungsbedingungenDialog 
        open={showNutzungsbedingungen} 
        onOpenChange={setShowNutzungsbedingungen} 
      />
      <DatenschutzDialog 
        open={showDatenschutz} 
        onOpenChange={setShowDatenschutz} 
      />
      <AGBDialog 
        open={showAGB} 
        onOpenChange={setShowAGB} 
      />
    </div>
  );
}
