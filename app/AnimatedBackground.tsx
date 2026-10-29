"use client";

import { useEffect, useRef } from "react";

interface ScrollyParticle {
  // Posisi saat ini di layar
  x: number;
  y: number;
  // Parameter dasar partikel
  size: number;
  isAccent: boolean;
  phaseOffset: number;
  // Koordinat formasi Fase 1 (Hero: Orbit / Lingkaran Visi)
  orbitAngle: number;
  orbitRadius: number;
  // Koordinat formasi Fase 2 (Projects: Gelombang Data Terstruktur)
  gridCol: number;
  gridRow: number;
  // Koordinat formasi Fase 3 (About: Konvergensi / Pilar Fokus)
  pillarX: number;
  pillarY: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: ScrollyParticle[] = [];

    // ==========================================
    // PENGATURAN SCROLLYTELLING (MUDAH DIEDIT)
    // ==========================================
    const PARTICLE_COUNT = 72; // Jumlah titik data
    const CONNECT_DISTANCE = 125; // Jarak maksimal garis penghubung
    const SMOOTHING = 0.06; // Kehalusan transisi saat di-scroll (0.03 - 0.1)

    // State pelacak posisi & kecepatan scroll
    let targetScrollProgress = 0; // 0 (Paling Atas) s/d 1 (Paling Bawah)
    let smoothScroll = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let time = 0;

