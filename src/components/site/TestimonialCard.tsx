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
    .replace(/[“”"]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const a = parts[0]?.[0] ?? "T";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
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
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl"
          style={avatarStyle(t.name)}
        >
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-xs font-medium tracking-[0.18em] text-white/80">
              {initials(t.name)}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-sm leading-6 text-white/70">“{t.quote}”</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">
              {t.name}
            </p>
            <a
              className="text-xs text-white/60 hover:text-white transition-colors"
              href={t.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.sourceLabel} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

