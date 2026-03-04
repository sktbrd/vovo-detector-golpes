import Link from 'next/link';
import type { Metadata } from 'next';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const metadata: Metadata = {
  title: 'Últimos Golpes Detectados | Detector de Golpes',
  description: 'Veja os golpes mais recentes detectados no Brasil. Fique atualizado sobre fraudes, PIX, WhatsApp, bancos e muito mais.',
  keywords: ['últimos golpes', 'golpes recentes', 'novos golpes 2026', 'golpes brasil'],
};

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  keywords: string[];
}

function getLatestPosts(): Post[] {
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
        keywords: data.keywords || [],
      };
    })
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 20); // Only show last 20

  return posts;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function getDaysAgo(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default function UltimosGolpesPage() {
  const posts = getLatestPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            🚨 Últimos Golpes<br />
            <span className="text-red-600">Detectados</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
            Fique por dentro dos golpes mais recentes no Brasil. Atualizado diariamente.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all">
            Todos
          </button>
          <button className="bg-white border-2 border-black px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all">
            PIX
          </button>
          <button className="bg-white border-2 border-black px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all">
            WhatsApp
          </button>
          <button className="bg-white border-2 border-black px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all">
            Bancos
          </button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => {
            const daysAgo = getDaysAgo(post.publishedAt);
            const isNew = daysAgo <= 3;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isNew && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          NOVO
                        </span>
                      )}
                      <span className="text-sm text-gray-600">
                        {formatDate(post.publishedAt)}
                      </span>
                      {daysAgo <= 1 && (
                        <span className="text-sm text-orange-600 font-bold">
                          Há {daysAgo === 0 ? 'hoje' : daysAgo === 1 ? '1 dia' : `${daysAgo} dias`}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black mb-2 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-3">
                      {post.description}
                    </p>
                    {post.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.keywords.slice(0, 3).map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-3xl group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-red-500 to-orange-500 text-white p-12 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black mb-4">Não Seja a Próxima Vítima</h2>
          <p className="text-xl mb-8">
            Use nossa ferramenta de IA para analisar mensagens suspeitas
          </p>
          <Link
            href="/"
            className="bg-white text-red-600 px-12 py-4 rounded-lg font-bold text-xl inline-block hover:scale-105 transition-all shadow-lg"
          >
            Analisar Mensagem Agora →
          </Link>
        </div>
      </div>
    </main>
  );
}
