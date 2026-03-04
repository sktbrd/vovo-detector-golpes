import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'posts');

interface FAQ {
  question: string;
  answer: string;
}

const faqsData: Record<string, FAQ[]> = {
  'como-identificar-golpe-no-pix': [
    {
      question: 'Como saber se um PIX é golpe?',
      answer: 'Desconfie se: (1) a pessoa pede PIX antes de entregar produto, (2) há urgência excessiva, (3) o valor mudou de última hora, (4) o destinatário tem nome diferente do vendedor, (5) pedem PIX para "confirmar" algo.',
    },
    {
      question: 'O que fazer se cair em golpe do PIX?',
      answer: 'Registre um Boletim de Ocorrência (BO) imediatamente, solicite o Mecanismo Especial de Devolução (MED) no app do seu banco em até 80 dias, e entre em contato com o Banco Central pelo site do BC ou telefone 145.',
    },
    {
      question: 'É possível cancelar um PIX após enviar?',
      answer: 'Não. O PIX é instantâneo e irreversível. Porém, você pode solicitar a devolução via MED se foi vítima de golpe ou fraude. O prazo é de até 80 dias corridos após a transação.',
    },
    {
      question: 'Como denunciar golpe do PIX?',
      answer: 'Registre BO na delegacia (física ou online), notifique seu banco sobre a fraude, use o MED para tentar recuperar o valor, e denuncie ao Banco Central pelo site ou telefone 145.',
    },
  ],
  'golpe-do-whatsapp-clonado': [
    {
      question: 'Como saber se meu WhatsApp foi clonado?',
      answer: 'Sinais: (1) mensagens lidas que você não abriu, (2) contatos dizem receber mensagens suas pedindo dinheiro, (3) sessões ativas em outros dispositivos (ver em WhatsApp Web), (4) desconexões repentinas.',
    },
    {
      question: 'O que fazer se meu WhatsApp foi clonado?',
      answer: 'Avise TODOS seus contatos imediatamente, desconecte todas as sessões (WhatsApp > Aparelhos Conectados > Desconectar tudo), ative a verificação em duas etapas, e registre BO na delegacia.',
    },
    {
      question: 'Como os golpistas clonam WhatsApp?',
      answer: 'Métodos comuns: (1) interceptam SMS com código de ativação, (2) enganam a vítima para fornecer o código, (3) usam engenharia social ("atualização de cadastro"), (4) exploram falhas de segurança.',
    },
    {
      question: 'Como proteger WhatsApp contra clonagem?',
      answer: 'Ative verificação em duas etapas (Configurações > Conta > Confirmação em duas etapas), nunca compartilhe código de 6 dígitos, verifique aparelhos conectados regularmente, e desconfie de ligações pedindo códigos.',
    },
  ],
  'como-saber-se-meu-cartao-foi-clonado': [
    {
      question: 'Como saber se meu cartão foi clonado?',
      answer: 'Sinais: (1) compras não reconhecidas no extrato, (2) SMS de compras que você não fez, (3) tentativas de compra bloqueadas, (4) saque/compra em local onde você nunca esteve, (5) cartão bloqueado sem você solicitar.',
    },
    {
      question: 'O que fazer se meu cartão foi clonado?',
      answer: 'Bloqueie o cartão IMEDIATAMENTE pelo app/telefone do banco, conteste as transações fraudulentas (tem até 90 dias), registre BO, e solicite novo cartão com números diferentes.',
    },
    {
      question: 'Banco devolve dinheiro de cartão clonado?',
      answer: 'Sim, geralmente. Se você contestar em até 90 dias e não houver evidência de negligência (ex: compartilhar senha), o banco costuma estornar. Guarde comprovantes e registre BO para fortalecer o caso.',
    },
    {
      question: 'Como os golpistas clonam cartões?',
      answer: 'Métodos: (1) "chupa-cabra" em caixas eletrônicos, (2) maquininhas adulteradas, (3) phishing (sites/apps falsos), (4) vazamento de dados de lojas, (5) skimming (dispositivos que leem a tarja magnética).',
    },
  ],
};

function generateFAQSchema(faqs: FAQ[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return `\n\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`;
}

function generateFAQHTML(faqs: FAQ[]) {
  let html = '\n\n---\n\n## ❓ Perguntas Frequentes\n\n';
  
  faqs.forEach((faq) => {
    html += `### ${faq.question}\n\n${faq.answer}\n\n`;
  });

  return html;
}

function addFAQs() {
  let updated = 0;

  for (const [slug, faqs] of Object.entries(faqsData)) {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${slug}.md`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already has FAQ
    if (content.includes('Perguntas Frequentes') || content.includes('FAQPage')) {
      console.log(`⏭️  Skipping ${slug} (already has FAQ)`);
      continue;
    }

    // Add FAQ schema and HTML
    const faqSchema = generateFAQSchema(faqs);
    const faqHTML = generateFAQHTML(faqs);

    const updatedContent = content.trimEnd() + faqSchema + faqHTML + '\n';

    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✅ Added FAQ to ${slug}`);
    updated++;
  }

  console.log(`\n✨ Done! Updated ${updated} articles with FAQs.`);
}

addFAQs();
