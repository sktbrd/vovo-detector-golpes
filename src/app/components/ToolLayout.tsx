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
  iconColor = "text-white",
  children,
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <Navbar />

      {/* Header */}
      <div className="bg-purple-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Icon className={`w-24 h-24 ${iconColor}`} strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-xl text-purple-100">{description}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        {children}

        {/* Other Tools */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Outras Ferramentas da Vovó
          </h3>
          <Link
            href="/ferramentas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors"
          >
            Ver todas as ferramentas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <p className="mb-2 flex items-center justify-center gap-2">
          Feito com <Heart className="w-4 h-4 fill-purple-600" /> para proteger você
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/ferramentas" className="hover:text-purple-800 underline">
            Ferramentas
          </Link>
          <Link href="/blog" className="hover:text-purple-800 underline">
            Blog
          </Link>
          <Link href="/privacy" className="hover:text-purple-800 underline">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-purple-800 underline">
            Termos
          </Link>
        </div>
      </footer>
    </div>
  );
}
