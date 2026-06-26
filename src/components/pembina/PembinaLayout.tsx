"use client";

import { useState } from "react";
import PembinaSidebar from "./PembinaSidebar";
import PembinaTopbar from "./PembinaTopbar";

export default function PembinaLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <PembinaSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isCollapsed={isCollapsed} />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <PembinaTopbar setIsOpen={setIsSidebarOpen} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
