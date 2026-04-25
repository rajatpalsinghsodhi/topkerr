import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/site";

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

function avatarStyle(seed: string) {
  const h = hashString(seed);
  const a = 30 + (h % 40);
  const b = 200 + ((h >> 8) % 55);
  const c = 170 + ((h >> 16) % 70);

  const hue1 = a;
  const hue2 = (a + 35) % 360;
  const hue3 = (a + 210) % 360;

  return {
    backgroundImage: `radial-gradient(80px 60px at 30% 30%, hsla(${hue1}, 90%, 70%, 0.55), transparent 70%),
radial-gradient(90px 70px at 70% 65%, hsla(${hue2}, 95%, 66%, 0.42), transparent 72%),
radial-gradient(120px 90px at 45% 85%, hsla(${hue3}, 90%, 62%, 0.28), transparent 70%),
linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
    boxShadow: `0 0 0 1px rgba(255,255,255,0.12) inset, 0 16px 40px rgba(0,0,0,0.45)`,
    filter: `saturate(${(b / 255).toFixed(2)}) contrast(${(c / 200).toFixed(2)})`,
  } as const;
}

function initials(label: string) {
  const parts = label
    .replace(/["""]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const a = parts[0]?.[0] ?? "T";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          aria-hidden
          fill={i < count ? "var(--accent)" : "none"}
          stroke={i < count ? "var(--accent)" : "rgba(245,243,238,0.22)"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({
  t,
  className,
}: {
  t: Testimonial;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-white/12 bg-white/4 p-6", className)}>
      <Stars />

      <p className="mt-4 text-sm leading-7 text-white/72">
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mt-5 flex items-center gap-3">
        <div
          aria-hidden
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl"
          style={avatarStyle(t.name)}
        >
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-[11px] font-medium tracking-[0.14em] text-white/80">
              {initials(t.name)}
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-white/85">{t.name}</p>
          <a
            className="mt-0.5 text-[11px] text-white/45 hover:text-white/70 transition-colors"
            href={t.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.sourceLabel} →
          </a>
        </div>
      </div>
    </div>
  );
}
