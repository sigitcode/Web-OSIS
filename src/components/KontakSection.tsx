"use client";

import { kontakInfo } from "@/lib/data";
import { SectionHeading, AnimateOnScroll, GlassCard } from "@/components/ui/shared";
import { MapPin, Phone, Mail, Globe, Send, Camera, Play, ThumbsUp } from "lucide-react";

export default function KontakSection() {
  return (
    <section id="kontak" className="py-24 section-alt relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          accent="Hubungi Kami"
          title="Kontak & Informasi"
          subtitle="Hubungi kami untuk informasi lebih lanjut mengenai OSIS SMK HKTI 2 Purwareja Klampok."
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <AnimateOnScroll className="lg:col-span-3">
            <GlassCard className="h-full" hover={false}>
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Kirim Pesan
              </h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all duration-300 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    placeholder="Subjek pesan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tulis pesan Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all duration-300 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </button>
              </form>
            </GlassCard>
          </AnimateOnScroll>

          {/* Contact Info */}
          <AnimateOnScroll className="lg:col-span-2" delay={200}>
            <div className="space-y-5 h-full flex flex-col">
              {/* Address Card */}
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-500/20">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Alamat</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{kontakInfo.alamat}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Phone */}
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/20">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Telepon</h4>
                    <p className="text-sm text-slate-500">{kontakInfo.telepon}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Email */}
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-accent-500/20">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Email</h4>
                    <p className="text-sm text-slate-500">{kontakInfo.email}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Website */}
              <GlassCard hover={false}>
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Website</h4>
                    <p className="text-sm text-slate-500">{kontakInfo.website}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Social Media */}
              <div className="flex-grow" />
              <div>
                <h4 className="font-semibold text-slate-700 text-sm mb-3">Ikuti Kami</h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20 hover:-translate-y-1 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <Camera className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-500/20 hover:-translate-y-1 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <Play className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <ThumbsUp className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
