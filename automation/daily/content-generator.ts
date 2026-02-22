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
import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Load env vars from .env.local
config({ path: join(__dirname, '../../.env.local') });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const POSTS_DIR = join(__dirname, '../../posts');

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

  try {
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

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const generated = JSON.parse(data.choices[0].message.content);

    // Normalize slug (remove accents, convert to kebab-case)
    const normalizeSlug = (text: string): string => {
      return text
        .toLowerCase()
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[áàâã]/g, 'a')
        .replace(/[éèê]/g, 'e')
        .replace(/[íì]/g, 'i')
        .replace(/[óòôõ]/g, 'o')
        .replace(/[úù]/g, 'u')
        .replace(/ç/g, 'c')
        .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    };

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

  } catch (error: any) {
    console.error(`❌ Failed to generate article: ${error.message}`);
    throw error;
  }
}

async function saveArticle(article: Article) {
  const filename = `${article.slug}.md`;
  const filepath = join(POSTS_DIR, filename);
  
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
    const slug = k.primary.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return !existingSlugs.includes(slug);
  });
  
  if (newKeywords.length === 0) {
    console.log('⚠️  No new keywords in queue. Add more to KEYWORD_QUEUE.');
    return;
  }
  
  console.log(`\n📝 Generating ${Math.min(3, newKeywords.length)} new articles...\n`);
  
  // Generate up to 3 articles per day
  const articlesToGenerate = newKeywords.slice(0, 3);
  
  for (const keyword of articlesToGenerate) {
    const article = await generateArticle(keyword);
    await saveArticle(article);
    console.log('');
  }
  
  console.log('✅ Daily content generation complete!');
}

if (require.main === module) {
  main().catch(console.error);
}

export default main;
export { main as generateDailyContent };
