import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { desc } from 'drizzle-orm';

// GET /api/users — List all users
export async function GET() {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json(allUsers);
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data user' },
      { status: 500 }
    );
  }
}

// POST /api/users — Create new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Nama, email, dan password wajib diisi' },
        { status: 400 }
      );
    }

    const newUser = await db.insert(users).values({
      name,
      email,
      password,
      role: role || 'pengurus',
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    });

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/users error:', error);
    const message = error instanceof Error && error.message.includes('unique')
      ? 'Email sudah terdaftar'
      : 'Gagal membuat user';
    return NextResponse.json({ message }, { status: 500 });
  }
}
