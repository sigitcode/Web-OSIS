import { NextResponse } from 'next/server';
import { db } from '@/db';
import { agenda } from '@/db/schema';
import { desc } from 'drizzle-orm';

// GET /api/agenda — List all agenda
export async function GET() {
  try {
    const allAgenda = await db
      .select()
      .from(agenda)
      .orderBy(desc(agenda.date));

    return NextResponse.json(allAgenda);
  } catch (error) {
    console.error('GET /api/agenda error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data agenda' },
      { status: 500 }
    );
  }
}

// POST /api/agenda — Create new agenda
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, description, status } = body;

    if (!title || !date || !description) {
      return NextResponse.json(
        { message: 'Judul, tanggal, dan deskripsi wajib diisi' },
        { status: 400 }
      );
    }

    const newAgenda = await db.insert(agenda).values({
      title,
      date: new Date(date),
      description,
      status: status || 'pending',
    }).returning();

    return NextResponse.json(newAgenda[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/agenda error:', error);
    return NextResponse.json(
      { message: 'Gagal membuat agenda' },
      { status: 500 }
    );
  }
}
