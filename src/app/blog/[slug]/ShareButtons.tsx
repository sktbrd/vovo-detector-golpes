"use client";

import { Share2, MessageCircle, Send, Facebook, Linkedin, Link, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description: string;
}

export default function ShareButtons({ title, description }: ShareButtonsProps) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: string, callback: () => void) => {
    setClickedButton(buttonId);
    callback();
    setTimeout(() => setClickedButton(null), 300);
  };

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
          onClick={() => handleButtonClick('share', handleNativeShare)}
          className={`px-3 md:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${clickedButton === 'share' ? 'scale-95' : ''}`}
          aria-label="Compartilhar artigo via opções do dispositivo"
        >
          <Share2 size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Compartilhar</span>
        </button>
        
        <button
          onClick={() => handleButtonClick('copy', handleCopyLink)}
          className={`px-3 md:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${clickedButton === 'copy' ? 'scale-95' : ''}`}
          aria-label="Copiar link do artigo para área de transferência"
        >
          <Copy size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Copiar</span>
        </button>

        <button
          onClick={() => handleButtonClick('whatsapp', handleWhatsAppShare)}
          className={`px-3 md:px-4 py-2 bg-green-500 hover:bg-green-600 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${clickedButton === 'whatsapp' ? 'scale-95' : ''}`}
          aria-label="Compartilhar artigo no WhatsApp"
        >
          <MessageCircle size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>

        <button
          onClick={() => handleButtonClick('telegram', handleTelegramShare)}
          className={`px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${clickedButton === 'telegram' ? 'scale-95' : ''}`}
          aria-label="Compartilhar artigo no Telegram"
        >
          <Send size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Telegram</span>
        </button>

        <button
          onClick={() => handleButtonClick('facebook', handleFacebookShare)}
          className={`px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${clickedButton === 'facebook' ? 'scale-95' : ''}`}
          aria-label="Compartilhar artigo no Facebook"
        >
          <Facebook size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Facebook</span>
        </button>

        <button
          onClick={() => handleButtonClick('linkedin', handleLinkedInShare)}
          className={`px-3 md:px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white border-2 border-black text-xs md:text-sm font-black transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 md:gap-2 uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${clickedButton === 'linkedin' ? 'scale-95' : ''}`}
          aria-label="Compartilhar artigo no LinkedIn"
        >
          <Linkedin size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>
      </div>
    </div>
  );
}
