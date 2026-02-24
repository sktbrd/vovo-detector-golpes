// Schema.org Structured Data components

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vovó Detector de Golpes",
    "alternateName": "Detector de Golpes",
    "url": "https://detectordegolpes.com.br",
    "description": "Detector de golpes online gratuito. Analise mensagens suspeitas com inteligência artificial e proteja-se contra fraudes no Brasil.",
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://detectordegolpes.com.br/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vovó Detector de Golpes",
    "url": "https://detectordegolpes.com.br",
    "logo": "https://detectordegolpes.com.br/vovo-lupa.png",
    "description": "Plataforma gratuita de proteção contra golpes digitais no Brasil",
    "sameAs": [
      "https://github.com/sktbrd/vovo-detector-golpes"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "Portuguese"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ToolSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "author": {
      "@type": "Organization",
      "name": "Vovó Detector de Golpes"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({ 
  title, 
  description, 
  publishedAt, 
  url,
  keywords 
}: { 
  title: string; 
  description: string; 
  publishedAt: string; 
  url: string;
  keywords?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": publishedAt,
    "dateModified": publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Vovó Detector de Golpes"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vovó Detector de Golpes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://detectordegolpes.com.br/vovo-lupa.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": keywords?.join(", ") || "",
    "inLanguage": "pt-BR"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
