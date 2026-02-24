import Navbar from "./Navbar";
import Link from "next/link";
import { Shield, Heart, ChevronRight, LucideIcon } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
}

export default function ToolLayout({
  title,
  description,
  Icon,
  iconColor = "text-slate-900",
  children,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header - Neo-Brutal */}
      <div className="bg-gradient-to-br from-teal-500 to-pink-500 border-b-4 border-black py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Icon className={`w-20 h-20 ${iconColor}`} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
            {title}
          </h1>
          <p className="text-2xl md:text-3xl text-white font-bold drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            {description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {children}

        {/* Other Tools - Neo-Brutal */}
        <div className="mt-12 bg-white border-4 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase">
            <Shield className="w-6 h-6" strokeWidth={2.5} />
            Outras Ferramentas
          </h3>
          <Link
            href="/ferramentas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase"
          >
            Ver Todas
            <ChevronRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        </div>
      </main>

      {/* Footer - Neo-Brutal */}
      <footer className="text-center py-8 px-4 text-slate-700 text-sm border-t-4 border-slate-900 mt-12 bg-white">
        <p className="mb-4 flex items-center justify-center gap-2 font-bold text-base">
          Feito com <Heart className="w-5 h-5 fill-pink-500 text-pink-500" /> para proteger você
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/ferramentas" className="hover:text-teal-500 font-bold uppercase">
            Ferramentas
          </Link>
          <Link href="/blog" className="hover:text-teal-500 font-bold uppercase">
            Blog
          </Link>
          <Link href="/privacy" className="hover:text-teal-500 font-bold uppercase">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-teal-500 font-bold uppercase">
            Termos
          </Link>
        </div>
      </footer>
    </div>
  );
}
