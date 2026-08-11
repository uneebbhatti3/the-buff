import { ArrowUpRight, Check, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import {
  packages,
  process,
  services,
  testimonialRowOne,
  testimonialRowTwo,
} from "@/features/home/data/data";
import TestimonialsMarqueeRow from "@/features/home/components/testimonials-marquee-row";
import TextMarquee from "@/features/home/components/text-marquee";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Buff - Premium Car & Motorcycle Detailing in Lahore",
  description:
    "The Buff specializes in professional car and motorcycle detailing, paint correction, ceramic coating, and interior care in Lahore. Trusted for precision results, premium products, and honest advice. Book your appointment today to transform your vehicle.",
  keywords: [
    "car detailing Lahore",
    "motorcycle detailing Lahore",
    "auto detailing Lahore",
    "paint correction",
    "ceramic coating",
    "vehicle detailing",
    "interior detailing",
    "premium car care",
    "detailing packages Lahore",
    "The Buff Detailing",
  ],
  authors: [{ name: "The Buff", url: "https://thebuffdetailing.vercel.app" }],
  openGraph: {
    type: "website",
    url: "https://thebuffdetailing.vercel.app",
    title: "The Buff - Premium Car & Motorcycle Detailing in Lahore",
    description:
      "Experience meticulous detailing, paint restoration, and ceramic protection for cars and motorcycles in Lahore. Years of experience, 73+ 5-star Google reviews.",
    locale: "en_PK",
    siteName: "The Buff",
    images: [
      {
        url: "/og-image-thebuff.jpg",
        width: 1200,
        height: 630,
        alt: "The Buff - Premium Vehicle Detailing Lahore",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thebuff_detailing",
    creator: "@thebuff_detailing",
    title: "The Buff - Premium Car & Motorcycle Detailing in Lahore",
    description:
      "Professional & honest vehicle detailing, paint correction, and ceramic coating. Trusted by car and motorcycle owners in Lahore.",
    images: ["/og-image-thebuff.jpg"],
  },
  metadataBase: new URL("https://thebuffdetailing.vercel.app"),
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://thebuffdetailing.vercel.app/",
    languages: {
      "en-PK": "https://thebuffdetailing.vercel.app/",
      en: "https://thebuffdetailing.vercel.app/",
    },
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      name: "The Buff",
      image: ["https://thebuffdetailing.vercel.app/og-image-thebuff.jpg"],
      "@id": "https://thebuffdetailing.vercel.app",
      url: "https://thebuffdetailing.vercel.app",
      telephone: "+923214012924",
      address: {
        "@type": "PostalAddress",
        streetAddress: "The Buff, Canal Bank Rd, Lahore",
        addressLocality: "Lahore",
        postalCode: "54000",
        addressCountry: "PK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.458721883844095,
        longitude: 74.31537104394437,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/profile.php?id=100087778666789",
        "https://www.instagram.com/thebuff.detailing/",
        "https://www.threads.com/@thebuff.detailing",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "73",
      },
      description:
        "Professional car and motorcycle detailing, paint correction, ceramic coating, and premium vehicle care in Lahore, Pakistan.",
    }),
  },
};

