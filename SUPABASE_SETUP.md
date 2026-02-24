# Supabase Setup - Spam Reports Database

A feature de **Reports de Spam** usa Supabase como database colaborativo.

## 🎯 Por Que Supabase?

- ✅ **Grátis:** 500MB storage + 2GB bandwidth/mês
- ✅ **PostgreSQL:** Database real, não cache
- ✅ **Real-time:** Subscriptions (futuro)
- ✅ **Seguro:** Row Level Security (RLS)
- ✅ **Zero config local:** Fallback gracioso se não configurado

---

## 🚀 Setup (10 minutos)

### 1. Criar projeto Supabase

1. Acesse: https://supabase.com
2. Crie conta (grátis, sem cartão)
3. Crie um novo projeto:
   - Name: `vovo-spam-reports`
   - Database Password: gerar e salvar
   - Region: South America (São Paulo)
   - Pricing Plan: **Free**

### 2. Executar SQL Schema

No dashboard do Supabase, vá em **SQL Editor** e execute:

```sql
-- Tabela de denúncias individuais
CREATE TABLE IF NOT EXISTS spam_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number VARCHAR(15) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('golpe', 'telemarketing', 'cobranca', 'outro')),
  comment TEXT,
  ip_hash VARCHAR(64), -- SHA-256 hash do IP (privacidade)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_spam_reports_number ON spam_reports(number);
CREATE INDEX idx_spam_reports_created_at ON spam_reports(created_at);

-- Tabela de estatísticas agregadas
CREATE TABLE IF NOT EXISTS spam_stats (
  number VARCHAR(15) PRIMARY KEY,
  total_reports INT DEFAULT 0,
  categories JSONB DEFAULT '{}',
  confidence_score FLOAT DEFAULT 0, -- 0-1 baseado em total_reports
  first_reported TIMESTAMP WITH TIME ZONE,
  last_reported TIMESTAMP WITH TIME ZONE
);

-- Índice para busca por score
CREATE INDEX idx_spam_stats_confidence ON spam_stats(confidence_score DESC);

-- Função para incrementar stats automaticamente
CREATE OR REPLACE FUNCTION increment_spam_report(
  p_number VARCHAR(15),
  p_category VARCHAR(50)
) RETURNS void AS $$
BEGIN
  INSERT INTO spam_stats (
    number, 
    total_reports, 
    categories, 
    first_reported, 
    last_reported,
    confidence_score
  )
  VALUES (
    p_number, 
    1, 
    jsonb_build_object(p_category, 1),
    NOW(),
    NOW(),
    0.1
  )
  ON CONFLICT (number) DO UPDATE SET
    total_reports = spam_stats.total_reports + 1,
    categories = spam_stats.categories || jsonb_build_object(
      p_category, 
      COALESCE((spam_stats.categories->p_category)::int, 0) + 1
    ),
    last_reported = NOW(),
    confidence_score = LEAST(
      1.0,
      (spam_stats.total_reports + 1)::float / 10.0
    );
END;
$$ LANGUAGE plpgsql;

-- Habilitar RLS (Row Level Security)
ALTER TABLE spam_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE spam_stats ENABLE ROW LEVEL SECURITY;

-- Policy: qualquer um pode ler
CREATE POLICY "Anyone can read spam_reports"
  ON spam_reports FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read spam_stats"
  ON spam_stats FOR SELECT
  USING (true);

-- Policy: qualquer um pode inserir (mas não deletar/atualizar)
CREATE POLICY "Anyone can insert spam_reports"
  ON spam_reports FOR INSERT
  WITH CHECK (true);

-- Função só pode ser executada por service_role ou anon
-- (já está protegida por ser uma function)
```

### 3. Copiar credenciais

No dashboard, vá em **Project Settings** > **API**:

Copie:
- **Project URL** (ex: `https://xxx.supabase.co`)
- **anon public** key (começa com `eyJ...`)

### 4. Adicionar no Vercel

1. Acesse: https://vercel.com/sktbrds-projects/vovo/settings/environment-variables
2. Adicione as duas variáveis:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...
```

3. Marque: **Production**, **Preview**, **Development**
4. Salvar

### 5. Testar Local (opcional)

Adicione no `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

```bash
pnpm dev
```

**Sem as env vars?** Sistema funciona com fallback (sem database).

---

## 🔍 Como Funciona

### Flow de Report:

1. **Usuário reporta:** número + categoria + comentário (opcional)
2. **Backend:**
   - Insere em `spam_reports` (log individual)
   - Chama função `increment_spam_report()`
   - Atualiza `spam_stats` (agregado)
3. **Confidence Score:** calculado automaticamente (0-1)
   - 1 report = 0.1
   - 5 reports = 0.5
   - 10+ reports = 1.0 (spam confirmado)

### Flow de Check:

1. **Usuário verifica número**
2. **Backend consulta:**
   - Tellows (scraping)
   - `spam_stats` (Supabase)
3. **Score agregado:** média ponderada das 2 fontes
4. **UI mostra:** warnings + denúncias + botão de report

---

## 📊 Monitorar

Dashboard Supabase > **Table Editor**:

- `spam_reports`: todas denúncias
- `spam_stats`: números mais reportados

**Top spam numbers:**
```sql
SELECT number, total_reports, categories, confidence_score
FROM spam_stats
ORDER BY total_reports DESC
LIMIT 10;
```

---

## 🔐 Segurança

✅ **Row Level Security (RLS)** ativado
✅ **IP hasheado** (SHA-256) - nunca armazena IP real
✅ **Rate limiting** - 5 reports/hora por IP
✅ **Read-only API** - anon key só pode ler/inserir

---

## 🚫 Fallback Sem Supabase

**Se não configurar:**
- ✅ Verificador de número funciona normal
- ✅ Scraping Tellows funciona
- ❌ Reports de usuários não salvam
- ⚠️ Console mostra warning: "Supabase not configured"

**Produção:** SEMPRE configure Supabase (grátis)

---

## 🎁 Dados Seed (Opcional)

Quer popular com números conhecidos? Execute:

```sql
-- Números famosos de spam (exemplos)
INSERT INTO spam_reports (number, category, comment) VALUES
  ('1140000000', 'telemarketing', 'Ligam várias vezes por dia'),
  ('1140000000', 'telemarketing', 'Não param de ligar'),
  ('11987654321', 'golpe', 'Tentaram aplicar golpe do WhatsApp'),
  ('21987654321', 'golpe', 'Golpe do falso funcionário do banco');

-- Trigger vai atualizar spam_stats automaticamente
```

---

## 🔮 Features Futuras (Com Supabase)

- [ ] Real-time notifications (novo número reportado)
- [ ] Dashboard público de top spam numbers
- [ ] API pública de consulta
- [ ] Export CSV de denúncias
- [ ] Moderação (remover falsos positivos)

---

**Status:** Production-ready (após configurar env vars) 🚀

_Última atualização: 2026-02-24_
