import { NextResponse } from 'next/server';
import { db } from '@/db';
import { ekstrakurikuler } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const all = await db.select().from(ekstrakurikuler).orderBy(desc(ekstrakurikuler.createdAt));
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, deskripsi, anggota, jadwal, icon } = body;
    if (!nama || !deskripsi) return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    const newRecord = await db.insert(ekstrakurikuler).values({ nama, deskripsi, anggota, jadwal, icon: icon || '⭐' }).returning();
    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menambah data' }, { status: 500 });
  }
}
