# 🖼️ Featured Images Plan - Blog Articles

**Goal:** Add distinctive featured images to all 15 blog articles

---

## Why Featured Images Matter

**SEO Benefits:**
- Better click-through rate (CTR) from search results
- Social media shares look professional
- Improved engagement (visual > text-only)
- OpenGraph/Twitter cards work better

**Brand Benefits:**
- Consistent visual identity
- Professional appearance
- Memorable brand (teal + pink colors)
- Trustworthy

---

## Image Specifications

### Technical
- **Size:** 1200x630px (optimal for OG images)
- **Format:** PNG or WebP (better compression)
- **Location:** `/public/blog/[slug].png`
- **Alt text:** Descriptive, keyword-rich

### Style Guide
**Theme:** Brazilian grandma detective (Vovó)
**Colors:**
- Primary: Teal (#06B6D4)
- Accent: Pink (#EC4899)
- Neutral: Slate-900, White

**Style:** 
- Flat illustration or modern cartoon
- Friendly, approachable, not scary
- Clear focal point (vovó character)
- Contextual elements (phone, link, card, etc.)

**Mood:**
- Helpful, not alarming
- Trustworthy
- Approachable
- Professional but friendly

---

## Generation Options

### Option A: OpenAI DALL-E 3 (via API)
**Pros:**
- High quality
- Consistent style
- Fast (30s/image)
- Can batch generate

**Cons:**
- Requires API key
- ~$0.04/image ($0.60 total for 15)
- Need to setup API call

**How:**
```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "...",
    "size": "1024x1024",
    "quality": "standard",
    "n": 1
  }'
```

### Option B: Midjourney (Discord)
**Pros:**
- Best quality
- Very consistent style
- /imagine batch commands

**Cons:**
- Manual process (Discord)
- Slower (~2min/image)
- Requires subscription ($10/mo)

**How:**
```
/imagine Brazilian grandma detective looking at 
suspicious WhatsApp message, teal and pink colors,
flat illustration style, friendly, --ar 16:9
```

### Option C: Stable Diffusion (Local)
**Pros:**
- Free
- Full control
- Can run locally

**Cons:**
- Requires setup
- Slower on CPU
- Quality varies

### Option D: Canva Templates
**Pros:**
- Easy
- Free tier available
- Templates ready
- Export 1200x630

**Cons:**
- Generic look
- Manual one-by-one
- Less distinctive

### Option E: Placeholder + Generate Later
**Pros:**
- Ship now, perfect later
- Can test with placeholders
- Not blocking launch

**Cons:**
- Suboptimal for now
- Need to come back

---

## Recommended Approach

**Phase 1: Placeholders (Today)**
- Use simple colored backgrounds
- Add article title overlay
- Quick, gets us shipping

**Phase 2: Real Images (This Week)**
- Generate via DALL-E 3 or Midjourney
- 15 images × ~2min = 30 minutes work
- Professional, distinctive, on-brand

---

## Prompt Templates

### Generic (works for all)
```
A friendly Brazilian grandmother character with glasses,
detective theme, analyzing [SPECIFIC_CONTEXT], 
modern flat illustration, teal (#06B6D4) and pink (#EC4899)
accent colors, clean background, approachable style,
professional digital art, 16:9 aspect ratio
```

### Specific Examples

**PIX Scams:**
```
Brazilian grandma detective looking at smartphone with PIX 
payment screen showing suspicious transfer, magnifying glass
in hand, teal and pink color scheme, flat illustration, 
warning signs floating around, friendly professional style
```

**WhatsApp Cloning:**
```
Elderly Brazilian woman inspecting two phones showing same 
WhatsApp account, detective hat, concerned but helpful 
expression, teal and pink colors, modern illustration,
shield icon in background, security theme
```

**Credit Card Scams:**
```
Grandma character analyzing credit card with magnifying 
glass, spotting fake details, detective theme, teal and
pink accent colors, flat vector style, professional
digital illustration, security symbols
```

---

## Implementation

### 1. Frontmatter Update

```markdown
---
title: "Article Title"
description: "..."
publishedAt: "2026-02-22"
keywords: ["..."]
image: "/blog/article-slug.png"  # ADD THIS
imageAlt: "Brazilian grandma detective analyzing [context]"
---
```

### 2. Blog Card Component

```tsx
{post.image && (
  <img 
    src={post.image}
    alt={post.imageAlt}
    className="w-full h-48 object-cover border-4 border-black"
  />
)}
```

### 3. OpenGraph Meta Tags

```tsx
<meta property="og:image" content={`https://detectordegolpes.com.br${post.image}`} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={`https://detectordegolpes.com.br${post.image}`} />
```

---

## Articles Needing Images (15 total)

1. como-identificar-golpe-no-pix
2. golpe-do-whatsapp-clonado
3. golpe-do-falso-motoboy
4. golpe-pix-itau-como-identificar
5. golpe-pix-banco-do-brasil-2024
6. golpe-pix-nubank-whatsapp
7. como-saber-se-um-pix--golpe
8. pix-estornado--golpe
9. golpe-whatsapp-fingindo-ser-parente
10. golpe-whatsapp-se-passando-por-empresa
11. como-saber-se-whatsapp-foi-clonado
12. recuperar-whatsapp-clonado
13. como-identificar-mensagem-falsa
14. novo-golpe-whatsapp-web
15. top-7-golpes-pix-2026

---

## Budget

**DALL-E 3:**
- $0.040/image
- 15 images = $0.60
- Total: **Under $1**

**Midjourney:**
- Standard plan: $10/month
- Unlimited generations
- Total: **$10 (can cancel after)**

**Free options:**
- Canva: Free tier
- Placeholders: $0

---

## Timeline

**Option 1 (Fast - Placeholders):**
- Today: 30 minutes
- Simple backgrounds + text
- Ship immediately

**Option 2 (Quality - DALL-E):**
- This week: 1-2 hours
- Professional images
- Better SEO/engagement

**Option 3 (Best - Midjourney):**
- This week: 2-3 hours
- Highest quality
- Most distinctive

---

## Decision

**Recommendation:** 
1. Start with placeholders (ship now)
2. Generate real images with DALL-E 3 this week
3. Costs <$1, professional quality, on-brand

**Next step:**
- User decides which option
- I implement accordingly

---

_Created: 2026-02-22_  
_Status: Planning phase_
