import { Customer } from './admin-types';
import { TOOLS, COMBO_TOOLS, Tool, ComboTool } from './tools';

const ADMIN_PIN = '1234';
const STORAGE_KEYS = {
  CUSTOMERS: 'edugeniushub_customers',
  TOOLS: 'edugeniushub_tools',
  COMBOS: 'edugeniushub_combos',
  AUTH: 'edugeniushub_auth',
};

export function verifyPIN(pin: string): boolean {
  return pin === ADMIN_PIN;
}

export function setAuthSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }
  return false;
}

export function clearAuthSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  }
}

export function getCustomers(): Customer[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
  return data ? JSON.parse(data) : [];
}

export function saveCustomers(customers: Customer[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }
}

export function addCustomer(customer: Omit<Customer, 'id'>): Customer {
  const customers = getCustomers();
  const newCustomer: Customer = {
    ...customer,
    id: Date.now().toString(),
  };
  customers.push(newCustomer);
  saveCustomers(customers);
  return newCustomer;
}

export function updateCustomer(id: string, updates: Partial<Customer>): void {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updates };
    saveCustomers(customers);
  }
}

export function deleteCustomer(id: string): void {
  const customers = getCustomers();
  const filtered = customers.filter(c => c.id !== id);
  saveCustomers(filtered);
}

export function getTools(): Tool[] {
  if (typeof window === 'undefined') return TOOLS;
  const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
  return data ? JSON.parse(data) : TOOLS;
}

export function saveTools(tools: Tool[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
  }
}

export function getCombos(): ComboTool[] {
  if (typeof window === 'undefined') return COMBO_TOOLS;
  const data = localStorage.getItem(STORAGE_KEYS.COMBOS);
  return data ? JSON.parse(data) : COMBO_TOOLS;
}

export function saveCombos(combos: ComboTool[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combos));
  }
}
