import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, PenLine, Search, Shield, ArrowLeft, Heart, BookOpen } from "lucide-react";
import ShareButtons from "./ShareButtons";
import Navbar from "../../components/Navbar";

const postsDirectory = path.join(process.cwd(), "posts");

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
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white border-4 border-slate-900 p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-700 font-bold">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
              <span>{formattedDate}</span>
            </span>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-2">
              <PenLine className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
              <span>{data.author || "Vovó Detector"}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 uppercase leading-tight">
            {data.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-700 font-bold mb-8 leading-relaxed border-l-4 border-teal-500 pl-4">
            {data.description}
          </p>

          {/* Content */}
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-black prose-headings:uppercase prose-headings:text-slate-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b-4 prose-h2:border-black prose-h2:pb-3
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-700 prose-p:font-medium
            prose-strong:text-slate-900 prose-strong:font-black
            prose-a:text-teal-600 prose-a:font-bold prose-a:underline prose-a:decoration-2 hover:prose-a:text-teal-700
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-li:text-slate-700 prose-li:font-medium prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-pink-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
            prose-code:bg-slate-100 prose-code:text-slate-900 prose-code:font-bold prose-code:px-2 prose-code:py-1 prose-code:border prose-code:border-slate-300
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t-4 border-slate-200">
            <ShareButtons title={data.title} description={data.description} />
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-teal-500 to-pink-500 border-4 border-black p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-center mb-6">
              <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Search className="w-16 h-16 text-slate-900" strokeWidth={2.5} aria-hidden="true" />
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-black mb-4 text-white uppercase drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
              MENSAGEM SUSPEITA?
            </h3>

            <p className="text-xl text-white font-bold mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
              Cole aqui e a Vovó analisa em segundos!
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all uppercase"
            >
              VERIFICAR AGORA
            </Link>
          </div>
        </article>

        {/* More Posts */}
        <div className="mt-12 bg-white border-4 border-slate-900 p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
            <h3 className="text-3xl font-black text-slate-900 uppercase">
              LEIA TAMBÉM
            </h3>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all uppercase"
          >
            VER TODOS OS ARTIGOS
            <ArrowLeft className="w-5 h-5 rotate-180" strokeWidth={3} />
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
