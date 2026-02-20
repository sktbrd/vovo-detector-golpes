import Link from "next/link";
import { Metadata } from "next";
import { Shield, Search, BookOpen, Calendar, Clock, ChevronRight, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Dicas e Notícias sobre Golpes | Vovó Detector",
  description:
    "Aprenda a se proteger de golpes com guias completos, estatísticas reais e dicas práticas da Vovó. Atualizado em 2026.",
  keywords: [
    "blog golpes",
    "notícias golpes brasil",
    "como evitar golpe",
    "dicas segurança digital",
  ],
};

const posts = [
  {
    slug: "top-7-golpes-pix-2026",
    title: "Top 7 Golpes do Pix em 2026: Como Se Proteger",
    description:
      "Conheça os 7 golpes mais comuns envolvendo Pix e aprenda a se proteger. Dados atualizados de 2026 com estatísticas reais.",
    date: "12 de fevereiro de 2026",
    readTime: "8 min",
    category: "Pix",
  },
  {
    slug: "novo-golpe-whatsapp-web",
    title: "Novo Golpe do WhatsApp Web em 2026: Milhares de Vítimas",
    description:
      "Entenda como funciona o novo golpe que usa WhatsApp Web para roubar dados bancários e como se proteger.",
    date: "12 de fevereiro de 2026",
    readTime: "10 min",
    category: "WhatsApp",
  },
  {
    slug: "como-identificar-mensagem-falsa",
    title: "Como Identificar Mensagem Falsa em 10 Segundos",
    description:
      "Aprenda os sinais claros que denunciam golpes e mensagens falsas. Guia rápido e prático da Vovó.",
    date: "12 de fevereiro de 2026",
    readTime: "12 min",
    category: "Guia",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-800 hover:text-purple-600"
          >
            <Shield className="w-7 h-7" strokeWidth={2} />
            <span className="font-bold">Vovó Detector</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Verificar Mensagem
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-purple-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <BookOpen className="w-32 h-32 text-white" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10" />
            Blog da Vovó
          </h1>
          <p className="text-xl text-purple-100">
            Aprenda a se proteger de golpes com guias completos e dados reais
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-purple-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2 group-hover:text-purple-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="text-purple-600 font-medium group-hover:underline flex items-center gap-1">
                  Ler mais
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <Search className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Recebeu uma mensagem suspeita?
          </h3>
          <p className="text-purple-100 mb-6">
            Use o detector da Vovó e descubra se é golpe em segundos!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
          >
            Verificar Agora
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <p className="mb-2 flex items-center justify-center gap-2">
          Feito com <Heart className="w-4 h-4 fill-purple-600" /> para proteger você
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-purple-800 underline">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-purple-800 underline">
            Termos
          </Link>
          <Link href="/" className="hover:text-purple-800 underline">
            Detector
          </Link>
        </div>
      </footer>
    </div>
  );
}
