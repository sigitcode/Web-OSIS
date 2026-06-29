import { NextResponse } from 'next/server';
import { db } from '@/db';
import { berita, users } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allBerita = await db
      .select({
        id: berita.id,
        title: berita.title,
        content: berita.content,
        kategori: berita.kategori,
        featured: berita.featured,
        gambar: berita.gambar,
        createdAt: berita.createdAt,
        authorName: users.name,
      })
      .from(berita)
      .leftJoin(users, eq(berita.authorId, users.id))
      .orderBy(desc(berita.createdAt));

    return NextResponse.json(allBerita);
  } catch (error) {
    console.error('GET /api/berita error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, authorId, kategori, featured, gambar } = body;
    
    if (!title || !content || !authorId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newBerita = await db.insert(berita).values({
      title,
      content,
      authorId: parseInt(authorId),
      kategori: kategori || 'Umum',
      featured: Boolean(featured),
      gambar: gambar || null,
    }).returning();

    return NextResponse.json(newBerita[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/berita error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
