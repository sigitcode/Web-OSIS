"use client";

import { navLinks, kontakInfo } from "@/lib/data";
import { GraduationCap, ArrowUp, Heart, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 rotate-180">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="currentColor" className="text-slate-100"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">OSIS SMK HKTI 2</h3>
                <p className="text-[10px] text-slate-400 tracking-wider">PURWAREJA KLAMPOK</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Organisasi Siswa Intra Sekolah SMK HKTI 2 Purwareja Klampok Banjarnegara. Wadah kreativitas dan pengembangan potensi siswa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Menu</h4>
            <ul className="space-y-2.5">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-accent-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-accent-400 transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Lainnya</h4>
            <ul className="space-y-2.5">
              {navLinks.slice(6).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-accent-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-accent-400 transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-5 text-white">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{kontakInfo.alamat}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                {kontakInfo.telepon}
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                {kontakInfo.email}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            © 2026 OSIS SMK HKTI 2 Purwareja Klampok. Dibuat dengan{" "}
            <Heart className="w-3.5 h-3.5 text-red-400 inline" /> untuk pendidikan.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
