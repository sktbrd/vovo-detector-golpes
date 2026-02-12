# 📢 Configuração do Google AdSense

## 📋 Checklist antes de aplicar

✅ Site no ar com domínio próprio (não pode ser .vercel.app)  
✅ Conteúdo original e útil  
✅ Política de Privacidade publicada (/privacy)  
✅ Termos de Uso publicados (/terms)  
✅ Tráfego mínimo (~100 visitantes/dia recomendado)  
✅ Site responsivo e mobile-friendly  
✅ Sem conteúdo proibido (adult, violence, etc)

## 🚀 Passos para Aplicar

### 1. Aplicar no AdSense

1. Acesse: https://www.google.com/adsense
2. Faça login com sua conta Google
3. Clique em "Começar"
4. Preencha:
   - URL do site: `https://seudominio.com.br`
   - Email
   - País: Brasil
5. Aceite os termos

### 2. Adicionar código de verificação

1. Copie o código fornecido pelo AdSense
2. Edite `src/app/layout.tsx`
3. Descomente e atualize a linha do AdSense:
   ```tsx
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossOrigin="anonymous"
   ></script>
   ```
4. Substitua `ca-pub-XXXXXXXXXXXXXXXX` pelo seu Publisher ID
5. Deploy no Vercel

### 3. Confirmar no AdSense

1. Volte no painel do AdSense
2. Clique em "Verificar URL"
3. Aguarde aprovação (pode levar 1-3 dias)

### 4. Configurar Anúncios

Após aprovação:

1. No painel do AdSense, vá em "Anúncios"
2. Crie blocos de anúncios:
   - **Top Banner** (728x90 ou responsivo)
   - **Mid Banner** (336x280 ou responsivo)
3. Copie os códigos dos anúncios

### 5. Atualizar o código

Edite `src/app/components/AdSenseSlot.tsx`:

1. Descomente o bloco `<ins className="adsbygoogle">`
2. Adicione seu `data-ad-client`
3. Configure os slots:
   - `top-banner` → primeiro slot ID
   - `mid-banner` → segundo slot ID

Exemplo:
```tsx
<ins
  className="adsbygoogle"
  style={{ display: "block" }}
  data-ad-client="ca-pub-1234567890123456"
  data-ad-slot="9876543210" // ID do slot
  data-ad-format="auto"
  data-full-width-responsive="true"
></ins>
```

### 6. Deploy e Teste

1. Commit e push pro GitHub
2. Vercel faz deploy automático
3. Aguarde ~10min para ads aparecerem
4. Teste em modo anônimo

## 💰 Estimativa de Receita

Com 1000 visitas/dia:
- **CPM médio Brasil:** R$ 0,50 - R$ 2,00
- **CTR esperado:** 1-3%
- **Receita mensal estimada:** R$ 15 - R$ 180

Fatores que aumentam receita:
- ✅ Tráfego qualificado (busca orgânica)
- ✅ Visitantes desktop
- ✅ Tempo de permanência alto
- ✅ CTR bom (posição dos ads)

## 🔧 Otimização

**Melhores posições para ads:**
1. ✅ Acima do fold (visível sem scroll)
2. ✅ Depois do resultado da análise
3. ✅ Entre conteúdo útil

**Evite:**
- ❌ Muitos ads (máx 3-4 por página)
- ❌ Ads antes do conteúdo principal
- ❌ Click-bait

## 📊 Monitoramento

Acompanhe no painel do AdSense:
- Impressões
- Cliques
- CTR (Click-Through Rate)
- CPC (Cost Per Click)
- Receita diária/mensal

## ⚠️ Políticas do AdSense

**Proibido:**
- Click próprio nos ads
- Pedir cliques
- Posicionar ads enganosamente
- Conteúdo proibido

**Violações = ban permanente!**

## 🆘 Suporte

- Docs: https://support.google.com/adsense
- Comunidade: https://support.google.com/adsense/community
