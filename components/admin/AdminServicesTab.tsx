'use client';

import { useState, useEffect } from 'react';
import {
  Layers,
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
import { ServiceItem } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AdminServicesTab() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services?all=true');
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      }
    } catch (err: any) {
      toast.error('Failed to load services: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenCreate = () => {
    setEditingService({
      title: '',
      description: '',
      items: '',
      cta_text: 'Inquire About Service',
      cta_type: 'whatsapp',
      is_active: true,
      sort_order: services.length,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (service: any) => {
    const itemsText = Array.isArray(service.items) ? service.items.join('\n') : service.items || '';
    setEditingService({
      ...service,
      items: itemsText,
    });
    setModalOpen(true);
  };

  const handleToggleActive = async (service: any) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !service.is_active }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(service.is_active ? 'Service deactivated' : 'Service activated');
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, is_active: !s.is_active } : s))
        );
      } else {
        toast.error(data.error || 'Failed to update service');
      }
    } catch {
      toast.error('Failed to update service');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Service deleted');
        setServices((prev) => prev.filter((s) => s.id !== id));
      } else {
        toast.error(data.error || 'Failed to delete service');
      }
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.description) {
      toast.error('Title and description are required');
      return;
    }

    setSaving(true);
    try {
      const isEdit = Boolean(
        editingService.id &&
          editingService.id !== 'academic-writing' &&
          editingService.id !== 'development' &&
          editingService.id !== 'custom-requirement'
      );
      const url = isEdit ? `/api/services/${editingService.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const itemsArray = typeof editingService.items === 'string'
        ? editingService.items.split('\n').filter((l: string) => l.trim().length > 0)
        : editingService.items || [];

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingService,
          items: itemsArray,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEdit ? 'Service updated!' : 'Service added to MongoDB!');
        setModalOpen(false);
        loadServices();
      } else {
        toast.error(data.error || 'Failed to save service');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 sm:p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
            <Layers className="w-3.5 h-3.5" />
            MongoDB Professional Services
          </div>
          <h3 className="text-xl font-black text-white">Academic & Development Services</h3>
          <p className="text-xs text-slate-400 mt-1">
            Offerings shown in the &apos;Professional Services&apos; section. Stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={loadServices}
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
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={service.id || index}
            className={cn(
              'bg-slate-900/80 border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all',
              service.is_active ? 'border-slate-800 shadow-md' : 'border-slate-800/60 opacity-60'
            )}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{service.title}</h4>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold',
                    service.is_active ? 'bg-green-500/15 text-green-400' : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {service.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{service.description}</p>

              {Array.isArray(service.items) && service.items.length > 0 && (
                <ul className="space-y-1 pt-2 border-t border-slate-800">
                  {service.items.map((item: string, i: number) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="text-[#F4B400]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-500">CTA: {service.cta_text || service.ctaText || 'Inquire'}</span>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleActive(service)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-7 px-2"
                >
                  {service.is_active ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(service)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl text-xs h-7 px-2"
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-xs h-7 px-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg bg-[#0B1F3A] border-slate-800 text-slate-100 rounded-3xl p-5 sm:p-7">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#F4B400]" />
              {editingService?.id ? 'Edit Service' : 'Add Service'}
            </DialogTitle>
          </DialogHeader>

          {editingService && (
            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Service Title *</label>
                <Input
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Academic Writing Services"
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description *</label>
                <Textarea
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="e.g. Professional assistance for all your academic writing needs..."
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs min-h-[70px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Features / Offering Items (One per line)
                </label>
                <Textarea
                  value={editingService.items || ''}
                  onChange={(e) => setEditingService({ ...editingService, items: e.target.value })}
                  placeholder={'Thesis Writing - Complete thesis from scratch\nPPT Creation - Professional presentations\nPlagiarism Removal - 100% original'}
                  className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs min-h-[100px] font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CTA Button Text</label>
                  <Input
                    value={editingService.cta_text || editingService.ctaText || ''}
                    onChange={(e) => setEditingService({ ...editingService, cta_text: e.target.value, ctaText: e.target.value })}
                    placeholder="Inquire on WhatsApp"
                    className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CTA Type</label>
                  <Input
                    value={editingService.cta_type || editingService.ctaType || 'whatsapp'}
                    onChange={(e) => setEditingService({ ...editingService, cta_type: e.target.value, ctaType: e.target.value })}
                    placeholder="whatsapp"
                    className="bg-slate-900 border-slate-800 text-white rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingService.is_active ?? true}
                    onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
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
                    {saving ? 'Saving...' : 'Save Service'}
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
