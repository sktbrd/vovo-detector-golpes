"use client";

import { motion } from "framer-motion";
import { Shield, Search, AlertTriangle } from "lucide-react";

export default function ScanAnimation() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
      {/* Central Shield Icon */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <Shield className="w-20 h-20 text-purple-600" strokeWidth={1.5} />
          
          {/* Scanning line inside shield */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              y: [-30, 30, -30],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-16 h-0.5 bg-purple-400 rounded-full blur-[1px]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Orbiting Search Icon */}
      <motion.div
        className="absolute"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: 140,
          height: 140,
        }}
      >
        <Search className="w-6 h-6 text-purple-500" strokeWidth={2} />
      </motion.div>

      {/* Radar Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-purple-300 rounded-full"
          initial={{ width: 80, height: 80, opacity: 0.6 }}
          animate={{
            width: 200,
            height: 200,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Particle Dots */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          const radius = 60;
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * radius,
                y: Math.sin((angle * Math.PI) / 180) * radius,
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Status Text */}
      <motion.div
        className="absolute -bottom-2 flex items-center gap-2 text-purple-600 font-medium"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm">Analisando mensagem</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.3,
          }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.6,
          }}
        >
          .
        </motion.span>
      </motion.div>
    </div>
  );
}
