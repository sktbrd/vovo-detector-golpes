# 👵 Detector de Golpes - Vovó

Site educacional brasileiro para identificação de golpes e fraudes digitais.

**🌐 Live:** https://detectordegolpes.com.br  
**📊 Status:** ✅ Online | 🤖 SEO Automation Ready

---

## 🚀 Quick Start

### Desenvolvimento
```bash
pnpm install
pnpm dev
# → http://localhost:3000
```

### Produção
```bash
pnpm build
pnpm start
```

**Deploy:** Automático via Vercel (push to main)

---

## 📁 Estrutura do Projeto

```
vovo/
├── src/app/          # Aplicação Next.js (App Router)
├── posts/            # Artigos do blog (Markdown + frontmatter)
├── public/           # Assets estáticos (imagens, favicon)
├── automation/       # 🤖 Sistema de automação SEO
│   ├── daily/        # Content generator + runner
│   ├── scripts/      # Utilities (Search Console, etc)
│   ├── data/         # Reports + histórico
│   └── *.md          # Documentação completa
└── reports/          # Relatórios de testes (Playwright)
```

---

## 🤖 SEO Automation System

**Status:** ✅ **PRONTO** (aguardando ativação)

Sistema automático que gera 3 artigos SEO-optimized por dia usando Groq AI.

### Quick Commands

```bash
# Gerar artigos manualmente
pnpm tsx automation/daily/content-generator.ts

# Rodar automação completa
pnpm tsx automation/daily/run.ts

# Testar wrapper (como cron rodaria)
./automation/cron-wrapper.sh
```

### 📚 Documentação Completa

| Arquivo | Descrição | Quando Usar |
|---------|-----------|-------------|
| [`automation/TL_DR.md`](automation/TL_DR.md) | 📄 Resumo executivo | Comece aqui! |
| [`automation/SETUP_GUIDE.md`](automation/SETUP_GUIDE.md) | 📖 Guia completo | Setup inicial |
| [`automation/QUICK_REFERENCE.md`](automation/QUICK_REFERENCE.md) | ⚡ Comandos úteis | Consulta rápida |
| [`automation/KEYWORD_IDEAS.md`](automation/KEYWORD_IDEAS.md) | 💡 50+ keywords | Popular queue |
| [`automation/STATUS_REPORT.md`](automation/STATUS_REPORT.md) | 📊 Relatório detalhado | Review progresso |
| [`PROGRESS.md`](PROGRESS.md) | 📈 Progress tracker | OKRs + milestones |

**🆕 Start here:** [`automation/TL_DR.md`](automation/TL_DR.md)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI:** Lucide React icons
- **Animations:** Framer Motion, Canvas Confetti
- **Markdown:** React Markdown + Remark GFM

### Backend/APIs
- **AI:** Groq API (llama-3.3-70b-versatile)
- **Analytics:** Google Analytics 4
- **SEO:** Google Search Console
- **Hosting:** Vercel

### Automation
- **Runtime:** Node.js + TypeScript (tsx)
- **Scheduler:** OpenClaw cron (ou system crontab)
- **Notifications:** Telegram via OpenClaw
- **Package Manager:** pnpm

---

## 🔑 Environment Variables

```bash
# .env.local
GROQ_API_KEY=gsk_...                    # Groq API (IA detection)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...     # Google Analytics 4
```

**Nota:** `.env.local` não está commitado (git ignored).

**Get Groq API Key:** https://console.groq.com (grátis)

---

## 📊 Current Analytics

**Last 7 days:**
- **Active Users:** 14
- **Event Count:** 74
- **Impressions:** ~400
- **Articles:** 6 (3 manual + 3 generated)

**View Live:** [GA4 Dashboard](https://analytics.google.com) → Detector de Golpes (Web)

---

## 📝 Content

### 🛠️ Ferramentas (6)

| Ferramenta | Status | Tecnologia |
|------------|--------|------------|
| Detector de Golpes | ✅ Real | Groq AI |
| Verificador de Link | ⚠️ Parcial | Heuristics (Safe Browsing pending) |
| Gerador de Senha | ✅ Real | Web Crypto API |
| Validador CPF/CNPJ | ✅ Real | Algoritmo oficial |
| Verificador de Número | ⚠️ Parcial | DDD database |
| Email Vazado | ✅ Real | HaveIBeenPwned API |

**Detalhes:** [`FERRAMENTAS_STATUS.md`](FERRAMENTAS_STATUS.md)

### 📰 Blog (6 artigos)

**Manual:**
- como-identificar-mensagem-falsa.md
- novo-golpe-whatsapp-web.md
- top-7-golpes-pix-2026.md

**Auto-generated (2026-02-22):**
- **🆕** como-identificar-golpe-no-pix.md
- **🆕** golpe-do-whatsapp-clonado.md
- **🆕** golpe-do-falso-motoboy.md

---

## 🎯 Roadmap

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Site base (Next.js + Tailwind)
- [x] 6 ferramentas funcionais
- [x] GA4 + Search Console setup
- [x] Domínio .com.br
- [x] Deploy automático (Vercel)
- [x] Content generator (Groq API)
- [x] Daily automation runner
- [x] Cron wrapper + logging
- [x] Documentação completa

### 🏗️ Phase 2: Activation (IN PROGRESS)
- [ ] Ativar cron job (decisão pendente)
- [ ] Popular keyword queue (20+ keywords)
- [ ] Google Search Console OAuth2
- [ ] 7 dias de geração contínua (21 artigos)

### 📅 Phase 3: Intelligence (NEXT)
- [ ] Keyword research automatizado
- [ ] Performance optimization loop
- [ ] Content refresh engine
- [ ] Schema markup automático
- [ ] Internal linking engine

### 🔮 Phase 4: Autonomy (FUTURE)
- [ ] Backlink outreach machine
- [ ] Weekly reports automáticos
- [ ] Strategy self-adjustment
- [ ] Zero intervenção manual

**Full roadmap:** [`ROADMAP_PRE_LAUNCH.md`](ROADMAP_PRE_LAUNCH.md)  
**Progress tracker:** [`PROGRESS.md`](PROGRESS.md)

---

## 📦 Scripts

```json
{
  "dev": "next dev",        # Dev server (localhost:3000)
  "build": "next build",    # Build produção
  "start": "next start",    # Servidor produção
  "lint": "eslint"          # Linter
}
```

---

## 🧪 Testing

```bash
# Run automation tests
pnpm tsx automation/daily/content-generator.ts

# Generate full report
pnpm tsx automation/daily/run.ts

# Check cron wrapper
./automation/cron-wrapper.sh
```

---

## 🚨 Important Docs

- **Setup:** [`automation/SETUP_GUIDE.md`](automation/SETUP_GUIDE.md)
- **Progress:** [`PROGRESS.md`](PROGRESS.md)
- **Keywords:** [`automation/KEYWORD_IDEAS.md`](automation/KEYWORD_IDEAS.md)
- **Tools Status:** [`FERRAMENTAS_STATUS.md`](FERRAMENTAS_STATUS.md)
- **Roadmap:** [`ROADMAP_PRE_LAUNCH.md`](ROADMAP_PRE_LAUNCH.md)

---

## 🤝 Contributing

Este é um projeto solo do Vlad, mas sugestões são bem-vindas via issues.

---

## 📄 License

Proprietary - Todos os direitos reservados.

---

## 📞 Contact

**Owner:** Vlad  
**Telegram:** @freelancer_hyper_bot (OpenClaw)  
**Site:** https://detectordegolpes.com.br

---

_Última atualização: 2026-02-22_
