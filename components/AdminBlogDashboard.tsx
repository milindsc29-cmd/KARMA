'use client';

import { useState, useEffect } from 'react';
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '@/lib/karms-service';
import { blogSchema, type BlogInput } from '@/lib/schemas';
import { z } from 'zod';

interface Blog extends BlogInput {
  id: string;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const formData = new FormData(e.currentTarget);
    const input = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      content: formData.get('content'),
      published: formData.get('published') === 'on',
    };

    // Validate with Zod
    try {
      blogSchema.parse(input);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, err) => {
          acc[err.path.join('.')] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(newErrors);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateBlog(editingId, input as Partial<BlogInput>);
        setSuccessMessage('Blog updated successfully!');
        setEditingId(null);
      } else {
        await createBlog(input);
        setSuccessMessage('Blog created successfully!');
      }

      (e.target as HTMLFormElement).reset();
      await loadBlogs();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save blog';
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      (form.elements.namedItem('title') as HTMLInputElement).value = blog.title;
      (form.elements.namedItem('slug') as HTMLInputElement).value = blog.slug;
      (form.elements.namedItem('content') as HTMLTextAreaElement).value = blog.content;
      (form.elements.namedItem('published') as HTMLInputElement).checked = blog.published;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await deleteBlog(id);
      setSuccessMessage('Blog deleted successfully!');
      await loadBlogs();
    } catch (error) {
      setErrors({ submit: `Failed to delete blog: ${error}` });
    }
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-forest-green mb-2">
          KARMS Admin Dashboard
        </h1>
        <p className="text-forest-green/70 mb-8">
          Manage KARMS Blog - Kissan Agro Reforms and Management Systems
        </p>

        {/* Create/Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-dragon-pink">
          <h2 className="text-2xl font-bold text-forest-green mb-6">
            {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-forest-green mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Blog post title"
                className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none"
                required
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-forest-green mb-2">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                placeholder="blog-post-slug"
                className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none"
                required
                disabled={isSubmitting}
              />
              {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-forest-green mb-2">
                Content (Markdown) *
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content here..."
                rows={10}
                className="w-full px-4 py-3 border-2 border-forest-green/20 rounded-lg focus:border-dragon-pink focus:outline-none resize-vertical font-mono"
                required
                disabled={isSubmitting}
              />
              {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                name="published"
                className="w-4 h-4 accent-dragon-pink"
                disabled={isSubmitting}
              />
              <label htmlFor="published" className="text-sm font-semibold text-forest-green">
                Publish this post
              </label>
            </div>

            {/* Errors */}
            {errors.submit && (
              <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded">
                <p className="text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Success */}
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded">
                <p className="text-green-600">{successMessage}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-dragon-pink hover:bg-dragon-pink/90 disabled:bg-dragon-pink/50 text-white font-bold py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    (document.querySelector('form') as HTMLFormElement)?.reset();
                  }}
                  className="px-6 bg-forest-green/20 hover:bg-forest-green/30 text-forest-green font-bold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-dragon-pink">
          <h2 className="text-2xl font-bold text-forest-green mb-6">Published Blogs</h2>

          {isLoading ? (
            <p className="text-forest-green/60">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-forest-green/60">No blogs yet. Create your first post!</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="border-2 border-forest-green/10 rounded-lg p-4 hover:border-dragon-pink/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-forest-green">{blog.title}</h3>
                      <p className="text-sm text-forest-green/60">/{blog.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${
                        blog.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <p className="text-forest-green/70 text-sm mb-4 line-clamp-2">
                    {blog.content}
                  </p>
                  <div className="flex gap-2 text-xs text-forest-green/50">
                    <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1 bg-dragon-pink text-white rounded text-sm font-semibold hover:bg-dragon-pink/90"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
