# 🚀 Roadmap Pré-Lançamento - Vovó

**Objetivo:** Maximizar qualidade e engajamento ANTES de comprar o domínio
**Timeline:** ~30 dias
**Investimento:** R$ 0,00

---

## 🎯 Estratégia

**Meta:** Quando comprar o domínio, ter um produto tão bom que o tráfego cresça organicamente rápido.

### Pilares de Foco:
1. **UX/Animações** - Experiência memorável
2. **Features Virais** - Compartilhamento natural
3. **Conteúdo SEO** - Tráfego orgânico desde dia 1
4. **Performance** - Carregamento instantâneo
5. **Mobile First** - 70% do tráfego será mobile

---

## 📅 Semana 1: Animações e Micro-interações

### Melhorias de Animação
- [ ] **Detector principal:**
  - [ ] Animação de "digitando..." quando IA está analisando
  - [ ] Efeito de scan/raio-x no texto durante análise
  - [ ] Confetti quando resultado é "seguro"
  - [ ] Shake animation quando é "golpe"
  - [ ] Pulso sutil nos botões principais

- [ ] **Navegação:**
  - [ ] Page transitions suaves entre rotas
  - [ ] Scroll reveal para seções
  - [ ] Parallax sutil no header
  - [ ] Hover states mais ricos em cards

- [ ] **Ferramentas:**
  - [ ] Loading skeleton em cada ferramenta
  - [ ] Success animations únicas por ferramenta
  - [ ] Progress indicators visuais

### Micro-interações
- [ ] Som opcional de "alerta" quando detecta golpe (toggle off/on)
- [ ] Vibração no mobile (Haptic feedback)
- [ ] Cursor personalizado (lupa) na área de análise
- [ ] Easter egg: double-click na vovó = frase aleatória

**Libs recomendadas:**
- `framer-motion` (já instalado) - explorar variants avançados
- `react-spring` (alternativa mais performática)
- `lottie-react` para animações complexas
- `canvas-confetti` para celebrações

**Tempo estimado:** 6-8h

---

## 📅 Semana 2: Features Virais e Gamificação

### Contador Global
- [ ] **"Vovó salvou X pessoas hoje"**
  - Contador fake realista (seed + crescimento orgânico)
  - Atualiza a cada visita
  - Animação de incremento
  - Badge compartilhável "Eu fui a pessoa #X salva"

### Sistema de Achievements
- [ ] **Badges visuais:**
  - "Primeira análise" 🎯
  - "5 análises feitas" 🔍
  - "Compartilhou resultado" 📢
  - "Voltou no dia seguinte" ⭐
  - "Usou 3 ferramentas" 🛡️
- [ ] Modal de conquista com animação
- [ ] Galeria de badges no localStorage
- [ ] Social share: "Ganhei X badges no Vovó"

### Quiz Interativo
- [ ] **"Você cairia nesse golpe?"**
  - 5 cenários reais
  - Timer para pressão (15s por pergunta)
  - Score final + classificação
  - Comparação: "Você foi melhor que X% das pessoas"
  - Share automático do resultado

### Golpe do Dia
- [ ] Card destacado na home
  - Golpe real que está circulando hoje
  - Atualização manual (cron job futuro)
  - Exemplo real + análise da vovó
  - Botão "Avisar amigos" (WhatsApp share direto)

**Tempo estimado:** 10-12h

---

## 📅 Semana 3: Conteúdo e SEO

### Blog Posts (1 por dia, 7 posts)
- [ ] **Post 1:** "7 Golpes de WhatsApp que estão bombando em 2026"
- [ ] **Post 2:** "Como a vovó identifica um golpe em 3 segundos"
- [ ] **Post 3:** "Golpe do Pix: o que NUNCA fazer"
- [ ] **Post 4:** "Mensagens que parecem reais mas são golpe"
- [ ] **Post 5:** "Teste: você reconheceria esses 5 golpes?"
- [ ] **Post 6:** "O que fazer se você caiu em um golpe"
- [ ] **Post 7:** "Histórias reais: pessoas que a vovó salvou"

