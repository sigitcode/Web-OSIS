"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";

interface PrestasiItem {
  id: number;
  judul: string;
  tingkat: string;
  tahun: string;
  peserta: string;
  icon: string;
}

interface PrestasiSectionProps {
  prestasiList: PrestasiItem[];
}

export default function PrestasiSection({ prestasiList }: PrestasiSectionProps) {
  if (!prestasiList || prestasiList.length === 0) return null;

  return (
    <section id="prestasi" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Kebanggaan Sekolah
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Prestasi Gemilang
          </h2>
          <p className="text-lg text-blue-100/70 leading-relaxed">
            Dedikasi dan kerja keras siswa SMK HKTI 2 telah membuahkan berbagai prestasi di tingkat Kabupaten hingga Provinsi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prestasiList.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 100}>
              <div className="group h-full bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-lg">
                    {item.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                    {item.tahun}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors">
                  {item.judul}
                </h3>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-200/60">Tingkat</span>
                    <span className="text-white font-medium">{item.tingkat}</span>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-200/60">Diraih oleh</span>
                    <span className="text-white font-medium">{item.peserta}</span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
