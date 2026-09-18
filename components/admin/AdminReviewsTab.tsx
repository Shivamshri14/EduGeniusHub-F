'use client';

import { useState, useEffect } from 'react';
import {
  Star,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ReviewItemData } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AdminReviewsTab() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews?all=true');
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      }
    } catch (err: any) {
      toast.error('Failed to load reviews: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleOpenCreate = () => {
    setEditingReview({
      name: '',
      role: 'Student',
      quote: '',
      image_url: '',
      rating: 5,
      sort_order: reviews.length,
      is_active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (review: any) => {
    setEditingReview({ ...review });
    setModalOpen(true);
  };

  const handleToggleActive = async (review: any) => {
    try {
      const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !review.is_active }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(review.is_active ? 'Review hidden' : 'Review visible');
        setReviews((prev) =>
          prev.map((r) => (r.id === review.id ? { ...r, is_active: !r.is_active } : r))
        );
      } else {
        toast.error(data.error || 'Failed to update review');
      }
    } catch {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Review deleted');
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error(data.error || 'Failed to delete review');
      }
    } catch {
      toast.error('Failed to delete review');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.name || !editingReview?.quote) {
      toast.error('Name and quote are required');
      return;
    }

    setSaving(true);
    try {
      const isEdit = Boolean(editingReview.id && !editingReview.id.startsWith('r') && !editingReview.id.startsWith('t'));
      const url = isEdit ? `/api/reviews/${editingReview.id}` : '/api/reviews';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingReview),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? 'Review updated!' : 'Review added to MongoDB!');
        setModalOpen(false);
        loadReviews();
      } else {
        toast.error(data.error || 'Failed to save review');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving review');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold border border-yellow-500/30 mb-2">
            <Star className="w-3.5 h-3.5" />
            MongoDB Customer Reviews & Proof
          </div>
          <h3 className="text-xl font-black text-white">Customer Reviews & Testimonials</h3>
          <p className="text-xs text-slate-400 mt-1">
            Display real feedback, ratings, and WhatsApp delivery screenshots. Stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={loadReviews}
            disabled={loading}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-10 px-3"
          >
            <RefreshCw className={cn('w-3.5 h-3.5 mr-1.5', loading && 'animate-spin')} />
            Refresh
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs h-10 px-4 shadow-lg shadow-[#F4B400]/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div
            key={review.id || index}
            className={cn(
              'bg-slate-900/80 border rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all',
              review.is_active ? 'border-slate-800' : 'border-slate-800/60 opacity-60'
            )}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F4B400] text-[#F4B400]" />
                  ))}
                </div>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold',
                    review.is_active ? 'bg-green-500/15 text-green-400' : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {review.is_active ? 'ACTIVE' : 'HIDDEN'}
                </span>
              </div>

              <p className="text-xs text-slate-200 italic line-clamp-3">&ldquo;{review.quote}&rdquo;</p>

              <div>
                <span className="font-bold text-white text-xs block">{review.name}</span>
                {review.role && <span className="text-[11px] text-slate-400 block">{review.role}</span>}
              </div>

              {(review.image_url || review.imageUrl) && (
                <div className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-950/60 px-2 py-1 rounded-lg">
                  <ImageIcon className="w-3 h-3 text-[#F4B400]" />
                  <span className="truncate">{review.image_url || review.imageUrl}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-800/80">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleActive(review)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-7 px-2"
              >
                {review.is_active ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-slate-500" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenEdit(review)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-7 px-2"
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(review.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-xs h-7 px-2"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-md bg-[#0B1F3A] border-slate-800 text-slate-100 rounded-3xl p-5 sm:p-7">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F4B400]" />
              {editingReview?.id ? 'Edit Review' : 'Add Review'}
            </DialogTitle>
          </DialogHeader>

          {editingReview && (
            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Customer / Student Name *</label>
                <Input
                  value={editingReview.name || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                  placeholder="e.g. Rahul S. or Student from Delhi"
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Role / Location (optional)</label>
                <Input
                  value={editingReview.role || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                  placeholder="e.g. B.Tech Student, Delhi"
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Quote / Feedback *</label>
                <Textarea
                  value={editingReview.quote || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, quote: e.target.value })}
                  placeholder="e.g. Turnitin report delivered in 10 minutes, super affordable!"
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs min-h-[80px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating (1 - 5)</label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl h-9 px-3 text-xs focus:outline-none focus:border-[#F4B400]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Screenshot URL (optional)</label>
                  <Input
                    value={editingReview.image_url || editingReview.imageUrl || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, image_url: e.target.value, imageUrl: e.target.value })}
                    placeholder="/reviews/review1.jpg"
                    className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingReview.is_active ?? true}
                    onChange={(e) => setEditingReview({ ...editingReview, is_active: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-[#F4B400] focus:ring-[#F4B400]"
                  />
                  <span>Active</span>
                </label>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setModalOpen(false)}
                    className="text-slate-400 hover:text-white text-xs h-9"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs h-9 px-4"
                  >
                    {saving ? 'Saving...' : 'Save Review'}
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
