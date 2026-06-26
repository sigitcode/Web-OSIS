"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Badge, 
  Briefcase, 
  ClipboardList, 
  Trophy, 
  Newspaper, 
  CalendarDays, 
  Image as ImageIcon, 
  ImagePlus, 
  Award, 
  Megaphone,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed?: boolean;
}

export default function Sidebar({ isOpen, setIsOpen, isCollapsed = false }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      title: "CMS",
      items: [
        { label: "Berita", href: "/admin/berita", icon: Newspaper },
        { label: "Agenda", href: "/admin/agenda", icon: CalendarDays },
        { label: "Banner", href: "/admin/banner", icon: ImageIcon },
        { label: "Galeri", href: "/admin/galeri", icon: ImagePlus },
        { label: "Prestasi", href: "/admin/prestasi", icon: Award },
        { label: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
      ],
    },
    {
      title: "Master Data",
      items: [
        { label: "User", href: "/admin/users", icon: Users },
        { label: "Role & Permission", href: "/admin/roles", icon: Shield },
        { label: "Jabatan", href: "/admin/jabatan", icon: Badge },
        { label: "Divisi", href: "/admin/divisi", icon: Briefcase },
        { label: "Program Kerja", href: "/admin/program-kerja", icon: ClipboardList },
        { label: "Ekstrakurikuler", href: "/admin/ekskul", icon: Trophy },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className={cn("flex items-center h-16 border-b border-slate-200", isCollapsed ? "justify-center px-0" : "justify-between px-6")}>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm glow-blue">
              O
            </div>
            {!isCollapsed && <span className="font-bold text-slate-800 text-lg tracking-tight whitespace-nowrap">OSIS Admin</span>}
          </Link>
          {!isCollapsed && (
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
          {menuItems.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed ? (
                <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {group.title}
                </h3>
              ) : (
                <div className="h-4 border-b border-slate-100 mb-2 w-8 mx-auto"></div>
              )}
              {group.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary-50 text-primary-700 shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      isCollapsed ? "justify-center px-0" : ""
                    )}
                  >
                    <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary-600" : "text-slate-400")} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <Link
            href="/"
            title={isCollapsed ? "Kembali ke Web" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200",
              isCollapsed ? "justify-center px-0" : ""
            )}
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Kembali ke Web</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
