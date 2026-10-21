export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: 'How fast do I receive my product?',
    answer: 'The delivery time is the one written on that product. We reply on WhatsApp between 9am and 11pm IST.',
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
    answer: 'If we do not deliver, or the access does not work when we send it, we replace it or refund you. If it was already delivered and it worked, we do not refund it. Details are on the refund page.',
  },
  {
    id: 'f6',
    question: 'Can I get a custom plan or duration?',
    answer: 'Yes! Contact us on WhatsApp and we will create a custom plan that fits your needs and budget.',
  },
];
