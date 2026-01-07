import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Globe, 
  RefreshCw, 
  Star, 
  FileText, 
  Shield, 
  Lock, 
  Building, 
  HelpCircle, 
  Bug, 
  Lightbulb, 
  Heart,
  ChevronRight,
  Pencil
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { PremiumPopup } from '@/components/PremiumPopup';
import { FeedbackModal } from '@/components/FeedbackModal';
import { DonationModal } from '@/components/DonationModal';
import { 
  AGBDialog, 
  NutzungsbedingungenDialog, 
  DatenschutzDialog, 
  ImpressumDialog 
} from '@/components/LegalDialogs';
import { toast } from 'sonner';

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout, language, toggleLanguage, setShowPremiumPopup, updateUsername } = useApp();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.username || '');
  const [showAGB, setShowAGB] = useState(false);
  const [showNutzungsbedingungen, setShowNutzungsbedingungen] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  
  // Feedback modals
  const [feedbackType, setFeedbackType] = useState<'support' | 'bug' | 'suggestion' | null>(null);
  const [showDonation, setShowDonation] = useState(false);

  const content = {
    DE: {
      tapToChangeName: 'Tippe um Namen zu ändern',
      enterName: 'Name eingeben',
      premium: 'Premium',
      yes: 'Ja',
      no: 'Nein',
      logout: 'Ausloggen',
      changeLanguage: 'Sprache ändern',
      german: 'Deutsch',
      english: 'English',
      restorePremium: 'Premium Wiederherstellen',
      buyPremium: 'Premium Kaufen',
      agb: 'AGB',
      termsOfUse: 'Nutzungsbedingungen',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      support: 'Support',
      reportBug: 'Bug Melden',
      suggestion: 'Vorschlag',
      donation: 'Donation',
      version: 'Version',
      madeWith: 'Made with',
      shareText: 'Schau dir diese tolle Budget-App an!',
      linkCopied: 'Link kopiert!',
      donationSuccess: 'Vielen Dank für deine Spende! ❤️',
    },
    EN: {
      tapToChangeName: 'Tap to change name',
      enterName: 'Enter name',
      premium: 'Premium',
      yes: 'Yes',
      no: 'No',
      logout: 'Logout',
      changeLanguage: 'Change Language',
      german: 'Deutsch',
      english: 'English',
      restorePremium: 'Restore Premium',
      buyPremium: 'Buy Premium',
      agb: 'Terms & Conditions',
      termsOfUse: 'Terms of Use',
      privacy: 'Privacy Policy',
      imprint: 'Imprint',
      support: 'Support',
      reportBug: 'Report Bug',
      suggestion: 'Suggestion',
      donation: 'Donation',
      version: 'Version',
      madeWith: 'Made with',
      shareText: 'Check out this great budget app!',
      linkCopied: 'Link copied!',
      donationSuccess: 'Thank you for your donation! ❤️',
    },
  };

  const t = content[language];

  // Check for donation success
  useEffect(() => {
    if (searchParams.get('donation') === 'success') {
      toast.success(t.donationSuccess);
    }
  }, [searchParams, t.donationSuccess]);

  const handleLogout = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    await logout();
    navigate('/');
  };

  const handlePremiumRestore = async () => {
    if ('vibrate' in navigator) navigator.vibrate(10);
    await logout();
    navigate('/');
  };

  const handleSaveName = async () => {
    if (editedName.trim()) {
      await updateUsername(editedName.trim());
    }
    setIsEditingName(false);
  };

  const menuItems = [
    {
      icon: LogOut,
      label: t.logout,
      onClick: handleLogout,
      iconColor: 'text-primary',
    },
    {
      icon: Globe,
      label: `${t.changeLanguage}: ${language === 'DE' ? t.german : t.english}`,
      onClick: toggleLanguage,
      iconColor: 'text-primary',
    },
    {
      icon: RefreshCw,
      label: t.restorePremium,
      onClick: handlePremiumRestore,
      iconColor: 'text-primary',
    },
    {
      icon: Star,
      label: t.buyPremium,
      onClick: () => setShowPremiumPopup(true),
      iconColor: 'text-primary',
    },
    {
      icon: FileText,
      label: t.agb,
      onClick: () => setShowAGB(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Shield,
      label: t.termsOfUse,
      onClick: () => setShowNutzungsbedingungen(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Lock,
      label: t.privacy,
      onClick: () => setShowDatenschutz(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Building,
      label: t.imprint,
      onClick: () => setShowImpressum(true),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: HelpCircle,
      label: t.support,
      onClick: () => setFeedbackType('support'),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Bug,
      label: t.reportBug,
      onClick: () => setFeedbackType('bug'),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Lightbulb,
      label: t.suggestion,
      onClick: () => setFeedbackType('suggestion'),
      iconColor: 'text-muted-foreground',
    },
    {
      icon: Heart,
      label: t.donation,
      onClick: () => setShowDonation(true),
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 safe-top">
      <div className="px-4 pt-6 space-y-4">
        {/* Profile Card */}
        <div className="bg-card rounded-3xl p-6 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-4 ring-4 ring-primary/30">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>

          {/* Editable Username */}
          {isEditingName ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              autoFocus
              className="text-display text-2xl text-foreground text-center mb-1 bg-transparent border-b-2 border-primary outline-none"
              placeholder={t.enterName}
            />
          ) : (
            <button
              onClick={() => {
                setEditedName(user?.username || '');
                setIsEditingName(true);
              }}
              className="flex items-center gap-2 mb-1 group"
            >
              <h2 className="text-display text-2xl text-foreground text-center">
                {user?.username || t.enterName}
              </h2>
              <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          {/* Hint text */}
          <p className="text-muted-foreground text-sm text-center mb-4">
            {t.tapToChangeName}
          </p>

          {/* Premium Status */}
          <div className="bg-secondary rounded-full px-6 py-2">
            <p className="text-foreground font-semibold">
              {t.premium}: {user?.isPremium ? t.yes : t.no}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if ('vibrate' in navigator) navigator.vibrate(10);
                item.onClick();
              }}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 haptic-tap transition-all hover:bg-card/80"
            >
              <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${item.iconColor}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-foreground font-semibold flex-1 text-left">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">{t.version} 1.0.0</p>
          <p className="text-muted-foreground text-sm mt-1">
            {t.madeWith} <span className="text-destructive">❤️</span>
          </p>
        </div>
      </div>

      <BottomNav onAddClick={async () => {
        if ('vibrate' in navigator) navigator.vibrate(10);
        const shareData = {
          title: 'EasyBudget',
          text: t.shareText,
          url: window.location.origin,
        };
        
        if (navigator.share && navigator.canShare?.(shareData)) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            if ((err as Error).name !== 'AbortError') {
              await navigator.clipboard.writeText(window.location.origin);
              toast.success(t.linkCopied);
            }
          }
        } else {
          await navigator.clipboard.writeText(window.location.origin);
          toast.success(t.linkCopied);
        }
      }} />
      <PremiumPopup />
      
      {/* Legal Dialogs */}
      <AGBDialog open={showAGB} onOpenChange={setShowAGB} />
      <NutzungsbedingungenDialog open={showNutzungsbedingungen} onOpenChange={setShowNutzungsbedingungen} />
      <DatenschutzDialog open={showDatenschutz} onOpenChange={setShowDatenschutz} />
      <ImpressumDialog open={showImpressum} onOpenChange={setShowImpressum} />
      
      {/* Feedback & Donation Modals */}
      <FeedbackModal 
        isOpen={feedbackType !== null} 
        onClose={() => setFeedbackType(null)} 
        type={feedbackType || 'support'} 
      />
      <DonationModal isOpen={showDonation} onClose={() => setShowDonation(false)} />
    </div>
  );
}
