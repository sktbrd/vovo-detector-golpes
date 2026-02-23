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
    color: "teal",
    bgColor: "bg-teal-500",
    badge: "Principal",
  },
  {
    name: "Verificador de Link",
    description: "Verifique se um link é seguro antes de clicar",
    Icon: Link2,
    href: "/verificador-link",
    color: "pink",
    bgColor: "bg-pink-500",
    badge: "Novo",
  },
  {
    name: "Gerador de Senha Forte",
    description: "Crie senhas seguras e impossíveis de adivinhar",
    Icon: KeyRound,
    href: "/gerador-senha",
    color: "lime",
    bgColor: "bg-lime-500",
  },
  {
    name: "Validador CPF/CNPJ",
    description: "Valide CPF ou CNPJ instantaneamente",
    Icon: Building2,
    href: "/validar-cpf",
    color: "teal",
    bgColor: "bg-teal-500",
  },
  {
    name: "Verificador de Número",
    description: "Identifique operadora e valide números de telefone",
    Icon: Smartphone,
    href: "/verificar-numero",
    color: "pink",
    bgColor: "bg-pink-500",
  },
  {
    name: "Email Vazado?",
    description: "Descubra se seu e-mail foi exposto em vazamentos",
    Icon: Mail,
    href: "/email-vazado",
    color: "lime",
    bgColor: "bg-lime-500",
    badge: "Novo",
  },
];

export default function FerramentasPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero - NEO-BRUTAL */}
      <div className="bg-gradient-to-br from-teal-500 to-pink-500 border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="bg-white border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Shield className="w-10 h-10 text-slate-900" strokeWidth={2.5} />
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500 border-3 border-black text-slate-900 font-bold text-sm uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-4 h-4" />
                6 FERRAMENTAS GRATUITAS
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-none uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
              PROTEÇÃO
              <span className="block text-slate-900 mt-2">DIGITAL</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white font-bold leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              Simples. Gratuita. Poderosa. 💪
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid - NEO-BRUTAL */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.Icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-white border-4 border-slate-900 p-6 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100"
              >
                {/* Badge */}
                {tool.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 ${tool.bgColor} text-white text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      <Sparkles className="w-3 h-3" />
                      {tool.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${tool.bgColor} border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-100`}>
                    <IconComponent 
                      className="w-8 h-8 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase leading-tight">
                  {tool.name}
                </h3>

                <p className="text-slate-700 text-base font-medium leading-relaxed mb-6">
                  {tool.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase">
                  <span>USAR AGORA</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats - NEO-BRUTAL */}
        <div className="mt-20 bg-white border-4 border-slate-900 p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 flex items-center justify-center gap-3 uppercase">
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
              POR QUÊ?
            </h2>
            <p className="text-xl text-slate-700 font-bold">Desenvolvidas pensando na sua segurança</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-lime-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-100">
                <CircleDollarSign className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-black text-2xl text-slate-900 mb-2 uppercase">100% Gratuito</div>
              <div className="text-base text-slate-700 font-medium leading-relaxed">
                Sem taxas, sem limites, sem cadastro
              </div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-100">
                <Lock className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-black text-2xl text-slate-900 mb-2 uppercase">Privacidade Total</div>
              <div className="text-base text-slate-700 font-medium leading-relaxed">
                Nenhum dado é armazenado ou compartilhado
              </div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-100">
                <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-black text-2xl text-slate-900 mb-2 uppercase">Instantâneo</div>
              <div className="text-base text-slate-700 font-medium leading-relaxed">
                Resultados rápidos e precisos em segundos
              </div>
            </div>
          </div>
        </div>

        {/* Blog CTA - NEO-BRUTAL */}
        <div className="mt-16 bg-gradient-to-br from-teal-500 to-pink-500 border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white border-4 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="w-12 h-12 text-slate-900" strokeWidth={2.5} />
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
              APRENDA MAIS
            </h3>
            <p className="text-2xl text-white font-bold mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              Descubra como se proteger de golpes comuns no Brasil
            </p>
            
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 text-xl font-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all uppercase"
            >
              VER ARTIGOS
              <ChevronRight className="w-6 h-6" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center py-12 px-4 text-slate-700 text-sm border-t-4 border-slate-900 mt-16 bg-white">
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/privacy" className="hover:text-teal-500 transition-colors font-bold uppercase">Privacidade</Link>
          <Link href="/terms" className="hover:text-teal-500 transition-colors font-bold uppercase">Termos</Link>
          <Link href="/sobre" className="hover:text-teal-500 transition-colors font-bold uppercase">Sobre</Link>
          <Link href="/contato" className="hover:text-teal-500 transition-colors font-bold uppercase">Contato</Link>
        </div>
      </footer>
    </div>
  );
}
