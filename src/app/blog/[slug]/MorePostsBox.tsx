import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function MorePostsBox() {
  return (
    <div className="mt-8 md:mt-12 bg-gradient-to-br from-white to-slate-100 border-3 md:border-4 border-slate-900 p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-gradient-to-br from-teal-500 to-pink-500 border-2 md:border-3 border-black p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <BookOpen 
            className="w-6 h-6 md:w-8 md:h-8 text-white" 
            strokeWidth={2.5}
            aria-hidden="true" 
          />
        </div>
        <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-slate-900 uppercase leading-tight">
          CONTINUE APRENDENDO
        </h3>
      </div>
      <p className="text-sm md:text-base lg:text-lg text-slate-700 font-bold mb-4 md:mb-6 leading-relaxed">
        Descubra mais dicas de segurança e aprenda a se proteger contra golpes online
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-pink-500 text-white font-black text-base md:text-lg border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1 transition-all uppercase"
      >
        <BookOpen className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
        <span>VER TODOS OS ARTIGOS</span>
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180" strokeWidth={3} />
      </Link>
    </div>
  );
}
