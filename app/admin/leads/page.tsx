'use client';

import { useEffect, useState } from 'react';
import { supabase, type Lead } from '@/lib/supabase';
import { MessageCircle, Copy, Search, RefreshCw, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const statuses = ['new', 'pending', 'paid', 'delivered', 'closed'] as const;

const statusConfig = {
  new: { label: 'New', className: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' },
  pending: { label: 'Pending', className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  paid: { label: 'Paid', className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  delivered: { label: 'Delivered', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  closed: { label: 'Closed', className: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Lead['status']) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    toast.success('Status updated');
  };

  const saveNotes = async (id: string) => {
    const notes = editingNotes[id] ?? '';
    await supabase.from('leads').update({ admin_notes: notes }).eq('id', id);
    toast.success('Notes saved');
  };

  const copyDeliveryMessage = (lead: Lead) => {
    const msg = `Hi ${lead.name} 👋\n\nYour order for *${lead.product_name}* is ready!\n\nThank you for choosing EduGenius Hub.\n\nFor any support, reply to this message.\n\n— EduGenius Hub Team`;
    navigator.clipboard.writeText(msg);
    toast.success('Delivery message copied!');
  };

  const openWhatsApp = (lead: Lead) => {
    const msg = `Hi ${lead.name} 👋\n\nFollowing up on your request for *${lead.product_name}*.\n\nHow can I help you?`;
    window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filtered = leads.filter((l) => {
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) || l.product_name?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Leads</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{leads.length} total leads</p>
        </div>
        <Button variant="outline" size="icon" onClick={load} className="rounded-xl">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-3 mb-5 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40 rounded-xl">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((s) => <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No leads found</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((lead) => {
              const isExpanded = expandedId === lead.id;
              return (
                <div key={lead.id}>
                  <div
                    className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{lead.name}</span>
                        <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold', statusConfig[lead.status]?.className)}>
                          {statusConfig[lead.status]?.label}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {lead.product_name ?? 'No product'} · {lead.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                      <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', isExpanded && 'rotate-180')} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 bg-muted/20 border-t border-border">
                      <div className="grid sm:grid-cols-2 gap-4 pt-4 mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Phone</div>
                          <div className="text-sm font-medium">{lead.phone}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Email</div>
                          <div className="text-sm">{lead.email ?? 'Not provided'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Duration</div>
                          <div className="text-sm">{lead.duration ?? 'Not specified'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Notes from customer</div>
                          <div className="text-sm">{lead.notes ?? 'None'}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1.5">Update Status</div>
                        <div className="flex gap-2 flex-wrap">
                          {statuses.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(lead.id, s)}
                              className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                                lead.status === s ? statusConfig[s].className : 'border-border text-muted-foreground hover:border-foreground/30'
                              )}
                            >
                              {statusConfig[s].label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-1.5">Admin Notes</div>
                        <textarea
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-foreground/30 resize-none"
                          rows={2}
                          placeholder="Add internal notes..."
                          value={editingNotes[lead.id] ?? lead.admin_notes ?? ''}
                          onChange={(e) => setEditingNotes({ ...editingNotes, [lead.id]: e.target.value })}
                        />
                        <Button size="sm" variant="outline" className="mt-2 rounded-lg text-xs" onClick={() => saveNotes(lead.id)}>
                          Save Notes
                        </Button>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          className="rounded-lg gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs"
                          onClick={() => openWhatsApp(lead)}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </Button>
                        {(lead.status === 'paid' || lead.status === 'delivered') && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-lg gap-2 text-xs"
                            onClick={() => copyDeliveryMessage(lead)}
                          >
                            <Copy className="w-3.5 h-3.5" />
                            Copy Delivery Msg
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
