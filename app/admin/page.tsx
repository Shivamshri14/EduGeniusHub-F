'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Package, ClipboardList, Users, ShoppingCart, TrendingUp, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';

type Stats = {
  totalProducts: number;
  totalLeads: number;
  newLeads: number;
  paidLeads: number;
  deliveredLeads: number;
  totalCustomers: number;
  todayLeads: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0, totalLeads: 0, newLeads: 0, paidLeads: 0,
    deliveredLeads: 0, totalCustomers: 0, todayLeads: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [products, leads, customers, recent] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id, status, created_at'),
        supabase.from('customers').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      const allLeads = leads.data ?? [];
      setStats({
        totalProducts: products.count ?? 0,
        totalLeads: allLeads.length,
        newLeads: allLeads.filter((l: any) => l.status === 'new').length,
        paidLeads: allLeads.filter((l: any) => l.status === 'paid').length,
        deliveredLeads: allLeads.filter((l: any) => l.status === 'delivered').length,
        totalCustomers: customers.count ?? 0,
        todayLeads: allLeads.filter((l: any) => new Date(l.created_at) >= today).length,
      });
      if (recent.data) setRecentLeads(recent.data);
    };
    load();
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.totalProducts, icon: Package, href: '/admin/products', color: 'bg-blue-500/10 text-blue-500' },
    { label: "Total Leads", value: stats.totalLeads, icon: ClipboardList, href: '/admin/leads', color: 'bg-purple-500/10 text-purple-500' },
    { label: "New Leads", value: stats.newLeads, icon: AlertCircle, href: '/admin/leads', color: 'bg-orange-500/10 text-orange-500' },
    { label: "Paid", value: stats.paidLeads, icon: TrendingUp, href: '/admin/leads', color: 'bg-green-500/10 text-green-500' },
    { label: "Delivered", value: stats.deliveredLeads, icon: CheckCircle, href: '/admin/leads', color: 'bg-emerald-500/10 text-emerald-500' },
    { label: "Customers", value: stats.totalCustomers, icon: Users, href: '/admin/customers', color: 'bg-pink-500/10 text-pink-500' },
    { label: "Today's Leads", value: stats.todayLeads, icon: Clock, href: '/admin/leads', color: 'bg-[#F4B400]/10 text-yellow-600 dark:text-[#F4B400]' },
  ];

  const statusColors: Record<string, string> = {
    new: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    pending: 'bg-orange-500/10 text-orange-500',
    paid: 'bg-green-500/10 text-green-600',
    delivered: 'bg-blue-500/10 text-blue-500',
    closed: 'bg-gray-500/10 text-gray-400',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href}>
              <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black mb-0.5">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold">Recent Leads</h2>
          <Link href="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="divide-y divide-border">
          {recentLeads.length === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground text-sm">No leads yet</div>
          ) : recentLeads.map((lead) => (
            <div key={lead.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{lead.name}</div>
                <div className="text-xs text-muted-foreground">{lead.product_name ?? 'N/A'} · {lead.phone}</div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[lead.status] ?? ''}`}>
                {lead.status}
              </span>
              <div className="text-xs text-muted-foreground hidden sm:block">
                {new Date(lead.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
