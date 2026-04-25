import { Suspense } from "react";
import { Container } from "@/components/site/Container";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

export default function BookingConfirmationPage() {
  return (
    <main className="grain topo">
      <Container className="py-12 md:py-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24 text-white/50">
              Loading confirmation…
            </div>
          }
        >
          <BookingConfirmation />
        </Suspense>
      </Container>
    </main>
  );
}
