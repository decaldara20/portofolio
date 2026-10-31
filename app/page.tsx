"use client";

import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";

interface Project {
  id: number;
  nama: string;
  kategori:
    | "Organization"
    | "Course Project"
    | "Personal Project"
    | "Organization Project";
  deskripsi: string;
  skills: string[];
  notes: string;
  year?: number;
  link?: string;
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
  instagramUrl: "https://www.instagram.com/kunto_rossindu?rpxt=MWgzYnc3bDV1OWJx",
  githubUrl: "https://github.com/decaldara20/",
  linkedinUrl: "https://linkedin.com/in/kuntohidayat",
  email: "kuntohidayat20@gmail.com",
};

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
];

const SKILLS = [
  { nama: "BEM FATISDA 2026", level: "President" },
  { nama: "P!NGFEST 2026", level: "Steering Committee" },
  { nama: "Fatisda Student Developer", level: "CEO" },
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
    <div className="min-h-screen bg-background text-foreground flex flex-col relative isolate overflow-x-hidden">
      {/* Background Animasi Scroll-Triggered Scrollytelling */}
      <AnimatedBackground />

      {/* Navigation (Responsif Mobile & Desktop) */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2">
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary text-background flex items-center justify-center font-mono font-bold text-sm shadow-sm group-hover:bg-accent group-hover:text-primary transition-colors">
              {"kunto".charAt(0).toUpperCase()}
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-primary whitespace-nowrap">
              {PROFILE.panggilan}
              <span className="text-accent">.portofolio</span>
            </span>
          </a>

          {/* Menu Desktop (Tampil di layar >= 768px) */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/75">
            <li>
              <a //tambahkan animasi pesan diunduh disamping tombol ini
                href="/ngl"
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                Kirim Pesan
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-accent transition-colors whitespace-nowrap"
              >
                Tentang Saya
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="bg-primary hover:bg-accent text-background hover:text-primary px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm whitespace-nowrap"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>

          {/* Tombol Hamburger Mobile (Tampil di layar HP < 768px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-primary hover:bg-primary/5 border border-primary/10 transition-colors cursor-pointer"
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
              className="block w-full text-center bg-primary hover:bg-accent text-background hover:text-primary px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm mt-2"
            >
              Kirim Pesan
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
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-primary text-[11px] sm:text-xs font-semibold mb-5 max-w-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="truncate">{PROFILE.status}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight mb-4 sm:mb-6">
              Halo, saya {PROFILE.panggilan}.
            </h1>

            <p className="text-sm sm:text-lg text-foreground/75 leading-relaxed mb-7 sm:mb-8 max-w-2xl">
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
          </div>

          {/* Kolom Kanan: Bingkai Foto Formal Modern SaaS */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              {/* Dekorasi Aksen Belakang */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary via-accent/40 to-transparent opacity-60 blur-lg pointer-events-none" />
              <div className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-full h-full rounded-2xl border-2 border-accent/40 pointer-events-none" />

              {/* Kontainer Utama Foto */}
              <div className="relative bg-background rounded-2xl p-2 sm:p-2.5 shadow-2xl border border-primary/80 overflow-hidden group">
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
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradasi Halus di Bagian Bawah Foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-90" />

                  {/* Panel Identitas di Atas Foto */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-primary/90 backdrop-blur-md border border-background/15 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-lg">
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-mono text-accent uppercase tracking-wider truncate">
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
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-10 py-14 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-accent/15 border border-accent/30 px-3 py-1 rounded-full">
                Portofolio
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-primary mt-3">
                Pengalaman & Proyek
              </h2>
            </div>

            {/* Dropdown Filter Kategori */}
            <div className="relative w-full sm:w-64">
              <label
                htmlFor="category-select"
                className="block text-[11px] font-mono uppercase tracking-wider text-foreground/60 mb-1.5"
              >
                Filter Kategori
              </label>
              <div className="relative">
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setShowAll(false);
                  }}
                  className="w-full appearance-none bg-white text-primary font-semibold text-sm px-4 py-2.5 pr-10 rounded-xl border border-primary/15 shadow-sm hover:border-accent focus:outline-none focus:border-accent transition cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "Semua" ? "Semua Kategori" : cat}
                    </option>
                  ))}
                </select>
                {/* Ikon Panah Dropdown */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-primary">
                  <svg
                    className="w-4 h-4"
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
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {displayedProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {displayedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Accent Bar */}
                      <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-accent/50" />

                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-semibold text-primary bg-accent/15 px-2.5 py-1 rounded-md border border-accent/30">
                            {project.kategori}
                          </span>
                          <span className="text-[11px] font-mono font-medium text-foreground/70 bg-primary/5 px-2.5 py-1 rounded-md">
                            {project.year ? `${project.year} • ` : ""}
                            {project.notes}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2">
                          {project.nama}
                        </h3>

                        <p className="text-foreground/75 text-sm leading-relaxed mb-5 sm:mb-6">
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
                                className="bg-primary/5 text-primary text-xs font-medium px-2.5 py-1 rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Link Proyek (Hanya muncul jika properti link tersedia) */}
                        {project.link && (
                          <div className="mt-5 pt-4 border-t border-primary/10">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors"
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
                ))}
              </div>

              {/* Tombol Toggle Lihat Semua / Lebih Sedikit jika proyek > 3 */}
              {filteredByCategory.length > 3 && (
                <div className="mt-8 sm:mt-10 text-center">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-primary text-primary hover:text-background border border-primary/15 px-6 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer"
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
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border border-dashed border-primary/20 rounded-2xl p-8 sm:p-12 text-center">
              <p className="text-foreground/75 font-medium mb-1 text-sm sm:text-base">
                Belum ada proyek di kategori &quot;{selectedCategory}&quot;
              </p>
              <p className="text-foreground/50 text-xs sm:text-sm">
                Proyek baru untuk kategori ini sedang dalam tahap perancangan.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section (Bento Grid Style) */}
      <section
        id="about"
        className="relative z-10 py-14 sm:py-20 px-4 sm:px-6 bg-primary/5 border-t border-primary/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-background border border-accent/40 px-3 py-1 rounded-full">
              Kenalan Lebih Dekat
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-primary mt-3">
              Di Balik Layar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento 1: Bio */}
            <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-primary/10 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                Filosofi Kerja Saya
              </h3>
              <div className="text-foreground/75 leading-relaxed text-sm sm:text-base space-y-4">
                <p>
                  Sebagai seorang pemimpin yang adaptif dan berani mengambil keputusan strategis di tengah ketidakpastian,
                  saya memadukan pendekatan terstruktur dengan empati mendalam untuk membawa dampak positif.
                  Lewat manajemen tim yang terorganisir dan pengelolaan sumber daya yang efisien,
                  saya menyelaraskan setiap langkah dengan visi bersama sembari tetap memahami perspektif para pemangku kepentingan.
                  Berorientasi penuh pada hasil, kompas profesional saya berfokus pada penghasihan solusi nyata, inovatif, dan berbasis data untuk setiap dinamika organisasi.
                </p>
              </div>
            </div>

            {/* Bento 2: Profile Photo Card */}
            <div className="bg-white text-background p-3 rounded-2xl shadow-sm flex flex-col justify-between group border border-primary/10">
              <div className="relative w-full h-80 md:h-full min-h-[260px] rounded-xl overflow-hidden bg-primary">
                <img
                  src="/kunto.jpeg"
                  alt={PROFILE.nama}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent block truncate">
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

            {/* Bento 3: Skills */}
            <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-primary/10 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-primary mb-4">
                On Going Projects & Leadership Roles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {SKILLS.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-background border border-primary/10 hover:border-accent transition-colors"
                  >
                    <p className="font-bold text-primary text-sm">
                      {skill.nama}
                    </p>
                    <p className="text-xs text-accent font-mono font-semibold mt-1">
                      {skill.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-primary text-background py-8 sm:py-10 mt-auto">
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