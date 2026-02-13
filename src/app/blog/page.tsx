import Link from "next/link";
import { Metadata } from "next";

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
            <span className="text-2xl">👵</span>
            <span className="font-bold">Vovó Detector</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            🔍 Verificar Mensagem
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-purple-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/vovo-alerta.png" 
              alt="Vovó Alerta" 
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📚 Blog da Vovó
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
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2 group-hover:text-purple-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>📅 {post.date}</span>
                <span className="text-purple-600 font-medium group-hover:underline">
                  Ler mais →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-3">
            Recebeu uma mensagem suspeita?
          </h3>
          <p className="text-purple-100 mb-6">
            Use o detector da Vovó e descubra se é golpe em segundos!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
          >
            Verificar Agora
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <p className="mb-2">Feito com 💜 para proteger você</p>
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
