"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type UseRevealOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useReveal(options: UseRevealOptions = {}) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      for (const el of Array.from(
        document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right"),
      )) {
        el.classList.add("visible");
      }
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add("visible");
          io.unobserve(e.target);
        }
      },
      {
        root: null,
        rootMargin: options.rootMargin ?? "0px 0px -8% 0px",
        threshold: options.threshold ?? 0.15,
      },
    );

    const connect = () => {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right"),
      );
      for (const el of targets) io.observe(el);
    };

    // After app-router navigations, new page nodes may not be in the same frame as layout.
    const id = window.requestAnimationFrame(connect);

    return () => {
      window.cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [pathname, options.rootMargin, options.threshold]);
}

