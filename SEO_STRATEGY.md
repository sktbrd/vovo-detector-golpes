# Estratégia SEO - Vovó Detector de Golpes

Documento de estratégia SEO completo para dominar os resultados de busca no Brasil.

---

## 🎯 Objetivos

1. **Posição #1** para "detector de golpes" em 90 dias
2. **Top 3** para queries long-tail (ex: "como identificar golpe whatsapp")
3. **1.000 visitantes/dia** orgânicos em 6 meses
4. **Featured Snippets** em 20+ queries
5. **Domain Authority 30+** em 1 ano

---

## ✅ SEO Técnico (Implementado)

### 1. **Sitemap.xml** ✅
- Gerado dinamicamente em `/sitemap.ts`
- Inclui todas páginas + blog posts
- Prioridades otimizadas:
  - Homepage: 1.0
  - Ferramentas/Blog: 0.8-0.9
  - Páginas estáticas: 0.5-0.7
  - Posts: 0.7
- **Change frequency**: daily para home/blog, monthly para ferramentas

### 2. **Robots.txt** ✅
- Permite tudo importante
- Bloqueia `/msg/` (mensagens temporárias)
- Bloqueia `/api/` (endpoints)
- Link para sitemap.xml

### 3. **Structured Data (Schema.org)** ✅
- **WebSite**: busca interna
- **Organization**: dados da empresa
- **WebApplication**: ferramentas
- **Article**: posts do blog
- **Breadcrumb**: navegação
- **FAQPage**: FAQ sections (implementar)

### 4. **Meta Tags** ✅
- Title tags otimizados (50-60 chars)
- Meta descriptions (150-160 chars)
- Open Graph (Facebook/LinkedIn)
- Twitter Cards
- Canonical URLs (via metadataBase)

### 5. **Performance** ✅
- Next.js 16 (Turbopack)
- Static generation (SSG) para blog
- CDN (Vercel Edge)
- Web Vitals otimizados:
  - LCP: <2.5s
  - FID: <100ms
  - CLS: <0.1

---

## 📊 On-Page SEO

### Estrutura de URLs ✅
```
✅ detectordegolpes.com.br/
✅ detectordegolpes.com.br/ferramentas
✅ detectordegolpes.com.br/blog
✅ detectordegolpes.com.br/blog/golpe-whatsapp
✅ detectordegolpes.com.br/gerador-senha
```

### Hierarquia de H-tags ✅
```html
<h1>Título principal (1 por página)</h1>
  <h2>Seção principal</h2>
    <h3>Sub-seção</h3>
```

### Internal Linking ✅
- Ferramentas linkam entre si
- Blog posts linkam para ferramentas
- Navbar sempre presente
- Footer com links principais

### Alt Text em Imagens ⚠️
- Vovó logo: ✅ "Vovó Detetive com lupa"
- Screenshots: ⚠️ Adicionar alt text descritivo

---

## 📝 Estratégia de Conteúdo

### Keywords Principais (Volume/Mês)
1. **"detector de golpes"** - 2,400
2. **"golpe whatsapp"** - 18,100
3. **"como identificar golpe"** - 3,600
4. **"golpe pix"** - 8,100
5. **"mensagem falsa whatsapp"** - 1,600
6. **"golpe email"** - 1,300
7. **"phishing brasil"** - 590
8. **"verificar mensagem suspeita"** - 480

### Long-Tail (Baixa competição, alta conversão)
- "como saber se é golpe whatsapp"
- "link do whatsapp é golpe"
- "mensagem do banco é verdadeira"
- "pix pode ser golpe"
- "como identificar golpe no mercado livre"

### Cron SEO Daily ✅
- 3 artigos/dia (já implementado)
- Total: 20 artigos (crescendo)
- Goal: 100+ artigos em 60 dias

### Calendário Editorial
**Semana 1-2:** Golpes mais comuns (WhatsApp, Pix, Email)
**Semana 3-4:** Prevenção (senhas, 2FA, links)
**Semana 5-6:** Estudos de caso reais
**Semana 7-8:** Guias avançados

---

## 🔗 Link Building

### Internal Linking ✅
- Cada ferramenta linka para outras
- Blog posts linkam para ferramentas relevantes
- Footer com links principais

### External Linking (TODO)
1. **Guest posts:**
   - TecMundo
   - Canaltech
   - Blog do Nubank
   - Portal G1 (via assessoria)

2. **Backlinks naturais:**
   - Redes sociais (Twitter, LinkedIn, Facebook)
   - Reddit Brasil (r/brasil, r/golpes)
   - Forums (Clube do Hardware, Baboo)
   - Comentários úteis em blogs

3. **Parcerias:**
   - Antivírus brasileiros (PSafe, Avast Brasil)
   - ONGs de segurança digital
   - Institutos de defesa do consumidor

