export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10">
        <span className="text-4xl">👵</span>
        <span className="absolute -bottom-1 -right-1 text-xl">🔍</span>
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
