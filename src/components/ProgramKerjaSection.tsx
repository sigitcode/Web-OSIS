"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface ProkerItem {
  id: number;
  judul: string;
  deskripsi: string;
  status: string | null;
  kategori: string;
  periode: string;
}

interface ProgramKerjaSectionProps {
  prokerList: ProkerItem[];
}

export default function ProgramKerjaSection({ prokerList }: ProgramKerjaSectionProps) {
  if (!prokerList || prokerList.length === 0) return null;

  return (
    <section id="program-kerja" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Aksi Nyata"
          title="Program Kerja Unggulan"
          subtitle="Berbagai program inovatif yang kami rancang untuk memajukan sekolah dan mengembangkan potensi siswa."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prokerList.map((item, index) => {
            const isCompleted = item.status?.toLowerCase() === "selesai";
            const isActive = item.status?.toLowerCase() === "aktif";
            
            return (
              <AnimateOnScroll key={item.id} delay={index * 100}>
                <div className="group h-full flex flex-col bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary-500/10 hover:border-primary-200 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-wider uppercase group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                      {item.kategori}
                    </span>
                    
                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5" title={`Status: ${item.status}`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      ) : isActive ? (
                        <div className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500"></span>
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                    {item.judul}
                  </h3>
                  
                  <p className="text-slate-500 leading-relaxed mb-6 flex-grow text-sm">
                    {item.deskripsi}
                  </p>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                      <Clock className="w-4 h-4" />
                      {item.periode}
                    </div>
                    <span className={`text-xs font-bold ${
                      isCompleted ? 'text-emerald-600' : 
                      isActive ? 'text-blue-600' : 
                      'text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
