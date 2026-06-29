import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Query user from database
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Email tidak ditemukan' },
        { status: 401 }
      );
    }

    // Compare password (plaintext for MVP)
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Password salah' },
        { status: 401 }
      );
    }

    // Determine redirect path based on role
    let redirectPath = '/pengurus';
    if (user.role === 'admin') {
      redirectPath = '/admin';
    } else if (user.role === 'pembina') {
      redirectPath = '/pembina';
    }

    return NextResponse.json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirect: redirectPath,
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
