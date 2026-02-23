import Link from "next/link";
import { Metadata } from "next";
import { Shield, Search, BookOpen, Calendar, Clock, ChevronRight, Heart } from "lucide-react";
import Navbar from "../components/Navbar";

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
    title: "Top 7 Golpes do Pix em 2026",
    description:
      "Conheça os 7 golpes mais comuns envolvendo Pix e aprenda a se proteger. Dados atualizados de 2026 com estatísticas reais.",
    date: "12 de fevereiro de 2026",
    readTime: "8 min",
    category: "PIX",
    color: "teal",
  },
  {
    slug: "novo-golpe-whatsapp-web",
    title: "Novo Golpe do WhatsApp Web em 2026",
    description:
      "Entenda como funciona o novo golpe que usa WhatsApp Web para roubar dados bancários e como se proteger.",
    date: "12 de fevereiro de 2026",
    readTime: "10 min",
    category: "WHATSAPP",
    color: "pink",
  },
  {
    slug: "como-identificar-mensagem-falsa",
    title: "Identificar Mensagem Falsa em 10 Segundos",
    description:
      "Aprenda os sinais claros que denunciam golpes e mensagens falsas. Guia rápido e prático da Vovó.",
    date: "12 de fevereiro de 2026",
    readTime: "12 min",
    category: "GUIA",
    color: "lime",
  },
];

const getCategoryBg = (color: string) => {
  switch (color) {
    case "teal": return "bg-teal-500";
    case "pink": return "bg-pink-500";
    case "lime": return "bg-lime-500";
    default: return "bg-slate-900";
  }
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero - NEO-BRUTAL */}
      <div className="bg-gradient-to-br from-teal-500 to-pink-500 border-b-4 border-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="w-20 h-20 text-slate-900" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 uppercase text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            BLOG DA VOVÓ
          </h1>
          <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            Aprenda a se proteger de golpes 🛡️
          </p>
        </div>
      </div>

      {/* Posts Grid - NEO-BRUTAL */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border-4 border-slate-900 p-6 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100"
            >
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <span className={`px-4 py-2 ${getCategoryBg(post.color)} text-white text-sm font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase`}>
                  {post.category}
                </span>
                <span className="text-sm text-slate-700 flex items-center gap-1 font-bold">
                  <Clock className="w-4 h-4" strokeWidth={3} />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 uppercase leading-tight">
                {post.title}
              </h2>
              <p className="text-slate-700 text-lg font-medium mb-4 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-sm text-slate-700 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" strokeWidth={3} />
                  {post.date}
                </span>
                <span className="flex items-center gap-2 uppercase">
                  LER MAIS
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Box - NEO-BRUTAL */}
        <div className="mt-12 bg-gradient-to-br from-teal-500 to-pink-500 border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-center mb-6">
            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Search className="w-16 h-16 text-slate-900" strokeWidth={2.5} />
            </div>
          </div>
          <h3 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
            MENSAGEM SUSPEITA?
          </h3>
          <p className="text-2xl text-white font-bold mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            Use o detector e descubra em segundos!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all uppercase"
          >
            VERIFICAR AGORA
            <ChevronRight className="w-6 h-6" strokeWidth={3} />
          </Link>
        </div>
      </main>

      {/* Footer - NEO-BRUTAL */}
      <footer className="text-center py-8 px-4 text-slate-700 text-sm border-t-4 border-slate-900 mt-12 bg-white">
        <p className="mb-4 flex items-center justify-center gap-2 font-bold text-base">
          Feito com <Heart className="w-5 h-5 fill-pink-500 text-pink-500" /> para proteger você
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/privacy" className="hover:text-teal-500 font-bold uppercase">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-teal-500 font-bold uppercase">
            Termos
          </Link>
          <Link href="/" className="hover:text-teal-500 font-bold uppercase">
            Detector
          </Link>
        </div>
      </footer>
    </div>
  );
}
