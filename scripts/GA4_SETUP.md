# Google Analytics Data API - Setup Guide

## 📋 Passo a Passo

### 1. Criar Service Account (Google Cloud Console)

1. Acesse: https://console.cloud.google.com/
2. Crie ou selecione um projeto
3. Vá em **APIs & Services** > **Credentials**
4. Clique **+ CREATE CREDENTIALS** > **Service account**
5. Preencha:
   - Nome: `vovo-analytics-reader`
   - ID: `vovo-analytics-reader`
   - Description: "Read-only access to GA4 data"
6. Clique **CREATE AND CONTINUE**
7. Role: **Viewer** (ou deixe vazio)
8. Clique **DONE**

### 2. Gerar Chave JSON

1. Na lista de Service Accounts, clique na que você criou
2. Vá na aba **KEYS**
3. **ADD KEY** > **Create new key**
4. Tipo: **JSON**
5. Clique **CREATE**
6. Arquivo `.json` será baixado automaticamente

### 3. Ativar API

1. Vá em **APIs & Services** > **Library**
2. Busque: "Google Analytics Data API"
3. Clique em **ENABLE**

### 4. Dar Acesso ao Service Account no GA4

1. Acesse: https://analytics.google.com
2. Admin (ícone de engrenagem, canto inferior esquerdo)
3. **Account Access Management** (nível da conta)
4. Clique **+** (Add users)
5. Cole o email do service account (formato: `vovo-analytics-reader@PROJECT-ID.iam.gserviceaccount.com`)
6. Permissão: **Viewer**
7. Clique **Add**

### 5. Configurar no Projeto

```bash
# Mova o arquivo JSON baixado para o projeto
mv ~/Downloads/vovo-analytics-reader-*.json ~/.openclaw/workspace-freelancer/vovo/ga4-credentials.json

# Adicione ao .env.local
echo 'GA4_PROPERTY_ID=529648976' >> .env.local
echo 'GOOGLE_APPLICATION_CREDENTIALS=./ga4-credentials.json' >> .env.local

# Adicione ao .gitignore (para não commitar credenciais)
echo 'ga4-credentials.json' >> .gitignore
```

### 6. Instalar Dependência

```bash
cd ~/.openclaw/workspace-freelancer/vovo
pnpm add @google-analytics/data
```

---

## ✅ Verificar se Funcionou

Execute o script de teste:
```bash
node scripts/check-ga4-traffic.js
```

Deve retornar dados dos últimos 7 dias!

---

**Tempo total:** ~10 minutos  
**Custo:** Grátis (Google Analytics Data API tem quota generosa)
