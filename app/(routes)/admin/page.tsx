'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Package,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  CheckCircle,
  AlertTriangle,
  Database,
  Key,
  LogOut,
  RefreshCw,
  Eye,
  Zap,
  TrendingUp,
  Tag,
  Copy,
  Check,
  Share2,
  ChevronRight,
  Layers,
  FileText,
  AlertCircle,
  Sliders,
  Image as ImageIcon,
  UserCheck,
  ShieldCheck,
  HelpCircle,
  Bell,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Product, ProductPlan, ProductCategory } from '@/lib/types';
import { getProductArtwork, PRESET_PRODUCT_IMAGES } from '@/lib/productImages';
import { DEFAULT_GEMINI_PROMPT } from '@/lib/gemini';
import { cn } from '@/lib/utils';
import AdminNoticesTab from '@/components/admin/AdminNoticesTab';
import AdminFaqsTab from '@/components/admin/AdminFaqsTab';
import AdminReviewsTab from '@/components/admin/AdminReviewsTab';
import AdminServicesTab from '@/components/admin/AdminServicesTab';
import AdminSiteSettingsTab from '@/components/admin/AdminSiteSettingsTab';


// Presets based directly on user's promotional broadcast messages
const PROMO_PRESETS = [
  {
    label: '🚀 StealthWriter (4 Plans)',
    text: `🚀 StealthWriter Premium – Monthly Access Available 🔥

Convert AI-generated content into more natural, human-like writing with StealthWriter Premium.

✅ Monthly Access
✅ Login with Your Own Gmail
✅ Access via Secure Third-Party Website
✅ Instant Activation
✅ No Extension Required 

📦 Plans Available :

💠 Plan 1 – ₹699
* 20 Requests/Day
* 5,000 Words per Request

💠 Plan 2 – ₹999
* 30 Requests/Day
* 5,000 Words per Request

💠 Plan 3 – ₹1,200
* 40 Requests/Day
* 5,000 Words per Request

💠 Plan 4 – ₹1,800
* 50 Requests/Day
* 5,000 Words per Request

📩 How it works? 
* Share your Gmail ID.
* We'll provide access through a secure third-party website.
* Start using StealthWriter instantly.

📱 DM: +91 8766253356
🌐 www.edugeniushub.com

— EduGenius Hub`,
  },
  {
    label: '🚨 Daily Specials (Bulk Tools & Reports)',
    text: `🚨 Today's Special Prices for You! 😀

🚀 Premium Tools & Reports at the Best Prices

📑 Turnitin Reports 
✅ Plagiarism Report – ₹120
✅ AI Detection Report – ₹150
✅ Plagiarism + AI Report – ₹180

✍️ Premium Tools 
✅ QuillBot Premium – ₹149
✅ Grammarly Premium – ₹199
✅ ChatGPT Plus (Shared) – ₹499
✅ Canva Pro Invite – ₹99/Year
✅ Claude | Cursor | StealthWriter & More Available

🎬 OTT Subscriptions 
🎪 Netflix – ₹149
🎦 Prime Video | ZEE5 | SonyLIV & More Available

📝 Services 
🤖 Thesis & Dissertation Writing
✍️ AI Content Humanization & Plagiarism Removal

⚠️ Before Sending Your File 

📄 Please remove the cover/front page containing your College/University logo, Student ID, Student Name, or any other personal information. Send only the pages that need to be checked.

💡 Important 
* Turnitin does not generate an AI Detection Report for documents exceeding 30,000 words. Please confirm your word count before requesting an AI report.

👉 Need a Turnitin Report, Premium Tool, or OTT Subscription today?

📩 DM for Enquiry 
📱 +918766253356
🌐 www.edugeniushub.com

— EduGenius Hub`,
  },
  {
    label: '⚡ Cursor AI Credits ($30 - $130)',
    text: `🚀 Available AI Credits — Limited Stock

2️⃣ Cursor AI Usage Credit
✅ Extra credit for Cursor Chat / Agent / AI usage
✅ Can cover eligible extra AI usage on Pro
❌ Cannot be used to purchase the Pro subscription

30$ 349/-
50$ 499/-
80$ 799/-
100$ 999/-
130$ 1299/-

Validity : 1month

⚠️ Limited Stock Available
⏳ Offer valid only until current stock is sold out
🔥 First Come, First Served

📩 *DM NOW to order*`,
  },
  {
    label: '🍿 Netflix 4K UHD Shared',
    text: `🍿 Netflix Premium – ₹149/month 🔥

✅ 4K Ultra HD Plan
✅ Shared Account
📧 Email & OTP provided
👥 Account is shared with other customers
⚡ Instant access

Interested? DM EDUGENIUS HUB to get access. 🚀`,
  },
  {
    label: '🔥 Claude API Bundle',
    text: `🔥⚡ Claude API — CREDIT BUNDLE (1 MONTH) ⚡🔥
📧 Private Access | 🔐 Own Dashboard | 🚫 No Sharing

🤖 Power your apps with Claude — Opus, Sonnet & Haiku

✨ Credit Bundles Available:
✔️ $100 | $250 | $500 | $1,000 | $5,000 | $10,000
✔️ Access to Opus, Sonnet & Haiku models
✔️ Full API support — Messages, Tools, Vision & more
✔️ Custom Dashboard + Proxy Endpoint
✔️ High rate limits based on your tier
✔️ Works with Python • TypeScript • REST APIs

💡 Perfect For:
Developers • Startups • AI Apps • SaaS Builders • Automation Teams

💰 Official Value: High
🔥 Offer Price: ₹DM Only

⚡ Fast Activation
🛡️ Validity: 1 Month
🖥️ Own Dashboard | 🚫 No Shared Access | ✅ Instant Usage

📩 DM NOW — Limited API Credit Slots Available 🚀`,
  },
];

