import { NextResponse } from 'next/server';
import { db } from '@/db';
import { agenda } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/agenda/[id] — Get single agenda
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db
      .select()
      .from(agenda)
      .where(eq(agenda.id, parseInt(id)));

    if (result.length === 0) {
      return NextResponse.json(
        { message: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('GET /api/agenda/[id] error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data agenda' },
      { status: 500 }
    );
  }
}

// PUT /api/agenda/[id] — Update agenda
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, date, description, status } = body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (date !== undefined) updateData.date = new Date(date);
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: 'Tidak ada data yang diperbarui' },
        { status: 400 }
      );
    }

    const updated = await db
      .update(agenda)
      .set(updateData)
      .where(eq(agenda.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { message: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT /api/agenda/[id] error:', error);
    return NextResponse.json(
      { message: 'Gagal memperbarui agenda' },
      { status: 500 }
    );
  }
}

// DELETE /api/agenda/[id] — Delete agenda
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await db
      .delete(agenda)
      .where(eq(agenda.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { message: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Agenda berhasil dihapus' });
  } catch (error) {
    console.error('DELETE /api/agenda/[id] error:', error);
    return NextResponse.json(
      { message: 'Gagal menghapus agenda' },
      { status: 500 }
    );
  }
}
