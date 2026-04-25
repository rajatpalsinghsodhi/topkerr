import { Container } from "@/components/site/Container";
import { AdminBookingsPanel } from "@/components/booking/AdminBookingsPanel";

export default function AdminBookingsPage() {
  return (
    <main className="grain topo">
      <Container className="py-12 md:py-16">
        <AdminBookingsPanel />
      </Container>
    </main>
  );
}
