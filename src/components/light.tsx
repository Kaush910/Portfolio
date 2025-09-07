"use client";
import { useEffect, useRef } from "react";

export default function Spotlight() {
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const speed = 0.18; // lower = smoother lag
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * speed;
      pos.current.y += (target.current.y - pos.current.y) * speed;
      document.documentElement.style.setProperty("--spot-x", `${pos.current.x}px`);
      document.documentElement.style.setProperty("--spot-y", `${pos.current.y}px`);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) document.documentElement.style.setProperty("--spot-smooth", "0ms");
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[50] mix-blend-screen"
      style={{
        background:
          "radial-gradient(220px 220px at var(--spot-x,-100px) var(--spot-y,-100px), rgba(120,96,255,0.20), transparent 60%)",
        transition: "background var(--spot-smooth,0ms) linear",
      }}
    />
  );
}
