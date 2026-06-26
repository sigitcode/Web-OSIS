import { Metadata } from "next";
import PengurusLayout from "@/components/pengurus/PengurusLayout";

export const metadata: Metadata = {
  title: "Pengurus Dashboard - OSIS SMK HKTI 2",
  description: "Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok - Pengurus Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PengurusLayout>{children}</PengurusLayout>;
}
