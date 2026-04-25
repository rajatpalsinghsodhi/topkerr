"use client";

import { useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";

export function ScrollEffects() {
  useReveal();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;
      document.documentElement.dataset.scrolled = y > 8 ? "true" : "false";

      const parallax = document.querySelector<HTMLElement>("[data-parallax]");
      if (parallax) {
        parallax.style.transform = `translate3d(0, ${Math.round(y * 0.4)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

