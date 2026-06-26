import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OSIS SMK HKTI 2 Purwareja Klampok — Sistem Informasi Organisasi Siswa",
  description:
    "Portal resmi OSIS SMK HKTI 2 Purwareja Klampok Banjarnegara. Informasi kegiatan, berita, agenda, ekstrakurikuler, dan program kerja organisasi siswa.",
  keywords: [
    "OSIS",
    "SMK HKTI 2",
    "Purwareja Klampok",
    "Banjarnegara",
    "organisasi siswa",
    "ekstrakurikuler",
    "sekolah",
  ],
  authors: [{ name: "OSIS SMK HKTI 2 Purwareja Klampok" }],
  openGraph: {
    title: "OSIS SMK HKTI 2 Purwareja Klampok",
    description:
      "Portal resmi OSIS SMK HKTI 2 Purwareja Klampok Banjarnegara. Informasi kegiatan, berita, agenda, dan program kerja.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
