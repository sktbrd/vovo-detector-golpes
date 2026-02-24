"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { motion } from "framer-motion";
import { KeyRound, AlertTriangle, CheckCircle } from "lucide-react";

export default function GeradorSenhaPage() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      alert("Selecione pelo menos um tipo de caractere!");
      return;
    }

    let result = "";
    const crypto = window.crypto || (window as any).msCrypto;
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }

    setPassword(result);
    setCopied(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (!password) return null;
    const len = password.length;
    let strength = 0;

    if (len >= 12) strength++;
    if (len >= 16) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "FRACA", color: "red", value: 33 };
    if (strength <= 4) return { label: "MÉDIA", color: "yellow", value: 66 };
    return { label: "FORTE", color: "green", value: 100 };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Gerador de Senha"
      description="Crie senhas seguras e impossíveis de adivinhar"
      Icon={KeyRound}
    >
      <div className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-8">
        {/* Vovó Message - Neo-Brutal */}
        <motion.div 
          className="mb-6 p-4 bg-lime-50 border-l-4 border-lime-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-800 font-medium">
            <strong className="text-lime-700">A Vovó fala:</strong> "Uma senha forte é como a chave da sua casa, querido. Quanto mais complicada, mais segura! Deixa eu criar uma bem forte pra você."
          </p>
        </motion.div>

        {/* Controls */}
        <div className="mb-6">
          <label className="block text-slate-900 font-black mb-3 text-lg uppercase">
            Tamanho: <span className="text-teal-600">{length}</span> caracteres
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-3 bg-slate-200 appearance-none cursor-pointer accent-teal-500 border-2 border-slate-900"
          />
        </div>

        {/* Options - Neo-Brutal Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border-2 border-slate-900 hover:bg-teal-50 transition-colors">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-5 h-5 accent-teal-600 border-2 border-slate-900"
            />
            <span className="text-slate-900 font-bold">Minúsculas (a-z)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border-2 border-slate-900 hover:bg-teal-50 transition-colors">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-5 h-5 accent-teal-600 border-2 border-slate-900"
            />
            <span className="text-slate-900 font-bold">Maiúsculas (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border-2 border-slate-900 hover:bg-teal-50 transition-colors">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 accent-teal-600 border-2 border-slate-900"
            />
            <span className="text-slate-900 font-bold">Números (0-9)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border-2 border-slate-900 hover:bg-teal-50 transition-colors">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 accent-teal-600 border-2 border-slate-900"
            />
            <span className="text-slate-900 font-bold">Símbolos (!@#$%)</span>
          </label>
        </div>

        {/* Generate Button - Neo-Brutal */}
        <motion.button
          onClick={generatePassword}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all text-lg uppercase tracking-wide mb-6"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          Gerar Senha Forte
        </motion.button>

        {/* Result */}
        {password && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Password Display - Neo-Brutal */}
            <div className="relative">
              <div className="bg-slate-50 border-4 border-slate-900 p-4 font-mono text-lg md:text-xl break-all font-bold text-slate-900">
                {password}
              </div>
              <button
                onClick={copyPassword}
                className="absolute top-2 right-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold text-sm uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {copied ? "✓ Copiado!" : "Copiar"}
              </button>
            </div>

            {/* Strength Meter - Neo-Brutal */}
            {strength && (
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-black text-slate-900 uppercase">
                    Força da senha:
                  </span>
                  <span
                    className={`text-sm font-black uppercase ${
                      strength.color === "red"
                        ? "text-red-600"
                        : strength.color === "yellow"
                        ? "text-yellow-600"
                        : "text-lime-600"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-4 border-3 border-black">
                  <div
                    className={`h-full transition-all ${
                      strength.color === "red"
                        ? "bg-red-500"
                        : strength.color === "yellow"
                        ? "bg-yellow-500"
                        : "bg-lime-500"
                    }`}
                    style={{ width: `${strength.value}%` }}
                  />
                </div>
                {/* Vovó Feedback - Neo-Brutal */}
                <motion.div 
                  className={`mt-4 p-4 border-4 border-black ${
                    strength.color === "green" 
                      ? "bg-lime-50"
                      : strength.color === "yellow"
                      ? "bg-yellow-50"
                      : "bg-red-50"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-slate-900 font-bold flex items-start gap-2">
                    {strength.color === "green" 
                      ? <CheckCircle className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                      : <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    }
                    <span>
                      {strength.color === "green" 
                        ? "Muito bem! Essa senha tá forte que nem a vovó! 💪"
                        : strength.color === "yellow"
                        ? "Tá razoável, mas a vovó já viu senha mais forte. Aumenta mais um pouquinho!"
                        : "Ih, querido... essa tá fraquinha. Vamos fazer uma mais forte?"}
                    </span>
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Tips - Neo-Brutal */}
      <div className="bg-lime-50 border-4 border-lime-500 p-6 shadow-[6px_6px_0px_0px_rgba(132,204,22,1)]">
        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase flex items-center gap-2">
          💡 Dicas da Vovó
        </h3>
        <ul className="space-y-3 text-slate-800 font-medium">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Mínimo 12 caracteres</strong> - quanto maior, melhor
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Nunca reutilize</strong> - senha diferente pra cada site
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Use gerenciador de senhas</strong> - como 1Password, LastPass ou Bitwarden
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-lime-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Ative autenticação em 2 fatores</strong> - sempre que possível
            </span>
          </li>
          <li className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Nunca use:</strong> datas de nascimento, nomes, palavras comuns, sequências (123456)
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
