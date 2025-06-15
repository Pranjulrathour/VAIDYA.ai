
import { createClient } from '@supabase/supabase-js';
import { ENV_CONFIG } from '@/config/env';

// Create Supabase client
export const supabase = createClient(
  ENV_CONFIG.SUPABASE_URL,
  ENV_CONFIG.SUPABASE_ANON_KEY
);

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
