import { NextResponse } from 'next/server';
import { db } from '@/db';
import { ekstrakurikuler } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await db.update(ekstrakurikuler).set(body).where(eq(ekstrakurikuler.id, parseInt(id))).returning();
    if (updated.length === 0) return NextResponse.json({ message: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memperbarui' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await db.delete(ekstrakurikuler).where(eq(ekstrakurikuler.id, parseInt(id))).returning();
    if (deleted.length === 0) return NextResponse.json({ message: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus' }, { status: 500 });
  }
}
