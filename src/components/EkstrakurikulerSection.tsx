"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/ui/shared";
import { Users, Clock } from "lucide-react";

interface EkskulItem {
  id: number;
  nama: string;
  deskripsi: string;
  anggota: number | null;
  jadwal: string | null;
  icon: string | null;
}

interface EkstrakurikulerSectionProps {
  ekskulList: EkskulItem[];
}

export default function EkstrakurikulerSection({ ekskulList }: EkstrakurikulerSectionProps) {
  if (!ekskulList || ekskulList.length === 0) return null;

  return (
    <section id="ekskul" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Pengembangan Diri"
          title="Ekstrakurikuler"
          subtitle="Wadah bagi siswa untuk mengembangkan bakat, minat, dan potensi diri di luar jam pelajaran akademik."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ekskulList.map((item, index) => (
            <AnimateOnScroll key={item.id} delay={index * 100}>
              <div className="group h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-300 transition-all duration-300 flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 text-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary-600">
                  <span className="group-hover:grayscale-[100%] group-hover:brightness-200 transition-all duration-300">{item.icon || '⭐'}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary-700 transition-colors">
                  {item.nama}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed flex-grow mb-6">
                  {item.deskripsi}
                </p>
                
                <div className="pt-4 border-t border-slate-100 space-y-3 mt-auto">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <Users className="w-4 h-4 text-slate-400 group-hover:text-primary-600" />
                    </div>
                    <span className="font-medium">{item.anggota} Anggota</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                      <Clock className="w-4 h-4 text-slate-400 group-hover:text-primary-600" />
                    </div>
                    <span className="font-medium truncate">{item.jadwal || '-'}</span>
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
