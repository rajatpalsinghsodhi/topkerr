import { Container } from "@/components/site/Container";
import { SocialWall } from "@/components/site/SocialWall";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { socialEmbeds } from "@/lib/site";

const googlePhotos = [
  {
    src: "https://lh3.googleusercontent.com/p/AF1QipMF-pSEngSWYksrcTNoo7Gh6Qg7jctJGSCQH_6w=w1600-h1067-k-no",
    label: "Sneaker wall",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFgSNSFuv7Omkb9eXFdfYtF2PiT6jc7cCdSJyOzmyPQTkWbfKavZOqZigq1dNcKhUhwo0n68UiAfDFV1g2TyUWL26ol5S0h5BwfwmV69e9n5Qq7jtonxWnDrv-9K436XkgFJJ9LAQ=w1200-h1600-k-no",
    label: "Shop floor",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGiRpXE5Ts64--Qs7MFovSJrNRDokIShgoTfkb5IgXWZRR0fzzsrWYn_D3BlSwU2TD--1XatIhnJ_YZ4xRO1Z3F1ElUNN3UxNSCy2nFy46Opz3a5Z0n1cyyzuzZ5JknSkLJVtF7=w1000-h2273-k-no",
    label: "Cut in progress",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEY6jbC-i0eEhP2x0ZSKHxBo6Jh9KStPMB9wvcdt3xwFDERUxUZ0VYE1SbMIvx8_7pxtYC_uYg_RdY8yb-rpQGJjQl0JY6v0mM6oIMSkHz4-urGPvtPsb6aSJfVI0wOs9BpkOk=w1200-h1600-k-no",
    label: "Fresh taper",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE-I1dSCWep1rkcfI2ea4VV8f2Wn7iH7UE7n5hc3MsdH45I-mF3Tbdw61_4PaNzsOFx2h-arG07ikBajC4O6l6nhkzGNVLuttQydPsRtg7Ovpw146gp85bHdfCQTRnnmrIrfqA=w1000-h2273-k-no",
    label: "Detail work",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHqRMhVL-Sj_AVbpsWlCPgZ_H9vu9JvlDFS6YxezqWUmCaPWd7b2t59uEngNqQEYmHNrfn65iIC8B6LkFJ0UnFfsRTRogYezihkleHlsRK3UbmAMY94PM2QI_TAmx0SGrirMu_KRw=w1200-h1600-k-no",
    label: "Chair view",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFV1_thmfRsLzuEcZcOC3phNjzkvpOkKPinzVzzVFk4KTOh3odPc2rCDgjFf755IOsiFDDsuBMojCBfIU-HwoE1q2Chx0ALTzVpwkIoxaKr0MJplCYdjZXbKuQSJGRlDIMQxelMCw=w1400-h1088-k-no",
    label: "Shop detail",
  },
  {
    src: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFmrCbp9hTuUIiaRdSQqG35ap6x3vBAsW8dl3Z6UIX-KyPKs_iNHm9rChBfyAtUzXsst7Pw4468Jt2VBRpXKWHwsLaODFaQfQT8Qd6C5LGKLN4MUuoNv1Mpv7FERySOn9SU1zK7=w1200-h1600-k-no",
    label: "Cut detail",
  },
];

const photoHeights = [
  "h-[190px] md:h-[430px]",
  "h-[270px] md:h-[560px]",
  "h-[320px] md:h-[660px]",
  "h-[230px] md:h-[500px]",
  "h-[300px] md:h-[620px]",
  "h-[220px] md:h-[470px]",
  "h-[210px] md:h-[420px]",
  "h-[240px] md:h-[480px]",
];

function getPhotoHeight(index: number) {
  return photoHeights[index % photoHeights.length];
}

export default function GalleryPage() {
  return (
    <main className="grain topo">
      <Container className="py-14 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1
              className="text-4xl tracking-[-0.03em] text-white md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gallery
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/60 md:text-base">
              Drop in your best cut photos and shop shots here. This layout is
              built to look premium even with a mix of angles.
            </p>
          </div>
          <Button variant="ghost" href="/locations" className="w-fit">
            Book a cut
          </Button>
        </div>

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--gold))]">
              Google Business Photos
            </p>
            <h2
              className="mt-3 text-3xl tracking-[-0.02em] text-white md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Real cuts. Real shop energy.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              A tighter edit from the public Google Business Profile, arranged
              like a premium lookbook instead of a plain photo dump.
            </p>
          </div>
          <Button
            variant="ghost"
            href="https://www.google.com/maps/place/Toptier+Kerr/@43.4407276,-79.6783522,16z/data=!3m1!4b1!4m6!3m5!1s0x882b5d5a63649d99:0xd17025efdb445aad!8m2!3d43.4407237!4d-79.6757773!16s%2Fg%2F11pcbc4zn5?entry=ttu"
            className="w-fit"
          >
            Open Google photos
          </Button>
        </div>

        <div className="mt-8 columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
          {googlePhotos.map((photo, index) => (
            <div
              key={photo.src}
              className={cn(
                "group relative break-inside-avoid overflow-hidden rounded-3xl border border-white/12 bg-white/4 shadow-2xl shadow-black/20",
                "transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:border-[color:var(--accent)]",
                getPhotoHeight(index),
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`Top Tier Kerr Google photo: ${photo.label}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                src={photo.src}
                loading={index === 0 ? "eager" : "lazy"}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 opacity-90" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-white/12 bg-white/4 p-5 text-sm leading-6 text-white/60">
          These are direct public Google-hosted photo assets from the business
          profile. A production build should eventually move these into the
          site’s own media library or Google Places Photos API for long-term
          reliability.
        </div>

        <div className="mt-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              className="text-3xl tracking-[-0.02em] text-white md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Social highlights
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Latest from social.
            </p>
          </div>
          <Button variant="ghost" href="/locations" className="w-fit">
            Book now
          </Button>
        </div>

        <SocialWall className="mt-8" items={socialEmbeds} />

        <div className="mt-12 rounded-3xl border border-white/12 bg-white/4 p-6">
          <p className="text-sm text-white/85">Pro tip</p>
          <p className="mt-2 text-sm leading-6 text-white/60">
            The best performing gallery mix: 70% cuts (close-ups + side profile),
            20% shop vibe, 10% “kicks” details.
          </p>
        </div>
      </Container>
    </main>
  );
}

