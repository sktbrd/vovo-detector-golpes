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
  ChevronRight
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
    badge: "Principal",
  },
  {
    name: "Verificador de Link",
    description: "Verifique se um link é seguro antes de clicar",
    Icon: Link2,
    href: "/verificador-link",
    color: "blue",
    badge: "Novo",
  },
  {
    name: "Gerador de Senha Forte",
    description: "Crie senhas seguras e impossíveis de adivinhar",
    Icon: KeyRound,
    href: "/gerador-senha",
    color: "green",
  },
  {
    name: "Validador CPF/CNPJ",
    description: "Valide CPF ou CNPJ instantaneamente",
    Icon: Building2,
    href: "/validar-cpf",
    color: "orange",
  },
  {
    name: "Verificador de Número",
    description: "Identifique operadora e valide números de telefone",
    Icon: Smartphone,
    href: "/verificar-numero",
    color: "pink",
  },
  {
    name: "Email Vazado?",
    description: "Descubra se seu e-mail foi exposto em vazamentos",
    Icon: Mail,
    href: "/email-vazado",
    color: "red",
    badge: "Novo",
  },
];

const colorClasses = {
  purple: "bg-purple-50 border-purple-200 hover:border-purple-400",
  blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
  green: "bg-green-50 border-green-200 hover:border-green-400",
  orange: "bg-orange-50 border-orange-200 hover:border-orange-400",
  pink: "bg-pink-50 border-pink-200 hover:border-pink-400",
  red: "bg-red-50 border-red-200 hover:border-red-400",
};

const iconColorClasses = {
  purple: "text-purple-600",
  blue: "text-blue-600",
  green: "text-green-600",
  orange: "text-orange-600",
  pink: "text-pink-600",
  red: "text-red-600",
};

export default function FerramentasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-purple-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-32 h-32 text-white" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Shield className="w-10 h-10" />
            Ferramentas de Segurança
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            A Vovó preparou ferramentas gratuitas para te proteger online.
            Simples, rápidas e seguras!
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.Icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`${
                  colorClasses[tool.color as keyof typeof colorClasses]
                } border-2 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden`}
              >
                {/* Badge */}
                {tool.badge && (
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                      {tool.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-4 relative">
                  <IconComponent 
                    className={`w-16 h-16 ${iconColorClasses[tool.color as keyof typeof iconColorClasses]} group-hover:scale-110 transition-transform`}
                    strokeWidth={1.5}
                  />
                  {/* Subtle glow */}
                  <div className={`absolute inset-0 ${iconColorClasses[tool.color as keyof typeof iconColorClasses]} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}></div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">{tool.description}</p>

                {/* Arrow */}
                <div className="mt-4 text-purple-600 font-medium flex items-center gap-1">
                  <span>Usar agora</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 fill-purple-600 text-purple-600" />
            Por que usar as ferramentas da Vovó?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <CircleDollarSign className="w-12 h-12 text-green-600" strokeWidth={1.5} />
              </div>
              <div className="font-bold text-purple-700">100% Gratuito</div>
              <div className="text-sm text-gray-600">
                Sem limites, sem cadastro
              </div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <Lock className="w-12 h-12 text-purple-600" strokeWidth={1.5} />
              </div>
              <div className="font-bold text-purple-700">Privacidade</div>
              <div className="text-sm text-gray-600">
                Seus dados não são armazenados
              </div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <Zap className="w-12 h-12 text-yellow-600" strokeWidth={1.5} />
              </div>
              <div className="font-bold text-purple-700">Instantâneo</div>
              <div className="text-sm text-gray-600">
                Resultados em segundos
              </div>
            </div>
          </div>
        </div>

        {/* Blog CTA */}
        <div className="mt-12 bg-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-16 h-16" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Aprenda a se proteger de golpes
          </h3>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Leia nossos guias completos com estatísticas reais e dicas práticas
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
          >
            Visitar o Blog
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <p className="mb-2 flex items-center justify-center gap-2">
          Feito com <Heart className="w-4 h-4 fill-purple-600" /> para proteger você
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-purple-800 underline">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-purple-800 underline">
            Termos
          </Link>
          <Link href="/" className="hover:text-purple-800 underline">
            Detector
          </Link>
        </div>
      </footer>
    </div>
  );
}