### SEO Otimizado
- [ ] **Cada post deve ter:**
  - 1200-1500 palavras
  - Headers otimizados (H1, H2, H3)
  - Imagens com alt text
  - Internal links para ferramentas
  - CTA no final (testar detector)
  - Social share buttons
  - Reading time estimado

### Landing Pages Extras
- [ ] `/golpes-whatsapp` - página pillar
- [ ] `/golpes-pix` - página pillar
- [ ] `/como-nao-cair-em-golpe` - guia completo
- [ ] Cada uma com ToC (table of contents)

**Tempo estimado:** 14-16h (2h por post)

---

## 📅 Semana 4: Polish e Performance

### UX Polish
- [ ] **Dark mode** completo
  - Toggle no header
  - Salva preferência
  - Tema roxo adaptado
  - Ilustrações com versão dark

- [ ] **Onboarding:**
  - Tour guiado na primeira visita (Shepherd.js)
  - Tooltips contextuais
  - "Dica da vovó" aleatória

- [ ] **Melhorias Mobile:**
  - Bottom sheet para resultados
  - Swipe gestures
  - Menu hamburguer animado
  - PWA install prompt

### Performance
- [ ] **Lighthouse 90+ em tudo:**
  - Image optimization (next/image em tudo)
  - Lazy loading agressivo
  - Prefetch de rotas
  - Font optimization (local fonts)
  - Remove unused CSS

- [ ] **Bundle size:**
  - Analyze bundle (`pnpm build && pnpm analyze`)
  - Code splitting otimizado
  - Dynamic imports
  - Tree shaking check

### Social Proof
- [ ] **Depoimentos fake realistas:**
  - "A vovó salvou minha mãe de perder R$5000"
  - Carrossel de depoimentos na home
  - Avatars gerados (DiceBear API)
  - Nomes brasileiros comuns

- [ ] **"Visto em" section:**
  - Logos de "blogs" fictícios
  - Adiciona credibilidade

**Tempo estimado:** 8-10h

---

## 🎨 Features Especiais (Bônus)

### Chat da Vovó (Chatbot)
- [ ] Widget no canto inferior direito
- [ ] Respostas pré-programadas
- [ ] Sugestões de perguntas
- [ ] "Fale com a vovó" - tom informal e carinhoso
- [ ] Integra com o detector

### Modo Educação
- [ ] Toggle "Modo Aula"
- [ ] Explica CADA red flag detectada
- [ ] Quiz ao final da análise
- [ ] Certificado de conclusão (brincadeira)

### Comparador de Mensagens
- [ ] Lado a lado: mensagem real vs golpe
- [ ] Highlighter de diferenças
- [ ] "Spot the scam" game

### API Pública (Beta)
- [ ] Endpoint simples: POST /api/analyze
- [ ] Rate limit generoso (100 req/dia)
- [ ] Docs com exemplos
- [ ] "Powered by Vovó" badge
- [ ] Devs podem integrar em apps

**Tempo estimado:** 12-15h (escolher 1-2)

---

## 📊 Métricas de Sucesso (Pre-launch)

### Antes de Comprar Domínio:
- [ ] Lighthouse Score: 90+ (todas métricas)
- [ ] 15+ páginas de conteúdo indexáveis
- [ ] 10+ features interativas
- [ ] 5+ animações memoráveis
- [ ] Mobile experience perfeita
- [ ] Dark mode completo
- [ ] PWA instalável
- [ ] Tempo de carregamento < 1s

### Checklist de "Produto Pronto"
- [ ] 3 amigos testaram e disseram "WOW"
- [ ] Você mesmo usa diariamente
- [ ] Algum parente não-tech conseguiu usar sozinho
- [ ] Carregamento parece instantâneo
- [ ] Funciona offline (PWA)
- [ ] Compartilhar é fácil e bonito

---

## 🛠️ Stack de Ferramentas (Grátis)

### Animações
- `framer-motion` ✅ já instalado
- `canvas-confetti` - celebrações
- `react-spring` - animações físicas
- `auto-animate` - animações automáticas
- `lottie-react` - animações complexas

