"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, X } from "lucide-react";

interface Banner {
  id: number;
  judul: string;
  sub_judul: string;
  gambar_url: string;
  is_active: boolean;
}

export default function BannerPage() {
  const [data, setData] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    judul: "",
    sub_judul: "",
    gambar_url: "",
    is_active: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/banners");
      setData(await res.json());
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/banners/${editingId}` : "/api/banners";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus banner ini?")) return;
    try {
      await fetch(`/api/banners/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleEdit = (item: Banner) => {
    setEditingId(item.id);
    setFormData({
      judul: item.judul,
      sub_judul: item.sub_judul || "",
      gambar_url: item.gambar_url,
      is_active: item.is_active,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ judul: "", sub_judul: "", gambar_url: "", is_active: true });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Banner</h1>
          <p className="text-slate-500 mt-1">Kelola slider gambar di halaman beranda.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Banner
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-12 text-slate-500">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">Belum ada banner.</div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
              <div className="relative h-48 bg-slate-100">
                {item.gambar_url ? (
                  <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300"><ImageIcon className="w-12 h-12" /></div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white/90 text-slate-700 rounded-lg hover:text-primary-600 backdrop-blur-sm shadow-sm"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/90 text-slate-700 rounded-lg hover:text-red-600 backdrop-blur-sm shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
                {!item.is_active && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-sm">Tidak Aktif</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">{item.judul}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{item.sub_judul}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Banner" : "Tambah Banner"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Utama</label>
                <input required type="text" value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sub Judul</label>
                <input type="text" value={formData.sub_judul} onChange={e => setFormData({...formData, sub_judul: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar (Unsplash disarankan)</label>
                <input required type="text" value={formData.gambar_url} onChange={e => setFormData({...formData, gambar_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-4 h-4 text-primary-600 rounded border-slate-300" />
                <span className="text-sm font-medium text-slate-700">Banner Aktif (Tampilkan di Beranda)</span>
              </label>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"><Save className="w-4 h-4" /> Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
