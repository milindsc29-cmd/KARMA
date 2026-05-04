'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPublishedBlogs } from '@/lib/karms-service';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  created_at: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getPublishedBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-forest-green text-lg">Loading KARMS Blog...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-forest-green mb-4">
            KARMS Blog
          </h1>
          <p className="text-xl text-forest-green/80">
            Kissan Agro Reforms and Management Systems insights and updates
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-forest-green/60 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="block group"
              >
                <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-dragon-pink">
                  <h2 className="text-2xl font-bold text-forest-green group-hover:text-dragon-pink transition-colors mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-forest-green/60 text-sm mb-4">
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-forest-green/80 line-clamp-2">
                    {blog.content.substring(0, 200)}...
                  </p>
                  <div className="mt-4 inline-block">
                    <span className="text-dragon-pink font-semibold group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
