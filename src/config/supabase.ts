import { createClient } from '@supabase/supabase-js';
// Safely access environment variables with fallbacks
const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY || '';
// Create a placeholder client if credentials aren't configured
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : createClient('https://placeholder.supabase.co', 'placeholder-key');
// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '' && supabaseUrl !== 'https://placeholder.supabase.co';
};