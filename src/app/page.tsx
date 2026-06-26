import Navbar from "@/components/Navbar";
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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProfilSection />
        <StrukturSection />
        <ProgramKerjaSection />
        <BeritaSection />
        <AgendaSection />
        <PrestasiSection />
        <GaleriSection />
        <EkstrakurikulerSection />
        <KontakSection />
      </main>
      <Footer />
    </>
  );
}
