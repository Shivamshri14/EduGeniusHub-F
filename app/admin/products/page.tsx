'use client';

import { useEffect, useState } from 'react';
import { supabase, type Product } from '@/lib/supabase';
import { Plus, CreditCard as Edit2, Trash2, Eye, EyeOff, Star, Zap, Check, X, Loader as Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const emptyProduct: Partial<Product> = {
  name: '', slug: '', description: '', category: 'ai_tools', price: 0,
  market_price: 0, badge: null, delivery_time: 'Within 6 hours',
  is_instant: false, is_featured: false, is_hidden: false,
  plan_type: 'Monthly', account_type: 'Shared', sort_order: 0,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Product>>(emptyProduct);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('sort_order');
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...emptyProduct });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editing.name || !editing.price) {
      toast.error('Name and price are required');
      return;
    }
    setSaving(true);
    const slug = editing.slug || editing.name!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const payload = { ...editing, slug };

    if (editing.id) {
      const { error } = await supabase.from('products').update(payload).eq('id', editing.id);
      if (error) toast.error('Failed to save');
      else toast.success('Product updated');
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) toast.error('Failed to create');
      else toast.success('Product created');
    }
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    toast.success('Deleted');
    load();
  };

  const toggleField = async (id: string, field: 'is_hidden' | 'is_featured' | 'is_instant', val: boolean) => {
    await supabase.from('products').update({ [field]: !val }).eq('id', id);
    load();
  };

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  );

  const badgeOptions = [
    { value: '', label: 'None' },
    { value: 'best_seller', label: 'Best Seller' },
    { value: 'instant_delivery', label: 'Instant Delivery' },
    { value: 'available_now', label: 'Available Now' },
    { value: 'limited_slots', label: 'Limited Slots' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Products</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.length} total products</p>
        </div>
        <Button onClick={openNew} className="bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm rounded-xl"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((product) => (
              <div key={product.id} className={cn('flex items-center gap-3 px-5 py-4', product.is_hidden && 'opacity-50')}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm truncate">{product.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{product.category}</span>
                    {product.is_featured && <Star className="w-3.5 h-3.5 text-[#FFD60A] fill-[#FFD60A]" />}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">₹{product.price} · {product.delivery_time}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleField(product.id, 'is_hidden', product.is_hidden)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title={product.is_hidden ? 'Show' : 'Hide'}
                  >
                    {product.is_hidden ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => toggleField(product.id, 'is_featured', product.is_featured)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title="Toggle featured"
                  >
                    <Star className={cn('w-4 h-4', product.is_featured ? 'text-[#FFD60A] fill-[#FFD60A]' : 'text-muted-foreground')} />
                  </button>
                  <button
                    onClick={() => openEdit(product)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label>Name *</Label>
                <Input value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Price (₹) *</Label>
                <Input type="number" value={editing.price ?? ''} onChange={(e) => setEditing({ ...editing, price: +e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Market Price (₹)</Label>
                <Input type="number" value={editing.market_price ?? ''} onChange={(e) => setEditing({ ...editing, market_price: +e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v as Product['category'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reports">Reports</SelectItem>
                    <SelectItem value="accounts">Accounts</SelectItem>
                    <SelectItem value="ai_tools">AI Tools</SelectItem>
                    <SelectItem value="ott">OTT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Badge</Label>
                <Select value={editing.badge ?? ''} onValueChange={(v) => setEditing({ ...editing, badge: (v || null) as Product['badge'] })}>
                  <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    {badgeOptions.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Delivery Time</Label>
                <Input value={editing.delivery_time ?? ''} onChange={(e) => setEditing({ ...editing, delivery_time: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Plan Type</Label>
                <Input value={editing.plan_type ?? ''} onChange={(e) => setEditing({ ...editing, plan_type: e.target.value })} />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label>Description</Label>
                <Textarea value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} />
              </div>
              <div className="col-span-2 flex gap-4">
                {[
                  { key: 'is_featured', label: 'Featured' },
                  { key: 'is_hidden', label: 'Hidden' },
                  { key: 'is_instant', label: 'Instant Delivery' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!(editing as any)[key]}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#FFD60A]"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button
                className="flex-1 bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold rounded-xl"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Product'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
