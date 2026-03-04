import Link from "next/link";
import { Search, Shield } from "lucide-react";

export default function CtaBox() {
  return (
    <div className="mt-6 md:mt-8 bg-gradient-to-br from-teal-500 to-pink-500 border-3 md:border-4 border-black p-6 md:p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-center mb-4 md:mb-6">
        <div className="bg-white border-3 md:border-4 border-black p-3 md:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Shield 
            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-slate-900" 
            strokeWidth={2.5} 
            aria-hidden="true" 
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 text-white uppercase drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.4)] leading-tight">
        PROTEJA-SE AGORA!
      </h3>

      <p className="text-base md:text-xl lg:text-2xl text-white font-bold mb-6 md:mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)] max-w-2xl mx-auto px-2">
        Use nossas ferramentas gratuitas para detectar golpes e proteger suas informações
      </p>

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 font-black text-base md:text-lg lg:text-xl border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1 transition-all uppercase"
        >
          <Search className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
          <span className="whitespace-nowrap">DETECTOR DE GOLPES</span>
        </Link>
        <Link
          href="/ferramentas"
          className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-lime-400 text-slate-900 font-black text-base md:text-lg lg:text-xl border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1 transition-all uppercase"
        >
          <Shield className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
          <span className="whitespace-nowrap">TODAS FERRAMENTAS</span>
        </Link>
      </div>
    </div>
  );
}
