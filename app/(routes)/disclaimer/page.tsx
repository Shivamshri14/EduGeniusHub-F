import type { Metadata } from 'next';
import LegalArticle from '@/components/legal/LegalArticle';
import { CANONICAL_ORIGIN, TRADEMARK_DISCLAIMER } from '@/lib/publicCopy';

export const metadata: Metadata = {
  title: 'Disclaimer | EduGenius Hub',
  description: 'EduGenius Hub is an independent service and is not affiliated with the brands named on this site.',
  alternates: { canonical: `${CANONICAL_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <LegalArticle title="Disclaimer">
      <p>{TRADEMARK_DISCLAIMER}</p>
      <p>
        EduGenius reports are our own documents. They are not a login to another company’s system, and they are not an official report from that company.
      </p>
      <p>
        Tool names and subscription names on this site describe what a buyer asked for. A shared login can stop working if that company changes its rules. We do not control those services.
      </p>
      <p>
        Academic help is drafting and editing support. It is not a promise that a college, guide, or journal will accept the work.
      </p>
      <p>
        Prices on the site can change. The price we confirm on WhatsApp before you pay is the price of that order.
      </p>
    </LegalArticle>
  );
}
