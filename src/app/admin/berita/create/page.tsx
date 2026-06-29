"use client";

import { useState } from "react";
import { ArrowLeft, Save, Image as ImageIcon, Tag, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function CreateBeritaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    kategori: "Berita Utama",
    featured: false,
    gambar: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, authorId would come from the session context
      const payload = { ...formData, authorId: 1 }; 
      
      const res = await fetch("/api/berita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/berita");
      } else {
        alert("Gagal menyimpan artikel.");
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/berita" className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tulis Berita Baru</h1>
            <p className="text-slate-500 mt-1">Buat artikel publikasi untuk website.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? "Menyimpan..." : "Terbitkan Artikel"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <input
              type="text"
              placeholder="Tambahkan Judul..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-3xl font-bold text-slate-800 placeholder:text-slate-300 focus:outline-none mb-6"
            />
            
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>
        </div>

        {/* Sidebar Settings Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-700 text-sm">Kategori & Status</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kategori Artikel</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="Berita Utama">Berita Utama</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Kegiatan">Kegiatan</option>
                </select>
              </div>
              
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-600"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    Jadikan Sorotan <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </span>
                  <span className="text-xs text-slate-500">Tampilkan di slider utama beranda.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              <h3 className="font-semibold text-slate-700 text-sm">Gambar Sampul</h3>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar</label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.gambar}
                onChange={(e) => setFormData({ ...formData, gambar: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm mb-3"
              />
              {formData.gambar ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video">
                  <img src={formData.gambar} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs">Preview Gambar</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
