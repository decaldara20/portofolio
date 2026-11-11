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
  date?: string;
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
  date?: string;
}

function Icon({
  name,
  size = 20,
}: {
  name:
    | "arrow"
    | "check"
    | "copy"
    | "link"
    | "lock"
    | "message"
    | "send"
    | "spark"
    | "shield";
  size?: number;
}) {
  const paths = {
    arrow: <path d="m5 12 14 0m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    message: (
      <>
        <path d="M20 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    send: <path d="m22 2-7 20-4-9-9-4Zm0 0L11 13" />,
    spark: (
      <>
        <path d="m12 3 .8 2.2A6 6 0 0 0 16.5 9l2.2.8-2.2.8a6 6 0 0 0-3.7 3.7L12 16.5l-.8-2.2a6 6 0 0 0-3.7-3.7l-2.2-.8L7.5 9a6 6 0 0 0 3.7-3.8Z" />
        <path d="m19 16 .4 1.1a3 3 0 0 0 1.5 1.5l1.1.4-1.1.4a3 3 0 0 0-1.5 1.5L19 22l-.4-1.1a3 3 0 0 0-1.5-1.5L16 19l1.1-.4a3 3 0 0 0 1.5-1.5Z" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

// ==========================================
// DATA STATIS PORTOFOLIO (MUDAH DIEDIT)
// ==========================================
const PROFILE = {
  nama: "Kunto Rossindu Hidayattullah",
  panggilan: "Kunto",
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
    date: "Februari 2026-Sekarang",
  },
  {
    id: 2,
    deskripsi: "Steering Committee PINGFEST",
    gambar: "/pingfest2026.jpg",
    date: "Mei-November 2026",
  },
  {
    id: 3,
    deskripsi: "CEO Fatisda Student Developer",
    gambar: "/fsd.jpeg",
    date: "Februari 2026-Sekarang",
  },
  {
    id: 4,
    deskripsi: "Steering Committee PKKMB FATISDA UNS",
    gambar: "/pkkmb.jpeg",
    date: "Mei-Agustus 2026",
  },
  {
    id: 5,
    deskripsi: "Menteri Bisnis dan Kemitraan BEM FATISDA UNS",
    gambar: "/bem-2025.jpeg",
    date: "Februari-Desember 2025",
  },
  {
    id: 6,
    deskripsi: "Staff Fundraising PINGFEST",
    gambar: "/pingfest25.jpg",
    date: "April-November 2025",
  },
  {
    id: 7,
    deskripsi: "Kunjungan Internal BEM FATISDA x BEM SV UNS",
    gambar: "/bemsv.JPG",
    date: "Maret 2026",
  },
  {
    id: 8,
    deskripsi: "Kunjungan Eksternal BEM FATISDA UNS x HIMAKOM UGM",
    gambar: "/kunex.JPG",
    date: "Juni 2026",
  },
  {
    id: 9,
    deskripsi: "Gardapada BEM FATISDA UNS",
    gambar: "/gardapada.JPG",
    date: "Februari 2026-Sekarang",
  },
  {
    id: 10,
    deskripsi: "Rapat Kerja BEM FATISDA UNS",
    gambar: "/raker.JPG",
    date: "Maret 2026",
  },
  {
    id: 11,
    deskripsi: "Buka Bersama BEM FATISDA UNS",
    gambar: "/bukber.JPG",
    date: "Februari 2026",
  },
  {
    id: 12,
    deskripsi: "Kakak Asuh BEM FATISDA UNS",
    gambar: "/kasuh.jpeg",
    date: "September-Oktober 2026",
  },
  {
    id: 13,
    deskripsi: "Sosialisasi BEM FATISDA di PKKMB FATISDA UNS",
    gambar: "/sosialisasi.JPG",
    date: "Agustus 2026",
  },
  {
    id: 14,
    deskripsi: "Kunjungan Internal BEM FATISDA x Himakesja UNS",
    gambar: "/kunin25.jpg",
    date: "Mei 2025",
  },
  {
    id: 15,
    deskripsi: "Staff Konsumsi PKKMB FATISDA UNS",
    gambar: "/pkkmb25.jpg",
    date: "Mei-Agustus 2025",
  },
  {
    id: 16,
    deskripsi: "Kunjungan Eksternal BEM FATISDA UNS x HMIF UII",
    gambar: "/kunex25.jpg",
    date: "November 2025",
  }
];

const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    nama: "Menteri Bisnis dan Kemitraan BEM FATISDA UNS 2025",
    kategori: "Organization",
    deskripsi:
      "Kepala divisi yang bertanggung jawab atas pengembangan kemitraan strategis dan inisiatif bisnis untuk mendukung keberlanjutan organisasi BEM FATISDA UNS 2025.",
    skills: ["Leadership", "Strategic Planning", "Partnership Development"],
    date: "Februari-Desember 2025",
  },
  {
    id: 2,
    nama: "Staff Fundraising P!NGFEST 2025",
    kategori: "Organization",
    deskripsi:
      "Anggota tim yang berfokus pada penggalangan dana untuk mendukung kesuksesan acara P!NGFEST 2025.",
    skills: ["Fundraising", "Team Collaboration"],
    date: "April-November 2025",
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
    date: "Februari 2026-Sekarang",
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
    date: "Mei-November 2026",
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
    date: "Januari 2026-Sekarang",
  },
  {
    id: 6,
    nama: "Praktik Kerja Lapangan di CNC Computer",
    kategori: "Course Project",
    deskripsi:
      "Praktik kerja lapangan yang berfokus pada pengembangan keterampilan teknis dan manajerial di bidang teknologi informasi, termasuk pengelolaan proyek, analisis sistem, dan implementasi perbaikan berbagai perangkat komputer.",
    skills: ["Technical Skills", "Problem Solving", "Team Collaboration"],
    date: "September-Desember 2022",
  },
  {
    id: 7,
    nama: "Artikel Infrastruktur dan Platform Big Data",
    kategori: "Course Project",
    deskripsi:
      "Artikel yang membahas secara mendalam tentang infrastruktur dan platform big data, termasuk arsitektur, teknologi, dan praktik terbaik dalam pengelolaan serta analisis data skala besar.",
    skills: ["Research", "Technical Writing", "Data Analysis"],
    date: "Maret 2026",
    link: "https://artikel-ipbd.vercel.app/",
  },
  {
    id: 8,
    nama: "Artikel Review Jurnal Keamanan Data dengan Autentikasi JWT",
    kategori: "Course Project",
    deskripsi:
      "Artikel yang membahas secara mendalam tentang keamanan data dengan fokus pada implementasi autentikasi menggunakan JSON Web Tokens (JWT), termasuk analisis risiko, praktik terbaik, dan studi kasus.",
    skills: ["Research", "Technical Writing", "Data Security"],
    date: "April 2026",
    link: "https://reviewpaperkeamanandata.vercel.app/",
  },
  {
    id: 9,
    nama: "Asisten Praktikum Mata Kuliah Jaringan Komputer Prodi Informatika 2026",
    kategori: "Academic Experience",
    deskripsi:
      "Asisten praktikum yang membantu dalam pelaksanaan praktikum mata kuliah Jaringan Komputer Informatika 2026, termasuk persiapan materi, bimbingan praktikum, dan evaluasi hasil praktikum.",
    skills: ["Teaching", "Communication", "Technical Skills"],
    date: "Maret-Juni 2026",
  },
  {
    id: 10,
    nama: "Asisten Praktikum Mata Kuliah Perancangan dan Implementasi Basis Data Prodi Sains Data 2026",
    kategori: "Academic Experience",
    deskripsi:
      "Asisten praktikum yang membantu dalam pelaksanaan praktikum mata kuliah Perancangan dan Implementasi Basis Data Sains Data 2026, termasuk persiapan materi, bimbingan praktikum, dan evaluasi hasil praktikum.",
    skills: ["Teaching", "Communication", "Technical Skills"],
    date: "Mei-Juni 2026",
  },
  {
    id: 11,
    nama: "Asisten Praktikum Mata Kuliah Jaringan Komputer Prodi Sains Data 2026",
    kategori: "Academic Experience",
    deskripsi:
      "Asisten praktikum yang membantu dalam pelaksanaan praktikum mata kuliah Jaringan Komputer Prodi Sains Data 2026, termasuk persiapan materi, bimbingan praktikum, dan evaluasi hasil praktikum.",
    skills: ["Teaching", "Communication", "Technical Skills"],
    date: "September 2026-Sekarang",
  },
  {
    id: 12,
    nama: "Sistem Autentikasi Dinamis JWT(HS256) Berbasis Fuzzy Logic & Zero-Trust",
    kategori: "Course Project",
    deskripsi:
      "Sistem autentikasi dinamis yang menggunakan JSON Web Tokens (JWT) dengan algoritma HS256, dikembangkan berdasarkan logika fuzzy dan prinsip zero-trust.",
    skills: ["Security", "Programming", "Research", "Web Development"],
    date: "April 2026",
    link: "https://kda-2-b.vercel.app/",
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

      {/* Navigation (Floating Glass Island Navbar) */}
      <header className="sticky top-3 sm:top-5 z-50 w-full px-4 sm:px-6 pointer-events-none">
        <nav
          aria-label="Navigasi Utama"
          className="max-w-6xl mx-auto rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-md border-2 border-primary/10 shadow-[0_8px_30px_rgba(16,31,10,0.06)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 pointer-events-auto transition-all duration-300 hover:border-accent/50"
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group shrink-0 select-none"
          >
          <div className="w-8 h-8 rounded-xl sm:rounded-full bg-primary text-background flex items-center justify-center overflow-hidden shadow-xs border border-primary/10 group-hover:border-accent transition-all duration-300">
              <img src="./profile.jpg" alt="Profil" className="w-full h-full object-cover rounded-xl border" />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-primary whitespace-nowrap">
              {PROFILE.panggilan}
              <span className="text-primary group-hover:text-accent transition-colors">
                .Rossindu
              </span>
            </span>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <a
              href="#projects"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-primary/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              Experience
            </a>
            <a
              href="#about"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-primary/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              Tentang Saya
            </a>

            {/* Badge Khusus "Kirim Pesan" */}
            <a
              href="/ngl"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/40 text-xs font-bold text-primary hover:bg-accent hover:border-accent transition-all duration-200"
            >
              <span>Kirim Pesan</span>
              <svg
                className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </a>

            {/* CTA Button "Hubungi Saya" */}
            <a
              href={`mailto:${PROFILE.email}`}
              className="ml-2 inline-flex items-center justify-center bg-primary hover:bg-accent text-background hover:text-primary px-4 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-[0_4px_16px_rgba(98,184,242,0.4)] transition-all duration-200 active:scale-95"
            >
              Hubungi Saya
            </a>
          </div>

          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-colors cursor-pointer"
            aria-label="Toggle Menu Navigasi"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Panel Menu Lipat Khusus Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl bg-white/95 backdrop-blur-md border-2 border-primary/10 p-3 space-y-1.5 shadow-xl pointer-events-auto">
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-primary hover:bg-primary/5 transition-colors"
            >
              Experience
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-primary hover:bg-primary/5 transition-colors"
            >
              Tentang Saya
            </a>
            <a
              href="/ngl"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-accent/15 text-primary border border-accent/30"
            >
              <span>Kirim Pesan</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-primary text-background hover:bg-accent hover:text-primary py-2.5 rounded-xl text-xs font-bold transition-all mt-1"
            >
              Hubungi Saya
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden py-10 sm:py-20 lg:py-24 px-4 sm:px-6">
        {/* Dekorasi Latar Belakang SaaS */}
        <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Kolom Kiri: Teks Utama */}
          <Reveal className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-accent text-primary text-[11px] sm:text-xs font-semibold mb-5 max-w-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="truncate">{PROFILE.status}</span>
            </div>

            <h1 className="inline-block px-4 py-2 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-background rounded-2xl bg-primary hover:text-primary hover:bg-background/25 leading-tight mb-4 sm:mb-6 transition-colors">
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
      <section className="relative z-10 py-14 sm:py-20 overflow-hidden">
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
                        {item.date}
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
        className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 bg-transparent"
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
                            {(project.date) && (
                              <span className="text-[11px] font-mono font-semibold text-primary hover:text-accent bg-background/20 px-2.5 py-1 rounded-md border border-second">
                                {project.date ? `${project.date} ` : ""}
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

      {/* Footer Rapi dengan Ikon SVG Seragam */}
      <footer className="relative z-10 w-full text-background mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Kiri: Identitas & Hak Cipta */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div>
              <p className="font-bold text-sm sm:text-base text-primary hover:text-accent leading-tight">
                {PROFILE.nama}
              </p>
              <p className="text-primary/60 text-xs mt-0.5">
                © {new Date().getFullYear()} Data Science Universitas Sebelas Maret.
              </p>
            </div>
          </div>

          {/* Kanan: Tombol Sosial Media SVG yang Rapi & Kontras */}
          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-primary hover:bg-accent text-background hover:text-primary border border-white/15 hover:border-accent flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-primary hover:bg-accent text-background hover:text-primary border border-white/15 hover:border-accent flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-primary hover:bg-accent text-background hover:text-primary border border-white/15 hover:border-accent flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="w-9 h-9 rounded-xl bg-primary hover:bg-accent text-background hover:text-primary border border-white/15 hover:border-accent flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}