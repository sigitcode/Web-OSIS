import { db } from "@/db";
import { berita, users } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchAndFilter from "@/components/berita/SearchAndFilter";
import Pagination from "@/components/berita/Pagination";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export const revalidate = 0;

const ITEMS_PER_PAGE = 6;

// Helper function to strip HTML tags for summary
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

export default async function BeritaListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;
  const currentPage = isNaN(page) || page < 1 ? 1 : page;

  // Build the where clause for search
  const whereClause = query ? ilike(berita.title, `%${query}%`) : undefined;

  // Get total count for pagination
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(berita)
    .where(whereClause);
    
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch paginated data
  const data = await db
    .select({
      id: berita.id,
      title: berita.title,
      content: berita.content,
      kategori: berita.kategori,
      gambar: berita.gambar,
      createdAt: berita.createdAt,
    })
    .from(berita)
    .where(whereClause)
    .orderBy(desc(berita.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Kumpulan Berita & Artikel
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Ikuti terus perkembangan terbaru, kegiatan seru, dan prestasi membanggakan dari keluarga besar OSIS SMK HKTI 2.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
            <SearchAndFilter />
            <div className="text-sm text-slate-500 font-medium">
              Menampilkan {data.length} dari {count} artikel
            </div>
          </div>

          {data.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
              <span className="text-5xl mb-4 block">🔍</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Pencarian Tidak Ditemukan</h3>
              <p className="text-slate-500">
                Kami tidak dapat menemukan berita yang cocok dengan kata kunci "{query}". Coba gunakan kata kunci lain.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item) => (
                <Link key={item.id} href={`/berita/${item.id}`} className="group block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-56 bg-slate-100 overflow-hidden">
                      {item.gambar ? (
                        <img 
                          src={item.gambar} 
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <span className="text-4xl">📰</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-600 text-white text-xs font-bold shadow-lg">
                          <Tag className="w-3 h-3" />
                          {item.kategori || "Umum"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {item.createdAt ? item.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : ""}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary-700 transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-grow line-clamp-3 mb-4">
                        {stripHtml(item.content)}
                      </p>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm mt-auto group-hover:gap-3 transition-all duration-300">
                        Baca Artikel
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Pagination totalPages={totalPages} currentPage={currentPage} />

        </div>
      </main>
      <Footer />
    </>
  );
}
