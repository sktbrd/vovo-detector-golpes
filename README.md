# 👵 Vovó - Detector de Golpes

Site que ajuda brasileiros a identificar golpes em mensagens de WhatsApp, SMS e e-mail.

## 🚀 Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS 4
- **Animações:** Framer Motion
- **IA:** Groq SDK (Llama 3.1 8B)

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Adicione sua GROQ_API_KEY em .env.local
# Pegue grátis em: https://console.groq.com

# Rodar em desenvolvimento
pnpm dev

# Build de produção
pnpm build
pnpm start
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Fork este repositório
2. Conecte no Vercel
3. Adicione a variável `GROQ_API_KEY`
4. Deploy automático! ✨

### Outras plataformas

Funciona em qualquer serviço que suporte Next.js (Netlify, Railway, etc).

## 🎨 Features

- ✅ Análise de mensagens com IA
- ✅ Categorização (seguro/suspeito/golpe)
- ✅ Exemplos clicáveis de golpes comuns
- ✅ Histórico local das últimas 5 análises
- ✅ Compartilhar resultados
- ✅ Animações elegantes
- ✅ Design responsivo

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `GROQ_API_KEY` | Chave da API Groq (grátis) | ✅ |

## 📝 Licença

MIT
