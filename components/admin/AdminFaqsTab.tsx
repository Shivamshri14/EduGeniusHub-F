'use client';

import { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Faq } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AdminFaqsTab() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<Faq> | null>(null);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faqs?all=true');
      const data = await res.json();
      if (data.success && Array.isArray(data.faqs)) {
        setFaqs(data.faqs);
      }
    } catch (err: any) {
      toast.error('Failed to load FAQs: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleOpenCreate = () => {
    setEditingFaq({
      question: '',
      answer: '',
      category: 'general',
      is_active: true,
      sort_order: faqs.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: Faq) => {
    setEditingFaq({ ...faq });
    setModalOpen(true);
  };

  const handleToggleActive = async (faq: Faq) => {
    try {
      const res = await fetch(`/api/faqs/${faq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !faq.is_active }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(faq.is_active ? 'FAQ deactivated' : 'FAQ activated');
        setFaqs((prev) =>
          prev.map((f) => (f.id === faq.id ? { ...f, is_active: !f.is_active } : f))
        );
      } else {
        toast.error(data.error || 'Failed to update FAQ');
      }
    } catch {
      toast.error('Failed to update FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('FAQ deleted');
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      } else {
        toast.error(data.error || 'Failed to delete FAQ');
      }
    } catch {
      toast.error('Failed to delete FAQ');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      toast.error('Question and answer are required');
      return;
    }

    setSaving(true);
    try {
      const isEdit = Boolean(editingFaq.id && !editingFaq.id.startsWith('f'));
      // Note: static ids like f1, f2 from lib can be created as new docs if not in DB yet
      const url = isEdit ? `/api/faqs/${editingFaq.id}` : '/api/faqs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? 'FAQ updated!' : 'FAQ added to MongoDB!');
        setModalOpen(false);
        loadFaqs();
      } else {
        toast.error(data.error || 'Failed to save FAQ');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving FAQ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 shadow-sm p-5 sm:p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            MongoDB FAQs Management
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Questions and answers displayed on the homepage and contact page. Stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={loadFaqs}
            disabled={loading}
            className="border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs h-10 px-3"
          >
            <RefreshCw className={cn('w-3.5 h-3.5 mr-1.5', loading && 'animate-spin')} />
            Refresh
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs h-10 px-4 shadow-lg shadow-[#F4B400]/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add FAQ
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.id || index}
            className={cn(
              'bg-white dark:bg-slate-900 border rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
              faq.is_active ? 'border-orange-200 dark:border-slate-700' : 'border-orange-100 dark:border-slate-800 opacity-60'
            )}
          >
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{faq.question}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold',
                    faq.is_active ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  )}
                >
                  {faq.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleActive(faq)}
                className="border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs h-8 px-2.5"
              >
                {faq.is_active ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEdit(faq)}
                className="border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs h-8 px-2.5"
              >
                <Edit className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(faq.id)}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl text-xs h-8 px-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg bg-white dark:bg-slate-900 border-orange-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl p-5 sm:p-7">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#F4B400]" />
              {editingFaq?.id ? 'Edit FAQ' : 'Add FAQ'}
            </DialogTitle>
          </DialogHeader>

          {editingFaq && (
            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Question *</label>
                <Input
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="e.g. How fast is delivery?"
                  className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">Answer *</label>
                <Textarea
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  placeholder="e.g. Delivery is fulfilled within 5-30 minutes on WhatsApp..."
                  className="bg-white dark:bg-slate-800 border-orange-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs min-h-[90px]"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-orange-100 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={editingFaq.is_active ?? true}
                    onChange={(e) => setEditingFaq({ ...editingFaq, is_active: e.target.checked })}
                    className="rounded bg-white dark:bg-slate-900 border-orange-300 dark:border-slate-600 text-[#F4B400] focus:ring-[#F4B400]"
                  />
                  <span>Active</span>
                </label>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setModalOpen(false)}
                    className="text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white text-xs h-9"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs h-9 px-4"
                  >
                    {saving ? 'Saving...' : 'Save FAQ'}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
