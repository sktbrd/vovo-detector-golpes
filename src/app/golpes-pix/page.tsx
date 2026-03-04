import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golpes do PIX: Guia Completo 2026 | Detector de Golpes',
  description: 'Descubra os 7 golpes mais comuns do PIX em 2026. Aprenda a identificar, evitar e se proteger de fraudes no PIX. Guia completo e atualizado.',
  keywords: ['golpes pix', 'golpe pix 2026', 'fraude pix', 'golpe pix nubank', 'golpe pix itaú', 'golpe pix banco do brasil'],
};

const pixArticles = [
  {
    slug: 'top-7-golpes-pix-2026',
    title: 'Top 7 Golpes PIX em 2026',
    description: 'Os golpes mais comuns e perigosos do PIX em 2026',
    icon: '🔝',
  },
  {
    slug: 'como-identificar-golpe-no-pix',
    title: 'Como Identificar Golpe no PIX',
    description: 'Sinais de alerta e como se proteger',
    icon: '🔍',
  },
  {
    slug: 'golpe-pix-itau-como-identificar',
    title: 'Golpe PIX Itaú',
    description: 'Golpes específicos envolvendo o Itaú',
    icon: '🏦',
  },
  {
    slug: 'golpe-pix-banco-do-brasil-2024',
    title: 'Golpe PIX Banco do Brasil',
    description: 'Fraudes no BB e como evitar',
    icon: '🏛️',
  },
  {
    slug: 'golpe-pix-nubank-whatsapp',
    title: 'Golpe PIX Nubank via WhatsApp',
    description: 'Golpes que combinam PIX e WhatsApp',
    icon: '💜',
  },
  {
    slug: 'como-saber-se-um-pix--golpe',
    title: 'Como Saber se um PIX é Golpe',
    description: 'Checklist completo de verificação',
    icon: '✅',
  },
  {
    slug: 'pix-estornado--golpe',
    title: 'PIX Estornado é Golpe?',
    description: 'Entenda o golpe do estorno falso',
    icon: '↩️',
  },
];

export default function GolpesPIXPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            🚨 Golpes do PIX<br />
            <span className="text-orange-600">Guia Completo 2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Aprenda a identificar, evitar e se proteger dos golpes mais comuns do PIX.
            Guia completo, atualizado e 100% gratuito.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog/top-7-golpes-pix-2026"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
            >
              Ver Top 7 Golpes →
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
        <div className="grid md:grid-3 gap-6 mb-16">
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-orange-600 mb-2">R$ 2,5B</div>
            <div className="text-gray-600">Perdidos em golpes PIX (2025)</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-orange-600 mb-2">7</div>
            <div className="text-gray-600">Golpes mais comuns</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-orange-600 mb-2">80 dias</div>
            <div className="text-gray-600">Prazo para solicitar devolução (MED)</div>
          </div>
        </div>

        {/* Articles Grid */}
        <h2 className="text-4xl font-black mb-8 text-center">📚 Artigos sobre Golpes do PIX</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pixArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
            >
              <div className="text-4xl mb-4">{article.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <span className="text-orange-600 font-bold group-hover:underline">
                Ler mais →
              </span>
            </Link>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="bg-orange-50 border-4 border-black p-8 mb-16">
          <h2 className="text-3xl font-black mb-6">❓ Perguntas Frequentes</h2>
          <div className="space-y-4">
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                Como saber se um PIX é golpe?
              </summary>
              <p className="mt-2 text-gray-700">
                Desconfie se: (1) pede PIX antes de entregar produto, (2) há urgência excessiva,
                (3) valor mudou de última hora, (4) destinatário tem nome diferente do vendedor.
              </p>
            </details>
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                É possível cancelar um PIX?
              </summary>
              <p className="mt-2 text-gray-700">
                Não. O PIX é instantâneo e irreversível. Porém, você pode solicitar a devolução
                via MED (Mecanismo Especial de Devolução) em até 80 dias.
              </p>
            </details>
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                O que fazer se cair em golpe do PIX?
              </summary>
              <p className="mt-2 text-gray-700">
                (1) Registre BO imediatamente, (2) solicite MED no app do banco, (3) denuncie ao
                Banco Central (telefone 145), (4) avise seus contatos.
              </p>
            </details>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-12 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black mb-4">Recebeu Mensagem Suspeita?</h2>
          <p className="text-xl mb-8">
            Use nossa ferramenta gratuita de IA para analisar em segundos
          </p>
          <Link
            href="/"
            className="bg-white text-orange-600 px-12 py-4 rounded-lg font-bold text-xl inline-block hover:scale-105 transition-all shadow-lg"
          >
            Analisar Agora (Grátis) →
          </Link>
        </div>
      </div>
    </main>
  );
}
