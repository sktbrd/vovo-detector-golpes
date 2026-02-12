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
  title: "Vovó - Detector de Golpes",
  description:
    "A vovó mais esperta da internet te ajuda a identificar golpes no WhatsApp, SMS e e-mail. Cole a mensagem suspeita e descubra se é golpe!",
  keywords: [
    "detector de golpe",
    "golpe whatsapp",
    "verificar mensagem",
    "phishing",
    "golpe pix",
    "mensagem falsa",
  ],
  openGraph: {
    title: "Vovó - Detector de Golpes",
    description: "Deixa a vovó dar uma olhada nessa mensagem suspeita...",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
