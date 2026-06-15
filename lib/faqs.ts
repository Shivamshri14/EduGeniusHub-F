export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: 'How fast do I receive my product?',
    answer: 'Most products are delivered within 5–30 minutes via WhatsApp after payment confirmation. Reports may take up to a few hours depending on document length.',
  },
  {
    id: 'f2',
    question: 'How do I pay?',
    answer: 'We accept UPI (GPay, PhonePe, Paytm), bank transfer, and other methods. Payment details are shared on WhatsApp after you place your order.',
  },
  {
    id: 'f3',
    question: 'Are the accounts safe to use?',
    answer: 'Yes. All accounts are verified and fully functional. For shared accounts, please do not change the password or personal details to ensure continued access.',
  },
  {
    id: 'f4',
    question: 'What if there is an issue with my product?',
    answer: 'We offer full support via WhatsApp. If your product stops working within the validity period, we will resolve it or provide a replacement at no extra charge.',
  },
  {
    id: 'f5',
    question: 'Do you offer refunds?',
    answer: 'Since these are digital products, refunds are not applicable once delivered. However, we always ensure you receive a fully working product.',
  },
  {
    id: 'f6',
    question: 'Can I get a custom plan or duration?',
    answer: 'Yes! Contact us on WhatsApp and we will create a custom plan that fits your needs and budget.',
  },
];
