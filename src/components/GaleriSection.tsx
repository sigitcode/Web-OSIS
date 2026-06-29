"use client";

import { useState } from "react";
import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { Camera, ZoomIn } from "lucide-react";

interface GaleriItem {
  id: number;
  judul: string;
  kategori: string;
  color: string;
}

interface GaleriSectionProps {
  galeriList: GaleriItem[];
}

export default function GaleriSection({ galeriList }: GaleriSectionProps) {
  const [filter, setFilter] = useState("Semua");
  
  if (!galeriList || galeriList.length === 0) return null;

  // Extract unique categories
  const categories = ["Semua", ...Array.from(new Set(galeriList.map(g => g.kategori)))];
  
  const filtered =
    filter === "Semua" ? galeriList : galeriList.filter((g) => g.kategori === filter);

  return (
    <section id="galeri" className="py-24 section-alt relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Dokumentasi"
          title="Galeri Kegiatan"
          subtitle="Dokumentasi momen-momen berkesan dari berbagai kegiatan OSIS SMK HKTI 2."
        />

        {/* Filter Tabs */}
        <AnimateOnScroll>
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filtered.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 80}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                {/* Gradient Background as Image Placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-blue-500 to-blue-700'} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 dot-pattern opacity-20" />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-white/40 group-hover:scale-0 transition-transform duration-300" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-center px-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-white font-bold text-sm leading-tight">
                      {item.judul}
                    </h4>
                    <span className="text-white/60 text-xs mt-1 inline-block">
                      {item.kategori}
                    </span>
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
