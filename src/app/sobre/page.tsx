import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Shield, Info, Sparkles, Scale, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre | Detector de Golpes",
  description:
    "Entenda como funciona o Detector de Golpes, quais são as limitações e como usar com segurança.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-teal-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Info className="w-24 h-24 text-white" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-teal-400 rounded-full opacity-50 blur-xl" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Sobre</h1>
          <p className="text-xl text-purple-100">
            Um serviço gratuito para ajudar pessoas comuns a identificar golpes
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            O que é o Detector de Golpes?
          </h2>
          <p className="text-slate-800 leading-relaxed">
            O Detector de Golpes é um site que analisa mensagens suspeitas (WhatsApp, SMS, e-mail
            e afins) e devolve um diagnóstico com sinais de risco e recomendações práticas.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="border border-purple-100 border-4 border-slate-900 p-5">
              <div className="flex items-center gap-2 text-teal-700 font-semibold">
                <Sparkles className="w-5 h-5" />
                IA como apoio
              </div>
              <p className="text-sm text-slate-700 mt-2">
                A análise é automatizada e serve como ajuda rápida para tomada de decisão.
              </p>
            </div>
            <div className="border border-purple-100 border-4 border-slate-900 p-5">
              <div className="flex items-center gap-2 text-teal-700 font-semibold">
                <Scale className="w-5 h-5" />
                Limitações
              </div>
              <p className="text-sm text-slate-700 mt-2">
                Não é laudo, não substitui banco/polícia. Use como sinalizador e confirme por canais oficiais.
              </p>
            </div>
            <div className="border border-purple-100 border-4 border-slate-900 p-5">
              <div className="flex items-center gap-2 text-teal-700 font-semibold">
                <Shield className="w-5 h-5" />
                Segurança
              </div>
              <p className="text-sm text-slate-700 mt-2">
                Evite compartilhar senhas, códigos, chaves Pix completas ou dados bancários em qualquer site.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Boas práticas ao receber uma mensagem</h3>
            <ul className="space-y-3 text-slate-800">
              {[
                "Desconfie de urgência e pressão para agir agora",
                "Evite clicar em links desconhecidos (principalmente encurtados)",
                "Confirme por um canal oficial (site/app do banco, telefone do verso do cartão)",
                "Nunca informe códigos recebidos por SMS/WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 bg-teal-50 border border-purple-100 border-4 border-slate-900 p-6">
            <p className="text-sm text-slate-800">
              <strong>Importante:</strong> este site não é afiliado ao Governo, à Globo, a bancos ou
              a empresas de telefonia. Marcas citadas pertencem a seus respectivos donos.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white font-semibold border-4 border-slate-900 hover:bg-teal-600 transition-colors"
            >
              <Shield className="w-5 h-5" />
              Usar o detector
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-teal-200 text-teal-700 font-semibold border-4 border-slate-900 hover:bg-teal-50 transition-colors"
            >
              <Info className="w-5 h-5" />
              Falar conosco
            </Link>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 px-4 text-teal-600 text-sm border-t border-teal-200 mt-12">
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/privacy" className="hover:text-slate-900 underline">Privacidade</Link>
          <Link href="/terms" className="hover:text-slate-900 underline">Termos</Link>
          <Link href="/sobre" className="hover:text-slate-900 underline">Sobre</Link>
          <Link href="/contato" className="hover:text-slate-900 underline">Contato</Link>
        </div>
      </footer>
    </div>
  );
}
