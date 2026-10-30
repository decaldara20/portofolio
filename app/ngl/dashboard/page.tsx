"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { getSupabaseClient } from "../../../lib/supabase"; // Sesuaikan jumlah "../" dengan letak folder lib/supabase Anda
import AnimatedBackground from "../../AnimatedBackground"; // Sesuaikan jumlah "../" dengan letak AnimatedBackground.tsx Anda

type SupabaseMessage = {
  id: string;
  sender_name: string;
  message: string;
  is_anonymous: boolean;
  created_at: string;
};

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "2026";

function formatMessageTime(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NglDashboard() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [messages, setMessages] = useState<SupabaseMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filterType, setFilterType] = useState<"Semua" | "Anonim" | "Bernama">(
    "Semua"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Cek sesi login di browser agar tidak perlu ketik PIN berulang saat refresh
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("kunto_ngl_admin");
    if (savedAuth === "unlocked") {
      setIsUnlocked(true);
    }
  }, []);

  // Muat pesan dari Supabase HANYA jika PIN sudah benar
  useEffect(() => {
    if (!isUnlocked) return;
    let isActive = true;

    const fetchMessages = async () => {
      setIsLoading(true);
      setLoadError("");
      const supabase = getSupabaseClient();

      if (!supabase) {
        if (isActive) {
          setLoadError("Konfigurasi Supabase belum lengkap.");
          setIsLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("ngl_messages")
        .select("id, sender_name, message, is_anonymous, created_at")
        .order("created_at", { ascending: false });

      if (!isActive) return;
      if (error) {
        setLoadError("Gagal memuat pesan dari Supabase.");
        setIsLoading(false);
        return;
      }

      setMessages(data ?? []);
      setIsLoading(false);
    };

    void fetchMessages();
    return () => {
      isActive = false;
    };
  }, [isUnlocked, reloadKey]);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      sessionStorage.setItem("kunto_ngl_admin", "unlocked");
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("kunto_ngl_admin");
    setIsUnlocked(false);
    setPinInput("");
  };

  const handleDelete = async (id: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { error } = await supabase.from("ngl_messages").delete().eq("id", id);
    if (!error) {
      setMessages((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredMessages = messages.filter((item) => {
    const matchesFilter =
      filterType === "Semua"
        ? true
        : filterType === "Anonim"
          ? item.is_anonymous
          : !item.is_anonymous;

    const matchesSearch =
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sender_name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ==========================================
  // TAMPILAN 1: GERBANG PIN (JIKA BELUM LOGIN)
  // ==========================================
  if (!isUnlocked) {
    return (
      <main className="relative isolate min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <AnimatedBackground />
        <div className="relative z-10 w-full max-w-md rounded-2xl border border-primary/15 bg-white/95 backdrop-blur-md p-8 shadow-2xl text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-accent font-mono font-bold text-lg shadow-md">
            🔒
          </div>
          <h1 className="text-2xl font-extrabold text-primary">
            Private Inbox Dashboard
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-foreground/65">
            Halaman ini dikhususkan untuk Kunto. Masukkan PIN akses untuk
            membaca seluruh pesan masuk.
          </p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Masukkan PIN Akses..."
              autoFocus
              className="w-full text-center tracking-widest font-mono text-lg rounded-xl border border-primary/20 bg-background px-4 py-3 text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20"
            />
            {pinError && (
              <p className="text-xs font-semibold text-red-600">
                PIN yang Anda masukkan salah. Silakan coba lagi.
              </p>
            )}
            <button
              type="submit"
              className="cursor-pointer w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-background shadow-md transition-all duration-200 hover:bg-accent hover:text-primary hover:-translate-y-0.5 active:scale-95"
            >
              Buka Brankas Pesan
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-primary/10">
            <Link
              href="/ngl"
              className="cursor-pointer text-xs font-semibold text-foreground/60 hover:text-primary transition-colors"
            >
              ← Kembali ke Halaman Kirim Pesan
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // TAMPILAN 2: DASHBOARD PESAN PRIBADI KUNTO
  // ==========================================
  const totalAnon = messages.filter((m) => m.is_anonymous).length;
  const totalNamed = messages.length - totalAnon;

  return (
    <main className="relative isolate min-h-screen flex flex-col bg-background text-foreground">
      <AnimatedBackground />

      {/* Header Dashboard */}
      <nav className="sticky top-0 z-50 border-b border-primary/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-mono text-sm font-bold text-accent">
              K
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-primary leading-tight">
                Inbox Dashboard
              </h1>
              <p className="text-[11px] font-mono text-foreground/55">
                kunto.portofolio // Private View
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="cursor-pointer rounded-xl border border-primary/15 bg-white px-3.5 py-2 text-xs font-semibold text-primary shadow-sm transition hover:border-accent active:scale-95"
            >
              Segarkan
            </button>
            <button
              type="button"
              onClick={handleLock}
              className="cursor-pointer rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-background shadow-sm transition hover:bg-accent hover:text-primary active:scale-95"
            >
              Kunci Kembali
            </button>
          </div>
        </div>
      </nav>

      <section className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
            <span className="text-xs font-mono uppercase text-foreground/50">
              Total Semua Pesan
            </span>
            <p className="mt-1 text-3xl font-extrabold text-primary">
              {messages.length}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
            <span className="text-xs font-mono uppercase text-foreground/50">
              Pengirim Anonim
            </span>
            <p className="mt-1 text-3xl font-extrabold text-primary">
              {totalAnon}
            </p>
          </div>
          <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
            <span className="text-xs font-mono uppercase text-foreground/50">
              Pengirim Bernama
            </span>
            <p className="mt-1 text-3xl font-extrabold text-primary">
              {totalNamed}
            </p>
          </div>
        </div>

        {/* Bar Filter & Pencarian */}
        <div className="mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            {(["Semua", "Anonim", "Bernama"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterType(tab)}
                className={`cursor-pointer rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition active:scale-95 ${
                  filterType === tab
                    ? "bg-primary text-background shadow-sm"
                    : "bg-white text-foreground/70 border border-primary/15 hover:border-accent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari isi pesan atau nama pengirim..."
            className="w-full sm:w-72 rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20"
          />
        </div>

        {/* Daftar Pesan Masuk */}
        {isLoading ? (
          <div className="rounded-2xl border border-primary/10 bg-white p-12 text-center text-sm text-foreground/60">
            Memuat brankas pesan...
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
            {loadError}
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/20 bg-white p-12 text-center text-sm text-foreground/60">
            Tidak ada pesan yang sesuai dengan filter saat ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMessages.map((item) => (
              <article
                key={item.id}
                className="group rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-all duration-200 hover:border-accent hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.is_anonymous
                          ? "bg-primary text-accent"
                          : "bg-accent/20 text-primary border border-accent/40"
                      }`}
                    >
                      {item.sender_name}
                    </span>
                    <span className="text-xs font-mono text-foreground/50">
                      {formatMessageTime(item.created_at)}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-foreground/85 whitespace-pre-wrap">
                    {item.message}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-primary/10 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-xs font-semibold text-foreground/40 hover:text-red-600 transition-colors"
                  >
                    Hapus Pesan
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}