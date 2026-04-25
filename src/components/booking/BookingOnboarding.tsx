"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  locations,
  services,
  barbers,
  type LocationSlug,
} from "@/lib/site";

// ─── Types ───────────────────────────────────────────────────────────────────

type StepId = "location" | "barber" | "service" | "time" | "details" | "confirm";

type BookingDraft = {
  locationSlug?: LocationSlug;
  barberId?: string;
  barberName?: string;
  serviceTitle?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

// ─── Step config ─────────────────────────────────────────────────────────────

const STEPS: { id: StepId; label: string; helper: string }[] = [
  { id: "location", label: "Shop", helper: "Choose a location" },
  { id: "barber", label: "Barber", helper: "Pick your barber" },
  { id: "service", label: "Service", helper: "Select what you need" },
  { id: "time", label: "Time", helper: "Pick a day and slot" },
  { id: "details", label: "Details", helper: "Your contact info" },
  { id: "confirm", label: "Confirm", helper: "Review and book" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function makeUpcomingDays(count = 14) {
  const out: { key: string; label: string; short: string; isToday: boolean }[] = [];
  const base = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    out.push({
      key,
      label: d.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      short: d.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
      }),
      isToday: i === 0,
    });
  }
  return out;
}

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:30 PM",
  "7:00 PM",
] as const;

// ─── Primitive components ─────────────────────────────────────────────────────

function SectionCard({
  title,
  subtitle,
  badge,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-black/35 p-6 md:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-[color:var(--glow)] blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[rgba(156,231,255,0.10)] blur-3xl" />
      </div>
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {badge ? (
              <p className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-white/60">
                <span className="h-1 w-1 rounded-full bg-[color:var(--accent)]" aria-hidden />
                {badge}
              </p>
            ) : null}
            <h1
              className="mt-3 text-3xl tracking-[-0.03em] text-white md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                {subtitle}
              </p>
            ) : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function MiniSummary({ draft }: { draft: BookingDraft }) {
  const loc = locations.find((l) => l.slug === draft.locationSlug);
  if (!loc && !draft.serviceTitle) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {loc ? (
        <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70">
          {loc.name}
        </span>
      ) : null}
      {draft.barberName ? (
        <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70">
          {draft.barberName}
        </span>
      ) : null}
      {draft.serviceTitle ? (
        <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70">
          {draft.serviceTitle}
        </span>
      ) : null}
      {draft.date && draft.time ? (
        <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70">
          {draft.date} · {draft.time}
        </span>
      ) : null}
    </div>
  );
}

function Stepper({
  steps,
  activeIndex,
  maxReachable,
  onGoTo,
}: {
  steps: typeof STEPS;
  activeIndex: number;
  maxReachable: number;
  onGoTo: (i: number) => void;
}) {
  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => {
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;
          const isReachable = i <= maxReachable;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => (isReachable ? onGoTo(i) : undefined)}
              disabled={!isReachable}
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.18em]",
                "transition-[background-color,border-color,opacity] duration-150 [transition-timing-function:var(--ease-out)]",
                !isReachable && "cursor-not-allowed opacity-40",
                isActive
                  ? "border-[color:var(--accent)] bg-[rgba(255,214,138,0.10)] text-white"
                  : isReachable
                    ? "cursor-pointer border-white/12 bg-white/4 text-white/65 hover:border-white/20 hover:bg-white/7"
                    : "border-white/8 bg-transparent text-white/35",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]",
                  isActive
                    ? "border-[color:var(--accent)] text-white"
                    : isDone
                      ? "border-[rgba(255,214,138,0.5)] text-[color:var(--accent)]"
                      : "border-white/15 text-white/50",
                )}
              >
                {isDone ? "✓" : i + 1}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-white/50">{steps[activeIndex]?.helper}</p>
    </div>
  );
}

function OptionCard({
  title,
  description,
  meta,
  badge,
  selected,
  onSelect,
}: {
  title: string;
  description?: string;
  meta?: string;
  badge?: string;
  selected?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl border p-5 text-left",
        "transition-[transform,background-color,border-color] duration-200 [transition-timing-function:var(--ease-out)]",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        selected
          ? "border-[color:var(--accent)] bg-[rgba(255,214,138,0.07)]"
          : "border-white/12 bg-white/4 hover:border-white/20 hover:bg-white/6",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 [transition-timing-function:var(--ease-out)] group-hover:opacity-100",
          selected ? "bg-[color:var(--glow)] opacity-60 blur-3xl" : "bg-white/6 blur-2xl",
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-white/90">{title}</p>
            {description ? (
              <p className="mt-1.5 text-sm leading-6 text-white/58">{description}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {badge ? (
              <span className="rounded-full border border-[color:var(--accent)] bg-[rgba(255,214,138,0.10)] px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
                {badge}
              </span>
            ) : null}
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.18em]",
                selected
                  ? "border-[color:var(--accent)] bg-[rgba(255,214,138,0.14)] text-white"
                  : "border-white/12 bg-white/5 text-white/60",
              )}
            >
              {selected ? "selected" : "select"}
            </span>
          </div>
        </div>
        {meta ? (
          <p className="mt-3 text-xs uppercase tracking-[0.20em] text-white/42">{meta}</p>
        ) : null}
      </div>
    </button>
  );
}

