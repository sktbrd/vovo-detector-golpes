"use client";

interface ShareButtonsProps {
  title: string;
  description: string;
}

export default function ShareButtons({ title, description }: ShareButtonsProps) {
  const handleShare = () => {
    const url = window.location.href;
    const text = `${title} - ${description}`;
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }
  };

  const handleWhatsAppShare = () => {
    const url = window.location.href;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`,
      "_blank"
    );
  };

  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500 mb-3">
        Ajude outras pessoas - compartilhe este artigo!
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
        >
          Copiar Link
        </button>
        <button
          onClick={handleWhatsAppShare}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          WhatsApp
        </button>
        <button
          onClick={handleTwitterShare}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          🐦 Twitter
        </button>
      </div>
    </div>
  );
}
