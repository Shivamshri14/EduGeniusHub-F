'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, ClipboardList, Users, ShoppingCart, Settings, Zap, LogOut, Menu, X, ChartBar as BarChart3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Leads', href: '/admin/leads', icon: ClipboardList },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const val = sessionStorage.getItem('admin_auth');
    setAuthed(val === 'true');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'edugenius2024') {
      sessionStorage.setItem('admin_auth', 'true');
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  if (authed === null) {
    return <div className="min-h-screen bg-[#0B1220]" />;
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#FFD60A] flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#0B1220]" fill="currentColor" />
            </div>
            <span className="text-white font-bold text-xl">Admin Panel</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h1 className="text-white font-bold text-xl mb-6">Sign In</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD60A]/50 text-sm"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold py-3 rounded-xl transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-60 flex-col bg-[#0B1220] text-white min-h-screen fixed left-0 top-0 bottom-0 z-40">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFD60A] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#0B1220]" fill="currentColor" />
            </div>
            <div>
              <div className="font-bold text-sm">EduGenius Hub</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  active ? 'bg-[#FFD60A] text-[#0B1220]' : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link href="/home">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-400 mt-1 transition-colors">
              View Website
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-[#0B1220] text-white flex flex-col">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFD60A] flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[#0B1220]" fill="currentColor" />
                </div>
                <span className="font-bold text-sm">Admin Panel</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                    <div className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      active ? 'bg-[#FFD60A] text-[#0B1220]' : 'text-gray-400 hover:text-white hover:bg-white/10'
                    )}>
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-white/10">
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 w-full">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        <header className="bg-background border-b border-border h-14 flex items-center px-4 gap-4 sticky top-0 z-30">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-semibold text-sm text-muted-foreground">
            {navItems.find((n) => n.href === pathname)?.label ?? 'Admin'}
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
