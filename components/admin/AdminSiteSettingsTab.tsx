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
    reports_delivered: '',
    students_served: '',
    satisfaction: '',
    response_time: '',
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
        <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-sm rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                <Phone className="w-3.5 h-3.5" />
                Live Contact & Social Links
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Contact & WhatsApp Channels</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Brand Name</label>
              <Input
                value={settings.brand || ''}
                onChange={(e) => setSettings({ ...settings, brand: e.target.value })}
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Phone Number (Display)</label>
              <Input
                value={settings.phone_display || ''}
                onChange={(e) => setSettings({ ...settings, phone_display: e.target.value })}
                placeholder="+91 87662 53356"
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                WhatsApp Phone Number (E164 format, digits only)
              </label>
              <Input
                value={settings.phone_e164 || ''}
                onChange={(e) => setSettings({ ...settings, phone_e164: e.target.value })}
                placeholder="918766253356"
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Instagram URL</label>
              <Input
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                placeholder="https://www.instagram.com/edugenius.hub1"
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">WhatsApp Community Link</label>
              <Input
                value={settings.whatsapp_community_url || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_community_url: e.target.value })}
                placeholder="https://chat.whatsapp.com/..."
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-sm rounded-3xl p-5 sm:p-8">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Public numbers</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            The site no longer shows customer counts, satisfaction rates, or a fixed reply time. Those figures were not backed by a source.
          </p>
        </div>

        {/* Hero & Reseller Copy */}
        <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-sm rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Website Headlines & Content
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Hero & Reseller Callouts</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Hero Main Headline</label>
              <Input
                value={settings.hero_headline || ''}
                onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Hero Subheadline</label>
              <Textarea
                value={settings.hero_subheadline || ''}
                onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs min-h-[60px]"
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
      <div className="bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-sm rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-orange-50 dark:bg-slate-800 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-slate-700 mb-2">
              <Database className="w-3.5 h-3.5" />
              MongoDB Atlas Migration & Seeding
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Full Database Sync & Seed</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
              className="border-red-200 dark:border-red-800 bg-white dark:bg-slate-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-800 dark:hover:text-red-200 rounded-xl text-xs h-10 px-3"
            >
              Force Reseed All
            </Button>
          </div>
        </div>

        {seedResult && (
          <div className="bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-800 rounded-2xl p-4 text-xs space-y-1">
            <div className="font-bold text-emerald-600 dark:text-emerald-300 mb-1">Seed Report:</div>
            {Object.entries(seedResult).map(([key, val]) => (
              <div key={key} className="text-slate-700 dark:text-slate-200 flex items-center justify-between">
                <span className="capitalize text-slate-500 dark:text-slate-400">{key}:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300">{String(val)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
