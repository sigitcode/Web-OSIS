"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";

interface AnggotaStruktur {
  nama: string;
  jabatan: string;
  divisi: string;
  avatar: string;
}

export default function StrukturSection({ struktur = [] }: { struktur?: AnggotaStruktur[] }) {
  // Safe fallback to avoid errors if empty
  const hasData = struktur && struktur.length > 0;
  const topRow = hasData ? struktur.slice(0, 3) : [];
  const bottomRow = hasData ? struktur.slice(3) : [];
  return (
    <section id="struktur" className="py-24 section-alt relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          accent="Organisasi"
          title="Struktur Pengurus OSIS"
          subtitle="Pengurus OSIS SMK HKTI 2 periode 2026/2027 yang siap melayani dan berkarya untuk kemajuan sekolah."
        />

        {/* Top row: Pembina + Ketua + Wakil */}
        {hasData && (
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {topRow.map((anggota, index) => (
            <AnimateOnScroll key={anggota.nama} delay={index * 100}>
              <div className="group w-56">
                <div className="glass-card rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    index === 0 ? "from-accent-400 to-accent-500" : "from-primary-500 to-primary-700"
                  }`} />
                  
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {anggota.avatar}
                  </div>

                  {/* Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 ${
                    index === 0
                      ? "bg-accent-100 text-accent-700"
                      : "bg-primary-100 text-primary-700"
                  }`}>
                    {anggota.jabatan}
                  </span>

                  {/* Name */}
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">
                    {anggota.nama}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{anggota.divisi}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        )}

        {/* Bottom row: rest of the team */}
        {hasData && bottomRow.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {bottomRow.map((anggota, index) => (
            <AnimateOnScroll key={anggota.nama} delay={300 + index * 100}>
              <div className="group">
                <div className="glass-card rounded-2xl p-5 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {anggota.avatar}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 mb-2">
                    {anggota.jabatan}
                  </span>
                  <h4 className="font-semibold text-slate-800 text-xs leading-tight">
                    {anggota.nama}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{anggota.divisi}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        )}

        {!hasData && (
          <div className="text-center text-slate-500 py-12 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200">
            Belum ada data pengurus OSIS.
          </div>
        )}
      </div>
    </section>
  );
}
