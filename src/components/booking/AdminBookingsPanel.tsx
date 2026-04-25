"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Booking, BookingStatus } from "@/lib/bookings";

type Filter = {
  location: string;
  status: BookingStatus | "all";
  search: string;
};

const LOCATION_LABELS: Record<string, string> = {
  kerr: "Kerr",
  preserve: "Preserve",
  bronte: "Bronte",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em]",
        status === "confirmed"
          ? "border-[rgba(100,220,130,0.4)] bg-[rgba(80,200,100,0.08)] text-[rgba(130,230,150,0.95)]"
          : "border-[rgba(255,100,100,0.35)] bg-[rgba(255,60,60,0.06)] text-[rgba(255,170,170,0.85)]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "confirmed" ? "bg-[rgba(100,220,130,0.9)]" : "bg-[rgba(255,120,120,0.8)]",
        )}
      />
      {status}
    </span>
  );
}

function BookingRow({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (id: string) => void;
}) {
  const [cancelling, setCancelling] = useState(false);

  async function handleCancel() {
    if (!confirm(`Cancel booking ${booking.id}?`)) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (res.ok) onCancel(booking.id);
    } finally {
      setCancelling(false);
    }
  }

  const formattedDate = useMemo(
    () =>
      new Date(booking.date + "T12:00:00").toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    [booking.date],
  );

  return (
    <div
      className={cn(
        "rounded-3xl border p-5 transition-[border-color,opacity] duration-200",
        booking.status === "cancelled"
          ? "border-white/8 bg-white/2 opacity-55"
          : "border-white/12 bg-white/4 hover:border-white/18",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-sm text-white/90">{booking.name}</span>
            <span className="text-xs text-white/42">·</span>
            <span className="text-xs uppercase tracking-[0.18em] text-white/50">
              {LOCATION_LABELS[booking.locationSlug] ?? booking.locationSlug}
            </span>
            <span className="text-xs text-white/42">·</span>
            <span className="text-xs text-white/50">{booking.barberName}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/65">
            <span>{booking.serviceTitle}</span>
            <span className="text-white/30">·</span>
            <span>{formattedDate}</span>
            <span className="text-white/30">·</span>
            <span>{booking.time}</span>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/45">
          <a href={`tel:${booking.phone}`} className="hover:text-white transition-colors">
            {booking.phone}
          </a>
          <a href={`mailto:${booking.email}`} className="hover:text-white transition-colors">
            {booking.email}
          </a>
          <span className="font-mono">{booking.id}</span>
        </div>
        {booking.status === "confirmed" ? (
          <button
            type="button"
            onClick={handleCancel}
            disabled={cancelling}
            className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/55 transition-[border-color,color] hover:border-[rgba(255,100,100,0.4)] hover:text-[rgba(255,180,180,0.9)] disabled:opacity-50"
          >
            {cancelling ? "Cancelling…" : "Cancel"}
          </button>
        ) : null}
      </div>

      {booking.notes?.trim() ? (
        <p className="mt-3 rounded-xl border border-white/8 bg-black/20 px-4 py-2.5 text-xs leading-5 text-white/50">
          {booking.notes}
        </p>
      ) : null}
    </div>
  );
}

export function AdminBookingsPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>({
    location: "all",
    status: "all",
    search: "",
  });

  const loadBookings = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data: { bookings?: Booking[] }) => setBookings(data.bookings ?? []))
      .catch(() => setError("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, []);

  // Load on mount — defer via microtask so setState isn't called synchronously inside the effect body
  useEffect(() => {
    const timer = setTimeout(loadBookings, 0);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b)),
    );
  }, []);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (filter.location !== "all" && b.locationSlug !== filter.location) return false;
      if (filter.status !== "all" && b.status !== filter.status) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        if (
          !b.name.toLowerCase().includes(q) &&
          !b.email.toLowerCase().includes(q) &&
          !b.phone.includes(q) &&
          !b.id.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [bookings, filter]);

  const stats = useMemo(() => {
    const confirmed = bookings.filter((b) => b.status === "confirmed").length;
    const cancelled = bookings.filter((b) => b.status === "cancelled").length;
    return { total: bookings.length, confirmed, cancelled };
  }, [bookings]);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-white/50">Admin</p>
          <h1
            className="mt-2 text-3xl tracking-[-0.03em] text-white md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            All bookings.
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadBookings}
            className="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-xs text-white/65 transition-[background-color,border-color] hover:border-white/20 hover:bg-white/7"
          >
            ↺ Refresh
          </button>
          <Button href="/booking" variant="ghost">
            + New booking
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-7 grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: stats.total },
          { label: "Confirmed", value: stats.confirmed },
          { label: "Cancelled", value: stats.cancelled },
        ].map((s) => (
          <div key={s.label} className="rounded-3xl border border-white/12 bg-white/4 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/50">{s.label}</p>
            <p
              className="mt-2 text-3xl tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          value={filter.search}
          onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
          placeholder="Search by name, email, phone, ID…"
          className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-white/4 px-4 py-2.5 text-sm text-white/90 placeholder:text-white/35 focus:border-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.5)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        />
        <select
          value={filter.location}
          onChange={(e) => setFilter((f) => ({ ...f, location: e.target.value }))}
          className="rounded-2xl border border-white/12 bg-[#07070a] px-4 py-2.5 text-sm text-white/80 focus:border-[color:var(--accent)] focus-visible:outline-none"
        >
          <option value="all">All shops</option>
          <option value="kerr">Kerr</option>
          <option value="preserve">Preserve</option>
          <option value="bronte">Bronte</option>
        </select>
        <select
          value={filter.status}
          onChange={(e) =>
            setFilter((f) => ({ ...f, status: e.target.value as BookingStatus | "all" }))
          }
          className="rounded-2xl border border-white/12 bg-[#07070a] px-4 py-2.5 text-sm text-white/80 focus:border-[color:var(--accent)] focus-visible:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* List */}
      <div className="mt-5">
        {loading ? (
          <div className="py-16 text-center text-sm text-white/45">Loading bookings…</div>
        ) : error ? (
          <div className="rounded-3xl border border-[rgba(255,100,100,0.3)] bg-[rgba(255,60,60,0.06)] p-6 text-sm text-[rgba(255,180,180,0.9)]">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/4 py-16 text-center">
            <p className="text-sm text-white/45">
              {bookings.length === 0
                ? "No bookings yet. They'll appear here once someone books."
                : "No bookings match your filters."}
            </p>
            {bookings.length === 0 ? (
              <div className="mt-5">
                <Link href="/booking" className="text-sm text-white/60 hover:text-white transition-colors">
                  Test a booking →
                </Link>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid gap-3">
            <p className="text-xs text-white/38">
              {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
              {filter.search || filter.location !== "all" || filter.status !== "all"
                ? " (filtered)"
                : ""}
            </p>
            {filtered.map((b) => (
              <BookingRow key={b.id} booking={b} onCancel={cancelBooking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
