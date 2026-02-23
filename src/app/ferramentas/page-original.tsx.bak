import Link from "next/link";
import { Metadata } from "next";
import { 
  Search, 
  Link2, 
  KeyRound, 
  Building2, 
  Smartphone, 
  Mail, 
  Shield, 
  Heart,
  CircleDollarSign,
  Lock,
  Zap,
  BookOpen,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Ferramentas de Segurança Gratuitas | Vovó Vigilante",
  description:
    "Ferramentas gratuitas para proteger você online: verificador de links, gerador de senhas, validador CPF/CNPJ e muito mais!",
  keywords: [
    "ferramentas segurança",
    "verificar link",
    "gerador senha",
    "validar cpf",
    "email vazado",
  ],
};

const tools = [
  {
    name: "Detector de Golpes",
    description: "Analise mensagens suspeitas com inteligência artificial",
    Icon: Search,
    href: "/",
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    badge: "Principal",
  },
  {
    name: "Verificador de Link",
    description: "Verifique se um link é seguro antes de clicar",
    Icon: Link2,
    href: "/verificador-link",
    color: "blue",
    gradient: "from-blue-500 to-cyan-600",
    badge: "Novo",
  },
  {
    name: "Gerador de Senha Forte",
    description: "Crie senhas seguras e impossíveis de adivinhar",
    Icon: KeyRound,
    href: "/gerador-senha",
    color: "green",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Validador CPF/CNPJ",
    description: "Valide CPF ou CNPJ instantaneamente",
    Icon: Building2,
    href: "/validar-cpf",
    color: "orange",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    name: "Verificador de Número",
    description: "Identifique operadora e valide números de telefone",
    Icon: Smartphone,
    href: "/verificar-numero",
    color: "pink",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Email Vazado?",
    description: "Descubra se seu e-mail foi exposto em vazamentos",
    Icon: Mail,
    href: "/email-vazado",
    color: "red",
    gradient: "from-red-500 to-rose-600",
    badge: "Novo",
  },
];

export default function FerramentasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />

      {/* Hero - Redesigned */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
        </div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}></div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <Shield className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-white">
                <Sparkles className="w-4 h-4" />
                6 ferramentas gratuitas
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Proteção Digital
              <span className="block text-purple-200">Simples e Gratuita</span>
            </h1>
            
            <p className="text-xl text-purple-100 leading-relaxed max-w-2xl">
              Ferramentas desenvolvidas para proteger você e sua família de golpes online. 
              Rápidas, seguras e sem complicação.
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 48h1440V0s-187.5 48-360 48S720 0 720 0 532.5 48 360 48 0 0 0 0z" fill="rgb(250 245 255)"/>
          </svg>
        </div>
      </div>

      {/* Tools Grid - Redesigned */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.Icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-100 hover:-translate-y-1"
              >
                {/* Badge - top-right */}
                {tool.badge && (
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold rounded-full shadow-lg shadow-purple-200">
                      <Sparkles className="w-3 h-3" />
                      {tool.badge}
                    </span>
                  </div>
                )}

                {/* Icon with gradient background */}
                <div className="mb-6 relative">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg shadow-${tool.color}-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <IconComponent 
                      className="w-10 h-10 text-white"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Usar agora</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </Link>
            );
          })}
        </div>

        {/* Stats - Redesigned */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl transform -rotate-1"></div>
          <div className="relative bg-white rounded-3xl shadow-xl shadow-purple-100 p-10 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 text-purple-600" />
                Por que escolher nossas ferramentas?
              </h2>
              <p className="text-gray-600">Desenvolvidas pensando na sua segurança e privacidade</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-200 mb-4 group-hover:scale-110 transition-transform">
                  <CircleDollarSign className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="font-bold text-lg text-gray-900 mb-2">100% Gratuito</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Sem taxas escondidas, sem limites de uso, sem necessidade de cadastro
                </div>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-200 mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="font-bold text-lg text-gray-900 mb-2">Privacidade Total</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Nenhum dado pessoal é armazenado ou compartilhado com terceiros
                </div>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg shadow-yellow-200 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="font-bold text-lg text-gray-900 mb-2">Resultados Instantâneos</div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Análises rápidas e precisas em poucos segundos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog CTA - Redesigned */}
        <div className="mt-16 relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl shadow-2xl shadow-purple-200">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <BookOpen className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Aprenda a se proteger
            </h3>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
              Artigos práticos sobre segurança digital, golpes comuns e como evitá-los
            </p>
            
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Acessar o Blog
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 px-4 text-gray-600 text-sm border-t border-gray-100 mt-16 bg-white">
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/privacy" className="hover:text-purple-700 transition-colors font-medium">Privacidade</Link>
          <Link href="/terms" className="hover:text-purple-700 transition-colors font-medium">Termos</Link>
          <Link href="/sobre" className="hover:text-purple-700 transition-colors font-medium">Sobre</Link>
          <Link href="/contato" className="hover:text-purple-700 transition-colors font-medium">Contato</Link>
        </div>
      </footer>
    </div>
  );
}
