"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

interface ResultIconProps {
  type: "safe" | "suspicious" | "scam";
}

export default function ResultIcon({ type }: ResultIconProps) {
  if (type === "safe") {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative"
      >
        <CheckCircle2 className="w-16 h-16 text-green-600" strokeWidth={2} />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    );
  }

  if (type === "suspicious") {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative"
      >
        <AlertTriangle className="w-16 h-16 text-yellow-600" strokeWidth={2} />
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <AlertTriangle className="w-16 h-16 text-yellow-400" strokeWidth={2} />
        </motion.div>
      </motion.div>
    );
  }

  // scam
  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{
        scale: 1,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 15,
      }}
      className="relative"
    >
      <ShieldAlert className="w-16 h-16 text-red-600" strokeWidth={2} />
      
      {/* Danger pulse */}
      <motion.div
        className="absolute inset-0 bg-red-500 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Alert rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-red-500 rounded-full"
          animate={{
            scale: [1, 1.8],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.75,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}
