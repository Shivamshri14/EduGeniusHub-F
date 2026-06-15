'use client';

import { useEffect, useState } from 'react';
import {
  getCustomers, addCustomer, updateCustomer, deleteCustomer,
  type CrmCustomer, type CrmStatus, STATUS_CONFIG
} from '@/utils/crmStorage';
import { Plus, Search, CreditCard as Edit2, Trash2, MessageCircle, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const STATUSES = Object.keys(STATUS_CONFIG) as CrmStatus[];

const emptyForm = { name: '', phone: '', product: '', date: '', status: 'new_lead' as CrmStatus, notes: '' };

export default function AdminCrm() {
  const [customers, setCustomers] = useState<CrmCustomer[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CrmStatus | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => setCustomers(getCustomers());
  useEffect(() => { load(); }, []);

  const filtered = customers.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) || c.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openNew = () => {
    setEditId(null);
    setForm({ ...emptyForm, date: new Date().toLocaleDateString('en-IN') });
    setModalOpen(true);
  };

  const openEdit = (c: CrmCustomer) => {
    setEditId(c.id);
    setForm({ name: c.name, phone: c.phone, product: c.product, date: c.date, status: c.status, notes: c.notes });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) { toast.error('Name and phone are required'); return; }
    if (editId) {
      updateCustomer(editId, form);
      toast.success('Customer updated');
    } else {
      addCustomer(form);
      toast.success('Customer added');
    }
    load();
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this customer?')) return;
    deleteCustomer(id);
    load();
    toast.success('Deleted');
  };

  const handleStatusChange = (id: string, status: CrmStatus) => {
    updateCustomer(id, { status });
    load();
  };

  const waLink = (phone: string, name: string, product: string) =>
    `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${name}! Your ${product} order from EduGenius Hub is ready. Please let us know if you need any help.`)}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">CRM</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{customers.length} customers · stored locally</p>
        </div>
        <Button onClick={openNew} className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {STATUSES.map((s) => {
          const count = customers.filter((c) => c.status === s).length;
          const cfg = STATUS_CONFIG[s];
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={cn(
                'rounded-xl p-3 border text-left transition-all hover:scale-[1.02]',
                statusFilter === s ? cfg.color + ' shadow-md' : 'bg-card border-border'
              )}
            >
              <div className={cn('w-2 h-2 rounded-full mb-2', cfg.dot)} />
              <div className="text-xl font-black">{count}</div>
              <div className="text-xs text-muted-foreground">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, product..."
            className="pl-9 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            {customers.length === 0 ? 'No customers yet. Add your first customer.' : 'No results found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-semibold text-xs text-muted-foreground uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs text-muted-foreground uppercase tracking-wide hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c) => {
                  const cfg = STATUS_CONFIG[c.status];
                  return (
                    <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#F4B400]/20 border border-[#F4B400]/30 flex items-center justify-center font-bold text-xs text-[#F4B400] shrink-0">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-muted-foreground">{c.product || '—'}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-muted-foreground text-xs">{c.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Select value={c.status} onValueChange={(v) => handleStatusChange(c.id, v as CrmStatus)}>
                          <SelectTrigger className={cn('h-7 text-xs rounded-full border px-3 w-auto min-w-[120px]', cfg.color)}>
                            <div className="flex items-center gap-1.5">
                              <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <a
                            href={waLink(c.phone, c.name, c.product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-[#25D366]/10 text-muted-foreground hover:text-[#25D366] transition-colors"
                            title="Message on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
              </div>
              <div className="space-y-1.5">
                <Label>Phone *</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765..." />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Product</Label>
                <Input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="e.g. Turnitin" />
              </div>
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="DD/MM/YYYY" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as CrmStatus })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      <div className="flex items-center gap-2">
                        <span className={cn('w-2 h-2 rounded-full', STATUS_CONFIG[s].dot)} />
                        {STATUS_CONFIG[s].label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder="Any additional notes..."
              />
            </div>
            <div className="flex gap-3 pt-1">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button
                className="flex-1 bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl"
                onClick={handleSave}
              >
                {editId ? 'Update' : 'Add Customer'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
