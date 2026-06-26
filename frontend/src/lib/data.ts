// ============================================================
// Mock Data — Sistem Informasi OSIS SMK HKTI 2 Purwareja Klampok
// ============================================================

export const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Struktur", href: "#struktur" },
  { label: "Program Kerja", href: "#program-kerja" },
  { label: "Berita", href: "#berita" },
  { label: "Agenda", href: "#agenda" },
  { label: "Prestasi", href: "#prestasi" },
  { label: "Galeri", href: "#galeri" },
  { label: "Ekskul", href: "#ekskul" },
  { label: "Kontak", href: "#kontak" },
];

export const heroStats = [
  { value: "12+", label: "Ekstrakurikuler", icon: "trophy" },
  { value: "50+", label: "Anggota OSIS", icon: "users" },
  { value: "8", label: "Divisi", icon: "layout" },
  { value: "20+", label: "Program Kerja", icon: "target" },
];

export const visiMisi = {
  visi: "Menjadi organisasi siswa yang kreatif, inovatif, dan berprestasi dalam mewujudkan generasi muda yang berkarakter, berwawasan global, serta berlandaskan iman dan taqwa di SMK HKTI 2 Purwareja Klampok.",
  misi: [
    "Meningkatkan keimanan dan ketaqwaan siswa melalui kegiatan keagamaan.",
    "Mengembangkan potensi siswa di bidang akademik, seni, dan olahraga.",
    "Menumbuhkan jiwa kepemimpinan, kreativitas, dan inovasi siswa.",
    "Mempererat tali persaudaraan dan kekeluargaan antar siswa.",
    "Mewujudkan lingkungan sekolah yang bersih, aman, dan kondusif.",
    "Menjalin hubungan baik dengan masyarakat dan organisasi luar.",
  ],
};

export const strukturOrganisasi = [
  {
    jabatan: "Pembina OSIS",
    nama: "Bapak Drs. Suharto, M.Pd.",
    divisi: "Pembina",
    avatar: "👨‍🏫",
  },
  {
    jabatan: "Ketua OSIS",
    nama: "Ahmad Fauzan Rizky",
    divisi: "Pimpinan",
    avatar: "👨‍💼",
  },
  {
    jabatan: "Wakil Ketua",
    nama: "Siti Nurhaliza",
    divisi: "Pimpinan",
    avatar: "👩‍💼",
  },
  {
    jabatan: "Sekretaris",
    nama: "Dewi Anggraini",
    divisi: "Sekretariat",
    avatar: "👩‍💻",
  },
  {
    jabatan: "Bendahara",
    nama: "Raka Pratama",
    divisi: "Keuangan",
    avatar: "👨‍💻",
  },
  {
    jabatan: "Koordinator Bidang 1",
    nama: "Budi Santoso",
    divisi: "Ketaqwaan",
    avatar: "🧑‍🤝‍🧑",
  },
  {
    jabatan: "Koordinator Bidang 2",
    nama: "Lestari Putri",
    divisi: "Bela Negara",
    avatar: "👩‍🎓",
  },
  {
    jabatan: "Koordinator Bidang 3",
    nama: "Arif Wicaksono",
    divisi: "Kepribadian",
    avatar: "🧑‍🎓",
  },
];

export const programKerja = [
  {
    id: 1,
    judul: "MPLS (Masa Pengenalan Lingkungan Sekolah)",
    deskripsi:
      "Kegiatan orientasi siswa baru untuk mengenal lingkungan sekolah, tata tertib, dan budaya SMK HKTI 2.",
    status: "Selesai",
    kategori: "Akademik",
    periode: "Juli 2026",
  },
  {
    id: 2,
    judul: "Peringatan HUT Kemerdekaan RI",
    deskripsi:
      "Rangkaian lomba dan upacara memperingati Hari Kemerdekaan Republik Indonesia ke-81.",
    status: "Aktif",
    kategori: "Nasionalisme",
    periode: "Agustus 2026",
  },
  {
    id: 3,
    judul: "Pekan Olahraga & Seni (PORSENI)",
    deskripsi:
      "Kompetisi olahraga dan seni antar kelas untuk menyalurkan bakat dan minat siswa.",
    status: "Akan Datang",
    kategori: "Olahraga & Seni",
    periode: "Oktober 2026",
  },
  {
    id: 4,
    judul: "Bakti Sosial",
    deskripsi:
      "Kegiatan sosial berupa penggalangan dana dan kunjungan ke panti asuhan di Banjarnegara.",
    status: "Akan Datang",
    kategori: "Sosial",
    periode: "November 2026",
  },
  {
    id: 5,
    judul: "Workshop Kepemimpinan",
    deskripsi:
      "Pelatihan soft skill dan leadership untuk pengurus OSIS dan perwakilan kelas.",
    status: "Selesai",
    kategori: "Kepemimpinan",
    periode: "Mei 2026",
  },
  {
    id: 6,
    judul: "Peringatan Maulid Nabi",
    deskripsi:
      "Kegiatan keagamaan memperingati Maulid Nabi Muhammad SAW dengan ceramah dan sholawat.",
    status: "Akan Datang",
    kategori: "Keagamaan",
    periode: "September 2026",
  },
];

