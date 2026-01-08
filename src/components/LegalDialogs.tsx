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
    ES: {
      title: 'Términos y Condiciones Generales',
      date: 'Última actualización: Enero 2025',
      sections: [
        {
          title: "1. Ámbito de aplicación",
          text: 'Estos Términos y Condiciones se aplican al uso de la aplicación Easy Budget (en adelante "App"). Al usar la App, aceptas plenamente estos términos.',
        },
        {
          title: '2. Objeto del contrato',
          text: "La App permite a los usuarios gestionar su presupuesto personal, rastrear gastos y suscripciones. La App se ofrece en una versión básica gratuita y una versión premium de pago.",
        },
        {
          title: '3. Registro y cuenta de usuario',
          text: "Es necesario registrarse para usar la App. Los usuarios están obligados a proporcionar información veraz y mantener sus credenciales de acceso confidenciales.",
        },
        {
          title: '4. Funciones Premium',
          text: 'La versión premium ofrece funciones extendidas como meses, gastos y suscripciones ilimitados. Los precios y condiciones de pago se muestran de forma transparente antes de la compra.',
        },
        {
          title: '5. Responsabilidad',
          text: "El uso de la App es bajo tu propio riesgo. No somos responsables por daños causados por entradas de datos incorrectas o interrupciones técnicas, excepto en casos de negligencia grave o intención.",
        },
        {
          title: '6. Cambios en los términos',
          text: "Nos reservamos el derecho de cambiar estos términos en cualquier momento. Los cambios se comunicarán a los usuarios oportunamente. El uso continuado de la App constituye la aceptación de los términos modificados.",
        },
        {
          title: '7. Ley aplicable y jurisdicción',
          text: 'Se aplica la ley suiza. El lugar de jurisdicción es Zúrich, Suiza.',
        },
      ],
    },
    PT: {
      title: 'Termos e Condições Gerais',
      date: 'Última atualização: Janeiro 2025',
      sections: [
        {
          title: "1. Âmbito de aplicação",
          text: 'Estes Termos e Condições aplicam-se ao uso do aplicativo Easy Budget (doravante "App"). Ao usar o App, você aceita plenamente estes termos.',
        },
        {
          title: '2. Objeto do contrato',
          text: "O App permite aos usuários gerenciar seu orçamento pessoal, rastrear despesas e assinaturas. O App é oferecido em uma versão básica gratuita e uma versão premium paga.",
        },
        {
          title: '3. Registro e conta de usuário',
          text: "É necessário se registrar para usar o App. Os usuários são obrigados a fornecer informações verdadeiras e manter suas credenciais de acesso confidenciais.",
        },
        {
          title: '4. Recursos Premium',
          text: 'A versão premium oferece recursos estendidos como meses, despesas e assinaturas ilimitados. Os preços e condições de pagamento são exibidos de forma transparente antes da compra.',
        },
        {
          title: '5. Responsabilidade',
          text: "O uso do App é por sua conta e risco. Não somos responsáveis por danos causados por entradas de dados incorretas ou interrupções técnicas, exceto em casos de negligência grave ou intenção.",
        },
        {
          title: '6. Alterações nos termos',
          text: "Reservamo-nos o direito de alterar estes termos a qualquer momento. As alterações serão comunicadas aos usuários oportunamente. O uso continuado do App constitui a aceitação dos termos modificados.",
        },
        {
          title: '7. Lei aplicável e jurisdição',
          text: 'Aplica-se a lei suíça. O foro competente é Zurique, Suíça.',
        },
      ],
    },
    JA: {
      title: '利用規約',
      date: '最終更新日：2025年1月',
      sections: [
        {
          title: "1. 適用範囲",
          text: 'この利用規約は、Easy Budgetアプリ（以下「アプリ」）の使用に適用されます。アプリを使用することで、これらの規約に完全に同意したことになります。',
        },
        {
          title: '2. 契約の対象',
          text: "アプリは、ユーザーが個人の予算を管理し、支出とサブスクリプションを追跡できるようにします。アプリは無料の基本版と有料のプレミアム版で提供されています。",
        },
        {
          title: '3. 登録とユーザーアカウント',
          text: "アプリを使用するには登録が必要です。ユーザーは正確な情報を提供し、ログイン資格情報を機密に保つ義務があります。",
        },
        {
          title: '4. プレミアム機能',
          text: 'プレミアム版は、無制限の月、支出、サブスクリプションなどの拡張機能を提供します。価格と支払い条件は購入前に透明に表示されます。',
        },
        {
          title: '5. 責任',
          text: "アプリの使用は自己責任で行ってください。重大な過失または故意の場合を除き、誤ったデータ入力や技術的な中断によって生じた損害について当社は責任を負いません。",
        },
        {
          title: '6. 規約の変更',
          text: "当社は、いつでもこれらの規約を変更する権利を留保します。変更はユーザーに適時通知されます。アプリの継続使用は、変更された規約の承諾を構成します。",
        },
        {
          title: '7. 準拠法および管轄',
          text: 'スイス法が適用されます。管轄地はスイス、チューリッヒです。',
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
    ES: {
      title: "Condiciones de uso",
      date: 'Última actualización: Enero 2025',
      sections: [
        {
          title: "1. Derechos de uso",
          text: "Al registrarte, recibes un derecho no exclusivo e intransferible de usar la app Easy Budget para fines personales y no comerciales.",
        },
        {
          title: "2. Obligaciones del usuario",
          text: "Los usuarios se comprometen a no usar la App de manera indebida, a no almacenar contenido ilegal y a no eludir las medidas de protección técnica.",
        },
        {
          title: '3. Disponibilidad',
          text: "Nos esforzamos por una alta disponibilidad de la App pero no podemos garantizar una disponibilidad ininterrumpida. Los trabajos de mantenimiento se anunciarán cuando sea posible.",
        },
        {
          title: '4. Almacenamiento de datos',
          text: "Los datos ingresados por los usuarios se almacenan localmente en su dispositivo. Los usuarios son responsables de hacer copias de seguridad de sus propios datos.",
        },
        {
          title: '5. Terminación',
          text: "Los usuarios pueden eliminar su cuenta en cualquier momento. En caso de violación de estos términos, nos reservamos el derecho de bloquear el acceso a la App.",
        },
        {
          title: '6. Cambios',
          text: "Nos reservamos el derecho de modificar estos términos según sea necesario. Los cambios significativos se comunicarán a los usuarios.",
        },
      ],
    },
    PT: {
      title: "Condições de uso",
      date: 'Última atualização: Janeiro 2025',
      sections: [
        {
          title: "1. Direitos de uso",
          text: "Ao se registrar, você recebe um direito não exclusivo e intransferível de usar o app Easy Budget para fins pessoais e não comerciais.",
        },
        {
          title: "2. Obrigações do usuário",
          text: "Os usuários concordam em não usar o App de forma indevida, não armazenar conteúdo ilegal e não contornar medidas de proteção técnica.",
        },
        {
          title: '3. Disponibilidade',
          text: "Nos esforçamos para alta disponibilidade do App, mas não podemos garantir disponibilidade ininterrupta. Os trabalhos de manutenção serão anunciados quando possível.",
        },
        {
          title: '4. Armazenamento de dados',
          text: "Os dados inseridos pelos usuários são armazenados localmente em seu dispositivo. Os usuários são responsáveis por fazer backup de seus próprios dados.",
        },
        {
          title: '5. Rescisão',
          text: "Os usuários podem excluir sua conta a qualquer momento. Em caso de violação destes termos, reservamo-nos o direito de bloquear o acesso ao App.",
        },
        {
          title: '6. Alterações',
          text: "Reservamo-nos o direito de modificar estes termos conforme necessário. Alterações significativas serão comunicadas aos usuários.",
        },
      ],
    },
    JA: {
      title: "利用条件",
      date: '最終更新日：2025年1月',
      sections: [
        {
          title: "1. 使用権",
          text: "登録することで、Easy Budgetアプリを個人的かつ非商業的な目的で使用するための非独占的かつ譲渡不可能な権利を取得します。",
        },
        {
          title: "2. ユーザーの義務",
          text: "ユーザーは、アプリを悪用しないこと、違法なコンテンツを保存しないこと、技術的保護措置を回避しないことに同意します。",
        },
        {
          title: '3. 可用性',
          text: "アプリの高可用性を目指していますが、中断のない可用性を保証することはできません。メンテナンス作業は可能な限り事前に告知されます。",
        },
        {
          title: '4. データ保存',
          text: "ユーザーが入力したデータは、ユーザーのデバイスにローカルに保存されます。ユーザーは自分のデータのバックアップに責任を負います。",
        },
        {
          title: '5. 終了',
          text: "ユーザーはいつでも自分のアカウントを削除できます。これらの規約に違反した場合、アプリへのアクセスをブロックする権利を留保します。",
        },
        {
          title: '6. 変更',
          text: "必要に応じてこれらの規約を変更する権利を留保します。重要な変更はユーザーに通知されます。",
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
    ES: {
      title: 'Política de privacidad',
      date: 'Última actualización: Enero 2025',
      sections: [
        {
          title: '1. Responsable del tratamiento',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSuiza',
        },
        {
          title: '2. Datos recopilados',
          text: "Solo recopilamos tus datos de inicio de sesión (dirección de correo electrónico y contraseña). No se recopilan ni almacenan otros datos personales.",
          highlight: true,
        },
        {
          title: '3. Almacenamiento local de datos',
          text: "Todos tus datos de presupuesto, gastos y suscripciones se almacenan exclusivamente en tu dispositivo. Estos datos no se transmiten a nuestros servidores.",
        },
        {
          title: "4. Finalidad del uso",
          text: "Tus datos de inicio de sesión se utilizan exclusivamente para la autenticación y el acceso a la App.",
        },
        {
          title: '5. Compartir datos',
          text: 'No compartimos tus datos con terceros, excepto cuando lo exija la ley.',
        },
        {
          title: '6. Tus derechos',
          text: "Según la ley suiza de protección de datos (LPD), tienes derecho a acceder, corregir y eliminar tus datos. Contáctanos en support@easybudget.app.",
        },
        {
          title: '7. Seguridad de datos',
          text: "Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos de acuerdo con los requisitos de la ley suiza de protección de datos.",
        },
      ],
    },
    PT: {
      title: 'Política de Privacidade',
      date: 'Última atualização: Janeiro 2025',
      sections: [
        {
          title: '1. Responsável',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSuíça',
        },
        {
          title: '2. Dados coletados',
          text: "Coletamos apenas seus dados de login (endereço de e-mail e senha). Nenhum outro dado pessoal é coletado ou armazenado.",
          highlight: true,
        },
        {
          title: '3. Armazenamento local de dados',
          text: "Todos os seus dados de orçamento, despesas e assinaturas são armazenados exclusivamente em seu dispositivo. Esses dados não são transmitidos para nossos servidores.",
        },
        {
          title: "4. Finalidade do uso",
          text: "Seus dados de login são usados exclusivamente para autenticação e acesso ao App.",
        },
        {
          title: '5. Compartilhamento de dados',
          text: 'Não compartilhamos seus dados com terceiros, exceto quando exigido por lei.',
        },
        {
          title: '6. Seus direitos',
          text: "De acordo com a lei suíça de proteção de dados (LPD), você tem o direito de acessar, corrigir e excluir seus dados. Entre em contato conosco em support@easybudget.app.",
        },
        {
          title: '7. Segurança de dados',
          text: "Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados de acordo com os requisitos da lei suíça de proteção de dados.",
        },
      ],
    },
    JA: {
      title: 'プライバシーポリシー',
      date: '最終更新日：2025年1月',
      sections: [
        {
          title: '1. 責任者',
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nスイス',
        },
        {
          title: '2. 収集するデータ',
          text: "ログインデータ（メールアドレスとパスワード）のみを収集します。その他の個人データは収集または保存されません。",
          highlight: true,
        },
        {
          title: '3. ローカルデータ保存',
          text: "すべての予算データ、支出、サブスクリプションは、お客様のデバイスにのみ保存されます。これらのデータは当社のサーバーに送信されません。",
        },
        {
          title: "4. 使用目的",
          text: "ログインデータは、認証とアプリへのアクセスのみに使用されます。",
        },
        {
          title: '5. データ共有',
          text: '法律で義務付けられている場合を除き、お客様のデータを第三者と共有することはありません。',
        },
        {
          title: '6. お客様の権利',
          text: "スイスのデータ保護法（LPD）に基づき、データへのアクセス、修正、削除の権利があります。support@easybudget.appまでお問い合わせください。",
        },
        {
          title: '7. データセキュリティ',
          text: "スイスのデータ保護法の要件に従って、お客様のデータを保護するための適切な技術的および組織的措置を実施しています。",
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
    ES: {
      title: 'Aviso legal',
      sections: [
        {
          title: 'Información según la ley suiza',
          text: '',
        },
        {
          title: "Operador de la app",
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSuiza',
        },
        {
          title: 'Contacto',
          text: 'Email: support@easybudget.app',
        },
        {
          title: 'Descargo de responsabilidad',
          text: "El autor no asume responsabilidad por la exactitud, precisión, actualidad, fiabilidad e integridad de la información.\n\nSe excluyen las reclamaciones de responsabilidad contra el autor por daños materiales o inmateriales derivados del acceso o uso o no uso de la información publicada.",
        },
        {
          title: "Derechos de autor",
          text: "Los derechos de autor y todos los demás derechos sobre el contenido, imágenes, fotos u otros archivos en la App pertenecen exclusivamente a Ivan Mirosnic o a los titulares de derechos específicamente mencionados.",
        },
        {
          title: 'Ley aplicable',
          text: "Se aplica exclusivamente la ley suiza. El lugar de jurisdicción es Zúrich.",
        },
      ],
    },
    PT: {
      title: 'Aviso legal',
      sections: [
        {
          title: 'Informações de acordo com a lei suíça',
          text: '',
        },
        {
          title: "Operador do app",
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nSuíça',
        },
        {
          title: 'Contato',
          text: 'Email: support@easybudget.app',
        },
        {
          title: 'Isenção de responsabilidade',
          text: "O autor não assume responsabilidade pela exatidão, precisão, atualidade, confiabilidade e integridade das informações.\n\nAs reivindicações de responsabilidade contra o autor por danos materiais ou imateriais decorrentes do acesso ou uso ou não uso das informações publicadas são excluídas.",
        },
        {
          title: "Direitos autorais",
          text: "Os direitos autorais e todos os outros direitos sobre o conteúdo, imagens, fotos ou outros arquivos no App pertencem exclusivamente a Ivan Mirosnic ou aos titulares de direitos especificamente mencionados.",
        },
        {
          title: 'Lei aplicável',
          text: "Aplica-se exclusivamente a lei suíça. O foro competente é Zurique.",
        },
      ],
    },
    JA: {
      title: '会社概要',
      sections: [
        {
          title: 'スイス法に基づく情報',
          text: '',
        },
        {
          title: "アプリ運営者",
          text: 'Ivan Mirosnic\nAhornstrasse\n8600 Dübendorf\nスイス',
        },
        {
          title: 'お問い合わせ',
          text: 'Email: support@easybudget.app',
        },
        {
          title: '免責事項',
          text: "著者は、情報の正確性、精度、適時性、信頼性、完全性について責任を負いません。\n\n公開された情報へのアクセスまたは使用または不使用から生じる物質的または非物質的な損害に対する著者への責任請求は除外されます。",
        },
        {
          title: "著作権",
          text: "アプリ内のコンテンツ、画像、写真、その他のファイルに関する著作権およびその他すべての権利は、Ivan Mirosnicまたは特定の権利者に独占的に帰属します。",
        },
        {
          title: '準拠法',
          text: "スイス法のみが適用されます。管轄地はチューリッヒです。",
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
