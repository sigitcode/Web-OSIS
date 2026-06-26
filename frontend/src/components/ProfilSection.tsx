"use client";

import { useState } from "react";
import { visiMisi } from "@/lib/data";
import { SectionHeading, GlassCard, AnimateOnScroll } from "@/components/ui/shared";
import { Eye, Target, BookOpen, Heart, Shield, Lightbulb } from "lucide-react";

const misiIcons = [BookOpen, Heart, Lightbulb, Shield, Target, Eye];

export default function ProfilSection() {
  const [activeTab, setActiveTab] = useState<"visi" | "misi">("visi");

  return (
    <section id="profil" className="py-24 section-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          accent="Tentang Kami"
          title="Profil OSIS"
          subtitle="Mengenal lebih dekat organisasi siswa intra sekolah SMK HKTI 2 Purwareja Klampok yang menjadi wadah pengembangan potensi siswa."
        />

        <div className="max-w-4xl mx-auto">
          {/* Tab Buttons */}
          <AnimateOnScroll>
            <div className="flex justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveTab("visi")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "visi"
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Eye className="w-4 h-4" />
                Visi
              </button>
              <button
                onClick={() => setActiveTab("misi")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "misi"
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Target className="w-4 h-4" />
                Misi
              </button>
            </div>
          </AnimateOnScroll>

          {/* Content */}
          <AnimateOnScroll>
            {activeTab === "visi" ? (
              <GlassCard className="text-center relative overflow-hidden" hover={false}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/25">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Visi Kami</h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  &ldquo;{visiMisi.visi}&rdquo;
                </p>
              </GlassCard>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {visiMisi.misi.map((item, index) => {
                  const Icon = misiIcons[index % misiIcons.length];
                  return (
                    <AnimateOnScroll key={index} delay={index * 100}>
                      <GlassCard className="flex gap-4 items-start h-full">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-500/20">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-primary-500 tracking-wider">
                            MISI {index + 1}
                          </span>
                          <p className="text-slate-700 mt-1 leading-relaxed text-sm">
                            {item}
                          </p>
                        </div>
                      </GlassCard>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
