"use client";

import { ekstrakurikuler } from "@/lib/data";
import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { Users, Clock } from "lucide-react";

export default function EkstrakurikulerSection() {
  return (
    <section id="ekskul" className="py-24 section-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Kegiatan"
          title="Ekstrakurikuler"
          subtitle="Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat, minat, dan keterampilan siswa."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {ekstrakurikuler.map((ekskul, index) => (
            <AnimateOnScroll key={ekskul.id} delay={index * 80}>
              <div className="group glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden h-full flex flex-col">
                {/* Hover accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                  {ekskul.icon}
                </div>

                {/* Name */}
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {ekskul.nama}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">
                  {ekskul.deskripsi}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary-400" />
                    <span className="font-semibold text-slate-600">{ekskul.anggota}</span> anggota
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary-400" />
                    <span className="font-medium">{ekskul.jadwal.split(",")[0]}</span>
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
