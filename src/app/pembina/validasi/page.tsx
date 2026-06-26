import { Search, Filter, CheckCircle, XCircle, Eye } from "lucide-react";

const pendingContents = [
  {
    id: 1,
    type: "Berita",
    title: "Persiapan Lomba Kompetensi Siswa (LKS) Tingkat Provinsi",
    author: "Budi Santoso (Humas)",
    submittedAt: "2 Jam yang lalu",
    status: "Pending",
  },
  {
    id: 2,
    type: "Agenda",
    title: "Rapat Pleno Tengah Semester Genap",
    author: "Siti Aminah (Sekretaris)",
    submittedAt: "5 Jam yang lalu",
    status: "Pending",
  },
  {
    id: 3,
    type: "Galeri",
    title: "Dokumentasi Classmeet 2024",
    author: "Andi Saputra (Dokumentasi)",
    submittedAt: "1 Hari yang lalu",
    status: "Pending",
  },
  {
    id: 4,
    type: "Pengumuman",
    title: "Pendaftaran Calon Pengurus OSIS Baru",
    author: "Ketua OSIS",
    submittedAt: "2 Hari yang lalu",
    status: "Pending",
  },
];

export default function ValidasiKontenPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Validasi Konten</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola dan validasi konten yang diusulkan oleh pengurus OSIS.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari konten..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Judul Konten</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipe</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pengusul</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Waktu Usulan</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pendingContents.map((content) => (
                <tr key={content.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-800 line-clamp-2">{content.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                      {content.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{content.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-500">{content.submittedAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Setujui"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Tolak"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <p>Menampilkan <span className="font-medium text-slate-800">1</span> sampai <span className="font-medium text-slate-800">4</span> dari <span className="font-medium text-slate-800">4</span> entri</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 bg-white rounded text-slate-400 cursor-not-allowed">Seb</button>
            <button className="px-3 py-1 border border-indigo-600 bg-indigo-50 text-indigo-700 rounded font-medium">1</button>
            <button className="px-3 py-1 border border-slate-200 bg-white rounded hover:bg-slate-50 cursor-not-allowed text-slate-400">Sel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
