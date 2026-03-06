# 🔧 Habilitar Google Indexing API

**Problema:** Service account precisa de permissões extras pra usar Indexing API

---

## 🎯 O Que Precisa Fazer

### 1. Habilitar API no Google Cloud Console

1. Vai em: https://console.cloud.google.com/apis/library
2. Projeto: **skatehive-94e95** (já existe)
3. Busca: **"Web Search Indexing API"** ou **"Indexing API"**
4. Clique na API
5. Clique **"Enable"** (se não tiver habilitada)

---

### 2. Adicionar Owner no Search Console

**Problema:** Service account tá como "Full" mas precisa ser "Owner"

1. Vai em: https://search.google.com/search-console/settings/users
2. Encontra: `skatehive@skatehive-94e95.iam.gserviceaccount.com`
3. Se tiver "Full" → Muda pra **"Owner"**
4. Ou remove e adiciona de novo como **"Owner"**

---

### 3. Aguardar Propagação (5-10 min)

Após habilitar API + mudar pra Owner:
- Aguarde 5-10 minutos
- Tenta rodar o script de novo

---

## 🚀 Teste Depois

```bash
cd ~/Code/vovo
pnpm tsx scripts/search-console.ts request-indexing
```

**Se funcionar:**
```
✅ Indexing requested: https://detectordegolpes.com.br
✅ Indexing requested: https://detectordegolpes.com.br/blog/...
```

**Se ainda der erro:**
- API pode não estar disponível pra esse tipo de conteúdo
- Google limita Indexing API só pra JobPosting e BroadcastEvent
- Solução: request manual via interface (mais confiável)

---

## 📝 Alternativa: URL Inspection API (Read-Only)

**O que funciona SEM permissões extras:**

```bash
# Verificar status de indexação (já funciona)
pnpm tsx scripts/search-console.ts check-status

# Ver performance (após indexação)
pnpm tsx scripts/search-console.ts performance
```

---

## ⚠️ Limitações Google Indexing API

**Importante:** Google Indexing API tem restrições:

- **Allowed:** JobPosting, BroadcastEvent (schema.org types)
- **Not allowed:** Blog posts, landing pages normais
- **Quota:** 200 requests/day (depois de aprovado)

**Fonte:** https://developers.google.com/search/apis/indexing-api/v3/quickstart

Pra blog posts normais, **request manual** é o método oficial do Google.

---

## 🎯 Recomendação

**Opção A:** Tenta habilitar API + mudar pra Owner (10 min)
- Pode funcionar
- Vale a tentativa

**Opção B:** Request manual via interface (5-10 min)
- Mais confiável
- Método oficial Google
- Já funciona

**Minha recomendação:** Tenta A primeiro. Se não rolar, faz B (manual é rápido).

---

**Quer que eu:**
1. Te guie no Google Cloud Console pra habilitar API?
2. Ou faz manual direto (5-10 min e resolve)?
