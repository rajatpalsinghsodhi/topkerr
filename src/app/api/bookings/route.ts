import { NextRequest, NextResponse } from "next/server";
import {
  createBooking,
  getAllBookings,
  type CreateBookingInput,
} from "@/lib/bookings";

export async function GET() {
  const bookings = getAllBookings();
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  let body: CreateBookingInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required: (keyof CreateBookingInput)[] = [
    "locationSlug",
    "barberId",
    "barberName",
    "serviceTitle",
    "date",
    "time",
    "name",
    "phone",
    "email",
  ];

  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 422 },
      );
    }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body.email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 422 },
    );
  }

  const booking = createBooking(body);
  return NextResponse.json({ booking }, { status: 201 });
}
