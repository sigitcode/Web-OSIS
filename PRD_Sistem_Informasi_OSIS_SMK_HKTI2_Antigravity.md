# Product Requirements Document (PRD)
# Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok

> **Versi:** 1.0  
> **Target Platform:** Google Antigravity (Agentic AI)

## 1. Ringkasan

Dokumen ini merupakan hasil reverse engineering berdasarkan artikel *Rancang Bangun Website OSIS Sebagai Sarana Informasi dan Promosi SMK Bina Insani Cisauk* yang kemudian dikembangkan menjadi spesifikasi yang lebih modern untuk membangun **Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok Banjarnegara**.

Fitur utama yang teridentifikasi dari sistem referensi meliputi:

- Website publik
- Dashboard Admin
- Login
- Manajemen Berita
- Manajemen Agenda
- Manajemen Kegiatan OSIS
- Manajemen Ekstrakurikuler

Pada PRD ini fitur tersebut diperluas menjadi sistem informasi OSIS modern.

---

# 2. Tujuan

- Digitalisasi informasi OSIS
- Media promosi sekolah
- Portal kegiatan siswa
- CMS untuk pengurus OSIS
- Website cepat, responsif dan SEO friendly

---

# 3. Target Pengguna

1. Pengunjung
2. Siswa
3. Pengurus OSIS
4. Pembina OSIS
5. Administrator

---

# 4. Arsitektur Sistem

```
Browser
   │
Next.js Frontend
   │
REST API
   │
Laravel 12 Backend
   │
PostgreSQL
   │
Object Storage
```

---

# 5. Technology Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- TanStack Query
- Zod
- React Hook Form

## Backend

- Laravel 12
- PHP 8.4
- Sanctum
- Queue
- Scheduler

## Database

- PostgreSQL 16

## Storage

- S3 Compatible Storage

## Deployment

- Docker
- Nginx
- GitHub Actions
- Cloudflare

---

# 6. Modul Publik

- Landing Page
- Profil OSIS
- Visi Misi
- Struktur Organisasi
- Program Kerja
- Agenda
- Berita
- Prestasi
- Galeri
- Ekstrakurikuler
- Kontak

---

# 7. Modul Admin

Dashboard berisi statistik:

- jumlah berita
- agenda
- galeri
- ekstrakurikuler
- pengunjung
- aktivitas

Master Data:

- User
- Role
- Jabatan
- Divisi
- Program Kerja
- Ekstrakurikuler

CMS:

- Berita
- Agenda
- Banner
- Galeri
- Prestasi
- Pengumuman

---

# 8. Hak Akses

Administrator:
- seluruh sistem

Pembina:
- validasi konten

Pengurus:
- CRUD konten

Publik:
- membaca informasi

---

# 9. Database (inti)

- users
- roles
- permissions
- divisions
- anggota_osis
- berita
- kategori_berita
- agenda
- galeri
- foto
- ekstrakurikuler
- prestasi
- program_kerja
- pengumuman
- media
- audit_logs
- settings

---

# 10. API

REST API

/auth
/news
/events
/gallery
/extracurricular
/users
/dashboard

---

# 11. Non Functional Requirement

- Mobile First
- Responsive
- SEO
- Lighthouse >90
- WCAG
- Backup otomatis
- HTTPS
- RBAC
- Audit Log
- Soft Delete
- Rate Limit

---

# 12. UI/UX

Warna utama:

- Biru
- Kuning
- Putih

Gaya:

- Modern School
- Glassmorphism ringan
- Card based
- Smooth Animation

---

# 13. Dashboard Analytics

- Total Berita
- Agenda Bulan Ini
- Pengunjung
- Aktivitas User
- Grafik Publikasi

---

# 14. Roadmap

MVP
- CMS
- Website Publik

V2
- E-Voting OSIS
- Aspirasi Siswa
- Kalender Akademik

V3
- SSO Google
- AI Content Assistant
- Notifikasi WhatsApp

---

# 15. Prompt Google Antigravity

Bangun Sistem Informasi OSIS berbasis web untuk SMK HKTI 2 Purwareja Klampok menggunakan Next.js 15 + React 19 + Tailwind + shadcn/ui pada frontend, Laravel 12 + PostgreSQL pada backend, REST API, RBAC, dashboard admin modern, CMS berita, agenda, galeri, ekstrakurikuler, program kerja, SEO, responsive, audit log, Docker ready, clean architecture, repository pattern, reusable component, scalable dan production ready.
