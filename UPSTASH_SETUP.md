# Upstash Redis Setup (Mensagem Segura)

A feature de **Mensagem Segura** usa Upstash Redis para armazenar mensagens criptografadas.

## 🎯 Por Que Upstash?

- ✅ **Grátis:** 10,000 commands/dia (suficiente)
- ✅ **TTL nativo:** Mensagens expiram automaticamente
- ✅ **Serverless:** Funciona perfeitamente no Vercel
- ✅ **Zero config local:** Fallback para in-memory em dev

---

## 🚀 Setup (5 minutos)

### 1. Criar conta no Upstash

1. Acesse: https://console.upstash.com
2. Crie conta (grátis, sem cartão)
3. Crie um novo Redis database:
   - Name: `vovo-messages`
   - Region: escolha o mais próximo (ex: São Paulo)
   - Type: **Regional** (free tier)

### 2. Copiar credenciais

No dashboard do database, copie:
- **UPSTASH_REDIS_REST_URL**
- **UPSTASH_REDIS_REST_TOKEN**

### 3. Adicionar no Vercel

1. Acesse: https://vercel.com/sktbrds-projects/vovo/settings/environment-variables
2. Adicione as duas variáveis:

```
UPSTASH_REDIS_REST_URL = https://xxx-xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN = AXxx...
```

3. Marque: **Production**, **Preview**, **Development**
4. Salvar

### 4. Redeploy

```bash
vercel --prod
```

Ou espere o próximo push automático.

---

## 🧪 Testar Local (opcional)

Adicione no `.env.local`:

```bash
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...
```

```bash
pnpm dev
```

**Sem as env vars?** Funciona com fallback in-memory (só local).

---

## 🔍 Monitorar

Dashboard Upstash: https://console.upstash.com

Veja:
- Quantas mensagens estão armazenadas
- TTL de cada mensagem
- Commands usados (de 10,000/dia)

---

## 🛠️ Alternativas (caso queira mudar)

O código está isolado em `src/lib/redis.ts`. Para migrar:

1. **Vercel Postgres:** Substituir por SQL queries
2. **Supabase:** Usar PostgreSQL API
3. **MongoDB Atlas:** Usar TTL indexes

Mas Upstash é **perfeito** pra esse caso.

---

## ⚠️ Importante

**Sem Upstash configurado:**
- ✅ Funciona **local** (in-memory fallback)
- ❌ Quebra **produção** (Vercel serverless é stateless)

**Com Upstash:**
- ✅ Funciona **everywhere**
- ✅ TTL automático
- ✅ Escalável

---

**Status:** Production-ready após configurar env vars no Vercel 🚀
