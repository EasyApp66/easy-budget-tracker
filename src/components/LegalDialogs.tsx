import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/contexts/AppContext';

interface LegalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AGBDialog({ open, onOpenChange }: LegalDialogProps) {
  const { language } = useApp();

  const content = {
    DE: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      date: 'Stand: Januar 2025',
      sections: [
        {
          title: '1. Geltungsbereich',
          text: 'Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der Easy Budget App (nachfolgend "App"). Mit der Nutzung der App akzeptieren Sie diese AGB vollumfänglich.',
        },
        {
          title: '2. Vertragsgegenstand',
          text: 'Die App ermöglicht Nutzern die Verwaltung ihres persönlichen Budgets, die Erfassung von Ausgaben und Abonnements. Die App wird in einer kostenlosen Basisversion sowie einer kostenpflichtigen Premium-Version angeboten.',
        },
        {
          title: '3. Registrierung und Nutzerkonto',
          text: 'Für die Nutzung der App ist eine Registrierung erforderlich. Der Nutzer ist verpflichtet, wahrheitsgemässe Angaben zu machen und seine Zugangsdaten vertraulich zu behandeln.',
        },
        {
          title: '4. Premium-Funktionen',
          text: 'Die Premium-Version bietet erweiterte Funktionen wie unbegrenzte Monate, Ausgaben und Abonnements. Die Preise und Zahlungsbedingungen werden vor dem Kauf transparent angezeigt.',
        },
        {
          title: '5. Haftung',
          text: 'Die Nutzung der App erfolgt auf eigene Verantwortung. Wir haften nicht für Schäden, die durch fehlerhafte Dateneingaben oder technische Störungen entstehen, ausser bei grober Fahrlässigkeit oder Vorsatz.',
        },
        {
          title: '6. Änderungen der AGB',
          text: 'Wir behalten uns vor, diese AGB jederzeit zu ändern. Änderungen werden dem Nutzer rechtzeitig mitgeteilt. Die fortgesetzte Nutzung der App gilt als Zustimmung zu den geänderten AGB.',
        },
        {
          title: '7. Anwendbares Recht und Gerichtsstand',
          text: 'Es gilt schweizerisches Recht. Gerichtsstand ist Zürich, Schweiz.',
        },
      ],
    },
    EN: {
      title: 'Terms and Conditions',
      date: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Scope of Application',
          text: 'These Terms and Conditions apply to the use of the Easy Budget App (hereinafter "App"). By using the App, you fully accept these terms.',
        },
        {
          title: '2. Subject Matter',
          text: 'The App enables users to manage their personal budget, track expenses and subscriptions. The App is offered in a free basic version and a paid premium version.',
        },
        {
          title: '3. Registration and User Account',
          text: 'Registration is required to use the App. Users are obligated to provide truthful information and keep their login credentials confidential.',
        },
        {
          title: '4. Premium Features',
          text: 'The premium version offers extended features such as unlimited months, expenses, and subscriptions. Prices and payment terms are displayed transparently before purchase.',
        },
        {
          title: '5. Liability',
          text: 'Use of the App is at your own risk. We are not liable for damages caused by incorrect data entries or technical disruptions, except in cases of gross negligence or intent.',
        },
        {
          title: '6. Changes to Terms',
          text: 'We reserve the right to change these terms at any time. Changes will be communicated to users in a timely manner. Continued use of the App constitutes acceptance of the modified terms.',
        },
        {
          title: '7. Applicable Law and Jurisdiction',
          text: 'Swiss law applies. The place of jurisdiction is Zurich, Switzerland.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{t.date}</p>
            
            {t.sections.map((section, index) => (
              <section key={index}>
                <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function NutzungsbedingungenDialog({ open, onOpenChange }: LegalDialogProps) {
  const { language } = useApp();

  const content = {
    DE: {
      title: 'Nutzungsbedingungen',
      date: 'Stand: Januar 2025',
      sections: [
        {
          title: '1. Nutzungsrechte',
          text: 'Mit der Registrierung erhalten Sie ein nicht-exklusives, nicht übertragbares Recht zur Nutzung der Easy Budget App für persönliche, nicht-kommerzielle Zwecke.',
        },
        {
          title: '2. Pflichten des Nutzers',
          text: 'Der Nutzer verpflichtet sich, die App nicht missbräuchlich zu nutzen, keine illegalen Inhalte zu speichern und keine technischen Schutzmassnahmen zu umgehen.',
        },
        {
          title: '3. Verfügbarkeit',
          text: 'Wir bemühen uns um eine hohe Verfügbarkeit der App, können jedoch keine ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten werden nach Möglichkeit angekündigt.',
        },
        {
          title: '4. Datenspeicherung',
          text: 'Die vom Nutzer eingegebenen Daten werden lokal auf dem Gerät gespeichert. Für die Sicherung der Daten ist der Nutzer selbst verantwortlich.',
        },
        {
          title: '5. Kündigung',
          text: 'Der Nutzer kann sein Konto jederzeit löschen. Bei Verstössen gegen diese Nutzungsbedingungen behalten wir uns vor, den Zugang zur App zu sperren.',
        },
        {
          title: '6. Änderungen',
          text: 'Wir behalten uns vor, diese Nutzungsbedingungen bei Bedarf anzupassen. Wesentliche Änderungen werden dem Nutzer mitgeteilt.',
        },
      ],
    },
    EN: {
      title: 'Terms of Use',
      date: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Usage Rights',
          text: 'Upon registration, you receive a non-exclusive, non-transferable right to use the Easy Budget App for personal, non-commercial purposes.',
        },
        {
          title: '2. User Obligations',
          text: 'Users agree not to misuse the App, not to store illegal content, and not to circumvent technical protection measures.',
        },
        {
          title: '3. Availability',
          text: 'We strive for high availability of the App but cannot guarantee uninterrupted availability. Maintenance work will be announced when possible.',
        },
        {
          title: '4. Data Storage',
          text: 'Data entered by users is stored locally on their device. Users are responsible for backing up their own data.',
        },
        {
          title: '5. Termination',
          text: 'Users can delete their account at any time. In case of violations of these terms, we reserve the right to block access to the App.',
        },
        {
          title: '6. Changes',
          text: 'We reserve the right to modify these terms as needed. Significant changes will be communicated to users.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{t.date}</p>
            
            {t.sections.map((section, index) => (
              <section key={index}>
                <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function DatenschutzDialog({ open, onOpenChange }: LegalDialogProps) {
  const { language } = useApp();

  const content = {
    DE: {
      title: 'Datenschutzerklärung',
      date: 'Stand: Januar 2025',
      sections: [
        {
          title: '1. Verantwortliche Stelle',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSchweiz',
        },
        {
          title: '2. Erhobene Daten',
          text: 'Wir sammeln ausschliesslich Ihre Login-Daten (E-Mail-Adresse und Passwort). Keine weiteren personenbezogenen Daten werden erfasst oder gespeichert.',
          highlight: true,
        },
        {
          title: '3. Lokale Datenspeicherung',
          text: 'Alle Ihre Budget-Daten, Ausgaben und Abonnements werden ausschliesslich lokal auf Ihrem Gerät gespeichert. Diese Daten werden nicht an unsere Server übertragen.',
        },
        {
          title: '4. Verwendungszweck',
          text: 'Ihre Login-Daten werden ausschliesslich zur Authentifizierung und zum Zugang zur App verwendet.',
        },
        {
          title: '5. Datenweitergabe',
          text: 'Wir geben Ihre Daten nicht an Dritte weiter, ausser wenn dies gesetzlich vorgeschrieben ist.',
        },
        {
          title: '6. Ihre Rechte',
          text: 'Gemäss dem schweizerischen Datenschutzgesetz (DSG) haben Sie das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Kontaktieren Sie uns unter support@easybudget.app.',
        },
        {
          title: '7. Datensicherheit',
          text: 'Wir treffen angemessene technische und organisatorische Massnahmen zum Schutz Ihrer Daten gemäss den Anforderungen des schweizerischen Datenschutzgesetzes.',
        },
      ],
    },
    EN: {
      title: 'Privacy Policy',
      date: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Responsible Party',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSwitzerland',
        },
        {
          title: '2. Data Collected',
          text: 'We only collect your login data (email address and password). No other personal data is collected or stored.',
          highlight: true,
        },
        {
          title: '3. Local Data Storage',
          text: 'All your budget data, expenses, and subscriptions are stored exclusively on your device. This data is not transmitted to our servers.',
        },
        {
          title: '4. Purpose of Use',
          text: 'Your login data is used exclusively for authentication and access to the App.',
        },
        {
          title: '5. Data Sharing',
          text: 'We do not share your data with third parties, except when required by law.',
        },
        {
          title: '6. Your Rights',
          text: 'Under Swiss data protection law (DSG), you have the right to access, correct, and delete your data. Contact us at support@easybudget.app.',
        },
        {
          title: '7. Data Security',
          text: 'We implement appropriate technical and organizational measures to protect your data in accordance with Swiss data protection law requirements.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{t.date}</p>
            
            {t.sections.map((section, index) => (
              <section key={index}>
                <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                <p className={section.highlight ? 'font-semibold text-primary whitespace-pre-line' : 'whitespace-pre-line'}>
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ImpressumDialog({ open, onOpenChange }: LegalDialogProps) {
  const { language } = useApp();

  const content = {
    DE: {
      title: 'Impressum',
      sections: [
        {
          title: 'Angaben gemäss schweizerischem Recht',
          text: '',
        },
        {
          title: 'Betreiber der App',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSchweiz',
        },
        {
          title: 'Kontakt',
          text: 'E-Mail: support@easybudget.app',
        },
        {
          title: 'Haftungsausschluss',
          text: 'Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.\n\nHaftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen.',
        },
        {
          title: 'Urheberrechte',
          text: 'Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien in der App gehören ausschliesslich Ivan Mirosnic oder den speziell genannten Rechteinhabern.',
        },
        {
          title: 'Anwendbares Recht',
          text: 'Es gilt ausschliesslich schweizerisches Recht. Gerichtsstand ist Zürich.',
        },
      ],
    },
    EN: {
      title: 'Legal Notice',
      sections: [
        {
          title: 'Information according to Swiss law',
          text: '',
        },
        {
          title: 'App Operator',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSwitzerland',
        },
        {
          title: 'Contact',
          text: 'Email: support@easybudget.app',
        },
        {
          title: 'Disclaimer',
          text: 'The author assumes no responsibility for the correctness, accuracy, timeliness, reliability, and completeness of the information.\n\nLiability claims against the author for damages of a material or immaterial nature arising from access to or use or non-use of the published information are excluded.',
        },
        {
          title: 'Copyright',
          text: 'The copyright and all other rights to content, images, photos, or other files in the App belong exclusively to Ivan Mirosnic or the specifically named rights holders.',
        },
        {
          title: 'Applicable Law',
          text: 'Swiss law applies exclusively. The place of jurisdiction is Zurich.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-muted-foreground">
            {t.sections.map((section, index) => (
              <section key={index}>
                <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                {section.text && <p className="whitespace-pre-line">{section.text}</p>}
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
