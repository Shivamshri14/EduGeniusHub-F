'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Package, LogOut, AlertTriangle, CheckCircle, Clock, Phone
} from 'lucide-react';
import {
  getCurrentUser, getMySubscriptions, getSettings, signOut
} from '@/lib/supabase';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Profile, CustomerSubscriptionWithDetails, Settings } from '@/lib/types';

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<CustomerSubscriptionWithDetails[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userProfile, subs, siteSettings] = await Promise.all([
        getCurrentUser(),
        getMySubscriptions(),
        getSettings()
      ]);

      if (!userProfile || userProfile.role !== 'customer') {
        router.push('/');
        return;
      }

      setProfile(userProfile);
      setSubscriptions(subs);
      setSettings(siteSettings);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  const expiredSubscriptions = subscriptions.filter(s => s.status === 'expired');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Edu Genius Hub</h1>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Customer
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb customItems={[
          { label: 'Home', href: '/' },
          { label: 'My Dashboard' }
        ]} />

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-blue-100">Manage your software subscriptions and credentials</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-blue-100 text-sm">Active</p>
              <p className="text-2xl font-bold">{activeSubscriptions.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-blue-100 text-sm">Expired</p>
              <p className="text-2xl font-bold">{expiredSubscriptions.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-blue-100 text-sm">Total</p>
              <p className="text-2xl font-bold">{subscriptions.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-blue-100 text-sm">Software</p>
              <p className="text-2xl font-bold">{new Set(subscriptions.map(s => s.plan?.software_id)).size}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Link
            href="/dashboard/credentials"
            className="block bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">View My Credentials</h3>
                  <p className="text-gray-600">Access all your subscription credentials and details</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">View →</span>
            </div>
          </Link>
        </div>

        {settings?.whatsapp_direct_url && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Need Help?</h3>
                  <p className="text-gray-600">Contact admin for support</p>
                </div>
              </div>
              <a
                href={settings.whatsapp_direct_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Contact on WhatsApp
              </a>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h3>
          <div className="space-y-4">
            {subscriptions.slice(0, 5).map(sub => {
              const isExpired = new Date(sub.end_date) < new Date();
              const isExpiringSoon = !isExpired && new Date(sub.end_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

              return (
                <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {isExpired && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {isExpiringSoon && <Clock className="h-5 w-5 text-yellow-500" />}
                    {!isExpired && !isExpiringSoon && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <div>
                      <p className="font-semibold text-gray-900">{sub.plan?.software?.name}</p>
                      <p className="text-sm text-gray-600">{sub.plan?.display_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      isExpired ? 'text-red-600' : isExpiringSoon ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Expires: {new Date(sub.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
