'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Order = {
  id: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  paid: 'bg-green-500/10 text-green-600',
  delivered: 'bg-blue-500/10 text-blue-500',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) {
      setOrders(data);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const month = new Date(); month.setDate(1); month.setHours(0, 0, 0, 0);
      const paidOrders = data.filter((o: Order) => o.status === 'paid' || o.status === 'delivered');
      setTodayRevenue(paidOrders.filter((o: Order) => new Date(o.created_at) >= today).reduce((s: number, o: Order) => s + o.amount, 0));
      setMonthRevenue(paidOrders.filter((o: Order) => new Date(o.created_at) >= month).reduce((s: number, o: Order) => s + o.amount, 0));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">Orders</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{orders.length} total orders</p>
        </div>
        <Button variant="outline" size="icon" onClick={load} className="rounded-xl">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-xs text-muted-foreground mb-1">Today&apos;s Revenue</div>
          <div className="text-2xl font-black text-green-600 dark:text-green-400">₹{todayRevenue}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-xs text-muted-foreground mb-1">Monthly Revenue</div>
          <div className="text-2xl font-black text-blue-500">₹{monthRevenue}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No orders yet. Orders will appear here when leads are converted.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{order.product_name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <span className="font-bold text-sm">₹{order.amount}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status] ?? ''}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
