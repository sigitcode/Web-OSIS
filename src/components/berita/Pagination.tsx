"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/berita?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Link
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
        className={cn(
          "p-2 rounded-lg border border-slate-200 transition-colors",
          currentPage > 1
            ? "hover:bg-slate-50 text-slate-700"
            : "opacity-50 cursor-not-allowed text-slate-400"
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all",
              isActive
                ? "bg-primary-600 text-white shadow-md shadow-primary-500/30"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
        className={cn(
          "p-2 rounded-lg border border-slate-200 transition-colors",
          currentPage < totalPages
            ? "hover:bg-slate-50 text-slate-700"
            : "opacity-50 cursor-not-allowed text-slate-400"
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
