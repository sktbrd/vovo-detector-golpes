# 🎯 Next Steps - Vovó SEO Automation

**Current Status:** ✅ Phase 1 Complete (Foundation)  
**Next Phase:** Phase 2 (Intelligence)

---

## 🕐 Timeline

### This Week (2026-02-22 → 2026-03-02)

#### Monday 2026-02-23
**Morning (after 04:00):**
- [ ] ✅ Check Telegram for first automatic notification
- [ ] ✅ Verify 3 new articles created in `/posts`
- [ ] ✅ Review article quality
- [ ] 📝 Submit new URLs to Search Console

**Action:**
```bash
# Verify articles
ls -lht ~/workspace-freelancer/vovo/posts/*.md | head -3

# Check report
cat ~/workspace-freelancer/vovo/automation/data/reports/2026-02-23.json | jq
```

#### Tuesday 2026-02-24
**Task:** Start Search Console API integration

**Steps:**
1. Enable Search Console API
   - Go to: https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
   - Enable API

2. Create OAuth2 credentials
   - Type: Desktop application
   - Download JSON → save as `automation/google-credentials.json`

3. First authentication
   ```bash
   cd ~/workspace-freelancer/vovo
   pnpm tsx automation/scripts/search-console-pull.ts
   # Will open browser for auth
   ```

**Goal:** Pull first batch of Search Console data

#### Wednesday 2026-02-25
**Task:** Analyze first week's performance

- [ ] Review 9 articles generated (3/day × 3 days)
- [ ] Check GA4 for traffic changes
- [ ] Identify which articles are getting impressions
- [ ] Adjust keyword queue based on data

#### Thursday 2026-02-26
**Task:** Optimize content generator

- [ ] Increase article length (1000-1500 words)
- [ ] Add more LSI keywords (8-10 per article)
- [ ] Improve prompts for better quality

**Edit:**
```typescript
// In automation/daily/content-generator.ts
targetLength: 1200, // up from 600
lsi: ['keyword1', 'keyword2', ..., 'keyword10'] // more variations
```

#### Friday 2026-02-27
**Task:** Add 10 more keywords to queue

- [ ] Pick from `automation/KEYWORD_IDEAS.md`
- [ ] Focus on high-priority (golpes PIX, WhatsApp)
- [ ] Add to `content-generator.ts`

#### Weekend 2026-02-28–2026-03-02
**Task:** Weekly review + planning

- [ ] Update `PROGRESS.md` with actual metrics
- [ ] Review all 15-18 articles generated
- [ ] Plan Phase 3 (Performance Loop)
- [ ] Document learnings

---

## 📅 Month 1 Roadmap (2026-02-22 → 2026-03-22)

### Week 1: Validation & Intelligence
- [x] ✅ Activate cron job
- [ ] ⏳ Search Console API integration
- [ ] ⏳ First performance data analysis
- [ ] ⏳ 21 articles generated

### Week 2: Optimization
- [ ] Content quality improvements
- [ ] Keyword research (manual)
- [ ] Internal linking strategy
- [ ] Schema markup implementation

### Week 3: Performance Loop
- [ ] Identify keywords in position 11-20
- [ ] Create content to push those keywords
- [ ] Refresh underperforming articles
- [ ] CTR optimization (meta descriptions)

### Week 4: Scaling
- [ ] Add 20 more keywords to queue
- [ ] Implement automatic keyword discovery
- [ ] Plan backlink outreach
- [ ] Review: 90 articles generated

---

## 🔧 Specific Tasks

### Search Console API Integration (Priority: HIGH)

**Goal:** Get real performance data to guide content creation

**Implementation:**
```typescript
// automation/scripts/search-console-pull.ts

// 1. OAuth2 Flow
import { google } from 'googleapis';
const searchconsole = google.searchconsole('v1');

// 2. Fetch Data
const response = await searchconsole.searchanalytics.query({
  siteUrl: 'https://detectordegolpes.com.br',
  requestBody: {
    startDate: '2026-02-15',
    endDate: '2026-02-22',
    dimensions: ['query', 'page'],
    rowLimit: 1000
  }
});

// 3. Process & Save
const report = processSearchConsoleData(response.data);
fs.writeFileSync(`data/search-console/${today}.json`, JSON.stringify(report));
```

**Resources:**
- Docs: https://developers.google.com/webmaster-tools/search-console-api-original/v3/
- OAuth2: https://developers.google.com/identity/protocols/oauth2

---

### Content Quality Improvements (Priority: MEDIUM)

**Goal:** Increase article length and depth

