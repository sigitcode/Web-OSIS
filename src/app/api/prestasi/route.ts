import { NextResponse } from 'next/server';
import { db } from '@/db';
import { prestasi } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allPrestasi = await db.select().from(prestasi).orderBy(desc(prestasi.createdAt));
    return NextResponse.json(allPrestasi);
  } catch (error) {
    console.error('GET /api/prestasi error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, tingkat, tahun, peserta, icon } = body;
    if (!judul || !tingkat || !tahun || !peserta) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }
    const newRecord = await db.insert(prestasi).values({ judul, tingkat, tahun, peserta, icon: icon || '🏆' }).returning();
    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/prestasi error:', error);
    return NextResponse.json({ message: 'Gagal menambah data' }, { status: 500 });
  }
}
