"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Copy, Check, AlertCircle, Clock } from "lucide-react";
import { generateKey, encryptMessage, generateUUID } from "@/lib/crypto";
import toast, { Toaster } from "react-hot-toast";

export default function MensagemSeguraPage() {
  const [message, setMessage] = useState("");
  const [ttl, setTtl] = useState(24); // hours
  const [loading, setLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const createSecureMessage = async () => {
    if (!message.trim()) {
      toast.error("Escreva uma mensagem primeiro!");
      return;
    }

    setLoading(true);

    try {
      // 1. Generate encryption key
      const key = await generateKey();

      // 2. Encrypt message in browser
      const { ciphertext, iv } = await encryptMessage(message, key);

      // 3. Send encrypted data to server
      const response = await fetch("/api/msg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ciphertext,
          iv,
          ttl: ttl * 60 * 60 * 1000, // convert hours to ms
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create message");
      }

      const { id } = await response.json();

      // 4. Generate URL with key in fragment
      const url = `${window.location.origin}/msg/${id}#${key}`;
      setGeneratedUrl(url);
      toast.success("Mensagem segura criada!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    toast.success("Link copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setMessage("");
    setGeneratedUrl("");
    setCopied(false);
  };

  return (
    <ToolLayout
      title="Mensagem Segura"
      description="Envie mensagens que se auto-destroem após leitura"
      Icon={Lock}
    >
      <Toaster position="top-center" />

      <div className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-8">
        {/* Vovó Message */}
        <motion.div
          className="mb-6 p-4 bg-pink-50 border-l-4 border-pink-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-800 font-medium">
            <strong className="text-pink-700">A Vovó fala:</strong> "Quer mandar uma senha ou informação secreta? Use isso aqui, querido! A mensagem some depois que a pessoa lê. Nem a vovó consegue ver o que você escreveu! 🔒"
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!generatedUrl ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Message Input */}
              <label className="block text-slate-900 font-black mb-3 text-lg uppercase">
                Sua Mensagem Secreta:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite a mensagem que você quer enviar de forma segura..."
                className="w-full h-40 p-4 bg-slate-50 border-4 border-slate-900 focus:border-teal-500 focus:ring-4 focus:ring-teal-200 focus:outline-none text-lg font-medium resize-none"
                disabled={loading}
              />

              {/* TTL Selector */}
              <div className="mt-6">
                <label className="block text-slate-900 font-black mb-3 text-lg uppercase flex items-center gap-2">
                  <Clock className="w-5 h-5" strokeWidth={2.5} />
                  Expira em:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "1 Hora", value: 1 },
                    { label: "24 Horas", value: 24 },
                    { label: "7 Dias", value: 168 },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTtl(option.value)}
                      className={`p-4 font-black border-4 border-slate-900 transition-all uppercase ${
                        ttl === option.value
                          ? "bg-teal-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Create Button */}
              <motion.button
                onClick={createSecureMessage}
                disabled={loading || !message.trim()}
                className="w-full mt-6 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all text-lg uppercase tracking-wide"
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? "CRIANDO..." : "CRIAR LINK SEGURO"}
              </motion.button>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-lime-50 border-4 border-lime-500 flex gap-3">
                <AlertCircle className="w-6 h-6 text-lime-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div className="text-sm text-slate-800 font-medium">
                  <strong className="text-lime-700 font-black">Como funciona:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Sua mensagem é criptografada no seu navegador (AES-256)</li>
                    <li>Apenas quem tiver o link pode ler</li>
                    <li>Após a leitura, a mensagem é destruída para sempre</li>
                    <li>Nem nós conseguimos ver o conteúdo</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Success Message */}
              <div className="mb-6 p-6 bg-lime-50 border-4 border-lime-500">
                <div className="flex items-center gap-3 mb-3">
                  <Check className="w-8 h-8 text-lime-600" strokeWidth={2.5} />
                  <h3 className="text-2xl font-black text-slate-900 uppercase">
                    Link Criado!
                  </h3>
                </div>
                <p className="text-slate-800 font-medium">
                  Copie o link abaixo e envie para quem você quiser. A mensagem será destruída após a primeira leitura.
                </p>
              </div>

              {/* URL Display */}
              <div className="relative">
                <div className="bg-slate-50 border-4 border-slate-900 p-4 font-mono text-sm md:text-base break-all font-bold text-slate-900">
                  {generatedUrl}
                </div>
                <button
                  onClick={copyUrl}
                  className="absolute top-2 right-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" strokeWidth={3} />
                      COPIADO!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" strokeWidth={3} />
                      COPIAR
                    </>
                  )}
                </button>
              </div>

              {/* Warning */}
              <div className="mt-6 p-4 bg-red-50 border-4 border-red-500 flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <div className="text-sm text-slate-800 font-medium">
                  <strong className="text-red-700 font-black">Atenção:</strong> Guarde bem esse link! Depois que alguém abrir, a mensagem será destruída e não poderá ser recuperada.
                </div>
              </div>

              {/* New Message Button */}
              <button
                onClick={reset}
                className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase"
              >
                CRIAR NOVA MENSAGEM
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Use Cases */}
      <div className="bg-teal-50 border-4 border-teal-500 p-6 shadow-[6px_6px_0px_0px_rgba(20,184,166,1)]">
        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase flex items-center gap-2">
          💡 Quando Usar
        </h3>
        <ul className="space-y-3 text-slate-800 font-medium">
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Enviar senhas</strong> - compartilhe senhas sem deixar rastro em e-mail ou chat
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Informações sensíveis</strong> - CPF, RG, dados bancários temporários
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Códigos de verificação</strong> - tokens, 2FA, códigos temporários
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Competições</strong> - envie a resposta para vários amigos, quem ler primeiro ganha!
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
