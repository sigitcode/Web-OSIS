import React from "react";
import { Shield, Check, Minus, Info } from "lucide-react";

export default function RolesPermissionPage() {
  const roles = [
    { id: "admin", name: "Administrator", desc: "Akses penuh ke seluruh sistem", color: "bg-red-100 text-red-700 border-red-200" },
    { id: "pembina", name: "Pembina OSIS", desc: "Akses monitoring dan persetujuan", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { id: "pengurus", name: "Pengurus OSIS", desc: "Akses operasional dan konten", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];

  const permissions = [
    { group: "Sistem & Pengguna", items: [
      { name: "Manajemen Akun User", admin: true, pembina: false, pengurus: false },
      { name: "Ubah Role & Permission", admin: true, pembina: false, pengurus: false },
    ]},
    { group: "Master Data Organisasi", items: [
      { name: "Manajemen Jabatan & Divisi", admin: true, pembina: false, pengurus: false },
      { name: "Manajemen Anggota Pengurus", admin: true, pembina: false, pengurus: false },
    ]},
    { group: "Konten & Publikasi", items: [
      { name: "Kelola Banner Beranda", admin: true, pembina: false, pengurus: true },
      { name: "Tulis & Hapus Berita", admin: true, pembina: false, pengurus: true },
      { name: "Kelola Galeri & Prestasi", admin: true, pembina: true, pengurus: true },
      { name: "Broadcast Pengumuman", admin: true, pembina: true, pengurus: true },
    ]},
    { group: "Program Kerja & Agenda", items: [
      { name: "Buat Program Kerja Baru", admin: true, pembina: false, pengurus: true },
      { name: "Approval/Setujui Program Kerja", admin: true, pembina: true, pengurus: false },
      { name: "Kelola Agenda Kegiatan", admin: true, pembina: true, pengurus: true },
    ]},
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Role & Permission Matrix</h1>
          <p className="text-slate-500 mt-1">Panduan hak akses dan wewenang untuk masing-masing peran di dalam sistem.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-8">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-blue-900 mb-1">Informasi Hak Akses</h4>
          <p className="text-sm text-blue-700 leading-relaxed">
            Sistem Informasi OSIS SMK HKTI 2 menggunakan 3 tingkatan akses statis. Untuk mengubah peran pengguna tertentu, silakan navigasi ke menu <strong>Master Data &gt; User</strong> dan edit data pengguna bersangkutan.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {roles.map(r => (
          <div key={r.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
              <Shield className={`w-6 h-6 ${r.color.split(' ')[1]}`} />
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 ${r.color}`}>
              {r.name}
            </span>
            <p className="text-sm text-slate-500">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-slate-700">Fitur / Modul Aplikasi</th>
                <th className="px-6 py-4 font-bold text-center text-red-700">Administrator</th>
                <th className="px-6 py-4 font-bold text-center text-blue-700">Pembina OSIS</th>
                <th className="px-6 py-4 font-bold text-center text-emerald-700">Pengurus OSIS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  <tr className="bg-slate-50/50">
                    <td colSpan={4} className="px-6 py-3 font-bold text-slate-800 text-xs uppercase tracking-wider">
                      {group.group}
                    </td>
                  </tr>
                  {group.items.map((item, iIdx) => (
                    <tr key={iIdx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-600">{item.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {item.admin ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-slate-300" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {item.pembina ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-slate-300" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {item.pengurus ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-slate-300" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
