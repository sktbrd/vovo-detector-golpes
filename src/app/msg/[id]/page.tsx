"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, AlertCircle, CheckCircle, XCircle, Eye, Home } from "lucide-react";
import { decryptMessage } from "@/lib/crypto";
import Navbar from "@/app/components/Navbar";

type Status = "loading" | "decrypting" | "success" | "error" | "not-found" | "expired";

export default function ReadMessagePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    loadMessage();
  }, []);

  const loadMessage = async () => {
    try {
      // 1. Get key from URL fragment (after #)
      const hash = window.location.hash.slice(1); // remove #
      if (!hash) {
        setStatus("error");
        setError("Link inválido - chave de decriptação ausente");
        return;
      }

      setStatus("loading");

      // 2. Fetch encrypted message from server
      const response = await fetch(`/api/msg/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          setStatus("not-found");
          setError("Mensagem não encontrada ou já foi lida");
        } else if (response.status === 410) {
          setStatus("expired");
          setError("Mensagem expirada");
        } else {
          setStatus("error");
          setError("Erro ao carregar mensagem");
        }
        return;
      }

      const { ciphertext, iv } = await response.json();

      // 3. Decrypt in browser
      setStatus("decrypting");
      const decrypted = await decryptMessage(ciphertext, iv, hash);
      
      setMessage(decrypted);
      setStatus("success");
    } catch (error) {
      console.error("Decryption error:", error);
      setStatus("error");
      setError("Falha ao descriptografar mensagem. O link pode estar corrompido.");
    }
  };

  const revealMessage = () => {
    setRevealed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Loading */}
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center"
            >
              <Lock className="w-16 h-16 text-teal-500 mx-auto mb-4 animate-pulse" strokeWidth={2.5} />
              <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase">
                Carregando...
              </h2>
              <p className="text-slate-700 font-medium">
                Buscando mensagem criptografada...
              </p>
            </motion.div>
          )}

          {/* Decrypting */}
          {status === "decrypting" && (
            <motion.div
              key="decrypting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center"
            >
              <Lock className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-spin" strokeWidth={2.5} />
              <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase">
                Descriptografando...
              </h2>
              <p className="text-slate-700 font-medium">
                Decifrando sua mensagem segura...
              </p>
            </motion.div>
          )}

          {/* Success */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {!revealed ? (
                <div className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-lime-500 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase text-center">
                    Mensagem Encontrada!
                  </h2>

                  <div className="mb-6 p-4 bg-yellow-50 border-4 border-yellow-500 flex gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div className="text-sm text-slate-800 font-medium">
                      <strong className="text-yellow-700 font-black">Atenção:</strong> Esta mensagem se auto-destruirá após você revelá-la. Certifique-se de estar pronto para ler.
                    </div>
                  </div>

                  <button
                    onClick={revealMessage}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase flex items-center justify-center gap-3"
                  >
                    <Eye className="w-6 h-6" strokeWidth={2.5} />
                    REVELAR MENSAGEM
                  </button>
                </div>
              ) : (
                <div className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-pink-500 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      <Eye className="w-16 h-16 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase text-center">
                    Sua Mensagem Segura
                  </h2>

                  <div className="bg-slate-50 border-4 border-slate-900 p-6 mb-6">
                    <p className="text-xl text-slate-900 font-medium whitespace-pre-wrap break-words">
                      {message}
                    </p>
                  </div>

                  <div className="mb-6 p-4 bg-red-50 border-4 border-red-500 flex gap-3">
                    <XCircle className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <div className="text-sm text-slate-800 font-medium">
                      <strong className="text-red-700 font-black">Mensagem Destruída:</strong> Esta mensagem foi permanentemente excluída dos nossos servidores. Ninguém mais poderá acessá-la.
                    </div>
                  </div>

                  <Link
                    href="/mensagem-segura"
                    className="w-full inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase"
                  >
                    <Home className="w-6 h-6" strokeWidth={2.5} />
                    CRIAR MINHA MENSAGEM
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Not Found */}
          {status === "not-found" && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <XCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase">
                Mensagem Não Encontrada
              </h2>
              <p className="text-slate-700 font-medium mb-6">
                Esta mensagem já foi lida e destruída, ou nunca existiu.
              </p>

              <Link
                href="/mensagem-segura"
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase"
              >
                <Home className="w-6 h-6" strokeWidth={2.5} />
                CRIAR MENSAGEM
              </Link>
            </motion.div>
          )}

          {/* Expired */}
          {status === "expired" && (
            <motion.div
              key="expired"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-yellow-500 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <AlertCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase">
                Mensagem Expirada
              </h2>
              <p className="text-slate-700 font-medium mb-6">
                Esta mensagem atingiu seu tempo limite e foi automaticamente destruída.
              </p>

              <Link
                href="/mensagem-segura"
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase"
              >
                <Home className="w-6 h-6" strokeWidth={2.5} />
                CRIAR MENSAGEM
              </Link>
            </motion.div>
          )}

          {/* Error */}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white border-4 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <XCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase">
                Erro
              </h2>
              <p className="text-slate-700 font-medium mb-6">
                {error || "Não foi possível carregar a mensagem"}
              </p>

              <Link
                href="/mensagem-segura"
                className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase"
              >
                <Home className="w-6 h-6" strokeWidth={2.5} />
                CRIAR MENSAGEM
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