// All data is static — pre-render at build time, serve from CDN edge
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] overflow-hidden">
        {/* Background image */}
        <Image
          src="/hero-img.jpg"
          alt="Professional car detailing and paint polishing at The Buff"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />

        {/* Layered overlays for cinematic depth */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.2)_40%,rgba(11,11,11,1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.55)_0%,transparent_65%)]" />

        {/* Content — flex column filling full height */}
        <div className="relative flex min-h-[88vh] flex-col justify-between px-5 py-10 md:px-14">
          {/* Top label — CSS animation so it's visible before JS hydration */}
          <div className="flex items-center gap-3 animate-[fadeUp_0.6s_ease-out_both]">
            <span className="h-px w-6 bg-[#C1121F]" />
            <p className="text-[10px] uppercase tracking-[0.38em] text-zinc-300">
              Premium Car &amp; Motorcycle Detailing — Lahore
            </p>
          </div>

          {/* Main headline — rendered immediately for LCP */}
          <div>
            <h1 className="text-[clamp(3.2rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-tighter text-[#F5F2EC] animate-[fadeUp_0.5s_ease-out_both]">
              Driven by
              <br />
              passion.
              <br />
              <span className="text-[#F5F2EC]/25">Perfected</span>
              <br />
              <span className="text-[#F5F2EC]/25">by precision.</span>
            </h1>

            {/* Stats + CTA bar */}
            <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between animate-[fadeUp_0.5s_0.15s_ease-out_both]">
              <div className="flex gap-10">
                <div>
                  <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em]">
                    5+
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    Years
                  </p>
                </div>
                <div>
                  <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em]">
                    73
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    Google Reviews
                  </p>
                </div>
                <div>
                  <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em]">
                    5.0
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    Rating
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/booking"
                  className="rounded-full bg-[#F5F2EC] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-white"
                >
                  Book Appointment
                </Link>
                <a
                  href="#services"
                  className="rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F2EC] transition hover:border-white/40 hover:bg-white/5"
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ───────────────────────────────────────────── */}
      <TextMarquee />

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section className="bg-white text-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
              About The Buff
            </p>

            <p className="mt-8 max-w-5xl text-[clamp(1.55rem,3.2vw,2.85rem)] font-light leading-[1.35] tracking-[-0.03em] text-[#0B0B0B]">
              The Buff is built around one idea: every vehicle deserves careful,
              honest, and precise attention. From daily drivers to motorcycles
              and premium cars, each detail is handled with the goal of
              restoring beauty, protecting value, and delivering a finish
              customers can feel proud of.
            </p>

            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-black/10 pt-10 sm:max-w-sm">
              {[
                { value: "5+", label: "Years of experience" },
                { value: "73", label: "5-star reviews" },
                { value: "5.0", label: "Google rating" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-4xl font-medium tracking-[-0.04em]">
                    {value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section id="services" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <Reveal className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Services
              </p>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-tighter">
                Detailing services
                <br />
                built around your
                <br />
                vehicle&apos;s condition.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-zinc-500">
              From premium washes and full detailing sessions to paint
              correction, wax protection, coatings, and chrome care — each
              service is tailored to the vehicle&apos;s condition.
            </p>
          </Reveal>

          <div className="border-t border-white/10">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={0}>
                <div className="group grid border-b border-white/8 py-8 transition-colors hover:bg-white/2.5 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:gap-10 md:px-5 md:py-10">
                  <span className="mb-4 text-xs font-medium text-zinc-600 md:mb-0 md:pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.03em] md:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
                      {service.description}
                    </p>
                    {"details" in service && service.details ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.details.map((detail) => (
                          <span
                            key={detail}
                            className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-zinc-600"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 md:mt-1">
                    <span className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────── */}
      <section id="process" className="bg-white text-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                Process
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter">
                Every detail follows a deliberate process.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
                Great detailing is not rushed. Every vehicle is inspected,
                cleaned, corrected, enhanced, and protected through a careful
                sequence designed to bring out a lasting finish.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t border-black/10">
                {process.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between border-b border-black/10 py-6"
                  >
                    <div className="flex items-center gap-6">
                      <span className="w-7 text-sm text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-lg font-medium tracking-[-0.02em] md:text-xl">
                        {item}
                      </p>
                    </div>
                    <Check className="h-4 w-4 shrink-0 text-[#C1121F]" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ────────────────────────────────────────────────── */}
      <section id="packages" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <Reveal className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
              Packages
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-tighter">
              Choose the level of
              <br />
              care your vehicle needs.
            </h2>
          </Reveal>

          <Reveal className="grid gap-4 md:grid-cols-3">
            {packages.map((pkg, index) => {
              const waMessage = encodeURIComponent(
                `Hi, I'm interested in the *${pkg.name}* package. Could you share the pricing and let me know about availability?`,
              );
              const waHref = `https://wa.me/923004196069?text=${waMessage}`;
              const isHighlighted = index === 1;

              return (
                <div
                  key={pkg.name}
                  className={`group relative overflow-hidden rounded-2xl border p-8 transition-transform duration-500 hover:-translate-y-1 ${
                    isHighlighted
                      ? "border-[#F5F2EC] bg-white text-[#0B0B0B]"
                      : "border-white/10 bg-[#111111]"
                  }`}
                >
                  {/* Ghost number decoration */}
                  <span
                    className={`pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-bold leading-none tracking-tighter ${
                      isHighlighted ? "text-black/5" : "text-white/4"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <p
                    className={`text-[10px] uppercase tracking-[0.32em] ${
                      isHighlighted ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Package {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em]">
                    {pkg.name}
                  </h3>

                  <p
                    className={`mt-4 text-sm leading-7 ${
                      isHighlighted ? "text-zinc-600" : "text-zinc-400"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isHighlighted ? "text-[#C1121F]" : "text-zinc-600"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isHighlighted ? "text-[#0B0B0B]" : "text-zinc-400"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-10 flex w-full items-center justify-center rounded-full py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      isHighlighted
                        ? "bg-[#0B0B0B] text-white hover:bg-[#C1121F]"
                        : "border border-white/15 text-white hover:border-white/35 hover:bg-white/5"
                    }`}
                  >
                    Get Quote
                  </a>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────── */}
      <section className="bg-[#0B0B0B] pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-14">
          <Reveal className="grid gap-3 md:grid-cols-[1.65fr_1fr]">
            {/* Large image */}
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/portfolio-img-3.webp"
                alt="Car detailing transformation at The Buff"
                fill
                priority
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>

            {/* Two stacked images */}
            <div className="grid gap-3">
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/portfolio-img-2.webp"
                  alt="Paint correction at The Buff"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/portfolio-img-1.webp"
                  alt="Motorcycle detailing at The Buff"
                  fill
                  priority
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-6 flex flex-col justify-between gap-5 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Before &amp; After
              </p>
              <p className="mt-2 max-w-md text-sm leading-7 text-zinc-500">
                Real transformations — restored paint, cleaner interiors,
                sharper reflections, and protective finishes that speak for
                themselves.
              </p>
            </div>
            <a
              href="https://www.instagram.com/thebuff.detailing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F5F2EC] transition hover:text-[#C1121F]"
            >
              View Instagram
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="overflow-hidden border-y border-white/10 bg-[#0B0B0B] py-24 md:py-32"
      >
        <Reveal className="mx-auto mb-14 max-w-7xl px-5 md:px-14">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Google Reviews
              </p>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-tighter">
                Shining vehicles.
                <br />
                Satisfied customers.
              </h2>
            </div>

            <div className="max-w-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-[#C1121F] text-[#C1121F]"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-zinc-300">
                  73 Reviews · 5.0
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-500">
                Trusted by car and motorcycle owners through consistent
                craftsmanship and honest advice.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          <TestimonialsMarqueeRow
            testimonials={testimonialRowOne}
            direction="left"
          />
          <TestimonialsMarqueeRow
            testimonials={testimonialRowTwo}
            direction="right"
          />
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" className="bg-white text-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                Experience The Buff
              </p>
              <h2 className="mt-4 text-[clamp(2.2rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                Let your ride become the next transformation.
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-zinc-500">
                Whether you want to restore gloss, protect your paint, refresh
                the interior, or detail your motorcycle — book an appointment
                and let The Buff recommend the right treatment.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="tel:03214012924"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0B0B0B] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#C1121F]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/923004196069"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0B0B0B] transition hover:border-black/40"
                >
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0B0B0B] transition hover:border-black/40"
                >
                  Book Online
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-black/10 p-7">
                <div className="border-b border-black/10 pb-6">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-400">
                    Phone
                  </p>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                    321 401 2924
                  </p>
                  <p className="mt-1 text-2xl font-medium tracking-[-0.03em]">
                    300 419 6069
                  </p>
                </div>

                <div className="border-b border-black/10 py-6">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-400">
                    Social
                  </p>
                  <div className="mt-3 space-y-2">
                    <p className="text-base font-medium">
                      Instagram:{" "}
                      <a
                        href="https://www.instagram.com/thebuff.detailing/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        thebuff.detailing
                      </a>
                    </p>
                    <p className="text-base font-medium">
                      Facebook:{" "}
                      <a
                        href="https://www.facebook.com/profile.php?id=100087778666789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        The Buff
                      </a>
                    </p>
                    <p className="text-base font-medium">
                      Threads:{" "}
                      <a
                        href="https://www.threads.com/@thebuff.detailing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        @thebuff.detailing
                      </a>
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-400">
                    Location
                  </p>
                  <div className="mt-3 overflow-hidden rounded-xl">
                    <iframe
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC7HG3kfdM-_5F-Q6Wq2XyVw0SqLENMB1I&q=The+BUFF&center=31.458721883844095,74.31537104394437&zoom=15"
                      width="100%"
                      height="320"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="border-0"
                      allowFullScreen
                      title="The Buff location on Google Maps"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bg-[#0B0B0B] px-5 py-8 md:px-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
            © 2026 The Buff
          </p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
            Driven by passion. Perfected by precision.
          </p>
        </div>
      </footer>
    </main>
  );
}
