"use client";

import { programKerja } from "@/lib/data";
import { SectionHeading, GlassCard, AnimateOnScroll } from "@/components/ui/shared";
import { Clock, CheckCircle2, CalendarClock, Zap } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode; bg: string }> = {
  Selesai: {
    color: "text-emerald-700",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    bg: "bg-emerald-50 border-emerald-200",
  },
  Aktif: {
    color: "text-primary-700",
    icon: <Zap className="w-3.5 h-3.5" />,
    bg: "bg-primary-50 border-primary-200",
  },
  "Akan Datang": {
    color: "text-amber-700",
    icon: <CalendarClock className="w-3.5 h-3.5" />,
    bg: "bg-amber-50 border-amber-200",
  },
};

export default function ProgramKerjaSection() {
  return (
    <section id="program-kerja" className="py-24 section-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Program"
          title="Program Kerja OSIS"
          subtitle="Rencana kegiatan dan program yang dirancang untuk mengembangkan potensi siswa dan kemajuan sekolah."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {programKerja.map((program, index) => {
            const status = statusConfig[program.status] || statusConfig["Akan Datang"];
            return (
              <AnimateOnScroll key={program.id} delay={index * 100}>
                <GlassCard className="h-full flex flex-col relative overflow-hidden group">
                  {/* Status indicator line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    program.status === "Selesai"
                      ? "from-emerald-400 to-emerald-500"
                      : program.status === "Aktif"
                      ? "from-primary-500 to-primary-600"
                      : "from-amber-400 to-amber-500"
                  }`} />

                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
                      {program.kategori}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold ${status.bg} ${status.color}`}>
                      {status.icon}
                      {program.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-primary-700 transition-colors duration-300">
                    {program.judul}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-grow">
                    {program.deskripsi}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-3 border-t border-slate-100">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">{program.periode}</span>
                  </div>
                </GlassCard>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
