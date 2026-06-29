"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Users } from "lucide-react";

interface Ekskul {
  id: number;
  nama: string;
  deskripsi: string;
  anggota: number;
  jadwal: string;
  icon: string;
}

export default function EkskulPage() {
  const [data, setData] = useState<Ekskul[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, nama: "", deskripsi: "", anggota: 0, jadwal: "", icon: "⭐" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ekskul");
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
    const url = isEdit ? `/api/ekskul/${formData.id}` : "/api/ekskul";
    
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
    if (!confirm("Yakin ingin menghapus ekstrakurikuler ini?")) return;
    try {
      await fetch(`/api/ekskul/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const openModal = (item?: Ekskul) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, nama: "", deskripsi: "", anggota: 0, jadwal: "", icon: "⭐" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Ekstrakurikuler</h1>
          <p className="text-slate-500 mt-1">Kelola daftar kegiatan ekstrakurikuler sekolah.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Ekskul
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Ikon</th>
                <th className="px-6 py-4 font-medium">Nama Ekskul</th>
                <th className="px-6 py-4 font-medium">Jadwal</th>
                <th className="px-6 py-4 font-medium">Anggota</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Belum ada data ekskul.</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-2xl">{item.icon}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{item.nama}</td>
                    <td className="px-6 py-4 text-slate-500">{item.jadwal}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold">
                        <Users className="w-3 h-3" /> {item.anggota}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-primary-600"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{formData.id ? "Edit Ekskul" : "Tambah Ekskul"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Ekskul</label>
                <input required type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Pramuka" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea required rows={3} value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Penjelasan tentang ekstrakurikuler ini..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jadwal</label>
                  <input required type="text" value={formData.jadwal} onChange={(e) => setFormData({ ...formData, jadwal: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Jumat, 14:00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah Anggota</label>
                  <input required type="number" min="0" value={formData.anggota} onChange={(e) => setFormData({ ...formData, anggota: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Emoji Icon</label>
                <input required type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-2xl text-center" placeholder="⛺" />
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