export const berita = [
  {
    id: 1,
    judul: "SMK HKTI 2 Raih Juara Umum Lomba Kompetensi Siswa Tingkat Kabupaten",
    ringkasan:
      "Siswa-siswi SMK HKTI 2 berhasil meraih juara umum dalam Lomba Kompetensi Siswa (LKS) tingkat Kabupaten Banjarnegara 2026.",
    tanggal: "20 Juni 2026",
    kategori: "Prestasi",
    gambar: "/images/berita-1.jpg",
    featured: true,
  },
  {
    id: 2,
    judul: "Pelantikan Pengurus OSIS Periode 2026/2027",
    ringkasan:
      "Pengurus OSIS baru resmi dilantik oleh Kepala Sekolah dalam upacara yang dihadiri seluruh civitas akademika.",
    tanggal: "15 Juni 2026",
    kategori: "Organisasi",
    gambar: "/images/berita-2.jpg",
    featured: false,
  },
  {
    id: 3,
    judul: "Workshop Digital Marketing untuk Siswa SMK",
    ringkasan:
      "OSIS bekerja sama dengan industri mengadakan workshop digital marketing untuk membekali siswa dengan keterampilan abad 21.",
    tanggal: "10 Juni 2026",
    kategori: "Kegiatan",
    gambar: "/images/berita-3.jpg",
    featured: false,
  },
  {
    id: 4,
    judul: "Gerakan Sekolah Hijau: Penanaman 100 Pohon",
    ringkasan:
      "OSIS menginisiasi gerakan penghijauan dengan menanam 100 pohon di area sekitar sekolah bersama warga sekitar.",
    tanggal: "5 Juni 2026",
    kategori: "Lingkungan",
    gambar: "/images/berita-4.jpg",
    featured: false,
  },
];

export const agenda = [
  {
    id: 1,
    judul: "Upacara Bendera Hari Senin",
    tanggal: "30 Juni 2026",
    waktu: "07:00 WIB",
    lokasi: "Lapangan Utama",
    tipe: "Rutin",
  },
  {
    id: 2,
    judul: "Rapat Koordinasi Pengurus OSIS",
    tanggal: "2 Juli 2026",
    waktu: "14:00 WIB",
    lokasi: "Ruang OSIS",
    tipe: "Internal",
  },
  {
    id: 3,
    judul: "MPLS Siswa Baru TA 2026/2027",
    tanggal: "14 Juli 2026",
    waktu: "07:00 - 12:00 WIB",
    lokasi: "Aula Sekolah",
    tipe: "Kegiatan",
  },
  {
    id: 4,
    judul: "Lomba 17 Agustus Antar Kelas",
    tanggal: "15 Agustus 2026",
    waktu: "08:00 WIB",
    lokasi: "Lingkungan Sekolah",
    tipe: "Lomba",
  },
  {
    id: 5,
    judul: "Peringatan Hari Pendidikan Nasional",
    tanggal: "2 Mei 2026",
    waktu: "07:30 WIB",
    lokasi: "Lapangan Utama",
    tipe: "Upacara",
  },
];

export const prestasi = [
  {
    id: 1,
    judul: "Juara 1 LKS Web Technology",
    tingkat: "Kabupaten",
    tahun: "2026",
    peserta: "Ahmad Fauzan Rizky",
    icon: "🥇",
  },
  {
    id: 2,
    judul: "Juara 2 Lomba Debat Bahasa Inggris",
    tingkat: "Provinsi",
    tahun: "2026",
    peserta: "Tim Debat OSIS",
    icon: "🥈",
  },
  {
    id: 3,
    judul: "Juara 1 Futsal Antar SMK",
    tingkat: "Kabupaten",
    tahun: "2025",
    peserta: "Tim Futsal OSIS",
    icon: "🥇",
  },
  {
    id: 4,
    judul: "Juara 3 Lomba Karya Tulis Ilmiah",
    tingkat: "Provinsi",
    tahun: "2025",
    peserta: "Dewi Anggraini",
    icon: "🥉",
  },
  {
    id: 5,
    judul: "Juara 1 Lomba Poster Digital",
    tingkat: "Kabupaten",
    tahun: "2026",
    peserta: "Lestari Putri",
    icon: "🥇",
  },
  {
    id: 6,
    judul: "Juara 2 Pencak Silat",
    tingkat: "Provinsi",
    tahun: "2025",
    peserta: "Budi Santoso",
    icon: "🥈",
  },
];

