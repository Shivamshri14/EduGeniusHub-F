'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users, Settings, Package, Calendar, LogOut, TrendingUp,
  AlertCircle, Clock
} from 'lucide-react';
import {
  getAllCustomers, getAllSoftware, getAllSubscriptions,
  getCurrentUser, signOut
} from '@/lib/supabase';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Profile, Customer, Software, CustomerSubscriptionWithDetails } from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [software, setSoftware] = useState<Software[]>([]);
  const [subscriptions, setSubscriptions] = useState<CustomerSubscriptionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userProfile, customersData, softwareData, subscriptionsData] = await Promise.all([
        getCurrentUser(),
        getAllCustomers(),
        getAllSoftware(),
        getAllSubscriptions()
      ]);

      if (!userProfile || userProfile.role !== 'admin') {
        router.push('/');
        return;
      }

      setProfile(userProfile);
      setCustomers(customersData);
      setSoftware(softwareData);
      setSubscriptions(subscriptionsData);
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
  const expiringSoon = subscriptions.filter(s => {
    if (s.status !== 'active') return false;
    const daysUntilExpiry = Math.ceil(
      (new Date(s.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

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
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Admin
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
          { label: 'Admin Dashboard' }
        ]} />

        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Software</p>
                <p className="text-3xl font-bold text-gray-900">{software.length}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-gray-900">{activeSubscriptions.length}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-3xl font-bold text-gray-900">{expiringSoon.length}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admindashboard/customers"
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Customers</h3>
            </div>
            <p className="text-gray-600">Manage customer accounts and profiles</p>
          </Link>

          <Link
            href="/admindashboard/software"
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Software & Plans</h3>
            </div>
            <p className="text-gray-600">Manage software catalog and pricing plans</p>
          </Link>

          <Link
            href="/admindashboard/assignments"
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Assignments</h3>
            </div>
            <p className="text-gray-600">Assign subscriptions to customers</p>
          </Link>

          <Link
            href="/admindashboard/settings"
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-100 rounded-full p-3">
                <Settings className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Settings</h3>
            </div>
            <p className="text-gray-600">Configure system settings and links</p>
          </Link>
        </div>

        {expiringSoon.length > 0 && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-900">Expiring Soon</h3>
            </div>
            <div className="space-y-2">
              {expiringSoon.slice(0, 5).map(sub => (
                <div key={sub.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    {sub.customer?.full_name} - {sub.plan?.software?.name}
                  </span>
                  <span className="text-yellow-700 font-medium">
                    Expires: {new Date(sub.end_date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
