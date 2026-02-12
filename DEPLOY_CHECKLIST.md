# 🚀 Checklist de Deploy e Monetização

## ✅ Fase 1: Deploy Básico (JÁ FEITO)

- [x] Código no GitHub
- [x] SEO configurado
- [x] Privacy Policy
- [x] Terms of Service
- [x] Ad slots preparados

## 🔄 Fase 2: Deploy Vercel (AGORA)

### Passo a passo:

1. **Acessar Vercel**
   - https://vercel.com/new
   - Login com GitHub

2. **Importar Repo**
   - Selecionar: `sktbrd/vovo-detector-golpes`
   - Framework: Next.js (auto-detectado)

3. **Configurar Variáveis de Ambiente**
   ```
   GROQ_API_KEY=sua_chave_groq_aqui
   ```
   **Como pegar sua chave:**
   - Acesse: https://console.groq.com
   - Crie conta (grátis)
   - Gere API key

4. **Deploy!**
   - Clique em "Deploy"
   - Aguarde ~2min

5. **Domínio Temporário**
   - Vercel dá: `vovo-detector-golpes.vercel.app`
   - Testa o site!

## 🌐 Fase 3: Domínio Próprio (RECOMENDADO)

### Por quê domínio próprio?
- ✅ AdSense exige domínio próprio
- ✅ Melhor para SEO
- ✅ Mais profissional

### Onde comprar:
- **Registro.br** (R$ 40/ano) ← Recomendado para .br
- **Hostinger** (R$ 30-50/ano)
- **GoDaddy**

### Domínios sugeridos:
- ✅ `vovovigilante.com.br`
- ✅ `detectordeolpes.com.br`
- ✅ `vovoprotetora.com.br`
- ✅ `golpometro.com.br`

### Configurar no Vercel:
1. Comprou o domínio
2. Na Vercel: Settings → Domains
3. Adiciona: `seudominio.com.br`
4. Configura DNS conforme instruções
5. Aguarda propagação (~1h)

### Atualizar após domínio:
- [ ] `public/sitemap.xml` (trocar URL)
- [ ] `src/app/layout.tsx` (metadataBase)
- [ ] Commit e push

## 📊 Fase 4: Analytics (IMPORTANTE)

### Google Analytics:

1. **Criar conta**
   - https://analytics.google.com
   - Criar propriedade
   - Tipo: Web

2. **Copiar Measurement ID**
   - Formato: `G-XXXXXXXXXX`

3. **Instalar**
   ```bash
   cd vovo
   pnpm add @next/third-parties
   ```

4. **Adicionar no layout**
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'

   // No <body>
   <GoogleAnalytics gaId="G-XXXXXXXXXX" />
   ```

5. **Deploy**

### Alternativa Simples: Plausible (Grátis)
- Mais privado
- Sem cookies
- Mais rápido

## 💰 Fase 5: Google AdSense

**⚠️ AGUARDE:**
- Mínimo 2-4 semanas de tráfego
- ~500-1000 visitas/dia
- Conteúdo original

**Quando estiver pronto:**
- Leia `ADSENSE_SETUP.md`
- Aplique no AdSense
- Configure ads

## 🚀 Fase 6: Crescimento (SEO)

### Google Search Console

1. **Adicionar propriedade**
   - https://search.google.com/search-console
   - Adicionar domínio
   - Verificar via DNS ou meta tag

2. **Submeter sitemap**
   - URL: `https://seudominio.com.br/sitemap.xml`

### Criar Conteúdo

Blog posts otimizados:
- "Top 10 golpes de WhatsApp em 2026"
- "Como identificar golpe do Pix"
- "Golpe da falsa central - como se proteger"
- "Vovó te ensina a não cair em golpe"

Cada post = nova página indexável = mais tráfego!

## 📈 Fase 7: Features Virais

- [ ] Contador "Vovó salvou X pessoas"
- [ ] Share cards bonitos
- [ ] Botão WhatsApp share
- [ ] Twitter/X share
- [ ] Instagram stories template

## 💡 Fase 8: Freemium (Opcional)

**Grátis:**
- 5 análises/dia
- Histórico de 5

**Premium (R$ 9,90/mês):**
- Análises ilimitadas
- Histórico permanente
- API access
- Sem ads

## 📊 KPIs para Acompanhar

**Semana 1-2:**
- Tráfego: 50-100 visitas/dia
- Bounce rate: <70%

**Mês 1:**
- Tráfego: 500-1000 visitas/dia
- Análises: 200-300/dia

**Mês 3:**
- Tráfego: 2000-5000 visitas/dia
- Receita AdSense: R$ 50-200/mês

## 🎯 Ordem Recomendada

1. ✅ Deploy Vercel (hoje)
2. ✅ Comprar domínio (esta semana)
3. ✅ Google Analytics (hoje)
4. ✅ Search Console (após domínio)
5. ⏳ Blog posts (próximas semanas)
6. ⏳ AdSense (após 2-4 semanas)
7. ⏳ Features virais (mês 2)
8. ⏳ Freemium (mês 3-6)

---

**🚀 PRÓXIMA AÇÃO: Deploy na Vercel!**
