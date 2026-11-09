"use client";

import { useEffect, useState } from "react";

interface SectionMarker {
  id: string;
  name: string;
  color: string; // Warna saat titik berada di section ini
  glowColor: string;
}

const SECTIONS: SectionMarker[] = [
  {
    id: "hero",
    name: "Beranda",
    color: "#62b8f2", // var(--accent)
    glowColor: "rgba(98, 184, 242, 0.7)",
  },
  {
    id: "dokumentasi",
    name: "Dokumentasi",
    color: "#FFD700", // var(--second)
    glowColor: "rgba(255, 215, 0, 0.7)",
  },
  {
    id: "projects",
    name: "Experience",
    color: "#62b8f2", // var(--accent)
    glowColor: "rgba(98, 184, 242, 0.7)",
  },
  {
    id: "about",
    name: "Tentang Saya",
    color: "#101f0a", // var(--primary)
    glowColor: "rgba(16, 31, 10, 0.6)",
  },
];

export default function AnimatedBackground() {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 sampai 1
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      targetProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;

      // Deteksi section yang sedang aktif di viewport
      const scrollPosition = currentScroll + window.innerHeight * 0.35;

      const sectionPositions = SECTIONS.map((sec) => {
        const el =
          sec.id === "hero"
            ? document.body
            : document.getElementById(sec.id);
        return {
          id: sec.id,
          top: el ? el.offsetTop : 0,
        };
      });

      for (let i = sectionPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionPositions[i].top) {
          setActiveSection(sectionPositions[i].id);
          break;
        }
      }
    };

    // Animasi lerp (smoothing easing) agar pergerakan titik halus dan tidak patah-patah
    const smoothLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      setScrollProgress(currentProgress);
      animationFrameId = requestAnimationFrame(smoothLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    smoothLoop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Ambil konfigurasi warna section aktif
  const currentTheme =
    SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Scroll Progress Navigator"
      className="fixed right-3.5 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center select-none pointer-events-auto"
    >
      <div className="relative h-64 sm:h-72 w-8 flex items-center justify-center">
        {/* 1. Jalur Garis Track Dasar */}
        <div className="absolute top-0 bottom-0 w-[2px] bg-primary/10 rounded-full" />

        {/* 2. Garis Isi (Progress Fill) yang Tumbuh Mengikuti Scroll */}
        <div
          className="absolute top-0 w-[2px] rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%`,
            backgroundColor: currentTheme.color,
            boxShadow: `0 0 10px ${currentTheme.glowColor}`,
          }}
        />

        {/* 3. Titik Penanda (Section Checkpoints) */}
        <div className="absolute inset-y-0 w-full flex flex-col justify-between py-1 pointer-events-none">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <div
                key={sec.id}
                className="group relative flex items-center justify-center w-full pointer-events-auto cursor-pointer"
                onClick={() => scrollToSection(sec.id)}
              >
                {/* Node Titik */}
                <span
                  className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "scale-125 border-white ring-2 ring-primary/20"
                      : "bg-white border-primary/25 group-hover:scale-110 group-hover:border-accent"
                  }`}
                  style={{
                    backgroundColor: isActive ? currentTheme.color : undefined,
                  }}
                />

                {/* Tooltip Nama Section saat Di-Hover */}
                <div className="absolute right-6 px-2.5 py-1 rounded-md bg-primary text-background text-[11px] font-mono font-medium tracking-wide whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-md">
                  {sec.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Titik Utama Pelacak Scroll (Active Glowing Traveler Head) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-75"
          style={{
            top: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-colors duration-500 ease-out"
            style={{
              backgroundColor: currentTheme.color,
              boxShadow: `0 0 14px 2px ${currentTheme.glowColor}`,
            }}
          />
        </div>
      </div>
    </aside>
  );
}