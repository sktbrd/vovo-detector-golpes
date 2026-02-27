"use client";

import { Share2, MessageCircle, Send, Facebook, Linkedin } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  title: string;
  description: string;
}

export default function ShareButtons({ title, description }: ShareButtonsProps) {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado!", {
        duration: 2000,
        style: {
          border: '3px solid black',
          padding: '12px 16px',
          fontWeight: 'bold',
        },
      });
    } catch (err) {
      toast.error("Erro ao copiar link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title, 
          text: description,
          url 
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
      "_blank"
    );
  };

  const handleTelegramShare = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank"
    );
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="mt-8 text-center">
      <p className="text-sm md:text-base text-slate-700 font-bold mb-4 uppercase">
        Ajude outras pessoas - compartilhe este artigo!
      </p>
      <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
        <button
          onClick={handleNativeShare}
          className="px-3 md:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Compartilhar"
        >
          <Share2 size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Compartilhar</span>
        </button>
        
        <button
          onClick={handleCopyLink}
          className="px-3 md:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Copiar link"
        >
          <Share2 size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Copiar</span>
        </button>

        <button
          onClick={handleWhatsAppShare}
          className="px-3 md:px-4 py-2 bg-green-500 hover:bg-green-600 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Compartilhar no WhatsApp"
        >
          <MessageCircle size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>

        <button
          onClick={handleTelegramShare}
          className="px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Compartilhar no Telegram"
        >
          <Send size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Telegram</span>
        </button>

        <button
          onClick={handleFacebookShare}
          className="px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Compartilhar no Facebook"
        >
          <Facebook size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Facebook</span>
        </button>

        <button
          onClick={handleLinkedInShare}
          className="px-3 md:px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Compartilhar no LinkedIn"
        >
          <Linkedin size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>
      </div>
    </div>
  );
}
