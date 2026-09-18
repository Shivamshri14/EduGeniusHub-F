'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Phone,
  MessageCircle,
  Instagram,
  TrendingUp,
  Save,
  RefreshCw,
  Database,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { SiteConfigData } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AdminSiteSettingsTab() {
  const [settings, setSettings] = useState<Partial<SiteConfigData>>({
    brand: 'EduGenius Hub',
    phone_display: '+91 87662 53356',
    phone_e164: '918766253356',
    whatsapp_community_url: 'https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU',
    instagram_url: 'https://www.instagram.com/edugenius.hub1',
    reports_delivered: '12000+',
    students_served: '5000+',
    satisfaction: '99%',
    response_time: '< 2 mins',
    hero_headline: 'What do you need today?',
    hero_subheadline: 'Academic Reports, AI Tools, Premium Accounts & OTT Subscriptions — all in one place.',
    reseller_title: 'Are you a reseller? Looking for a similar website like us?',
    reseller_description: 'DM now and get your own premium tools website. Perfect for resellers who want to sell premium subscriptions.',
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err: any) {
      toast.error('Failed to load settings: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Site settings saved to MongoDB Atlas!');
        if (data.settings) setSettings(data.settings);
      } else {
        toast.error(data.error || 'Failed to update settings');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSeedAll = async (force: boolean = false) => {
    if (force && !confirm('Are you sure you want to overwrite all existing data in MongoDB with initial defaults?')) {
      return;
    }
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Seeded successfully!');
        setSeedResult(data.report);
        loadSettings();
      } else {
        toast.error(data.error || 'Failed to seed database');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error during database seed');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info & Socials */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
                <Phone className="w-3.5 h-3.5" />
                Live Contact & Social Links
              </div>
              <h3 className="text-xl font-black text-white">Contact & WhatsApp Channels</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update phone numbers, WhatsApp community, and social handles used across the website.
              </p>
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs h-10 px-4 shadow-lg shadow-[#F4B400]/20"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Brand Name</label>
              <Input
                value={settings.brand || ''}
                onChange={(e) => setSettings({ ...settings, brand: e.target.value })}
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number (Display)</label>
              <Input
                value={settings.phone_display || ''}
                onChange={(e) => setSettings({ ...settings, phone_display: e.target.value })}
                placeholder="+91 87662 53356"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                WhatsApp Phone Number (E164 format, digits only)
              </label>
              <Input
                value={settings.phone_e164 || ''}
                onChange={(e) => setSettings({ ...settings, phone_e164: e.target.value })}
                placeholder="918766253356"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Instagram URL</label>
              <Input
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                placeholder="https://www.instagram.com/edugenius.hub1"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Community Link</label>
              <Input
                value={settings.whatsapp_community_url || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_community_url: e.target.value })}
                placeholder="https://chat.whatsapp.com/..."
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Live Trust Stats Counter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Homepage Trust Numbers & Social Proof
            </div>
            <h3 className="text-xl font-black text-white">Live Trust Counters</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              These live figures are displayed under the hero section on the homepage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Reports Delivered</label>
              <Input
                value={settings.reports_delivered || ''}
                onChange={(e) => setSettings({ ...settings, reports_delivered: e.target.value })}
                placeholder="12000+"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Students Served</label>
              <Input
                value={settings.students_served || ''}
                onChange={(e) => setSettings({ ...settings, students_served: e.target.value })}
                placeholder="5000+"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Satisfaction Rate</label>
              <Input
                value={settings.satisfaction || ''}
                onChange={(e) => setSettings({ ...settings, satisfaction: e.target.value })}
                placeholder="99%"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Response Time</label>
              <Input
                value={settings.response_time || ''}
                onChange={(e) => setSettings({ ...settings, response_time: e.target.value })}
                placeholder="< 2 mins"
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Hero & Reseller Copy */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Website Headlines & Content
            </div>
            <h3 className="text-xl font-black text-white">Hero & Reseller Callouts</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Hero Main Headline</label>
              <Input
                value={settings.hero_headline || ''}
                onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Hero Subheadline</label>
              <Textarea
                value={settings.hero_subheadline || ''}
                onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs min-h-[60px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs h-11 px-6 shadow-lg shadow-[#F4B400]/20"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving All Settings...' : 'Save All Settings to MongoDB Atlas'}
          </Button>
        </div>
      </form>

      {/* Database Seeder Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-[#F4B400] border border-amber-500/30 mb-2">
              <Database className="w-3.5 h-3.5" />
              MongoDB Atlas Migration & Seeding
            </div>
            <h3 className="text-xl font-black text-white">Full Database Sync & Seed</h3>
            <p className="text-xs text-slate-400 mt-1">
              Synchronize all products, FAQs, reviews, services, site settings, and welcome notice into your cloud database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleSeedAll(false)}
              disabled={seeding}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs h-10 px-4 shadow-md"
            >
              {seeding ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Layers className="w-3.5 h-3.5 mr-1.5" />}
              <span>Sync New Data</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => handleSeedAll(true)}
              disabled={seeding}
              className="border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-xl text-xs h-10 px-3"
            >
              Force Reseed All
            </Button>
          </div>
        </div>

        {seedResult && (
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs space-y-1">
            <div className="font-bold text-green-400 mb-1">Seed Report:</div>
            {Object.entries(seedResult).map(([key, val]) => (
              <div key={key} className="text-slate-300 flex items-center justify-between">
                <span className="capitalize text-slate-400">{key}:</span>
                <span className="font-mono text-emerald-400">{String(val)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
