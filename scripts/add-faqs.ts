import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'posts');

const faqsToAdd = {
  'como-identificar-golpe-no-pix': {
    import: "import FAQSchema from '@/components/FAQSchema';\nimport { pixFAQs } from '@/data/faqs';",
    component: '\n\n<FAQSchema faqs={pixFAQs} />\n',
  },
  'golpe-do-whatsapp-clonado': {
    import: "import FAQSchema from '@/components/FAQSchema';\nimport { whatsappFAQs } from '@/data/faqs';",
    component: '\n\n<FAQSchema faqs={whatsappFAQs} />\n',
  },
  'como-saber-se-meu-cartao-foi-clonado': {
    import: "import FAQSchema from '@/components/FAQSchema';\nimport { cartaoFAQs } from '@/data/faqs';",
    component: '\n\n<FAQSchema faqs={cartaoFAQs} />\n',
  },
};

function addFAQs() {
  for (const [slug, faq] of Object.entries(faqsToAdd)) {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${slug}.md`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already has FAQ
    if (content.includes('FAQSchema') || content.includes('Perguntas Frequentes')) {
      console.log(`⏭️  Skipping ${slug} (already has FAQ)`);
      continue;
    }

    // Add import at the top (after frontmatter)
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
      console.log(`⚠️  No frontmatter in ${slug}.md`);
      continue;
    }

    const beforeFrontmatter = content.substring(0, frontmatterEnd + 3);
    const afterFrontmatter = content.substring(frontmatterEnd + 3);

    const updatedContent = beforeFrontmatter + '\n\n' + faq.import + '\n' + afterFrontmatter.trimStart() + faq.component;

    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✅ Added FAQ to ${slug}`);
  }

  console.log('\n✨ Done! FAQs added to articles.');
}

addFAQs();
