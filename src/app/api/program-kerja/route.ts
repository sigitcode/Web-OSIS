import { NextResponse } from 'next/server';
import { db } from '@/db';
import { program_kerja } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const all = await db.select().from(program_kerja).orderBy(desc(program_kerja.createdAt));
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, deskripsi, status, kategori, periode } = body;
    if (!judul || !deskripsi || !kategori || !periode) return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    const newRecord = await db.insert(program_kerja).values({ judul, deskripsi, status, kategori, periode }).returning();
    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menambah data' }, { status: 500 });
  }
}
