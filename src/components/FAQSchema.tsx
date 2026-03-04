'use client';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="my-12 space-y-6">
        <h2 className="text-3xl font-black mb-8 text-center">
          ❓ Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border-4 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <summary className="font-bold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-2xl group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed border-t-2 border-black pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
