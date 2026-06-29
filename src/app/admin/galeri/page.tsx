"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Camera } from "lucide-react";

interface Galeri {
  id: number;
  judul: string;
  kategori: string;
  color: string;
}

export default function GaleriPage() {
  const [data, setData] = useState<Galeri[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, judul: "", kategori: "", color: "from-blue-500 to-blue-700" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/galeri");
      setData(await res.json());
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = formData.id !== 0;
    const url = isEdit ? `/api/galeri/${formData.id}` : "/api/galeri";
    
    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus foto/galeri ini?")) return;
    try {
      await fetch(`/api/galeri/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const openModal = (item?: Galeri) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, judul: "", kategori: "Kegiatan", color: "from-blue-500 to-blue-700" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Galeri</h1>
          <p className="text-slate-500 mt-1">Kelola album foto dan dokumentasi kegiatan.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Galeri
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          <div className="col-span-full py-8 text-center text-slate-400">Loading data...</div>
        ) : data.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-400">Belum ada galeri.</div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
              <div className={`h-32 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                <Camera className="w-8 h-8 text-white/50" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => openModal(item)} className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"><Edit2 className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white backdrop-blur-sm transition-colors"><Trash2 className="w-4 h-4"/></button>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{item.kategori}</span>
                <h3 className="font-bold text-slate-800 text-sm mt-2 line-clamp-1" title={item.judul}>{item.judul}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{formData.id ? "Edit Galeri" : "Tambah Galeri"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Foto/Album</label>
                <input required type="text" value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Lomba 17 Agustus" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <select required value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200">
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Lomba">Lomba</option>
                  <option value="Upacara">Upacara</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Warna Tema (Tailwind Gradient)</label>
                <input required type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="from-blue-500 to-blue-700" />
                <p className="text-xs text-slate-400 mt-1">Gunakan class gradient Tailwind (contoh: from-red-500 to-rose-600)</p>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Batal</button>
                <button type="submit" className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700">{formData.id ? "Simpan" : "Tambah"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
