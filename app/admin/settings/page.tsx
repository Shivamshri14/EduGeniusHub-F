'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader as Loader2, Save } from 'lucide-react';

type TrustStats = {
  students_served: string;
  reports_delivered: string;
  active_customers: string;
  avg_response_time: string;
};

export default function AdminSettings() {
  const [stats, setStats] = useState<TrustStats>({
    students_served: '5000+', reports_delivered: '12000+',
    active_customers: '800+', avg_response_time: '< 5 mins',
  });
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('site_settings').select('*').eq('key', 'trust_stats').single();
      if (data?.value) setStats(data.value as TrustStats);
    };
    load();
  }, []);

  const saveStats = async () => {
    setSaving(true);
    const { data } = await supabase.from('site_settings').select('id').eq('key', 'trust_stats').single();
    if (data) {
      await supabase.from('site_settings').update({ value: stats }).eq('key', 'trust_stats');
    } else {
      await supabase.from('site_settings').insert({ key: 'trust_stats', value: stats });
    }
    setSaving(false);
    toast.success('Settings saved!');
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage site content and preferences</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-lg mb-1">Trust Statistics</h2>
        <p className="text-sm text-muted-foreground mb-5">These numbers appear on the homepage trust section.</p>
        <div className="grid grid-cols-2 gap-4">
          {(Object.keys(stats) as (keyof TrustStats)[]).map((key) => {
            const labels: Record<keyof TrustStats, string> = {
              students_served: 'Students Served',
              reports_delivered: 'Reports Delivered',
              active_customers: 'Active Customers',
              avg_response_time: 'Avg Response Time',
            };
            return (
              <div key={key} className="space-y-1.5">
                <Label>{labels[key]}</Label>
                <Input
                  value={stats[key]}
                  onChange={(e) => setStats({ ...stats, [key]: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            );
          })}
        </div>
        <Button
          className="mt-5 bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl gap-2"
          onClick={saveStats}
          disabled={saving}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-1">Quick Links</h2>
        <p className="text-sm text-muted-foreground mb-5">Direct links to admin sections.</p>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Manage Products', href: '/admin/products' },
            { label: 'View Leads', href: '/admin/leads' },
            { label: 'Manage Customers', href: '/admin/customers' },
            { label: 'View Orders', href: '/admin/orders' },
            { label: 'View Website', href: '/home' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
              <span className="font-medium">{link.label}</span>
              <span className="text-muted-foreground text-xs">{link.href}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
