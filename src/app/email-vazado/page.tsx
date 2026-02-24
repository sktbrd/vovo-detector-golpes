"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { Mail, CheckCircle, AlertTriangle, Info, Lightbulb, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailVazadoPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    breaches: any[];
    checked: string;
  } | null>(null);

  const handleCheck = async () => {
    if (!email || !email.includes("@")) {
      alert("Digite um e-mail válido");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(
          email
        )}?truncateResponse=false`,
        {
          headers: {
            "User-Agent": "Vovo-Vigilante-Detector",
          },
        }
      );

      if (response.status === 404) {
        // Email não encontrado em vazamentos
        setResult({ breaches: [], checked: email });
      } else if (response.ok) {
        const data = await response.json();
        setResult({ breaches: data, checked: email });
      } else if (response.status === 429) {
        alert(
          "Muitas requisições. Aguarde alguns segundos e tente novamente."
        );
      } else {
        alert("Erro ao verificar. Tente novamente.");
      }
    } catch (error) {
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Email Vazado?"
      description="Descubra se seu e-mail foi exposto em vazamentos de dados"
      Icon={Mail}
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
            <strong>A Vovó fala:</strong> "Vem cá, querido! Deixa eu verificar se algum bandido roubou seus dados por aí. A vovó tem contatos que sabem de tudo!"
          </p>
        </motion.div>

        <label className="block text-gray-700 font-medium mb-3">
          Digite seu e-mail:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
        />

        <motion.button
          onClick={handleCheck}
          disabled={loading || !email}
          className="w-full mt-4 bg-purple-600 disabled:bg-purple-300 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              </svg>
              Verificando...
            </span>
          ) : (
            "Verificar E-mail"
          )}
        </motion.button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6"
          >
            {result.breaches.length === 0 ? (
              <div className="p-6 rounded-xl border-2 bg-green-50 border-green-300">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-green-800">
                      Nenhum vazamento encontrado!
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-mono">{result.checked}</span>
                    </p>
                  </div>
                </div>
                <p className="text-green-700">
                  Seu e-mail não aparece em nenhum vazamento conhecido até o
                  momento. Mas fique atento!
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-xl border-2 bg-red-50 border-red-300">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-red-800">
                      {result.breaches.length} vazamento
                      {result.breaches.length > 1 ? "s" : ""} encontrado
                      {result.breaches.length > 1 ? "s" : ""}!
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-mono">{result.checked}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  {result.breaches.map((breach: any) => (
                    <div
                      key={breach.Name}
                      className="bg-white border border-red-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-red-800">
                          {breach.Title || breach.Name}
                        </h4>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {new Date(breach.BreachDate).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {breach.Description}
                      </p>
                      <div className="text-xs text-gray-600">
                        <strong>Dados vazados:</strong>{" "}
                        {breach.DataClasses.join(", ")}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <strong>Contas afetadas:</strong>{" "}
                        {breach.PwnCount.toLocaleString("pt-BR")}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-red-100 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">
                    O que fazer AGORA:
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Troque IMEDIATAMENTE a senha deste e-mail</li>
                    <li>
                      Troque senhas de TODOS os sites que usam este e-mail
                    </li>
                    <li>Ative autenticação em 2 fatores onde possível</li>
                    <li>Monitore suas contas bancárias</li>
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Info className="w-6 h-6" />
          Como Funciona
        </h3>
        <div className="space-y-3 text-gray-700">
          <p>
            Esta ferramenta consulta o banco de dados do{" "}
            <strong>Have I Been Pwned</strong>, que reúne bilhões de registros
            de vazamentos de dados de empresas como:
          </p>
          <ul className="list-disc pl-6 text-sm">
            <li>LinkedIn, Facebook, Twitter</li>
            <li>Adobe, Dropbox, Yahoo</li>
            <li>Lojas online, bancos de dados hackeados</li>
            <li>E centenas de outros vazamentos</li>
          </ul>
          <p className="text-sm mt-4 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span><strong>Privacidade:</strong> Seu e-mail é consultado de forma
            segura e não é armazenado.</span>
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          Dicas de Proteção
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">1.</span>
            <span>
              <strong>Use senhas únicas</strong> - nunca reutilize a mesma senha
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">2.</span>
            <span>
              <strong>Gerenciador de senhas</strong> - 1Password, Bitwarden,
              LastPass
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">3.</span>
            <span>
              <strong>Autenticação em 2 fatores</strong> - sempre que disponível
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">4.</span>
            <span>
              <strong>E-mails descartáveis</strong> - para cadastros não
              importantes
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-600 font-bold">5.</span>
            <span>
              <strong>Monitore regularmente</strong> - verifique a cada 3-6 meses
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
