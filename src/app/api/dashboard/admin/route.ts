import { NextResponse } from 'next/server';
import { db } from '@/db';
import { berita, agenda, users } from '@/db/schema';
import { count, desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Get real counts from database
    const [beritaCount] = await db.select({ value: count() }).from(berita);
    const [agendaCount] = await db.select({ value: count() }).from(agenda);
    const [userCount] = await db.select({ value: count() }).from(users);

    const stats = [
      { title: "Total Berita", value: String(beritaCount.value), change: "dari database", isPositive: true },
      { title: "Total Agenda", value: String(agendaCount.value), change: "dari database", isPositive: true },
      { title: "Total User", value: String(userCount.value), change: "dari database", isPositive: true },
      { title: "Agenda Pending", value: "0", change: "menunggu", isPositive: false },
    ];

    // Count pending agenda
    const [pendingCount] = await db
      .select({ value: count() })
      .from(agenda)
      .where(eq(agenda.status, 'pending'));
    stats[3].value = String(pendingCount.value);

    // Get recent berita for activity feed
    const recentBerita = await db
      .select({
        title: berita.title,
        authorName: users.name,
        createdAt: berita.createdAt,
      })
      .from(berita)
      .leftJoin(users, eq(berita.authorId, users.id))
      .orderBy(desc(berita.createdAt))
      .limit(5);

    const recentActivities = recentBerita.map((b) => ({
      user: b.authorName || 'Unknown',
      action: 'mempublikasikan berita',
      target: b.title,
      time: b.createdAt ? formatRelativeTime(b.createdAt) : '-',
    }));

    const chartData = [40, 70, 45, 90, 65, 85, 110, 60, 80, 50, 75, 100];

    return NextResponse.json({
      stats,
      recentActivities,
      chartData,
    });
  } catch (error) {
    console.error('GET /api/dashboard/admin error:', error);
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
