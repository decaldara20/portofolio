"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { getSupabaseClient } from "../lib/supabase";
import Reveal from "./Reveal"; // Ubah menjadi "../Reveal" jika file ini ada di app/ngl/page.tsx

const PROFILE = {
  nama: "Kunto Rossindu Hidayattullah",
  panggilan: "Kunto",
  role: "Presiden BEM FATISDA UNS 2026",
  status: "Deep learning into Data Science & Student Leadership.",
  bioSingkat:
    "Saya adalah seorang mahasiswa Data Science di Universitas Sebelas Maret yang memiliki minat mendalam pada integrasi pengembangan perangkat lunak, analitik data, dan kepemimpinan organisasi. Sebagai Presiden BEM FATISDA UNS 2026, saya mengasah kemampuan manajemen tim, perencanaan strategis, dan pengambilan keputusan berbasis data (data-driven decision making)",
  githubUrl: "https://github.com/decaldara20/",
  linkedinUrl: "https://linkedin.com/in/kuntohidayat",
  email: "kuntohidayat20@gmail.com",
  instagramUrl: "https://www.instagram.com/kunto_rossindu?cplk=MWgzYnc3bDV1OWJx",
};

const QUICK_PROMPTS = [
  "Saya mau konsultasi website di FSD",
  "Gimana cara menjadi bagian dari FSD?",
  "Saya ingin tahu lebih banyak tentang FSD",
];

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

