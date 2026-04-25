import { Container } from "@/components/site/Container";
import { Button } from "@/components/ui/Button";

const highlights = [
  {
    title: "Consistently clean cuts",
    body: "Detailed fades, sharp line-ups, and a finish that stays crisp.",
  },
  {
    title: "No-rush energy",
    body: "Professional barbers who listen and take the time to get it right.",
  },
  {
    title: "Great vibe",
    body: "Clean, modern shop atmosphere—premium without feeling stiff.",
  },
];

export default function ReviewsPage() {
  return (
    <main className="grain topo">
      <Container className="py-14 md:py-20">
        <div className="max-w-2xl">
          <h1
            className="text-4xl tracking-[-0.03em] text-white md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reviews
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
            Top Tier is rated around <span className="text-white/80">4.9★</span>{" "}
            with hundreds of Google reviews. Here’s what people mention most.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button href="/locations">Book now</Button>
            <Button
              variant="ghost"
              href="https://www.google.com/search?q=Top+Tier+Company+Oakville+reviews"
            >
              View on Google
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-3xl border border-white/12 bg-white/4 p-6"
            >
              <p className="text-sm text-white/90">{h.title}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">{h.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/12 bg-white/4 p-6">
          <p className="text-sm text-white/85">Want to leave a review?</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            If you had a great experience, leaving a Google review helps a ton.
          </p>
          <div className="mt-4">
            <Button href="https://www.google.com/search?q=Top+Tier+Company+Oakville+reviews">
              Leave a Google review
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

