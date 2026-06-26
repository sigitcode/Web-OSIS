import { Metadata } from "next";
import AdminLayout from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: "Admin Dashboard - OSIS SMK HKTI 2",
  description: "Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok - Admin Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
