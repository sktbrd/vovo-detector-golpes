"use client";

import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

interface SmallResultIconProps {
  type: "safe" | "suspicious" | "scam";
}

export default function SmallResultIcon({ type }: SmallResultIconProps) {
  if (type === "safe") {
    return <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" strokeWidth={2} />;
  }

  if (type === "suspicious") {
    return <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" strokeWidth={2} />;
  }

  return <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" strokeWidth={2} />;
}
