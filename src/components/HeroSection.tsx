"use client";

import { heroStats } from "@/lib/data";
import { AnimateOnScroll } from "@/components/ui/shared";
import { Trophy, Users, LayoutGrid, Target, ChevronDown } from "lucide-react";

import { useState, useEffect } from "react";

const iconMap: Record<string, React.ReactNode> = {
  trophy: <Trophy className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  layout: <LayoutGrid className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
};

interface Banner {
  id: number;
  judul: string;
  sub_judul: string | null;
  gambar_url: string;
}

export default function HeroSection({ banners = [] }: { banners?: Banner[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const activeBanner = banners[currentSlide];

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Animated background elements or Banner Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {activeBanner ? (
          <div className="absolute inset-0 z-0">
            {banners.map((banner, idx) => (
              <div 
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                  src={banner.gambar_url} 
                  alt={banner.judul} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/5 rounded-full blur-3xl animate-float-slow" />
          </>
        )}
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Decorative geometric shapes */}
        <div className="absolute top-32 right-[15%] w-4 h-4 bg-accent-400/40 rounded-full animate-pulse-soft" />
        <div className="absolute top-[60%] left-[10%] w-3 h-3 bg-blue-300/40 rounded-full animate-pulse-soft" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[25%] left-[25%] w-2 h-2 bg-white/20 rounded-full animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[30%] right-[20%] w-3 h-3 bg-accent-300/30 rounded-full animate-pulse-soft" style={{ animationDelay: "0.5s" }} />

        {/* Gradient line accents */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Badge */}
        <AnimateOnScroll delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse-soft" />
            <span className="text-sm text-blue-100 font-medium tracking-wide">
              Tahun Ajaran 2026/2027
            </span>
          </div>
        </AnimateOnScroll>

        {/* Title */}
        <AnimateOnScroll delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-xl">
            {activeBanner ? activeBanner.judul : (
              <>
                OSIS{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                    SMK HKTI 2
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 to-accent-500 rounded-full opacity-60" />
                </span>
                <br />
                <span className="text-blue-100/90 text-3xl sm:text-4xl md:text-5xl lg:text-5xl drop-shadow-md">
                  Purwareja Klampok
                </span>
              </>
            )}
          </h1>
        </AnimateOnScroll>

        {/* Subtitle */}
        <AnimateOnScroll delay={200}>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium">
            {activeBanner ? (activeBanner.sub_judul || "") : (
              "Wadah kreativitas, kepemimpinan, dan prestasi siswa-siswi SMK HKTI 2 Purwareja Klampok Banjarnegara. Bersama membangun generasi unggul dan berkarakter."
            )}
          </p>
        </AnimateOnScroll>

        {/* CTA Buttons */}
        <AnimateOnScroll delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#program-kerja"
              className="group px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-400 text-slate-900 rounded-2xl font-bold text-base shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              Lihat Program Kerja
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
            <a
              href="#kontak"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-base border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Hubungi Kami
            </a>
          </div>
        </AnimateOnScroll>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {heroStats.map((stat, index) => (
            <AnimateOnScroll key={stat.label} delay={400 + index * 100}>
              <div className="group bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-accent-400/20 flex items-center justify-center text-accent-300 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {iconMap[stat.icon]}
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-200/70 font-medium">
                  {stat.label}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-blue-300/60 font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-blue-300/60" />
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
