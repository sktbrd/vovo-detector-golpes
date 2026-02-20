# 📋 TODO - Projeto Vovó

**Última atualização:** 2026-02-19

## 🎯 Status Atual vs Macro Plano

### ✅ Concluído (Fase 1 - MVP)
- [x] Interface completa com tema "vovó brasileira"
- [x] API `/api/analyze` funcionando (Groq + Llama 3.1)
- [x] Sistema de categorização (safe/suspicious/scam)
- [x] Exemplos clicáveis de golpes
- [x] Histórico local (últimas 5 análises)
- [x] Compartilhar resultados
- [x] Animações com Framer Motion
- [x] Design responsivo
- [x] SEO básico configurado
- [x] Privacy Policy + Terms of Service
- [x] AdSense slots preparados (não ativados)
- [x] Blog com 3 posts completos
- [x] 5 Ferramentas extras:
  - Verificador de Link
  - Gerador de Senha Forte
  - Validador CPF/CNPJ
  - Verificador de Número
  - Email Vazado (checker)
- [x] Navbar com navegação
- [x] Ilustrações personalizadas da Vovó

---

## 🚀 Fase 2: Deploy e Infraestrutura (PRÓXIMO)

### Deploy Vercel
- [ ] Criar conta Vercel (se ainda não tem)
- [ ] Conectar repo GitHub `sktbrd/vovo-detector-golpes`
- [ ] Configurar variável `GROQ_API_KEY` no Vercel
- [ ] Deploy inicial e testar
- [ ] Verificar logs e performance

**Tempo estimado:** 30min

### Domínio Próprio
- [ ] Decidir nome do domínio (sugestões no DEPLOY_CHECKLIST)
- [ ] Comprar domínio (.com.br recomendado)
- [ ] Configurar DNS no Vercel
- [ ] Aguardar propagação (1-24h)
- [ ] Atualizar URLs hardcoded:
  - [ ] `public/sitemap.xml`
  - [ ] `src/app/layout.tsx` (metadataBase)
  - [ ] Posts do blog (canonical URLs)

**Tempo estimado:** 2-4h (incluindo propagação DNS)

---

## 📊 Fase 3: Analytics e Monitoramento

### Google Analytics
- [ ] Criar conta Google Analytics
- [ ] Copiar Measurement ID (G-XXXXXXXXXX)
- [ ] Instalar `@next/third-parties`
- [ ] Adicionar `<GoogleAnalytics>` no layout
- [ ] Commit + Deploy
- [ ] Verificar dados chegando (24-48h)

**Alternativa:** Plausible Analytics (mais simples, sem cookies)

### Google Search Console
- [ ] Adicionar propriedade no Search Console
- [ ] Verificar via meta tag ou DNS
- [ ] Submeter sitemap.xml
- [ ] Configurar alertas
- [ ] Monitorar indexação

**Tempo estimado:** 1h

---

## 🎨 Fase 4: Melhorias UX/UI (Opcional, mas recomendado)

### Assets Visuais
- [ ] Criar logo vetorial (.svg)
- [ ] Gerar favicon.ico completo (16x16 a 512x512)
- [ ] Criar OG image (1200x630) para share social
- [ ] Apple touch icon
- [ ] Ajustar ilustrações da vovó (se necessário)

### PWA (Progressive Web App)
- [ ] Criar `manifest.json`
- [ ] Service Worker básico
- [ ] Ícones para instalação
- [ ] Testar "Add to Home Screen"

### UX Tweaks
- [ ] Melhorar feedback de loading
- [ ] Adicionar toast notifications
- [ ] Skeleton loading states
- [ ] Animações de entrada suaves
- [ ] Dark mode (opcional)

**Tempo estimado:** 4-6h

---

## 📈 Fase 5: SEO e Conteúdo

### Blog Posts Adicionais
- [ ] "Top 10 golpes de WhatsApp em 2026"
- [ ] "Como identificar golpe do Pix"
- [ ] "Golpe da falsa central - como se proteger"
- [ ] "Vovó te ensina a não cair em golpe"
- [ ] "Sinais de que você está sendo enganado online"
- [ ] Post mensal com estatísticas atualizadas

**Meta:** 1 post/semana mínimo

### Otimização SEO
- [ ] Schema.org markup (FAQ, HowTo)
- [ ] Breadcrumbs
- [ ] Sitemap XML dinâmico
- [ ] Internal linking strategy
- [ ] Alt text em todas imagens
- [ ] Meta descriptions únicas por página
- [ ] Canonical URLs corretos

**Tempo estimado:** 2-3h

---

## 💰 Fase 6: Monetização (Após Tráfego)

### Pré-requisitos
**⚠️ Aguardar:**
- Mínimo 2-4 semanas de tráfego
- ~500-1000 visitas/dia
- Domínio próprio ativo

