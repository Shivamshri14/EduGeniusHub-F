import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export type Database = {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string;
          name: string;
          tagline: string;
          description: string;
          official_url: string;
          image: string;
          market_price: number;
          our_price: number;
          category: 'report' | 'account' | 'ott';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          tagline: string;
          description: string;
          official_url: string;
          image: string;
          market_price: number;
          our_price: number;
          category: 'report' | 'account' | 'ott';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string;
          description?: string;
          official_url?: string;
          image?: string;
          market_price?: number;
          our_price?: number;
          category?: 'report' | 'account' | 'ott';
          updated_at?: string;
        };
      };
      combos: {
        Row: {
          id: string;
          name: string;
          tagline: string;
          description: string;
          tools: string[];
          image: string;
          market_price: number;
          our_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          tagline: string;
          description: string;
          tools: string[];
          image: string;
          market_price: number;
          our_price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          tagline?: string;
          description?: string;
          tools?: string[];
          image?: string;
          market_price?: number;
          our_price?: number;
          updated_at?: string;
        };
      };
    };
  };
};
