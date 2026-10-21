import type { Metadata } from 'next';
import Link from 'next/link';
import LegalArticle from '@/components/legal/LegalArticle';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

export const metadata: Metadata = {
  title: 'Refund and cancellation | EduGenius Hub',
  description: 'When EduGenius Hub refunds a WhatsApp order, and how to cancel before you pay.',
  alternates: { canonical: `${CANONICAL_ORIGIN}/refund-policy` },
};

export default function RefundPage() {
  return (
    <LegalArticle title="Refund and cancellation">
      <p>You can cancel any time before you pay. Message us on WhatsApp and we will not send a payment request.</p>
      <p>After payment:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>If we do not deliver the report or access, we refund the amount you paid, or we deliver it if you still want it.</li>
        <li>If access does not work when we send it, we replace it or refund you.</li>
        <li>If a report or login was already delivered and it worked, we do not refund it, because the file or access has already been sent.</li>
      </ul>
      <p>Write to us within 24 hours of delivery on WhatsApp +91 87662 53356 or at <a className="underline" href="mailto:support@edugeniushub.com">support@edugeniushub.com</a>. Say the product name and what went wrong.</p>
      <p>
        Related: <Link className="underline" href="/terms">Terms of Service</Link>.
      </p>
    </LegalArticle>
  );
}
