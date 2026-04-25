import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/site";

export default function ServicesPage() {
  return (
    <main className="grain topo">
      <Container className="py-14 md:py-20">
        <div className="max-w-2xl">
          <h1
            className="text-4xl tracking-[-0.03em] text-white md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Services
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
            Clean blends, crisp edges, and detail work that holds up. Book by
            location to see current availability.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button href="/locations">Book by location</Button>
            <Button variant="ghost" href="/contact">
              Ask about a service
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/12 bg-white/4 p-6"
            >
              <p className="text-sm text-white/90">{s.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/12 bg-white/4 p-6">
          <p className="text-sm text-white/85">Pricing</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Pricing and service durations can vary by barber and location.
            You’ll see the latest options when you book.
          </p>
        </div>
      </Container>
    </main>
  );
}

