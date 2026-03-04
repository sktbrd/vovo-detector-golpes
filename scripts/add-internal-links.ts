import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'posts');

// Clusters de artigos relacionados
const clusters = {
  pix: {
    title: '🔗 Artigos Relacionados sobre Golpes no PIX',
    articles: [
      { slug: 'como-identificar-golpe-no-pix', title: 'Como Identificar Golpe no PIX' },
      { slug: 'golpe-pix-itau-como-identificar', title: 'Golpe PIX Itaú: Como Identificar' },
      { slug: 'golpe-pix-banco-do-brasil-2024', title: 'Golpe PIX Banco do Brasil 2024' },
      { slug: 'golpe-pix-nubank-whatsapp', title: 'Golpe PIX Nubank via WhatsApp' },
      { slug: 'como-saber-se-um-pix--golpe', title: 'Como Saber se um PIX é Golpe' },
      { slug: 'pix-estornado--golpe', title: 'PIX Estornado é Golpe?' },
      { slug: 'top-7-golpes-pix-2026', title: 'Top 7 Golpes PIX em 2026' },
    ]
  },
  whatsapp: {
    title: '🔗 Artigos Relacionados sobre Golpes no WhatsApp',
    articles: [
      { slug: 'golpe-do-whatsapp-clonado', title: 'Golpe do WhatsApp Clonado' },
      { slug: 'golpe-whatsapp-fingindo-ser-parente', title: 'Golpe WhatsApp Fingindo ser Parente' },
      { slug: 'golpe-whatsapp-se-passando-por-empresa', title: 'Golpe WhatsApp se Passando por Empresa' },
      { slug: 'como-saber-se-whatsapp-foi-clonado', title: 'Como Saber se WhatsApp Foi Clonado' },
      { slug: 'recuperar-whatsapp-clonado', title: 'Como Recuperar WhatsApp Clonado' },
      { slug: 'golpe-whatsapp-com-link', title: 'Golpe WhatsApp com Link Falso' },
      { slug: 'novo-golpe-whatsapp-web', title: 'Novo Golpe WhatsApp Web' },
    ]
  },
  bancos: {
    title: '🔗 Artigos Relacionados sobre Golpes Bancários',
    articles: [
      { slug: 'golpe-do-falso-funcionario-do-banco', title: 'Golpe do Falso Funcionário de Banco' },
      { slug: 'golpe-do-emprestimo-falso', title: 'Golpe do Empréstimo Falso' },
      { slug: 'como-saber-se-meu-cartao-foi-clonado', title: 'Como Saber se Meu Cartão Foi Clonado' },
      { slug: 'golpe-da-maquininha-banco-do-brasil', title: 'Golpe da Maquininha Banco do Brasil' },
    ]
  }
};

function generateRelatedLinks(currentSlug: string, clusterArticles: Array<{ slug: string; title: string }>) {
  const related = clusterArticles
    .filter(article => article.slug !== currentSlug)
    .slice(0, 3); // Max 3 links

  if (related.length === 0) return '';

  return `\n\n---\n\n## 📚 Leia Também\n\n${related.map(article => 
    `- [${article.title}](/blog/${article.slug})`
  ).join('\n')}\n`;
}

function addInternalLinks() {
  let updated = 0;

  for (const [clusterName, cluster] of Object.entries(clusters)) {
    console.log(`\n📂 Processing ${clusterName} cluster...`);

    for (const article of cluster.articles) {
      const filePath = path.join(POSTS_DIR, `${article.slug}.md`);

      if (!fs.existsSync(filePath)) {
        console.log(`  ⚠️  File not found: ${article.slug}.md`);
        continue;
      }

      const content = fs.readFileSync(filePath, 'utf-8');

      // Check if already has related links
      if (content.includes('## 📚 Leia Também') || content.includes('Artigos Relacionados')) {
        console.log(`  ⏭️  Skipping ${article.slug} (already has related links)`);
        continue;
      }

      // Generate related links
      const relatedLinks = generateRelatedLinks(article.slug, cluster.articles);

      // Add before the last line (usually empty)
      const updatedContent = content.trimEnd() + relatedLinks + '\n';

      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`  ✅ Added related links to ${article.slug}`);
      updated++;
    }
  }

  console.log(`\n✨ Done! Updated ${updated} articles with internal links.`);
}

addInternalLinks();