export const galeri = [
  { id: 1, judul: "Upacara Pelantikan OSIS", kategori: "Kegiatan", color: "from-blue-500 to-blue-700" },
  { id: 2, judul: "PORSENI 2025", kategori: "Lomba", color: "from-amber-500 to-orange-600" },
  { id: 3, judul: "Bakti Sosial", kategori: "Kegiatan", color: "from-emerald-500 to-teal-600" },
  { id: 4, judul: "Workshop Leadership", kategori: "Kegiatan", color: "from-purple-500 to-indigo-600" },
  { id: 5, judul: "Lomba 17 Agustus", kategori: "Lomba", color: "from-red-500 to-rose-600" },
  { id: 6, judul: "Upacara Hari Guru", kategori: "Upacara", color: "from-cyan-500 to-blue-600" },
  { id: 7, judul: "Pentas Seni", kategori: "Kegiatan", color: "from-pink-500 to-fuchsia-600" },
  { id: 8, judul: "Pekan Literasi", kategori: "Kegiatan", color: "from-teal-500 to-emerald-600" },
];

export const ekstrakurikuler = [
  {
    id: 1,
    nama: "Pramuka",
    deskripsi: "Kegiatan kepanduan untuk melatih kemandirian, kedisiplinan, dan jiwa kepemimpinan siswa.",
    anggota: 120,
    jadwal: "Jumat, 14:00 - 16:00",
    icon: "⛺",
  },
  {
    id: 2,
    nama: "Paskibra",
    deskripsi: "Pasukan pengibar bendera yang melatih kedisiplinan, ketangguhan, dan semangat nasionalisme.",
    anggota: 40,
    jadwal: "Rabu, 14:00 - 16:00",
    icon: "🎖️",
  },
  {
    id: 3,
    nama: "Futsal",
    deskripsi: "Olahraga futsal untuk meningkatkan kebugaran dan sportivitas siswa.",
    anggota: 30,
    jadwal: "Selasa & Kamis, 15:00 - 17:00",
    icon: "⚽",
  },
  {
    id: 4,
    nama: "English Club",
    deskripsi: "Klub bahasa Inggris untuk meningkatkan kemampuan berbahasa dan percaya diri.",
    anggota: 25,
    jadwal: "Senin, 14:00 - 15:30",
    icon: "🌍",
  },
  {
    id: 5,
    nama: "Seni Tari",
    deskripsi: "Seni tari tradisional dan modern untuk melestarikan budaya dan mengasah kreativitas.",
    anggota: 20,
    jadwal: "Sabtu, 09:00 - 11:00",
    icon: "💃",
  },
  {
    id: 6,
    nama: "Robotika",
    deskripsi: "Eksplorasi teknologi robotik dan pemrograman untuk mengembangkan daya cipta siswa.",
    anggota: 15,
    jadwal: "Rabu, 14:00 - 16:00",
    icon: "🤖",
  },
  {
    id: 7,
    nama: "PMR",
    deskripsi: "Palang Merah Remaja untuk melatih pertolongan pertama dan kepedulian sosial.",
    anggota: 35,
    jadwal: "Jumat, 14:00 - 16:00",
    icon: "🏥",
  },
  {
    id: 8,
    nama: "Jurnalistik",
    deskripsi: "Pelatihan menulis, fotografi, dan media untuk menyalurkan bakat di bidang komunikasi.",
    anggota: 18,
    jadwal: "Kamis, 14:00 - 15:30",
    icon: "📰",
  },
];

export const kontakInfo = {
  alamat: "Jl. Raya Purwareja - Klampok, Banjarnegara, Jawa Tengah 53474",
  telepon: "(0286) 479-123",
  email: "osis@smkhkti2.sch.id",
  website: "www.smkhkti2.sch.id",
  sosialMedia: {
    instagram: "@osis.smkhkti2",
    youtube: "OSIS SMK HKTI 2",
    facebook: "OSIS SMK HKTI 2 Purwareja Klampok",
  },
};
