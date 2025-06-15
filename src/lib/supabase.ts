import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anonymous key are required.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table types (you can expand these as needed)
export interface HealthLog {
  id: string;
  user_id: string;
  type: string;
  value: string;
  notes?: string;
  timestamp: string;
  ai_processed: boolean;
}

export interface ScheduleItem {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  completed: boolean;
  date: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  timestamp: string;
  context?: string;
}
