"use client";

import { prestasi } from "@/lib/data";
import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { Award, Star } from "lucide-react";

const tingkatColors: Record<string, string> = {
  Kabupaten: "from-primary-500 to-primary-700",
  Provinsi: "from-accent-500 to-amber-600",
  Nasional: "from-emerald-500 to-teal-600",
};

export default function PrestasiSection() {
  return (
    <section id="prestasi" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950" />
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-accent-400 mb-2">
            Pencapaian
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Prestasi Kami
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-accent-400 to-accent-500 mx-auto" />
          <p className="mt-4 text-lg text-blue-200/70 max-w-2xl mx-auto leading-relaxed">
            Berbagai penghargaan dan prestasi yang telah diraih oleh siswa-siswi SMK HKTI 2 dalam berbagai bidang.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {prestasi.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 100}>
              <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                {/* Shimmer line on top */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tingkatColors[item.tingkat] || tingkatColors["Kabupaten"]}`} />

                <div className="flex items-start gap-4">
                  {/* Trophy */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400/20 to-accent-500/20 flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-accent-300 transition-colors duration-300">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-blue-200/60 mb-3">{item.peserta}</p>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r ${tingkatColors[item.tingkat]} text-white text-[10px] font-bold tracking-wider uppercase shadow-lg`}>
                        <Award className="w-3 h-3" />
                        {item.tingkat}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-blue-300/50 font-medium">
                        <Star className="w-3 h-3" />
                        {item.tahun}
                      </span>
                    </div>
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
