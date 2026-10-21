import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

export const metadata: Metadata = {
  title: 'Privacy Policy | EduGenius Hub',
  description: 'What EduGenius Hub collects when you message us or use this website.',
  alternates: { canonical: `${CANONICAL_ORIGIN}/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalArticle title="Privacy Policy">
      <p>This site does not ask you to create an account. We collect the details you send us so we can complete an order.</p>
      <p>
        That can include your name, WhatsApp number, the text of your message, and files you attach for a report or a project. We use this to reply, deliver the order, and handle a refund if one is due.
      </p>
      <p>
        Messages go through WhatsApp. The site is hosted on Hostinger. Those companies process the data needed to deliver their service. We do not sell your details.
      </p>
      <p>
        To ask what we hold, or to ask us to delete an old chat export we stored, email <a className="underline" href="mailto:support@edugeniushub.com">support@edugeniushub.com</a> or WhatsApp +91 87662 53356.
      </p>
    </LegalArticle>
  );
}
