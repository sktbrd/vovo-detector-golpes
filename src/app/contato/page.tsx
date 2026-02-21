import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Mail, MessageSquare, Shield, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato | Detector de Golpes",
  description:
    "Fale com a equipe do Detector de Golpes. Envie feedback, sugestões ou reporte problemas.",
};

const CONTACT_EMAIL = "contato@detectordegolpes.com.br";

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-purple-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Mail className="w-24 h-24 text-white" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full opacity-50 blur-xl" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contato</h1>
          <p className="text-xl text-purple-100">
            Feedback rápido ajuda a melhorar o detector e os conteúdos
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Como falar com a gente
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="border border-purple-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <Mail className="w-5 h-5" />
                E-mail
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Para sugestões, parcerias, correções ou imprensa.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 text-purple-700 font-semibold hover:underline"
              >
                {CONTACT_EMAIL}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="border border-purple-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <Shield className="w-5 h-5" />
                Report de segurança
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Se você encontrou um bug, vulnerabilidade ou abuso do serviço, envie detalhes por e-mail.
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Inclua: URL, passos para reproduzir e prints (se possível).
              </p>
            </div>
          </div>

          <div className="mt-10 bg-purple-50 border border-purple-100 rounded-2xl p-6">
            <p className="text-sm text-gray-700">
              <strong>Observação:</strong> para urgências (ex.: caiu no golpe agora), procure também seu banco
              e registre boletim de ocorrência. Nosso serviço é informativo e não substitui canais oficiais.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              <Shield className="w-5 h-5" />
              Voltar ao detector
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/privacy" className="hover:text-purple-800 underline">Privacidade</Link>
          <Link href="/terms" className="hover:text-purple-800 underline">Termos</Link>
          <Link href="/sobre" className="hover:text-purple-800 underline">Sobre</Link>
          <Link href="/contato" className="hover:text-purple-800 underline">Contato</Link>
        </div>
      </footer>
    </div>
  );
}
