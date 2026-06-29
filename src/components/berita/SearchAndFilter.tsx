"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce"; // We'll create this hook

export default function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const currentQuery = searchParams.get("q") || "";
    if (debouncedQuery !== currentQuery) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedQuery) {
        params.set("q", debouncedQuery);
        params.set("page", "1"); // Reset to page 1 on new search
      } else {
        params.delete("q");
      }
      router.push(`/berita?${params.toString()}`);
    }
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 sm:text-sm transition-all shadow-sm"
        placeholder="Cari judul berita atau artikel..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
