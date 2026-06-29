"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Award } from "lucide-react";

interface Prestasi {
  id: number;
  judul: string;
  tingkat: string;
  tahun: string;
  peserta: string;
  icon: string;
}

export default function PrestasiPage() {
  const [data, setData] = useState<Prestasi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, judul: "", tingkat: "", tahun: "", peserta: "", icon: "🏆" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/prestasi");
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
    const url = isEdit ? `/api/prestasi/${formData.id}` : "/api/prestasi";
    
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
    if (!confirm("Yakin ingin menghapus prestasi ini?")) return;
    try {
      await fetch(`/api/prestasi/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const openModal = (item?: Prestasi) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, judul: "", tingkat: "", tahun: new Date().getFullYear().toString(), peserta: "", icon: "🏆" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Prestasi</h1>
          <p className="text-slate-500 mt-1">Kelola data prestasi siswa dan sekolah.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Prestasi
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Ikon</th>
                <th className="px-6 py-4 font-medium">Judul Prestasi</th>
                <th className="px-6 py-4 font-medium">Tingkat</th>
                <th className="px-6 py-4 font-medium">Tahun</th>
                <th className="px-6 py-4 font-medium">Peserta</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">Belum ada data prestasi.</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-2xl">{item.icon}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{item.judul}</td>
                    <td className="px-6 py-4 text-slate-500">{item.tingkat}</td>
                    <td className="px-6 py-4 text-slate-500">{item.tahun}</td>
                    <td className="px-6 py-4 text-slate-500">{item.peserta}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-primary-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{formData.id ? "Edit Prestasi" : "Tambah Prestasi"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Prestasi</label>
                <input required type="text" value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Juara 1 Lomba Web" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tingkat</label>
                  <input required type="text" value={formData.tingkat} onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Kabupaten" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tahun</label>
                  <input required type="text" value={formData.tahun} onChange={(e) => setFormData({ ...formData, tahun: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="2026" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Peserta/Tim</label>
                <input required type="text" value={formData.peserta} onChange={(e) => setFormData({ ...formData, peserta: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Ahmad Fauzan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Emoji Icon</label>
                <input required type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-2xl text-center" placeholder="🏆" />
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
