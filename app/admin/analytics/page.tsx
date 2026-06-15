'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getVisitorStats, clearVisits, type VisitRecord } from '@/utils/visitorTracker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Monitor, Smartphone, Tablet, Globe, RefreshCw, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DEVICE_ICONS: Record<string, React.ElementType> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

const PIE_COLORS = ['#F4B400', '#22C55E', '#3B82F6', '#EF4444', '#8B5CF6'];

export default function AdminAnalytics() {
  const [leadsByStatus, setLeadsByStatus] = useState<any[]>([]);
  const [leadsByDay, setLeadsByDay] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [visitorStats, setVisitorStats] = useState<ReturnType<typeof getVisitorStats> | null>(null);
  const [recentVisits, setRecentVisits] = useState<VisitRecord[]>([]);

  const loadAll = () => {
    const vs = getVisitorStats();
    setVisitorStats(vs);
    setRecentVisits(vs.recent);
  };

  useEffect(() => {
    loadAll();
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

  const deviceData = visitorStats
    ? Object.entries(visitorStats.byDevice).map(([name, value]) => ({ name, value }))
    : [];

  const pageData = visitorStats
    ? Object.entries(visitorStats.byPage)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Visitor tracking &amp; lead performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadAll} className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-red-500 hover:text-red-600 border-red-500/20 hover:border-red-500/40"
            onClick={() => {
              clearVisits();
              loadAll();
              toast.success('Visitor data cleared');
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Visits
          </Button>
        </div>
      </div>

      {/* Visitor stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Page Views', value: visitorStats?.total ?? 0, icon: Eye, color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Unique Sessions', value: visitorStats?.uniqueSessions ?? 0, icon: Globe, color: 'bg-emerald-500/10 text-emerald-500' },
          { label: "Today's Visitors", value: visitorStats?.todayVisits ?? 0, icon: Monitor, color: 'bg-[#F4B400]/10 text-amber-500' },
          { label: 'Returning Visitors', value: visitorStats?.returning ?? 0, icon: RefreshCw, color: 'bg-violet-500/10 text-violet-500' },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black mb-0.5">{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Leads chart */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-sm">Leads (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={leadsByDay}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Line type="monotone" dataKey="leads" stroke="#F4B400" strokeWidth={2} dot={{ fill: '#F4B400' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by status */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-sm">Leads by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={leadsByStatus}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Bar dataKey="value" fill="#F4B400" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device breakdown */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-sm">Visitors by Device</h3>
          {deviceData.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
          ) : (
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                    {deviceData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {deviceData.map((d, i) => {
                  const Icon = DEVICE_ICONS[d.name] ?? Monitor;
                  return (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="capitalize text-muted-foreground">{d.name}</span>
                      <span className="font-bold ml-auto">{d.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Top pages */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-4 text-sm">Top Pages</h3>
          {pageData.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={pageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                <Bar dataKey="value" fill="#3B82F6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <h3 className="font-bold mb-4 text-sm">Top Products by Requests</h3>
        {topProducts.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground text-sm">No lead data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={140} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Bar dataKey="value" fill="#F4B400" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Recent visits */}
      <div className="bg-card border border-border rounded-2xl">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-bold text-sm">Recent Visits</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Tracked locally in this browser</p>
        </div>
        {recentVisits.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground text-sm">No visits tracked yet. Visits are recorded when users browse the website.</div>
        ) : (
          <div className="divide-y divide-border">
            {recentVisits.slice(0, 20).map((v, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-4 text-sm">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground truncate">{v.page}</span>
                </div>
                <span className="text-xs text-muted-foreground">{v.date} {v.time}</span>
                <span className="text-xs text-muted-foreground capitalize">{v.device}</span>
                <span className="text-xs text-muted-foreground">{v.browser}</span>
                {v.isReturning && (
                  <span className="text-xs bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full">Returning</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
