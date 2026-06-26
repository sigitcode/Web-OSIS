import { Metadata } from "next";
import PembinaLayout from "@/components/pembina/PembinaLayout";

export const metadata: Metadata = {
  title: "Pembina Dashboard - OSIS SMK HKTI 2",
  description: "Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok - Pembina Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PembinaLayout>{children}</PembinaLayout>;
}
