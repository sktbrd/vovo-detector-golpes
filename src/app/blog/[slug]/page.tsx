import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, PenLine, Search, Shield, ArrowLeft, Heart, BookOpen, Clock, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import ShareButtons from "./ShareButtons";
import Navbar from "../../components/Navbar";
import "./blog-content.css";

const postsDirectory = path.join(process.cwd(), "posts");

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

// Extract headings for table of contents
function extractHeadings(content: string): { text: string; level: number; id: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+?)(?:\s+[🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️])?$/gm;
  const headings: { text: string; level: number; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️]/g, '').trim();
    const id = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ text, level, id });
  }

  return headings;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    title: `${data.title} | Vovó Detector`,
    description: data.description,
    keywords: data.keywords,
    authors: [{ name: data.author || "Vovó Detector" }],
    openGraph: {
      title: data.title,
      description: data.description,
      type: "article",
      publishedTime: data.date,
    },
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  
  const formattedDate = new Date(data.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const readingTime = calculateReadingTime(content);
  const headings = extractHeadings(content);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-900 hover:text-teal-500 font-bold uppercase text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={3} />
            VOLTAR PARA O BLOG
          </Link>
        </div>
      </div>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 md:py-12">
        <article className="bg-white border-3 md:border-4 border-slate-900 p-4 sm:p-6 md:p-8 lg:p-12 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          {/* Meta */}
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 text-xs sm:text-sm text-slate-700 font-bold">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-teal-100 border-2 border-black px-2 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />
              <span className="whitespace-nowrap">{formattedDate}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-pink-100 border-2 border-black px-2 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm">
              <PenLine className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />
              <span className="whitespace-nowrap">{data.author || "Vovó Detector"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-lime-100 border-2 border-black px-2 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" strokeWidth={3} aria-hidden="true" />
              <span className="whitespace-nowrap">{readingTime} min de leitura</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 md:mb-6 uppercase leading-tight">
            {data.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-bold mb-6 md:mb-8 leading-relaxed border-l-4 border-teal-500 pl-3 sm:pl-4 py-2">
            {data.description}
          </p>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="mb-8 md:mb-12 bg-gradient-to-br from-teal-50 to-pink-50 border-3 md:border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-slate-900 flex-shrink-0" strokeWidth={3} />
                <h2 className="text-lg md:text-2xl font-black text-slate-900 uppercase">
                  NESTE ARTIGO
                </h2>
              </div>
              <nav className="space-y-1.5 md:space-y-2">
                {headings.map((heading, index) => (
                  <a
                    key={index}
                    href={`#${heading.id}`}
                    className={`block font-bold hover:text-teal-600 transition-colors leading-snug ${
                      heading.level === 2
                        ? 'text-sm md:text-base text-slate-900 pl-0'
                        : 'text-xs md:text-sm text-slate-700 pl-4 md:pl-6'
                    }`}
                  >
                    {heading.level === 2 ? '▸ ' : '→ '}
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-base md:prose-lg prose-slate max-w-none blog-content
            /* Headings */
            prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:lg:text-5xl prose-h1:mt-0 prose-h1:mb-6 prose-h1:md:mb-8
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:lg:text-4xl prose-h2:mt-10 prose-h2:md:mt-16 prose-h2:mb-4 prose-h2:md:mb-6 prose-h2:bg-gradient-to-r prose-h2:from-teal-500 prose-h2:to-pink-500 prose-h2:bg-clip-text prose-h2:text-transparent prose-h2:border-b-3 prose-h2:md:border-b-4 prose-h2:border-black prose-h2:pb-3 prose-h2:md:pb-4
            prose-h3:text-lg prose-h3:md:text-xl prose-h3:lg:text-2xl prose-h3:mt-6 prose-h3:md:mt-10 prose-h3:mb-3 prose-h3:md:mb-4 prose-h3:border-l-3 prose-h3:md:border-l-4 prose-h3:border-teal-500 prose-h3:pl-3 prose-h3:md:pl-4
            prose-h4:text-base prose-h4:md:text-lg prose-h4:lg:text-xl prose-h4:mt-6 prose-h4:md:mt-8 prose-h4:mb-2 prose-h4:md:mb-3 prose-h4:uppercase prose-h4:text-pink-600
            
            /* Paragraphs */
            prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:text-slate-700 prose-p:font-medium prose-p:mb-4 prose-p:md:mb-6
            prose-strong:text-slate-900 prose-strong:font-black prose-strong:bg-lime-100 prose-strong:px-1
            prose-em:italic prose-em:text-slate-600
            
            /* Links */
            prose-a:text-teal-600 prose-a:font-black prose-a:underline prose-a:decoration-4 prose-a:underline-offset-4 prose-a:decoration-teal-600 hover:prose-a:text-pink-600 hover:prose-a:decoration-pink-600 prose-a:transition-colors
            
            /* Lists */
            prose-ul:my-4 prose-ul:md:my-8 prose-ul:space-y-2 prose-ul:md:space-y-3
            prose-ol:my-4 prose-ol:md:my-8 prose-ol:space-y-2 prose-ol:md:space-y-3
            prose-li:text-base prose-li:md:text-lg prose-li:text-slate-700 prose-li:font-medium prose-li:leading-relaxed prose-li:pl-2
            prose-li:marker:text-teal-500 prose-li:marker:font-black
            
            /* Blockquotes */
            prose-blockquote:border-l-4 prose-blockquote:md:border-l-8 prose-blockquote:border-pink-500 prose-blockquote:bg-pink-50 prose-blockquote:pl-3 prose-blockquote:md:pl-6 prose-blockquote:pr-3 prose-blockquote:md:pr-6 prose-blockquote:py-3 prose-blockquote:md:py-4 prose-blockquote:my-4 prose-blockquote:md:my-8 prose-blockquote:font-bold prose-blockquote:text-slate-800 prose-blockquote:not-italic prose-blockquote:text-sm prose-blockquote:md:text-base
            
            /* Code */
            prose-code:bg-slate-900 prose-code:text-lime-400 prose-code:font-mono prose-code:font-bold prose-code:px-1.5 prose-code:md:px-2 prose-code:py-0.5 prose-code:md:py-1 prose-code:border-2 prose-code:border-black prose-code:text-xs prose-code:md:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-code:break-words
            prose-pre:bg-slate-900 prose-pre:border-3 prose-pre:md:border-4 prose-pre:border-black prose-pre:p-3 prose-pre:md:p-6 prose-pre:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] prose-pre:md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] prose-pre:overflow-x-auto prose-pre:my-4 prose-pre:md:my-8 prose-pre:text-[0.7rem] prose-pre:md:text-xs prose-pre:lg:text-sm prose-pre:rounded-none prose-pre:max-w-full
            prose-pre:code:bg-transparent prose-pre:code:border-0 prose-pre:code:p-0 prose-pre:code:text-lime-400 prose-pre:code:text-[0.7rem] prose-pre:code:md:text-xs prose-pre:code:lg:text-sm prose-pre:code:whitespace-pre prose-pre:code:break-normal
            
            /* Tables */
            prose-table:w-full prose-table:border-3 prose-table:md:border-4 prose-table:border-black prose-table:my-6 prose-table:md:my-8 prose-table:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] prose-table:md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] prose-table:text-xs prose-table:md:text-sm prose-table:lg:text-base
            prose-thead:bg-gradient-to-r prose-thead:from-teal-500 prose-thead:to-pink-500
            prose-th:border-2 prose-th:border-black prose-th:p-2 prose-th:md:p-3 prose-th:lg:p-4 prose-th:text-white prose-th:font-black prose-th:uppercase prose-th:text-left prose-th:text-xs prose-th:md:text-sm
            prose-td:border-2 prose-td:border-black prose-td:p-2 prose-td:md:p-3 prose-td:lg:p-4 prose-td:bg-white prose-td:font-medium prose-td:text-xs prose-td:md:text-sm prose-td:lg:text-base
            prose-tr:even:bg-slate-50
            
            /* Images */
            prose-img:border-3 prose-img:md:border-4 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] prose-img:md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] prose-img:my-4 prose-img:md:my-8 prose-img:w-full
          ">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, children, ...props}) => {
                  const text = String(children).replace(/[🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️]/g, '').trim();
                  const id = text
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                h3: ({node, children, ...props}) => {
                  const text = String(children).replace(/[🔐📱💰🚨🤔📊🔒🚀⚠️❓✅📝🛡️ℹ️]/g, '').trim();
                  const id = text
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return <h3 id={id} {...props}>{children}</h3>;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t-4 border-slate-200">
            <ShareButtons title={data.title} description={data.description} />
          </div>

          {/* Summary Box */}
          <div className="mt-8 md:mt-12 bg-lime-100 border-3 md:border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-slate-900 flex-shrink-0 mt-0.5 md:mt-1" strokeWidth={3} />
              <div>
                <h3 className="text-lg md:text-2xl font-black text-slate-900 uppercase mb-1 md:mb-2">
                  RESUMO
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-slate-700 font-bold leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 md:mt-8 bg-gradient-to-br from-teal-500 to-pink-500 border-3 md:border-4 border-black p-6 md:p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="bg-white border-3 md:border-4 border-black p-3 md:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Shield className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-slate-900" strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>

            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 text-white uppercase drop-shadow-[3px_3px_0px_rgba(0,0,0,0.4)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,0.4)] leading-tight">
              PROTEJA-SE AGORA!
            </h3>

            <p className="text-base md:text-xl lg:text-2xl text-white font-bold mb-6 md:mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)] max-w-2xl mx-auto px-2">
              Use nossas ferramentas gratuitas para detectar golpes e proteger suas informações
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 font-black text-base md:text-lg lg:text-xl border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1 transition-all uppercase"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                <span className="whitespace-nowrap">DETECTOR DE GOLPES</span>
              </Link>
              <Link
                href="/ferramentas"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-lime-400 text-slate-900 font-black text-base md:text-lg lg:text-xl border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1 transition-all uppercase"
              >
                <Shield className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                <span className="whitespace-nowrap">TODAS FERRAMENTAS</span>
              </Link>
            </div>
          </div>
        </article>

        {/* More Posts */}
        <div className="mt-8 md:mt-12 bg-gradient-to-br from-white to-slate-100 border-3 md:border-4 border-slate-900 p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] md:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-teal-500 to-pink-500 border-2 md:border-3 border-black p-2 md:p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-slate-900 uppercase leading-tight">
              CONTINUE APRENDENDO
            </h3>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-slate-700 font-bold mb-4 md:mb-6 leading-relaxed">
            Descubra mais dicas de segurança e aprenda a se proteger contra golpes online
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-teal-500 to-pink-500 text-white font-black text-base md:text-lg border-3 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1 transition-all uppercase"
          >
            <BookOpen className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
            <span>VER TODOS OS ARTIGOS</span>
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 rotate-180" strokeWidth={3} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-slate-700 text-sm border-t-4 border-slate-900 mt-12 bg-white">
        <p className="mb-4 flex items-center justify-center gap-2 font-bold text-base">
          Feito com <Heart className="w-5 h-5 fill-pink-500 text-pink-500" aria-hidden="true" /> para proteger você
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/privacy" className="hover:text-teal-500 font-bold uppercase">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-teal-500 font-bold uppercase">
            Termos
          </Link>
          <Link href="/" className="hover:text-teal-500 font-bold uppercase">
            Detector
          </Link>
        </div>
      </footer>
    </div>
  );
}
