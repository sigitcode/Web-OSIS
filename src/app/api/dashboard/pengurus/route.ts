import { NextResponse } from 'next/server';
import { db } from '@/db';
import { berita, agenda, users } from '@/db/schema';
import { count, desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const [beritaCount] = await db.select({ value: count() }).from(berita);
    const [agendaCount] = await db.select({ value: count() }).from(agenda);

    const pendingAgenda = await db
      .select()
      .from(agenda)
      .where(eq(agenda.status, 'pending'))
      .orderBy(desc(agenda.date))
      .limit(1);

    const stats = [
      { title: "Publikasi Berita", value: String(beritaCount.value), change: "dari database", isPositive: true },
      { title: "Agenda Mendatang", value: String(agendaCount.value), change: pendingAgenda.length > 0 ? `Terdekat: ${pendingAgenda[0].title}` : "Tidak ada", isPositive: true },
      { title: "Program Kerja", value: "12", change: "8 Aktif, 4 Selesai", isPositive: true },
      { title: "Galeri & Media", value: "86", change: "+12 foto baru", isPositive: true },
    ];

    // Get pending tasks from agenda
    const allAgenda = await db
      .select()
      .from(agenda)
      .orderBy(desc(agenda.date))
      .limit(4);

    const pendingTasks = allAgenda.map((a) => ({
      task: a.title,
      status: a.status === 'completed' ? 'completed' : 'pending',
      time: a.status === 'completed' ? 'Selesai' : `Tanggal: ${a.date.toLocaleDateString('id-ID')}`,
    }));

    // Get recent berita as activity
    const recentBerita = await db
      .select({
        title: berita.title,
        createdAt: berita.createdAt,
      })
      .from(berita)
      .orderBy(desc(berita.createdAt))
      .limit(4);

    const recentActivities = recentBerita.map((b) => ({
      action: 'mempublikasikan berita',
      target: b.title,
      time: b.createdAt ? formatRelativeTime(b.createdAt) : '-',
    }));

    const chartData = [20, 35, 25, 60, 45, 55, 80, 40, 50, 30, 45, 70];

    return NextResponse.json({
      stats,
      pendingTasks,
      recentActivities,
      chartData,
    });
  } catch (error) {
    console.error('GET /api/dashboard/pengurus error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data dashboard' },
      { status: 500 }
    );
  }
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  if (days < 7) return `${days} hari yang lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}
