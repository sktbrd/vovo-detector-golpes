# GA4 API - Quick Start (5 minutos)

## TL;DR

```bash
# 1. Criar Service Account + Baixar JSON
https://console.cloud.google.com/iam-admin/serviceaccounts

# 2. Ativar API
https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com

# 3. Mover arquivo
mv ~/Downloads/*service-account*.json ~/.openclaw/workspace-freelancer/vovo/ga4-credentials.json

# 4. Dar acesso no GA4
# Email do service account: vovo-analytics-reader@PROJECT-ID.iam.gserviceaccount.com
# https://analytics.google.com > Admin > Account Access > Add users > Viewer

# 5. Testar
cd ~/.openclaw/workspace-freelancer/vovo
node scripts/check-ga4-traffic.js
```

---

## Passo a Passo Detalhado

### 1️⃣ Google Cloud Console

**Criar Service Account:**
```
1. https://console.cloud.google.com/
2. Selecione/Crie um projeto
3. IAM & Admin > Service Accounts
4. CREATE SERVICE ACCOUNT
   - Name: vovo-analytics-reader
   - Role: Viewer (ou deixe vazio)
5. Click no service account criado > KEYS > ADD KEY > Create new key > JSON
6. Arquivo baixa automaticamente
```

### 2️⃣ Ativar API

```
1. APIs & Services > Library
2. Buscar: "Google Analytics Data API"
3. ENABLE
```

### 3️⃣ Configurar Projeto

```bash
# Mover credenciais
mv ~/Downloads/your-project-*.json ~/.openclaw/workspace-freelancer/vovo/ga4-credentials.json

# Adicionar ao .env.local
cd ~/.openclaw/workspace-freelancer/vovo
echo 'GA4_PROPERTY_ID=529648976' >> .env.local
echo 'GOOGLE_APPLICATION_CREDENTIALS=./ga4-credentials.json' >> .env.local

# Adicionar ao .gitignore (não commitar credenciais!)
echo 'ga4-credentials.json' >> .gitignore
```

### 4️⃣ Dar Acesso no GA4

```
1. https://analytics.google.com
2. Admin (ícone engrenagem, canto esquerdo inferior)
3. Account Access Management
4. Add users (+)
5. Email: vovo-analytics-reader@YOUR-PROJECT-ID.iam.gserviceaccount.com
   (Copie do Google Cloud Console, página do service account)
6. Role: Viewer
7. Add
```

### 5️⃣ Testar

```bash
cd ~/.openclaw/workspace-freelancer/vovo
node scripts/check-ga4-traffic.js
```

**Output esperado:**
```
🔍 Fetching GA4 data...

📊 TRAFFIC SUMMARY (Last 7 Days)
═══════════════════════════════════════
Total Users:      142
Total Pageviews:  387
Total Sessions:   156
Avg Users/Day:    20
Avg Pageviews/Day: 55
═══════════════════════════════════════

📅 DAILY BREAKDOWN
2026-02-18   15 users  ███████████████
2026-02-19   18 users  ██████████████████
...

📄 TOP 10 PAGES
 1. /                                    89 views
 2. /blog/golpe-whatsapp                34 views
...

🎯 PROGRESS TO GOAL
Current:  20 users/day
Target:   80 users/day
Progress: 25% 🚀

📅 Estimated 21 days to reach goal
```

---

## Troubleshooting

### ❌ Error: ENOENT (arquivo não encontrado)
```bash
# Verifique o caminho do arquivo
ls -la ~/.openclaw/workspace-freelancer/vovo/ga4-credentials.json
```

### ❌ Error: PERMISSION_DENIED
```
Service account não tem acesso ao GA4!
Repita passo 4: Adicionar email no GA4 Admin > Account Access
```

### ❌ Error: Invalid credentials
```
JSON file corrompido ou incorreto.
Re-baixe o arquivo no Google Cloud Console.
```

---

## Automação (Opcional)

Adicionar ao cron para rodar diariamente:

```bash
# Cria script wrapper
cat > ~/.openclaw/workspace-freelancer/vovo/scripts/daily-ga4-check.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")/.."
node scripts/check-ga4-traffic.js
EOF

chmod +x scripts/daily-ga4-check.sh

# Adiciona ao cron (TODO: usar openclaw cron add)
# Roda todo dia 09:00 BRT
# 0 9 * * * cd ~/.openclaw/workspace-freelancer/vovo && ./scripts/daily-ga4-check.sh
```

---

**Tempo total:** ~5-10 minutos  
**Custo:** Grátis (quota: 200k requests/day)
