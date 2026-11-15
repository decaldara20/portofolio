"use client";

import React, { useEffect, useRef, useState } from "react";

export const Animated: React.FC = () => {
  // 1. STATE & TIMER UNTUK ANIMASI ANGGUKAN KEPALA SAAT KLIK
  const [isNodding, setIsNodding] = useState(false);
  const nodTimeoutRef = useRef<number | null>(null);

  // Referensi titik pusat & bola mata Peach (Kucing Putih - Kiri)
  const peachLeftAnchorRef = useRef<SVGGElement>(null);
  const peachRightAnchorRef = useRef<SVGGElement>(null);
  const peachLeftPupilRef = useRef<SVGGElement>(null);
  const peachRightPupilRef = useRef<SVGGElement>(null);

  // Referensi titik pusat & bola mata Goma (Kucing Abu-abu - Kanan)
  const gomaLeftAnchorRef = useRef<SVGGElement>(null);
  const gomaRightAnchorRef = useRef<SVGGElement>(null);
  const gomaLeftPupilRef = useRef<SVGGElement>(null);
  const gomaRightPupilRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const updateEyes = (clientX: number, clientY: number) => {
      const eyes = [
        { anchor: peachLeftAnchorRef.current, pupil: peachLeftPupilRef.current },
        { anchor: peachRightAnchorRef.current, pupil: peachRightPupilRef.current },
        { anchor: gomaLeftAnchorRef.current, pupil: gomaLeftPupilRef.current },
        { anchor: gomaRightAnchorRef.current, pupil: gomaRightPupilRef.current },
      ];

      eyes.forEach(({ anchor, pupil }) => {
        if (!anchor || !pupil) return;

        const rect = anchor.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = clientX - eyeCenterX;
        const deltaY = clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);

        const maxRadius = 6;
        const distance = Math.min(maxRadius, Math.hypot(deltaX, deltaY) * 0.04);

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateEyes(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        updateEyes(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    // 2. EVENT LISTENER SAAT KURSOR MELAKUKAN KLIK / TAP LAYAR
    const handlePointerDown = () => {
      if (nodTimeoutRef.current) {
        window.clearTimeout(nodTimeoutRef.current);
      }

      // Reset sebentar agar klik beruntun langsung memicu ulang animasi
      setIsNodding(false);
      requestAnimationFrame(() => {
        setIsNodding(true);
      });

      nodTimeoutRef.current = window.setTimeout(() => {
        setIsNodding(false);
      }, 450);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      if (nodTimeoutRef.current) {
        window.clearTimeout(nodTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="peach-goma-standing flex justify-center items-end select-none pointer-events-none"
      aria-hidden="true"
    >
      <style>{`
        .pg-pupil {
          transition: transform 0.07s ease-out;
        }

        .pg-blink-left {
          transform-box: fill-box;
          transform-origin: center;
          animation: pg-blink 4.6s infinite;
        }

        .pg-blink-right {
          transform-box: fill-box;
          transform-origin: center;
          animation: pg-blink 4.6s infinite 0.3s;
        }

        @keyframes pg-blink {
          0%, 94%, 100% {
            transform: scaleY(1);
          }
          97% {
            transform: scaleY(0.1);
          }
        }

        .pg-idle-bounce {
          transform-box: fill-box;
          transform-origin: bottom center;
          animation: pg-squish 3.4s ease-in-out infinite;
        }

        @keyframes pg-squish {
          0%, 100% {
            transform: scaleY(1) scaleX(1);
          }
          50% {
            transform: scaleY(0.985) scaleX(1.012);
          }
        }

        /* 3. KEYFRAMES ANIMASI ANGGUKAN KEPALA SAAT DIKLIK */
        .pg-head-nod-left {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: pg-nod-left 0.42s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .pg-head-nod-right {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: pg-nod-right 0.42s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes pg-nod-left {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          40% {
            transform: translateY(6px) rotate(4.5deg);
          }
          75% {
            transform: translateY(-1.5px) rotate(-1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes pg-nod-right {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          40% {
            transform: translateY(6px) rotate(-4.5deg);
          }
          75% {
            transform: translateY(-1.5px) rotate(1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
      `}</style>

      <svg
        viewBox="0 0 380 212"
        className="w-[245px] sm:w-[295px] max-w-full h-auto overflow-visible"
      >
        {/* Bayangan Pijakan di Atas Kartu Pesan */}
        <ellipse
          cx="190"
          cy="197"
          rx="148"
          ry="8.5"
          fill="#1E293B"
          opacity="0.14"
        />

        <g className="pg-idle-bounce">
          {/* ===================================================== */}
          {/* KUCING 1: PEACH (PUTIH - BERDIRI DI SEBELAH KIRI)     */}
          {/* ===================================================== */}
          <g>
            {/* Bagian Badan & Kaki Peach (Tetap menapak di kartu) */}
            <path
              d="M 58 110 L 164 110
                 C 166 138, 165 168, 162 189
                 C 159 197, 134 197, 130 188
                 L 128 179
                 C 117 177, 105 177, 94 179
                 L 92 188
                 C 88 197, 62 197, 60 189
                 C 56 168, 55 138, 58 110 Z"
              fill="#ffffff"
              stroke="#452c1e"
              strokeWidth="4.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Lengan Kiri Peach */}
            <path
              d="M 62 128 C 78 128, 86 146, 74 154 C 64 158, 54 148, 56 138"
              fill="#ffffff"
              stroke="#452c1e"
              strokeWidth="4.6"
              strokeLinecap="round"
            />

            {/* Lengan Kanan Peach (Menggandeng tangan Goma) */}
            <path
              d="M 162 124 C 175 126, 191 132, 194 140 C 196 147, 184 151, 165 145"
              fill="#ffffff"
              stroke="#452c1e"
              strokeWidth="4.6"
              strokeLinecap="round"
            />

            {/* Bagian Kepala Peach (Mengangguk saat diklik) */}
            <g className={isNodding ? "pg-head-nod-left" : ""}>
              {/* Isi Warna Kepala tanpa garis batas leher agar menyatu mulus */}
              <path
                d="M 58 123
                   C 36 112, 34 86, 45 68
                   L 42 38
                   L 68 42
                   C 95 33, 129 33, 156 42
                   L 182 38
                   L 179 68
                   C 188 86, 186 112, 164 123
                   Q 111 130, 58 123 Z"
                fill="#ffffff"
              />

              {/* Garis Outline Kepala & Telinga */}
              <path
                d="M 58 123
                   C 36 112, 34 86, 45 68
                   L 42 38
                   L 68 42
                   C 95 33, 129 33, 156 42
                   L 182 38
                   L 179 68
                   C 188 86, 186 112, 164 123"
                fill="none"
                stroke="#452c1e"
                strokeWidth="4.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Telinga Dalam Kiri Peach */}
              <path
                d="M 49 62 L 48 45 L 65 47 L 59 52 L 64 55 Z"
                fill="#f9b8b4"
              />

              {/* Telinga Dalam Kanan Peach */}
              <path
                d="M 175 62 L 176 45 L 159 47 L 165 52 L 160 55 Z"
                fill="#f9b8b4"
              />

              {/* Pipi Merona Peach */}
              <ellipse cx="63" cy="103" rx="9.5" ry="6.5" fill="#fde0e0" />
              <ellipse cx="159" cy="103" rx="9.5" ry="6.5" fill="#fde0e0" />

              {/* Mata Kiri Peach */}
              <g ref={peachLeftAnchorRef}>
                <circle cx="84" cy="95" r="13" fill="transparent" />
                <g ref={peachLeftPupilRef} className="pg-pupil">
                  <g className="pg-blink-left">
                    <circle cx="84" cy="95" r="7.8" fill="#452c1e" />
                    <circle cx="81.6" cy="92.6" r="2.1" fill="#ffffff" />
                  </g>
                </g>
              </g>

              {/* Mata Kanan Peach */}
              <g ref={peachRightAnchorRef}>
                <circle cx="138" cy="95" r="13" fill="transparent" />
                <g ref={peachRightPupilRef} className="pg-pupil">
                  <g className="pg-blink-left">
                    <circle cx="138" cy="95" r="7.8" fill="#452c1e" />
                    <circle cx="135.6" cy="92.6" r="2.1" fill="#ffffff" />
                  </g>
                </g>
              </g>

              {/* Mulut Mungil Peach (ω) */}
              <path
                d="M 104 99 Q 107.5 105 111 100 Q 114.5 105 118 99"
                fill="none"
                stroke="#452c1e"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* ===================================================== */}
          {/* KUCING 2: GOMA (ABU-ABU - BERDIRI DI SEBELAH KANAN)   */}
          {/* ===================================================== */}
          <g>
            {/* Bagian Badan & Kaki Goma (Tetap menapak di kartu) */}
            <path
              d="M 214 110 L 319 110
                 C 322 138, 321 168, 318 189
                 C 315 197, 290 197, 286 188
                 L 284 179
                 C 272 177, 260 177, 248 179
                 L 245 186
                 C 240 194, 215 192, 214 183
                 C 211 163, 211 138, 214 110 Z"
              fill="#a7a29d"
              stroke="#452c1e"
              strokeWidth="4.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Lengan Kiri Goma (Menggandeng tangan kanan Peach) */}
            <path
              d="M 214 125 C 200 128, 186 134, 185 141 C 184 148, 196 151, 214 144"
              fill="#a7a29d"
              stroke="#452c1e"
              strokeWidth="4.6"
              strokeLinecap="round"
            />

            {/* Lengan Kanan Goma */}
            <path
              d="M 314 130 C 298 130, 290 148, 302 156 C 312 160, 322 150, 320 140"
              fill="#a7a29d"
              stroke="#452c1e"
              strokeWidth="4.6"
              strokeLinecap="round"
            />

            {/* Bagian Kepala Goma (Mengangguk saat diklik) */}
            <g className={isNodding ? "pg-head-nod-right" : ""}>
              {/* Isi Warna Kepala tanpa garis batas leher agar menyatu mulus */}
              <path
                d="M 214 123
                   C 192 112, 190 86, 200 68
                   L 197 38
                   L 222 42
                   C 249 34, 283 34, 310 42
                   L 336 38
                   L 333 68
                   C 343 86, 341 112, 319 123
                   Q 266 130, 214 123 Z"
                fill="#a7a29d"
              />

              {/* Garis Outline Kepala & Telinga */}
              <path
                d="M 214 123
                   C 192 112, 190 86, 200 68
                   L 197 38
                   L 222 42
                   C 249 34, 283 34, 310 42
                   L 336 38
                   L 333 68
                   C 343 86, 341 112, 319 123"
                fill="none"
                stroke="#452c1e"
                strokeWidth="4.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Telinga Dalam Kiri Goma */}
              <path
                d="M 204 62 L 203 45 L 220 47 L 214 52 L 219 55 Z"
                fill="#f59b8c"
              />

              {/* Telinga Dalam Kanan Goma */}
              <path
                d="M 329 62 L 330 45 L 313 47 L 319 52 L 314 55 Z"
                fill="#f59b8c"
              />

              {/* Pipi Merona Goma */}
              <ellipse cx="218" cy="103" rx="9.5" ry="6.5" fill="#f59b8c" />
              <ellipse cx="314" cy="103" rx="9.5" ry="6.5" fill="#f59b8c" />

              {/* Mata Kiri Goma */}
              <g ref={gomaLeftAnchorRef}>
                <circle cx="239" cy="95" r="13" fill="transparent" />
                <g ref={gomaLeftPupilRef} className="pg-pupil">
                  <g className="pg-blink-right">
                    <circle cx="239" cy="95" r="7.8" fill="#452c1e" />
                    <circle cx="236.6" cy="92.6" r="2.1" fill="#ffffff" />
                  </g>
                </g>
              </g>

              {/* Mata Kanan Goma */}
              <g ref={gomaRightAnchorRef}>
                <circle cx="293" cy="95" r="13" fill="transparent" />
                <g ref={gomaRightPupilRef} className="pg-pupil">
                  <g className="pg-blink-right">
                    <circle cx="293" cy="95" r="7.8" fill="#452c1e" />
                    <circle cx="290.6" cy="92.6" r="2.1" fill="#ffffff" />
                  </g>
                </g>
              </g>

              {/* Mulut Mungil Goma (ω) */}
              <path
                d="M 259 99 Q 262.5 105 266 100 Q 269.5 105 273 99"
                fill="none"
                stroke="#452c1e"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Animated;