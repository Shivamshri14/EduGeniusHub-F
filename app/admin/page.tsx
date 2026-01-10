"use client";

import { useState, useEffect } from "react";
import {
  isAuthenticated,
  verifyPIN,
  setAuthSession,
  clearAuthSession,
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/lib/storage";
import {
  getSubscriptionStatus,
  getStatusColor,
  getStatusLabel,
  generateWhatsAppReminderLink,
  type Customer,
} from "@/lib/admin-types";
import {
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  MessageCircle,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(true);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const [customerForm, setCustomerForm] = useState({
    name: "",
    whatsapp: "",
    planName: "",
    startDate: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      setShowPinModal(false);
      loadData();
    }
  }, []);

  const loadData = () => {
    setCustomers(getCustomers());
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPIN(pin)) {
      setAuthSession();
      setAuthenticated(true);
      setShowPinModal(false);
      loadData();
    } else {
      alert("Invalid PIN");
      setPin("");
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setAuthenticated(false);
    setShowPinModal(true);
    setPin("");
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setCustomerForm({
      name: "",
      whatsapp: "",
      planName: "",
      startDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
    });
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name,
      whatsapp: customer.whatsapp,
      planName: customer.planName,
      startDate: customer.startDate,
      expiryDate: customer.expiryDate,
    });
    setShowCustomerModal(true);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id);
      loadData();
    }
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, customerForm);
    } else {
      addCustomer(customerForm);
    }
    setShowCustomerModal(false);
    loadData();
  };

  if (showPinModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Access
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter PIN to continue
            </p>
          </div>

          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter 4-digit PIN"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg mb-4 text-center text-2xl tracking-widest bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              maxLength={4}
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sortedCustomers = [...customers].sort((a, b) => {
    const statusA = getSubscriptionStatus(a.expiryDate);
    const statusB = getSubscriptionStatus(b.expiryDate);
    const priority = { expired: 0, "expiring-soon": 1, active: 2 };
    return priority[statusA] - priority[statusB];
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage Customers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 mb-8 rounded-r-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> Tools, combos, deals and reviews are managed via Google Sheet (Secure API).
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Customers
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {customers.length} total subscriptions
            </p>
          </div>
          <button
            onClick={handleAddCustomer}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            <span>Add Customer</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {sortedCustomers.map((customer) => {
                const status = getSubscriptionStatus(customer.expiryDate);
                return (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {customer.name}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {customer.whatsapp}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white">
                      {customer.planName}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {new Date(customer.startDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {new Date(customer.expiryDate).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          status
                        )}`}
                      >
                        {getStatusLabel(status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={generateWhatsAppReminderLink(customer)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                          title="Send WhatsApp Reminder"
                        >
                          <MessageCircle size={18} />
                        </a>
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {customers.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No customers yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Add your first customer to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {showCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingCustomer ? "Edit Customer" : "Add Customer"}
              </h2>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCustomerSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerForm.name}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={customerForm.whatsapp}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, whatsapp: e.target.value })
                  }
                  placeholder="919876543210"
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={customerForm.planName}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, planName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={customerForm.startDate}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, startDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={customerForm.expiryDate}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, expiryDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomerModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {editingCustomer ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
