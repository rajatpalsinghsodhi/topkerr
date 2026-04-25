import { Suspense } from "react";
import { Container } from "@/components/site/Container";
import { BookingOnboardingLoader } from "@/components/booking/BookingOnboardingLoader";

export default function BookingPage() {
  return (
    <main className="grain topo">
      <Container className="py-12 md:py-16">
        <Suspense fallback={null}>
          <BookingOnboardingLoader />
        </Suspense>
      </Container>
    </main>
  );
}
