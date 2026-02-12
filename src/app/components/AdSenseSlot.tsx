"use client";

import { useEffect } from "react";

interface AdSenseSlotProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdSenseSlot({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      {/* Placeholder até configurar AdSense */}
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-sm">
          📢 Espaço para anúncio
        </p>
        <p className="text-xs text-gray-400 mt-1">
          (AdSense será ativado após aprovação)
        </p>
      </div>

      {/* Descomente após aprovação do AdSense e configure client e slot */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Seu Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
      */}
    </div>
  );
}