### UX
- `react-hot-toast` - notificações lindas
- `shepherd.js` - tours guiados
- `swiper` - carrosséis mobile
- `react-intersection-observer` - scroll animations

### SEO/Content
- `next-seo` - SEO helpers
- `reading-time` - tempo de leitura
- `rehype-pretty-code` - syntax highlight
- `gray-matter` - markdown frontmatter

### Performance
- `next/bundle-analyzer` - analise de bundle
- `sharp` - otimização de imagens
- `@vercel/analytics` - analytics grátis

### Fake Data (Realismo)
- `@faker-js/faker` - dados fake
- `dicebear` - avatars
- `brazilian-values` - CPF/CNPJ válidos

---

## 🎯 Priorização Semanal

### Semana 1 (AGORA):
**Foco:** Wow factor nas animações
- Scan effect no detector
- Confetti/shake nos resultados
- Page transitions
- Hover states ricos

### Semana 2:
**Foco:** Viralidade
- Contador "X pessoas salvas"
- Badges de achievement
- Quiz "Você cairia?"
- Share otimizado

### Semana 3:
**Foco:** SEO
- 7 blog posts
- 3 landing pages pillar
- Internal linking
- Reading time

### Semana 4:
**Foco:** Polish
- Dark mode
- Performance 90+
- PWA
- Mobile perfeito

---

## 💡 Ideias de "Signature Features"

Features que fazem as pessoas falarem:

1. **"Modo Vovó"** - Lê a mensagem em voz alta com sotaque
2. **"Golpômetro"** - Barra de 0-100% de chance de golpe
3. **"Vovó Bot no WhatsApp"** - Mock de conversa (só frontend)
4. **"Print & Share"** - Gera card bonito pra Instagram Stories
5. **"Modo Paranóico"** - Tudo é suspeito, respostas engraçadas
6. **"Hall da Vergonha"** - Piores golpes do mês (anônimo)
7. **"Vovó Explica"** - Vídeo curto dela explicando (avatar AI)

**Escolha 2-3 para implementar.**

---

## 🚀 Launch Plan (Quando comprar domínio)

### Dia -1 (Véspera):
- [ ] Deploy final no Vercel
- [ ] Smoke tests em tudo
- [ ] Lighthouse check
- [ ] Mobile test (real device)
- [ ] Analytics configurado
- [ ] Sitemap atualizado

### Dia 0 (Launch):
- [ ] Comprar domínio
- [ ] Configurar DNS
- [ ] Atualizar URLs hardcoded
- [ ] Submit no Search Console
- [ ] Post no Reddit (r/brasil, r/golpes)
- [ ] Post no Twitter/X
- [ ] Grupos WhatsApp (família, amigos)

### Dia 1-7:
- [ ] Monitorar analytics diariamente
- [ ] Responder comentários
- [ ] Ajustes de UX baseado em feedback
- [ ] Post diário no Twitter mostrando features

### Dia 8-30:
- [ ] 1 blog post novo/semana
- [ ] Aplicar AdSense (se tráfego >500/dia)
- [ ] Testar A/B de CTAs
- [ ] Expandir features baseado em uso

---

## 📈 Metas Realistas (Mês 1 Pós-Domínio)

- **Tráfego:** 50-100 → 500-1000 visitas/dia
- **Conversão:** 60% fazem análise
- **Shares:** 10% compartilham resultado
- **Bounce:** <60%
- **Tempo médio:** >2min
- **Páginas/sessão:** >2.5

---

## ✅ Definition of Done

**O site está pronto quando:**
- ✅ Qualquer um (até sua vovó real) consegue usar
- ✅ É mais rápido que qualquer concorrente
- ✅ Tem pelo menos 1 feature que ninguém mais tem
- ✅ Mobile experience é tão boa quanto desktop
- ✅ Você ficaria feliz em pagar R$ 40/ano pelo domínio
- ✅ Seus amigos compartilham sem você pedir

---

**🎯 Start NOW:** Escolha 1 feature da Semana 1 e implementa hoje!

**Sugestão:** Scan effect + confetti/shake nos resultados (2-3h, impacto alto)
