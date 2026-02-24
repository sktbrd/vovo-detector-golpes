export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Termos de Uso
        </h1>

        <div className="prose prose-purple max-w-none">
          <p className="text-slate-700 mb-4">
            <strong>Última atualização:</strong> 12 de fevereiro de 2026
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              1. Aceitação dos Termos
            </h2>
            <p className="text-slate-800">
              Ao acessar e usar o Vovó Detector de Golpes, você concorda com
              estes Termos de Uso. Se você não concordar, não use o serviço.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              2. Descrição do Serviço
            </h2>
            <p className="text-slate-800 mb-3">
              O Vovó é uma ferramenta GRATUITA que utiliza inteligência artificial
              para analisar mensagens e identificar possíveis golpes. O serviço é
              fornecido &quot;como está&quot;, sem garantias.
            </p>
            <p className="text-slate-800 font-semibold text-red-600">
              ⚠️ IMPORTANTE: Esta ferramenta é um auxílio, não uma garantia
              absoluta. Sempre use seu julgamento próprio e, em caso de dúvida,
              consulte as autoridades competentes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              3. Limitações de Responsabilidade
            </h2>
            <p className="text-slate-800 mb-3">
              O Vovó Detector de Golpes:
            </p>
            <ul className="list-disc pl-6 text-slate-800 space-y-2">
              <li>
                NÃO se responsabiliza por decisões tomadas com base nas análises
              </li>
              <li>
                NÃO garante 100% de precisão na detecção de golpes
              </li>
              <li>
                NÃO se responsabiliza por perdas financeiras ou danos
              </li>
              <li>
                NÃO substitui orientação de profissionais de segurança ou
                autoridades
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              4. Uso Aceitável
            </h2>
            <p className="text-slate-800 mb-3">Você concorda em NÃO:</p>
            <ul className="list-disc pl-6 text-slate-800 space-y-2">
              <li>Usar o serviço para fins ilegais</li>
              <li>Tentar burlar ou hackear o sistema</li>
              <li>Enviar spam ou conteúdo malicioso</li>
              <li>Fazer engenharia reversa do código</li>
              <li>Usar o serviço de forma automatizada sem permissão</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              5. Propriedade Intelectual
            </h2>
            <p className="text-slate-800">
              O design, logo, código e conteúdo do Vovó são de propriedade
              exclusiva. O código-fonte está disponível sob licença MIT no GitHub.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              6. Privacidade
            </h2>
            <p className="text-slate-800">
              O uso do serviço está sujeito à nossa{" "}
              <a
                href="/privacy"
                className="text-teal-600 hover:text-slate-900 underline"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              7. Anúncios
            </h2>
            <p className="text-slate-800">
              Este site pode exibir anúncios através do Google AdSense para
              manter o serviço gratuito. Ao usar o site, você concorda com a
              exibição de anúncios.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              8. Modificações
            </h2>
            <p className="text-slate-800">
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. O uso contínuo do serviço após as alterações constitui
              aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              9. Suspensão do Serviço
            </h2>
            <p className="text-slate-800">
              Podemos suspender ou encerrar o serviço a qualquer momento, com ou
              sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              10. Lei Aplicável
            </h2>
            <p className="text-slate-800">
              Estes termos são regidos pelas leis da República Federativa do
              Brasil.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-teal-200">
          <a
            href="/"
            className="text-teal-600 hover:text-slate-900 font-medium"
          >
            ← Voltar para o Detector
          </a>
        </div>
      </div>
    </div>
  );
}
