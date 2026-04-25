"use client";

import Script from "next/script";
import { cn } from "@/lib/cn";
import type { SocialEmbed } from "@/lib/site";

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "") + "/";
}

export function SocialWall({
  items,
  className,
}: {
  items: SocialEmbed[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {/* Official embeds are the only reliable no-auth option */}
      <Script
        async
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
      />
      <Script async src="https://www.tiktok.com/embed.js" strategy="afterInteractive" />

      {items.map((item) => {
        const url = normalizeUrl(item.url);

        return (
          <div
            key={item.url}
            className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/4"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70 opacity-0 backdrop-blur transition-opacity duration-200 [transition-timing-function:var(--ease-out)] group-hover:opacity-100 focus:opacity-100"
            >
              Open
            </a>

            <div className="p-3">
              <div className="overflow-hidden rounded-2xl bg-black/25">
                {item.provider === "instagram" ? (
                  <blockquote
                    className="instagram-media m-0 w-full bg-transparent"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{ minHeight: 560 }}
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      View this reel on Instagram
                    </a>
                  </blockquote>
                ) : (
                  <blockquote
                    className="tiktok-embed m-0 w-full"
                    cite={url}
                    data-video-id={url.match(/\/video\/(\d+)\//)?.[1] ?? ""}
                    style={{ minHeight: 560 }}
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Watch on TikTok
                    </a>
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

