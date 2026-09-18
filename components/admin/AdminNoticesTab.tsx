'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Eye,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { NoticeItem, NoticeVariant, NoticeType } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AdminNoticesTab() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Partial<NoticeItem> | null>(null);

  const loadNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices?all=true');
      const data = await res.json();
      if (data.success && Array.isArray(data.notices)) {
        setNotices(data.notices);
      }
    } catch (err: any) {
      toast.error('Failed to load notices: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleOpenCreate = () => {
    setEditingNotice({
      title: '',
      message: '',
      badge: '🔥 SPECIAL OFFER',
      variant: 'primary',
      type: 'banner',
      link: '/products?category=reports',
      link_text: 'View Reports',
      is_active: true,
      is_dismissible: true,
      sort_order: 0,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (notice: NoticeItem) => {
    setEditingNotice({ ...notice });
    setModalOpen(true);
  };

  const handleToggleActive = async (notice: NoticeItem) => {
    try {
      const res = await fetch(`/api/notices/${notice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !notice.is_active }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(notice.is_active ? 'Notice deactivated' : 'Notice activated!');
        setNotices((prev) =>
          prev.map((n) => (n.id === notice.id ? { ...n, is_active: !n.is_active } : n))
        );
      } else {
        toast.error(data.error || 'Failed to update notice');
      }
    } catch {
      toast.error('Failed to connect to database');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Notice deleted');
        setNotices((prev) => prev.filter((n) => n.id !== id));
      } else {
        toast.error(data.error || 'Failed to delete notice');
      }
    } catch {
      toast.error('Failed to delete notice');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice?.title || !editingNotice?.message) {
      toast.error('Title and message are required');
      return;
    }

    setSaving(true);
    try {
      const isEdit = Boolean(editingNotice.id);
      const url = isEdit ? `/api/notices/${editingNotice.id}` : '/api/notices';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingNotice),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? 'Notice updated successfully!' : 'Notice created and published!');
        setModalOpen(false);
        loadNotices();
      } else {
        toast.error(data.error || 'Failed to save notice');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving notice');
    } finally {
      setSaving(false);
    }
  };

  // Live active preview banner
  const activeNotice = notices.find((n) => n.is_active);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-[#F4B400] text-xs font-bold border border-amber-500/30 mb-2">
            <Bell className="w-3.5 h-3.5" />
            MongoDB Notice & Announcement System
          </div>
          <h3 className="text-xl font-black text-white">Live Notices & Alert Banners</h3>
          <p className="text-xs text-slate-400 mt-1">
            Display flash deals, important alerts, and announcement banners at the top of your website. Stored in MongoDB Atlas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={loadNotices}
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
            New Notice / Alert
          </Button>
        </div>
      </div>

      {/* Live Preview Box */}
      {activeNotice && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-5">
          <div className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            Live Preview on Website
          </div>
          <div
            className={cn(
              'rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-medium border flex items-center justify-between gap-3 shadow-md',
              activeNotice.variant === 'primary' && 'bg-amber-500/20 border-amber-500/30 text-amber-100',
              activeNotice.variant === 'warning' && 'bg-yellow-600/25 border-yellow-500/40 text-yellow-100',
              activeNotice.variant === 'info' && 'bg-blue-600/25 border-blue-500/40 text-blue-100',
              activeNotice.variant === 'success' && 'bg-emerald-600/25 border-emerald-500/40 text-emerald-100',
              activeNotice.variant === 'destructive' && 'bg-red-600/25 border-red-500/40 text-red-100'
            )}
          >
            <div className="flex items-center gap-2.5 flex-wrap">
              {activeNotice.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F4B400] text-[#0B1F3A]">
                  {activeNotice.badge}
                </span>
              )}
              <span className="font-bold text-white">{activeNotice.title}:</span>
              <span className="text-white/85">{activeNotice.message}</span>
              {activeNotice.link && (
                <span className="inline-flex items-center gap-1 text-[#F4B400] font-bold underline decoration-[#F4B400]/50 underline-offset-2 ml-1">
                  <span>{activeNotice.link_text || 'Check Now'}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              )}
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300 shrink-0">
              Active Banner
            </span>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="grid grid-cols-1 gap-4">
        {notices.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white">No notices created yet</h4>
            <p className="text-xs text-slate-400 mt-1 mb-5 max-w-sm mx-auto">
              Create your first announcement or alert banner to show discount offers or important info to your visitors.
            </p>
            <Button
              onClick={handleOpenCreate}
              className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl text-xs"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Notice
            </Button>
          </div>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              className={cn(
                'bg-slate-900/80 border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all',
                notice.is_active
                  ? 'border-slate-700/80 shadow-md hover:border-amber-500/40'
                  : 'border-slate-800/60 opacity-65'
              )}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5',
                    notice.is_active
                      ? 'bg-amber-500/15 border-amber-500/30 text-[#F4B400]'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  )}
                >
                  <Bell className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm sm:text-base">{notice.title}</span>

                    {notice.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4B400]/20 text-[#F4B400] border border-[#F4B400]/30">
                        {notice.badge}
                      </span>
                    )}

                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-semibold uppercase',
                        notice.variant === 'primary' && 'bg-amber-500/20 text-amber-300',
                        notice.variant === 'warning' && 'bg-yellow-500/20 text-yellow-300',
                        notice.variant === 'info' && 'bg-blue-500/20 text-blue-300',
                        notice.variant === 'success' && 'bg-emerald-500/20 text-emerald-300',
                        notice.variant === 'destructive' && 'bg-red-500/20 text-red-300'
                      )}
                    >
                      {notice.variant}
                    </span>

                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1',
                        notice.is_active
                          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                          : 'bg-slate-800 text-slate-400'
                      )}
                    >
                      <span className={cn('w-1.5 h-1.5 rounded-full', notice.is_active ? 'bg-green-400' : 'bg-slate-500')} />
                      {notice.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{notice.message}</p>

                  {notice.link && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-slate-500">CTA:</span>
                      <span className="text-[#F4B400] font-medium">{notice.link_text || 'Link'}:</span>
                      <span className="truncate text-slate-400">{notice.link}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(notice)}
                  className={cn(
                    'rounded-xl text-xs h-9 px-3',
                    notice.is_active
                      ? 'border-green-500/40 text-green-400 hover:bg-green-500/10'
                      : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                  )}
                >
                  {notice.is_active ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-400" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      Inactive
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(notice)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-9 px-3"
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(notice.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-xs h-9 px-2.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg bg-[#0B1F3A] border-slate-800 text-slate-100 rounded-3xl p-5 sm:p-7">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#F4B400]" />
              {editingNotice?.id ? 'Edit Notice / Alert' : 'Create New Notice / Alert'}
            </DialogTitle>
          </DialogHeader>

          {editingNotice && (
            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Headline / Title *</label>
                <Input
                  value={editingNotice.title || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  placeholder="e.g. Flash Offer, Maintenance Notice, New Tools"
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Notice Message *</label>
                <Textarea
                  value={editingNotice.message || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, message: e.target.value })}
                  placeholder="e.g. Turnitin AI + Plagiarism reports delivered in 10 minutes on WhatsApp!"
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs min-h-[80px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Badge Label</label>
                  <Input
                    value={editingNotice.badge || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, badge: e.target.value })}
                    placeholder="e.g. 🔥 OFFER, 📢 NOTICE"
                    className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Color Theme</label>
                  <select
                    value={editingNotice.variant || 'primary'}
                    onChange={(e) => setEditingNotice({ ...editingNotice, variant: e.target.value as NoticeVariant })}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl h-9 px-3 text-xs focus:outline-none focus:border-[#F4B400]"
                  >
                    <option value="primary">Gold / Amber (Primary)</option>
                    <option value="success">Green (Success)</option>
                    <option value="info">Blue (Info)</option>
                    <option value="warning">Yellow (Warning)</option>
                    <option value="destructive">Red (Urgent / Alert)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CTA Button Text</label>
                  <Input
                    value={editingNotice.link_text || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, link_text: e.target.value })}
                    placeholder="e.g. Order Now →"
                    className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CTA URL Link</label>
                  <Input
                    value={editingNotice.link || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, link: e.target.value })}
                    placeholder="e.g. /products or https://wa.me/..."
                    className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingNotice.is_active ?? true}
                    onChange={(e) => setEditingNotice({ ...editingNotice, is_active: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-[#F4B400] focus:ring-[#F4B400]"
                  />
                  <span>Active immediately on website</span>
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
                    {saving ? 'Saving...' : editingNotice.id ? 'Save Changes' : 'Publish Notice'}
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
