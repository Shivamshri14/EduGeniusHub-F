export type CrmStatus = 'new_lead' | 'pending_payment' | 'paid' | 'delivered' | 'expired';

export type CrmCustomer = {
  id: string;
  name: string;
  phone: string;
  product: string;
  date: string;
  status: CrmStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

const CRM_KEY = 'egu_crm_customers';

export const STATUS_CONFIG: Record<CrmStatus, { label: string; color: string; dot: string }> = {
  new_lead:        { label: 'New Lead',        color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20', dot: 'bg-yellow-400' },
  pending_payment: { label: 'Pending Payment', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', dot: 'bg-orange-400' },
  paid:            { label: 'Paid',            color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',   dot: 'bg-green-400' },
  delivered:       { label: 'Delivered',       color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',     dot: 'bg-blue-400' },
  expired:         { label: 'Expired',         color: 'bg-red-500/10 text-red-500 border-red-500/20',                           dot: 'bg-red-400' },
};

export function getCustomers(): CrmCustomer[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(CRM_KEY) ?? '[]'); } catch { return []; }
}

function save(customers: CrmCustomer[]) {
  try { localStorage.setItem(CRM_KEY, JSON.stringify(customers)); } catch { /* quota */ }
}

export function addCustomer(data: Omit<CrmCustomer, 'id' | 'createdAt' | 'updatedAt'>): CrmCustomer {
  const now = new Date().toISOString();
  const customer: CrmCustomer = {
    ...data,
    id: `c_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: now,
    updatedAt: now,
  };
  save([customer, ...getCustomers()]);
  return customer;
}

export function updateCustomer(id: string, updates: Partial<CrmCustomer>): void {
  save(getCustomers().map((c) => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c));
}

export function deleteCustomer(id: string): void {
  save(getCustomers().filter((c) => c.id !== id));
}