**Changes:**
```typescript
// 1. Longer content
targetLength: 1200 // was 600

// 2. Better structure
const systemPrompt = `
...existing prompt...

Seções obrigatórias:
1. Introdução (150-200 palavras)
2. O que é [golpe]? (200-300 palavras)
3. Como funciona (300-400 palavras)
4. Sinais de alerta (lista de 8-10 itens)
5. Como se proteger (lista de 8-10 dicas)
6. O que fazer se for vítima (200-300 palavras)
7. Conclusão + CTA (100-150 palavras)

Incluir:
- Exemplos reais (2-3 por artigo)
- Estatísticas (se aplicável)
- Citação de fontes (Banco Central, Serasa, etc)
`;

// 3. More LSI keywords
lsi: [
  'primary variation 1',
  'primary variation 2',
  'related keyword 1',
  'related keyword 2',
  'long-tail 1',
  'long-tail 2',
  'question format 1',
  'question format 2'
] // 8-10 keywords
```

---

### Schema Markup Implementation (Priority: MEDIUM)

**Goal:** Rich snippets in Google search results

**Implementation:**
```typescript
// automation/daily/content-generator.ts

function generateSchemaMarkup(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": "Detector de Golpes"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Detector de Golpes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://detectordegolpes.com.br/logo.png"
      }
    },
    "datePublished": article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://detectordegolpes.com.br/blog/${article.slug}`
    }
  };
}

// Add to frontmatter
const schema = JSON.stringify(generateSchemaMarkup(article));
frontmatter += `schema: '${schema}'\n`;
```

---

### Internal Linking Engine (Priority: LOW)

**Goal:** Boost SEO through internal link network

**Implementation:**
```typescript
// automation/scripts/internal-linking.ts

function findRelatedArticles(currentArticle: Article, allArticles: Article[]) {
  // 1. Extract keywords from current article
  // 2. Find articles with similar keywords
  // 3. Calculate relevance score
  // 4. Return top 3-5 related articles
}

function injectInternalLinks(content: string, relatedArticles: Article[]) {
  // 1. Find natural insertion points (after H2 sections)
  // 2. Add links to related articles
  // 3. Use anchor text with keywords
}

// Run after article generation
const relatedArticles = findRelatedArticles(newArticle, existingArticles);
newArticle.content = injectInternalLinks(newArticle.content, relatedArticles);
```

---

## 📊 Metrics to Track

### Daily
- Articles generated (target: 3)
- Cron success/failure
- Generation time (current: ~12s)

### Weekly
- Total articles (target: +21/week)
- GA4 active users
- GA4 events
- New keywords added to queue

### Monthly
- Total articles (target: 100 by Month 1 end)
- Search Console impressions
- Search Console clicks
- CTR average
- Keywords ranking (any position)
- Page 1 rankings

---

## 🚨 Red Flags to Watch

### Cron Issues
- ❌ No Telegram notification received
- ❌ Articles not generated
- ❌ Error in logs

**Action:** Check `automation/data/reports/cron-*.log`

### Content Quality Issues
- ❌ Articles too short (<800 words)
- ❌ Repetitive content
- ❌ Factual errors

**Action:** Adjust prompts, increase temperature

### Performance Issues
- ❌ No traffic growth after 2 weeks
- ❌ Articles not indexed after 1 week
- ❌ High bounce rate (>80%)

**Action:** Review content quality, check Search Console

---

## 🎓 Learning Objectives

### By End of Month 1
- [ ] Understand Search Console data
- [ ] Know which types of articles perform best
- [ ] Identify optimal keyword patterns
- [ ] Master content optimization

### By End of Month 2
- [ ] Automated keyword research working
- [ ] Performance loop optimizing content
- [ ] First backlinks acquired
- [ ] 50+ Page 1 rankings

### By End of Month 3
- [ ] Full autonomy achieved
- [ ] Consistent 10k+ impressions/week
- [ ] 500+ clicks/week
- [ ] Zero manual intervention needed

---

## 📞 When to Reach Out

### Contact Freelancer Dev if:
- Cron fails for 2+ consecutive days
- Need help with Search Console API
- Want to add new features
- Need code review/optimization

### Self-Service:
- Adding keywords → Edit `content-generator.ts`
- Checking logs → `automation/data/reports/`
- Manual run → `./automation/cron-wrapper.sh`
- Disable cron → Edit `~/.openclaw/config.json`

---

_Next review: 2026-02-23 (after first automatic run)_  
_Updated: 2026-02-22 16:35 BRT_
