import { createClient } from '@supabase/supabase-js';
import type {
  Profile,
  Software,
  Plan,
  Customer,
  Subscription,
  Credential,
  Settings,
  CustomerSubscriptionWithDetails
} from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string, phone: string, role: 'admin' | 'customer' = 'customer') {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('User creation failed');

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      role,
      phone,
      email,
    });

  if (profileError) throw profileError;

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return profile;
}

export async function getAllProfiles(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllSoftware(): Promise<Software[]> {
  const { data, error } = await supabase
    .from('software')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getSoftwareById(id: string): Promise<Software | null> {
  const { data, error } = await supabase
    .from('software')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createSoftware(software: Omit<Software, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('software')
    .insert(software)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSoftware(id: string, updates: Partial<Software>) {
  const { data, error } = await supabase
    .from('software')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSoftware(id: string) {
  const { error } = await supabase
    .from('software')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getPlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from('plans')
    .select(`
      *,
      software:software_id (*)
    `)
    .order('display_name');

  if (error) throw error;
  return data || [];
}

export async function getPlansBySoftwareId(softwareId: string): Promise<Plan[]> {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('software_id', softwareId)
    .order('plan_type');

  if (error) throw error;
  return data || [];
}

export async function createPlan(plan: Omit<Plan, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('plans')
    .insert(plan)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePlan(id: string, updates: Partial<Plan>) {
  const { data, error } = await supabase
    .from('plans')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePlan(id: string) {
  const { error } = await supabase
    .from('plans')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getAllCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select(`
      *,
      profile:profile_id (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await supabase
    .from('customers')
    .select(`
      *,
      profile:profile_id (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('customers')
    .insert(customer)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(id: string, updates: Partial<Customer>) {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getAllSubscriptions(): Promise<CustomerSubscriptionWithDetails[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      customer:customer_id (*),
      plan:plan_id (
        *,
        software:software_id (*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CustomerSubscriptionWithDetails[] || [];
}

export async function getSubscriptionsByCustomerId(customerId: string): Promise<CustomerSubscriptionWithDetails[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      customer:customer_id (*),
      plan:plan_id (
        *,
        software:software_id (*)
      )
    `)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CustomerSubscriptionWithDetails[] || [];
}

export async function getMySubscriptions(): Promise<CustomerSubscriptionWithDetails[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: customers } = await supabase
    .from('customers')
    .select('id')
    .eq('profile_id', user.id);

  if (!customers || customers.length === 0) return [];

  const customerIds = customers.map(c => c.id);

  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      customer:customer_id (*),
      plan:plan_id (
        *,
        software:software_id (*)
      )
    `)
    .in('customer_id', customerIds)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CustomerSubscriptionWithDetails[] || [];
}

export async function createSubscription(subscription: Omit<Subscription, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      ...subscription,
      status: 'active',
    })
    .select(`
      *,
      customer:customer_id (*),
      plan:plan_id (
        *,
        software:software_id (*)
      )
    `)
    .single();

  if (error) throw error;
  return data as CustomerSubscriptionWithDetails;
}

export async function updateSubscription(id: string, updates: Partial<Subscription>) {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      customer:customer_id (*),
      plan:plan_id (
        *,
        software:software_id (*)
      )
    `)
    .single();

  if (error) throw error;
  return data as CustomerSubscriptionWithDetails;
}

export async function deleteSubscription(id: string) {
  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getCredentialsBySubscriptionId(subscriptionId: string): Promise<Credential[]> {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('subscription_id', subscriptionId);

  if (error) throw error;
  return data || [];
}

export async function getMyCredentials(): Promise<Credential[]> {
  const subscriptions = await getMySubscriptions();
  const subscriptionIds = subscriptions.map(s => s.id);

  if (subscriptionIds.length === 0) return [];

  const { data, error } = await supabase
    .from('credentials')
    .select(`
      *,
      subscription:subscription_id (
        *,
        customer:customer_id (*),
        plan:plan_id (
          *,
          software:software_id (*)
        )
      )
    `)
    .in('subscription_id', subscriptionIds);

  if (error) throw error;
  return data || [];
}

export async function createCredential(credential: Omit<Credential, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('credentials')
    .insert(credential)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCredential(id: string, updates: Partial<Credential>) {
  const { data, error } = await supabase
    .from('credentials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCredential(id: string) {
  const { error } = await supabase
    .from('credentials')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getSettings(): Promise<Settings | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateSettings(updates: Partial<Settings>) {
  const settings = await getSettings();

  if (settings) {
    const { data, error } = await supabase
      .from('settings')
      .update(updates)
      .eq('id', settings.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('settings')
      .insert(updates)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function updateExpiredSubscriptions() {
  const { error } = await supabase.rpc('update_subscription_status');
  if (error) throw error;
}
