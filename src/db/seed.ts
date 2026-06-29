import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from './index';
import { users, berita, agenda, prestasi, galeri, ekstrakurikuler, program_kerja, banners, pengumuman, jabatan, divisi, pengurus_osis } from './schema';
import { sql } from 'drizzle-orm';
import { 
  prestasi as mockPrestasi, 
  galeri as mockGaleri, 
  ekstrakurikuler as mockEkskul, 
  programKerja as mockProker,
  strukturOrganisasi as mockStruktur 
} from '../lib/data';

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (order matters due to foreign keys)
  console.log('Clearing existing data...');
  await db.delete(pengurus_osis);
  await db.delete(divisi);
  await db.delete(jabatan);
  await db.delete(pengumuman);
  await db.delete(banners);
  await db.delete(prestasi);
  await db.delete(galeri);
  await db.delete(ekstrakurikuler);
  await db.delete(program_kerja);
  await db.delete(berita);
  await db.delete(agenda);
  await db.delete(users);

  // Reset serial sequences
  await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE berita_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE agenda_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE prestasi_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE galeri_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE ekstrakurikuler_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE program_kerja_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE banners_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE pengumuman_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE jabatan_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE divisi_id_seq RESTART WITH 1`);
  await db.execute(sql`ALTER SEQUENCE pengurus_osis_id_seq RESTART WITH 1`);

  // 1. Insert Users
  const insertedUsers = await db.insert(users).values([
    {
      name: 'Admin OSIS',
      email: 'admin@osis.com',
      password: 'password123',
      role: 'admin',
    },
    {
      name: 'Budi Santoso',
      email: 'pengurus@osis.com',
      password: 'password123',
      role: 'pengurus',
    },
    {
      name: 'Pak Wahyudi',
      email: 'pembina@osis.com',
      password: 'password123',
      role: 'pembina',
    },
    {
      name: 'Siti Aminah',
      email: 'siti@osis.com',
      password: 'password123',
      role: 'pengurus',
    },
  ]).returning({ id: users.id });

  console.log('✅ Inserted users:', insertedUsers.length);

  const adminId = insertedUsers[0].id;
  const pengurusId = insertedUsers[1].id;
  const sitiId = insertedUsers[3].id;

  // 2. Insert Berita
  await db.insert(berita).values([
    {
      title: 'Pemilihan Ketua OSIS Baru Berjalan Lancar',
      content: 'Kegiatan pemilihan ketua OSIS periode 2026/2027 telah dilaksanakan dengan lancar pada hari Senin, 29 Juni 2026. Seluruh siswa memberikan suara mereka melalui sistem e-voting yang baru diterapkan. Terpilih ketua baru yang akan memimpin organisasi selama satu periode ke depan.',
      authorId: adminId,
    },
    {
      title: 'Porseni 2026 Segera Dimulai',
      content: 'Persiapkan dirimu untuk Porseni 2026! Ajang perlombaan olahraga dan seni antar kelas ini akan diadakan mulai bulan depan. Jangan lewatkan pendaftarannya di masing-masing koordinator kelas. Cabang yang dilombakan meliputi futsal, basket, badminton, catur, menyanyi, dan tari.',
      authorId: pengurusId,
    },
    {
      title: 'Seminar Kewirausahaan untuk Siswa',
      content: 'OSIS mengundang seluruh siswa untuk mengikuti seminar kewirausahaan yang akan diisi oleh pengusaha muda sukses alumni SMK HKTI 2. Seminar akan membahas tentang peluang bisnis di era digital dan tips memulai usaha sejak dini.',
      authorId: adminId,
    },
    {
      title: 'Juara 1 Lomba LKS Tingkat Provinsi',
      content: 'Selamat kepada tim siswa SMK HKTI 2 yang berhasil meraih juara 1 dalam Lomba Kompetensi Siswa (LKS) tingkat provinsi Jawa Tengah. Prestasi ini membuktikan kualitas pendidikan vokasi di sekolah kita.',
      authorId: sitiId,
    },
    {
      title: 'Program Penghijauan Lingkungan Sekolah',
      content: 'Dalam rangka memperingati Hari Lingkungan Hidup, OSIS menyelenggarakan program penghijauan di area sekolah. Kegiatan ini meliputi penanaman pohon, pembuatan taman mini, dan edukasi tentang pentingnya menjaga lingkungan.',
      authorId: pengurusId,
    },
  ]);
  console.log('✅ Inserted berita: 5');

  // 3. Insert Agenda
  const now = new Date();
  const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now); nextWeek.setDate(nextWeek.getDate() + 7);
  const nextTwoWeeks = new Date(now); nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14);

  await db.insert(agenda).values([
    { title: 'Rapat Persiapan Porseni', date: tomorrow, description: 'Rapat koordinasi panitia Porseni.', status: 'pending' },
    { title: 'Pelaksanaan Porseni Hari Pertama', date: nextWeek, description: 'Pembukaan Porseni.', status: 'approved' },
    { title: 'Seminar Kewirausahaan Digital', date: nextTwoWeeks, description: 'Seminar digital marketing.', status: 'pending' },
    { title: 'Rapat Pleno OSIS', date: tomorrow, description: 'Rapat pleno anggaran semester.', status: 'pending' },
  ]);
  console.log('✅ Inserted agenda: 4');

  // 4. Insert Prestasi
  if (mockPrestasi.length > 0) {
    await db.insert(prestasi).values(
      mockPrestasi.map((p) => ({
        judul: p.judul,
        tingkat: p.tingkat,
        tahun: p.tahun,
        peserta: p.peserta,
        icon: p.icon,
      }))
    );
  }
  console.log(`✅ Inserted prestasi: ${mockPrestasi.length}`);

  // 5. Insert Galeri
  if (mockGaleri.length > 0) {
    await db.insert(galeri).values(
      mockGaleri.map((g) => ({
        judul: g.judul,
        kategori: g.kategori,
        color: g.color,
      }))
    );
  }
  console.log(`✅ Inserted galeri: ${mockGaleri.length}`);

  // 6. Insert Ekstrakurikuler
  if (mockEkskul.length > 0) {
    await db.insert(ekstrakurikuler).values(
      mockEkskul.map((e) => ({
        nama: e.nama,
        deskripsi: e.deskripsi,
        anggota: e.anggota,
        jadwal: e.jadwal,
        icon: e.icon,
      }))
    );
  }
  console.log(`✅ Inserted ekstrakurikuler: ${mockEkskul.length}`);

  // 7. Insert Program Kerja
  if (mockProker.length > 0) {
    await db.insert(program_kerja).values(
      mockProker.map((p) => ({
        judul: p.judul,
        deskripsi: p.deskripsi,
        status: p.status,
        kategori: p.kategori,
        periode: p.periode,
      }))
    );
  }
  console.log(`✅ Inserted program kerja: ${mockProker.length}`);

  // 8. Insert Banners
  await db.insert(banners).values([
    {
      judul: 'OSIS SMK HKTI 2 Purwareja Klampok',
      sub_judul: 'Wadah kreativitas, kepemimpinan, dan prestasi siswa-siswi SMK HKTI 2.',
      gambar_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070',
      is_active: true,
    },
    {
      judul: 'Porseni 2026 Akan Datang!',
      sub_judul: 'Siapkan dirimu untuk kompetisi olahraga dan seni terbesar tahun ini.',
      gambar_url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2070',
      is_active: true,
    }
  ]);
  console.log(`✅ Inserted banners: 2`);

  // 9. Insert Pengumuman
  await db.insert(pengumuman).values([
    {
      judul: 'Pendaftaran Anggota OSIS Baru',
      isi: 'Pendaftaran pengurus OSIS periode 2027/2028 akan dibuka minggu depan. Persiapkan berkasmu!',
      is_active: true,
    }
  ]);
  console.log(`✅ Inserted pengumuman: 1`);

  // 10. Insert Jabatan & Divisi & Pengurus
  const jabatanMap = new Map();
  const divisiMap = new Map();

  // Extract unique jabatan and divisi from mock data
  const uniqueJabatan = [...new Set(mockStruktur.map(s => s.jabatan))];
  const uniqueDivisi = [...new Set(mockStruktur.map(s => s.divisi).filter(Boolean))];

  // Insert Jabatan (giving lower tingkat to Chairman etc)
  for (const jName of uniqueJabatan) {
    let tingkat = 99;
    if (jName.toLowerCase().includes('pembina')) tingkat = 1;
    else if (jName.toLowerCase().includes('ketua')) tingkat = 2;
    else if (jName.toLowerCase().includes('wakil')) tingkat = 3;
    else if (jName.toLowerCase().includes('sekretaris') || jName.toLowerCase().includes('bendahara')) tingkat = 4;
    else if (jName.toLowerCase().includes('koordinator')) tingkat = 5;

    const [j] = await db.insert(jabatan).values({ nama: jName, tingkat }).returning({ id: jabatan.id });
    jabatanMap.set(jName, j.id);
  }

  // Insert Divisi
  for (const dName of uniqueDivisi) {
    const [d] = await db.insert(divisi).values({ nama: dName, deskripsi: dName }).returning({ id: divisi.id });
    divisiMap.set(dName, d.id);
  }

  // Insert Pengurus
  for (const s of mockStruktur) {
    await db.insert(pengurus_osis).values({
      nama: s.nama,
      jabatan_id: jabatanMap.get(s.jabatan),
      divisi_id: s.divisi ? divisiMap.get(s.divisi) : null,
      avatar: s.avatar,
      angkatan: '2026/2027',
    });
  }
  console.log(`✅ Inserted pengurus_osis: ${mockStruktur.length}`);

  console.log('\n🎉 Seeding finished successfully!');
  console.log('\n📋 Test Accounts:');
  console.log('   Admin:    admin@osis.com    / password123');
  console.log('   Pengurus: pengurus@osis.com / password123');
  console.log('   Pembina:  pembina@osis.com  / password123');

  process.exit(0);
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e);
  process.exit(1);
});
