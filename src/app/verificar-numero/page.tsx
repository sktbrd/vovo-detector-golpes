"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, AlertTriangle, CheckCircle, Info, Clock, MapPin, Wifi } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface VerificationResult {
  isValid: boolean;
  isUsefulNumber?: boolean;
  number?: string;
  name?: string;
  category?: string;
  categoryColor?: string;
  description?: string;
  isTollFree?: boolean;
  isShortCode?: boolean;
  details?: {
    ddd: string;
    state: string;
    city: string;
    region: string;
    carrier: string;
    type: string;
    isVoIP: boolean;
  };
  reputation?: {
    trustScore: number;
    risk: "BAIXO" | "MÉDIO" | "ALTO";
    warnings: string[];
  };
  message?: string;
  error?: string;
}

export default function VerificarNumeroPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [rateLimit, setRateLimit] = useState<{ remaining: number; resetAt: number } | null>(null);

  const handleVerify = async () => {
    if (!phone.trim()) {
      toast.error("Digite um número primeiro!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/phone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: phone }),
      });

      // Check rate limit headers
      const remaining = response.headers.get("X-RateLimit-Remaining");
      const resetAt = response.headers.get("X-RateLimit-Reset");
      if (remaining && resetAt) {
        setRateLimit({
          remaining: parseInt(remaining),
          resetAt: parseInt(resetAt),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error(data.message);
          setResult({ isValid: false, error: data.message });
        } else {
          throw new Error(data.error || "Erro desconhecido");
        }
      } else {
        setResult(data);
        if (data.reputation.risk === "ALTO") {
          toast.error("Número suspeito detectado!");
        } else if (data.reputation.risk === "MÉDIO") {
          toast("Fique atento com este número");
        } else {
          toast.success("Número verificado!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao verificar número");
      setResult({
        isValid: false,
        error: "Não foi possível verificar o número. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneInput = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 7) return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    if (cleaned.length <= 11) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, cleaned.length - 4)}-${cleaned.substring(cleaned.length - 4)}`;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  return (
    <ToolLayout
      title="Verificador de Número"
      description="Identifique operadora e valide números de telefone"
      Icon={Smartphone}
    >
      <Toaster position="top-center" />

      <div className="bg-white border-4 border-slate-900 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-8">
        {/* Vovó Message */}
        <motion.div
          className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-900 font-medium">
            <strong className="text-teal-700">A Vovó fala:</strong> "Recebeu ligação ou mensagem de um número desconhecido? Deixa eu dar uma olhada nesse número antes de você responder!"
          </p>
        </motion.div>

        {/* Input */}
        <label className="block text-slate-900 font-black mb-3 text-lg uppercase">
          Número de Telefone:
        </label>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(11) 99999-9999"
          maxLength={15}
          className="w-full p-4 bg-slate-50 border-4 border-slate-900 focus:border-teal-500 focus:ring-4 focus:ring-teal-200 focus:outline-none text-lg font-bold"
          onKeyPress={(e) => e.key === "Enter" && handleVerify()}
          disabled={loading}
        />

        {/* Rate Limit Info */}
        {rateLimit && rateLimit.remaining < 5 && (
          <div className="mt-3 p-3 bg-yellow-50 border-3 border-yellow-500 flex items-center gap-2 text-sm font-bold text-slate-800">
            <Clock className="w-4 h-4 text-yellow-600" strokeWidth={3} />
            <span>Você tem {rateLimit.remaining} verificações restantes nesta hora</span>
          </div>
        )}

        {/* Verify Button */}
        <motion.button
          onClick={handleVerify}
          disabled={loading || !phone.trim()}
          className="w-full mt-6 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-black py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 transition-all text-lg uppercase tracking-wide"
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? "VERIFICANDO..." : "VERIFICAR NÚMERO"}
        </motion.button>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              {result.error ? (
                <div className="bg-red-50 border-4 border-red-500 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-8 h-8 text-red-600" strokeWidth={2.5} />
                    <h3 className="text-2xl font-black text-slate-900 uppercase">
                      Erro
                    </h3>
                  </div>
                  <p className="text-slate-800 font-medium">{result.error}</p>
                </div>
              ) : result.isUsefulNumber ? (
                /* Useful Number Display */
                <div className={`border-4 p-6 ${
                  result.categoryColor === 'red' ? 'bg-red-50 border-red-500' :
                  result.categoryColor === 'blue' ? 'bg-blue-50 border-blue-500' :
                  result.categoryColor === 'green' ? 'bg-lime-50 border-lime-500' :
                  result.categoryColor === 'purple' ? 'bg-purple-50 border-purple-500' :
                  'bg-teal-50 border-teal-500'
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className={`w-12 h-12 ${
                      result.categoryColor === 'red' ? 'text-red-600' :
                      result.categoryColor === 'blue' ? 'text-blue-600' :
                      result.categoryColor === 'green' ? 'text-lime-600' :
                      result.categoryColor === 'purple' ? 'text-purple-600' :
                      'text-teal-600'
                    }`} strokeWidth={2.5} />
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase">
                        {result.number}
                      </h3>
                      <p className="text-xl font-black text-slate-900 mt-1">
                        {result.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white border-3 border-slate-900 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-4 py-2 font-black text-white border-3 border-black uppercase text-sm ${
                          result.categoryColor === 'red' ? 'bg-red-500' :
                          result.categoryColor === 'blue' ? 'bg-blue-500' :
                          result.categoryColor === 'green' ? 'bg-lime-500' :
                          result.categoryColor === 'purple' ? 'bg-purple-500' :
                          'bg-teal-500'
                        }`}>
                          {result.category}
                        </span>
                        {result.isTollFree && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 border-2 border-green-500 font-black text-xs uppercase">
                            LIGAÇÃO GRATUITA
                          </span>
                        )}
                        {result.isShortCode && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 border-2 border-blue-500 font-black text-xs uppercase">
                            CÓDIGO CURTO
                          </span>
                        )}
                      </div>
                      <p className="text-slate-900 font-bold text-lg">
                        {result.description}
                      </p>
                    </div>

                    <div className="bg-white border-3 border-slate-900 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-lime-600" strokeWidth={2.5} />
                        <span className="font-black text-slate-900 uppercase text-sm">Verificação</span>
                      </div>
                      <p className="text-slate-800 font-bold">
                        ✅ Número oficial verificado
                      </p>
                      <p className="text-slate-600 font-medium text-sm mt-1">
                        Este é um número legítimo de serviço público ou instituição reconhecida.
                      </p>
                    </div>
                  </div>
                </div>
              ) : result.isValid && result.details && result.reputation ? (
                <div className={`border-4 p-6 ${
                  result.reputation.risk === "ALTO"
                    ? "bg-red-50 border-red-500"
                    : result.reputation.risk === "MÉDIO"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-lime-50 border-lime-500"
                }`}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    {result.reputation.risk === "ALTO" ? (
                      <AlertTriangle className="w-8 h-8 text-red-600" strokeWidth={2.5} />
                    ) : result.reputation.risk === "MÉDIO" ? (
                      <Info className="w-8 h-8 text-yellow-600" strokeWidth={2.5} />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-lime-600" strokeWidth={2.5} />
                    )}
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase">
                        {result.number}
                      </h3>
                      <p className={`text-sm font-black uppercase ${
                        result.reputation.risk === "ALTO"
                          ? "text-red-700"
                          : result.reputation.risk === "MÉDIO"
                          ? "text-yellow-700"
                          : "text-lime-700"
                      }`}>
                        Risco: {result.reputation.risk} ({result.reputation.trustScore}% confiável)
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white border-3 border-slate-900 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-teal-600" strokeWidth={2.5} />
                        <span className="font-black text-slate-900 uppercase text-sm">Localização</span>
                      </div>
                      <p className="text-slate-800 font-bold">
                        {result.details.city} - {result.details.state}
                      </p>
                      <p className="text-slate-600 font-medium text-sm">
                        DDD {result.details.ddd} • {result.details.region}
                      </p>
                    </div>

                    <div className="bg-white border-3 border-slate-900 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone className="w-5 h-5 text-teal-600" strokeWidth={2.5} />
                        <span className="font-black text-slate-900 uppercase text-sm">Operadora</span>
                      </div>
                      <p className="text-slate-800 font-bold">
                        {result.details.carrier}
                      </p>
                      <p className="text-slate-600 font-medium text-sm">
                        Tipo: {result.details.type}
                      </p>
                    </div>

                    {result.details.isVoIP && (
                      <div className="bg-white border-3 border-slate-900 p-4 md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Wifi className="w-5 h-5 text-yellow-600" strokeWidth={2.5} />
                          <span className="font-black text-slate-900 uppercase text-sm">Tipo Especial</span>
                        </div>
                        <p className="text-slate-800 font-bold">
                          Número VoIP / Telefonia Digital
                        </p>
                        <p className="text-slate-600 font-medium text-sm">
                          Comum em call centers e alguns tipos de golpes
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Warnings */}
                  {result.reputation.warnings.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-black text-slate-900 uppercase text-sm mb-3">
                        ⚠️ Alertas:
                      </h4>
                      {result.reputation.warnings.map((warning, i) => (
                        <div key={i} className="bg-white border-3 border-slate-900 p-3 flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          <span className="text-slate-800 font-medium">{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message */}
                  {result.message && (
                    <div className="mt-6 p-4 bg-white border-3 border-slate-900">
                      <p className="text-slate-900 font-bold">{result.message}</p>
                    </div>
                  )}
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="bg-teal-50 border-4 border-teal-500 p-6 shadow-[6px_6px_0px_0px_rgba(20,184,166,1)]">
        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase flex items-center gap-2">
          💡 Como Usar
        </h3>
        <ul className="space-y-3 text-slate-800 font-medium">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Digite o número completo</strong> com DDD (11 dígitos para móvel)
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Veja a operadora e localização</strong> do número
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Identifique números suspeitos</strong> antes de responder
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
            <span>
              <strong className="font-black">Limite gratuito:</strong> 10 verificações por hora
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
