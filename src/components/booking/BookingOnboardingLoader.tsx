"use client";

import { useSearchParams } from "next/navigation";
import { BookingOnboarding } from "@/components/booking/BookingOnboarding";
import type { LocationSlug } from "@/lib/site";

const VALID_SLUGS: LocationSlug[] = ["kerr", "preserve", "bronte"];

export function BookingOnboardingLoader() {
  const params = useSearchParams();
  const raw = params.get("location");
  const prefill = VALID_SLUGS.includes(raw as LocationSlug)
    ? (raw as LocationSlug)
    : undefined;
  return <BookingOnboarding prefillLocation={prefill} />;
}
