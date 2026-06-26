"use client";

import { useState } from "react";
import PengurusSidebar from "./PengurusSidebar";
import PengurusTopbar from "./PengurusTopbar";

export default function PengurusLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <PengurusSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isCollapsed={isCollapsed} />
      
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <PengurusTopbar setIsOpen={setIsSidebarOpen} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
