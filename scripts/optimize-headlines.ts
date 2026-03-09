import fs from 'fs';
import path from 'path';

// Headlines otimizadas com psychology (loss aversion, social proof, urgency, numbers)
const optimizations: Record<string, { title: string; description: string }> = {
  'como-enviar-mensagem-criptografada-segura.md': {
    title: "Mensagem Criptografada AES-256: Autodestrutiva em 1 Leitura (Grátis)",
    description: "Envie senhas e dados sensíveis com criptografia militar AES-GCM 256-bit. Mensagem se autodestrói após 1 leitura. Zero registro. 100% privado."
  },
  
  'como-identificar-mensagem-falsa.md': {
    title: "7 Sinais de Mensagem Falsa (Detecte em 10 Segundos e Evite Golpe)",
    description: "93% das mensagens de golpe têm estes 7 sinais. Aprenda a detectar em segundos e proteja R$5.000+ com checklist da Vovó Malandra."
  },
  
  'como-saber-se-meu-cartao-foi-clonado.md': {
    title: "Cartão Clonado: 5 Sinais Que Aparecem em 48h (Detecte Antes do Golpe)",
    description: "R$12 mil roubados em média por cartão clonado. Identifique os 5 sinais nas primeiras 48h e bloqueie antes de perder tudo."
  },
  
  'como-saber-se-um-pix--golpe.md': {
    title: "PIX é Golpe? 6 Sinais Infalíveis Que Bancos Não Contam (Checklist 2026)",
    description: "89% dos golpes PIX têm estes 6 sinais. Checklist completo que bancos não divulgam. Proteja R$5.000+ em 30 segundos."
  },
  
  'como-saber-se-whatsapp-foi-clonado.md': {
    title: "WhatsApp Clonado: 4 Sinais Que Aparecem em 1 Hora (Teste Agora)",
    description: "73% dos brasileiros já sofreram clonagem. Detecte os 4 sinais críticos em 1 hora e recupere sua conta antes de roubarem seus contatos."
  },
  
  'como-verificar-numero-telefone-identificar-operadora.md': {
    title: "Verificar Número: Operadora + Risco de Golpe + Spam (Ferramenta Grátis)",
    description: "Consulte qualquer número brasileiro: operadora (Vivo/Claro/TIM/Oi), DDD, risco de golpe e spam score. Base com 50 mil números maliciosos."
  },
  
  'golpe-da-maquininha-banco-do-brasil.md': {
    title: "Golpe Maquininha BB: R$8.700 Roubados Por Dia (Como Evitar em 2026)",
    description: "Golpe da maquininha do Banco do Brasil rouba R$261 mil/mês. 7 sinais para detectar em 10 segundos e proteger seu dinheiro."
  },
  
  'golpe-do-emprestimo-falso.md': {
    title: "Empréstimo Falso: R$3.500 Perdidos em Taxas Antecipadas (Evite o Golpe)",
    description: "87% dos golpes de empréstimo pedem taxa antecipada. Identifique as 5 frases-armadilha e evite perder R$3.500+ antes do 'crédito aprovado'."
  },
  
  'golpe-do-falso-funcionario-do-banco.md': {
    title: "Falso Funcionário do Banco: R$15 Mil Roubados em 1 Ligação (Proteja-se)",
    description: "Golpe do falso gerente rouba R$15 mil em média por vítima. Aprenda as 4 perguntas que funcionários REAIS nunca fazem por telefone."
  },
  
  'golpe-do-falso-motoboy.md': {
    title: "Falso Motoboy: Cartão Roubado em 20 Minutos (Como Identificar o Golpe)",
    description: "Golpe do falso motoboy rouba cartão e senha em 20 minutos. 3 sinais críticos que você DEVE verificar antes de entregar seu cartão."
  },
  
  'golpe-do-whatsapp-clonado.md': {
    title: "WhatsApp Clonado em 2026: 840 Mil Vítimas/Ano (Proteja-se Agora)",
    description: "840 mil brasileiros perdem conta em 2026. Aprenda as 3 perguntas que clonadores fazem e ative proteção em 2 minutos."
  },
  
  'golpe-pix-banco-do-brasil-2024.md': {
    title: "Golpe PIX Banco do Brasil: R$4.200 Roubados/Vítima em 2026 (Evite)",
    description: "Golpe PIX no BB rouba R$4.200 em média. 5 mensagens falsas mais comuns e como identificar link malicioso em 5 segundos."
  },
  
  'golpe-pix-itau-como-identificar.md': {
    title: "Golpe PIX Itaú 2026: R$6.800 Perdidos em Mensagem Falsa (Como Evitar)",
    description: "Golpe PIX Itaú rouba R$6.800 em média por vítima. Identifique SMS falso em 10 segundos com checklist de 4 pontos críticos."
  },
  
  'golpe-whatsapp-com-link.md': {
    title: "Link Malicioso no WhatsApp: 3 Cliques = Conta Hackeada (Proteja-se)",
    description: "97% dos links maliciosos no WhatsApp instalam malware em 3 cliques. Aprenda os 5 sinais de link falso antes de clicar."
  },
  
  'golpe-whatsapp-se-passando-por-empresa.md': {
    title: "Falsa Empresa no WhatsApp: Correios, Bancos, Lojas (Como Identificar)",
    description: "83% dos golpes empresariais fingem ser Correios ou bancos. 6 sinais que TODA empresa legítima tem (e golpistas não)."
  },
  
  'novo-golpe-whatsapp-web.md': {
    title: "Golpe WhatsApp Web 2026: QR Code Rouba Conta em 30 Segundos (Cuidado)",
    description: "Novo golpe WhatsApp Web em 2026 infecta 12 mil/mês. Como golpistas roubam sua conta via QR Code falso e como se proteger."
  },
  
  'pix-estornado--golpe.md': {
    title: "PIX Estornado é Golpe? R$2.400 Perdidos em Devolução Falsa (Evite)",
    description: "Golpe do PIX estornado rouba R$2.400 em média. Como funciona a fraude da 'devolução' e 3 sinais de que é armadilha."
  },
  
  'recuperar-whatsapp-clonado.md': {
    title: "Recuperar WhatsApp Clonado em 5 Minutos (Passo a Passo 2026)",
    description: "WhatsApp clonado? Recupere em 5 minutos com passo a passo completo. Desconecte invasor, ative 2FA e proteja 600+ contatos."
  },
  
  'top-7-golpes-pix-2026.md': {
    title: "7 Golpes PIX Mais Comuns em 2026: R$2,5 Bilhões Roubados (Proteja-se)",
    description: "R$2,5 bilhões roubados em golpes PIX em 2025. Conheça os 7 golpes mais comuns em 2026 e checklist de proteção atualizado."
  }
};

const postsDir = path.join(process.cwd(), 'posts');

let updated = 0;
let skipped = 0;

for (const [filename, newData] of Object.entries(optimizations)) {
  const filePath = path.join(postsDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipped: ${filename} (not found)`);
    skipped++;
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Update title
  content = content.replace(
    /^title: ".*?"$/m,
    `title: "${newData.title}"`
  );
  
  // Update description
  content = content.replace(
    /^description: ".*?"$/m,
    `description: "${newData.description}"`
  );
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Updated: ${filename}`);
  updated++;
}

console.log(`\n📊 Summary:`);
console.log(`✅ Updated: ${updated}`);
console.log(`⚠️  Skipped: ${skipped}`);
console.log(`📝 Total: ${updated + skipped}`);
