import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface EarlyUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  location?: string;
  interest_level: 'high' | 'medium' | 'low';
  preferred_platform: 'ios' | 'android' | 'both';
  pain_points?: string[];
  how_heard?: string;
  marketing_consent: boolean;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'contacted' | 'converted';
}

export interface EarlyUserInsert {
  email: string;
  name: string;
  phone?: string;
  location?: string;
  interest_level?: 'high' | 'medium' | 'low';
  preferred_platform?: 'ios' | 'android' | 'both';
  pain_points?: string[];
  how_heard?: string;
  marketing_consent?: boolean;
}