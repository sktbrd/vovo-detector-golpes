# 🚀 Quick Reference - Comandos Úteis

## 🧪 Testing

### Gerar artigos manualmente
```bash
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
pnpm tsx automation/daily/content-generator.ts
```

### Rodar automação completa
```bash
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
pnpm tsx automation/daily/run.ts
```

### Testar wrapper (como cron rodaria)
```bash
cd /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo
./automation/cron-wrapper.sh
```

---

## 📊 Monitoring

### Ver artigos
```bash
ls -lh /Users/vladnikolaev/.openclaw/workspace-freelancer/vovo/posts/
```

### Ver último relatório
```bash
cat automation/data/reports/$(date +%Y-%m-%d).json | jq
```

### Ver logs de cron
```bash
cat automation/data/reports/cron-$(date +%Y-%m-%d).log
```

---

## ⚙️ Configuration

### Editar keywords queue
```bash
code automation/daily/content-generator.ts
# Buscar: const KEYWORD_QUEUE
```

### Ver env vars
```bash
cat .env.local
```

---

## 🔧 Maintenance

### Update dependencies
```bash
pnpm update
```

### Check Groq API status
```bash
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer $(grep GROQ_API_KEY .env.local | cut -d= -f2)"
```

---

## 📁 Important Paths

| Item | Path |
|------|------|
| Workspace | `/Users/vladnikolaev/.openclaw/workspace-freelancer/vovo` |
| Posts | `posts/` |
| Automation | `automation/` |
| Reports | `automation/data/reports/` |
| Logs | `automation/data/reports/cron-*.log` |

---

## 🎯 Daily Schedule

| Time | Task | Command |
|------|------|---------|
| 04:00 | Daily automation | `automation/cron-wrapper.sh` |
| 08:00 | (futuro) Weekly report | TBD |

---

_Atualizado: 2026-02-22_
