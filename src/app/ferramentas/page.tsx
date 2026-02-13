import Link from "next/link";
import { Metadata } from "next";
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
    emoji: "🔍",
    href: "/",
    color: "purple",
    badge: "Principal",
  },
  {
    name: "Verificador de Link",
    description: "Verifique se um link é seguro antes de clicar",
    emoji: "🔗",
    href: "/verificador-link",
    color: "blue",
    badge: "Novo",
  },
  {
    name: "Gerador de Senha Forte",
    description: "Crie senhas seguras e impossíveis de adivinhar",
    emoji: "🔐",
    href: "/gerador-senha",
    color: "green",
  },
  {
    name: "Validador CPF/CNPJ",
    description: "Valide CPF ou CNPJ instantaneamente",
    emoji: "🏦",
    href: "/validar-cpf",
    color: "orange",
  },
  {
    name: "Verificador de Número",
    description: "Identifique operadora e valide números de telefone",
    emoji: "📱",
    href: "/verificar-numero",
    color: "pink",
  },
  {
    name: "Email Vazado?",
    description: "Descubra se seu e-mail foi exposto em vazamentos",
    emoji: "📧",
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

export default function FerramentasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-purple-600 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🛡️ Ferramentas de Segurança
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
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`${
                colorClasses[tool.color as keyof typeof colorClasses]
              } border-2 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 group`}
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
              <div className="text-5xl mb-4">{tool.emoji}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                {tool.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{tool.description}</p>

              {/* Arrow */}
              <div className="mt-4 text-purple-600 font-medium flex items-center gap-1">
                <span>Usar agora</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            💜 Por que usar as ferramentas da Vovó?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🆓</div>
              <div className="font-bold text-purple-700">100% Gratuito</div>
              <div className="text-sm text-gray-600">
                Sem limites, sem cadastro
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-bold text-purple-700">Privacidade</div>
              <div className="text-sm text-gray-600">
                Seus dados não são armazenados
              </div>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-bold text-purple-700">Instantâneo</div>
              <div className="text-sm text-gray-600">
                Resultados em segundos
              </div>
            </div>
          </div>
        </div>

        {/* Blog CTA */}
        <div className="mt-12 bg-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-2xl font-bold mb-3">
            Aprenda a se proteger de golpes
          </h3>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Leia nossos guias completos com estatísticas reais e dicas práticas
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors"
          >
            Visitar o Blog
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <p className="mb-2">Feito com 💜 para proteger você</p>
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
