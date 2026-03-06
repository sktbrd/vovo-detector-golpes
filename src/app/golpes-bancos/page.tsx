import Link from 'next/link';
import type { Metadata } from 'next';
import { Building2, Phone, DollarSign, CreditCard, Calculator, BookOpen, AlertTriangle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Golpes Bancários: Guia Completo 2026 | Detector de Golpes',
  description: 'Descubra os golpes bancários mais comuns em 2026. Aprenda a identificar, evitar e se proteger de fraudes bancárias. Guia completo e atualizado.',
  keywords: ['golpes bancários', 'cartão clonado', 'golpe banco', 'falso funcionário banco', 'empréstimo falso'],
};

const bancosArticles = [
  {
    slug: 'golpe-do-falso-funcionario-do-banco',
    title: 'Golpe do Falso Funcionário',
    description: 'Como identificar ligações falsas do banco',
    Icon: Phone,
  },
  {
    slug: 'golpe-do-emprestimo-falso',
    title: 'Golpe do Empréstimo Falso',
    description: 'Empréstimos fraudulentos e como evitar',
    Icon: DollarSign,
  },
  {
    slug: 'como-saber-se-meu-cartao-foi-clonado',
    title: 'Cartão Clonado: Como Saber',
    description: 'Sinais de cartão clonado e o que fazer',
    Icon: CreditCard,
  },
  {
    slug: 'golpe-da-maquininha-banco-do-brasil',
    title: 'Golpe da Maquininha',
    description: 'Maquininhas adulteradas e fraudes',
    Icon: Calculator,
  },
];

export default function GolpesBancosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Building2 className="w-16 h-16 text-blue-600" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Golpes Bancários<br />
            <span className="text-blue-600">Guia Completo 2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Aprenda a identificar, evitar e se proteger dos golpes bancários mais comuns.
            Guia completo, atualizado e 100% gratuito.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog/golpe-do-falso-funcionario-do-banco"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 shadow-lg"
            >
              Ver Golpe #1 →
            </Link>
            <Link
              href="/"
              className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
            >
              Analisar Mensagem
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">R$ 1,8B</div>
            <div className="text-gray-600">Perdidos em golpes bancários (2025)</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">48%</div>
            <div className="text-gray-600">Dos golpes envolvem falsos funcionários</div>
          </div>
          <div className="bg-white border-4 border-black p-6 text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">90 dias</div>
            <div className="text-gray-600">Prazo para contestar fraude no cartão</div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <BookOpen className="w-12 h-12 text-blue-600" strokeWidth={2.5} />
          <h2 className="text-4xl font-black text-center">Artigos sobre Golpes Bancários</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {bancosArticles.map((article) => {
            const Icon = article.Icon;
            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
              >
                <div className="mb-4">
                  <div className="inline-block bg-blue-100 border-2 border-black rounded-lg p-3">
                    <Icon className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
                  </div>
                </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <span className="text-blue-600 font-bold group-hover:underline">
                Ler mais →
              </span>
            </Link>
            );
          })}
        </div>

        {/* Warning Box */}
        <div className="bg-yellow-50 border-4 border-yellow-500 p-8 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-500 border-2 border-yellow-800 rounded-lg p-2">
              <AlertTriangle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-yellow-800">Atenção: Regra de Ouro</h2>
          </div>
          <p className="text-xl text-yellow-900 font-bold mb-4">
            Bancos NUNCA ligam pedindo:
          </p>
          <ul className="space-y-2 text-lg text-yellow-900">
            <li>✗ Senha completa do cartão ou app</li>
            <li>✗ Código de segurança (CVV)</li>
            <li>✗ Instalação de aplicativos remotos</li>
            <li>✗ Transferências "para se proteger"</li>
            <li>✗ Dados pessoais completos</li>
          </ul>
          <p className="mt-4 text-yellow-900 font-bold">
            👉 Se pedirem qualquer coisa acima, DESLIGUE e ligue você mesmo para o banco.
          </p>
        </div>

        {/* FAQ */}
        <div className="bg-blue-50 border-4 border-black p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-500 border-2 border-black rounded-lg p-2">
              <HelpCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                Como saber se a ligação do banco é falsa?
              </summary>
              <p className="mt-2 text-gray-700">
                Desconfie se: pedirem senha completa, CVV, ou instalação de app. Banco NUNCA pede isso.
                Sempre desligue e ligue você mesmo para o número oficial do banco.
              </p>
            </details>
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                O que fazer se cair em golpe bancário?
              </summary>
              <p className="mt-2 text-gray-700">
                (1) Bloqueie cartão/conta IMEDIATAMENTE, (2) registre BO,
                (3) conteste transações no banco (até 90 dias), (4) denuncie ao Banco Central.
              </p>
            </details>
            <details className="bg-white border-2 border-black p-4">
              <summary className="font-bold cursor-pointer">
                Banco devolve dinheiro de golpe?
              </summary>
              <p className="mt-2 text-gray-700">
                Depende. Se você não foi negligente (compartilhar senha) e contestar em até 90 dias,
                o banco geralmente devolve. Guarde provas e registre BO.
              </p>
            </details>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-12 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black mb-4">Recebeu Ligação ou SMS Suspeito?</h2>
          <p className="text-xl mb-8">
            Use nossa ferramenta gratuita de IA para analisar em segundos
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 px-12 py-4 rounded-lg font-bold text-xl inline-block hover:scale-105 transition-all shadow-lg"
          >
            Analisar Agora (Grátis) →
          </Link>
        </div>
      </div>
    </main>
  );
}
