import { NextResponse } from 'next/server';
import { db } from '@/db';
import { berita, agenda, users } from '@/db/schema';
import { count, desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Count agenda by status
    const [pendingCount] = await db.select({ value: count() }).from(agenda).where(eq(agenda.status, 'pending'));
    const [approvedCount] = await db.select({ value: count() }).from(agenda).where(eq(agenda.status, 'approved'));
    const [completedCount] = await db.select({ value: count() }).from(agenda).where(eq(agenda.status, 'completed'));
    const [userCount] = await db.select({ value: count() }).from(users);

    const stats = [
      { title: "Menunggu Validasi", value: String(pendingCount.value), change: "agenda pending", isPositive: false },
      { title: "Telah Divalidasi", value: String(approvedCount.value), change: "agenda approved", isPositive: true },
      { title: "Selesai", value: String(completedCount.value), change: "agenda completed", isPositive: true },
      { title: "Aktivitas Pengurus", value: String(userCount.value), change: "total user", isPositive: true },
    ];

    // Get recent berita + agenda as validation history
    const recentBerita = await db
      .select({
        title: berita.title,
        authorName: users.name,
        createdAt: berita.createdAt,
      })
      .from(berita)
      .leftJoin(users, eq(berita.authorId, users.id))
      .orderBy(desc(berita.createdAt))
      .limit(3);

    const recentAgenda = await db
      .select()
      .from(agenda)
      .orderBy(desc(agenda.createdAt))
      .limit(3);

    const recentValidations = [
      ...recentBerita.map((b) => ({
        type: 'Berita',
        title: b.title,
        status: 'Approved',
        time: b.createdAt ? formatRelativeTime(b.createdAt) : '-',
      })),
      ...recentAgenda.map((a) => ({
        type: 'Agenda',
        title: a.title,
        status: a.status === 'approved' ? 'Approved' : a.status === 'pending' ? 'Pending' : 'Completed',
        time: a.createdAt ? formatRelativeTime(a.createdAt) : '-',
      })),
    ].slice(0, 5);

    const chartData = [40, 70, 45, 90, 65, 85, 110, 60, 80, 50, 75, 100];

    return NextResponse.json({
      stats,
      recentValidations,
      chartData,
    });
  } catch (error) {
    console.error('GET /api/dashboard/pembina error:', error);
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
