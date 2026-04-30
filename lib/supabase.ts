import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase client only if credentials are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Function to add a subscriber to the waitlist
export async function addToWaitlist(email: string, name: string) {
  if (!supabase) {
    return { 
      success: false, 
      error: 'Supabase is not configured. Please set environment variables.' 
    };
  }

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, name, created_at: new Date().toISOString() }]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error };
  }
}
