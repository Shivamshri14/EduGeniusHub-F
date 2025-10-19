'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye, EyeOff, ArrowLeft, AlertTriangle, CheckCircle, Clock, Copy
} from 'lucide-react';
import {
  getCurrentUser, getMySubscriptions, getCredentialsBySubscriptionId
} from '@/lib/supabase';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Profile, CustomerSubscriptionWithDetails, Credential } from '@/lib/types';

export default function CredentialsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscriptions, setSubscriptions] = useState<CustomerSubscriptionWithDetails[]>([]);
  const [credentials, setCredentials] = useState<Record<string, Credential[]>>({});
  const [loading, setLoading] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userProfile, subs] = await Promise.all([
        getCurrentUser(),
        getMySubscriptions()
      ]);

      if (!userProfile || userProfile.role !== 'customer') {
        router.push('/');
        return;
      }

      setProfile(userProfile);
      setSubscriptions(subs);

      const credsMap: Record<string, Credential[]> = {};
      for (const sub of subs) {
        const creds = await getCredentialsBySubscriptionId(sub.id);
        credsMap[sub.id] = creds;
      }
      setCredentials(credsMap);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (credId: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [credId]: !prev[credId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading credentials...</p>
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
            </div>
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb customItems={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Credentials' }
        ]} />

        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Credentials</h2>

        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Subscriptions Found</h3>
            <p className="text-gray-600">Contact admin to get your subscriptions activated.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map(sub => {
              const isExpired = new Date(sub.end_date) < new Date();
              const isExpiringSoon = !isExpired && new Date(sub.end_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              const subCreds = credentials[sub.id] || [];

              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
                    isExpired
                      ? 'border-red-200 bg-red-50/30'
                      : isExpiringSoon
                      ? 'border-yellow-200 bg-yellow-50/30'
                      : 'border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{sub.plan?.software?.name}</h3>
                        <p className="text-gray-600">{sub.plan?.display_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isExpired && <AlertTriangle className="h-6 w-6 text-red-500" />}
                      {isExpiringSoon && <Clock className="h-6 w-6 text-yellow-500" />}
                      {!isExpired && !isExpiringSoon && <CheckCircle className="h-6 w-6 text-green-500" />}
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          isExpired
                            ? 'bg-red-100 text-red-800'
                            : isExpiringSoon
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">Start Date</p>
                      <p className="text-gray-900 font-semibold">{new Date(sub.start_date).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">End Date</p>
                      <p className="text-gray-900 font-semibold">{new Date(sub.end_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {isExpired ? (
                    <div className="bg-red-100 border border-red-200 rounded-lg p-4 text-center">
                      <p className="text-red-800 font-semibold">
                        Your subscription has expired. Please contact admin to renew.
                      </p>
                    </div>
                  ) : subCreds.length > 0 ? (
                    <div className="space-y-4">
                      {subCreds.map(cred => (
                        <div key={cred.id} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Login ID</label>
                              <div className="flex items-center space-x-2">
                                <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm">
                                  {cred.login_id}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(cred.login_id)}
                                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                              <div className="flex items-center space-x-2">
                                <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm">
                                  {visiblePasswords[cred.id] ? cred.password : '••••••••'}
                                </code>
                                <button
                                  onClick={() => togglePasswordVisibility(cred.id)}
                                  className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                  {visiblePasswords[cred.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                                <button
                                  onClick={() => copyToClipboard(cred.password)}
                                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <Copy className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {cred.notes && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                <p className="bg-white px-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-700">
                                  {cred.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <p className="text-gray-600">No credentials available yet. Please contact admin.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
