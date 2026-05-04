import { getBlogBySlug } from '@/lib/karms-service';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const blog = await getBlogBySlug(params.slug);
    return {
      title: `${blog.title} - KARMS Blog`,
      description: blog.content.substring(0, 160),
    };
  } catch {
    return {
      title: 'Blog Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let blog;
  try {
    blog = await getBlogBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-dragon-pink hover:text-dragon-pink/80 font-semibold mb-8 inline-block"
        >
          ← Back to KARMS Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12 border-b-2 border-dragon-pink/30 pb-8">
          <h1 className="text-5xl font-bold text-forest-green mb-4">
            {blog.title}
          </h1>
          <div className="flex gap-4 text-forest-green/60 text-sm">
            <time dateTime={blog.created_at}>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {blog.updated_at !== blog.created_at && (
              <span>
                Updated: {new Date(blog.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-forest-green">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="whitespace-pre-wrap text-forest-green/90 leading-relaxed">
              {blog.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t-2 border-dragon-pink/30">
          <Link
            href="/blog"
            className="text-dragon-pink hover:text-dragon-pink/80 font-semibold"
          >
            ← Back to KARMS Blog
          </Link>
          <p className="mt-4 text-forest-green/60 text-sm">
            KARMS - Kissan Agro Reforms and Management Systems
          </p>
        </footer>
      </div>
    </article>
  );
}
