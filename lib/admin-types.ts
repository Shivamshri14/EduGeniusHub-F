export type Customer = {
  id: string;
  name: string;
  whatsapp: string;
  planName: string;
  startDate: string;
  expiryDate: string;
};

export type SubscriptionStatus = 'active' | 'expiring-soon' | 'expired';

export function getSubscriptionStatus(expiryDate: string): SubscriptionStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays <= 7) return 'expiring-soon';
  return 'active';
}

export function getStatusColor(status: SubscriptionStatus): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'expiring-soon':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
  }
}

export function getStatusLabel(status: SubscriptionStatus): string {
  switch (status) {
    case 'active':
      return 'Active';
    case 'expiring-soon':
      return 'Expiring Soon';
    case 'expired':
      return 'Expired';
  }
}

export function generateWhatsAppReminderLink(customer: Customer): string {
  const message = `Hi ${customer.name}, your ${customer.planName} access expires on ${new Date(customer.expiryDate).toLocaleDateString('en-IN')}. Reply RENEW to continue without interruption.`;
  return `https://wa.me/${customer.whatsapp}?text=${encodeURIComponent(message)}`;
}
