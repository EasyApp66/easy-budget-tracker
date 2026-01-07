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
    FR: {
      title: 'Conditions Générales de Vente (CGV)',
      date: 'Dernière mise à jour: Janvier 2025',
      sections: [
        {
          title: "1. Champ d'application",
          text: "Ces Conditions Générales s'appliquent à l'utilisation de l'application Easy Budget (ci-après \"Application\"). En utilisant l'Application, vous acceptez pleinement ces conditions.",
        },
        {
          title: '2. Objet du contrat',
          text: "L'Application permet aux utilisateurs de gérer leur budget personnel, de suivre leurs dépenses et abonnements. L'Application est proposée en version gratuite de base et en version premium payante.",
        },
        {
          title: '3. Inscription et compte utilisateur',
          text: "L'inscription est requise pour utiliser l'Application. Les utilisateurs sont tenus de fournir des informations véridiques et de garder leurs identifiants de connexion confidentiels.",
        },
        {
          title: '4. Fonctionnalités Premium',
          text: 'La version premium offre des fonctionnalités étendues telles que des mois, dépenses et abonnements illimités. Les prix et conditions de paiement sont affichés de manière transparente avant achat.',
        },
        {
          title: '5. Responsabilité',
          text: "L'utilisation de l'Application est à vos propres risques. Nous ne sommes pas responsables des dommages causés par des saisies de données incorrectes ou des perturbations techniques, sauf en cas de négligence grave ou d'intention.",
        },
        {
          title: '6. Modifications des conditions',
          text: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront communiquées aux utilisateurs en temps opportun. L'utilisation continue de l'Application constitue une acceptation des conditions modifiées.",
        },
        {
          title: '7. Droit applicable et juridiction',
          text: 'Le droit suisse est applicable. Le lieu de juridiction est Zurich, Suisse.',
        },
      ],
    },
    IT: {
      title: 'Termini e Condizioni Generali',
      date: 'Ultimo aggiornamento: Gennaio 2025',
      sections: [
        {
          title: "1. Ambito di applicazione",
          text: 'Questi Termini e Condizioni si applicano all\'utilizzo dell\'app Easy Budget (di seguito "App"). Utilizzando l\'App, accetti pienamente questi termini.',
        },
        {
          title: '2. Oggetto del contratto',
          text: "L'App consente agli utenti di gestire il proprio budget personale, tracciare spese e abbonamenti. L'App è offerta in una versione base gratuita e in una versione premium a pagamento.",
        },
        {
          title: '3. Registrazione e account utente',
          text: "La registrazione è necessaria per utilizzare l'App. Gli utenti sono tenuti a fornire informazioni veritiere e a mantenere riservate le proprie credenziali di accesso.",
        },
        {
          title: '4. Funzionalità Premium',
          text: 'La versione premium offre funzionalità estese come mesi, spese e abbonamenti illimitati. I prezzi e le condizioni di pagamento sono visualizzati in modo trasparente prima dell\'acquisto.',
        },
        {
          title: '5. Responsabilità',
          text: "L'utilizzo dell'App è a proprio rischio. Non siamo responsabili per danni causati da inserimenti dati errati o interruzioni tecniche, salvo in caso di negligenza grave o dolo.",
        },
        {
          title: '6. Modifiche ai termini',
          text: "Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno comunicate agli utenti tempestivamente. L'uso continuato dell'App costituisce accettazione dei termini modificati.",
        },
        {
          title: '7. Legge applicabile e giurisdizione',
          text: 'Si applica il diritto svizzero. Il foro competente è Zurigo, Svizzera.',
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
    FR: {
      title: "Conditions d'utilisation",
      date: 'Dernière mise à jour: Janvier 2025',
      sections: [
        {
          title: "1. Droits d'utilisation",
          text: "Lors de l'inscription, vous recevez un droit non exclusif et non transférable d'utiliser l'application Easy Budget à des fins personnelles et non commerciales.",
        },
        {
          title: "2. Obligations de l'utilisateur",
          text: "Les utilisateurs s'engagent à ne pas utiliser l'Application de manière abusive, à ne pas stocker de contenu illégal et à ne pas contourner les mesures de protection technique.",
        },
        {
          title: '3. Disponibilité',
          text: "Nous nous efforçons d'assurer une haute disponibilité de l'Application mais ne pouvons garantir une disponibilité ininterrompue. Les travaux de maintenance seront annoncés dans la mesure du possible.",
        },
        {
          title: '4. Stockage des données',
          text: "Les données saisies par les utilisateurs sont stockées localement sur leur appareil. Les utilisateurs sont responsables de la sauvegarde de leurs propres données.",
        },
        {
          title: '5. Résiliation',
          text: "Les utilisateurs peuvent supprimer leur compte à tout moment. En cas de violation de ces conditions, nous nous réservons le droit de bloquer l'accès à l'Application.",
        },
        {
          title: '6. Modifications',
          text: "Nous nous réservons le droit de modifier ces conditions selon les besoins. Les modifications importantes seront communiquées aux utilisateurs.",
        },
      ],
    },
    IT: {
      title: "Condizioni d'uso",
      date: 'Ultimo aggiornamento: Gennaio 2025',
      sections: [
        {
          title: "1. Diritti d'uso",
          text: "Al momento della registrazione, ricevi un diritto non esclusivo e non trasferibile di utilizzare l'app Easy Budget per scopi personali e non commerciali.",
        },
        {
          title: "2. Obblighi dell'utente",
          text: "Gli utenti si impegnano a non utilizzare l'App in modo improprio, a non memorizzare contenuti illegali e a non aggirare le misure di protezione tecnica.",
        },
        {
          title: '3. Disponibilità',
          text: "Ci impegniamo per un'alta disponibilità dell'App ma non possiamo garantire una disponibilità ininterrotta. I lavori di manutenzione saranno annunciati quando possibile.",
        },
        {
          title: '4. Archiviazione dati',
          text: "I dati inseriti dagli utenti sono memorizzati localmente sul loro dispositivo. Gli utenti sono responsabili del backup dei propri dati.",
        },
        {
          title: '5. Risoluzione',
          text: "Gli utenti possono eliminare il proprio account in qualsiasi momento. In caso di violazione di questi termini, ci riserviamo il diritto di bloccare l'accesso all'App.",
        },
        {
          title: '6. Modifiche',
          text: "Ci riserviamo il diritto di modificare questi termini secondo necessità. Le modifiche significative saranno comunicate agli utenti.",
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
    FR: {
      title: 'Politique de confidentialité',
      date: 'Dernière mise à jour: Janvier 2025',
      sections: [
        {
          title: '1. Responsable du traitement',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSuisse',
        },
        {
          title: '2. Données collectées',
          text: "Nous ne collectons que vos données de connexion (adresse email et mot de passe). Aucune autre donnée personnelle n'est collectée ou stockée.",
          highlight: true,
        },
        {
          title: '3. Stockage local des données',
          text: "Toutes vos données budgétaires, dépenses et abonnements sont stockés exclusivement sur votre appareil. Ces données ne sont pas transmises à nos serveurs.",
        },
        {
          title: "4. Finalité d'utilisation",
          text: "Vos données de connexion sont utilisées exclusivement pour l'authentification et l'accès à l'Application.",
        },
        {
          title: '5. Partage des données',
          text: 'Nous ne partageons pas vos données avec des tiers, sauf lorsque la loi nous y oblige.',
        },
        {
          title: '6. Vos droits',
          text: "En vertu de la loi suisse sur la protection des données (LPD), vous avez le droit d'accéder, de corriger et de supprimer vos données. Contactez-nous à support@easybudget.app.",
        },
        {
          title: '7. Sécurité des données',
          text: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données conformément aux exigences de la loi suisse sur la protection des données.",
        },
      ],
    },
    IT: {
      title: 'Informativa sulla privacy',
      date: 'Ultimo aggiornamento: Gennaio 2025',
      sections: [
        {
          title: '1. Titolare del trattamento',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSvizzera',
        },
        {
          title: '2. Dati raccolti',
          text: "Raccogliamo solo i tuoi dati di accesso (indirizzo email e password). Nessun altro dato personale viene raccolto o memorizzato.",
          highlight: true,
        },
        {
          title: '3. Archiviazione locale dei dati',
          text: "Tutti i tuoi dati di budget, spese e abbonamenti sono memorizzati esclusivamente sul tuo dispositivo. Questi dati non vengono trasmessi ai nostri server.",
        },
        {
          title: "4. Finalità d'uso",
          text: "I tuoi dati di accesso sono utilizzati esclusivamente per l'autenticazione e l'accesso all'App.",
        },
        {
          title: '5. Condivisione dei dati',
          text: 'Non condividiamo i tuoi dati con terze parti, salvo quando richiesto dalla legge.',
        },
        {
          title: '6. I tuoi diritti',
          text: "Ai sensi della legge svizzera sulla protezione dei dati (LPD), hai il diritto di accedere, correggere ed eliminare i tuoi dati. Contattaci a support@easybudget.app.",
        },
        {
          title: '7. Sicurezza dei dati',
          text: "Implementiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati in conformità con i requisiti della legge svizzera sulla protezione dei dati.",
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
    FR: {
      title: 'Mentions légales',
      sections: [
        {
          title: 'Informations selon le droit suisse',
          text: '',
        },
        {
          title: "Opérateur de l'application",
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSuisse',
        },
        {
          title: 'Contact',
          text: 'Email: support@easybudget.app',
        },
        {
          title: 'Clause de non-responsabilité',
          text: "L'auteur n'assume aucune responsabilité quant à l'exactitude, la précision, l'actualité, la fiabilité et l'exhaustivité des informations.\n\nLes réclamations en responsabilité contre l'auteur pour des dommages de nature matérielle ou immatérielle résultant de l'accès ou de l'utilisation ou de la non-utilisation des informations publiées sont exclues.",
        },
        {
          title: "Droits d'auteur",
          text: "Les droits d'auteur et tous les autres droits sur le contenu, les images, les photos ou autres fichiers de l'Application appartiennent exclusivement à Ivan Mirosnic ou aux titulaires de droits spécifiquement mentionnés.",
        },
        {
          title: 'Droit applicable',
          text: "Le droit suisse s'applique exclusivement. Le lieu de juridiction est Zurich.",
        },
      ],
    },
    IT: {
      title: 'Note legali',
      sections: [
        {
          title: 'Informazioni secondo il diritto svizzero',
          text: '',
        },
        {
          title: "Operatore dell'app",
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSvizzera',
        },
        {
          title: 'Contatto',
          text: 'Email: support@easybudget.app',
        },
        {
          title: 'Esclusione di responsabilità',
          text: "L'autore non si assume alcuna responsabilità per la correttezza, l'accuratezza, l'attualità, l'affidabilità e la completezza delle informazioni.\n\nLe richieste di risarcimento danni nei confronti dell'autore per danni materiali o immateriali derivanti dall'accesso o dall'uso o dal mancato uso delle informazioni pubblicate sono escluse.",
        },
        {
          title: "Diritti d'autore",
          text: "I diritti d'autore e tutti gli altri diritti sui contenuti, le immagini, le foto o altri file nell'App appartengono esclusivamente a Ivan Mirosnic o ai titolari dei diritti specificamente menzionati.",
        },
        {
          title: 'Legge applicabile',
          text: "Si applica esclusivamente il diritto svizzero. Il foro competente è Zurigo.",
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
