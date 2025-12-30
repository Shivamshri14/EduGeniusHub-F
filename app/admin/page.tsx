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
  getTools,
  addTool,
  updateTool,
  deleteTool,
  getCombos,
  addCombo,
  updateCombo,
  deleteCombo,
} from "@/lib/admin-storage";
import {
  getSubscriptionStatus,
  getStatusColor,
  getStatusLabel,
  generateWhatsAppReminderLink,
  type Customer,
} from "@/lib/admin-types";
import { Tool, ComboTool } from "@/lib/tools";
import {
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  MessageCircle,
  LogOut,
  X,
  Wrench,
  Package,
} from "lucide-react";

type TabType = "customers" | "tools" | "combos";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("customers");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [combos, setCombos] = useState<ComboTool[]>([]);

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showToolModal, setShowToolModal] = useState(false);
  const [showComboModal, setShowComboModal] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [editingCombo, setEditingCombo] = useState<ComboTool | null>(null);

  const [customerForm, setCustomerForm] = useState({
    name: "",
    whatsapp: "",
    planName: "",
    startDate: "",
    expiryDate: "",
  });

  const [toolForm, setToolForm] = useState({
    name: "",
    tagline: "",
    description: "",
    officialUrl: "",
    image: "",
    marketPrice: 0,
    ourPrice: 0,
    category: "account" as "report" | "account" | "ott",
  });

  const [comboForm, setComboForm] = useState({
    name: "",
    tagline: "",
    description: "",
    tools: "",
    image: "",
    marketPrice: 0,
    ourPrice: 0,
  });

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      setShowPinModal(false);
      loadData();
    }
  }, []);

  const loadData = async () => {
    setCustomers(getCustomers());
    const toolsData = await getTools();
    const combosData = await getCombos();
    setTools(toolsData);
    setCombos(combosData);
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

  const handleAddTool = () => {
    setEditingTool(null);
    setToolForm({
      name: "",
      tagline: "",
      description: "",
      officialUrl: "",
      image: "",
      marketPrice: 0,
      ourPrice: 0,
      category: "account",
    });
    setShowToolModal(true);
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setToolForm({
      name: tool.name,
      tagline: tool.tagline,
      description: tool.description,
      officialUrl: tool.officialUrl,
      image: tool.image,
      marketPrice: tool.marketPrice,
      ourPrice: tool.ourPrice,
      category: tool.category,
    });
    setShowToolModal(true);
  };

  const handleDeleteTool = async (id: string) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      const result = await deleteTool(id);
      if (result.success) {
        await loadData();
      } else {
        alert(`Error deleting tool: ${result.error}`);
      }
    }
  };

  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let result;
    if (editingTool) {
      result = await updateTool(editingTool.id, toolForm);
    } else {
      result = await addTool(toolForm);
    }

    if (result.success) {
      setShowToolModal(false);
      await loadData();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleAddCombo = () => {
    setEditingCombo(null);
    setComboForm({
      name: "",
      tagline: "",
      description: "",
      tools: "",
      image: "",
      marketPrice: 0,
      ourPrice: 0,
    });
    setShowComboModal(true);
  };

  const handleEditCombo = (combo: ComboTool) => {
    setEditingCombo(combo);
    setComboForm({
      name: combo.name,
      tagline: combo.tagline,
      description: combo.description,
      tools: Array.isArray(combo.tools) ? combo.tools.join(", ") : "",
      image: combo.image,
      marketPrice: combo.marketPrice,
      ourPrice: combo.ourPrice,
    });
    setShowComboModal(true);
  };

  const handleDeleteCombo = async (id: string) => {
    if (confirm("Are you sure you want to delete this combo?")) {
      const result = await deleteCombo(id);
      if (result.success) {
        await loadData();
      } else {
        alert(`Error deleting combo: ${result.error}`);
      }
    }
  };

  const handleComboSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const comboData = {
      ...comboForm,
      tools: comboForm.tools.split(",").map((t) => t.trim()),
    };

    let result;
    if (editingCombo) {
      result = await updateCombo(editingCombo.id, comboData);
    } else {
      result = await addCombo(comboData);
    }

    if (result.success) {
      setShowComboModal(false);
      await loadData();
    } else {
      alert(`Error: ${result.error}`);
    }
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
                  Manage Customers, Tools & Combos
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab("customers")}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                activeTab === "customers"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Users size={18} />
              <span className="hidden sm:inline">Customers</span>
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                activeTab === "tools"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Wrench size={18} />
              <span className="hidden sm:inline">Tools</span>
            </button>
            <button
              onClick={() => setActiveTab("combos")}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                activeTab === "combos"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Package size={18} />
              <span className="hidden sm:inline">Combos</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "customers" && (
          <>
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
          </>
        )}

        {activeTab === "tools" && (
          <>
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Tools
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {tools.length} total tools
                </p>
              </div>
              <button
                onClick={handleAddTool}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                <span>Add Tool</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="aspect-video bg-slate-100 dark:bg-slate-700">
                    <img
                      src={tool.image}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">
                        {tool.category}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                        ₹{tool.marketPrice}
                      </span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ₹{tool.ourPrice}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTool(tool)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTool(tool.id)}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {tools.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Wrench size={48} className="text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No tools yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Add your first tool to get started
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "combos" && (
          <>
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Combo Packages
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {combos.length} total combos
                </p>
              </div>
              <button
                onClick={handleAddCombo}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                <span>Add Combo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {combos.map((combo) => (
                <div
                  key={combo.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                >
                  <div className="aspect-video bg-slate-100 dark:bg-slate-700">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {combo.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {combo.tagline}
                    </p>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <strong>Includes:</strong> {Array.isArray(combo.tools) ? combo.tools.join(", ") : ""}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                        ₹{combo.marketPrice}
                      </span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ₹{combo.ourPrice}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCombo(combo)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCombo(combo.id)}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {combos.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Package size={48} className="text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No combos yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Add your first combo to get started
                  </p>
                </div>
              )}
            </div>
          </>
        )}
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

      {showToolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingTool ? "Edit Tool" : "Add Tool"}
              </h2>
              <button
                onClick={() => setShowToolModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleToolSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Tool Name
                </label>
                <input
                  type="text"
                  value={toolForm.name}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={toolForm.tagline}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={toolForm.description}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Official URL
                </label>
                <input
                  type="url"
                  value={toolForm.officialUrl}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, officialUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={toolForm.image}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, image: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={toolForm.category}
                  onChange={(e) =>
                    setToolForm({
                      ...toolForm,
                      category: e.target.value as "report" | "account" | "ott",
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                >
                  <option value="report">Report</option>
                  <option value="account">Account</option>
                  <option value="ott">OTT</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Market Price
                  </label>
                  <input
                    type="number"
                    value={toolForm.marketPrice}
                    onChange={(e) =>
                      setToolForm({
                        ...toolForm,
                        marketPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Our Price
                  </label>
                  <input
                    type="number"
                    value={toolForm.ourPrice}
                    onChange={(e) =>
                      setToolForm({ ...toolForm, ourPrice: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowToolModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {editingTool ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showComboModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingCombo ? "Edit Combo" : "Add Combo"}
              </h2>
              <button
                onClick={() => setShowComboModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleComboSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Combo Name
                </label>
                <input
                  type="text"
                  value={comboForm.name}
                  onChange={(e) =>
                    setComboForm({ ...comboForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={comboForm.tagline}
                  onChange={(e) =>
                    setComboForm({ ...comboForm, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={comboForm.description}
                  onChange={(e) =>
                    setComboForm({ ...comboForm, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Included Tools (comma-separated)
                </label>
                <input
                  type="text"
                  value={comboForm.tools}
                  onChange={(e) =>
                    setComboForm({ ...comboForm, tools: e.target.value })
                  }
                  placeholder="Tool 1, Tool 2, Tool 3"
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={comboForm.image}
                  onChange={(e) =>
                    setComboForm({ ...comboForm, image: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Market Price
                  </label>
                  <input
                    type="number"
                    value={comboForm.marketPrice}
                    onChange={(e) =>
                      setComboForm({
                        ...comboForm,
                        marketPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Our Price
                  </label>
                  <input
                    type="number"
                    value={comboForm.ourPrice}
                    onChange={(e) =>
                      setComboForm({ ...comboForm, ourPrice: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowComboModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {editingCombo ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
