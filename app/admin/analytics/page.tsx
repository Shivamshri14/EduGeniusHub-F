'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminAnalytics() {
  const [leadsByStatus, setLeadsByStatus] = useState<any[]>([]);
  const [leadsByDay, setLeadsByDay] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: leads } = await supabase.from('leads').select('status, product_name, created_at');
      if (!leads) return;

      const statusCount: Record<string, number> = {};
      leads.forEach((l: any) => { statusCount[l.status] = (statusCount[l.status] ?? 0) + 1; });
      setLeadsByStatus(Object.entries(statusCount).map(([name, value]) => ({ name, value })));

      const dayCount: Record<string, number> = {};
      const last7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - i); return d.toISOString().split('T')[0];
      }).reverse();
      leads.forEach((l: any) => {
        const day = l.created_at.split('T')[0];
        dayCount[day] = (dayCount[day] ?? 0) + 1;
      });
      setLeadsByDay(last7.map((day) => ({ day: day.slice(5), leads: dayCount[day] ?? 0 })));

      const prodCount: Record<string, number> = {};
      leads.forEach((l: any) => {
        if (l.product_name) prodCount[l.product_name] = (prodCount[l.product_name] ?? 0) + 1;
      });
      setTopProducts(
        Object.entries(prodCount)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6)
      );
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Lead performance and trends</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-sm">Leads (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={leadsByDay}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
              />
              <Line type="monotone" dataKey="leads" stroke="#FFD60A" strokeWidth={2} dot={{ fill: '#FFD60A' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-sm">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadsByStatus}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
              />
              <Bar dataKey="value" fill="#FFD60A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 md:col-span-2">
          <h3 className="font-bold mb-4 text-sm">Top Products by Requests</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={140} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }}
              />
              <Bar dataKey="value" fill="#14213D" radius={[0, 6, 6, 0]}
                className="dark:fill-[#FFD60A]/70"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
