import { db } from "@/db";
import { berita, agenda, prestasi, galeri, ekstrakurikuler, program_kerja, banners, pengurus_osis, jabatan, divisi } from "@/db/schema";
import { desc, asc, eq } from "drizzle-orm";

import Navbar from "@/components/Navbar";
import PengumumanBar from "@/components/PengumumanBar";
import HeroSection from "@/components/HeroSection";
import ProfilSection from "@/components/ProfilSection";
import StrukturSection from "@/components/StrukturSection";
import ProgramKerjaSection from "@/components/ProgramKerjaSection";
import BeritaSection from "@/components/BeritaSection";
import AgendaSection from "@/components/AgendaSection";
import PrestasiSection from "@/components/PrestasiSection";
import GaleriSection from "@/components/GaleriSection";
import EkstrakurikulerSection from "@/components/EkstrakurikulerSection";
import KontakSection from "@/components/KontakSection";
import Footer from "@/components/Footer";

export const revalidate = 0; // Disable static caching for dynamic data

// Helper function to strip HTML tags for summary
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

export default async function Home() {
  // Fetch real data from Neon PostgreSQL database using Drizzle ORM
  const dbBanners = await db.select().from(banners).where(eq(banners.is_active, true));
  
  const dbBerita = await db.select().from(berita).orderBy(desc(berita.createdAt)).limit(5);
  const dbAgenda = await db.select().from(agenda).orderBy(asc(agenda.date)).limit(5);
  const dbPrestasi = await db.select().from(prestasi).orderBy(desc(prestasi.createdAt)).limit(6);
  const dbGaleri = await db.select().from(galeri).orderBy(desc(galeri.createdAt)).limit(8);
  const dbEkskul = await db.select().from(ekstrakurikuler).orderBy(desc(ekstrakurikuler.createdAt));
  const dbProker = await db.select().from(program_kerja).orderBy(desc(program_kerja.createdAt));
  
  // Fetch struktur (join pengurus, jabatan, divisi)
  const dbPengurus = await db
    .select({
      id: pengurus_osis.id,
      nama: pengurus_osis.nama,
      avatar: pengurus_osis.avatar,
      jabatan_nama: jabatan.nama,
      jabatan_tingkat: jabatan.tingkat,
      divisi_nama: divisi.nama,
    })
    .from(pengurus_osis)
    .innerJoin(jabatan, eq(pengurus_osis.jabatan_id, jabatan.id))
    .leftJoin(divisi, eq(pengurus_osis.divisi_id, divisi.id))
    .orderBy(asc(jabatan.tingkat));

  // Transform data if needed for the UI components
  const formattedBerita = dbBerita.map((b) => ({
    id: b.id,
    judul: b.title,
    ringkasan: stripHtml(b.content), // Strip HTML tags for clean summary
    tanggal: b.createdAt ? b.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "",
    kategori: b.kategori,
    featured: b.featured,
    gambar: b.gambar,
  }));

  const formattedAgenda = dbAgenda.map(a => ({
    id: a.id,
    judul: a.title,
    tanggal: a.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short", year: "numeric" }),
    waktu: a.date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
    lokasi: "Sesuai Deskripsi", 
    tipe: "Agenda",
  }));

  const formattedPrestasi = dbPrestasi.map(p => ({
    id: p.id,
    judul: p.judul,
    tingkat: p.tingkat,
    tahun: p.tahun,
    peserta: p.peserta,
    icon: p.icon || '🏆',
  }));

  const formattedGaleri = dbGaleri.map(g => ({
    id: g.id,
    judul: g.judul,
    kategori: g.kategori,
    color: g.color || 'from-blue-500 to-blue-700',
  }));

  const formattedEkskul = dbEkskul.map(e => ({
    id: e.id,
    nama: e.nama,
    deskripsi: e.deskripsi,
    anggota: e.anggota,
    jadwal: e.jadwal,
    icon: e.icon,
  }));

  const formattedProker = dbProker.map(p => ({
    id: p.id,
    judul: p.judul,
    deskripsi: p.deskripsi,
    status: p.status,
    kategori: p.kategori,
    periode: p.periode,
  }));

  const formattedStruktur = dbPengurus.map(p => ({
    nama: p.nama,
    jabatan: p.jabatan_nama,
    divisi: p.divisi_nama || "",
    avatar: p.avatar || "👨‍🎓",
  }));

  return (
    <>
      <PengumumanBar />
      <Navbar />
      <main>
        <HeroSection banners={dbBanners} />
        <ProfilSection />
        <StrukturSection struktur={formattedStruktur} />
        <ProgramKerjaSection prokerList={formattedProker} />
        <BeritaSection beritaList={formattedBerita} />
        <AgendaSection agendaList={formattedAgenda} />
        <PrestasiSection prestasiList={formattedPrestasi} />
        <GaleriSection galeriList={formattedGaleri} />
        <EkstrakurikulerSection ekskulList={formattedEkskul} />
        <KontakSection />
      </main>
      <Footer />
    </>
  );
}
