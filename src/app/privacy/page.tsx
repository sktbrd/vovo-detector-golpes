export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Política de Privacidade
        </h1>

        <div className="prose prose-purple max-w-none">
          <p className="text-slate-700 mb-4">
            <strong>Última atualização:</strong> 12 de fevereiro de 2026
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              1. Informações que Coletamos
            </h2>
            <p className="text-slate-800 mb-3">
              O Vovó Detector de Golpes coleta apenas as informações necessárias
              para fornecer nosso serviço de análise de mensagens:
            </p>
            <ul className="list-disc pl-6 text-slate-800 space-y-2">
              <li>
                <strong>Mensagens analisadas:</strong> O texto que você cola para
                análise é enviado ao nosso sistema de IA. Não armazenamos essas
                mensagens em nossos servidores.
              </li>
              <li>
                <strong>Histórico local:</strong> As últimas 5 análises ficam
                salvas no seu navegador (localStorage) e nunca são enviadas para
                nossos servidores.
              </li>
              <li>
                <strong>Dados de uso:</strong> Coletamos dados anônimos de uso
                através do Google Analytics para melhorar nosso serviço.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              2. Cookies e Tecnologias Similares
            </h2>
            <p className="text-slate-800 mb-3">
              Utilizamos cookies e tecnologias similares para:
            </p>
            <ul className="list-disc pl-6 text-slate-800 space-y-2">
              <li>Manter suas preferências</li>
              <li>Analisar o tráfego do site (Google Analytics)</li>
              <li>Exibir anúncios relevantes (Google AdSense)</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              3. Google AdSense
            </h2>
            <p className="text-slate-800 mb-3">
              Este site utiliza o Google AdSense para exibir anúncios. O Google
              pode usar cookies para exibir anúncios baseados em suas visitas a
              este e outros sites. Você pode optar por não usar cookies visitando
              as configurações de anúncios do Google.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              4. Compartilhamento de Dados
            </h2>
            <p className="text-slate-800">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais
              com terceiros, exceto conforme descrito nesta política (Google
              Analytics e AdSense).
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              5. Seus Direitos
            </h2>
            <p className="text-slate-800 mb-3">Você tem o direito de:</p>
            <ul className="list-disc pl-6 text-slate-800 space-y-2">
              <li>Acessar os dados que coletamos sobre você</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Optar por não receber cookies</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              6. Segurança
            </h2>
            <p className="text-slate-800">
              Implementamos medidas de segurança para proteger suas informações.
              Todas as comunicações são feitas através de conexões seguras (HTTPS).
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              7. Alterações nesta Política
            </h2>
            <p className="text-slate-800">
              Podemos atualizar esta política periodicamente. A data da última
              atualização está sempre indicada no topo desta página.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              8. Contato
            </h2>
            <p className="text-slate-800">
              Para questões sobre privacidade, entre em contato através do
              GitHub: github.com/sktbrd/vovo-detector-golpes
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
