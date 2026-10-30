"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { getSupabaseClient } from "../lib/supabase";
import AnimatedBackground from "./AnimatedBackground"; // Ubah menjadi "../AnimatedBackground" jika file ini ada di app/ngl/page.tsx

const PROFILE = {
  nama: "Kunto Rossindu Hidayattullah",
  panggilan: "kunto",
  role: "Presiden BEM FATISDA UNS 2026",
  status: "Deep learning into Data Science & Student Leadership.",
  bioSingkat:
    "Saya adalah seorang mahasiswa Data Science di Universitas Sebelas Maret yang memiliki minat mendalam pada integrasi pengembangan perangkat lunak, analitik data, dan kepemimpinan organisasi. Sebagai Presiden BEM FATISDA UNS 2026, saya mengasah kemampuan manajemen tim, perencanaan strategis, dan pengambilan keputusan berbasis data (data-driven decision making)",
  githubUrl: "https://github.com/decaldara20/",
  linkedinUrl: "https://linkedin.com/in/kuntohidayat",
  email: "kuntohidayat20@gmail.com",
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

  // Hanya mengambil jumlah pesan (tanpa mengunduh isi pesan ke browser publik)
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
    }
  };

  return (
    <main className="relative isolate min-h-screen flex flex-col overflow-x-hidden bg-background text-foreground">
      {/* Animasi Latar Belakang Selaras Halaman Utama */}
      <AnimatedBackground />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] sm:h-[680px] bg-[radial-gradient(ellipse_at_75%_10%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_42%),linear-gradient(to_bottom,color-mix(in_srgb,var(--primary)_4%,var(--background)),var(--background))]"
      />

      {/* Navigasi Atas (Responsif Mobile & Desktop) */}
      <nav
        aria-label="Navigasi utama"
        className="sticky top-0 z-50 border-b border-primary/10 bg-background/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            aria-label="Kunto, kembali ke portofolio"
            className="group flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0"
          >
            <span className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-primary font-mono text-xs sm:text-sm font-bold text-background shadow-sm transition-all duration-200 group-hover:bg-accent group-hover:text-primary group-hover:scale-105">
              {PROFILE.panggilan.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm sm:text-lg font-bold tracking-tight text-primary whitespace-nowrap">
              {PROFILE.panggilan}
              <span className="text-accent">.portofolio</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Bagikan Link Halaman"
              className="cursor-pointer touch-manipulation inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/15 bg-white/85 px-2.5 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:border-accent hover:bg-accent/10 active:scale-95"
            >
              <Icon name={copied ? "check" : "copy"} size={15} />
              <span className="hidden xs:inline sm:inline">
                {copied ? "Tersalin" : "Bagikan Link"}
              </span>
            </button>

            <Link
              href="/"
              className="cursor-pointer touch-manipulation inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-background shadow-sm transition-all duration-200 hover:bg-accent hover:text-primary hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Kembali ke Portofolio</span>
              <span className="sm:hidden">Portofolio</span>
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <section className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        {/* Kolom Kiri: Informasi & Jaminan Privasi */}
        <div className="lg:col-span-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-primary text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 max-w-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="truncate">Secret & Direct Message Box</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-primary">
            Sampaikan Sesuatu Secara Langsung.
          </h1>

          <p className="mt-3 sm:mt-5 max-w-lg text-sm sm:text-lg leading-relaxed text-foreground/75">
            Tinggalkan pesan, masukan, apresiasi, atau ajakan kolaborasi.
          </p>

          {/* Kartu Jaminan Privasi (Rapi tanpa ruang kosong di Mobile & Desktop) */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg">
            <div className="group rounded-2xl border border-primary/10 bg-white/85 backdrop-blur-sm p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <p className="text-xs leading-relaxed text-foreground/70">
                Pesan hanya masuk ke dashboard pribadi dan tidak dapat dilihat
                pengunjung lain.
              </p>
            </div>

            <div className="group rounded-2xl border border-primary/10 bg-white/85 backdrop-blur-sm p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <p className="text-xs leading-relaxed text-foreground/70">
                Setiap masukan dan pesan sebagai bahan evaluasi dan kolaborasi.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Form Interaktif */}
        <div className="lg:col-span-6 w-full">
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-accent/25 to-transparent blur-xl pointer-events-none" />

            {sent ? (
              /* Tampilan Sukses Terkirim */
              <div className="relative rounded-2xl border border-accent/50 bg-white/95 backdrop-blur-md p-6 sm:p-10 text-center shadow-xl">
                <div className="mx-auto mb-4 sm:mb-5 flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-primary text-accent shadow-lg">
                  <Icon name="check" size={28} />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                  Pesan Berhasil Terkirim!
                </h2>
                <p className="mt-2 text-xs sm:text-base text-foreground/70 max-w-md mx-auto leading-relaxed">
                  Terima kasih sudah menyempatkan waktu. Pesanmu telah tersimpan
                  di ruang baca pribadi Kunto.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="cursor-pointer touch-manipulation w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-background shadow-md transition-all duration-200 hover:bg-accent hover:text-primary hover:-translate-y-0.5 active:scale-95"
                  >
                    <Icon name="message" size={17} />
                    <span>Kirim Pesan Lainnya</span>
                  </button>
                  <Link
                    href="/"
                    className="cursor-pointer touch-manipulation w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-primary/15 bg-background px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:border-accent active:scale-95"
                  >
                    <span>Kembali ke Beranda</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* Form Pengiriman Pesan */
              <form
                id="tulis-pesan"
                onSubmit={handleSubmit}
                className="relative rounded-2xl border border-primary/10 bg-white/95 backdrop-blur-md p-5 sm:p-8 shadow-xl transition-all"
              >
                <div className="mb-5 flex items-center justify-between gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-primary">
                    Kirim Pesan Baru
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-mono font-semibold text-background shrink-0">
                    Private
                  </span>
                </div>

                {/* Pilihan Mode Anonim / Bernama (Tab Interaktif) */}
                <div className="mb-5 grid grid-cols-2 gap-1.5 sm:gap-2 rounded-xl bg-background p-1.5 border border-primary/10">
                  <button
                    type="button"
                    onClick={() => setAnonymous(true)}
                    className={`cursor-pointer touch-manipulation flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                      anonymous
                        ? "bg-accent text-background shadow-sm"
                        : "text-foreground/65 hover:text-primary"
                    }`}
                  >
                    <span>Anonim</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnonymous(false)}
                    className={`cursor-pointer touch-manipulation flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                      !anonymous
                        ? "bg-accent text-background shadow-sm"
                        : "text-foreground/65 hover:text-primary"
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
                      className="mt-2 w-full rounded-xl border border-primary/15 bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-base sm:text-sm font-normal text-foreground outline-none transition-all duration-200 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20"
                    />
                  </label>
                )}

                {/* Quick Prompts / Topik Cepat */}
                <div className="mb-4">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-foreground/50 mb-2">
                    Pesan Cepat (Klik untuk Menambahkan):
                  </span>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePromptClick(item)}
                        className="cursor-pointer touch-manipulation text-left rounded-lg border border-primary/10 bg-background px-3 py-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-primary leading-snug transition-all duration-200 hover:border-accent hover:bg-accent/15 sm:hover:-translate-y-0.5 active:scale-[0.98]"
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
                      className="w-full resize-y rounded-xl border border-primary/15 bg-background px-3.5 py-2.5 pb-8 sm:px-4 sm:py-3 sm:pb-9 text-base sm:text-sm font-normal leading-relaxed text-foreground outline-none transition-all duration-200 placeholder:text-foreground/40 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/20"
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
                  className="cursor-pointer touch-manipulation mt-5 sm:mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-background shadow-lg shadow-primary/15 transition-all duration-200 hover:bg-accent hover:text-primary hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span>
                    {isSending ? "Mengirim Pesan..." : "Kirim Pesan Sekarang"}
                  </span>
                  <Icon name="send" size={18} />
                </button>
              </form>
            )}
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

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-sm font-medium">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/80 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/ngl/dashboard"
              className="text-background/40 hover:text-accent text-xs font-mono transition-colors"
              title="Ruang Admin"
            >
              [Inbox Admin]
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}