"use client";

import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import { Link2 } from "lucide-react";
import { motion } from "framer-motion";

export default function VerificadorLinkPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{
    url: string;
    suspicious: boolean;
    warnings: string[];
    safe: string[];
    domain: string;
  } | null>(null);

  const analyzeURL = (inputUrl: string) => {
    const warnings: string[] = [];
    const safe: string[] = [];

    try {
      const urlObj = new URL(inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`);
      const domain = urlObj.hostname;

      // URL Shorteners
      const shorteners = [
        "bit.ly",
        "tinyurl.com",
        "t.co",
        "goo.gl",
        "ow.ly",
        "is.gd",
        "buff.ly",
        "adf.ly",
      ];
      if (shorteners.some((s) => domain.includes(s))) {
        warnings.push("Link encurtado - oculta o destino real");
      }

      // Suspicious TLDs
      const suspiciousTLDs = [".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top"];
      if (suspiciousTLDs.some((tld) => domain.endsWith(tld))) {
        warnings.push("⚠️ Domínio suspeito - extensão usada em golpes");
      }

      // Lookalike domains
      const commonBrands = [
        "nubank",
        "bradesco",
        "itau",
        "santander",
        "caixa",
        "bancodobrasil",
        "bb",
        "mercadopago",
        "picpay",
        "correios",
        "receita",
        "gov",
        "google",
        "facebook",
        "instagram",
        "whatsapp",
      ];
      const domainLower = domain.toLowerCase();
      for (const brand of commonBrands) {
        if (
          domainLower.includes(brand) &&
          !domainLower.endsWith(`${brand}.com.br`) &&
          !domainLower.endsWith(`${brand}.com`) &&
          !domainLower.endsWith(`${brand}.gov.br`)
        ) {
          warnings.push(`🎭 Possível imitação de marca conhecida (${brand})`);
        }
      }

      // HTTP (not HTTPS)
      if (urlObj.protocol === "http:") {
        warnings.push("🔓 Não usa HTTPS - conexão insegura");
      } else {
        safe.push("Usa HTTPS - conexão criptografada");
      }

      // IP address instead of domain
      if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
        warnings.push("🔢 Usa endereço IP ao invés de domínio - suspeito");
      }

      // Too many subdomains
      const parts = domain.split(".");
      if (parts.length > 4) {
        warnings.push("📎 Muitos subdomínios - pode ser golpe");
      }

      // Numbers in domain (suspicious pattern)
      if (/\d{4,}/.test(domain)) {
        warnings.push("🔢 Números demais no domínio - padrão suspeito");
      }

      // Known safe domains
      const safeDomains = [
        ".gov.br",
        ".com.br",
        "google.com",
        "youtube.com",
        "facebook.com",
        "instagram.com",
        "twitter.com",
        "linkedin.com",
        "microsoft.com",
        "apple.com",
        "amazon.com.br",
        "mercadolivre.com.br",
        "nubank.com.br",
      ];
      if (safeDomains.some((sd) => domain.endsWith(sd) && domain === urlObj.hostname)) {
        safe.push("Domínio conhecido e confiável");
      }

      return {
        url: inputUrl,
        suspicious: warnings.length > 0,
        warnings,
        safe,
        domain,
      };
    } catch (e) {
      return {
        url: inputUrl,
        suspicious: true,
        warnings: ["❌ URL inválida - formato incorreto"],
        safe: [],
        domain: "Inválido",
      };
    }
  };

  const handleCheck = () => {
    if (!url.trim()) {
      alert("Digite uma URL");
      return;
    }

    const analysis = analyzeURL(url);
    setResult(analysis);
  };

  return (
    <ToolLayout
      title="Verificador de Link"
      description="Verifique se um link é seguro antes de clicar"
      Icon={Link2}
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
            <strong>A Vovó fala:</strong> "Recebeu um link e não sabe se pode confiar? Calma! A vovó olha esse link pra você antes de clicar. Melhor prevenir que remediar!"
          </p>
        </motion.div>

        <label className="block text-slate-800 font-medium mb-3">
          Cole o link suspeito:
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com ou bit.ly/abc123"
          className="w-full p-4 border-teal-200 border-4 border-slate-900 focus:border-teal-400 focus:outline-none text-lg"
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
        />

        <motion.button
          onClick={handleCheck}
          disabled={!url.trim()}
          className="w-full mt-4 bg-teal-500 disabled:bg-slate-300 text-white font-black py-4 uppercase px-6 border-4 border-slate-900 transition-colors text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Verificar Link
        </motion.button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 border-4 ${
              result.suspicious
                ? "bg-red-50 border-red-300"
                : "bg-green-50 border-green-300"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">
                {result.suspicious ? "🚨" : "✅"}
              </div>
              <div>
                <h3
                  className={`text-2xl font-bold ${
                    result.suspicious ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {result.suspicious ? "Link Suspeito!" : "Link Parece Seguro"}
                </h3>
                <p className="text-sm text-slate-700 break-all">
                  <strong>Domínio:</strong> {result.domain}
                </p>
              </div>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-red-800 mb-2">
                  ⚠️ Sinais de Alerta:
                </h4>
                <ul className="space-y-2">
                  {result.warnings.map((warning, i) => (
                    <li key={i} className="text-red-700 text-sm">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safe points */}
            {result.safe.length > 0 && (
              <div>
                <h4 className="font-bold text-green-800 mb-2">
                  Pontos Positivos:
                </h4>
                <ul className="space-y-2">
                  {result.safe.map((point, i) => (
                    <li key={i} className="text-green-700 text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            <div
              className={`mt-4 p-4 border-3 border-black ${
                result.suspicious ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <h4
                className={`font-bold mb-2 ${
                  result.suspicious ? "text-red-800" : "text-green-800"
                }`}
              >
                Recomendação da Vovó:
              </h4>
              <p
                className={`text-sm ${
                  result.suspicious ? "text-red-700" : "text-green-700"
                }`}
              >
                {result.suspicious ? (
                  <>
                    <strong>NÃO CLIQUE</strong> neste link sem verificar a fonte.
                    Se foi recebido por mensagem, confirme com o remetente por
                    outro canal.
                  </>
                ) : (
                  <>
                    Link parece seguro, mas sempre verifique se o remetente é
                    confiável antes de clicar.
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 border-yellow-200 border-4 border-slate-900 p-6">
        <h3 className="text-xl font-bold text-yellow-800 mb-4">
          🎓 Como Identificar Links Perigosos
        </h3>
        <ul className="space-y-3 text-slate-800">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>Links encurtados</strong> (bit.ly, tinyurl) - ocultam
              destino real
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>Domínios suspeitos</strong> - .tk, .ml, .xyz geralmente são
              golpes
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>Imitação de marcas</strong> - nubank-seguro.com ao invés de
              nubank.com.br
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">✗</span>
            <span>
              <strong>HTTP (sem S)</strong> - conexão insegura
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">Check</span>
            <span>
              <strong>SEMPRE verifique o domínio</strong> antes de clicar
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">Check</span>
            <span>
              <strong>Na dúvida, digite</strong> o endereço manualmente
            </span>
          </li>
        </ul>
      </div>

      {/* Examples */}
      <div className="mt-6 bg-teal-50 border-teal-200 border-4 border-slate-900 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Exemplos para Testar
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setUrl("bit.ly/premio123")}
            className="w-full text-left p-3 bg-white border border-teal-200 border-3 border-black hover:bg-teal-50 transition-colors text-sm"
          >
            ❌ bit.ly/premio123 (encurtado)
          </button>
          <button
            onClick={() => setUrl("http://nubank-seguro.tk")}
            className="w-full text-left p-3 bg-white border border-teal-200 border-3 border-black hover:bg-teal-50 transition-colors text-sm"
          >
            ❌ http://nubank-seguro.tk (imitação + HTTP)
          </button>
          <button
            onClick={() => setUrl("https://www.gov.br")}
            className="w-full text-left p-3 bg-white border border-teal-200 border-3 border-black hover:bg-teal-50 transition-colors text-sm"
          >
            ✅ https://www.gov.br (oficial)
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
