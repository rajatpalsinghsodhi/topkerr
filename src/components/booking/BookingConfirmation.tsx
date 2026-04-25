"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Booking } from "@/lib/bookings";

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BookingConfirmation() {
  const params = useSearchParams();
  const id = params.get("id");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      Promise.resolve().then(() => {
        setError("No booking ID found.");
        setLoading(false);
      });
      return;
    }
    fetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.booking) setBooking(data.booking);
        else setError(data.error ?? "Booking not found.");
      })
      .catch(() => setError("Failed to load booking."))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-24 text-center text-white/50">
        Loading your confirmation…
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-[rgba(255,100,100,0.35)] bg-[rgba(255,60,60,0.06)] p-8 text-center">
          <p className="text-white/80">{error ?? "Something went wrong."}</p>
          <div className="mt-5">
            <Button href="/booking">Try booking again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Success hero */}
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(255,214,138,0.35)] bg-[rgba(255,214,138,0.06)] p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[color:var(--glow)] blur-3xl" />
        </div>
        <div className="relative text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,214,138,0.4)] bg-[rgba(255,214,138,0.12)]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1
            className="mt-5 text-3xl tracking-[-0.03em] text-white md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"You're booked."}
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Your appointment is confirmed. See you soon at Top Tier.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/65">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_0_5px_rgba(255,214,138,0.15)]"
            />
            Booking confirmed · {booking.id}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 rounded-3xl border border-white/12 bg-black/35 divide-y divide-white/8">
        {[
          { label: "Shop", value: booking.locationSlug.charAt(0).toUpperCase() + booking.locationSlug.slice(1) },
          { label: "Barber", value: booking.barberName },
          { label: "Service", value: booking.serviceTitle },
          { label: "Date", value: formatDate(booking.date) },
          { label: "Time", value: booking.time },
          { label: "Name", value: booking.name },
          { label: "Phone", value: booking.phone },
          { label: "Email", value: booking.email },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-4 px-6 py-3.5">
            <span className="text-sm text-white/50">{label}</span>
            <span className="text-sm text-white/85">{value}</span>
          </div>
        ))}
        {booking.notes?.trim() ? (
          <div className="px-6 py-3.5">
            <span className="text-sm text-white/50">Notes</span>
            <p className="mt-1 text-sm text-white/72">{booking.notes}</p>
          </div>
        ) : null}
      </div>

      {/* What's next */}
      <div className="mt-5 rounded-3xl border border-white/12 bg-white/4 p-6">
        <p className="text-sm font-medium text-white/85">Before you arrive</p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/60">
          <li className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
            />
            Arrive 5 minutes early so your appointment stays on time.
          </li>
          <li className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
            />
            Call the shop if you need to reschedule or cancel.
          </li>
          <li className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
            />
            Reference your booking ID if you call: <strong className="text-white/75">{booking.id}</strong>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button variant="ghost" href="/booking">
          Book again
        </Button>
        <Link
          href="/locations"
          className={cn(
            "inline-flex items-center self-center text-sm text-white/60 hover:text-white transition-colors",
          )}
        >
          Location details →
        </Link>
      </div>
    </div>
  );
}
