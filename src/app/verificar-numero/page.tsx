"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, AlertTriangle, CheckCircle, Info, Clock, MapPin, Wifi, Flag, X } from "lucide-react";
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
  spam?: {
    score: number;
    sources: {
      tellows?: { score: number; reports: number };
      local?: { reports: number; confidence: number; categories: Record<string, number> };
    };
    category?: string;
  };
  message?: string;
  error?: string;
}

export default function VerificarNumeroPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [rateLimit, setRateLimit] = useState<{ remaining: number; resetAt: number } | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCategory, setReportCategory] = useState<string>("golpe");
  const [reportComment, setReportComment] = useState("");
  const [reportingSpam, setReportingSpam] = useState(false);

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

  const handleReportSpam = async () => {
    if (!result?.number) return;
    
    setReportingSpam(true);
    
    try {
      const response = await fetch("/api/phone/spam/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: result.number,
          category: reportCategory,
          comment: reportComment.trim() || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Denúncia registrada! Obrigado por ajudar a comunidade.");
        setShowReportModal(false);
        setReportComment("");
        // Refresh verification to show updated stats
        handleVerify();
      } else {
        toast.error(data.error || "Erro ao registrar denúncia");
      }
    } catch (error) {
      toast.error("Erro ao processar denúncia");
    } finally {
      setReportingSpam(false);
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

                  {/* Spam Info */}
                  {result.spam && result.spam.score > 0 && (
                    <div className="mt-6 bg-red-50 border-4 border-red-500 p-4">
                      <h4 className="font-black text-slate-900 uppercase text-sm mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={2.5} />
                        Denúncias de Spam
                      </h4>
                      <div className="space-y-3">
                        {result.spam.sources.tellows && (
                          <div className="bg-white border-2 border-red-300 p-3">
                            <p className="text-slate-900 font-bold text-sm">
                              📊 Tellows: {result.spam.sources.tellows.reports} denúncias
                            </p>
                            <p className="text-slate-600 text-xs mt-1">
                              Score: {result.spam.sources.tellows.score}/100
                            </p>
                          </div>
                        )}
                        {result.spam.sources.local && result.spam.sources.local.reports > 0 && (
                          <div className="bg-white border-2 border-red-300 p-3">
                            <p className="text-slate-900 font-bold text-sm">
                              🛡️ Vovó Detector: {result.spam.sources.local.reports} denúncias
                            </p>
                            {result.spam.category && (
                              <p className="text-slate-600 text-xs mt-1">
                                Categoria principal: {result.spam.category}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Report Button */}
                  {!result.isUsefulNumber && (
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-black py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-sm uppercase flex items-center justify-center gap-2"
                    >
                      <Flag className="w-5 h-5" strokeWidth={2.5} />
                      Reportar como Spam/Golpe
                    </button>
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

      {/* Report Spam Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-4 border-slate-900 p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Reportar Número
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-2 hover:bg-slate-100 border-2 border-slate-900"
                >
                  <X className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>

              <p className="text-slate-700 font-medium mb-4">
                Número: <strong className="font-black">{result?.number}</strong>
              </p>

              <div className="mb-4">
                <label className="block text-slate-900 font-black mb-2 uppercase text-sm">
                  Categoria:
                </label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  className="w-full p-3 border-4 border-slate-900 bg-white font-bold"
                  disabled={reportingSpam}
                >
                  <option value="golpe">Golpe / Fraude</option>
                  <option value="telemarketing">Telemarketing</option>
                  <option value="cobranca">Cobrança Abusiva</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-slate-900 font-black mb-2 uppercase text-sm">
                  Comentário (opcional):
                </label>
                <textarea
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  placeholder="Descreva o que aconteceu..."
                  className="w-full p-3 border-4 border-slate-900 bg-slate-50 font-medium resize-none"
                  rows={3}
                  maxLength={500}
                  disabled={reportingSpam}
                />
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {reportComment.length}/500 caracteres
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  disabled={reportingSpam}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-black py-3 border-3 border-slate-900 uppercase disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReportSpam}
                  disabled={reportingSpam}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-3 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase disabled:opacity-50"
                >
                  {reportingSpam ? "ENVIANDO..." : "REPORTAR"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolLayout>
  );
}
