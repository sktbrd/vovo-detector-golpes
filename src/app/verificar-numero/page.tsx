"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function VerificarNumeroPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    formatted: string;
    ddd: string;
    state: string;
    region: string;
    type: "mobile" | "fixo";
    operator?: string;
    suspicious: boolean;
  } | null>(null);

  const ddds: Record<string, { state: string; region: string }> = {
    "11": { state: "SP", region: "São Paulo (capital e região)" },
    "12": { state: "SP", region: "Vale do Paraíba" },
    "13": { state: "SP", region: "Baixada Santista" },
    "14": { state: "SP", region: "Bauru e região" },
    "15": { state: "SP", region: "Sorocaba e região" },
    "16": { state: "SP", region: "Ribeirão Preto e região" },
    "17": { state: "SP", region: "São José do Rio Preto" },
    "18": { state: "SP", region: "Presidente Prudente" },
    "19": { state: "SP", region: "Campinas e região" },
    "21": { state: "RJ", region: "Rio de Janeiro (capital)" },
    "22": { state: "RJ", region: "Norte Fluminense" },
    "24": { state: "RJ", region: "Serra Fluminense" },
    "27": { state: "ES", region: "Espírito Santo" },
    "28": { state: "ES", region: "Sul do Espírito Santo" },
    "31": { state: "MG", region: "Belo Horizonte" },
    "32": { state: "MG", region: "Juiz de Fora" },
    "33": { state: "MG", region: "Governador Valadares" },
    "34": { state: "MG", region: "Uberlândia" },
    "35": { state: "MG", region: "Poços de Caldas" },
    "37": { state: "MG", region: "Divinópolis" },
    "38": { state: "MG", region: "Montes Claros" },
    "41": { state: "PR", region: "Curitiba" },
    "42": { state: "PR", region: "Ponta Grossa" },
    "43": { state: "PR", region: "Londrina" },
    "44": { state: "PR", region: "Maringá" },
    "45": { state: "PR", region: "Foz do Iguaçu" },
    "46": { state: "PR", region: "Pato Branco" },
    "47": { state: "SC", region: "Joinville" },
    "48": { state: "SC", region: "Florianópolis" },
    "49": { state: "SC", region: "Chapecó" },
    "51": { state: "RS", region: "Porto Alegre" },
    "53": { state: "RS", region: "Pelotas" },
    "54": { state: "RS", region: "Caxias do Sul" },
    "55": { state: "RS", region: "Santa Maria" },
    "61": { state: "DF", region: "Brasília" },
    "62": { state: "GO", region: "Goiânia" },
    "63": { state: "TO", region: "Tocantins" },
    "64": { state: "GO", region: "Rio Verde" },
    "65": { state: "MT", region: "Cuiabá" },
    "66": { state: "MT", region: "Rondonópolis" },
    "67": { state: "MS", region: "Campo Grande" },
    "68": { state: "AC", region: "Acre" },
    "69": { state: "RO", region: "Rondônia" },
    "71": { state: "BA", region: "Salvador" },
    "73": { state: "BA", region: "Ilhéus" },
    "74": { state: "BA", region: "Juazeiro" },
    "75": { state: "BA", region: "Feira de Santana" },
    "77": { state: "BA", region: "Barreiras" },
    "79": { state: "SE", region: "Sergipe" },
    "81": { state: "PE", region: "Recife" },
    "82": { state: "AL", region: "Alagoas" },
    "83": { state: "PB", region: "Paraíba" },
    "84": { state: "RN", region: "Rio Grande do Norte" },
    "85": { state: "CE", region: "Fortaleza" },
    "86": { state: "PI", region: "Teresina" },
    "87": { state: "PE", region: "Petrolina" },
    "88": { state: "CE", region: "Juazeiro do Norte" },
    "89": { state: "PI", region: "Picos" },
    "91": { state: "PA", region: "Belém" },
    "92": { state: "AM", region: "Manaus" },
    "93": { state: "PA", region: "Santarém" },
    "94": { state: "PA", region: "Marabá" },
    "95": { state: "RR", region: "Roraima" },
    "96": { state: "AP", region: "Amapá" },
    "97": { state: "AM", region: "Interior do Amazonas" },
    "98": { state: "MA", region: "São Luís" },
    "99": { state: "MA", region: "Imperatriz" },
  };

  const handleVerify = () => {
    const clean = input.replace(/[^\d]/g, "");

    if (clean.length < 10 || clean.length > 11) {
      alert("Digite um número com 10 ou 11 dígitos (DDD + número)");
      return;
    }

    const ddd = clean.substring(0, 2);
    const dddInfo = ddds[ddd];

    if (!dddInfo) {
      setResult({
        valid: false,
        formatted: input,
        ddd,
        state: "Desconhecido",
        region: "DDD não encontrado",
        type: "fixo",
        suspicious: true,
      });
      return;
    }

    const isMobile = clean.length === 11 && clean[2] === "9";
    const formatted = isMobile
      ? `(${ddd}) ${clean[2]} ${clean.substring(3, 7)}-${clean.substring(7, 11)}`
      : `(${ddd}) ${clean.substring(2, 6)}-${clean.substring(6, 10)}`;

    // Detect suspicious patterns
    const suspicious =
      /^(\d)\1{9,10}$/.test(clean) || // All same digit
      clean === "1234567890" ||
      clean === "12345678901";

    setResult({
      valid: true,
      formatted,
      ddd,
      state: dddInfo.state,
      region: dddInfo.region,
      type: isMobile ? "mobile" : "fixo",
      suspicious,
    });
  };

  return (
    <ToolLayout
      title="Verificador de Número"
      description="Identifique operadora e valide números de telefone"
      Icon={Smartphone}
    >
      <div className="bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-8 mb-6">
        {/* Vovó Message */}
        <motion.div 
          className="mb-6 p-4 bg-teal-50 border-l-4 border-teal-400 "
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-900 italic">
            <strong>A Vovó fala:</strong> "Ligaram de um número estranho? Deixa eu dar uma olhada de onde é esse telefone. A vovó conhece todos os DDDs do Brasil!"
          </p>
        </motion.div>

        <label className="block text-slate-800 font-medium mb-3">
          Digite o número (com DDD):
        </label>
        <input
          type="tel"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="(11) 91234-5678 ou (11) 1234-5678"
          className="w-full p-4 border-teal-200 border-4 border-slate-900 focus:border-teal-400 focus:outline-none text-lg"
          onKeyPress={(e) => e.key === "Enter" && handleVerify()}
        />

        <motion.button
          onClick={handleVerify}
          disabled={!input.trim()}
          className="w-full mt-4 bg-teal-500 disabled:bg-slate-300 text-white font-black py-4 uppercase px-6 border-4 border-slate-900 transition-colors text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Verificar Número
        </motion.button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 border-4 ${
              result.suspicious
                ? "bg-red-50 border-red-300"
                : result.valid
                ? "bg-green-50 border-green-300"
                : "bg-yellow-50 border-yellow-300"
            }`}
          >
            {result.suspicious && (
              <div className="mb-4 p-4 bg-red-100 border border-red-300 border-3 border-black">
                <div className="flex items-center gap-2 text-red-800 font-bold">
                  <span className="text-2xl">🚨</span>
                  <span>Número Suspeito!</span>
                </div>
                <p className="text-red-700 text-sm mt-2">
                  Este padrão é comum em golpes. Desconfie!
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <span className="text-slate-700 text-sm">Número formatado:</span>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {result.formatted}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <span className="text-slate-700 text-sm block">DDD:</span>
                  <span className="text-lg font-bold">{result.ddd}</span>
                </div>
                <div>
                  <span className="text-slate-700 text-sm block">Estado:</span>
                  <span className="text-lg font-bold">{result.state}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-700 text-sm block">Região:</span>
                  <span className="text-lg font-bold">{result.region}</span>
                </div>
                <div>
                  <span className="text-slate-700 text-sm block">Tipo:</span>
                  <span className="text-lg font-bold">
                    {result.type === "mobile" ? "Celular" : "Fixo"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border-yellow-200 border-4 border-slate-900 p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-4">
          🚨 Sinais de Golpe por Telefone
        </h3>
        <ul className="space-y-3 text-slate-800">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">⚠️</span>
            <span>
              <strong>DDD estranho:</strong> golpistas usam DDDs de outras regiões
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">⚠️</span>
            <span>
              <strong>Urgência:</strong> "Sua conta será bloqueada", "Parente
              preso"
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">⚠️</span>
            <span>
              <strong>Pede dados:</strong> banco NUNCA pede senha por telefone
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600 font-bold">Check</span>
            <span>
              <strong>Na dúvida:</strong> desligue e ligue VOCÊ para o número
              oficial
            </span>
          </li>
        </ul>
      </div>
    </ToolLayout>
  );
}
