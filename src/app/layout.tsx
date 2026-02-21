import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.detectordegolpes.com.br'),
  title: {
    default: "Vovó - Detector de Golpes com IA | Proteja-se de Golpes Online",
    template: "%s | Vovó Detector de Golpes"
  },
  description:
    "🚨 Detector de golpes GRATUITO com IA. Identifique golpes no WhatsApp, SMS, e-mail e Pix em segundos. A vovó mais esperta da internet te protege!",
  keywords: [
    "detector de golpe",
    "golpe whatsapp",
    "verificar mensagem suspeita",
    "phishing brasil",
    "golpe pix",
    "mensagem falsa",
    "golpe telefone",
    "golpe email",
    "verificar golpe online",
    "como identificar golpe",
    "scam detector brasil"
  ],
  authors: [{ name: "Vovó Detector de Golpes" }],
  creator: "Vovó Detector",
  publisher: "Vovó Detector",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.detectordegolpes.com.br",
    title: "Vovó - Detector de Golpes com IA",
    description: "Deixa a vovó dar uma olhada nessa mensagem suspeita... Identifique golpes em segundos!",
    siteName: "Vovó Detector de Golpes",
    images: [
      {
        url: "/001-cute-brazilian-grandma-character-similar.png",
        width: 1024,
        height: 1024,
        alt: "Vovó - Detector de Golpes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vovó - Detector de Golpes com IA",
    description: "Identifique golpes no WhatsApp, SMS e e-mail em segundos!",
    images: ["/001-cute-brazilian-grandma-character-similar.png"],
  },
  verification: {
    // Adicionar Google Search Console depois
    // google: 'sua-chave-aqui',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Vovó - Detector de Golpes',
    description: 'Detector de golpes com IA que identifica golpes no WhatsApp, SMS e e-mail',
    url: 'https://www.detectordegolpes.com.br',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };

  return (
    <html lang="pt-BR">
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense - Descomente após aprovação e adicione seu Publisher ID */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
