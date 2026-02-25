"use client";

import React from "react";
import {
  Shield,
  AlertTriangle,
  HelpCircle,
  BarChart3,
  Lock,
  Rocket,
  CheckCircle2,
  FileText,
  Megaphone,
  BookOpen,
  Info,
  Zap,
  TrendingUp,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";

// Mapeamento emoji → ícone lucide-react
const emojiToIcon: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  "🛡️": { icon: Shield, color: "text-teal-600", bgColor: "bg-teal-100" },
  "🚨": { icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-100" },
  "🤔": { icon: HelpCircle, color: "text-purple-600", bgColor: "bg-purple-100" },
  "📊": { icon: BarChart3, color: "text-blue-600", bgColor: "bg-blue-100" },
  "🔒": { icon: Lock, color: "text-slate-600", bgColor: "bg-slate-100" },
  "🔐": { icon: Lock, color: "text-slate-600", bgColor: "bg-slate-100" },
  "🚀": { icon: Rocket, color: "text-pink-600", bgColor: "bg-pink-100" },
  "⚠️": { icon: AlertCircle, color: "text-orange-600", bgColor: "bg-orange-100" },
  "❓": { icon: HelpCircle, color: "text-purple-600", bgColor: "bg-purple-100" },
  "✅": { icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-100" },
  "📝": { icon: FileText, color: "text-blue-600", bgColor: "bg-blue-100" },
  "📢": { icon: Megaphone, color: "text-pink-600", bgColor: "bg-pink-100" },
  "📚": { icon: BookOpen, color: "text-indigo-600", bgColor: "bg-indigo-100" },
  "ℹ️": { icon: Info, color: "text-cyan-600", bgColor: "bg-cyan-100" },
  "📱": { icon: Zap, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  "💰": { icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100" },
};

interface HeadingWithIconProps {
  level: 2 | 3 | 4;
  children: React.ReactNode;
  id?: string;
}

export default function HeadingWithIcon({ level, children, id }: HeadingWithIconProps) {
  const text = String(children);
  
  // Detectar emoji no final do texto
  const emojiMatch = text.match(/([🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️📢📚])\s*$/);
  const emoji = emojiMatch ? emojiMatch[1] : null;
  const cleanText = text.replace(/[🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️📢📚]\s*$/g, '').trim();
  
  // Pegar ícone correspondente
  const iconData = emoji ? emojiToIcon[emoji] : null;
  const IconComponent = iconData?.icon;

  const iconSize = level === 2 ? 'w-6 h-6 md:w-8 md:h-8' : level === 3 ? 'w-5 h-5 md:w-6 md:h-6' : 'w-4 h-4 md:w-5 md:h-5';

  const content = (
    <>
      {IconComponent && (
        <div
          className={`flex-shrink-0 ${iconData.bgColor} border-2 md:border-3 border-black p-1.5 md:p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5`}
        >
          <IconComponent
            className={`${iconData.color} ${iconSize}`}
            strokeWidth={3}
            aria-hidden="true"
          />
        </div>
      )}
      <span className="flex-1">{cleanText}</span>
    </>
  );

  const className = IconComponent ? "flex items-start gap-3 group" : "";

  // Renderizar elemento apropriado baseado no level
  if (level === 2) {
    return <h2 id={id} className={className}>{content}</h2>;
  } else if (level === 3) {
    return <h3 id={id} className={className}>{content}</h3>;
  } else {
    return <h4 id={id} className={className}>{content}</h4>;
  }
}
