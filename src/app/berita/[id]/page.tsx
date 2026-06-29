import { db } from "@/db";
import { berita, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Dynamic route

export default async function PublicBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch article data and author name
  const dbResult = await db
    .select({
      id: berita.id,
      title: berita.title,
      content: berita.content,
      kategori: berita.kategori,
      gambar: berita.gambar,
      createdAt: berita.createdAt,
      authorName: users.name,
    })
    .from(berita)
    .leftJoin(users, eq(berita.authorId, users.id))
    .where(eq(berita.id, parseInt(id)));

  if (!dbResult || dbResult.length === 0) {
    notFound();
  }

  const article = dbResult[0];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link 
            href="/#berita"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </Link>

          {/* Article Header */}
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {article.kategori}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Oleh <span className="font-semibold text-slate-700">{article.authorName}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {article.createdAt ? article.createdAt.toLocaleDateString("id-ID", { 
                    weekday: "long", day: "numeric", month: "long", year: "numeric" 
                  }) : "Tanggal tidak diketahui"}
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.gambar && (
            <figure className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src={article.gambar} 
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </figure>
          )}

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div 
              className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
