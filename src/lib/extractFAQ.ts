/**
 * Extract FAQ items from markdown content
 * Looks for H3 headings ending with "?" and extracts the following content as answer
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export function extractFAQFromMarkdown(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];
  
  // Remove emojis from content first
  const cleanContent = content.replace(/[🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️📢📚]/g, '');
  
  // Split content by H3 headings (###)
  const sections = cleanContent.split(/^###\s+/m);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n');
    const heading = lines[0].trim();
    
    // Check if heading is a question (ends with ?)
    if (heading.endsWith('?')) {
      const question = heading;
      
      // Get content until next heading or end
      let answer = '';
      for (let j = 1; j < lines.length; j++) {
        const line = lines[j].trim();
        // Stop at next heading
        if (line.startsWith('##')) break;
        if (line) {
          answer += line + ' ';
        }
      }
      
      // Clean up answer: remove markdown, keep first ~200 chars
      answer = answer
        .replace(/\*\*/g, '') // Remove bold
        .replace(/\*/g, '')   // Remove italic
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
        .replace(/`([^`]+)`/g, '$1') // Remove code
        .trim();
      
      // Only add if answer is substantial (> 30 chars)
      if (answer.length > 30) {
        // Truncate long answers for schema (Google recommends < 300 chars)
        if (answer.length > 280) {
          answer = answer.substring(0, 277) + '...';
        }
        
        faqs.push({ question, answer });
      }
    }
  }
  
  return faqs;
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  if (faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
