"use client";

import { agenda } from "@/lib/data";
import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { MapPin, Clock, CalendarDays } from "lucide-react";

const tipeColors: Record<string, string> = {
  Rutin: "bg-slate-100 text-slate-700",
  Internal: "bg-primary-50 text-primary-700",
  Kegiatan: "bg-emerald-50 text-emerald-700",
  Lomba: "bg-amber-50 text-amber-700",
  Upacara: "bg-purple-50 text-purple-700",
};

export default function AgendaSection() {
  return (
    <section id="agenda" className="py-24 section-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Jadwal"
          title="Agenda Kegiatan"
          subtitle="Jadwal kegiatan dan acara mendatang yang diselenggarakan oleh OSIS SMK HKTI 2."
        />

        <div className="max-w-4xl mx-auto space-y-4">
          {agenda.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 100}>
              <div className="group glass-card rounded-2xl p-0 overflow-hidden hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="flex flex-col sm:flex-row">
                  {/* Date Badge */}
                  <div className="sm:w-28 flex-shrink-0 bg-gradient-to-br from-primary-600 to-primary-800 p-4 flex sm:flex-col items-center justify-center gap-2 text-white">
                    <CalendarDays className="w-5 h-5 sm:mb-1 opacity-80" />
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-extrabold leading-none">
                        {item.tanggal.split(" ")[0]}
                      </div>
                      <div className="text-xs sm:text-sm font-medium opacity-80 uppercase tracking-wider">
                        {item.tanggal.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="flex-grow">
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary-700 transition-colors duration-300">
                        {item.judul}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary-400" />
                          {item.waktu}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary-400" />
                          {item.lokasi}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center self-start px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase ${
                        tipeColors[item.tipe] || tipeColors["Rutin"]
                      }`}
                    >
                      {item.tipe}
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
