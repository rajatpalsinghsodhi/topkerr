 "use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { SocialVideo } from "@/lib/site";

export function VideoGrid({
  items,
  className,
}: {
  items: SocialVideo[];
  className?: string;
}) {
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [unmuted, setUnmuted] = useState<Record<string, boolean>>({});
  const missingCount = useMemo(
    () => items.filter((v) => broken[v.src]).length,
    [broken, items],
  );

  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((v) => (
        <div
          key={v.src}
          className="overflow-hidden rounded-3xl border border-white/12 bg-white/4"
        >
          <div className="relative aspect-[9/16]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(540px_280px_at_20%_25%,rgba(255,214,138,0.18),transparent_60%),radial-gradient(520px_260px_at_85%_90%,rgba(156,231,255,0.10),transparent_58%)]"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={v.src}
              poster={v.poster}
              autoPlay
              muted={!unmuted[v.src]}
              loop
              controls={Boolean(unmuted[v.src])}
              playsInline
              preload="metadata"
              onClick={(e) => {
                if (broken[v.src]) return;
                const next = !unmuted[v.src];
                setUnmuted((s) => ({ ...s, [v.src]: next }));
                // Try to keep playback continuous when toggling sound.
                // (Autoplay requires muted on most browsers; user click qualifies.)
                try {
                  e.currentTarget.muted = !next;
                  void e.currentTarget.play();
                } catch {
                  // ignore
                }
              }}
              onError={() => setBroken((s) => ({ ...s, [v.src]: true }))}
            />

            {!broken[v.src] && !unmuted[v.src] ? (
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70 backdrop-blur">
                Tap for sound
              </div>
            ) : null}

            {broken[v.src] ? (
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="rounded-2xl border border-white/12 bg-black/45 px-4 py-4 text-center backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Missing video file
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Add{" "}
                    <span className="text-white/90">
                      {`/public${v.src}`}
                    </span>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="px-4 py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">
              {v.label}
            </p>
          </div>
        </div>
      ))}

      {missingCount > 0 ? (
        <div className="md:col-span-3 rounded-3xl border border-white/12 bg-white/4 p-6">
          <p className="text-sm text-white/85">Why you’re seeing blanks</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Social embeds can’t be “video-only” (they always include likes/comments).
            This section uses self-hosted MP4s. Add the missing files under{" "}
            <span className="text-white/80">`public/social/`</span>.
          </p>
        </div>
      ) : null}
    </div>
  );
}

