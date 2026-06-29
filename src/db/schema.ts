import { pgTable, serial, text, timestamp, varchar, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: varchar('role', { length: 50 }).notNull().default('pengurus'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const berita = pgTable('berita', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  kategori: varchar('kategori', { length: 100 }).notNull().default('Umum'),
  featured: boolean('featured').default(false),
  gambar: varchar('gambar', { length: 255 }),
  authorId: integer('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const agenda = pgTable('agenda', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const prestasi = pgTable('prestasi', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  tingkat: varchar('tingkat', { length: 100 }).notNull(),
  tahun: varchar('tahun', { length: 4 }).notNull(),
  peserta: varchar('peserta', { length: 255 }).notNull(),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const galeri = pgTable('galeri', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  kategori: varchar('kategori', { length: 100 }).notNull(),
  color: varchar('color', { length: 100 }).default('from-blue-500 to-blue-700'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ekstrakurikuler = pgTable('ekstrakurikuler', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  deskripsi: text('deskripsi').notNull(),
  anggota: integer('anggota').default(0),
  jadwal: varchar('jadwal', { length: 255 }),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const program_kerja = pgTable('program_kerja', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  deskripsi: text('deskripsi').notNull(),
  status: varchar('status', { length: 50 }).default('Akan Datang'), // Akan Datang, Aktif, Selesai
  kategori: varchar('kategori', { length: 100 }).notNull(),
  periode: varchar('periode', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// NEW TABLES
export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  sub_judul: text('sub_judul'),
  gambar_url: varchar('gambar_url', { length: 255 }).notNull(),
  is_active: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const pengumuman = pgTable('pengumuman', {
  id: serial('id').primaryKey(),
  judul: varchar('judul', { length: 255 }).notNull(),
  isi: text('isi').notNull(),
  is_active: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const jabatan = pgTable('jabatan', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 100 }).notNull(),
  tingkat: integer('tingkat').notNull().default(99), // lower means higher rank in structure
});

export const divisi = pgTable('divisi', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 100 }).notNull(),
  deskripsi: text('deskripsi'),
});

export const pengurus_osis = pgTable('pengurus_osis', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  jabatan_id: integer('jabatan_id').references(() => jabatan.id).notNull(),
  divisi_id: integer('divisi_id').references(() => divisi.id),
  avatar: varchar('avatar', { length: 255 }),
  angkatan: varchar('angkatan', { length: 20 }),
});
