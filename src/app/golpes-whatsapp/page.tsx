import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  AlertTriangle, 
  BookOpen, 
  HelpCircle, 
  Smartphone, 
  Users, 
  Building2, 
  Search, 
  RotateCcw, 
  Link as LinkIcon, 
  Monitor 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Golpes do WhatsApp: Guia Completo 2026 | Detector de Golpes',
  description: 'Descubra os golpes mais comuns do WhatsApp em 2026. Aprenda a identificar, evitar e se proteger de fraudes no WhatsApp. Guia completo e atualizado.',
  keywords: ['golpes whatsapp', 'whatsapp clonado', 'golpe whatsapp 2026', 'golpe whatsapp parente', 'recuperar whatsapp'],
};

const whatsappArticles = [
  {
    slug: 'golpe-do-whatsapp-clonado',
    title: 'Golpe do WhatsApp Clonado',
    description: 'Como identificar e recuperar conta clonada',
    Icon: Smartphone,
  },
  {
    slug: 'golpe-whatsapp-fingindo-ser-parente',
    title: 'Golpe Fingindo ser Parente',
    description: 'O golpe mais comum no Brasil',
    Icon: Users,
  },
  {
    slug: 'golpe-whatsapp-se-passando-por-empresa',
    title: 'Golpe se Passando por Empresa',
    description: 'Golpes corporativos e como evitar',
    Icon: Building2,
  },
  {
    slug: 'como-saber-se-whatsapp-foi-clonado',
    title: 'Como Saber se Foi Clonado',
    description: '5 sinais de que sua conta foi invadida',
    Icon: Search,
  },
  {
    slug: 'recuperar-whatsapp-clonado',
    title: 'Recuperar WhatsApp Clonado',
    description: 'Passo a passo para recuperar sua conta',
    Icon: RotateCcw,
  },
  {
    slug: 'golpe-whatsapp-com-link',
    title: 'Golpe com Link Falso',
    description: 'Links maliciosos e como identificar',
    Icon: LinkIcon,
  },
  {
    slug: 'novo-golpe-whatsapp-web',
    title: 'Novo Golpe WhatsApp Web',
    description: 'Golpe do QR Code e WhatsApp Web',
    Icon: Monitor,
  },
];

export default function GolpesWhatsAppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <AlertTriangle className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Golpes do WhatsApp<br />
            <span className="text-green-600">Guia Completo 2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Aprenda a identificar, evitar e se proteger dos golpes mais comuns do WhatsApp.
            Guia completo, atualizado e 100% gratuito.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog/golpe-do-whatsapp-clonado"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-lg"
            >
              Ver Golpe #1 →
            </Link>
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
            >
              Analisar Mensagem
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-green-600 mb-2">73%</div>
            <div className="text-gray-600">Dos brasileiros já receberam golpe no WhatsApp</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-green-600 mb-2">2 bilhões</div>
            <div className="text-gray-600">Usuários de WhatsApp no mundo</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-green-600 mb-2">Top 1</div>
            <div className="text-gray-600">Golpe: parente pedindo dinheiro</div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-white p-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-8 h-8 text-green-600" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-black text-center">Artigos sobre Golpes do WhatsApp</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {whatsappArticles.map((article) => {
            const IconComponent = article.Icon;
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
              >
                <div className="bg-green-50 w-16 h-16 flex items-center justify-center border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4">
                  <IconComponent className="w-8 h-8 text-green-600" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <span className="text-green-600 font-bold group-hover:underline">
                  Ler mais →
                </span>
              </Link>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="bg-green-50 border-4 border-black p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white p-2 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <HelpCircle className="w-8 h-8 text-green-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                Como saber se meu WhatsApp foi clonado?
              </summary>
              <p className="mt-2 text-gray-700">
                Sinais: mensagens lidas que você não abriu, contatos recebem mensagens suas pedindo dinheiro,
                sessões ativas em outros dispositivos, desconexões repentinas.
              </p>
            </details>
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                O que fazer se meu WhatsApp foi clonado?
              </summary>
              <p className="mt-2 text-gray-700">
                (1) Avise TODOS seus contatos imediatamente, (2) desconecte todas as sessões,
                (3) ative verificação em duas etapas, (4) registre BO.
              </p>
            </details>
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                Como proteger WhatsApp contra golpes?
              </summary>
              <p className="mt-2 text-gray-700">
                Ative verificação em duas etapas, nunca compartilhe código de 6 dígitos,
                verifique aparelhos conectados, desconfie de pedidos urgentes de dinheiro.
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white p-12 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black mb-4">Recebeu Mensagem Suspeita no WhatsApp?</h2>
          <p className="text-xl mb-8">
            Use nossa ferramenta gratuita de IA para analisar em segundos
          </p>
          <Link
            href="/"
            className="bg-white text-green-600 px-12 py-4 rounded-lg font-bold text-xl inline-block hover:scale-105 transition-all shadow-lg"
          >
            Analisar Agora (Grátis) →
          </Link>
        </div>
      </div>
    </main>
  );
}
