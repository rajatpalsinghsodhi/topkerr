import { Container } from "@/components/site/Container";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/lib/site";

const stats = [
  { value: "4.9", label: "Average rating", suffix: "/ 5" },
  { value: "500+", label: "Google reviews", suffix: "" },
  { value: "3", label: "Oakville locations", suffix: "" },
];

const themes = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--accent)" opacity="0.9" />
      </svg>
    ),
    title: "Consistently clean cuts",
    body: "Clients come back for the detail work — fades that blend, lines that hold.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Great with kids",
    body: "Patient, calm barbers. Multiple reviews mention kids who were nervous but left happy.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Genuine connection",
    body: "Barbers remember your name, your style, your story. People feel like regulars from visit one.",
  },
];

function StarRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden
          fill={i < rating ? "var(--accent)" : "none"}
          stroke={i < rating ? "var(--accent)" : "rgba(245,243,238,0.18)"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main className="grain topo">
      <Container className="py-14 md:py-20">

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/35 p-8 md:p-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-10 top-0 h-80 w-80 rounded-full bg-[color:var(--glow)] blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-[rgba(156,231,255,0.12)] blur-3xl" />
          </div>

          <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.32em] text-white/50">
                Customer reviews
              </p>
              <h1
                className="mt-3 text-4xl tracking-[-0.03em] text-white md:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What clients say.
              </h1>
              <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
                Hundreds of verified Google reviews. Consistent quality across all three locations.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button href="/booking">Book now</Button>
                <Button
                  variant="ghost"
                  href="https://www.google.com/search?q=Top+Tier+Company+Oakville+reviews"
                >
                  View on Google
                </Button>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-3xl border border-[rgba(255,214,138,0.25)] bg-[rgba(255,214,138,0.05)] p-6">
                <div className="flex items-end gap-3">
                  <span
                    className="text-7xl leading-none tracking-[-0.04em] text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    4.9
                  </span>
                  <div className="mb-1">
                    <StarRow rating={5} />
                    <p className="mt-1.5 text-xs text-white/50">out of 5</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/60">
                  Based on <span className="text-white/85">500+ Google reviews</span> across Kerr, Preserve, and Bronte.
                </p>

                {/* Google badge */}
                <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-xs text-white/65">Verified Google Business reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-white/12 bg-white/4 px-5 py-4 text-center"
            >
              <p
                className="text-3xl tracking-[-0.03em] text-white md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
                {s.suffix ? (
                  <span className="text-lg text-white/45">{s.suffix}</span>
                ) : null}
              </p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.20em] text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h2
            className="text-3xl tracking-[-0.02em] text-white md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From real clients.
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Excerpts from public Google reviews — unedited.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>

        {/* Theme highlights */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {themes.map((th) => (
            <div
              key={th.title}
              className="rounded-3xl border border-white/12 bg-white/4 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/5">
                {th.icon}
              </div>
              <p className="mt-4 text-sm font-medium text-white/90">{th.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">{th.body}</p>
            </div>
          ))}
        </div>

        {/* Leave a review CTA */}
        <div className="mt-10 flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/12 bg-white/4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-white/85">Had a great experience?</p>
            <p className="mt-1 text-sm leading-6 text-white/55">
              A Google review takes 30 seconds and helps the shop enormously.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button href="https://www.google.com/search?q=Top+Tier+Company+Oakville+reviews">
              Leave a Google review
            </Button>
            <Button variant="ghost" href="/booking">
              Book again
            </Button>
          </div>
        </div>

      </Container>
    </main>
  );
}
