import type { LocationSlug } from "@/lib/site";

export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  locationSlug: LocationSlug;
  barberId: string;
  barberName: string;
  serviceTitle: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
};

export type CreateBookingInput = Omit<Booking, "id" | "createdAt" | "status">;

declare global {
  var __bookings: Booking[] | undefined;
}

function getStore(): Booking[] {
  if (!global.__bookings) {
    global.__bookings = [];
  }
  return global.__bookings;
}

export function createBooking(input: CreateBookingInput): Booking {
  const booking: Booking = {
    ...input,
    id: `TT-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "confirmed",
  };
  getStore().push(booking);
  return booking;
}

export function getAllBookings(): Booking[] {
  return [...getStore()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getBookingById(id: string): Booking | undefined {
  return getStore().find((b) => b.id === id);
}

export function cancelBooking(id: string): Booking | null {
  const booking = getStore().find((b) => b.id === id);
  if (!booking) return null;
  booking.status = "cancelled";
  return booking;
}
