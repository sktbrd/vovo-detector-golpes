#!/usr/bin/env tsx
/**
 * Daily Content Generator
 * 
 * Generates SEO-optimized articles for detectordegolpes.com.br
 * 
 * Flow:
 * 1. Read keyword queue (manually curated for now)
 * 2. Generate article via Groq
 * 3. Save to posts/ directory
 * 4. Update index
 */

import { config } from 'dotenv';
import { existsSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Load env vars from .env.local
config({ path: join(__dirname, '../../.env.local') });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const POSTS_DIR = join(__dirname, '../../posts');

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep slug generation identical for duplicate checks and file writes.
// The previous duplicate filter only stripped non-ASCII chars, so accented
// keywords like "empréstimo" did not match their saved slug and were
// regenerated/overwritten on every cron run.
const normalizeSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const getRetryDelayMs = (errorBody: string, attempt: number): number => {
  const match = errorBody.match(/try again in ([\d.]+)s/i);
  if (match) {
    return Math.ceil((Number(match[1]) + 1) * 1000);
  }

  return Math.min(60_000, 5_000 * 2 ** attempt);
};

interface Keyword {
  primary: string;
  lsi: string[];
  intent: 'informational' | 'transactional' | 'navigational';
  targetLength: number;
}

interface Article {
  title: string;
  slug: string;
  description: string;
  content: string;
  keywords: string[];
  publishedAt: string;
}

const KEYWORD_QUEUE: Keyword[] = [
  // ✅ Processados (2026-02-22)
  // - como identificar golpe no pix
  // - golpe do whatsapp clonado
  // - golpe do falso motoboy
  
  // 🔥 Alta Prioridade - Golpes PIX
  {
    primary: 'golpe pix itau como identificar',
    lsi: ['golpe pix itau 2024', 'pix falso itau', 'como evitar golpe pix itau', 'restituir golpe pix itau'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe pix banco do brasil 2024',
    lsi: ['golpe pix bb', 'pix estornado bb', 'como saber se pix é golpe bb', 'golpe pix banco do brasil whatsapp'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe pix nubank whatsapp',
    lsi: ['golpe nubank 2024', 'pix falso nubank', 'golpe whatsapp nubank', 'como evitar golpe pix nubank'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'como saber se um pix é golpe',
    lsi: ['identificar pix falso', 'pix golpe sinais', 'pix seguro como saber', 'validar pix antes de pagar'],
    intent: 'informational',
    targetLength: 1600
  },
  {
    primary: 'pix estornado é golpe',
    lsi: ['golpe do pix estornado', 'devolução pix golpe', 'estorno pix falso', 'golpe pix devolvido'],
    intent: 'informational',
    targetLength: 1300
  },
  
  // 🔥 Alta Prioridade - Golpes WhatsApp
  {
    primary: 'golpe whatsapp fingindo ser parente',
    lsi: ['golpe whatsapp família', 'golpe whatsapp se passando por filho', 'golpe whatsapp parente pedindo dinheiro'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe whatsapp se passando por empresa',
    lsi: ['golpe whatsapp empresa falsa', 'whatsapp golpe correios', 'golpe whatsapp banco'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'como saber se whatsapp foi clonado',
    lsi: ['sinais whatsapp clonado', 'detectar whatsapp clonado', 'whatsapp clonado sintomas'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'recuperar whatsapp clonado',
    lsi: ['como recuperar whatsapp clonado', 'whatsapp clonado o que fazer', 'recuperar conta whatsapp'],
    intent: 'informational',
    targetLength: 1600
  },
  {
    primary: 'golpe whatsapp com link',
    lsi: ['link malicioso whatsapp', 'golpe link whatsapp', 'whatsapp link falso', 'clicar link whatsapp golpe'],
    intent: 'informational',
    targetLength: 1400
  },
  
  // 🟡 Média Prioridade - Golpes Bancários
  {
    primary: 'golpe do falso funcionário do banco',
    lsi: ['golpe telefone banco', 'golpe se passando por banco', 'falso gerente banco'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe da maquininha banco do brasil',
    lsi: ['golpe maquininha bb', 'maquininha falsa', 'golpe maquininha cartão'],
    intent: 'informational',
    targetLength: 1300
  },
  {
    primary: 'golpe do empréstimo falso',
    lsi: ['empréstimo falso whatsapp', 'golpe empréstimo instagram', 'empréstimo fraudulento'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'como saber se meu cartão foi clonado',
    lsi: ['cartão clonado sinais', 'detectar cartão clonado', 'sintomas cartão clonado'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe do débito automático',
    lsi: ['débito não autorizado', 'golpe cobrança indevida', 'débito automático falso'],
    intent: 'informational',
    targetLength: 1300
  },
  
  // 🔥 Nova Batch - E-commerce & Delivery
  {
    primary: 'site falso como identificar',
    lsi: ['loja falsa online', 'site golpe sinais', 'como saber se site é confiável'],
    intent: 'informational',
    targetLength: 1600
  },
  {
    primary: 'golpe da entrega falsa correios',
    lsi: ['golpe correios whatsapp', 'mensagem falsa correios', 'golpe taxa de entrega'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe mercado livre como evitar',
    lsi: ['golpe ml 2024', 'compra segura mercado livre', 'vendedor falso mercado livre'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe da compra que não chega',
    lsi: ['produto não chegou golpe', 'como denunciar loja falsa', 'recuperar dinheiro compra online'],
    intent: 'informational',
    targetLength: 1400
  },
  
  // 🔥 Golpes de Investimento
  {
    primary: 'pirâmide financeira como identificar',
    lsi: ['esquema de pirâmide brasil', 'marketing multinível golpe', 'investimento pirâmide sinais'],
    intent: 'informational',
    targetLength: 1600
  },
  {
    primary: 'golpe do trader falso',
    lsi: ['trader instagram golpe', 'curso de trader falso', 'investimento forex golpe'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe bitcoin whatsapp',
    lsi: ['investimento bitcoin falso', 'golpe criptomoeda whatsapp', 'bitcoin duplicar dinheiro golpe'],
    intent: 'informational',
    targetLength: 1400
  },
  
  // 🔥 Golpes de Emprego
  {
    primary: 'golpe da vaga de emprego falsa',
    lsi: ['vaga falsa linkedin', 'golpe entrevista emprego', 'empresa fantasma recrutamento'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe do trabalho em casa',
    lsi: ['trabalho home office falso', 'golpe renda extra', 'vaga remota golpe'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe do treinamento pago',
    lsi: ['curso admissão falso', 'taxa treinamento golpe', 'empresa cobra treinamento golpe'],
    intent: 'informational',
    targetLength: 1300
  },
  
  // 🔥 Golpes de Relacionamento
  {
    primary: 'golpe do amor na internet',
    lsi: ['romance golpe online', 'namoro virtual falso', 'golpe relacionamento brasil'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'catfish como identificar',
    lsi: ['perfil falso namoro', 'fotos falsas online', 'identidade falsa internet'],
    intent: 'informational',
    targetLength: 1400
  },
  
  // 🔥 Golpes Diversos
  {
    primary: 'golpe black friday como evitar',
    lsi: ['ofertas falsas black friday', 'site falso black friday', 'golpe desconto irreal'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe do FGTS liberado',
    lsi: ['mensagem falsa fgts', 'golpe saque fgts', 'link falso caixa fgts'],
    intent: 'informational',
    targetLength: 1300
  },
  {
    primary: 'golpe boleto falso',
    lsi: ['como saber se boleto é verdadeiro', 'boleto falso sinais', 'validar boleto antes pagar'],
    intent: 'informational',
    targetLength: 1500
  },

  // 🔥 Nova Batch - Social, Pix & Marketplace
  {
    primary: 'golpe pix devolução',
    lsi: ['devolução pix falsa', 'golpe pix reembolso', 'pix devolvido golpe', 'comprovante pix falso'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe whatsapp conta clonada',
    lsi: ['conta whatsapp clonada golpe', 'mensagem de whatsapp clonado', 'proteger whatsapp de clonagem'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe dos correios whatsapp',
    lsi: ['sms falso correios', 'taxa alfandegária falsa', 'link falso correios whatsapp'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'como saber se loja online é confiável',
    lsi: ['verificar loja online', 'loja virtual falsa', 'site confiável para comprar', 'compra segura online'],
    intent: 'informational',
    targetLength: 1600
  },
  {
    primary: 'golpe instagram empréstimo',
    lsi: ['empréstimo falso instagram', 'perfil falso empréstimo', 'golpe dinheiro rápido instagram'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe facebook marketplace',
    lsi: ['compra falsa facebook', 'vendedor falso marketplace', 'golpe marketplace pagamento antecipado'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'perfil falso instagram como identificar',
    lsi: ['instagram falso sinais', 'conta fake instagram', 'perfil falso golpe'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe no tiktok',
    lsi: ['promoção falsa tiktok', 'perfil falso tiktok golpe', 'link malicioso tiktok'],
    intent: 'informational',
    targetLength: 1300
  },
  {
    primary: 'golpe telegram investimento',
    lsi: ['grupo telegram investimento falso', 'robô trader telegram golpe', 'sinal falso telegram'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'investimento falso como denunciar',
    lsi: ['denunciar golpe investimento', 'investimento fraudulento', 'como recuperar dinheiro golpe investimento'],
    intent: 'informational',
    targetLength: 1600
  },
  {
    primary: 'golpe rendimento impossível',
    lsi: ['renda garantida golpe', 'lucro fácil falso', 'promessa de rendimento alto'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'entrevista de emprego golpe',
    lsi: ['entrevista falsa emprego', 'recrutador falso', 'processo seletivo golpe'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'trabalho home office golpe',
    lsi: ['vaga home office falsa', 'trabalho remoto golpe', 'renda extra home office falsa'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'golpe do romance brasileiro',
    lsi: ['golpe amor brasil', 'romance scam brasileiro', 'relacionamento falso golpe'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'namoro online golpe',
    lsi: ['golpe namoro virtual', 'perfil falso namoro online', 'pedir dinheiro namoro golpe'],
    intent: 'informational',
    targetLength: 1400
  },
  {
    primary: 'perfil falso tinder',
    lsi: ['tinder golpe', 'catfish tinder', 'como identificar perfil fake tinder'],
    intent: 'informational',
    targetLength: 1300
  },
  {
    primary: 'golpe de natal whatsapp',
    lsi: ['promoção falsa natal', 'link falso presente natal', 'golpe fim de ano whatsapp'],
    intent: 'informational',
    targetLength: 1300
  },
  {
    primary: 'golpe imposto de renda',
    lsi: ['restituição falsa imposto de renda', 'email falso receita federal', 'golpe malha fina'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe email corporativo',
    lsi: ['phishing corporativo', 'email falso empresa', 'fraude boleto empresa'],
    intent: 'informational',
    targetLength: 1500
  },
  {
    primary: 'golpe nota fiscal falsa',
    lsi: ['nota fiscal falsa email', 'boleto nota fiscal golpe', 'fraude nota fiscal eletrônica'],
    intent: 'informational',
    targetLength: 1400
  }
];

async function generateArticle(keyword: Keyword): Promise<Article> {
  console.log(`✍️  Generating article for: "${keyword.primary}"`);
  
  const systemPrompt = `Você é um especialista em segurança digital no Brasil, especializado em golpes e fraudes online.

Seu objetivo é educar brasileiros sobre como se proteger de golpes, usando linguagem clara e acessível.

Diretrizes:
- Tom profissional mas acessível (evite jargão técnico excessivo)
- Exemplos práticos e relevantes pro Brasil
- Não seja alarmista, seja informativo
- Sempre inclua dicas práticas de proteção
- Mencione as ferramentas gratuitas do Detector de Golpes quando relevante`;

  const userPrompt = `Escreva um artigo SEO-otimizado sobre "${keyword.primary}".

**Requisitos:**
- Tamanho: aproximadamente ${keyword.targetLength} palavras
- Intenção de busca: ${keyword.intent}
- Keywords relacionadas (usar naturalmente): ${keyword.lsi.join(', ')}
- Estrutura: 
  - Introdução (gancho + por que é importante)
  - 3-5 seções principais
  - Conclusão com call-to-action
- Incluir exemplos reais (sem nomear vítimas)
- Formatação Markdown com headings, listas, emojis quando apropriado

**Retorne APENAS um JSON válido neste formato:**
{
  "title": "Título otimizado para SEO (50-60 caracteres)",
  "description": "Meta description otimizada (150-160 caracteres)",
  "content": "Conteúdo completo em Markdown, começando com # (título H1)"
}`;

  if (!GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY not found in environment');
    throw new Error('Missing GROQ_API_KEY');
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok && response.status === 429 && attempt < 2) {
      const error = await response.text();
      const delayMs = getRetryDelayMs(error, attempt);
      console.warn(`⚠️  Groq rate limit hit. Retrying in ${Math.round(delayMs / 1000)}s...`);
      await sleep(delayMs);
      continue;
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const generated = JSON.parse(data.choices[0].message.content);

    const article: Article = {
      title: generated.title,
      slug: normalizeSlug(keyword.primary),
      description: generated.description,
      content: generated.content,
      keywords: [keyword.primary, ...keyword.lsi],
      publishedAt: new Date().toISOString()
    };

    console.log(`✅ Article generated: "${article.title}"`);
    return article;

  }

  throw new Error('Groq API error: retry attempts exhausted');
}

async function saveArticle(article: Article) {
  const filename = `${article.slug}.md`;
  const filepath = join(POSTS_DIR, filename);

  if (existsSync(filepath)) {
    throw new Error(`Article already exists: ${filename}`);
  }
  
  const frontmatter = `---
title: "${article.title}"
description: "${article.description}"
publishedAt: "${article.publishedAt}"
keywords: ${JSON.stringify(article.keywords)}
---

`;
  
  const fullContent = frontmatter + article.content;
  writeFileSync(filepath, fullContent);
  
  console.log(`✅ Saved: ${filepath}`);
  return filepath;
}

async function main() {
  console.log('🚀 Daily Content Generator');
  console.log(`📅 ${new Date().toLocaleDateString('pt-BR', { dateStyle: 'full' })}`);
  
  // Get existing articles
  const existingSlugs = readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
  
  console.log(`\n📚 Existing articles: ${existingSlugs.length}`);
  
  // Filter queue to avoid duplicates
  const newKeywords = KEYWORD_QUEUE.filter(k => {
    const slug = normalizeSlug(k.primary);
    return !existingSlugs.includes(slug);
  });
  
  if (newKeywords.length === 0) {
    console.log('⚠️  No new keywords in queue. Add more to KEYWORD_QUEUE.');
    return 0;
  }
  
  console.log(`\n📝 Generating ${Math.min(3, newKeywords.length)} new articles...\n`);
  
  // Generate up to 3 articles per day
  const articlesToGenerate = newKeywords.slice(0, 3);
  let successCount = 0;
  
  for (const keyword of articlesToGenerate) {
    try {
      const article = await generateArticle(keyword);
      await saveArticle(article);
      successCount++;
      console.log('');

      // Groq's free tier has a low TPM limit; space requests to avoid
      // partial daily runs when generating multiple long articles.
      if (successCount < articlesToGenerate.length) {
        await sleep(12_000);
      }
    } catch (error: any) {
      console.error(`❌ Failed to generate article for "${keyword.primary}": ${error.message}\n`);
      // Continue to next article
    }
  }
  
  console.log(`✅ Daily content generation complete! (${successCount}/${articlesToGenerate.length} articles)`);
  return successCount;
}

if (require.main === module) {
  main().catch(console.error);
}

export default main;
export { main as generateDailyContent };
