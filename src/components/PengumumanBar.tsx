import { db } from "@/db";
import { pengumuman } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Megaphone } from "lucide-react";

export const revalidate = 0;

export default async function PengumumanBar() {
  const activePengumuman = await db
    .select()
    .from(pengumuman)
    .where(eq(pengumuman.is_active, true));

  if (activePengumuman.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-accent-600 to-accent-500 text-white w-full sticky top-0 z-50 overflow-hidden shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-10">
        <div className="flex-shrink-0 flex items-center justify-center bg-accent-700/50 h-full px-4 border-r border-white/20 z-10 relative">
          <Megaphone className="w-4 h-4 mr-2 animate-pulse" />
          <span className="font-bold text-xs tracking-wider uppercase">Pengumuman</span>
        </div>
        <div className="flex-grow overflow-hidden whitespace-nowrap pl-4">
          <div className="inline-block animate-[marquee_20s_linear_infinite] text-sm font-medium">
            {activePengumuman.map((item, index) => (
              <span key={item.id} className="mx-8">
                <span className="font-bold opacity-80 mr-2">[{item.judul}]</span>
                {item.isi}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
