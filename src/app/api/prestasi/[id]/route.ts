import { NextResponse } from 'next/server';
import { db } from '@/db';
import { prestasi } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await db.update(prestasi).set(body).where(eq(prestasi.id, parseInt(id))).returning();
    if (updated.length === 0) return NextResponse.json({ message: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT /api/prestasi/[id] error:', error);
    return NextResponse.json({ message: 'Gagal memperbarui' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await db.delete(prestasi).where(eq(prestasi.id, parseInt(id))).returning();
    if (deleted.length === 0) return NextResponse.json({ message: 'Tidak ditemukan' }, { status: 404 });
    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    console.error('DELETE /api/prestasi/[id] error:', error);
    return NextResponse.json({ message: 'Gagal menghapus' }, { status: 500 });
  }
}
