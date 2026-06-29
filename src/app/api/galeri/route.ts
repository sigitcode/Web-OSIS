import { NextResponse } from 'next/server';
import { db } from '@/db';
import { galeri } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const all = await db.select().from(galeri).orderBy(desc(galeri.createdAt));
    return NextResponse.json(all);
  } catch (error) {
    console.error('GET /api/galeri error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, kategori, color } = body;
    if (!judul || !kategori) return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    const newRecord = await db.insert(galeri).values({ judul, kategori, color: color || 'from-blue-500 to-blue-700' }).returning();
    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/galeri error:', error);
    return NextResponse.json({ message: 'Gagal menambah data' }, { status: 500 });
  }
}
