import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollEffects } from "@/components/site/ScrollEffects";
import type { ReactNode } from "react";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toptiercompany.ca"),
  title: "Top Tier Fades & Kicks | Oakville Barbershop",
  description:
    "Book your next haircut, fade, or beard trim at Top Tier — Oakville’s premium barbershop experience across Kerr, Preserve, and Bronte.",
  icons: {
    icon: "/brand/toptier-logo.png",
    apple: "/brand/toptier-logo.png",
  },
  openGraph: {
    title: "Top Tier Fades & Kicks | Oakville Barbershop",
    description:
      "Book your next haircut, fade, or beard trim at Top Tier — Oakville’s premium barbershop experience across Kerr, Preserve, and Bronte.",
    images: [{ url: "/brand/toptier-logo.png", width: 512, height: 171, alt: "Top Tier Fades & Kicks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Tier Fades & Kicks | Oakville Barbershop",
    description:
      "Book your next haircut, fade, or beard trim at Top Tier — Oakville’s premium barbershop experience across Kerr, Preserve, and Bronte.",
    images: ["/brand/toptier-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollEffects />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
