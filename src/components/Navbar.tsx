"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/lib/data";
import { Menu, X, GraduationCap, LogIn } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href);
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-primary-900/5 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#beranda")}
            className="flex items-center gap-3 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? "bg-gradient-to-br from-primary-600 to-primary-800"
                : "bg-white/20 backdrop-blur-sm"
            }`}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-sm leading-tight transition-colors duration-300 ${
                scrolled ? "text-primary-900" : "text-white"
              }`}>
                OSIS SMK HKTI 2
              </span>
              <span className={`text-[10px] tracking-wider transition-colors duration-300 ${
                scrolled ? "text-slate-500" : "text-blue-200"
              }`}>
                PURWAREJA KLAMPOK
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href
                    ? scrolled
                      ? "text-primary-700 bg-primary-50"
                      : "text-white bg-white/20"
                    : scrolled
                    ? "text-slate-600 hover:text-primary-700 hover:bg-primary-50/50"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="h-6 w-px bg-white/20 mx-2 hidden lg:block" />
            <Link
              href="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-md ${
                scrolled
                  ? "bg-accent-500 text-slate-900 hover:bg-accent-400 hover:-translate-y-0.5 shadow-accent-500/20"
                  : "bg-white text-slate-900 hover:bg-slate-100 hover:-translate-y-0.5 shadow-black/10"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Masuk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sm text-primary-900">OSIS SMK HKTI 2</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-1">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href
                    ? "text-primary-700 bg-primary-50"
                    : "text-slate-600 hover:text-primary-700 hover:bg-slate-50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-slate-100">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 bg-accent-500 hover:bg-accent-400 transition-all duration-300 shadow-md shadow-accent-500/20"
              >
                <LogIn className="w-5 h-5" />
                Masuk ke Portal OSIS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
