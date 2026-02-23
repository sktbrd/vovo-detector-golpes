"use client";

import Link from "next/link";
import { Shield, Search, BookOpen, Wrench } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b-4 border-slate-900 bg-white sticky top-0 z-50 shadow-[0px_4px_0px_0px_rgba(15,23,42,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-900 hover:text-teal-500 transition-colors group"
          >
            <Shield className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" strokeWidth={3} />
            <span className="font-black text-xl sm:text-2xl hidden sm:inline uppercase tracking-tight">Vovó Vigilante</span>
            <span className="font-black text-xl sm:hidden uppercase">Vovó</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/ferramentas"
              className="flex items-center gap-1 text-slate-900 hover:text-teal-500 font-bold transition-colors text-sm sm:text-base uppercase"
            >
              <Wrench className="w-5 h-5" strokeWidth={2.5} />
              <span className="hidden sm:inline">Ferramentas</span>
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-1 text-slate-900 hover:text-pink-500 font-bold transition-colors text-sm sm:text-base uppercase"
            >
              <BookOpen className="w-5 h-5" strokeWidth={2.5} />
              <span className="hidden sm:inline">Blog</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 bg-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all font-bold text-sm sm:text-base uppercase"
            >
              <Search className="w-5 h-5" strokeWidth={2.5} />
              <span>Detector</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
