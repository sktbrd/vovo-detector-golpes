"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import toast, { Toaster } from "react-hot-toast";
import { 
  Search, 
  Trash2, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Clock,
  FileText,
  Lightbulb,
  ChevronRight,
  Heart,
  BookOpen,
  Github
} from "lucide-react";
import AdSenseSlot from "./components/AdSenseSlot";
import Navbar from "./components/Navbar";
import ScanAnimation from "./components/ScanAnimation";
import ResultIcon from "./components/ResultIcons";
import SmallResultIcon from "./components/SmallResultIcon";

type ResultType = "safe" | "suspicious" | "scam";

interface AnalysisResult {
  type: ResultType;
  title: string;
  message: string;
  details: string[];
}

interface HistoryItem {
  id: string;
  message: string;
  result: AnalysisResult;
  timestamp: number;
}

const EXAMPLES = [
  "Parabéns! Você foi selecionado para receber R$5.000. Clique no link para resgatar: bit.ly/xyz123",
  "Seu CPF está em risco! Regularize AGORA ou sua conta será bloqueada em 24h. Ligue: (11) 9999-9999",
  "Oi mãe, meu celular quebrou. Me manda R$500 no pix 123.456.789-00 urgente!",
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vovo-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        // Ignore
      }
    }
  }, []);

  const saveToHistory = (msg: string, res: AnalysisResult) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      message: msg,
      result: res,
      timestamp: Date.now(),
    };
    const updated = [item, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("vovo-history", JSON.stringify(updated));
  };

  const celebrate = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const analyzeMessage = async () => {
    if (!message.trim()) {
      toast.error("Escreva uma mensagem primeiro");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResult(data);
      saveToHistory(message, data);

      setTimeout(() => {
        if (data.type === "safe") {
          celebrate();
          toast.success("Mensagem segura!");
        } else if (data.type === "scam") {
          toast.error("Cuidado! Isso é golpe!");
          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
          }
        } else {
          toast("Fique atento!");
        }
      }, 300);
    } catch {
      const errorResult = {
        type: "suspicious" as ResultType,
        title: "Erro na análise",
        message: "Não foi possível analisar. Tente novamente.",
        details: [],
      };
      setResult(errorResult);
      toast.error("Erro na análise");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setMessage("");
    setResult(null);
    toast("Formulário limpo");
  };

  const loadExample = (example: string) => {
    setMessage(example);
    setResult(null);
    toast("Exemplo carregado! Clique em analisar");
    setTimeout(() => {
      document.getElementById("message")?.focus();
    }, 100);
  };

  const shareResult = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.message}\n\nAnalise feita em: detectordegolpes.com.br`;
    navigator.clipboard.writeText(text);
    toast.success("Resultado copiado!");
  };

  const getResultBg = (type: ResultType) => {
    switch (type) {
      case "scam": return "bg-red-50";
      case "suspicious": return "bg-orange-50";
      case "safe": return "bg-lime-50";
      default: return "bg-white";
    }
  };

  const getResultBorder = (type: ResultType) => {
    switch (type) {
      case "scam": return "border-red-600";
      case "suspicious": return "border-orange-500";
      case "safe": return "border-lime-500";
      default: return "border-slate-900";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#0F172A",
            fontWeight: "600",
            borderRadius: "0px",
            padding: "20px",
            border: "3px solid #0F172A",
            boxShadow: "4px 4px 0px 0px rgba(15,23,42,1)",
          },
        }}
      />
      <Navbar />
      
      {/* HERO - BOLD & ASYMMETRIC */}
      <motion.header 
        className="py-12 px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-left md:text-center">
          <motion.div 
            className="flex justify-start md:justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
          >
            <div className="relative">
              <img 
                src="/vovo-lupa.png" 
                alt="Vovó Detetive" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[6px_6px_0px_rgba(15,23,42,1)]"
              />
              <Heart className="absolute -top-2 -right-2 w-12 h-12 text-pink-500 fill-pink-500 drop-shadow-[3px_3px_0px_rgba(15,23,42,1)]" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4">
            <span className="text-slate-900">DETECTOR</span>
            <span className="block text-teal-600 mt-2 drop-shadow-[2px_2px_0px_rgba(15,23,42,0.3)]">DE GOLPES</span>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-600 mb-8 leading-tight drop-shadow-[1px_1px_0px_rgba(15,23,42,0.2)]">
            A vovó mais esperta da internet 👵
          </p>
          
          <div className="flex gap-3 justify-start md:justify-center flex-wrap">
            <span className="inline-flex items-center px-4 py-2 text-sm md:text-base font-bold bg-teal-500 text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
              🤖 IA AVANÇADA
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm md:text-base font-bold bg-pink-500 text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
              ⚡ RÁPIDO
            </span>
            <span className="inline-flex items-center px-4 py-2 text-sm md:text-base font-bold bg-lime-500 text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
              🔒 PRIVADO
            </span>
          </div>
        </div>
      </motion.header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        
        {/* EXAMPLES - BOLD CARDS */}
        <motion.div 
          className="bg-white border-4 border-slate-900 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Exemplos de Golpes Comuns
          </h3>
          <div className="space-y-3">
            {EXAMPLES.map((example, i) => (
              <button
                key={i}
                onClick={() => loadExample(example)}
                className="w-full text-left p-4 bg-slate-50 border-2 border-slate-900 hover:bg-teal-50 hover:border-teal-500 transition-all text-sm md:text-base font-medium hover:shadow-[2px_2px_0px_0px_rgba(6,182,212,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {example.slice(0, 80)}...
              </button>
            ))}
          </div>
        </motion.div>

        {/* FORM - NEO-BRUTAL */}
        <motion.div
          className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="message" className="block text-2xl md:text-3xl font-black text-slate-900 mb-4 uppercase">
            Cole a mensagem suspeita:
          </label>
          
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Cole aqui a mensagem que você recebeu e quer verificar..."
            className="w-full h-40 md:h-48 p-4 bg-white border-3 border-slate-900 text-lg focus:border-teal-500 focus:ring-4 focus:ring-teal-200 focus:outline-none placeholder:text-slate-400 placeholder:font-semibold resize-none"
            disabled={loading}
          />

          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={analyzeMessage}
              disabled={loading}
              className="flex-1 min-w-[200px] bg-teal-500 text-white px-8 py-4 text-lg md:text-xl font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 transition-all duration-100 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "ANALISANDO..." : "ANALISAR AGORA"}
            </button>
            
            <button
              onClick={clearForm}
              disabled={loading}
              className="bg-white text-slate-900 px-6 py-4 text-lg font-bold border-4 border-slate-900 hover:bg-slate-100 transition-colors uppercase"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* LOADING ANIMATION */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8"
            >
              <ScanAnimation />
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULT - BOLD OFFSET SHADOW */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="relative"
            >
              <div className={`${getResultBg(result.type)} border-4 ${getResultBorder(result.type)} p-8 relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-teal-500 before:to-pink-500 before:translate-x-6 before:translate-y-6 before:-z-10 before:transition-transform before:duration-300 hover:before:translate-x-8 hover:before:translate-y-8`}>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <ResultIcon type={result.type} />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
                      {result.title}
                    </h2>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                </div>

                {result.details.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {result.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-base md:text-lg font-medium">
                        <ChevronRight className="w-5 h-5 flex-shrink-0 mt-1" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={shareResult}
                  className="mt-6 bg-slate-900 text-white px-6 py-3 text-base font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-2 uppercase"
                >
                  <Copy className="w-5 h-5" />
                  Copiar Resultado
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA BLOG - BOLD */}
        <motion.div
          className="mt-12 bg-gradient-to-br from-teal-500 to-pink-500 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="w-12 h-12 text-white" />
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase">
              Aprenda Mais
            </h3>
          </div>
          <p className="text-xl text-white font-medium mb-6">
            Descubra como se proteger de golpes comuns no Brasil
          </p>
          <a
            href="/blog"
            className="inline-block bg-white text-slate-900 px-8 py-4 text-xl font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all uppercase"
          >
            Ver Artigos →
          </a>
        </motion.div>
      </main>
    </div>
  );
}
