# Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok

Repository ini berisi source code untuk Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok. Struktur repository ini menggunakan pendekatan **Monorepo** yang memisahkan antara frontend dan backend.

## Struktur Direktori

- `/frontend` - Berisi aplikasi frontend menggunakan **Next.js 15**.
- `/backend` - (Segera hadir) Berisi API backend menggunakan **Laravel 12**.

## Panduan Deployment ke Vercel

Karena aplikasi Next.js berada di dalam folder `/frontend`, saat Anda mendeploy repository ini ke Vercel, Anda **WAJIB** mengatur **Root Directory**.

Langkah-langkah di Vercel:
1. Saat melakukan **Import Project** dari GitHub di Vercel.
2. Buka bagian **Framework Preset**, pastikan terdeteksi sebagai **Next.js**.
3. Buka bagian **Root Directory**, klik **Edit**.
4. Pilih folder `frontend` lalu simpan.
5. Lanjutkan klik **Deploy**.

Jika pengaturan ini dilewatkan, Vercel akan mencoba membuild dari root repository yang tidak memiliki `package.json`, sehingga akan menghasilkan halaman kosong (Error 404 NOT_FOUND).
