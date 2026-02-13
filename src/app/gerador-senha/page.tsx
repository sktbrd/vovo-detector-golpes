"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { motion } from "framer-motion";

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

    if (strength <= 2) return { label: "Fraca", color: "red", value: 33 };
    if (strength <= 4) return { label: "Média", color: "yellow", value: 66 };
    return { label: "Forte", color: "green", value: 100 };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Gerador de Senha Forte"
      description="Crie senhas seguras e impossíveis de adivinhar"
      emoji="🔐"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        {/* Controls */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Tamanho: <span className="text-purple-600 font-bold">{length}</span>{" "}
            caracteres
          </label>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
            <span className="text-gray-700">Minúsculas (a-z)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
            <span className="text-gray-700">Maiúsculas (A-Z)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
            <span className="text-gray-700">Números (0-9)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 accent-purple-600"
            />
            <span className="text-gray-700">Símbolos (!@#$%)</span>
          </label>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={generatePassword}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg mb-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🔐 Gerar Senha Forte
        </motion.button>

        {/* Result */}
        {password && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Password Display */}
            <div className="relative">
              <div className="bg-gray-50 border-2 border-purple-200 rounded-xl p-4 font-mono text-lg break-all">
                {password}
              </div>
              <button
                onClick={copyPassword}
                className="absolute top-2 right-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {copied ? "✓ Copiado!" : "📋 Copiar"}
              </button>
            </div>

            {/* Strength Meter */}
            {strength && (
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Força da senha:
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      strength.color === "red"
                        ? "text-red-600"
                        : strength.color === "yellow"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {strength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      strength.color === "red"
                        ? "bg-red-500"
                        : strength.color === "yellow"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${strength.value}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          💡 Dicas da Vovó para Senhas Seguras
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span>
              <strong>Mínimo 12 caracteres</strong> - quanto maior, melhor
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span>
              <strong>Nunca reutilize</strong> - senha diferente pra cada site
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span>
              <strong>Use gerenciador de senhas</strong> - como 1Password,
              LastPass ou Bitwarden
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">✓</span>
            <span>
              <strong>Ative autenticação em 2 fatores</strong> - sempre que
              possível
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>Nunca use:</strong> datas de nascimento, nomes, palavras
              comuns, sequências (123456)
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