---

## 📈 Métricas & Monitoramento

### Google Search Console ✅
- Adicionar propriedade
- Verificar sitemap.xml
- Monitorar queries
- Identificar erros 404

### Google Analytics ✅
- GA4 instalado (G-P2JC78HGZK)
- Eventos customizados:
  - `analyze_message` (detector)
  - `tool_use` (ferramentas)
  - `article_read` (blog)

### Core Web Vitals
- Monitor via PageSpeed Insights
- Target: 90+ mobile, 95+ desktop

### Rankings
- Ahrefs/Semrush (trial gratuito)
- Google Search Console (grátis)
- Manual search (incognito)

---

## 🚀 Quick Wins (Próximos 30 dias)

### Semana 1:
- [ ] Google Search Console setup
- [ ] Submit sitemap
- [ ] Alt text em todas imagens
- [ ] FAQ structured data

### Semana 2:
- [ ] 20+ artigos via cron
- [ ] Internal linking audit
- [ ] Breadcrumbs em todas páginas

### Semana 3:
- [ ] Guest post #1
- [ ] Reddit posts (value-add)
- [ ] Twitter thread viral

### Semana 4:
- [ ] Video tutorial (YouTube)
- [ ] Infográfico (Pinterest)
- [ ] Press release

---

## 🎨 Content Types

### Blog Posts ✅
- How-to guides
- Listicles (Top 10 golpes)
- Case studies
- News (golpes recentes)

### Tools ✅
- Detector principal
- 6 ferramentas auxiliares

### Interactive ⚠️
- Quiz: "Você consegue identificar golpes?"
- Calculator: "Quanto você pode perder?"
- Simulator: "Teste sua segurança"

### Visual 📸
- Infográficos
- Screenshots de golpes
- Memes educativos
- Vídeos curtos

---

## 🎯 Featured Snippets Strategy

### Tipos de snippets:
1. **Parágrafo**: Como identificar X
2. **Lista**: Top golpes de 2026
3. **Tabela**: Comparação de golpes
4. **Vídeo**: Tutorial

### Formato otimizado:
```markdown
## Como identificar golpe no WhatsApp?

Para identificar um golpe no WhatsApp:

1. Verifique o número do remetente
2. Confira erros de português
3. Desconfie de links encurtados
4. Não clique em links suspeitos
5. Use o Detector de Golpes
```

---

## 📱 Mobile SEO ✅

- ✅ Responsive design (Tailwind)
- ✅ Touch-friendly (botões grandes)
- ✅ Fast loading (<3s)
- ✅ PWA-ready (service worker TODO)

---

## 🔐 E-E-A-T (Google Quality)

### Experience ✅
- Casos reais de golpes
- Screenshots de mensagens
- Estatísticas do Brasil

### Expertise ✅
- Guias detalhados
- Múltiplas ferramentas
- Explicações técnicas

### Authoritativeness ⚠️
- Backlinks de sites confiáveis (TODO)
- Citações em mídia (TODO)
- Parcerias com instituições (TODO)

### Trustworthiness ✅
- HTTPS ✅
- Política de privacidade ✅
- Termos de uso ✅
- Contato disponível ✅

---

## 🎁 Schema.org Adicionais (TODO)

- [ ] HowTo (guias passo-a-passo)
- [ ] VideoObject (quando tiver vídeos)
- [ ] Review/Rating (avaliações de usuários)
- [ ] Event (webinars sobre segurança)

---

## 🌐 International SEO (Futuro)

- [ ] hreflang tags (pt-BR, pt-PT, es-ES)
- [ ] Domínios regionais (.com, .pt)
- [ ] Conteúdo localizado

---

## 📊 KPIs (Key Performance Indicators)

### Mês 1:
- 100 visitantes/dia orgânicos
- 10 keywords no top 100
- 20+ artigos publicados

### Mês 3:
- 500 visitantes/dia orgânicos
- 5 keywords no top 10
- 50+ backlinks
- DA 15+

### Mês 6:
- 1,000 visitantes/dia orgânicos
- 3 keywords posição #1
- 100+ backlinks
- DA 25+
- Featured snippets em 5+ queries

---

## ✅ SEO Checklist (Toda página nova)

- [ ] Title tag otimizado (<60 chars)
- [ ] Meta description (<160 chars)
- [ ] H1 único e descritivo
- [ ] H2-H6 hierarquia lógica
- [ ] Alt text em imagens
- [ ] Internal links (3-5)
- [ ] External links (1-2 autoridade)
- [ ] Structured data relevante
- [ ] URL amigável (kebab-case)
- [ ] Mobile-friendly
- [ ] Loading <3s

---

**Status:** Implementação técnica completa ✅
**Next:** Content marketing + Link building 🚀

_Última atualização: 2026-02-24_
