import Link from 'next/link';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PopularArticles from '@/components/PopularArticles';
import NewsletterSignup from '@/components/NewsletterSignup';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { BookOpen, Zap, MessageCircle, Building2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      <main>
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-orange-100 border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-orange-600" strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Blog<br />
              <span className="text-orange-600">Detector de Golpes</span>
            </h1>
          </div>
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
            <div className="bg-white/20 border-2 border-white/50 p-3 inline-block mb-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
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
            <div className="bg-white/20 border-2 border-white/50 p-3 inline-block mb-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
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
            <div className="bg-white/20 border-2 border-white/50 p-3 inline-block mb-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              <Building2 className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
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
              {posts.map((post, idx) => {
                // Alternate gradient colors for visual variety
                const gradients = [
                  'from-orange-500 to-red-500',
                  'from-teal-500 to-cyan-500',
                  'from-pink-500 to-purple-500',
                  'from-lime-500 to-green-500',
                ];
                const gradient = gradients[idx % gradients.length];
                
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group relative overflow-hidden"
                  >
                    {/* Accent gradient bar */}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${gradient}`}></div>
                    
                    <div className="pl-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-2xl font-black group-hover:text-orange-600 transition-colors leading-tight">
                          {post.title}
                        </h3>
                        <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${gradient} border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all`}>
                          <BookOpen className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed font-medium">{post.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-orange-600 font-bold group-hover:underline flex items-center gap-2">
                          Ler artigo completo
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <span className="text-sm text-gray-500 font-semibold">
                          {new Date(post.publishedAt).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
      <Footer />
    </div>
  );
}
