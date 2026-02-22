# Automação SEO - Detector de Golpes

Sistema de automação diária para crescimento orgânico.

---

## 📁 Estrutura

```
automation/
├── daily/
│   ├── run.ts                 # Orquestrador diário
│   └── content-generator.ts   # Gerador de artigos
├── weekly/
│   └── (futuro: relatórios semanais)
├── scripts/
│   └── search-console-pull.ts # Integração Google Search Console
└── data/
    ├── search-console/        # Dados históricos GSC
    └── reports/               # Relatórios diários
```

---

## 🚀 Setup

### 1. Google Search Console API

**Pré-requisitos:**
- Site verificado no Search Console
- Google Cloud project criado

**Passos:**

```bash
# 1. Habilitar API
# https://console.cloud.google.com/apis/library/searchconsole.googleapis.com

# 2. Criar OAuth2 credentials
# Tipo: Desktop app
# Download JSON → salvar como automation/google-credentials.json

# 3. Primeira autenticação (abre browser)
pnpm tsx automation/scripts/search-console-pull.ts

# Token será salvo em automation/google-token.json
```

### 2. Groq API (já configurado)

Usar chave existente em `.env.local`:
```
GROQ_API_KEY=your_key_here
```

---

## 🎯 Daily Tasks (04:00 BRT)

1. **Pull Search Console data** (últimos 7 dias)
   - Keywords performance
   - Pages performance
   - CTR, position, clicks, impressions

2. **Generate 3 articles** (baseado em keyword queue)
   - SEO-optimized (meta, keywords, structure)
   - Markdown com frontmatter
   - Auto-publish em `/posts`

3. **Save daily report**
   - JSON com status de cada task
   - Histórico em `data/reports/`

---

## 📝 Manual Run

```bash
# Rodar automação diária manualmente
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
pnpm tsx automation/daily/run.ts

# Ou individualmente:
pnpm tsx automation/daily/content-generator.ts
pnpm tsx automation/scripts/search-console-pull.ts
```

---

## 🔄 Cron Schedule (OpenClaw)

Configurar em `.openclaw/config.json` (ou via comando):

```json
{
  "cron": {
    "seo-daily": {
      "schedule": "0 4 * * *",
      "command": "cd vovo && pnpm tsx automation/daily/run.ts",
      "notify": "telegram"
    }
  }
}
```

---

## 📊 Keyword Queue

Editar manualmente em `automation/daily/content-generator.ts`:

```typescript
const KEYWORD_QUEUE: Keyword[] = [
  {
    primary: 'sua keyword aqui',
    lsi: ['variação 1', 'variação 2'],
    intent: 'informational',
    targetLength: 1500
  }
];
```

**Futuro:** Integrar com Ahrefs/SEMrush para descoberta automática.

---

## ⚠️ Status Atual

| Feature | Status |
|---------|--------|
| Estrutura de diretórios | ✅ Criado |
| Content generator scaffold | ✅ Criado |
| Search Console scaffold | ✅ Criado |
| Google OAuth2 | ❌ Não implementado |
| Groq integration | ❌ Não implementado |
| Cron job | ❌ Não configurado |

**Próximo passo:** Implementar Google OAuth2 flow.

---

## 🎯 Roadmap

### Fase 1: Foundation (esta semana)
- [x] Estrutura de arquivos
- [ ] Google Search Console API
- [ ] Content generator com Groq
- [ ] Cron job configurado

### Fase 2: Content Engine (semana 2)
- [ ] Keyword research automatizado
- [ ] Schema markup automático
- [ ] Internal linking automático
- [ ] Gerar 3-5 artigos/dia

### Fase 3: Backlink Machine (mês 1)
- [ ] Scraper de sites relevantes
- [ ] Email outreach automático
- [ ] Follow-up tracking
- [ ] Link acquisition dashboard

### Fase 4: Full Loop (mês 2)
- [ ] Performance analysis automático
- [ ] Strategy self-adjustment
- [ ] Weekly reports pro Telegram
- [ ] Zero intervenção manual

---

_Última atualização: 2026-02-22_