    // Mengambil warna langsung dari variabel CSS di globals.css
    const getThemeColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const primary = styles.getPropertyValue("--primary").trim() || "#1E293B";
      const accent = styles.getPropertyValue("--accent").trim() || "#0EA5E9";
      return { primary, accent };
    };

    // Fungsi bantu interpolasi linear (perpindahan mulus antar bentuk)
    const lerp = (start: number, end: number, t: number) =>
      start + (end - start) * Math.max(0, Math.min(1, t));

    const updateScrollMetrics = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      targetScrollProgress = maxScroll > 0 ? currentScroll / maxScroll : 0;
      scrollVelocity = currentScroll - lastScrollY;
      lastScrollY = currentScroll;
    };

    const initParticles = () => {
      particles = [];
      const cols = 12;
      const rows = Math.ceil(PARTICLE_COUNT / cols);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: (i % 3 === 0 ? 2.4 : 1.5),
          isAccent: i % 3 === 0,
          phaseOffset: (i / PARTICLE_COUNT) * Math.PI * 2,
          // Fase 1: Orbit melingkar
          orbitAngle: (i / PARTICLE_COUNT) * Math.PI * 2,
          orbitRadius: 110 + (i % 4) * 55,
          // Fase 2: Matriks gelombang data
          gridCol: col / (cols - 1),
          gridRow: row / Math.max(1, rows - 1),
          // Fase 3: Simetri fokus di bagian About
          pillarX: (i % 2 === 0 ? 0.22 : 0.78) + ((i % 5) - 2) * 0.035,
          pillarY: (i / PARTICLE_COUNT),
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateScrollMetrics();
    };

    resizeCanvas();
    initParticles();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", updateScrollMetrics, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { primary, accent } = getThemeColors();

      time += 0.012;
      // Perhalus pergerakan scroll & redam kecepatan secara bertahap
      smoothScroll += (targetScrollProgress - smoothScroll) * SMOOTHING;
      scrollVelocity *= 0.88;

      const w = canvas.width;
      const h = canvas.height;

      // =====================================================
      // 1. SOROTAN CAHAYA PEMANDU FOKUS (AMBIENT SPOTLIGHT)
      // =====================================================
      // Posisi cahaya bergeser dari kanan atas (Hero) -> kiri tengah (Projects) -> tengah bawah (About)
      let spotlightX = w * 0.72;
      let spotlightY = h * 0.35;

      if (smoothScroll < 0.5) {
        const t = smoothScroll / 0.5;
        spotlightX = lerp(w * 0.72, w * 0.25, t);
        spotlightY = lerp(h * 0.35, h * 0.5, t);
      } else {
        const t = (smoothScroll - 0.5) / 0.5;
        spotlightX = lerp(w * 0.25, w * 0.5, t);
        spotlightY = lerp(h * 0.5, h * 0.65, t);
      }

      const radius = Math.max(w, h) * 0.38;
      const grad = ctx.createRadialGradient(
        spotlightX,
        spotlightY,
        10,
        spotlightX,
        spotlightY,
        radius
      );
      grad.addColorStop(0, accent);
      grad.addColorStop(1, "transparent");

      ctx.save();
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(spotlightX, spotlightY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // =====================================================
      // 2. TRANSFORMASI BENTUK PARTIKEL BERDASARKAN SCROLL
      // =====================================================
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // --- FORMASI 1: HERO (0.0 - 0.35) -> Cincin Orbit Kepemimpinan & Data ---
        const angle = p.orbitAngle + time * 0.4 + smoothScroll * 2.5;
        const heroCenterX = w > 1024 ? w * 0.68 : w * 0.5;
        const heroCenterY = h * 0.46;
        const heroX =
          heroCenterX + Math.cos(angle) * p.orbitRadius * (w > 768 ? 1.1 : 0.7);
        const heroY =
          heroCenterY + Math.sin(angle) * p.orbitRadius * 0.75;

        // --- FORMASI 2: PROJECTS (0.35 - 0.75) -> Gelombang Aliran Data ---
        const waveX = w * 0.08 + p.gridCol * (w * 0.84);
        const waveOffset =
          Math.sin(p.gridCol * Math.PI * 2.5 + time * 1.5 + smoothScroll * 6) *
          55;
        const waveY = h * 0.2 + p.gridRow * (h * 0.6) + waveOffset;

        // --- FORMASI 3: ABOUT (0.75 - 1.0) -> Bingkai Konvergensi Simetris ---
        const aboutX =
          w * p.pillarX + Math.sin(time + p.phaseOffset) * 28;
        const aboutY =
          h * 0.12 +
          ((p.pillarY + time * 0.08 + smoothScroll * 0.5) % 1) * (h * 0.76);

        // Hitung posisi target berdasarkan persentase scroll saat ini
        let targetX = heroX;
        let targetY = heroY;

        if (smoothScroll <= 0.5) {
          // Transisi Fase 1 (Hero) ke Fase 2 (Projects)
          const t = smoothScroll / 0.5;
          targetX = lerp(heroX, waveX, t);
          targetY = lerp(heroY, waveY, t);
        } else {
          // Transisi Fase 2 (Projects) ke Fase 3 (About)
          const t = (smoothScroll - 0.5) / 0.5;
          targetX = lerp(waveX, aboutX, t);
          targetY = lerp(waveY, aboutY, t);
        }

        // Gerakkan partikel menuju formasi target + efek pegas dari kecepatan scroll
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - scrollVelocity * 0.45 - p.y) * 0.08;

        // Gambar titik partikel (dan efek rentang garis saat di-scroll cepat)
        const velocityStretch = Math.min(Math.abs(scrollVelocity) * 0.35, 14);

        ctx.save();
        ctx.globalAlpha = p.isAccent ? 0.55 : 0.3;
        ctx.strokeStyle = p.isAccent ? accent : primary;
        ctx.fillStyle = p.isAccent ? accent : primary;
        ctx.lineWidth = p.size * 1.4;
        ctx.lineCap = "round";

        if (velocityStretch > 1.5) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - velocityStretch);
          ctx.lineTo(p.x, p.y + velocityStretch);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Gambar jaringan penghubung antar titik terdekat
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DISTANCE) {
            ctx.save();
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.14;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.isAccent && p2.isAccent ? accent : primary;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // =====================================================
      // 3. GARIS INDIKATOR ALUR SCROLL (DI SISI KANAN LAYAR)
      // =====================================================
      if (w >= 768) {
        const trackX = w - 22;
        const trackTop = h * 0.28;
        const trackHeight = h * 0.44;

        // Garis jalur dasar
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(trackX, trackTop);
        ctx.lineTo(trackX, trackTop + trackHeight);
        ctx.stroke();

        // Garis progres aktif mengikuti scroll
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(trackX, trackTop);
        ctx.lineTo(trackX, trackTop + trackHeight * smoothScroll);
        ctx.stroke();

        // 3 Titik penanda section (Hero, Experience, About)
        const checkpoints = [0, 0.5, 1];
        checkpoints.forEach((cp) => {
          const cy = trackTop + trackHeight * cp;
          const isPassed = smoothScroll >= cp - 0.05;

          ctx.globalAlpha = isPassed ? 0.9 : 0.25;
          ctx.fillStyle = isPassed ? accent : primary;
          ctx.beginPath();
          ctx.arc(trackX, cy, isPassed ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateScrollMetrics);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}