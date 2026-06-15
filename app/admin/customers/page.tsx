'use client';

import { useEffect, useState } from 'react';
import { supabase, type Customer } from '@/lib/supabase';
import { Plus, Search, CreditCard as Edit2, Trash2, Tag, Loader as Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const emptyCustomer: Partial<Customer> = {
  name: '', phone: '', email: '', tags: [], notes: '',
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Customer>>(emptyCustomer);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
    if (data) setCustomers(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing({ ...emptyCustomer, tags: [] }); setTagInput(''); setModalOpen(true); };
  const openEdit = (c: Customer) => { setEditing({ ...c }); setTagInput(c.tags?.join(', ') ?? ''); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing.name) { toast.error('Name required'); return; }
    setSaving(true);
    const tags = tagInput.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = { ...editing, tags };
    if (editing.id) {
      await supabase.from('customers').update(payload).eq('id', editing.id);
      toast.success('Customer updated');
    } else {
      await supabase.from('customers').insert(payload);
      toast.success('Customer created');
    }
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete customer?')) return;
    await supabase.from('customers').delete().eq('id', id);
    toast.success('Deleted');
    load();
  };

  const filtered = customers.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) || c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Customers</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{customers.length} total customers</p>
        </div>
        <Button onClick={openNew} className="bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No customers found</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((customer) => (
              <div key={customer.id} className="flex items-center gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-full bg-[#FFD60A]/20 border border-[#FFD60A]/30 flex items-center justify-center font-bold text-sm text-[#FFD60A] shrink-0">
                  {customer.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{customer.name}</div>
                  <div className="text-xs text-muted-foreground">{customer.phone} {customer.email ? `· ${customer.email}` : ''}</div>
                  {customer.tags?.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {customer.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(customer)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(customer.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing.id ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label>Name *</Label>
              <Input value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={editing.phone ?? ''} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={editing.email ?? ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" />Tags (comma separated)</Label>
              <Input placeholder="student, thesis, repeat" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} rows={3} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button className="flex-1 bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold rounded-xl" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
