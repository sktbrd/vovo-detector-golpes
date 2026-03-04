import { CheckCircle2 } from "lucide-react";

interface SummaryBoxProps {
  description: string;
}

export default function SummaryBox({ description }: SummaryBoxProps) {
  return (
    <div className="mt-8 md:mt-12 bg-lime-100 border-3 md:border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
        <CheckCircle2 
          className="w-5 h-5 md:w-6 md:h-6 text-slate-900 flex-shrink-0 mt-0.5 md:mt-1" 
          strokeWidth={3}
          aria-hidden="true" 
        />
        <div>
          <h3 className="text-lg md:text-2xl font-black text-slate-900 uppercase mb-1 md:mb-2">
            RESUMO
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-slate-700 font-bold leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
