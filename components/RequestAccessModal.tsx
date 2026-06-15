'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase, type Product } from '@/lib/supabase';
import { CircleCheck as CheckCircle2, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  products?: Product[];
};

const durationOptions = [
  '1 Month', '2 Months', '3 Months', '6 Months', '1 Year', 'One-time (Report)', 'Custom'
];

export default function RequestAccessModal({ open, onClose, product, products = [] }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(product?.name ?? '');
  const [duration, setDuration] = useState('1 Month');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    setLoading(true);

    const productName = selectedProduct || product?.name || 'Not specified';

    await supabase.from('leads').insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      product_name: productName,
      product_id: product?.id ?? null,
      duration,
      notes: notes.trim() || null,
      status: 'new',
    });

    const message = `Hi EduGenius Hub 👋\n\n*New Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Product:* ${productName}\n*Duration:* ${duration}\n*Notes:* ${notes || 'None'}\n\nPlease guide me.`;
    const waUrl = `https://wa.me/918766253356?text=${encodeURIComponent(message)}`;

    setLoading(false);
    setDone(true);

    setTimeout(() => {
      window.open(waUrl, '_blank');
      onClose();
      setDone(false);
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setSelectedProduct(product?.name ?? '');
      setDuration('1 Month');
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {product ? `Request ${product.name}` : 'Request Access'}
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
            <p className="font-semibold text-lg">Request Submitted!</p>
            <p className="text-muted-foreground text-sm mt-1">Redirecting to WhatsApp...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {!product && products.length > 0 && (
              <div className="space-y-1.5">
                <Label>Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {product && (
              <div className="p-3 rounded-xl bg-muted flex items-center justify-between">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-sm font-bold text-[#F4B400]">₹{product.price}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label>Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements, word count, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold py-3 rounded-xl text-base"
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
              ) : (
                'Submit & Chat on WhatsApp'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
