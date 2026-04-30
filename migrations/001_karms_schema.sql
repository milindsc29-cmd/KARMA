-- KARMS Infrastructure Database Schema
-- Kissan Agro Reforms and Management Systems

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blogs table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create community table
CREATE TABLE community (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE community ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blogs table
-- Allow public to read published blogs
CREATE POLICY "Allow public read published blogs" ON blogs
  FOR SELECT USING (published = true);

-- Allow authenticated users (admins) to manage all blogs
CREATE POLICY "Allow authenticated users to create blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for community table
-- Allow public to read community members
CREATE POLICY "Allow public read community" ON community
  FOR SELECT USING (true);

-- Allow anyone to create community entries
CREATE POLICY "Allow anyone to create community entries" ON community
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX idx_community_created_at ON community(created_at DESC);
