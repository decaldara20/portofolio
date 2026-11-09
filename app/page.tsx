"use client";

import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import Reveal from "./Reveal";

interface Project {
  id: number;
  nama: string;
  kategori:
    | "Organization"
    | "Course Project"
    | "Personal Project"
    | "Organization Project"
    | "Academic Experience";
  deskripsi: string;
  skills: string[];
  notes: string;
  year?: number;
  link?: string;
}

interface EducationItem {
  jenjang: string;
  namaSekolah: string;
  tahunLulus: number | "-";
}

interface DokumentasiItem {
  id: number;
  deskripsi: string;
  gambar: string;
  year?: number;
}

// ==========================================
// DATA STATIS PORTOFOLIO (MUDAH DIEDIT)
// ==========================================
const PROFILE = {
  nama: "Kunto Rossindu Hidayattullah",
  panggilan: "kunto",
  role: "Presiden BEM FATISDA UNS 2026",
  status: "Deep learning into Data Science & Student Leadership.",
  bioSingkat:
    "Saya adalah seorang mahasiswa Data Science di Universitas Sebelas Maret yang memiliki minat mendalam pada integrasi pengembangan perangkat lunak, analitik data, dan kepemimpinan organisasi. Sebagai Presiden BEM FATISDA UNS 2026, saya mengasah kemampuan manajemen tim, perencanaan strategis, dan pengambilan keputusan berbasis data (data-driven decision making)",
  instagramUrl: "https://www.instagram.com/kunto_rossindu?cplk=MWgzYnc3bDV1OWJx",
  githubUrl: "https://github.com/decaldara20/",
  linkedinUrl: "https://linkedin.com/in/kuntohidayat",
  email: "kuntohidayat20@gmail.com",
};

const education: EducationItem[] = [
  {
    jenjang: "Sekolah Dasar",
    namaSekolah: "SD Negeri 01 Bendosari",
    tahunLulus: 2017,
  },
  {
    jenjang: "Sekolah Menengah Pertama",
    namaSekolah: "SMP Negeri 01 Sukoharjo",
    tahunLulus: 2020,
  },
  {
    jenjang: "Sekolah Menengah Kejuruan",
    namaSekolah: "SMK Negeri 01 Sukoharjo",
    tahunLulus: 2023,
  },
  {
    jenjang: "Perguruan Tinggi",
    namaSekolah: "Universitas Sebelas Maret (UNS)",
    tahunLulus: "-",
  },
];

