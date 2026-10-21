import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

export const metadata: Metadata = {
  title: 'Terms of Service | EduGenius Hub',
  description: 'How orders, delivery, and payment work at EduGenius Hub.',
  alternates: { canonical: `${CANONICAL_ORIGIN}/terms` },
};

export default function TermsPage() {
  return (
    <LegalArticle title="Terms of Service">
      <p>EduGenius Hub is based in India. These terms cover orders you place with us on WhatsApp.</p>
      <p>
        We sell EduGenius similarity and AI-writing reports, access to third-party tools and subscriptions, academic writing help, and website or app development. The price and delivery time on the product page are the ones that apply. If a page has no delivery time, ask us on WhatsApp before you pay.
      </p>
      <p>
        An order starts when you message us and we confirm the price. You can stop before you pay. After you pay, we send the report, login steps, or project update on WhatsApp.
      </p>
      <p>
        Some tool and subscription access is shared. Do not change the password or account settings on a shared login. Access can stop if the original provider changes its rules. We are not the provider of those services.
      </p>
      <p>
        Report files are prepared for you to read. We do not submit work to a college or a journal for you.
      </p>
      <p>
        Questions: WhatsApp +91 87662 53356 or <a className="underline" href="mailto:support@edugeniushub.com">support@edugeniushub.com</a>.
      </p>
    </LegalArticle>
  );
}
