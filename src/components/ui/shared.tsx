"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  title,
  subtitle,
  accent,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"} transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {accent && (
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-accent-500 mb-2">
          {accent}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
        {title}
      </h2>
      <div
        className={`h-1 w-20 rounded-full bg-gradient-to-r from-primary-600 to-accent-400 ${
          align === "center" ? "mx-auto" : ""
        } transition-all duration-1000 ${visible ? "w-20" : "w-0"}`}
      />
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        hover ? "hover:-translate-y-1 hover:shadow-xl cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </div>
  );
}
