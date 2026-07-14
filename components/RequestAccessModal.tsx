'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Product } from '@/lib/types';
import { CircleCheck as CheckCircle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const WA_NUMBER = '918766253356';

type Props = {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
  products?: Product[];
};

const durationOptions = [
  '1 Month', '2 Months', '3 Months', '6 Months', '1 Year', 'One-time (Report)', 'Custom',
];

export default function RequestAccessModal({ open, onClose, product, products = [] }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(product?.name ?? '');
  const [duration, setDuration] = useState('1 Month');
  const [notes, setNotes] = useState('');
  const [done, setDone] = useState(false);

  const reset = () => {
    setName(''); setPhone(''); setEmail(''); setNotes('');
    setSelectedProduct(product?.name ?? '');
    setDuration('1 Month');
    setDone(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) { toast.error('Name and phone are required'); return; }

    const productName = selectedProduct || product?.name || 'Not specified';
    const category = product?.category || '';

    let detailsMsg = '';
    if (category === 'reports') {
      detailsMsg = `I want a Turnitin report. I am attaching my document file (.pdf/.docx) to this chat.`;
    } else if (category === 'ott') {
      detailsMsg = `I want ${productName}. Please set up a profile for me.`;
    } else {
      detailsMsg = `I want a ${productName} account. Please share the login credentials.`;
    }

    const message = `Hi EduGenius Hub 👋\n\n*New Request*\n\n*Name:* ${name}\n*Phone:* ${phone}${email ? `\n*Email:* ${email}` : ''}\n*Product:* ${productName}\n*Duration:* ${duration}${notes ? `\n*Notes:* ${notes}` : ''}\n\n${detailsMsg}`;
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

    setDone(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      onClose();
      reset();
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); reset(); } }}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {product ? `Request ${product.name}` : 'Request Access'}
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
            <p className="font-semibold text-lg">Opening WhatsApp...</p>
            <p className="text-muted-foreground text-sm mt-1">Your request is ready to send.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your Name *</Label>
              <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {!product && products.length > 0 && (
              <div className="space-y-1.5">
                <Label>Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger><SelectValue placeholder="Select a product" /></SelectTrigger>
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
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {durationOptions.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any special requirements, word count, etc." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold py-3 rounded-xl text-base gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Continue to WhatsApp
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