export default function AdminPage() {
  // DB Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('eghadmin');
  const [passwordInput, setPasswordInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [adminProfile, setAdminProfile] = useState<{ username: string; name: string } | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<
    'ai_import' | 'products' | 'notices' | 'faqs' | 'reviews' | 'services' | 'settings'
  >('ai_import');

  // AI Import State
  const [rawText, setRawText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [stagedProducts, setStagedProducts] = useState<any[]>([]);
  const [aiSource, setAiSource] = useState<string>('');
  const [aiNotice, setAiNotice] = useState<string>('');
  const [importing, setImporting] = useState(false);

  // AI Prompt Customizer State
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(DEFAULT_GEMINI_PROMPT);

  // Products Management State
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Edit / Create Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);

  // Delete Confirmation State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Settings State
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [seeding, setSeeding] = useState(false);

  // DB Password Update State
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [adminDisplayName, setAdminDisplayName] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Check persistent auth on load
  useEffect(() => {
    const token = sessionStorage.getItem('egh_admin_auth');
    if (token === 'true') {
      setIsAuthenticated(true);
      const savedUser = sessionStorage.getItem('egh_admin_user');
      if (savedUser) {
        try {
          setAdminProfile(JSON.parse(savedUser));
        } catch {
          // Ignore
        }
      }
    }
  }, []);

  // Fetch data once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadSystemStatus();
      loadAdminProfile();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('egh_admin_auth', 'true');
        if (data.user) {
          sessionStorage.setItem('egh_admin_user', JSON.stringify(data.user));
          setAdminProfile(data.user);
        }
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${data.user?.name || 'Admin'}!`);
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch {
      toast.error('Failed to connect to database for authentication');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('egh_admin_auth');
    sessionStorage.removeItem('egh_admin_user');
    setIsAuthenticated(false);
    setAdminProfile(null);
    toast.info('Logged out');
  };

  const loadAdminProfile = async () => {
    try {
      const res = await fetch('/api/admin/profile');
      const data = await res.json();
      if (data.user) {
        setAdminProfile(data.user);
        setNewAdminUsername(data.user.username);
        setAdminDisplayName(data.user.name || '');
      }
    } catch {
      // Ignore
    }
  };

  const handleUpdateAdminProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUsername.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    setUpdatingProfile(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUsername: adminProfile?.username || 'eghadmin',
          newUsername: newAdminUsername.trim(),
          newPassword: newAdminPassword.trim() || undefined,
          name: adminDisplayName.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Admin credentials updated directly in MongoDB Atlas!');
        setNewAdminPassword('');
        loadAdminProfile();
      } else {
        toast.error(data.error || 'Failed to update credentials');
      }
    } catch {
      toast.error('Failed to update credentials in database');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/products?include_hidden=true');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadSystemStatus = async () => {
    try {
      const res = await fetch('/api/admin/status');
      const data = await res.json();
      setSystemStatus(data);
    } catch {
      // Ignore
    }
  };

  // AI Parse Handler
  const handleAiParse = async () => {
    if (!rawText.trim()) {
      toast.error('Please paste a promotional message to parse');
      return;
    }

    setParsing(true);
    setStagedProducts([]);
    setAiNotice('');

    try {
      const res = await fetch('/api/admin/ai-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: rawText,
          customPrompt: customPrompt !== DEFAULT_GEMINI_PROMPT ? customPrompt : undefined,
        }),
      });
      const data = await res.json();

      if (data.success && data.products) {
        setStagedProducts(data.products);
        setAiSource(data.source);
        if (data.notice) setAiNotice(data.notice);
        toast.success(`Successfully parsed ${data.products.length} product(s) with Gemini AI!`);
      } else {
        toast.error(data.error || 'Failed to parse message');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error communicating with AI parser');
    } finally {
      setParsing(false);
    }
  };

  // Save Staged Products to MongoDB
  const handleSaveStagedProducts = async () => {
    if (stagedProducts.length === 0) return;
    setImporting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stagedProducts),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Added ${data.count} product(s) to catalog in MongoDB Atlas!`);
        setStagedProducts([]);
        setRawText('');
        loadProducts();
        loadSystemStatus();
        setActiveTab('products');
      } else {
        toast.error(data.error || 'Failed to save products');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving products to database');
    } finally {
      setImporting(false);
    }
  };

  // Save single edited product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) {
      toast.error('Product name and category are required');
      return;
    }

    setSavingProduct(true);
    try {
      const isNew = !editingProduct.id;
      const url = isNew ? '/api/products' : `/api/products/${editingProduct.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();

      if (data.success || data.products) {
        toast.success(isNew ? 'Product created & appended!' : 'Product updated in Atlas!');
        setEditModalOpen(false);
        setEditingProduct(null);
        loadProducts();
        loadSystemStatus();
      } else {
        toast.error(data.error || 'Failed to save product');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving product');
    } finally {
      setSavingProduct(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Deleted ${productToDelete.name} from MongoDB Atlas`);
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        loadProducts();
        loadSystemStatus();
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch {
      toast.error('Failed to delete product');
    }
  };

  // Quick Seed database
  const handleSeedDatabase = async (force: boolean = false) => {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        loadProducts();
        loadSystemStatus();
      } else {
        toast.warning(data.message);
      }
    } catch {
      toast.error('Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  const copyProductLink = (slugOrId: string, name: string) => {
    const url = `${window.location.origin}/product/${slugOrId}`;
    navigator.clipboard.writeText(url);
    toast.success(`Shareable link copied for ${name}!`);
  };

  const shareProductOnWhatsApp = (p: Product) => {
    const url = `${window.location.origin}/product/${p.slug || p.id}`;
    const text = `🔥 *${p.name}* is available on EduGenius Hub!\n\n💰 Price: ₹${p.price}\n⚡ Instant WhatsApp Delivery • 100% Replacement Warranty\n\n👉 Order here:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── 1. DB AUTHENTICATION SCREEN ──
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#07121f] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#0B1F3A]/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F4B400]/15 text-[#F4B400] border border-[#F4B400]/30 mb-4 shadow-lg shadow-[#F4B400]/10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">EduGenius Hub Admin</h1>
            <p className="text-xs text-slate-400 mt-1">
              Database-authenticated access via MongoDB Atlas
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                Admin Username
              </label>
              <Input
                type="text"
                placeholder="Enter admin username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="bg-slate-900 border-slate-700 text-white rounded-xl h-12 px-4 focus-visible:ring-[#F4B400]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <Input
                type="password"
                placeholder="Enter your admin password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="bg-slate-900 border-slate-700 text-white rounded-xl h-12 px-4 focus-visible:ring-[#F4B400]"
                required
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={authLoading}
              className="w-full h-12 bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-black text-sm rounded-xl shadow-lg shadow-[#F4B400]/20 transition-all hover:scale-[1.01]"
            >
              {authLoading ? 'Verifying with MongoDB...' : 'Unlock Admin Panel'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/home" className="text-xs text-slate-400 hover:text-[#F4B400] transition-colors">
              ← Return to EduGeniusHub Storefront
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07121f] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0B1F3A]/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link href="/home" className="flex items-center gap-2 group">
              <img src="/logo.jpg" alt="EduGenius Hub" className="h-8 sm:h-9 w-auto rounded-xl object-contain shadow-md" />
              <div>
                <span className="font-black text-white text-sm sm:text-base tracking-tight">EduGenius Hub</span>
                <span className="ml-1.5 sm:ml-2 text-[9px] sm:text-[10px] uppercase font-extrabold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-[#F4B400]/20 text-[#F4B400] border border-[#F4B400]/30">
                  Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Access Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* MongoDB Atlas Direct Link */}
            <a
              href="https://cloud.mongodb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition-all shadow-sm"
              title="Open MongoDB Atlas Console (cloud.mongodb.com)"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">MongoDB Atlas</span>
              <span className="sm:hidden text-[11px]">Atlas</span>
              <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
            </a>

            {/* Google AI Studio Direct Link */}
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-400 hover:bg-blue-900/60 transition-all shadow-sm"
              title="Open Google AI Studio (aistudio.google.com)"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="hidden sm:inline">Gemini AI</span>
              <span className="sm:hidden text-[11px]">Gemini</span>
              <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
            </a>

            {/* Storefront Link */}
            <Link
              href="/products"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="View Public Storefront"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-slate-800"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-5 sm:py-8 flex-1">
        {/* Quick Cloud Navigation & Status Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6">
          {/* Card 1: MongoDB Atlas */}
          <a
            href="https://cloud.mongodb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#0B1F3A]/90 hover:bg-[#0E2749] border border-slate-800 hover:border-emerald-500/50 transition-all group shadow-md"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Database className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1 truncate">
                  <span>MongoDB Atlas</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </div>
                <div className="text-[10px] text-slate-400 truncate">512MB M0 Free Cluster</div>
              </div>
            </div>
          </a>

          {/* Card 2: Google AI Studio */}
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#0B1F3A]/90 hover:bg-[#0E2749] border border-slate-800 hover:border-blue-500/50 transition-all group shadow-md"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1 truncate">
                  <span>Gemini Studio</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </div>
                <div className="text-[10px] text-slate-400 truncate">100% Free AI Tier</div>
              </div>
            </div>
          </a>

          {/* Card 3: Live Storefront */}
          <Link
            href="/products"
            target="_blank"
            className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#0B1F3A]/90 hover:bg-[#0E2749] border border-slate-800 hover:border-[#F4B400]/50 transition-all group shadow-md"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F4B400]/15 text-[#F4B400] flex items-center justify-center shrink-0 border border-[#F4B400]/30">
                <Package className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F4B400] transition-colors flex items-center gap-1 truncate">
                  <span>Live Store</span>
                  <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                </div>
                <div className="text-[10px] text-slate-400 truncate">Customer Catalog</div>
              </div>
            </div>
          </Link>

          {/* Card 4: Database Catalog Sync */}
          <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[#0B1F3A]/90 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-green-500/15 text-green-400 flex items-center justify-center shrink-0 border border-green-500/30">
                <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span>{systemStatus?.mongodb?.productCount || products.length} Live Items</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Synced to Atlas Cloud</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Mobile Optimized */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 sm:pb-4 mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('ai_import')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'ai_import'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>AI Importer</span>
            {stagedProducts.length > 0 && (
              <span className="bg-[#0B1F3A] text-[#F4B400] text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-black">
                {stagedProducts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'products'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Manage Catalog</span>
            <span className="bg-slate-800 text-slate-300 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'notices'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Notices & Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'faqs'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>FAQs</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'reviews'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Reviews</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'services'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Services</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              'flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0',
              activeTab === 'settings'
                ? 'bg-[#F4B400] text-[#0B1F3A] shadow-lg shadow-[#F4B400]/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            )}
          >
            <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Site Config & DB</span>
          </button>
        </div>

        {/* ── TAB 1: AI MESSAGE IMPORTER ── */}
        {activeTab === 'ai_import' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Promo Parser Box */}
            <div className="bg-[#0B1F3A]/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      100% Free Tier (Gemini 3.5 Flash)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPromptEditor(!showPromptEditor)}
                      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      <Sliders className="w-3 h-3 text-[#F4B400]" />
                      <span>{showPromptEditor ? 'Hide AI Prompt' : '⚙️ Customize AI Prompt'}</span>
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Promotional Broadcast Importer</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Paste raw WhatsApp or Telegram marketing messages. Gemini will parse plans, word quotas, and features automatically.
                  </p>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-slate-400 self-center font-medium mr-1">Presets:</span>
                  {PROMO_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRawText(p.text)}
                      className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 px-3 py-1.5 rounded-xl transition-colors font-medium"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collapsible Prompt Editor */}
              {showPromptEditor && (
                <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-[#F4B400]/30 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F4B400] flex items-center gap-1.5 uppercase tracking-wider">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Gemini System Prompt (Customize AI Instructions)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomPrompt(DEFAULT_GEMINI_PROMPT)}
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Reset to Default
                    </button>
                  </div>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={6}
                    className="bg-slate-900 border-slate-800 text-slate-200 font-mono text-xs rounded-xl p-3 resize-y"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 You can customize rules here (e.g., &quot;Always assign 10% discount&quot;, &quot;Default category to ai_tools&quot;).
                  </p>
                </div>
              )}

              {/* Textarea */}
              <div className="relative mb-4">
                <Textarea
                  placeholder="Paste your WhatsApp or Telegram broadcast text here... (e.g. StealthWriter 4-Tier Plan, Daily Specials, Cursor Credits...)"
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="bg-slate-900/90 border-slate-700/80 text-white rounded-2xl p-4 font-mono text-xs sm:text-sm focus-visible:ring-[#F4B400] leading-relaxed resize-y"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Zap className="w-4 h-4 text-[#F4B400]" />
                  <span>Newly imported products will automatically append to the end of your catalog.</span>
                </div>

                <div className="flex gap-3">
                  {rawText && (
                    <Button
                      variant="outline"
                      onClick={() => setRawText('')}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl"
                    >
                      Clear
                    </Button>
                  )}
                  <Button
                    onClick={handleAiParse}
                    disabled={parsing || !rawText.trim()}
                    className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-black rounded-xl px-6 shadow-lg shadow-[#F4B400]/20 flex items-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    {parsing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Parsing with Gemini AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>✨ Parse with Gemini AI</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Staged Parsed Products Review Section */}
            {stagedProducts.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <span>Parsed Products Staging Area</span>
                      <Badge className="bg-[#F4B400] text-[#0B1F3A] font-black">{stagedProducts.length}</Badge>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Review, edit details, or change artwork before saving directly to MongoDB Atlas.
                    </p>
                  </div>

                  <Button
                    onClick={handleSaveStagedProducts}
                    disabled={importing}
                    className="bg-green-500 hover:bg-green-600 text-slate-950 font-black rounded-xl px-6 shadow-lg shadow-green-500/20 flex items-center gap-2 transition-transform hover:scale-[1.02]"
                  >
                    {importing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span>Import All ({stagedProducts.length}) to MongoDB Atlas</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {stagedProducts.map((p, idx) => {
                    const artwork = getProductArtwork(p);
                    return (
                      <div
                        key={idx}
                        className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between hover:border-[#F4B400]/40 transition-all shadow-xl"
                      >
                        <div>
                          {/* Top Visual */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-center p-2 shadow-inner"
                                dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
                              />
                              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-[#F4B400] border border-slate-700">
                                {p.category}
                              </span>
                            </div>
                            {p.badge && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                {p.badge.replace('_', ' ')}
                              </span>
                            )}
                          </div>

                          {/* Title & Price */}
                          <h4 className="font-bold text-white text-base leading-tight mb-1">{p.name}</h4>
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-black text-[#F4B400]">
                              {p.price > 0 ? `₹${p.price}` : 'DM for Pricing'}
                            </span>
                            {p.plan_type && <span className="text-xs text-slate-400">/{p.plan_type.toLowerCase()}</span>}
                          </div>

                          <p className="text-xs text-slate-400 mb-4 line-clamp-2">{p.description}</p>

                          {/* Plans (Tiers) */}
                          {p.plans && p.plans.length > 0 && (
                            <div className="mb-4 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
                              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Layers className="w-3 h-3 text-[#F4B400]" />
                                <span>{p.plans.length} Tiered Plans Extracted:</span>
                              </div>
                              <div className="space-y-1.5">
                                {p.plans.map((plan: ProductPlan, pIdx: number) => (
                                  <div key={pIdx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50 last:border-0">
                                    <span className="font-medium text-slate-200">{plan.name}</span>
                                    <span className="font-bold text-[#F4B400]">₹{plan.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Key Features */}
                          {p.features && p.features.length > 0 && (
                            <div className="space-y-1 mb-4">
                              {p.features.slice(0, 3).map((feat: string, fIdx: number) => (
                                <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                                  <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                                  <span className="truncate">{feat}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Card Actions */}
                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct({ ...p, id: undefined });
                              setEditModalOpen(true);
                            }}
                            className="text-xs text-slate-300 hover:text-[#F4B400] flex items-center gap-1 font-medium"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Details / Image</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setStagedProducts((prev) => prev.filter((_, i) => i !== idx));
                            }}
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: PRODUCT MANAGEMENT ── */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter & Action Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search catalog in MongoDB Atlas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-900 border-slate-800 text-white rounded-xl h-11 text-sm focus-visible:ring-[#F4B400]"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl h-11 px-3 text-xs font-semibold focus:outline-none focus:border-[#F4B400]"
                >
                  <option value="all">All Categories</option>
                  <option value="ai_tools">AI Tools</option>
                  <option value="reports">Turnitin Reports</option>
                  <option value="ott">OTT Subscriptions</option>
                  <option value="services">Services</option>
                  <option value="accounts">Student Accounts</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  onClick={loadProducts}
                  className="border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 rounded-xl h-11 px-3"
                  title="Refresh from Atlas"
                >
                  <RefreshCw className={cn('w-4 h-4', loadingProducts && 'animate-spin')} />
                </Button>

                <Button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      category: 'ai_tools',
                      price: 299,
                      market_price: 499,
                      badge: null,
                      delivery_time: '5–15 min',
                      is_instant: true,
                      is_featured: false,
                      is_hidden: false,
                      plan_type: 'Monthly',
                      account_type: 'shared',
                      description: '',
                      features: ['Instant Delivery', '24/7 Support'],
                      plans: [],
                      how_it_works: [],
                      important_notes: [],
                      stock_status: 'in_stock',
                    });
                    setEditModalOpen(true);
                  }}
                  className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-black rounded-xl h-11 px-5 flex items-center gap-2 shadow-lg shadow-[#F4B400]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product Manually</span>
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              {loadingProducts ? (
                <div className="py-20 text-center text-slate-400">
                  <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin text-[#F4B400]" />
                  <p>Loading catalog from MongoDB Atlas...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-20 text-center text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-base font-semibold text-slate-300">No products found</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try different search terms or use the AI Importer tab to add products.
                  </p>
                </div>
              ) : (
                <>
                  {/* ── MOBILE VIEW: Touch-Friendly Product Cards (< md) ── */}
                  <div className="block md:hidden divide-y divide-slate-800/80 p-3 space-y-3">
                    {filteredProducts.map((p) => {
                      const artwork = getProductArtwork(p);
                      return (
                        <div
                          key={p.id || p.slug}
                          className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-4 space-y-3 shadow-md"
                        >
                          {/* Top: Icon + Name + Badges + Live Pill */}
                          <div className="flex items-start gap-3">
                            {p.image_url ? (
                              <img
                                src={p.image_url}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-contain bg-slate-900 border border-slate-700/80 p-1.5 shrink-0"
                              />
                            ) : (
                              <div
                                className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center p-2.5 shrink-0"
                                dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
                              />
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <Link
                                  href={`/product/${p.slug || p.id}`}
                                  target="_blank"
                                  className="font-bold text-white text-sm hover:text-[#F4B400] transition-colors truncate"
                                >
                                  {p.name}
                                </Link>
                                <span
                                  className={cn(
                                    'text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0',
                                    p.is_hidden ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                  )}
                                >
                                  {p.is_hidden ? 'Hidden' : 'Live'}
                                </span>
                              </div>

                              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{p.description}</p>

                              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                                  {p.category}
                                </span>
                                {p.badge && (
                                  <Badge className="bg-[#F4B400]/15 text-[#F4B400] border-[#F4B400]/30 text-[9px] font-bold px-1.5 py-0">
                                    {p.badge.replace('_', ' ')}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Middle: Price & Tier Summary */}
                          <div className="flex items-center justify-between bg-slate-900/90 rounded-xl px-3 py-2 border border-slate-800/80">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[11px] text-slate-400 font-medium">Starting:</span>
                              <span className="text-base font-black text-[#F4B400]">₹{p.price}</span>
                              {p.market_price && (
                                <span className="text-xs text-slate-500 line-through">₹{p.market_price}</span>
                              )}
                            </div>
                            <span className="text-xs text-slate-300 font-semibold">
                              {p.plans && p.plans.length > 0 ? `${p.plans.length} Plans` : (p.plan_type || 'Standard')}
                            </span>
                          </div>

                          {/* Bottom: Touch Actions Bar */}
                          <div className="grid grid-cols-4 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => shareProductOnWhatsApp(p)}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366]/15 active:bg-[#25D366]/30 text-[#25D366] text-xs font-bold border border-[#25D366]/30 transition-colors"
                              title="Share on WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => copyProductLink(p.slug || p.id, p.name)}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 active:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                              title="Copy Link"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Link</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct({ ...p });
                                setEditModalOpen(true);
                              }}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 active:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setProductToDelete(p);
                                setDeleteDialogOpen(true);
                              }}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-950/40 active:bg-red-900/60 text-red-400 text-xs font-semibold border border-red-800/40 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Del</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── DESKTOP VIEW: High-Density Table (>= md) ── */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-bold">
                          <th className="py-4 px-5">Artwork & Product</th>
                          <th className="py-4 px-4">Category</th>
                          <th className="py-4 px-4">Price / Plans</th>
                          <th className="py-4 px-4">Badge</th>
                          <th className="py-4 px-4">Status</th>
                          <th className="py-4 px-5 text-right">Share & Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredProducts.map((p) => {
                          const artwork = getProductArtwork(p);
                          return (
                            <tr key={p.id || p.slug} className="hover:bg-slate-800/30 transition-colors">
                              {/* Artwork + Name */}
                              <td className="py-4 px-5">
                                <div className="flex items-center gap-3">
                                  {p.image_url ? (
                                    <img
                                      src={p.image_url}
                                      alt={p.name}
                                      className="w-10 h-10 rounded-xl object-contain bg-slate-950 border border-slate-700/80 p-1 shrink-0"
                                    />
                                  ) : (
                                    <div
                                      className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-center p-2 shrink-0"
                                      dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
                                    />
                                  )}
                                  <div>
                                    <div className="font-bold text-white text-sm hover:text-[#F4B400] transition-colors">
                                      <Link href={`/product/${p.slug || p.id}`} target="_blank">
                                        {p.name}
                                      </Link>
                                    </div>
                                    <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">{p.description}</div>
                                  </div>
                                </div>
                              </td>

                              {/* Category */}
                              <td className="py-4 px-4">
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                                  {p.category}
                                </span>
                              </td>

                              {/* Price / Plans */}
                              <td className="py-4 px-4">
                                <div className="font-black text-[#F4B400] text-sm">₹{p.price}</div>
                                {p.plans && p.plans.length > 0 ? (
                                  <div className="text-[11px] text-slate-400 font-semibold">
                                    {p.plans.length} tiers
                                  </div>
                                ) : (
                                  <div className="text-xs text-slate-500">{p.plan_type}</div>
                                )}
                              </td>

                              {/* Badge */}
                              <td className="py-4 px-4">
                                {p.badge ? (
                                  <Badge className="bg-[#F4B400]/15 text-[#F4B400] border-[#F4B400]/30 text-[10px] font-bold">
                                    {p.badge.replace('_', ' ')}
                                  </Badge>
                                ) : (
                                  <span className="text-slate-500 text-xs">—</span>
                                )}
                              </td>

                              {/* Status */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={cn(
                                      'w-2 h-2 rounded-full',
                                      p.is_hidden ? 'bg-red-500' : 'bg-green-500'
                                    )}
                                  />
                                  <span className="text-xs text-slate-300">
                                    {p.is_hidden ? 'Hidden' : 'Live'}
                                  </span>
                                </div>
                              </td>

                              {/* Share & Actions */}
                              <td className="py-4 px-5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Copy Shareable Link */}
                                  <button
                                    type="button"
                                    onClick={() => copyProductLink(p.slug || p.id, p.name)}
                                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-[#F4B400] transition-colors"
                                    title="Copy Sharable Link"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Share to WhatsApp Status */}
                                  <button
                                    type="button"
                                    onClick={() => shareProductOnWhatsApp(p)}
                                    className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] transition-colors"
                                    title="Share on WhatsApp Status"
                                  >
                                    <Share2 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Edit */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingProduct({ ...p });
                                      setEditModalOpen(true);
                                    }}
                                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                    title="Edit Product"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProductToDelete(p);
                                      setDeleteDialogOpen(true);
                                    }}
                                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: NOTICES & ALERTS ── */}
        {activeTab === 'notices' && <AdminNoticesTab />}

        {/* ── TAB: FAQS ── */}
        {activeTab === 'faqs' && <AdminFaqsTab />}

        {/* ── TAB: REVIEWS ── */}
        {activeTab === 'reviews' && <AdminReviewsTab />}

        {/* ── TAB: SERVICES ── */}
        {activeTab === 'services' && <AdminServicesTab />}

        {/* ── TAB: SETTINGS & DATABASE PROFILE ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 max-w-4xl">
            {/* Live Site Configuration (Brand, WhatsApp, Trust Counters) */}
            <AdminSiteSettingsTab />

            {/* ── EXTERNAL CLOUD PORTALS CARDS ── */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl shadow-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 mb-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Cloud Infrastructure Dashboards
              </div>
              <h3 className="text-xl font-black text-white">Direct Cloud Management Portals</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                One-click direct access to manage your MongoDB database and Google AI Studio models.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* MongoDB Atlas Portal Card */}
                <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <Database className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="font-black text-white text-base">MongoDB Atlas</h4>
                          <span className="text-[11px] text-emerald-400 font-semibold">Free 512MB M0 Cluster</span>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Access your cloud database directly. View the <code className="text-[#F4B400]">products</code> and <code className="text-[#F4B400]">adminusers</code> collections, manage database users, or configure Network IP Access list.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <a
                      href="https://cloud.mongodb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-xs transition-all shadow-md"
                    >
                      <span>Open Atlas Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://cloud.mongodb.com/v2#/clusters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                    >
                      <span>View Collections</span>
                    </a>
                  </div>
                </div>

                {/* Google AI Studio Portal Card */}
                <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-blue-500/50 transition-colors shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                          <Sparkles className="w-5 h-5" />
                        </span>
                        <div>
                          <h4 className="font-black text-white text-base">Google AI Studio</h4>
                          <span className="text-[11px] text-blue-400 font-semibold">Gemini 3.5 Flash (100% Free)</span>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Manage your Google AI developer account. Inspect your Free Tier quota (15 RPM / 1M TPM free), test prompt iterations in playground, or generate new API keys.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <a
                      href="https://aistudio.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold text-xs transition-all shadow-md"
                    >
                      <span>Open AI Studio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-colors"
                    >
                      <span>API Keys Manager</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Profile & Password Manager (Saved in MongoDB Atlas) */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#F4B400]/15 text-[#F4B400] border border-[#F4B400]/30 mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                MongoDB Atlas Admin Credentials
              </div>
              <h3 className="text-xl font-black text-white">Admin Account & Password Manager</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Your credentials are encrypted and stored directly in your MongoDB Atlas <code className="text-[#F4B400]">adminusers</code> collection.
              </p>

              <form onSubmit={handleUpdateAdminProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Display Name
                  </label>
                  <Input
                    value={adminDisplayName}
                    onChange={(e) => setAdminDisplayName(e.target.value)}
                    placeholder="EduGenius Admin"
                    className="bg-slate-950 border-slate-700 text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Admin Username *
                  </label>
                  <Input
                    value={newAdminUsername}
                    onChange={(e) => setNewAdminUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="bg-slate-950 border-slate-700 text-white rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Change Password (leave blank to keep current)
                  </label>
                  <Input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="Enter new password (optional)"
                    className="bg-slate-950 border-slate-700 text-white rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={updatingProfile}
                  className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl px-5 h-11"
                >
                  {updatingProfile ? 'Updating in Database...' : 'Save Credentials to MongoDB Atlas'}
                </Button>
              </form>
            </div>

            {/* MongoDB Atlas M0 Status */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    <Database className="w-3.5 h-3.5" />
                    MongoDB Atlas Free Plan (512MB M0)
                  </div>
                  <h3 className="text-xl font-black text-white">Cloud Database Status</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Database: <code className="text-[#F4B400]">{systemStatus?.mongodb?.database || 'edugeniushub (Atlas Cloud)'}</code>
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={loadSystemStatus}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-9"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Check Status
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1 font-medium">Connection State</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-bold text-base text-white">Connected to MongoDB Atlas</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1 font-medium">Catalog Items Stored in Cloud</div>
                  <div className="font-bold text-base text-[#F4B400]">
                    {systemStatus?.mongodb?.productCount || products.length} Products
                  </div>
                </div>
              </div>

              {/* 1-Click Database Seeder */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Reseed Default Products</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sync default tools into Atlas if needed.
                  </p>
                </div>
                <Button
                  onClick={() => handleSeedDatabase(false)}
                  disabled={seeding}
                  className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs px-4 h-10"
                >
                  {seeding ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Layers className="w-3.5 h-3.5 mr-1.5" />}
                  <span>Seed Default Catalog</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── EDIT / ADD PRODUCT MODAL ── */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0B1F3A] border-slate-800 text-slate-100 rounded-3xl p-4 sm:p-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-black text-white">
              {editingProduct?.id ? `Edit ${editingProduct.name}` : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>

          {editingProduct && (
            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Product Name *</label>
                  <Input
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="bg-slate-900 border-slate-800 text-white rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
                  <select
                    value={editingProduct.category || 'ai_tools'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#F4B400]"
                  >
                    <option value="ai_tools">AI Tools & API</option>
                    <option value="reports">Turnitin Reports</option>
                    <option value="ott">OTT Subscriptions</option>
                    <option value="services">Academic Services</option>
                    <option value="accounts">Student Accounts</option>
                  </select>
                </div>
              </div>

              {/* Product Artwork Preset Picker */}
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#F4B400]" />
                  <span>Branded Logo & Artwork Preset</span>
                </label>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditingProduct({
                          ...editingProduct,
                          badge: editingProduct.badge || 'best_seller',
                        });
                      }
                    }}
                    className="flex-1 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl h-9 px-3 text-xs focus:outline-none focus:border-[#F4B400]"
                  >
                    <option value="">Auto-Detect from Product Name</option>
                    {PRESET_PRODUCT_IMAGES.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.name}
                      </option>
                    ))}
                  </select>

                  <Input
                    placeholder="Or custom Image URL (optional)"
                    value={editingProduct.image_url || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    className="flex-1 bg-slate-900 border-slate-800 text-white rounded-xl h-9 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Base Price (₹) *</label>
                  <Input
                    type="number"
                    value={editingProduct.price ?? ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="bg-slate-900 border-slate-800 text-white rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Market Price (₹)</label>
                  <Input
                    type="number"
                    value={editingProduct.market_price ?? ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        market_price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="bg-slate-900 border-slate-800 text-white rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Badge</label>
                  <select
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value || null })}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl h-10 px-3 text-xs focus:outline-none focus:border-[#F4B400]"
                  >
                    <option value="">None</option>
                    <option value="best_seller">Best Seller</option>
                    <option value="instant_delivery">Instant Delivery</option>
                    <option value="available_now">Available Now</option>
                    <option value="limited_slots">Limited Slots</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                <Textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={2}
                  className="bg-slate-900 border-slate-800 text-white rounded-xl"
                />
              </div>

              {/* Multi-Tier Plans Manager */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#F4B400]" />
                    <span>Tiered Plans & Packages ({editingProduct.plans?.length || 0})</span>
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newPlans = [
                        ...(editingProduct.plans || []),
                        {
                          name: `Plan ${(editingProduct.plans?.length || 0) + 1}`,
                          price: editingProduct.price || 499,
                          duration: 'Monthly',
                          limits: '',
                        },
                      ];
                      setEditingProduct({ ...editingProduct, plans: newPlans });
                    }}
                    className="h-7 text-xs px-2.5 rounded-lg border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Plan Tier
                  </Button>
                </div>

                {editingProduct.plans && editingProduct.plans.length > 0 ? (
                  <div className="space-y-2">
                    {editingProduct.plans.map((plan: ProductPlan, pIdx: number) => (
                      <div
                        key={pIdx}
                        className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs"
                      >
                        <Input
                          placeholder="Plan Name (e.g. Plan 1)"
                          value={plan.name}
                          onChange={(e) => {
                            const updated = [...editingProduct.plans];
                            updated[pIdx].name = e.target.value;
                            setEditingProduct({ ...editingProduct, plans: updated });
                          }}
                          className="h-8 flex-1 min-w-[120px] bg-slate-950 border-slate-700 text-white rounded-lg text-xs"
                        />
                        <Input
                          type="number"
                          placeholder="Price ₹"
                          value={plan.price}
                          onChange={(e) => {
                            const updated = [...editingProduct.plans];
                            updated[pIdx].price = Number(e.target.value);
                            setEditingProduct({ ...editingProduct, plans: updated });
                          }}
                          className="h-8 w-24 bg-slate-950 border-slate-700 text-white rounded-lg text-xs"
                        />
                        <Input
                          placeholder="Limits (e.g. 20 req/day)"
                          value={plan.limits || ''}
                          onChange={(e) => {
                            const updated = [...editingProduct.plans];
                            updated[pIdx].limits = e.target.value;
                            setEditingProduct({ ...editingProduct, plans: updated });
                          }}
                          className="h-8 flex-1 min-w-[140px] bg-slate-950 border-slate-700 text-white rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = editingProduct.plans.filter((_: any, i: number) => i !== pIdx);
                            setEditingProduct({ ...editingProduct, plans: updated });
                          }}
                          className="p-1.5 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    No tiered plans added. This product will use the single base price.
                  </p>
                )}
              </div>

              {/* Features Builder */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bullet Features (1 per line)
                </label>
                <Textarea
                  value={editingProduct.features?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      features: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  placeholder="Instant WhatsApp Delivery&#10;Login with Your Own Gmail&#10;100% Replacement Warranty"
                  rows={3}
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs font-mono"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_featured || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#F4B400] accent-[#F4B400]"
                  />
                  <span className="font-semibold text-slate-300">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={editingProduct.is_hidden || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_hidden: e.target.checked })}
                    className="w-4 h-4 rounded text-red-500 accent-red-500"
                  />
                  <span className="font-semibold text-slate-300">Hide from Storefront</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                  className="border-slate-800 text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingProduct}
                  className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl px-6"
                >
                  {savingProduct ? 'Saving to Atlas...' : 'Save Product'}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ── DELETE CONFIRMATION DIALOG ── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="w-[92vw] sm:max-w-md bg-[#0B1F3A] border-slate-800 text-slate-100 rounded-3xl p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Deletion</span>
            </DialogTitle>
          </DialogHeader>

          <p className="text-xs text-slate-300 mt-2">
            Are you sure you want to delete <strong className="text-white">{productToDelete?.name}</strong> from your MongoDB Atlas cloud database?
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-slate-800 text-slate-300 hover:bg-slate-800 rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs"
            >
              Delete Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