### Google AdSense
- [ ] Aplicar no AdSense
- [ ] Adicionar código de verificação
- [ ] Aguardar aprovação (1-7 dias)
- [ ] Configurar blocos de anúncios
- [ ] Adicionar slots IDs nos componentes
- [ ] Descomentar código AdSense em `AdSenseSlot.tsx`
- [ ] Testar em modo anônimo
- [ ] Monitorar performance (CTR, CPM)

**Estimativa receita (1000 visitas/dia):**
- CPM Brasil: R$ 0,50 - R$ 2,00
- Receita mensal: R$ 15 - R$ 180

---

## 🔧 Fase 7: Features Virais e Crescimento

### Social Sharing
- [ ] Contador "Vovó salvou X pessoas" (global)
- [ ] Botão WhatsApp share otimizado
- [ ] Twitter/X card com preview
- [ ] Instagram stories template
- [ ] Share cards bonitos (Open Graph)
- [ ] Referral tracking (UTM)

### Gamificação
- [ ] Badge "Você ajudou X pessoas"
- [ ] Sistema de achievements
- [ ] "Golpe do dia" feature
- [ ] Quiz "Você cairia nesse golpe?"

### Integração WhatsApp
- [ ] Chatbot no WhatsApp (API Business)
- [ ] Enviar link do site automaticamente
- [ ] Alertas de golpes via WhatsApp

**Tempo estimado:** 8-12h

---

## 💎 Fase 8: Freemium Model (Opcional, Longo Prazo)

### Tier Gratuito (atual)
- 5 análises/dia
- Histórico de 5 itens
- Ferramentas básicas

### Tier Premium (R$ 9,90/mês)
- [ ] Análises ilimitadas
- [ ] Histórico permanente em nuvem
- [ ] API access para desenvolvedores
- [ ] Sem anúncios
- [ ] Alertas personalizados
- [ ] Prioridade na análise

### Implementação
- [ ] Escolher gateway: Stripe, Hotmart, PagSeguro
- [ ] Sistema de autenticação (NextAuth.js)
- [ ] Database (Supabase ou Vercel Postgres)
- [ ] Painel do usuário
- [ ] Sistema de assinatura
- [ ] Webhook handlers
- [ ] Email transacional

**Tempo estimado:** 20-30h

---

## 🛡️ Fase 9: Performance e Segurança

### Performance
- [ ] Lighthouse audit (target 90+ em todas métricas)
- [ ] Lazy loading de imagens
- [ ] Code splitting otimizado
- [ ] CDN para assets estáticos
- [ ] Compress responses (Gzip/Brotli)
- [ ] Cache headers otimizados
- [ ] Font optimization

### Segurança
- [ ] Rate limiting na API (proteção DDoS)
- [ ] CAPTCHA em análises (se houver abuso)
- [ ] Input sanitization
- [ ] CSP headers
- [ ] HTTPS enforcement
- [ ] Dependency audit (`pnpm audit`)

### Monitoramento
- [ ] Uptime monitoring (UptimeRobot ou similar)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Logs centralizados

**Tempo estimado:** 4-6h

---

## 📊 KPIs e Metas

### Semana 1-2
- [ ] Tráfego: 50-100 visitas/dia
- [ ] Bounce rate: <70%
- [ ] Tempo médio: >1min
- [ ] Análises: 20-50/dia

### Mês 1
- [ ] Tráfego: 500-1000 visitas/dia
- [ ] Análises: 200-300/dia
- [ ] Backlinks: 5-10
- [ ] Páginas indexadas: 10+

### Mês 3
- [ ] Tráfego: 2000-5000 visitas/dia
- [ ] Receita AdSense: R$ 50-200/mês
- [ ] Blog posts: 12+
- [ ] Position #1 para "detector golpes"

---

## 🎯 Ordem de Prioridade Recomendada

1. **AGORA (hoje/esta semana):**
   - Deploy Vercel
   - Google Analytics
   - Comprar domínio
   - Search Console

2. **Próximas 2 semanas:**
   - Blog posts (1/semana)
   - Melhorias UX
   - Social sharing

3. **Mês 1:**
   - SEO otimização
   - Features virais
   - PWA básico

4. **Após tráfego (mês 2+):**
   - Google AdSense
   - Performance tuning
   - Freemium (se fizer sentido)

---

## 🚨 Bloqueadores Críticos

- [ ] **Deploy Vercel** - sem isso, nada acontece
- [ ] **Domínio próprio** - necessário para AdSense e credibilidade
- [ ] **Analytics** - sem dados, sem otimização

---

## 💡 Ideias Futuras (Backlog)

- [ ] App mobile (React Native)
- [ ] Extensão do Chrome
- [ ] API pública para terceiros
- [ ] Integração Telegram bot
- [ ] Parceria com bancos/fintechs
- [ ] Programa de afiliados
- [ ] Canal no YouTube
- [ ] Podcast sobre segurança

---

**🚀 Próxima ação:** Deploy na Vercel!
