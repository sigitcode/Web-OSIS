"use client";

import { Menu, Bell, Search } from "lucide-react";

interface TopbarProps {
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export default function Topbar({ setIsOpen, isCollapsed, setIsCollapsed }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop menu toggle */}
        {setIsCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-2 -ml-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all outline-none w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-slate-700 leading-none">Admin</p>
            <p className="text-slate-500 text-xs mt-1">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