const dokumentasi: DokumentasiItem[] = [
  {
    id: 1,
    deskripsi: "Presiden BEM FATISDA UNS",
    gambar: "/b.jpeg",
    year: 2026,
  },
  {
    id: 2,
    deskripsi: "Steering Committee PINGFEST",
    gambar: "/pingfest2026.jpg",
    year: 2026,
  },
  {
    id: 3,
    deskripsi: "Fatisda Student Developer",
    gambar: "/fsd.jpeg",
    year: 2026,
  },
  {
    id: 4,
    deskripsi: "PKKMB FATISDA UNS",
    gambar: "/pkkmb.jpeg",
    year: 2026,
  },
  {
    id: 5,
    deskripsi: "Menteri Bisnis dan Kemitraan BEM FATISDA UNS",
    gambar: "/bem-2025.jpg",
    year: 2025,
  },
  {
    id: 6,
    deskripsi: "PINGFEST",
    gambar: "/pingfest25.jpg",
    year: 2025,
  },
  {
    id: 7,
    deskripsi: "Kunjungan Internal BEM FATISDA x BEM SV",
    gambar: "/bemsv.JPG",
    year: 2026,
  },
  {
    id: 8,
    deskripsi: "Kunjungan Eksternal BEM FATISDA x HIMAKOM UGM",
    gambar: "/kunex.JPG",
    year: 2026,
  },
  {
    id: 9,
    deskripsi: "Gardapada BEM FATISDA UNS",
    gambar: "/gardapada.JPG",
    year: 2026,
  },
  {
    id: 10,
    deskripsi: "Rapat Kerja BEM FATISDA UNS",
    gambar: "/raker.JPG",
    year: 2026,
  },
  {
    id: 11,
    deskripsi: "Buka Bersama BEM FATISDA UNS",
    gambar: "/bukber.JPG",
    year: 2026,
  },
];

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    nama: "Menteri Bisnis dan Kemitraan BEM FATISDA UNS 2025",
    kategori: "Organization",
    deskripsi:
      "Kepala divisi yang bertanggung jawab atas pengembangan kemitraan strategis dan inisiatif bisnis untuk mendukung keberlanjutan organisasi BEM FATISDA UNS 2025.",
    skills: ["Leadership", "Strategic Planning", "Partnership Development"],
    notes: "Succeed",
    year: 2025,
  },
  {
    id: 2,
    nama: "Staff Fundraising P!NGFEST 2025",
    kategori: "Organization",
    deskripsi:
      "Anggota tim yang berfokus pada penggalangan dana untuk mendukung kesuksesan acara P!NGFEST 2025.",
    skills: ["Fundraising", "Team Collaboration"],
    notes: "Succeed",
    year: 2025,
  },
  {
    id: 3,
    nama: "Presiden BEM FATISDA UNS 2026",
    kategori: "Organization",
    deskripsi:
      "Pemimpin tertinggi organisasi yang bertanggung jawab penuh atas arah strategis, kebijakan eksekutif, dan keberlangsungan operasional BEM FATISDA UNS 2026. Dalam menjalankan roda organisasi yang bertindak sebagai integrator utama yang mengoordinasikan 7 Kementerian Koordinator spesifik. Peran ini menuntut kemampuan manajemen tingkat tinggi untuk menyelaraskan berbagai fokus bidang, mulai dari internal kampus, pengembangan minat bakat, aksi pergerakan, hingga pengabdian masyarakat, guna melahirkan inovasi dan solusi nyata yang inklusif bagi seluruh civitas akademika FATISDA UNS.",
    skills: [
      "Leadership",
      "Strategic Planning",
      "Public Speaking",
      "Team Management",
      "Communication",
      "Problem Solving",
      "Decision Making",
      "Innovation",
      "Collaboration",
      "Project Management",
    ],
    notes: "On going",
    year: 2026,
  },
  {
    id: 4,
    nama: "Steering Committee P!NGFEST 2026",
    kategori: "Organization",
    deskripsi:
      "Penanggung jawab tertinggi atas perencanaan strategis dan pengawasan keseluruhan acara P!NGFEST 2026, memastikan kesuksesan dan kelancaran pelaksanaan acara dari awal hingga akhir.",
    skills: [
      "Leadership",
      "Strategic Planning",
      "Public Speaking",
      "Team Management",
      "Communication",
      "Problem Solving",
      "Decision Making",
    ],
    notes: "On going",
    year: 2026,
  },
  {
    id: 5,
    nama: "Chief Executive Officer (CEO) Fatisda Student Developer",
    kategori: "Organization Project",
    deskripsi:
      "Pemimpin eksekutif yang bertanggung jawab atas visi, strategi, dan operasional keseluruhan Fatisda Student Developer. Memastikan pertumbuhan berkelanjutan, inovasi dalam pengembangan teknologi, dan siap melayani kebutuhan client.",
    skills: [
      "Leadership",
      "Strategic Planning",
      "Business Development",
      "Team Management",
      "Communication",
      "Problem Solving",
      "Decision Making",
      "Innovation",
    ],
    notes: "On going",
    year: 2026,
  },
  {
    id: 6,
    nama: "Praktik Kerja Lapangan di CNC Computer",
    kategori: "Course Project",
    deskripsi:
      "Praktik kerja lapangan yang berfokus pada pengembangan keterampilan teknis dan manajerial di bidang teknologi informasi, termasuk pengelolaan proyek, analisis sistem, dan implementasi perbaikan berbagai perangkat komputer.",
    skills: ["Technical Skills", "Problem Solving", "Team Collaboration"],
    notes: "Succeed",
    year: 2022,
  },
  {
    id: 7,
    nama: "Artikel Infrastruktur dan Platform Big Data",
    kategori: "Course Project",
    deskripsi:
      "Artikel yang membahas secara mendalam tentang infrastruktur dan platform big data, termasuk arsitektur, teknologi, dan praktik terbaik dalam pengelolaan serta analisis data skala besar.",
    skills: ["Research", "Technical Writing", "Data Analysis"],
    notes: "Succeed",
    year: 2026,
    link: "https://artikel-ipbd.vercel.app/",
  },
  {
    id: 8,
    nama: "Artikel Review Jurnal Keamanan Data dengan Autentikasi JWT",
    kategori: "Course Project",
    deskripsi:
      "Artikel yang membahas secara mendalam tentang keamanan data dengan fokus pada implementasi autentikasi menggunakan JSON Web Tokens (JWT), termasuk analisis risiko, praktik terbaik, dan studi kasus.",
    skills: ["Research", "Technical Writing", "Data Security"],
    notes: "Succeed",
    year: 2026,
    link: "https://reviewpaperkeamanandata.vercel.app/",
  },
  {
    id: 9,
    nama: "Asisten Praktikum Mata Kuliah Jaringan Komputer Prodi Informatika 2026",
    kategori: "Academic Experience",
    deskripsi:
      "Asisten praktikum yang membantu dalam pelaksanaan praktikum mata kuliah Jaringan Komputer Informatika 2026, termasuk persiapan materi, bimbingan praktikum, dan evaluasi hasil praktikum.",
    skills: ["Teaching", "Communication", "Technical Skills"],
    notes: "Succeed",
    year: 2026,
  },
  {
    id: 10,
    nama: "Asisten Praktikum Mata Kuliah Perancangan dan Implementasi Basis Data Prodi Sains Data 2026",
    kategori: "Academic Experience",
    deskripsi:
      "Asisten praktikum yang membantu dalam pelaksanaan praktikum mata kuliah Perancangan dan Implementasi Basis Data Sains Data 2026, termasuk persiapan materi, bimbingan praktikum, dan evaluasi hasil praktikum.",
    skills: ["Teaching", "Communication", "Technical Skills"],
    notes: "Succeed",
    year: 2026,
  },
  {
    id: 11,
    nama: "Asisten Praktikum Mata Kuliah Jaringan Komputer Prodi Sains Data 2026",
    kategori: "Academic Experience",
    deskripsi:
      "Asisten praktikum yang membantu dalam pelaksanaan praktikum mata kuliah Jaringan Komputer Prodi Sains Data 2026, termasuk persiapan materi, bimbingan praktikum, dan evaluasi hasil praktikum.",
    skills: ["Teaching", "Communication", "Technical Skills"],
    notes: "Succeed",
    year: 2026,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const categories = [
    "Semua",
    "Organization",
    "Course Project",
    "Personal Project",
    "Organization Project",
    "Academic Experience",
  ];

  // 1. Filter berdasarkan kategori dari dropdown
  const filteredByCategory =
    selectedCategory === "Semua"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((item) => item.kategori === selectedCategory);

  // 2. Batasi hanya 3 proyek di awal jika tombol "Lihat Pengalaman Saya" belum diklik
  const displayedProjects = showAll
    ? filteredByCategory
    : filteredByCategory.slice(0, 3);

  return (
    <div className="min-h-screen bg-transparent text-primary flex flex-col relative isolate overflow-x-hidden">
      {/* Background Animasi Scroll-Triggered Scrollytelling */}
      <AnimatedBackground />

      {/* Navigation (Responsif Mobile & Desktop) */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-primary border-b border-second">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-accent text-primary flex items-center justify-center font-mono font-bold text-sm shadow-sm group-hover:bg-second group-hover:text-primary transition-colors">
              {"kunto".charAt(0).toUpperCase()}
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-background whitespace-nowrap">
              {PROFILE.panggilan}
              <span className="text-accent hover:text-second">.portofolio</span>
            </span>
          </a>

          {/* Menu Desktop (Tampil di layar >= 768px) */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-background">
            <li>
              <a
                href="/ngl"
                className="group inline-flex items-center gap-1.5 hover:text-second transition-colors whitespace-nowrap"
              >
                <span>Kirim Pesan</span>
                {/* Ikon Pesan Masuk dengan Animasi Bounce Halus */}
                <span className="relative flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-accent group-hover:text-second animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-second transition-colors whitespace-nowrap"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-second transition-colors whitespace-nowrap"
              >
                Tentang Saya
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="bg-background hover:bg-accent text-primary hover:text-background px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm whitespace-nowrap"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>

          {/* Tombol Hamburger Mobile (Tampil di layar HP < 768px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-primary bg-background hover:bg-primary/5 border border-primary/10 transition-colors cursor-pointer"
            aria-label="Toggle Menu Navigasi"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Panel Menu Lipat khusus Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 bg-background/95 backdrop-blur-md px-4 pt-3 pb-4 space-y-2 shadow-lg">
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              Experience
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
            >
              Tentang Saya
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-primary hover:bg-accent text-background hover:text-primary px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm mt-2"
            >
              Hubungi Saya
            </a>
            <a
              href="/ngl"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center bg-primary hover:bg-accent text-background hover:text-primary px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm mt-2"
            >
              <span>Kirim Pesan</span>
              <svg
                className="w-4 h-4 text-accent animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-10 sm:py-20 lg:py-24 px-4 sm:px-6 border-b border-primary/10">
        {/* Dekorasi Latar Belakang SaaS */}
        <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Kolom Kiri: Teks Utama */}
          <Reveal className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-accent text-primary text-[11px] sm:text-xs font-semibold mb-5 max-w-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="truncate">{PROFILE.status}</span>
            </div>

            <h1 className="inline-block px-4 py-2 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-background rounded-2xl bg-primary hover:text-second leading-tight mb-4 sm:mb-6 transition-colors">
              Kunto Rossindu H.
            </h1>

            <p className="text-sm sm:text-lg text-primary/75 leading-relaxed mb-7 sm:mb-8 max-w-2xl">
              {PROFILE.bioSingkat}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#projects"
                onClick={() => setShowAll(true)}
                className="bg-primary hover:bg-accent text-background hover:text-primary px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/15 transition transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                <span>Lihat Pengalaman Saya</span>
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Kolom Kanan: Bingkai Foto Formal Modern SaaS */}
          <Reveal
            delay={180}
            className="lg:col-span-5 flex justify-center lg:justify-end mt-2 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm">
              {/* Dekorasi Aksen Belakang */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary via-second/40 to-transparent opacity-60 blur-lg pointer-events-none" />
              <div className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-full h-full rounded-2xl border-2 border-second/40 pointer-events-none" />

              {/* Kontainer Utama Foto */}
              <div className="relative bg-primary rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-second overflow-hidden group">
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-primary">
                  <img
                    src="/kun.jpg"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith("/kunto.jpeg")) {
                        target.src = "/kunto.jpeg";
                      }
                    }}
                    alt={`${PROFILE.nama} Formal Portrait`}
                    className="w-full h-full object-cover object-top group-hover:scale-150 transition-transform duration-500"
                  />

                  {/* Gradasi Halus di Bagian Bawah Foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-90" />

                  {/* Panel Identitas di Atas Foto */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-primary/90 backdrop-blur-md border border-background/15 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-lg">
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-mono text-second uppercase tracking-wider truncate">
                        {PROFILE.role}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-background mt-0.5 truncate">
                        {PROFILE.nama}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dokumentasi Section */}
      <section className="relative z-10 py-14 sm:py-20 bg-background border-t border-second overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header & Navigasi Tombol Geser */}
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-white border border-primary/15 px-3.5 py-1.5 rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Dokumentasi
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-primary mt-3">
                  Gallery
                </h2>
              </div>

              {/* Tombol Navigasi Kiri & Kanan (Desktop & Tablet) */}
              <div className="hidden sm:flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("doc-slider");
                    el?.scrollBy({ left: -340, behavior: "smooth" });
                  }}
                  aria-label="Geser ke kiri"
                  className="p-2.5 rounded-xl bg-primary hover:bg-accent text-background hover:text-primary border border-primary hover:border-accent shadow-sm transition-all duration-300 cursor-pointer active:scale-90"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("doc-slider");
                    el?.scrollBy({ left: 340, behavior: "smooth" });
                  }}
                  aria-label="Geser ke kanan"
                  className="p-2.5 rounded-xl bg-primary hover:bg-accent text-background hover:text-primary border border-primary hover:border-accent shadow-sm transition-all duration-300 cursor-pointer active:scale-90"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Area Slider dengan Animasi Timbul */}
          <Reveal delay={150}>
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div
                id="doc-slider"
                className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {dokumentasi.map((item, index) => (
                  <div
                    key={index}
                    className="snap-start shrink-0 w-[260px] sm:w-[330px] rounded-2xl bg-white/85 backdrop-blur-md border-2 border-primary/10 hover:border-accent shadow-md hover:shadow-[0_16px_36px_-10px_rgba(98,184,242,0.4)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out overflow-hidden group flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Top Bar Aksen Gradient */}
                      <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-second" />

                      {/* Wrapper Gambar dengan Efek Zoom + Rotasi Mikro */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary/5">
                        <img
                          src={item.gambar}
                          alt={item.deskripsi}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Lapisan Gradient Gelap Halus */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-70 group-hover:opacity-20 transition-opacity duration-300" />
                      </div>

                      {/* Keterangan Teks */}
                      <div className="p-4 sm:p-5 pb-2">
                        <p className="font-sans font-extrabold text-center text-primary group-hover:text-accent text-sm sm:text-base line-clamp-2 transition-colors duration-300 leading-snug">
                          {item.deskripsi}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1">
                      <p className="text-xs font-mono font-semibold text-center text-primary/60 group-hover:text-primary transition-colors duration-300">
                        {item.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Petunjuk Swipe di Mobile */}
            <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4 text-[11px] font-mono text-primary/60">
              <span>&larr; Geser untuk melihat foto &rarr;</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 bg-transparent border-t border-primary/10"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-5">
              <div>
                {/* Badge bergaya pill putih selaras dengan Hero Section */}
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-white border border-primary/15 px-3.5 py-1.5 rounded-full shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Portofolio
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-primary mt-3">
                  Pengalaman &amp; Proyek
                </h2>
              </div>

              {/* Dropdown Filter Kategori */}
              <div className="relative w-full sm:w-64 group/dropdown">
                <label
                  htmlFor="category-select"
                  className="block text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/70 mb-1.5 transition-colors duration-300 group-hover/dropdown:text-primary"
                >
                  Filter Kategori
                </label>
                <div className="relative transition-transform duration-300 active:scale-95">
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setShowAll(false);
                    }}
                    className="w-full appearance-none bg-primary text-background font-semibold text-sm px-4 py-3 pr-10 rounded-xl border-2 border-primary shadow-md hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(98,184,242,0.45)] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-300 cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-primary text-background font-medium py-1"
                      >
                        {cat === "Semua" ? "Semua Kategori" : cat}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-accent group-hover/dropdown:text-second group-hover/dropdown:rotate-12 transition-all duration-300">
                    <svg
                      className="w-4 h-4 transform transition-transform duration-300 group-hover/dropdown:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Projects Grid */}
          {displayedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {displayedProjects.map((project, index) => (
                  <Reveal
                    key={project.id}
                    delay={(index % 3) * 120}
                    className="h-full"
                  >
                    <div className="h-full group bg-white/85 backdrop-blur-md border-2 border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(98,184,242,0.4)] hover:border-accent hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        {/* Top Accent Bar */}
                        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-second" />

                        <div className="p-5 sm:p-6">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="text-xs font-bold text-primary bg-accent/20 px-2.5 py-1 rounded-md border border-accent/40">
                              {project.kategori}
                            </span>
                            {(project.year || project.notes) && (
                              <span className="text-[11px] font-mono font-semibold text-foreground/70 bg-primary/5 px-2.5 py-1 rounded-md border border-primary/10">
                                {project.year ? `${project.year} ` : ""}
                                {project.notes || ""}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                            {project.nama}
                          </h3>

                          <p className="text-foreground/80 text-sm leading-relaxed mb-5 sm:mb-6">
                            {project.deskripsi}
                          </p>

                          {/* Skills */}
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/45 mb-2">
                              Skills
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.skills.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="bg-primary text-background text-xs font-medium px-2.5 py-1 rounded-md border border-primary group-hover:border-accent/50 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Link Proyek */}
                          {project.link && (
                            <div className="mt-5 pt-4 border-t border-primary/10">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-accent transition-colors"
                              >
                                <span>Lihat Proyek / Artikel</span>
                                <svg
                                  className="w-4 h-4 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Tombol Toggle Lihat Semua */}
              {filteredByCategory.length > 3 && (
                <Reveal delay={200} className="mt-8 sm:mt-10 text-center">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-accent text-background hover:text-primary border-2 border-primary hover:border-accent px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-[0_8px_20px_-6px_rgba(98,184,242,0.5)] transition-all duration-300 cursor-pointer"
                  >
                    <span>
                      {showAll
                        ? "Tampilkan Lebih Sedikit"
                        : `Lihat Semua Pengalaman (${filteredByCategory.length})`}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        showAll ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </Reveal>
              )}
            </>
          ) : (
            <Reveal>
              <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-primary/20 rounded-2xl p-8 sm:p-12 text-center">
                <p className="text-primary font-semibold mb-1 text-sm sm:text-base">
                  Belum ada proyek di kategori &quot;{selectedCategory}&quot;
                </p>
                <p className="text-foreground/60 text-xs sm:text-sm">
                  Proyek baru untuk kategori ini sedang dalam tahap perancangan.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* About Section (Bento Grid Style) */}
      <section
        id="about"
        className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 bg-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-white border border-primary/15 px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Kenalan Lebih Dekat
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary mt-3">
              Di Balik Layar
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento 1: Bio */}
            <Reveal delay={100} className="md:col-span-2 h-full">
              <div className="h-full bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border-2 border-primary/10 shadow-sm flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                  Filosofi Kerja Saya
                </h3>
                <div className="text-primary/75 leading-relaxed text-sm sm:text-base space-y-4">
                  <p>
                    Sebagai seorang pemimpin yang adaptif dan berani mengambil
                    keputusan strategis di tengah ketidakpastian, saya memadukan
                    pendekatan terstruktur dengan empati mendalam untuk membawa
                    dampak positif. Lewat manajemen tim yang terorganisir dan
                    pengelolaan sumber daya yang efisien, saya menyelaraskan
                    setiap langkah dengan visi bersama sembari tetap memahami
                    perspektif para pemangku kepentingan. Berorientasi penuh
                    pada hasil, kompas profesional saya berfokus pada
                    penghasilan solusi nyata, inovatif, dan berbasis data untuk
                    setiap dinamika organisasi.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bento 2: Profile Photo Card */}
            <Reveal delay={220} className="h-full">
              <div className="h-full bg-white/85 backdrop-blur-md text-background p-3 rounded-2xl shadow-sm flex flex-col justify-between group border-2 border-primary/10">
                <div className="relative w-full h-80 md:h-full min-h-[260px] rounded-xl overflow-hidden bg-primary">
                  <img
                    src="/kunto.jpeg"
                    alt={PROFILE.nama}
                    className="w-full h-full object-cover object-center group-hover:scale-150 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-second block truncate">
                        Presiden BEM FATISDA UNS 2026
                      </span>
                      <p className="text-sm font-bold text-background leading-tight truncate">
                        {PROFILE.nama}
                      </p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/20 shrink-0" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bento 3: Education Background */}
            <Reveal delay={300} className="md:col-span-3">
              <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border-2 border-primary/10 shadow-sm flex flex-col justify-between h-full">
                {/* Bagian Judul */}
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-primary tracking-wide">
                    Education Background
                  </h3>
                  <p className="text-xs text-primary/50 mt-0.5">
                    Perjalanan akademis dan institusi tempat menempuh
                    pendidikan.
                  </p>
                </div>

                {/* Grid Responsif Dinamis */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between p-5 rounded-2xl bg-background/60 backdrop-blur-sm border border-second shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-accent hover:shadow-[0_10px_30px_-10px_rgba(98,184,242,0.25)] hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div>
                        {/* Badge Jenjang */}
                        <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md bg-primary text-background group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                          {edu.jenjang}
                        </span>

                        {/* Nama Sekolah */}
                        <h4 className="text-sm font-sans font-bold text-primary mt-3 line-clamp-2 group-hover:text-accent transition-colors duration-300 min-h-[40px]">
                          {edu.namaSekolah}
                        </h4>
                      </div>

                      {/* Informasi Kelulusan */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/10 text-xs text-primary/60">
                        <span>Lulus</span>
                        <span className="font-mono text-primary font-bold group-hover:text-accent transition-colors">
                          {edu.tahunLulus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-primary text-background py-8 sm:py-10 mt-auto border-t border-second">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-bold text-sm sm:text-base">{PROFILE.nama}</p>
            <p className="text-background/60 text-xs mt-1">
              © {new Date().getFullYear()} Data Science Universitas Sebelas
              Maret.
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium">
            <a
              href={PROFILE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-accent transition-colors"
            >
              <img src="/ig.png" alt="Instagram" className="w-5 h-5" />
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-accent transition-colors"
            >
              <img src="/github.png" alt="GitHub" className="w-5 h-5" />
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-accent transition-colors"
            >
              <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-background/80 hover:text-accent transition-colors"
            >
              <img src="/email.png" alt="Email" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}