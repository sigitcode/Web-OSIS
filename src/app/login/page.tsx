"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden selection:bg-accent-400/30">
      {/* Animated background elements (consistent with HeroSection) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/5 rounded-full blur-3xl animate-float-slow" />
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Decorative geometric shapes */}
        <div className="absolute top-[20%] right-[15%] w-4 h-4 bg-accent-400/40 rounded-full animate-pulse-soft" />
        <div className="absolute bottom-[30%] left-[20%] w-3 h-3 bg-blue-300/40 rounded-full animate-pulse-soft" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative shine effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 via-accent-300 to-accent-500 opacity-80" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-white/20 shadow-inner">
              <Lock className="w-8 h-8 text-accent-400" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
              Login Portal
            </h1>
            <p className="text-blue-200/80 text-sm font-medium">
              Sistem Informasi OSIS SMK HKTI 2
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-blue-100 mb-2" htmlFor="email">
                Email atau NIS
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-300/60 group-focus-within:text-accent-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="text"
                  placeholder="Masukkan email atau NIS..."
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/50 transition-all backdrop-blur-sm shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-100 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-300/60 group-focus-within:text-accent-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-blue-200/40 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/50 transition-all backdrop-blur-sm shadow-inner"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-5 h-5 border-2 border-blue-300/40 rounded bg-white/5 peer-checked:bg-accent-500 peer-checked:border-accent-500 transition-all duration-200" />
                  <svg className="absolute w-3.5 h-3.5 text-slate-900 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-blue-200/80 group-hover:text-blue-100 font-medium transition-colors">Ingat saya</span>
              </label>
              <a href="#" className="text-accent-400 hover:text-accent-300 font-bold transition-colors">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-accent-500 to-accent-400 text-slate-900 rounded-xl font-bold text-base py-3.5 shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                ) : (
                  <>
                    Masuk ke Sistem
                    <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-blue-200/60 font-medium">
              Sistem ini khusus untuk Pengurus & Pembina OSIS
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
