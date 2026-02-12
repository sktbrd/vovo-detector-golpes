import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Metadata } from "next";
import ShareButtons from "./ShareButtons";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-800 hover:text-purple-600"
          >
            <span className="text-2xl">👵</span>
            <span className="font-bold">Vovó Detector</span>
          </Link>
          <div className="flex gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 text-purple-600 hover:text-purple-800 font-medium"
            >
              ← Blog
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              🔍 Verificar
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Meta */}
          <div className="mb-6 text-sm text-gray-500">
            <span>📅 {data.date}</span>
            <span className="mx-2">•</span>
            <span>✍️ {data.author || "Vovó Detector"}</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-purple max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-purple-200">
            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                Recebeu uma mensagem suspeita?
              </h3>
              <p className="text-gray-600 mb-4">
                Cole aqui e a Vovó analisa em segundos!
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Verificar Agora
              </Link>
            </div>
          </div>

          {/* Share */}
          <ShareButtons title={data.title} description={data.description} />
        </article>

        {/* More Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-purple-800 mb-6">
            📚 Leia Também
          </h3>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors"
          >
            Ver todos os artigos →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 text-purple-600 text-sm border-t border-purple-200 mt-12">
        <p className="mb-2">Feito com 💜 para proteger você</p>
        <div className="flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-purple-800 underline">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-purple-800 underline">
            Termos
          </Link>
          <Link href="/" className="hover:text-purple-800 underline">
            Detector
          </Link>
        </div>
      </footer>
    </div>
  );
}
