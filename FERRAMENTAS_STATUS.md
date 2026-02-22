# Status das Ferramentas - Detector de Golpes

**Data:** 2026-02-22  
**Objetivo:** Avaliar se ferramentas são reais ou mocadas

---

## 1. Detector de Golpes (página principal) ✅ **REAL**

**Status:** Totalmente funcional  
**Tecnologia:** Groq API + llama-3.1-8b-instant  

### Como funciona:
- User cola mensagem → POST /api/analyze
- Backend chama Groq com system prompt configurado
- IA analisa e retorna JSON: { type, title, message, details }
- Frontend mostra resultado + salva histórico (localStorage)
- Celebração com confetti quando "safe"

### Dependências:
- `GROQ_API_KEY` (env var) ✅ configurada

### Avaliação:
- **Real:** Sim, análise genuína via IA
- **Útil:** Muito, é a feature principal
- **Melhorias:** Nenhuma urgente

---

## 2. Verificador de Link ⚠️ **PARCIALMENTE MOCADO**

**Status:** Funciona, mas limitado  
**Tecnologia:** Client-side regex patterns  

### Como funciona:
- Detecta: shorteners (bit.ly, tinyurl), TLDs suspeitos (.tk, .ml), lookalikes (nubank, itau)
- Valida HTTPS vs HTTP
- Detecta IPs ao invés de domínios
- Conta subdomínios suspeitos

### O que NÃO faz:
- ❌ Não consulta Google Safe Browsing API
- ❌ Não consulta VirusTotal
- ❌ Não verifica se domínio está em blacklist real
- ❌ Não checa certificado SSL

### Avaliação:
- **Real:** Parcialmente (heurísticas locais)
- **Útil:** Sim, mas poderia ser muito melhor
- **Melhorias necessárias:**
  - Integrar Google Safe Browsing API (grátis até 10k req/dia)
  - Opcional: VirusTotal API (limitado sem key)

---

## 3. Gerador de Senha ✅ **REAL**

**Status:** Totalmente funcional  
**Tecnologia:** `crypto.getRandomValues()` (Web Crypto API)

### Como funciona:
- User escolhe: tamanho, maiúsculas, minúsculas, números, símbolos
- Gera senha com `crypto.getRandomValues()` (criptograficamente seguro)
- Calcula força da senha (len + charset variety)
- Permite copiar

### Avaliação:
- **Real:** Sim, senhas genuinamente aleatórias e seguras
- **Útil:** Muito
- **Melhorias:** Nenhuma necessária

---

## 4. Validador CPF/CNPJ ✅ **REAL**

**Status:** Totalmente funcional  
**Tecnologia:** Algoritmo oficial de dígitos verificadores

### Como funciona:
- User cola CPF/CNPJ → valida dígitos verificadores
- Detecta padrões suspeitos (111.111.111-11)
- Formata automaticamente

### Avaliação:
- **Real:** Sim, validação oficial
- **Útil:** Muito
- **Melhorias:** Nenhuma necessária

---

## 5. Verificador de Número ⚠️ **PARCIALMENTE MOCADO**

**Status:** Funciona bem com limitações  
**Tecnologia:** Database local de DDDs + heurísticas

### Como funciona:
- User cola número → identifica DDD, estado, região
- Detecta se é móvel (9º dígito) ou fixo
- Detecta padrões suspeitos (números repetidos)

### O que NÃO faz:
- ❌ Não identifica operadora real (precisaria de API paga)
- ❌ Não valida se número existe de fato

### Avaliação:
- **Real:** Parcialmente (DDD database é real e completo)
- **Útil:** Razoável (identifica região corretamente)
- **Melhorias:** APIs de operadora são caras/difíceis, deixar como está

---

## 6. Email Vazado? ✅ **REAL (com limitação)**

**Status:** Funcional mas com rate limit  
**Tecnologia:** HaveIBeenPwned API (oficial)

### Como funciona:
- User cola email → consulta HIBP API
- Retorna vazamentos reais (LinkedIn, Adobe, etc)
- Mostra detalhes de cada breach

### Problema atual:
- ⚠️ Rate limit (HTTP 429) sem API key
- Sem key: ~1 req/1.5s
- Com key: muito mais generoso

### Avaliação:
- **Real:** Sim, dados oficiais do HIBP
- **Útil:** Muito
- **Melhorias necessárias:**
  - Obter HIBP API key (grátis pra uso não-comercial)
  - Adicionar cache local pra reduzir requests

---

## 📊 Resumo Geral

| Ferramenta | Status | Real? | Útil? | Prioridade Melhoria |
|------------|--------|-------|-------|---------------------|
| Detector de Golpes | ✅ Funcional | Sim | ⭐⭐⭐⭐⭐ | Nenhuma |
| Verificador de Link | ⚠️ Limitado | Parcial | ⭐⭐⭐ | 🔴 Alta (Safe Browsing API) |
| Gerador de Senha | ✅ Funcional | Sim | ⭐⭐⭐⭐ | Nenhuma |
| Validador CPF/CNPJ | ✅ Funcional | Sim | ⭐⭐⭐⭐ | Nenhuma |
| Verificador de Número | ⚠️ Limitado | Parcial | ⭐⭐⭐ | 🟡 Média (deixar como está) |
| Email Vazado | ⚠️ Rate limit | Sim | ⭐⭐⭐⭐ | 🟠 Alta (HIBP API key) |

---

## 🎯 Ações Recomendadas (ordem de impacto)

### 1. **Melhorar Verificador de Link** (maior impacto SEO + credibilidade)
- Integrar Google Safe Browsing API
- Endpoint: `https://safebrowsing.googleapis.com/v4/threatMatches:find`
- Grátis até 10.000 req/dia
- Aumenta MUITO a utilidade real da ferramenta

### 2. **HIBP API Key pro Email Vazado**
- Registrar em: https://haveibeenpwned.com/API/Key
- Grátis pra uso não-comercial (verificar termos)
- Evita rate limit + permite cache

### 3. **Cache inteligente**
- Email Vazado: cachear resultados por 24h (breaches não mudam tanto)
- Verificador de Link: cachear URLs conhecidas

---

## ✅ Conclusão

**4 de 6 ferramentas são totalmente reais e funcionais.**  
**2 de 6 são parcialmente mocadas mas ainda úteis.**

Nenhuma ferramenta é "fake" completa — todas entregam valor real.

As melhorias sugeridas (Safe Browsing + HIBP key) elevam o nível de "bom" pra "excelente".

Para AdSense approval: **tá mais do que suficiente**. Google quer conteúdo útil e as ferramentas principais (Detector + CPF + Senha) são 100% reais.
