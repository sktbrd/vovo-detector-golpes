"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ValidarCPFPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    type: "cpf" | "cnpj";
    formatted: string;
  } | null>(null);

  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    return digit === parseInt(cpf.charAt(10));
  };

  const validateCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]/g, "");
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };

  const formatCPF = (cpf: string): string => {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatCNPJ = (cnpj: string): string => {
    cnpj = cnpj.replace(/[^\d]/g, "");
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  const handleValidate = () => {
    const clean = input.replace(/[^\d]/g, "");

    if (clean.length === 11) {
      const valid = validateCPF(clean);
      setResult({
        valid,
        type: "cpf",
        formatted: formatCPF(clean),
      });
    } else if (clean.length === 14) {
      const valid = validateCNPJ(clean);
      setResult({
        valid,
        type: "cnpj",
        formatted: formatCNPJ(clean),
      });
    } else {
      alert("Digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido");
    }
  };

  return (
    <ToolLayout
      title="Validador CPF/CNPJ"
      description="Valide CPF ou CNPJ instantaneamente"
      Icon={Building2}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        {/* Vovó Message */}
        <motion.div 
          className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-purple-800 italic">
            <strong>A Vovó fala:</strong> "Recebeu um CPF ou CNPJ e quer saber se é válido? Deixa a vovó verificar esses números pra você, meu bem!"
          </p>
        </motion.div>

        <label className="block text-gray-700 font-medium mb-3">
          Digite o CPF ou CNPJ:
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
          onKeyPress={(e) => e.key === "Enter" && handleValidate()}
        />

        <motion.button
          onClick={handleValidate}
          disabled={!input.trim()}
          className="w-full mt-4 bg-purple-600 disabled:bg-purple-300 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Validar
        </motion.button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 rounded-xl border-2 ${
              result.valid
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">
                {result.valid ? "✅" : "❌"}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  result.valid ? "text-green-800" : "text-red-800"
                }`}>
                  {result.valid ? "Válido!" : "Inválido!"}
                </h3>
                <p className="text-gray-600">
                  {result.type.toUpperCase()}:{" "}
                  <span className="font-mono font-bold">{result.formatted}</span>
                </p>
              </div>
            </div>

            {result.valid ? (
              <div>
                <div className={`text-green-700 mb-3`}>
                  <p className="mb-2">Dígitos verificadores corretos</p>
                  <p>Formato válido</p>
                </div>
                <motion.div 
                  className="bg-green-100 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-green-800 text-sm italic">
                    "Ó, que beleza! Esse número tá certinho. A matemática não mente, querido!"
                  </p>
                </motion.div>
              </div>
            ) : (
              <div>
                <div className={`text-red-700 mb-3`}>
                  <p className="mb-2">✗ Dígitos verificadores incorretos</p>
                  <p className="text-sm">
                    Este {result.type.toUpperCase()} não passou na validação oficial
                  </p>
                </div>
                <motion.div 
                  className="bg-red-100 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-800 text-sm italic">
                    "Eita! Esse número tá errado, viu? Ou digitaram errado ou é falso mesmo!"
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4">
          ℹ️ Como Funciona
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>CPF (11 dígitos):</strong> Cadastro de Pessoa Física. Valida
            usando o algoritmo de dígitos verificadores.
          </p>
          <p>
            <strong>CNPJ (14 dígitos):</strong> Cadastro Nacional da Pessoa Jurídica.
            Identifica empresas legalmente registradas.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            ⚠️ <strong>Atenção:</strong> Esta ferramenta apenas VALIDA o formato e
            dígitos verificadores. Não consulta situação cadastral na Receita
            Federal.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-4">
          🚨 Dicas de Segurança
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>NUNCA compartilhe seu CPF/CNPJ</strong> com sites ou pessoas
              desconhecidas
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>Cuidado com golpes</strong> - criminosos pedem CPF fingindo
              ser banco, loja, etc
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">Check</span>
            <span>
              Use o <a href="/" className="text-purple-600 underline font-medium">
                Detector da Vovó
              </a> pra verificar mensagens suspeitas
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
