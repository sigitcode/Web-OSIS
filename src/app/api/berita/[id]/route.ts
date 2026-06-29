import { NextResponse } from 'next/server';
import { db } from '@/db';
import { berita } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const beritaItem = await db.select().from(berita).where(eq(berita.id, parseInt(id)));
    if (beritaItem.length === 0) {
      return NextResponse.json({ message: 'Berita not found' }, { status: 404 });
    }
    return NextResponse.json(beritaItem[0]);
  } catch (error) {
    console.error('GET /api/berita/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Convert featured to boolean explicitly if it exists
    if (body.featured !== undefined) {
      body.featured = Boolean(body.featured);
    }

    const updatedBerita = await db.update(berita)
      .set(body)
      .where(eq(berita.id, parseInt(id)))
      .returning();

    if (updatedBerita.length === 0) {
      return NextResponse.json({ message: 'Berita not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBerita[0]);
  } catch (error) {
    console.error('PUT /api/berita/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deletedBerita = await db.delete(berita).where(eq(berita.id, parseInt(id))).returning();
    
    if (deletedBerita.length === 0) {
      return NextResponse.json({ message: 'Berita not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/berita/[id] error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
