"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, User } from "lucide-react";

interface Jabatan { id: number; nama: string; tingkat: number }
interface Divisi { id: number; nama: string; deskripsi: string }
interface Anggota {
  id: number;
  nama: string;
  jabatan_id: number;
  divisi_id: number | null;
  avatar: string | null;
  angkatan: string | null;
}

export default function AnggotaOsisPage() {
  const [data, setData] = useState<Anggota[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    nama: "",
    jabatan_id: 0,
    divisi_id: 0 as number | null,
    avatar: "",
    angkatan: "2026/2027",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resAnggota, resJabatan, resDivisi] = await Promise.all([
        fetch("/api/anggota-osis"),
        fetch("/api/jabatan"),
        fetch("/api/divisi"),
      ]);
      const [anggota, jabatan, divisi] = await Promise.all([
        resAnggota.json(),
        resJabatan.json(),
        resDivisi.json()
      ]);
      
      setJabatanList(jabatan);
      setDivisiList(divisi);
      setData(anggota);
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jabatan_id) {
      alert("Jabatan harus diisi");
      return;
    }
    
    try {
      const url = editingId ? `/api/anggota-osis/${editingId}` : "/api/anggota-osis";
      const method = editingId ? "PUT" : "POST";
      
      const payload = {
        ...formData,
        jabatan_id: Number(formData.jabatan_id),
        divisi_id: formData.divisi_id ? Number(formData.divisi_id) : null,
      };
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    if (!confirm("Yakin ingin menghapus anggota ini?")) return;
    try {
      await fetch(`/api/anggota-osis/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleEdit = (item: Anggota) => {
    setEditingId(item.id);
    setFormData({
      nama: item.nama,
      jabatan_id: item.jabatan_id,
      divisi_id: item.divisi_id || 0,
      avatar: item.avatar || "",
      angkatan: item.angkatan || "2026/2027",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ nama: "", jabatan_id: jabatanList[0]?.id || 0, divisi_id: 0, avatar: "", angkatan: "2026/2027" });
  };

  const getJabatanName = (id: number) => jabatanList.find(j => j.id === id)?.nama || "-";
  const getDivisiName = (id: number | null) => divisiList.find(d => d.id === id)?.nama || "-";

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Anggota OSIS</h1>
          <p className="text-slate-500 mt-1">Kelola data pengurus untuk bagan struktur organisasi.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Anggota
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Anggota</th>
                <th className="px-6 py-4 font-medium">Jabatan</th>
                <th className="px-6 py-4 font-medium">Divisi/Sekbid</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Loading data...</td></tr>
              ) : data.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Belum ada anggota.</td></tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg">
                          {item.avatar || <User className="w-5 h-5 text-slate-400" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{item.nama}</div>
                          <div className="text-xs text-slate-500">Angkatan {item.angkatan}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary-700">{getJabatanName(item.jabatan_id)}</td>
                    <td className="px-6 py-4 text-slate-600">{getDivisiName(item.divisi_id)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-primary-600 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
              <h2 className="text-xl font-bold text-slate-800">{editingId ? "Edit Anggota" : "Tambah Anggota"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input required type="text" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan</label>
                  <select required value={formData.jabatan_id} onChange={e => setFormData({...formData, jabatan_id: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                    <option value={0} disabled>Pilih Jabatan</option>
                    {jabatanList.map(j => <option key={j.id} value={j.id}>{j.nama}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Divisi (Opsional)</label>
                  <select value={formData.divisi_id || 0} onChange={e => setFormData({...formData, divisi_id: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                    <option value={0}>Tidak Ada / Inti</option>
                    {divisiList.map(d => <option key={d.id} value={d.id}>{d.nama}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Angkatan / Periode</label>
                  <input type="text" value={formData.angkatan} onChange={e => setFormData({...formData, angkatan: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Emoji Avatar</label>
                  <input type="text" placeholder="👨‍🎓" value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-xl" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white">
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
