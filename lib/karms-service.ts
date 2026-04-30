import { createClient } from '@supabase/supabase-js';
import { BlogInput, CommunityInput, validateData, blogSchema, communitySchema } from './schemas';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==================== BLOGS ====================

export async function getPublishedBlogs() {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getBlogBySlug(slug: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllBlogs() {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createBlog(input: unknown) {
  if (!supabase) throw new Error('Supabase not configured');

  // Validate input with Zod
  const validation = validateData<BlogInput>(blogSchema, input);
  if (!validation.success) {
    throw new Error(JSON.stringify(validation.errors));
  }

  const { data, error } = await supabase
    .from('blogs')
    .insert([validation.data!])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlog(id: string, input: Partial<BlogInput>) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('blogs')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlog(id: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ==================== COMMUNITY ====================

export async function getCommunityMembers() {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('community')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addCommunityMember(input: unknown) {
  if (!supabase) throw new Error('Supabase not configured');

  // Validate input with Zod
  const validation = validateData<CommunityInput>(communitySchema, input);
  if (!validation.success) {
    throw new Error(JSON.stringify(validation.errors));
  }

  const { data, error } = await supabase
    .from('community')
    .insert([validation.data!])
    .select()
    .single();

  if (error) throw error;
  return data;
}
