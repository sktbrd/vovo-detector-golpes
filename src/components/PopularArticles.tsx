import Link from 'next/link';

const popularArticles = [
  {
    slug: 'como-identificar-golpe-no-pix',
    title: 'Como Identificar Golpe no PIX',
    views: '12.5k',
    category: 'PIX',
  },
  {
    slug: 'golpe-do-whatsapp-clonado',
    title: 'Golpe do WhatsApp Clonado',
    views: '9.8k',
    category: 'WhatsApp',
  },
  {
    slug: 'top-7-golpes-pix-2026',
    title: 'Top 7 Golpes PIX 2026',
    views: '8.2k',
    category: 'PIX',
  },
  {
    slug: 'como-saber-se-meu-cartao-foi-clonado',
    title: 'Como Saber se Cartão Foi Clonado',
    views: '7.1k',
    category: 'Bancos',
  },
  {
    slug: 'golpe-whatsapp-fingindo-ser-parente',
    title: 'Golpe Fingindo ser Parente',
    views: '6.9k',
    category: 'WhatsApp',
  },
];

export default function PopularArticles() {
  return (
    <div className="bg-white border-4 border-black p-8">
      <h2 className="text-3xl font-black mb-6 flex items-center gap-2">
        🔥 Artigos Mais Lidos
      </h2>
      <div className="space-y-4">
        {popularArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group border-2 border-transparent hover:border-black"
          >
            <div className="text-3xl font-black text-gray-300 min-w-[40px]">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-orange-600 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded font-medium">
                  {article.category}
                </span>
                <span>👁️ {article.views} visualizações</span>
              </div>
            </div>
            <div className="text-2xl group-hover:translate-x-1 transition-transform">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
