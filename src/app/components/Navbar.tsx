"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { name: "Detector de Golpes", href: "/", emoji: "🔍" },
    { name: "Verificador de Link", href: "/verificador-link", emoji: "🔗" },
    { name: "Gerador de Senha", href: "/gerador-senha", emoji: "🔐" },
    { name: "Validador CPF/CNPJ", href: "/validar-cpf", emoji: "🏦" },
    { name: "Verificar Número", href: "/verificar-numero", emoji: "📱" },
    { name: "Email Vazado?", href: "/email-vazado", emoji: "📧" },
  ];

  return (
    <nav className="bg-white border-b border-purple-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-800 hover:text-purple-600 transition-colors"
          >
            <span className="text-2xl">👵</span>
            <span className="font-bold text-lg hidden sm:block">
              Vovó Vigilante
            </span>
            <span className="font-bold text-lg sm:hidden">Vovó</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/ferramentas"
              className="px-4 py-2 text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
            >
              🛡️ Ferramentas
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
            >
              📚 Blog
            </Link>
            <Link
              href="/"
              className="ml-2 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              🔍 Detector
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-purple-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-purple-200 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                <Link
                  href="/ferramentas"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                >
                  🛡️ Todas as Ferramentas
                </Link>
                <div className="px-4 py-2 text-xs font-semibold text-purple-600 uppercase">
                  Ferramentas Rápidas
                </div>
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    {tool.emoji} {tool.name}
                  </Link>
                ))}
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                >
                  📚 Blog
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
