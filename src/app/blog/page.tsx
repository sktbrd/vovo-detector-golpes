import Link from 'next/link';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PopularArticles from '@/components/PopularArticles';
import NewsletterSignup from '@/components/NewsletterSignup';

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
}

function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = readdirSync(postsDirectory);

  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace('.md', ''),
        title: data.title || '',
        description: data.description || '',
        publishedAt: data.publishedAt || new Date().toISOString(),
      };
    })
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  return posts;
}

export const metadata = {
  title: 'Blog - Detector de Golpes | Aprenda a Se Proteger',
  description: 'Artigos completos sobre golpes do PIX, WhatsApp, bancos e muito mais. Aprenda a identificar e evitar fraudes.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            📚 Blog<br />
            <span className="text-orange-600">Detector de Golpes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Aprenda tudo sobre golpes digitais. Guias completos, atualizados e 100% gratuitos.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Link
            href="/golpes-pix"
            className="bg-orange-500 text-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
          >
            <div className="text-4xl mb-4">🔥</div>
            <h2 className="text-2xl font-black mb-2">Golpes do PIX</h2>
            <p className="text-orange-100 mb-4">7 artigos completos sobre fraudes no PIX</p>
            <span className="text-white font-bold group-hover:underline">
              Ver artigos →
            </span>
          </Link>

          <Link
            href="/golpes-whatsapp"
            className="bg-green-500 text-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
          >
            <div className="text-4xl mb-4">📱</div>
            <h2 className="text-2xl font-black mb-2">Golpes do WhatsApp</h2>
            <p className="text-green-100 mb-4">7 artigos sobre fraudes no WhatsApp</p>
            <span className="text-white font-bold group-hover:underline">
              Ver artigos →
            </span>
          </Link>

          <Link
            href="/golpes-bancos"
            className="bg-blue-500 text-white p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
          >
            <div className="text-4xl mb-4">🏦</div>
            <h2 className="text-2xl font-black mb-2">Golpes Bancários</h2>
            <p className="text-blue-100 mb-4">4 artigos sobre fraudes bancárias</p>
            <span className="text-white font-bold group-hover:underline">
              Ver artigos →
            </span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-black mb-8">Todos os Artigos</h2>
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
                >
                  <h3 className="text-2xl font-black mb-2 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  <span className="text-orange-600 font-bold group-hover:underline">
                    Ler mais →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Articles */}
            <PopularArticles />

            {/* Newsletter */}
            <div className="sticky top-8">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
