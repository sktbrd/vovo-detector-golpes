import { ShieldCheck } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-teal-500 to-pink-500 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-tight text-slate-900">
          VOVÓ
        </span>
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
          Detector
        </span>
      </div>
    </div>
  );
}
