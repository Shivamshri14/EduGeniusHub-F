'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAMES = ['Anjali', 'Vikram', 'Amit', 'Rahul', 'Priya', 'Sneha', 'Rohan', 'Karan', 'Nisha', 'Neha', 'Deepak', 'Sandeep', 'Ravi', 'Divya', 'Aarav', 'Ishaan', 'Aditya'];
const CITIES = ['Delhi', 'Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Noida', 'Gurugram'];
const PRODUCTS = [
  { name: 'Turnitin Plagiarism Report', icon: '📑' },
  { name: 'Turnitin AI Report', icon: '📑' },
  { name: 'Turnitin Combo Report', icon: '📑' },
  { name: 'ChatGPT Plus Access', icon: '🤖' },
  { name: 'QuillBot Premium', icon: '🎓' },
  { name: 'Grammarly Premium', icon: '🎓' },
  { name: 'Netflix Premium Profile', icon: '🎬' },
  { name: 'Amazon Prime Video', icon: '🎬' },
];

export default function LiveActivityNotification() {
  const [notification, setNotification] = useState<{ name: string; city: string; product: string; icon: string; time: string } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const triggerNotification = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const prod = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const time = `${Math.floor(Math.random() * 15) + 1} mins ago`;

      setNotification({
        name,
        city,
        product: prod.name,
        icon: prod.icon,
        time,
      });
      setVisible(true);

      // Hide after 6 seconds
      setTimeout(() => {
        setVisible(false);
      }, 6000);
    };

    // Initial delay before first toast
    const initialDelay = setTimeout(triggerNotification, 8000);

    // Loop interval: runs every 50 seconds
    const interval = setInterval(triggerNotification, 50000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!notification) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-6 z-50 max-w-sm w-[90vw] sm:w-[320px] transition-all duration-500 ease-out transform',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      )}
    >
      <div className="bg-[#0B1F3A]/95 border border-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-start gap-3 text-white">
        <div className="w-9 h-9 rounded-xl bg-[#F4B400]/10 border border-[#F4B400]/20 flex items-center justify-center text-[#F4B400] shrink-0 mt-0.5 animate-pulse">
          <ShoppingCart className="w-4.5 h-4.5" />
        </div>
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-bold text-sm truncate">{notification.name}</span>
            <span className="text-[10px] text-gray-400">from {notification.city}</span>
          </div>
          <p className="text-xs text-gray-300 leading-tight">
            Purchased **{notification.product}** {notification.icon}
          </p>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-medium">
            <CheckCircle className="w-3 h-3 fill-current" />
            <span>Verified Purchase · {notification.time}</span>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-white p-0.5 rounded-lg transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
