import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'undefined' || supabaseUrl.includes('your-project')) {
  console.error('Invalid Supabase URL:', supabaseUrl);
  throw new Error('VITE_SUPABASE_URL is not properly configured. Please check your environment variables.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'undefined' || supabaseAnonKey.includes('your-supabase')) {
  console.error('Invalid Supabase anonymous key');
  throw new Error('VITE_SUPABASE_ANON_KEY is not properly configured. Please check your environment variables.');
}

// Create Supabase client with error handling
let supabase: ReturnType<typeof createClient>;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  throw new Error('Failed to initialize Supabase client. Please check your configuration.');
}

export { supabase };

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
