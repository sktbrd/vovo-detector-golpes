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

type ResultType = "safe" | "suspicious" | "scam" | null;

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

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("vovo-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save to history
  const saveToHistory = (msg: string, res: AnalysisResult) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      message: msg,
      result: res,
      timestamp: Date.now(),
    };
    const updated = [item, ...history].slice(0, 5); // Keep last 5
    setHistory(updated);
    localStorage.setItem("vovo-history", JSON.stringify(updated));
  };

  // Confetti celebration
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
      toast.error("Escreva uma mensagem primeiro", {
        icon: <FileText className="w-5 h-5" />,
      });
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

      // Efeitos baseados no resultado
      setTimeout(() => {
        if (data.type === "safe") {
          celebrate();
          toast.success("Mensagem segura!", {
            icon: <CheckCircle className="w-5 h-5" />,
          });
        } else if (data.type === "scam") {
          toast.error("Cuidado! Isso é golpe!", {
            icon: <XCircle className="w-5 h-5" />,
          });
          // Vibração no mobile
          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
          }
        } else {
          toast("Fique atento!", {
            icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
          });
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
      toast.error("Erro na análise", {
        icon: <XCircle className="w-5 h-5" />,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setMessage("");
    setResult(null);
    toast("Formulário limpo", {
      icon: <Trash2 className="w-5 h-5" />,
      duration: 2000,
    });
  };

  const loadExample = (example: string) => {
    setMessage(example);
    setResult(null);
    toast("Exemplo carregado! Clique em verificar", {
      icon: <FileText className="w-5 h-5" />,
      duration: 2500,
    });
    // Scroll suave para o textarea
    setTimeout(() => {
      document.getElementById("message")?.focus();
    }, 100);
  };

  const shareResult = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.message}\n\nAnalise feita em: vovo.app`;
    navigator.clipboard.writeText(text);
    toast.success("Resultado copiado!", {
      icon: <Copy className="w-5 h-5" />,
      duration: 2000,
    });
  };

  const getResultStyles = (type: ResultType) => {
    switch (type) {
      case "scam":
        return "bg-red-50 border-red-300 text-red-800";
      case "suspicious":
        return "bg-yellow-50 border-yellow-300 text-yellow-800";
      case "safe":
        return "bg-green-50 border-green-300 text-green-800";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#1f2937",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
        }}
      />
      <Navbar />
      
      {/* Header */}
      <motion.header 
        className="py-6 px-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex justify-center mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <img 
            src="/vovo-lupa.png" 
            alt="Vovó Detetive" 
            className="w-32 h-32 object-contain"
          />
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold text-purple-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Vovó
        </motion.h1>
        <motion.p 
          className="text-purple-600 mt-2 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Deixa a vovó dar uma olhada nessa mensagem...
        </motion.p>
      </motion.header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Top Ad */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <AdSenseSlot slot="top-banner" className="max-w-full" />
        </motion.div>

        {/* Examples Section */}
        <motion.div 
          className="bg-white/80 rounded-2xl shadow-md p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <h3 className="text-sm font-bold text-purple-800 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Exemplos de golpes comuns:
          </h3>
          <div className="space-y-2">
            {EXAMPLES.map((example, i) => (
              <motion.button
                key={i}
                onClick={() => loadExample(example)}
                className="w-full text-left text-sm p-3 bg-purple-50 rounded-lg transition-colors border border-purple-200 text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgb(243 232 255)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {example.slice(0, 80)}
                {example.length > 80 ? "..." : ""}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Input Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <label
            htmlFor="message"
            className="block text-gray-700 font-medium mb-3"
          >
            Cole aqui a mensagem suspeita:
          </label>
          <textarea
            id="message"
            className="w-full h-40 p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-gray-800"
            placeholder="Ex: Parabéns! Você foi selecionado para receber R$500. Clique aqui para resgatar..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex gap-3 mt-4">
            <motion.button
              onClick={analyzeMessage}
              disabled={loading || !message.trim()}
              className="flex-1 bg-purple-600 disabled:bg-purple-300 text-white font-bold py-4 px-6 rounded-xl text-lg"
              animate={
                message.trim() && !loading
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(126, 34, 206, 0.7)",
                        "0 0 0 10px rgba(126, 34, 206, 0)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{ scale: 1.02, backgroundColor: "rgb(126 34 206)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.span 
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.svg 
                    className="h-5 w-5" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1, 
                      ease: "linear" 
                    }}
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </motion.svg>
                  Vovó analisando...
                </motion.span>
              ) : (
                <>
                  <Search className="w-5 h-5 inline mr-2" />
                  Verificar mensagem
                </>
              )}
            </motion.button>
            <AnimatePresence>
              {message && (
                <motion.button
                  onClick={clearForm}
                  className="px-6 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl"
                  title="Limpar"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgb(209 213 219)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ScanAnimation />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              className={`rounded-2xl border-2 p-6 mb-6 ${getResultStyles(result.type)}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: result.type === "scam" ? [0, -10, 10, -10, 10, -5, 5, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                x: { duration: 0.5, delay: 0.2 },
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <ResultIcon type={result.type} />
                <motion.button
                  onClick={shareResult}
                  className="px-4 py-2 bg-white/30 rounded-lg text-sm font-medium flex items-center gap-2"
                  title="Compartilhar resultado"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(255,255,255,0.5)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className="w-4 h-4" />
                  Copiar
                </motion.button>
              </div>
              <motion.h2 
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {result.title}
              </motion.h2>
              <motion.p 
                className="text-lg mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {result.message}
              </motion.p>
              {result.details.length > 0 && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-current/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="font-medium mb-2">A vovó notou:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mid Ad */}
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <AdSenseSlot slot="mid-banner" className="max-w-full" />
          </motion.div>
        )}

        {/* History Section */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Últimas Análises
              </h3>
              <div className="space-y-3">
                {history.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setMessage(item.message);
                      setResult(item.result);
                    }}
                    className="w-full text-left p-3 bg-purple-50 rounded-lg border border-purple-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgb(243 232 255)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <SmallResultIcon type={item.result.type} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.result.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.message.slice(0, 60)}...
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Dicas da Vovó
          </h3>
          <ul className="space-y-3 text-gray-600">
            {[
              "Bancos nunca pedem senha ou código por WhatsApp",
              "Desconfie de promoções boas demais pra ser verdade",
              "Links encurtados são um sinal de alerta",
              "Na dúvida, ligue pro número oficial da empresa"
            ].map((tip, i) => (
              <motion.li 
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ChevronRight className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 fill-purple-600" /> para proteger você
          </p>
          <div className="flex justify-center gap-6 mb-4 flex-wrap">
            <a
              href="/blog"
              className="hover:text-purple-800 underline font-medium flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              Blog
            </a>
            <a
              href="/privacy"
              className="hover:text-purple-800 underline"
            >
              Política de Privacidade
            </a>
            <a
              href="/terms"
              className="hover:text-purple-800 underline"
            >
              Termos de Uso
            </a>
            <a
              href="https://github.com/sktbrd/vovo-detector-golpes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-800 underline flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
          <p className="text-xs text-purple-500">
            © 2026 Vovó Detector de Golpes. Todos os direitos reservados.
          </p>
          <p className="text-xs text-purple-500 mt-2">
            Este site usa cookies para melhorar sua experiência.
          </p>
        </div>
      </footer>
    </div>
  );
}
