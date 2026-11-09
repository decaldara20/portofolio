"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Otomatis true saat masuk layar, dan false saat keluar layar
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15, // Memicu animasi saat 15% elemen terlihat
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Delay hanya dipasang saat elemen muncul, dan di-reset ke 0ms saat keluar layar agar reset-nya instan
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-10 blur-[2px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}