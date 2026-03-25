import Link from "next/link";
import { Github, Heart, Shield, Mail, BookOpen, Wrench } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-slate-900 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-pink-500 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 uppercase">Vovó</div>
                <div className="text-sm font-bold text-slate-600">Detector</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Protegendo você de golpes online desde 2025.
            </p>
          </div>

          {/* Ferramentas */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Ferramentas
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-600 hover:text-teal-500 font-medium transition-colors">
                  Detector de Golpes
                </Link>
              </li>
              <li>
                <Link href="/verificador-link" className="text-sm text-slate-600 hover:text-teal-500 font-medium transition-colors">
                  Verificador de Link
                </Link>
              </li>
              <li>
                <Link href="/gerador-senha" className="text-sm text-slate-600 hover:text-teal-500 font-medium transition-colors">
                  Gerador de Senha
                </Link>
              </li>
              <li>
                <Link href="/validar-cpf" className="text-sm text-slate-600 hover:text-teal-500 font-medium transition-colors">
                  Validador CPF/CNPJ
                </Link>
              </li>
            </ul>
          </div>

          {/* Conteúdo */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Conteúdo
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-slate-600 hover:text-pink-500 font-medium transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/ultimos-golpes" className="text-sm text-slate-600 hover:text-pink-500 font-medium transition-colors">
                  Últimos Golpes
                </Link>
              </li>
              <li>
                <Link href="/golpes-pix" className="text-sm text-slate-600 hover:text-pink-500 font-medium transition-colors">
                  Golpes PIX
                </Link>
              </li>
              <li>
                <Link href="/golpes-whatsapp" className="text-sm text-slate-600 hover:text-pink-500 font-medium transition-colors">
                  Golpes WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Institucional
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-2 border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>no Brasil</span>
          </div>

          <div className="text-sm text-slate-600 font-medium">
            © {currentYear} Vovó Detector. Todos os direitos reservados.
          </div>

          <a
            href="https://github.com/gnarlyvlad/vovo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Open Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
