import { Tool, ComboTool, TOOLS, COMBO_TOOLS } from './tools';
import { Customer } from './admin-types';

const STORAGE_KEYS = {
  TOOLS: 'edugeniushub_tools',
  COMBOS: 'edugeniushub_combos',
  CUSTOMERS: 'edugeniushub_customers',
  AUTH: 'edugeniushub_auth',
  SEEDED: 'edugeniushub_seeded',
};

const ADMIN_PIN = '1234';

function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  const isSeeded = localStorage.getItem(STORAGE_KEYS.SEEDED);

  if (!isSeeded) {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(TOOLS));
    localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(COMBO_TOOLS));
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SEEDED, 'true');
  }
}

initializeStorage();

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

export function getTools(): Tool[] {
  if (typeof window === 'undefined') return TOOLS;

  initializeStorage();

  const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
  return data ? JSON.parse(data) : TOOLS;
}

export function getToolById(id: string): Tool | null {
  const tools = getTools();
  return tools.find(tool => tool.id === id) || null;
}

export function addTool(tool: Omit<Tool, 'id'>): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };

    const tools = getTools();
    const id = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    if (tools.find(t => t.id === id)) {
      return { success: false, error: 'Tool with this ID already exists' };
    }

    const newTool: Tool = { ...tool, id };
    tools.push(newTool);

    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add tool' };
  }
}

export function updateTool(id: string, updates: Partial<Tool>): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };

    const tools = getTools();
    const index = tools.findIndex(t => t.id === id);

    if (index === -1) {
      return { success: false, error: 'Tool not found' };
    }

    tools[index] = { ...tools[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update tool' };
  }
}

export function deleteTool(id: string): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };

    const tools = getTools();
    const filtered = tools.filter(t => t.id !== id);

    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(filtered));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete tool' };
  }
}

export function getCombos(): ComboTool[] {
  if (typeof window === 'undefined') return COMBO_TOOLS;

  initializeStorage();

  const data = localStorage.getItem(STORAGE_KEYS.COMBOS);
  return data ? JSON.parse(data) : COMBO_TOOLS;
}

export function addCombo(combo: Omit<ComboTool, 'id'>): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };

    const combos = getCombos();
    const id = combo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    if (combos.find(c => c.id === id)) {
      return { success: false, error: 'Combo with this ID already exists' };
    }

    const newCombo: ComboTool = { ...combo, id };
    combos.push(newCombo);

    localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combos));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add combo' };
  }
}

export function updateCombo(id: string, updates: Partial<ComboTool>): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };

    const combos = getCombos();
    const index = combos.findIndex(c => c.id === id);

    if (index === -1) {
      return { success: false, error: 'Combo not found' };
    }

    combos[index] = { ...combos[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(combos));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update combo' };
  }
}

export function deleteCombo(id: string): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') return { success: false, error: 'Not in browser' };

    const combos = getCombos();
    const filtered = combos.filter(c => c.id !== id);

    localStorage.setItem(STORAGE_KEYS.COMBOS, JSON.stringify(filtered));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete combo' };
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