function Field({
  label,
  hint,
  required,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  inputMode,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-4">
        <span className="text-xs uppercase tracking-[0.22em] text-white/55">
          {label}{" "}
          {required ? <span className="text-[color:var(--accent)]">*</span> : null}
        </span>
        {hint ? <span className="text-xs text-white/42">{hint}</span> : null}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        className={cn(
          "mt-2 w-full rounded-2xl border bg-white/4 px-4 py-3 text-sm text-white/90 placeholder:text-white/32",
          "transition-[border-color] duration-150 [transition-timing-function:var(--ease-out)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          error
            ? "border-[rgba(255,110,110,0.55)] bg-[rgba(255,60,60,0.05)] focus:border-[rgba(255,110,110,0.75)]"
            : "border-white/12 hover:border-white/20 focus:border-[color:var(--accent)]",
        )}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-[rgba(255,160,160,0.9)]">{error}</p>
      ) : null}
    </label>
  );
}

function NavRow({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  loading,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      <div>
        {onBack ? (
          <Button variant="ghost" onClick={onBack} type="button">
            ← Back
          </Button>
        ) : null}
      </div>
      <Button onClick={onNext} type="button" disabled={nextDisabled || loading}>
        {loading ? "Booking…" : nextLabel}
      </Button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BookingOnboarding({
  prefillLocation,
}: {
  prefillLocation?: LocationSlug;
}) {
  const router = useRouter();
  const days = useMemo(() => makeUpcomingDays(14), []);

  const [draft, setDraft] = useState<BookingDraft>({
    locationSlug: prefillLocation,
  });
  const [activeIndex, setActiveIndex] = useState(prefillLocation ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // The furthest step the user is allowed to navigate back to
  const maxReachable = useMemo(() => {
    if (!draft.locationSlug) return 0;
    if (!draft.barberId) return 1;
    if (!draft.serviceTitle) return 2;
    if (!draft.date || !draft.time) return 3;
    if (!draft.name || !draft.phone || !draft.email) return 4;
    return 5;
  }, [draft]);

  const activeStep = STEPS[activeIndex]?.id ?? "location";

  const loc = useMemo(
    () => locations.find((l) => l.slug === draft.locationSlug),
    [draft.locationSlug],
  );

  const locationBarbers = useMemo(
    () => barbers.filter((b) => b.locationSlug === draft.locationSlug),
    [draft.locationSlug],
  );

  const detailErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (activeStep !== "details" && activeStep !== "confirm") return e;
    if (!draft.name?.trim()) e.name = "Required.";
    if (!draft.phone?.trim()) e.phone = "Required.";
    if (draft.email && !isValidEmail(draft.email)) e.email = "Enter a valid email.";
    if (!draft.email?.trim()) e.email = "Required.";
    return e;
  }, [activeStep, draft]);

  const canContinue = useMemo(() => {
    if (activeStep === "location") return !!draft.locationSlug;
    if (activeStep === "barber") return !!draft.barberId;
    if (activeStep === "service") return !!draft.serviceTitle;
    if (activeStep === "time") return !!draft.date && !!draft.time;
    if (activeStep === "details")
      return !!draft.name?.trim() && !!draft.phone?.trim() && !!draft.email?.trim() && !Object.keys(detailErrors).length;
    return true;
  }, [activeStep, detailErrors, draft]);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(Math.max(0, Math.min(STEPS.length - 1, idx)));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  function next() {
    if (canContinue) goTo(activeIndex + 1);
  }
  function back() {
    goTo(activeIndex - 1);
  }

  async function submitBooking() {
    setSubmitError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationSlug: draft.locationSlug,
          barberId: draft.barberId,
          barberName: draft.barberName,
          serviceTitle: draft.serviceTitle,
          date: draft.date,
          time: draft.time,
          name: draft.name,
          phone: draft.phone,
          email: draft.email,
          notes: draft.notes ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.push(`/booking/confirmation?id=${data.booking.id}`);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={topRef} className="mx-auto max-w-5xl scroll-mt-24">
      <Stepper
        steps={STEPS}
        activeIndex={activeIndex}
        maxReachable={maxReachable}
        onGoTo={goTo}
      />

      {/* ── Step 1: Location ── */}
      {activeStep === "location" ? (
        <SectionCard
          badge="Step 1 of 6"
          title="Choose your shop."
          subtitle="Three Oakville locations. Same standards everywhere."
          right={
            <Link href="/locations" className="text-sm text-white/60 hover:text-white transition-colors">
              Location details →
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {locations.map((l) => (
              <OptionCard
                key={l.slug}
                title={`${l.name}`}
                description={`${l.addressLine1}, ${l.addressLine2}`}
                meta={l.hours[0]?.value}
                badge={l.neighborhoodLabel}
                selected={draft.locationSlug === l.slug}
                onSelect={() =>
                  setDraft((d) => ({
                    ...d,
                    locationSlug: l.slug,
                    barberId: undefined,
                    barberName: undefined,
                  }))
                }
              />
            ))}
          </div>
          <NavRow onNext={next} nextDisabled={!canContinue} />
        </SectionCard>
      ) : null}

      {/* ── Step 2: Barber ── */}
      {activeStep === "barber" ? (
        <SectionCard
          badge="Step 2 of 6"
          title="Pick your barber."
          subtitle="All barbers at this shop — same quality, different styles."
          right={
            <div className="rounded-2xl border border-white/12 bg-white/4 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">Shop</p>
              <p className="mt-1 text-sm text-white/85">{loc?.name} · {loc?.neighborhoodLabel}</p>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {locationBarbers.map((b) => (
              <OptionCard
                key={b.id}
                title={b.name}
                description={b.bio}
                badge={b.title}
                selected={draft.barberId === b.id}
                onSelect={() => setDraft((d) => ({ ...d, barberId: b.id, barberName: b.name }))}
              />
            ))}
          </div>
          <NavRow onBack={back} onNext={next} nextDisabled={!canContinue} />
        </SectionCard>
      ) : null}

      {/* ── Step 3: Service ── */}
      {activeStep === "service" ? (
        <SectionCard
          badge="Step 3 of 6"
          title="What are you booking?"
          subtitle="Pick the service that fits. You can add notes later."
          right={<MiniSummary draft={draft} />}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <OptionCard
                key={s.title}
                title={s.title}
                description={s.description}
                selected={draft.serviceTitle === s.title}
                onSelect={() => setDraft((d) => ({ ...d, serviceTitle: s.title }))}
              />
            ))}
          </div>
          <NavRow onBack={back} onNext={next} nextDisabled={!canContinue} />
        </SectionCard>
      ) : null}

      {/* ── Step 4: Date & Time ── */}
      {activeStep === "time" ? (
        <SectionCard
          badge="Step 4 of 6"
          title="Pick a day and time."
          subtitle="Choose from the next 14 days and an available slot."
          right={<MiniSummary draft={draft} />}
        >
          <div className="grid gap-6 md:grid-cols-12">
            {/* Day picker */}
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">Day</p>
              <div className="mt-3 grid gap-1.5">
                {days.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() =>
                      setDraft((s) => ({ ...s, day: d.key, date: d.key, time: undefined }))
                    }
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-4 py-2.5 text-left text-sm",
                      "transition-[background-color,border-color,transform] duration-150 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      draft.date === d.key
                        ? "border-[color:var(--accent)] bg-[rgba(255,214,138,0.08)] text-white"
                        : "border-white/12 bg-white/4 text-white/72 hover:border-white/20 hover:bg-white/6",
                    )}
                  >
                    <span>{d.label}</span>
                    {d.isToday ? (
                      <span className="rounded-full bg-[rgba(255,214,138,0.15)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                        today
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* Time picker */}
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                Time slots
                {!draft.date ? (
                  <span className="ml-2 text-white/38 normal-case tracking-normal">
                    — pick a day first
                  </span>
                ) : null}
              </p>
              <div
                className={cn(
                  "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
                  !draft.date && "pointer-events-none opacity-40",
                )}
              >
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    disabled={!draft.date}
                    onClick={() => setDraft((s) => ({ ...s, time: t }))}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-sm",
                      "transition-[background-color,border-color,transform] duration-150 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      draft.time === t
                        ? "border-[color:var(--accent)] bg-[rgba(255,214,138,0.08)] text-white"
                        : "border-white/12 bg-white/4 text-white/72 hover:border-white/20 hover:bg-white/6",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <NavRow onBack={back} onNext={next} nextDisabled={!canContinue} />
        </SectionCard>
      ) : null}

      {/* ── Step 5: Details ── */}
      {activeStep === "details" ? (
        <SectionCard
          badge="Step 5 of 6"
          title="Your details."
          subtitle="So we can attach the booking to you. No spam, ever."
          right={<MiniSummary draft={draft} />}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Full name"
              required
              value={draft.name ?? ""}
              onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
              placeholder="Your name"
              error={detailErrors.name}
            />
            <Field
              label="Phone"
              required
              value={draft.phone ?? ""}
              onChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
              placeholder="+1 (905) 000-0000"
              inputMode="tel"
              error={detailErrors.phone}
            />
            <Field
              label="Email"
              required
              value={draft.email ?? ""}
              onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
              placeholder="you@example.com"
              type="email"
              inputMode="email"
              error={detailErrors.email}
            />
            <label className="block md:col-span-2">
              <span className="text-xs uppercase tracking-[0.22em] text-white/55">
                Notes{" "}
                <span className="text-white/38 normal-case tracking-normal">(optional)</span>
              </span>
              <textarea
                value={draft.notes ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
                placeholder="Hair length, beard goals, sensory notes, anything we should know…"
                rows={3}
                className={cn(
                  "mt-2 w-full resize-y rounded-2xl border border-white/12 bg-white/4 px-4 py-3 text-sm text-white/90 placeholder:text-white/32",
                  "transition-[border-color] duration-150 [transition-timing-function:var(--ease-out)]",
                  "hover:border-white/20 focus:border-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                )}
              />
            </label>
          </div>
          <NavRow onBack={back} onNext={next} nextDisabled={!canContinue} />
        </SectionCard>
      ) : null}

      {/* ── Step 6: Confirm ── */}
      {activeStep === "confirm" ? (
        <SectionCard
          badge="Step 6 of 6"
          title="Looks good?"
          subtitle="Review your booking below, then hit confirm. We'll lock it in."
          right={
            <Button variant="ghost" type="button" onClick={() => goTo(0)}>
              Start over
            </Button>
          }
        >
          <div className="grid gap-6 md:grid-cols-12">
            {/* Summary card */}
            <div className="md:col-span-7">
              <div className="rounded-3xl border border-white/12 bg-white/4 divide-y divide-white/8">
                {[
                  {
                    label: "Shop",
                    value: loc ? `${loc.name} — ${loc.neighborhoodLabel}` : "—",
                    step: 0,
                  },
                  { label: "Barber", value: draft.barberName ?? "—", step: 1 },
                  { label: "Service", value: draft.serviceTitle ?? "—", step: 2 },
                  {
                    label: "Date",
                    value: draft.date
                      ? new Date(draft.date + "T12:00:00").toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : "—",
                    step: 3,
                  },
                  { label: "Time", value: draft.time ?? "—", step: 3 },
                  { label: "Name", value: draft.name ?? "—", step: 4 },
                  { label: "Phone", value: draft.phone ?? "—", step: 4 },
                  { label: "Email", value: draft.email ?? "—", step: 4 },
                ].map(({ label, value, step }) => (
                  <div key={label} className="flex items-center justify-between gap-4 px-5 py-3">
                    <span className="text-sm text-white/50">{label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white/88">{value}</span>
                      <button
                        type="button"
                        onClick={() => goTo(step)}
                        className="text-xs text-white/38 hover:text-[color:var(--accent)] transition-colors focus-visible:outline-none"
                      >
                        edit
                      </button>
                    </div>
                  </div>
                ))}
                {draft.notes?.trim() ? (
                  <div className="px-5 py-3">
                    <p className="text-sm text-white/50">Notes</p>
                    <p className="mt-1 text-sm text-white/75">{draft.notes}</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* CTA card */}
            <div className="md:col-span-5">
              <div className="sticky top-24 rounded-3xl border border-white/12 bg-black/40 p-6">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
                  Ready to book
                </p>
                <p className="mt-3 text-base text-white/80 leading-6">
                  Hit confirm and your appointment will be locked in instantly.
                </p>

                {submitError ? (
                  <div className="mt-4 rounded-2xl border border-[rgba(255,100,100,0.4)] bg-[rgba(255,60,60,0.06)] px-4 py-3 text-sm text-[rgba(255,180,180,0.9)]">
                    {submitError}
                  </div>
                ) : null}

                <div className="mt-5 grid gap-2">
                  <Button
                    type="button"
                    onClick={submitBooking}
                    disabled={loading}
                  >
                    {loading ? "Booking…" : "Confirm booking"}
                  </Button>
                  <Button variant="ghost" type="button" onClick={back}>
                    ← Back
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-5 text-white/38">
                  Questions? Call the shop directly or{" "}
                  <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
