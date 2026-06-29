"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, Circle } from "lucide-react";

interface Proker {
  id: number;
  judul: string;
  deskripsi: string;
  status: string;
  kategori: string;
  periode: string;
}

export default function ProgramKerjaPage() {
  const [data, setData] = useState<Proker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, judul: "", deskripsi: "", status: "Akan Datang", kategori: "", periode: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/program-kerja");
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
    const url = isEdit ? `/api/program-kerja/${formData.id}` : "/api/program-kerja";
    
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
    if (!confirm("Yakin ingin menghapus program kerja ini?")) return;
    try {
      await fetch(`/api/program-kerja/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const openModal = (item?: Proker) => {
    if (item) setFormData(item);
    else setFormData({ id: 0, judul: "", deskripsi: "", status: "Akan Datang", kategori: "Akademik", periode: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Program Kerja OSIS</h1>
          <p className="text-slate-500 mt-1">Kelola rencana dan realisasi program kerja.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Tambah Proker
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Nama Program</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Periode</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Belum ada program kerja.</td></tr>
              ) : (
                data.map((item) => {
                  const isSelesai = item.status === "Selesai";
                  const isAktif = item.status === "Aktif";
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                          isSelesai ? 'bg-emerald-100 text-emerald-700' : isAktif ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isSelesai ? <CheckCircle2 className="w-3 h-3"/> : <Circle className="w-3 h-3"/>}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{item.judul}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-xs">{item.deskripsi}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{item.kategori}</td>
                      <td className="px-6 py-4 text-slate-500">{item.periode}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-primary-600"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{formData.id ? "Edit Proker" : "Tambah Proker"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Program Kerja</label>
                <input required type="text" value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Lomba 17 Agustus" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <textarea required rows={3} value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Tujuan dan deskripsi program..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <input required type="text" value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Akademik / Sosial" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Periode</label>
                  <input required type="text" value={formData.periode} onChange={(e) => setFormData({ ...formData, periode: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200" placeholder="Agustus 2026" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200">
                  <option value="Akan Datang">Akan Datang</option>
                  <option value="Aktif">Aktif (Berjalan)</option>
                  <option value="Selesai">Selesai</option>
                </select>
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
