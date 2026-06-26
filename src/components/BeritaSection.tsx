"use client";

import { berita } from "@/lib/data";
import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export default function BeritaSection() {
  const featured = berita.find((b) => b.featured);
  const others = berita.filter((b) => !b.featured);

  return (
    <section id="berita" className="py-24 section-alt relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          accent="Informasi"
          title="Berita Terkini"
          subtitle="Update terbaru seputar kegiatan, prestasi, dan informasi penting OSIS SMK HKTI 2."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Featured Article */}
          {featured && (
            <AnimateOnScroll>
              <div className="group glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
                  <div className="absolute inset-0 dot-pattern opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                        <span className="text-3xl">📰</span>
                      </div>
                      <span className="text-white/60 text-sm font-medium">Berita Utama</span>
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-400 text-slate-900 text-xs font-bold shadow-lg">
                      <Tag className="w-3 h-3" />
                      {featured.kategori}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{featured.tanggal}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary-700 transition-colors duration-300">
                    {featured.judul}
                  </h3>
                  <p className="text-slate-500 leading-relaxed flex-grow">
                    {featured.ringkasan}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* Other articles */}
          <div className="flex flex-col gap-4">
            {others.map((item, index) => (
              <AnimateOnScroll key={item.id} delay={index * 100}>
                <div className="group glass-card rounded-2xl p-5 flex gap-5 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Mini image placeholder */}
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 text-[10px] font-bold tracking-wider uppercase">
                        {item.kategori}
                      </span>
                      <span className="text-xs text-slate-400">{item.tanggal}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 leading-snug mb-1 group-hover:text-primary-700 transition-colors duration-300 line-clamp-2 text-sm">
                      {item.judul}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}

            {/* See all button */}
            <AnimateOnScroll delay={400}>
              <button className="w-full glass-card rounded-2xl p-4 text-center font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 transition-all duration-300 group flex items-center justify-center gap-2">
                Lihat Semua Berita
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
