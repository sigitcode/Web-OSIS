"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { CalendarDays, MapPin, Clock } from "lucide-react";

interface AgendaItem {
  id: number;
  judul: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  tipe: string;
}

interface AgendaSectionProps {
  agendaList: AgendaItem[];
}

export default function AgendaSection({ agendaList }: AgendaSectionProps) {
  if (!agendaList || agendaList.length === 0) return null;

  return (
    <section id="agenda" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Jadwal"
          title="Agenda Kegiatan"
          subtitle="Jangan lewatkan berbagai kegiatan menarik yang akan diselenggarakan oleh OSIS."
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {agendaList.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 100}>
              <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-6 items-center">
                
                {/* Date Block */}
                <div className="flex-shrink-0 w-full md:w-32 bg-slate-50 rounded-xl p-4 text-center group-hover:bg-primary-50 transition-colors duration-300 border border-slate-100 group-hover:border-primary-100">
                  <div className="text-primary-600 font-bold text-3xl mb-1">{item.tanggal.split(' ')[0]}</div>
                  <div className="text-slate-500 text-sm font-medium">{item.tanggal.split(' ').slice(1).join(' ')}</div>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-left">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
                    {item.tipe}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-primary-700 transition-colors">
                    {item.judul}
                  </h3>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-500" />
                      <span>{item.waktu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span>{item.lokasi}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                  <CalendarDays className="w-5 h-5" />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
