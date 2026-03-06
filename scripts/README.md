# 🤖 Search Console Automation Scripts

**Service Account:** `skatehive@skatehive-94e95.iam.gserviceaccount.com`  
**Credentials:** `~/.openclaw/.env.google-sa.json`  

---

## ⚙️ Setup (Uma Vez)

### 1. Adicionar Service Account no Search Console

Vai em: https://search.google.com/search-console/settings/users

Clique **"ADD USER"**:
- Email: `skatehive@skatehive-94e95.iam.gserviceaccount.com`
- Permission: **Full**

✅ Confirme.

### 2. Instalar Dependências (Já Feito)

```bash
cd ~/Code/vovo
pnpm install  # googleapis + tsx já adicionados
```

---

## 🚀 Uso

### **Request Indexing** (10 URLs principais)

```bash
cd ~/Code/vovo
pnpm tsx scripts/search-console.ts request-indexing
```

**O que faz:**
- Solicita indexação das 10 URLs prioritárias
- Google indexa em 24-72h
- Limite: ~10-15 requests por dia

**Output esperado:**
```
✅ Indexing requested: https://detectordegolpes.com.br
✅ Indexing requested: https://detectordegolpes.com.br/blog/...
...
✅ All requests sent!
⏰ Indexation expected in 24-72h
```

---

### **Check Status** (Ver sitemap e indexação)

```bash
pnpm tsx scripts/search-console.ts check-status
```

**O que faz:**
- Verifica se sitemap foi submetido
- Mostra quantas URLs descobertas/processadas
- Warnings/errors se houver

**Output esperado:**
```
📊 Sitemap Status:
  Sitemap: sitemap.xml
  Status: Processed
  Submitted: 2026-03-06
  Warnings: 0
  Errors: 0
```

---

### **Submit Sitemap** (Se ainda não foi)

```bash
pnpm tsx scripts/search-console.ts submit-sitemap
```

**O que faz:**
- Submete sitemap.xml ao Search Console
- Só precisa fazer uma vez

---

### **Performance Data** (Tráfego/Keywords)

```bash
# Últimos 7 dias (padrão)
pnpm tsx scripts/search-console.ts performance

# Últimos 30 dias
pnpm tsx scripts/search-console.ts performance 30
```

**O que faz:**
- Mostra clicks, impressions, CTR, posição
- Top 25 páginas
- Só funciona APÓS indexação (2-7 dias)

**Output esperado (site novo):**
```
📈 Performance Data (Last 7 days):
  ℹ️  No performance data yet (site too new or not indexed)
```

**Output esperado (após indexação):**
```
📈 Performance Data (Last 7 days):

Top Pages:

1. https://detectordegolpes.com.br/blog/como-identificar-golpe-pix
   Clicks: 12
   Impressions: 340
   CTR: 3.53%
   Position: 18.5

2. https://detectordegolpes.com.br
   Clicks: 8
   Impressions: 250
   CTR: 3.20%
   Position: 22.1
```

---

## 📅 Workflow Recomendado

### **Dia 1 (HOJE):**
```bash
# 1. Submit sitemap (se não foi)
pnpm tsx scripts/search-console.ts submit-sitemap

# 2. Request indexing
pnpm tsx scripts/search-console.ts request-indexing

# 3. Check status
pnpm tsx scripts/search-console.ts check-status
```

### **Dia 2-7:**
```bash
# Diário: check status
pnpm tsx scripts/search-console.ts check-status

# A partir do dia 3-5: check performance
pnpm tsx scripts/search-console.ts performance
```

### **Semanal (Após Indexação):**
```bash
# Monday: performance report
pnpm tsx scripts/search-console.ts performance 7 > reports/search-console-$(date +%Y-%m-%d).txt
```

---

## 🔧 Troubleshooting

### **Error: "Permission denied"**

**Causa:** Service account não foi adicionada no Search Console

**Solução:**
1. Vai em https://search.google.com/search-console/settings/users
2. Adiciona `skatehive@skatehive-94e95.iam.gserviceaccount.com`
3. Permission: Full
4. Tenta de novo

---

### **Error: "Quota exceeded"**

**Causa:** Google limita requests de indexação

**Solução:**
- Aguarde 24h
- Google permite ~10-15 requests por dia

---

### **"No performance data"**

**Causa:** Site ainda não indexado ou muito novo

**Solução:**
- Aguarde 3-7 dias após request indexing
- Check status pra ver se páginas foram indexadas
- Performance data aparece 24-48h após indexação

---

## 📊 Automatização Futura (Cron)

**Ideia:** Rodar check diário automático

```bash
# Adicionar no crontab
0 9 * * * cd ~/Code/vovo && pnpm tsx scripts/search-console.ts performance 7 >> logs/search-console.log 2>&1
```

Ou via OpenClaw cron job (melhor):
```json
{
  "schedule": { "kind": "cron", "expr": "0 9 * * *" },
  "payload": {
    "kind": "systemEvent",
    "text": "Run Search Console daily check and report performance"
  }
}
```

---

**Pronto pra usar!** 🚀

Primeiro comando a rodar:
```bash
cd ~/Code/vovo
pnpm tsx scripts/search-console.ts request-indexing
```

Vai solicitar indexação das 10 URLs principais. Google indexa em 24-72h! ⚡
