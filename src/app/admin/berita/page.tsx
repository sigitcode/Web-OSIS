import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye 
} from "lucide-react";
import Image from "next/image";

const mockNews = [
  {
    id: 1,
    title: "Prestasi LKS Nasional 2024",
    category: "Prestasi",
    author: "Budi Santoso",
    status: "Published",
    date: "24 Okt 2024",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
  },
  {
    id: 2,
    title: "Pemilihan Ketua OSIS Periode 2024/2025",
    category: "Informasi",
    author: "Admin",
    status: "Draft",
    date: "20 Okt 2024",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80"
  },
  {
    id: 3,
    title: "Persiapan Classmeet Semester Ganjil",
    category: "Kegiatan",
    author: "Siti Aminah",
    status: "Published",
    date: "15 Okt 2024",
    image: "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=800&q=80"
  },
  {
    id: 4,
    title: "Peringatan Hari Guru Nasional",
    category: "Agenda",
    author: "Budi Santoso",
    status: "Published",
    date: "10 Okt 2024",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
  },
  {
    id: 5,
    title: "Rapat Pleno Pengurus Baru",
    category: "Internal",
    author: "Admin",
    status: "Archived",
    date: "05 Okt 2024",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
  }
];

export default function BeritaPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Berita</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola artikel, berita, dan pengumuman untuk website publik.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm glow-blue">
          <Plus className="w-4 h-4" />
          Tambah Berita
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari berita..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <select className="flex-1 md:flex-none px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium rounded-lg transition-colors outline-none cursor-pointer">
            <option>Semua Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm">
                <th className="px-6 py-4 font-semibold text-slate-600">Berita</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Kategori</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Penulis</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockNews.map((news) => (
                <tr key={news.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden relative bg-slate-100 shrink-0">
                        <Image 
                          src={news.image} 
                          alt={news.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="font-medium text-slate-800 line-clamp-2 max-w-[200px] md:max-w-xs">{news.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{news.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{news.author}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                      ${news.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        news.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        'bg-slate-100 text-slate-700 border-slate-300'}`}
                    >
                      {news.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{news.date}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors" title="Lihat">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors lg:hidden">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Menampilkan <span className="font-medium text-slate-700">1</span> sampai <span className="font-medium text-slate-700">5</span> dari <span className="font-medium text-slate-700">24</span> berita
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-primary-500 bg-primary-50 rounded-md text-sm text-primary-700 font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50">3</button>
            <span className="px-2 py-1 text-slate-400">...</span>
            <button className="px-3 py-1 border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
