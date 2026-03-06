# 🚀 Google Search Console - Setup Rápido (5 minutos)

**Por quê:** Permite solicitar indexação manual + monitorar Google  
**Impacto:** Indexação em 24-72h (vs 7-30 dias sem isso)  

---

## Passo 1: Adicionar Propriedade (2 min)

1. Acesse: https://search.google.com/search-console
2. Login com sua conta Google
3. Clique em **"+ Add Property"** (topo esquerdo)
4. Escolha **"URL prefix"**
5. Digite: `https://detectordegolpes.com.br`
6. Clique em **"Continue"**

---

## Passo 2: Verificar Propriedade (3 min)

Google vai mostrar opções de verificação. Escolha **"HTML tag"**:

1. Copie o código que aparece (algo como):
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. **ME MANDA ESSE CÓDIGO** (vou adicionar no site)

Ou se preferir fazer você mesmo:

```bash
cd ~/Code/vovo
```

Edite `src/app/layout.tsx` e adicione a tag no `<head>`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="COLE_AQUI_O_CODIGO" />
        
        {/* ... resto do código ... */}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

3. Deploy:
```bash
git add -A
git commit -m "feat: add Google Search Console verification"
git push
```

4. Aguarde 2-3 minutos pro deploy
5. Volte pro Search Console e clique em **"Verify"**

✅ Se deu certo, vai mostrar "Ownership verified"

---

## Passo 3: Submit Sitemap (1 min)

1. No menu lateral, clique em **"Sitemaps"**
2. No campo "Add a new sitemap", digite:
   ```
   sitemap.xml
   ```
3. Clique em **"Submit"**

✅ Deve aparecer "Success" e começar a processar

---

## Passo 4: Request Indexing (10 min)

**Solicitar indexação manual das top 10 páginas:**

1. No menu lateral, clique em **"URL Inspection"**
2. Cole cada URL abaixo (uma por vez)
3. Aguarde análise (5-10 segundos)
4. Se aparecer "URL is not on Google", clique em **"Request Indexing"**
5. Aguarde confirmação (1-2 min por URL)

**URLs para solicitar (prioridade):**

```
https://detectordegolpes.com.br
https://detectordegolpes.com.br/blog/como-identificar-golpe-no-pix
https://detectordegolpes.com.br/blog/como-identificar-mensagem-falsa
https://detectordegolpes.com.br/blog/golpe-do-emprestimo-falso
https://detectordegolpes.com.br/blog/golpe-whatsapp-fingindo-ser-parente
https://detectordegolpes.com.br/blog/top-7-golpes-pix-2026
https://detectordegolpes.com.br/blog/novo-golpe-whatsapp-web
https://detectordegolpes.com.br/golpes-pix
https://detectordegolpes.com.br/golpes-whatsapp
https://detectordegolpes.com.br/ferramentas
```

**Nota:** Google limita a ~10-15 requests por dia. Faça os principais hoje, resto amanhã.

---

## Passo 5: Monitorar (diário)

**A partir de amanhã, cheque diariamente:**

1. **Coverage** (quantas páginas indexadas)
2. **Performance** (clicks, impressions, CTR)
3. **Enhancements** (Core Web Vitals)

**Expectativa:**
- Dia 1-2: 0 páginas indexadas (processando)
- Dia 3-5: 5-10 páginas indexadas
- Dia 7-14: 20-30 páginas indexadas
- Dia 30: 40+ páginas indexadas

---

## ⚡ Alternativa Rápida (Se Não Puder Fazer Agora)

**Me manda:**
1. Acesso temporário à conta Google (ou)
2. O código de verificação HTML (eu adiciono no site)

**Eu faço:**
- Adiciono a tag de verificação
- Deploy
- Você só precisa clicar em "Verify" no Search Console
- Eu submeto o sitemap e solicito indexação

**Tempo:** 15 minutos total (5 seus, 10 meus)

---

## 🎯 Resultado Esperado

**Sem Search Console:**
- Indexação: 7-30 dias (passivo)
- Sem controle
- Sem monitoramento

**Com Search Console:**
- Indexação: 24-72h (ativo)
- Controle total
- Monitoramento diário
- Fix rápido de problemas

**Diferença:** ~25 dias mais rápido! 🚀

---

**Bora configurar agora?** Me avisa quando fizer ou se precisar de ajuda! 📞