export default function Ngl() {
  const [totalMessages, setTotalMessages] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCount = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      const { count } = await supabase
        .from("ngl_messages")
        .select("*", { count: "exact", head: true });

      if (isActive && typeof count === "number") {
        setTotalMessages(count);
      }
    };

    void loadCount();
    return () => {
      isActive = false;
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handlePromptClick = (promptText: string) => {
    setMessage((prev) =>
      prev.trim() ? `${prev.trim()} — [${promptText}] ` : `[${promptText}] `
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    const displayName = anonymous ? "Anonim" : name.trim() || "Pengunjung";
    const supabase = getSupabaseClient();
    if (!supabase) {
      setFormError("Konfigurasi Supabase belum lengkap. Pesan belum terkirim.");
      return;
    }

    setIsSending(true);
    setFormError("");
    try {
      const { error } = await supabase.from("ngl_messages").insert({
        sender_name: displayName,
        message: cleanMessage,
        is_anonymous: anonymous,
      });

      if (error) {
        setFormError("Pesan gagal dikirim. Silakan coba lagi.");
        return;
      }

      setTotalMessages((current) => current + 1);
      setMessage("");
      setName("");
      setSent(true);
    } catch {
      setFormError(
        "Koneksi bermasalah. Pesan belum terkirim, silakan coba lagi."
      );
    } finally {
      setIsSending(false);
    };
  };

  return (
    <main className="relative isolate min-h-screen flex flex-col overflow-hidden bg-transparent text-primary">
      {/* Navigation (Floating Glass Island Navbar) */}
      <header className="sticky top-3 sm:top-5 z-50 w-full px-4 sm:px-6 pointer-events-none">
        <nav
          aria-label="Navigasi Utama"
          className="max-w-6xl mx-auto rounded-2xl sm:rounded-full bg-white/80 backdrop-blur-md border-2 border-primary/10 shadow-[0_8px_30px_rgba(16,31,10,0.06)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 pointer-events-auto transition-all duration-300 hover:border-accent/50"
        >
          {/* Brand Logo & Foto Profil */}
          <Link
            href="/"
            aria-label="Kembali ke beranda"
            className="flex items-center gap-2.5 group shrink-0 select-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl sm:rounded-full bg-primary text-background flex items-center justify-center overflow-hidden shadow-xs border border-primary/10 group-hover:border-accent transition-all duration-300">
              <img
                src="/profile.jpg"
                alt="Profil"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith("/kunto.jpeg")) {
                    target.src = "/kunto.jpeg";
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-tight text-primary whitespace-nowrap">
              {PROFILE.panggilan}
              <span className="text-primary group-hover:text-accent transition-colors">
                .Rossindu
              </span>
            </span>
          </Link>

          {/* Tombol Aksi di Kanan */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Tombol Bagikan Link (Pill Badge Aksen) */}
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Bagikan link halaman"
              className="cursor-pointer touch-manipulation inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/15 border border-accent/40 text-xs font-bold text-primary hover:bg-accent hover:border-accent transition-all duration-200 active:scale-95"
            >
              <Icon name={copied ? "check" : "copy"} size={14} />
              <span className="hidden xs:inline sm:inline">
                {copied ? "Tersalin" : "Bagikan Link"}
              </span>
            </button>

            {/* Tombol CTA Kembali ke Portofolio (Pil Solid Kontras) */}
            <Link
              href="/"
              className="cursor-pointer touch-manipulation inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-accent text-background hover:text-primary px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-[0_4px_16px_rgba(98,184,242,0.4)] transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Kembali ke Portofolio</span>
              <span className="sm:hidden">Portofolio</span>
              <Icon name="arrow" size={14} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Konten Utama */}
      <section className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Kolom Kiri: Informasi & Jaminan Privasi */}
        <Reveal className="lg:col-span-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/15 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="truncate">Secret &amp; Direct Message Box</span>
          </div>

          <div className="mb-4 sm:mb-6">
            <h1 className="inline-block text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-accent rounded-2xl hover:text-second transition-colors">
              Sampaikan Sesuatu
            </h1>
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-primary mt-1.5">
              Secara Langsung.
            </span>
          </div>

          <p className="mt-3 sm:mt-4 max-w-lg text-sm sm:text-lg leading-relaxed text-primary/75">
            Tinggalkan pesan, masukan, apresiasi, atau ajakan kolaborasi.
          </p>

          {/* Kartu Jaminan Privasi */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-lg">
            <div className="group rounded-2xl border-2 border-primary/10 bg-white/85 backdrop-blur-md p-4 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_10px_25px_-10px_rgba(98,184,242,0.4)] hover:-translate-y-0.5 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
              <p className="text-xs leading-relaxed text-foreground/80 font-medium">
                Pesan hanya masuk ke dashboard pribadi dan tidak dapat dilihat
                pengunjung lain.
              </p>
            </div>

            <div className="group rounded-2xl border-2 border-primary/10 bg-white/85 backdrop-blur-md p-4 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-[0_10px_25px_-10px_rgba(98,184,242,0.4)] hover:-translate-y-0.5 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <p className="text-xs leading-relaxed text-foreground/80 font-medium">
                Setiap masukan dan pesan menjadi bahan evaluasi serta kolaborasi.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Kolom Kanan: Form Interaktif */}
        <Reveal delay={180} className="lg:col-span-6 w-full">
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/15 via-accent/25 to-second/20 blur-xl pointer-events-none" />

            {sent ? (
              /* Tampilan Sukses Terkirim */
              <div className="relative rounded-2xl border-2 border-accent bg-white/90 backdrop-blur-md overflow-hidden shadow-xl">
                <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-second" />
                <div className="p-6 sm:p-10 text-center">
                  <div className="mx-auto mb-4 sm:mb-5 flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-primary text-second border border-second shadow-lg">
                    <Icon name="check" size={28} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                    Pesan Berhasil Terkirim!
                  </h2>
                  <p className="mt-2 text-xs sm:text-base text-foreground/75 max-w-md mx-auto leading-relaxed">
                    Terima kasih sudah menyampaikan pesan
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="cursor-pointer touch-manipulation w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary border-2 border-primary px-6 py-3 text-sm font-bold text-background shadow-md transition-all duration-200 hover:bg-accent hover:text-primary hover:border-accent hover:-translate-y-0.5 active:scale-95"
                    >
                      <Icon name="message" size={17} />
                      <span>Kirim Pesan Lainnya</span>
                    </button>
                    <Link
                      href="/"
                      className="cursor-pointer touch-manipulation w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/15 bg-background px-6 py-3 text-sm font-bold text-primary transition-all duration-200 hover:border-accent active:scale-95"
                    >
                      <span>Kembali ke Beranda</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Form Pengiriman Pesan */
              <form
                id="tulis-pesan"
                onSubmit={handleSubmit}
                className="relative rounded-2xl border-2 border-primary/10 hover:border-accent/60 bg-white/85 backdrop-blur-md overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-second" />

                <div className="p-5 sm:p-8">
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <h2 className="text-base sm:text-lg font-extrabold text-primary">
                      Kirim Pesan Baru
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary border border-second/40 px-2.5 py-1 text-[11px] font-mono font-semibold text-second shrink-0">
                      Private
                    </span>
                  </div>

                  {/* Pilihan Mode Anonim / Bernama */}
                  <div className="mb-5 grid grid-cols-2 gap-1.5 sm:gap-2 rounded-xl bg-background p-1.5 border border-primary/10">
                    <button
                      type="button"
                      onClick={() => setAnonymous(true)}
                      className={`cursor-pointer touch-manipulation flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
                        anonymous
                          ? "bg-primary text-background shadow-sm"
                          : "text-foreground/65 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span>Anonim</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnonymous(false)}
                      className={`cursor-pointer touch-manipulation flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.98] ${
                        !anonymous
                          ? "bg-primary text-background shadow-sm"
                          : "text-foreground/65 hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      <span>Bernama</span>
                    </button>
                  </div>

                  {!anonymous && (
                    <label className="mb-5 block text-xs sm:text-sm font-bold text-primary">
                      Nama atau Inisial Kamu
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Contoh: Ucup"
                        maxLength={40}
                        className="mt-2 w-full rounded-xl border-2 border-primary/15 bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm font-normal text-foreground outline-none transition-all duration-200 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20"
                      />
                    </label>
                  )}

                  {/* Quick Prompts */}
                  <div className="mb-5">
                    <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-foreground/50 mb-2">
                      Pesan Cepat (Klik untuk Menambahkan):
                    </span>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5">
                      {QUICK_PROMPTS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handlePromptClick(item)}
                          className="cursor-pointer touch-manipulation text-left rounded-lg border border-accent/40 bg-accent/15 px-3 py-2 sm:px-2.5 sm:py-1.5 text-xs font-bold text-primary leading-snug transition-all duration-200 hover:bg-primary hover:text-background hover:border-primary sm:hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                          + {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block text-xs sm:text-sm font-bold text-primary">
                    Isi Pesan
                    <span className="relative mt-2 block">
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Tulis pesan, saran, atau hal yang ingin kamu sampaikan di sini..."
                        maxLength={400}
                        rows={4}
                        required
                        className="w-full resize-y rounded-xl border-2 border-primary/15 bg-background px-3.5 py-2.5 pb-8 sm:px-4 sm:py-3 sm:pb-9 text-base sm:text-sm font-normal leading-relaxed text-foreground outline-none transition-all duration-200 placeholder:text-foreground/40 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20"
                      />
                      <span
                        className={`absolute bottom-2.5 right-3 sm:bottom-3 sm:right-3.5 text-[11px] sm:text-xs font-mono tabular-nums ${
                          message.length > 360
                            ? "text-amber-600 font-bold"
                            : "text-foreground/45"
                        }`}
                      >
                        {message.length}/400
                      </span>
                    </span>
                  </label>

                  {formError && (
                    <p
                      role="alert"
                      className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-red-800"
                    >
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSending || !message.trim()}
                    className="cursor-pointer touch-manipulation mt-5 sm:mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary border-2 border-primary px-6 py-3.5 text-sm font-bold text-background shadow-lg shadow-primary/15 transition-all duration-200 hover:bg-accent hover:text-primary hover:border-accent hover:shadow-[0_8px_20px_-6px_rgba(98,184,242,0.5)] hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <span>
                      {isSending ? "Mengirim Pesan..." : "Kirim Pesan Sekarang"}
                    </span>
                    <Icon name="send" size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
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
    </main>
  );
}