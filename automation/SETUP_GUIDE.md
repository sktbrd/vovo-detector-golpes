# 🚀 SEO Automation - Setup Guide

Sistema de automação diária rodando!

---

## ✅ O Que Já Foi Implementado

### 1. Content Generator (FUNCIONAL)
- ✅ Integração com Groq API (llama-3.3-70b)
- ✅ Gera artigos SEO-optimized (título, meta, keywords, estrutura)
- ✅ Salva em `/posts` com frontmatter
- ✅ Queue de keywords (manual por enquanto)
- ✅ Testado: 3 artigos gerados em ~12s

### 2. Daily Automation Runner (FUNCIONAL)
- ✅ Orquestrador de tasks
- ✅ Salva relatórios JSON
- ✅ Error handling

### 3. Cron Wrapper (PRONTO)
- ✅ Shell script pra OpenClaw
- ✅ Logs detalhados
- ✅ Notificação pro Telegram

### 4. Search Console Integration (SCAFFOLD)
- ⚠️ Estrutura criada, OAuth2 não implementado
- Próximo passo: implementar autenticação

---

## 🎯 Como Ativar o Cron Job

### Opção A: OpenClaw Config (Recomendado)

Editar `~/.openclaw/config.json` e adicionar:

```json
{
  "cron": {
    "vovo-seo-daily": {
      "schedule": "0 4 * * *",
      "command": "/Users/vladnikolaev/.openclaw/workspace-freelancer/vovo/automation/cron-wrapper.sh",
      "enabled": true,
      "notify": "telegram"
    }
  }
}
```

Depois recarregar:
```bash
openclaw gateway restart
```

### Opção B: Sistema Crontab (Alternativa)

```bash
crontab -e
```

Adicionar linha:
```cron
0 4 * * * cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo && ./automation/cron-wrapper.sh >> /tmp/vovo-cron.log 2>&1
```

**Nota:** Com crontab do sistema, não terá integração com Telegram automática.

---

## 🧪 Testar Manualmente

### Testar Content Generator

```bash
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
pnpm tsx automation/daily/content-generator.ts
```

**Output esperado:**
```
🚀 Daily Content Generator
📅 domingo, 22 de fevereiro de 2026
📚 Existing articles: 6
📝 Generating 3 new articles...
✍️  Generating article for: "..."
✅ Article generated: "..."
✅ Saved: /Users/.../posts/slug.md
✅ Daily content generation complete!
```

### Testar Runner Completo

```bash
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
pnpm tsx automation/daily/run.ts
```

### Testar Wrapper (como cron rodaria)

```bash
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
./automation/cron-wrapper.sh
```

---

## 📊 Próximos Passos

### Fase 1: Search Console API (esta semana)
- [ ] Implementar Google OAuth2 flow
- [ ] Fetch keywords + pages performance
- [ ] Salvar histórico em `data/search-console/`
- [ ] Usar dados reais pra prioritizar keywords

### Fase 2: Content Intelligence (semana 2)
- [ ] Keyword research automatizado (descobrir novas keywords)
- [ ] Performance loop (identificar keywords em pos. 11-20 pra melhorar)
- [ ] Refresh conteúdo antigo com baixo CTR
- [ ] Schema markup automático (FAQ, HowTo, Article)

### Fase 3: Backlink Machine (mês 1)
- [ ] Scraper de sites relevantes BR
- [ ] Email outreach automático
- [ ] Follow-up tracking
- [ ] Link acquisition dashboard

### Fase 4: Full Autonomy (mês 2)
- [ ] Loop completo 24/7
- [ ] Strategy self-adjustment
- [ ] Zero intervenção manual
- [ ] Weekly reports automáticos

---

## 🛠️ Adicionar Novas Keywords

Editar `automation/daily/content-generator.ts`:

```typescript
const KEYWORD_QUEUE: Keyword[] = [
  // Adicionar aqui
  {
    primary: 'nova keyword aqui',
    lsi: ['variação 1', 'variação 2', 'variação 3'],
    intent: 'informational', // ou 'transactional', 'navigational'
    targetLength: 1500 // palavras
  },
  
  // Exemplos existentes
  {
    primary: 'como identificar golpe no pix',
    lsi: ['golpe pix nubank', 'golpe pix itau'],
    intent: 'informational',
    targetLength: 1500
  }
];
```

**Limite:** 3 artigos por dia (evitar spam/duplicate content)

---

## 📈 Monitorar Progresso

### Ver artigos gerados

```bash
ls -lah /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo/posts/
```

### Ver logs de cron

```bash
cat /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo/automation/data/reports/cron-$(date +%Y-%m-%d).log
```

### Ver relatórios

```bash
cat /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo/automation/data/reports/$(date +%Y-%m-%d).json | jq
```

---

## 🚨 Troubleshooting

### "GROQ_API_KEY not found"

Verificar `.env.local`:
```bash
cat /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo/.env.local
```

Deve ter:
```
GROQ_API_KEY=gsk_...
```

### "Command not found: pnpm"

Instalar pnpm:
```bash
npm install -g pnpm
```

### Cron não roda

Verificar logs do OpenClaw:
```bash
openclaw logs --tail 50
```

Ou ver logs do sistema (se usando crontab):
```bash
tail -f /tmp/vovo-cron.log
```

---

## 📋 Checklist de Ativação

- [x] Content generator funcional
- [x] Daily runner funcional
- [x] Cron wrapper criado
- [x] Keywords queue configurada
- [ ] Cron job ativado no OpenClaw
- [ ] Primeira execução automática (04:00 BRT)
- [ ] Notificação Telegram recebida
- [ ] Artigos publicados e indexáveis

---

_Criado em: 2026-02-22_  
_Última atualização: 2026-02-22_
