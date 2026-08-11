import {
  ArrowUpRight,
  Award,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
import Image from "next/image";
import Link from "next/link";
import { HeroReveal, Reveal } from "@/components/animations/reveal";
import { GoogleMapsEmbed } from "@next/third-parties/google";
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

const WHATSAPP_GREEN = "#25D366";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] overflow-hidden">
        <Image
          src="/hero-img.jpg"
          alt="Professional car detailing and paint polishing at The Buff"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.2)_40%,rgba(11,11,11,1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65)_0%,transparent_60%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-150 w-150 bg-[radial-gradient(ellipse_at_bottom_left,rgba(193,18,31,0.07)_0%,transparent_70%)]" />

        <div className="relative flex min-h-[95vh] flex-col justify-between px-5 py-10 md:px-14">
          {/* Top bar: label + floating Google rating badge */}
          <HeroReveal delay={0}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[#C1121F]" />
                <p className="text-[10px] uppercase tracking-[0.38em] text-zinc-300">
                  Premium Car &amp; Motorcycle Detailing — Lahore
                </p>
              </div>
              <div className="hidden items-center gap-2.5 rounded-full border border-[#D4A843]/25 bg-black/40 px-4 py-2 backdrop-blur-sm md:flex">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-[#D4A843] text-[#D4A843]"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-[#F5F2EC]">
                  5.0
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="text-[10px] text-zinc-400">
                  73 Google Reviews
                </span>
              </div>
            </div>
          </HeroReveal>

          {/* Main headline + stats + CTAs */}
          <div>
            <HeroReveal delay={0.1}>
              <h1 className="text-[clamp(3.2rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-tighter text-[#F5F2EC]">
                Driven by
                <br />
                passion.
                <br />
                <span className="text-[#F5F2EC]/25">Perfected</span>
                <br />
                <span className="text-[#F5F2EC]/25">by precision.</span>
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.2}>
              <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex gap-10">
                  <div>
                    <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em] text-[#C1121F]">
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
                    <p className="text-[2.2rem] font-medium leading-none tracking-[-0.04em] text-[#C1121F]">
                      5.0
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                      Rating
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/booking"
                    className="rounded-full bg-[#C1121F] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#a50f18]"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href="https://wa.me/923004196069"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-[#1da851]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href="#services"
                    className="hidden rounded-full border border-white/10 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition hover:text-[#F5F2EC] sm:block"
                  >
                    Explore ↓
                  </a>
                </div>
              </div>
            </HeroReveal>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ───────────────────────────────────────────── */}
      <TextMarquee />

      {/* ── TRUST BAR ───────────────────────────────────────────────── */}
      <section className="border-b border-white/5 bg-[#0D0D0D]">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { icon: Award, value: "5+ Years", label: "Of Experience" },
              { icon: Star, value: "73+ Reviews", label: "5-Star on Google" },
              { icon: Shield, value: "5.0 Rating", label: "Highest Rated" },
              { icon: Sparkles, value: "Premium", label: "Products Only" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-4 md:px-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C1121F]/10">
                  <Icon className="h-4 w-4 text-[#C1121F]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F5F2EC]">
                    {value}
                  </p>
                  <p className="text-[11px] text-zinc-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section className="bg-[#FDFAF3] text-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left: text + trust points + stats */}
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
                About The Buff
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                Built on honesty,
                <br />
                driven by detail.
              </h2>
              <p className="mt-6 text-base leading-8 text-zinc-600">
                The Buff is built around one idea: every vehicle deserves
                careful, honest, and precise attention. From daily drivers to
                motorcycles and premium cars, each detail is handled with the
                goal of restoring beauty, protecting value, and delivering a
                finish customers can feel proud of.
              </p>

              <div className="mt-7 space-y-3.5">
                {[
                  "Honest assessment before any work begins",
                  "Premium-grade products on every job",
                  "Meticulous process with no shortcuts",
                  "Trusted by 73+ verified Google reviewers",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C1121F]" />
                    <p className="text-sm leading-6 text-zinc-600">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-black/10 pt-10">
                {[
                  { value: "5+", label: "Years of experience" },
                  { value: "73", label: "5-star reviews" },
                  { value: "5.0", label: "Google rating" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-4xl font-medium tracking-[-0.04em] text-[#C1121F]">
                      {value}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: image collage */}
            <Reveal delay={0.08}>
              <div className="grid h-full min-h-100 grid-cols-1 gap-3">
                <div className="flex flex-col gap-3">
                  <div className="relative flex-1 overflow-hidden rounded-2xl">
                    <Image
                      src="/portfolio-img-2.webp"
                      alt="Paint correction at The Buff"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <div className="relative flex-1 overflow-hidden rounded-2xl">
                    <Image
                      src="/portfolio-img-3.webp"
                      alt="Detailing finish at The Buff"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section id="services" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <Reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
                Services
              </p>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-medium leading-none tracking-tighter">
                Every service,
                <br />
                precisely delivered.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-zinc-500">
              From premium washes to full detailing, paint correction, and
              coatings — each service is tailored to your vehicle&apos;s
              condition.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={0}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[#111111] p-7 transition-all duration-300 hover:border-[#C1121F]/25 hover:bg-[#131211]">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-[#C1121F]/40 transition-colors group-hover:text-[#C1121F]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium tracking-[-0.03em]">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-zinc-500">
                    {service.description}
                  </p>
                  {"details" in service && service.details ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.details.map((detail) => (
                        <span
                          key={detail}
                          className="rounded-full border border-white/8 px-3 py-1 text-[11px] text-zinc-600"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-5 flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-transparent transition-colors group-hover:text-[#C1121F]/60">
                    <span>Ask for Quote</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────────── */}
      <section id="process" className="bg-[#FDFAF3] text-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <Reveal className="mb-14">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
                  Process
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4.5vw,4rem)] font-medium leading-none tracking-tighter">
                  Every detail follows
                  <br />a deliberate process.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-zinc-500">
                Great detailing is not rushed. Every vehicle goes through a
                careful sequence designed for lasting results.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {process.map((item, index) => (
                <div
                  key={item}
                  className="flex flex-col items-center rounded-2xl border border-black/8 bg-white p-7 text-center shadow-xs"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C1121F]/40 bg-[#C1121F]/8 text-sm font-semibold text-[#C1121F]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-4 text-sm font-medium leading-6 tracking-[-0.01em]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PACKAGES ────────────────────────────────────────────────── */}
      <section id="packages" className="bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <Reveal className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
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
                      ? "border-[#C1121F] bg-[#FFFDF5] text-[#0B0B0B]"
                      : "border-white/10 bg-[#111111]"
                  }`}
                >
                  {isHighlighted && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(193,18,31,0.07)_0%,transparent_60%)]" />
                  )}

                  <span
                    className={`pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-bold leading-none tracking-tighter ${
                      isHighlighted ? "text-[#C1121F]/8" : "text-white/4"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="flex items-center justify-between">
                    <p
                      className={`text-[10px] uppercase tracking-[0.32em] ${
                        isHighlighted ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      Package {String(index + 1).padStart(2, "0")}
                    </p>
                    {isHighlighted && (
                      <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C1121F]">
                        ★ Most Popular
                      </span>
                    )}
                  </div>

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
                            isHighlighted
                              ? "text-[#C1121F]"
                              : "text-[#C1121F]/50"
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
                    className={`mt-10 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${
                      isHighlighted
                        ? "bg-[#0B0B0B] text-white hover:bg-[#C1121F]"
                        : "border border-white/15 text-white hover:border-white/35 hover:bg-white/5"
                    }`}
                    style={
                      isHighlighted
                        ? undefined
                        : {
                            backgroundColor: WHATSAPP_GREEN,
                            color: "#fff",
                            border: "none",
                          }
                    }
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Get Quote on WhatsApp
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
          <Reveal className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
              Our Work
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-medium leading-[0.95] tracking-tighter">
                Real results.
                <br />
                Real transformations.
              </h2>
              <a
                href="https://www.instagram.com/thebuff.detailing"
                target="_blank"
                rel="noreferrer"
                className="hidden shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-400 transition hover:text-[#C1121F] md:flex"
              >
                View Instagram
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>

          <Reveal>
            {/* Pinterest-style masonry layout using CSS columns */}
            <div
              className="
                [column-count:1]
                sm:[column-count:2]
                lg:[column-count:3]
                gap-x-4
                w-full
                "
            >
              {[
                {
                  src: "/portfolio-img-3.webp",
                  alt: "Car detailing transformation at The Buff",
                  aspect: "aspect-[4/5]",
                },
                {
                  src: "/portfolio-img-4.webp",
                  alt: "Vehicle detailing result at The Buff",
                  aspect: "aspect-square",
                },
                {
                  src: "/portfolio-img-1.webp",
                  alt: "Motorcycle detailing at The Buff",
                  aspect: "aspect-[3/4]",
                },
                {
                  src: "/portfolio-img-2.webp",
                  alt: "Paint correction at The Buff",
                  aspect: "aspect-square",
                },
                {
                  src: "/portfolio-img-5.webp",
                  alt: "Premium detailing finish at The Buff",
                  aspect: "aspect-[4/3]",
                },
                // You can add more images here for better effect
              ].map((img, i) => (
                <div
                  key={img.src}
                  className={`
                    relative
                    mb-4
                    overflow-hidden
                    rounded-2xl
                    break-inside-avoid
                    ${img.aspect}
                  `}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Mobile Instagram CTA */}
          <Reveal className="mt-4 md:hidden">
            <a
              href="https://www.instagram.com/thebuff.detailing"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/8 py-4 text-[11px] uppercase tracking-[0.25em] text-zinc-500 transition hover:border-[#C1121F]/20 hover:text-[#C1121F]"
            >
              View More on Instagram
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
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
                Google Reviews
              </p>
              <h2 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-tighter">
                Shining vehicles.
                <br />
                Satisfied customers.
              </h2>
            </div>

            <div className="max-w-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A843]/20 px-5 py-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-[#D4A843] text-[#D4A843]"
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

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#C1121F]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,18,31,0.13)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.2)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center md:px-14 md:py-32">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
              Lahore&apos;s Trusted Detailer
            </p>
            <h2 className="mt-4 text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.9] tracking-tighter text-white">
              Ready to transform
              <br />
              your ride?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-white/70">
              Join 73+ satisfied customers in Lahore. Book your detailing
              session online, call us, or drop a WhatsApp message.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/923004196069"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#1da851]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
              <a
                href="tel:03214012924"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:border-white/60 hover:bg-white/10 bg-white hover:text-white"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:border-white/40 hover:text-white bg-white text-black hover:bg-white/10"
              >
                Book Online
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#FDFAF3] text-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-14 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C1121F]">
                Find Us
              </p>
              <h2 className="mt-4 text-[clamp(2.2rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.06em]">
                Let your ride become
                <br />
                the next transformation.
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
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#1da851]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
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
                    <GoogleMapsEmbed
                      apiKey={"AIzaSyC7HG3kfdM-_5F-Q6Wq2XyVw0SqLENMB1I"}
                      height={280}
                      width="100%"
                      mode="place"
                      center="31.458721883844095, 74.31537104394437"
                      q="The BUFF"
                      zoom="15"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bg-[#080808]">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 md:px-14">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <Image src="/logo.svg" alt="The Buff" width={88} height={88} />
              <p className="mt-5 max-w-xs text-sm leading-7 text-zinc-500">
                Premium car &amp; motorcycle detailing in Lahore. Driven by
                passion. Perfected by precision.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/thebuff.detailing/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-[#C1121F]/30 hover:text-[#C1121F]"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100087778666789"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-[#C1121F]/30 hover:text-[#C1121F]"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/923004196069"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition hover:border-[#C1121F]/30 hover:text-[#C1121F]"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Navigation
              </p>
              <nav className="mt-5 flex flex-col gap-3">
                {[
                  { label: "Services", href: "/#services" },
                  { label: "Process", href: "/#process" },
                  { label: "Packages", href: "/#packages" },
                  { label: "Reviews", href: "/#testimonials" },
                  { label: "Contact", href: "/#contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-zinc-400 transition hover:text-[#F5F2EC]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/booking"
                  className="mt-1 text-sm font-medium text-[#C1121F] transition hover:text-[#C1121F]/80"
                >
                  Book Appointment →
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                Contact
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href="tel:03214012924"
                  className="flex items-center gap-2.5 text-sm text-zinc-400 transition hover:text-[#F5F2EC]"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                  0321 401 2924
                </a>
                <a
                  href="tel:03004196069"
                  className="flex items-center gap-2.5 text-sm text-zinc-400 transition hover:text-[#F5F2EC]"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                  0300 419 6069
                </a>
                <a
                  href="https://wa.me/923004196069"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-zinc-400 transition hover:text-[#C1121F]"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                  WhatsApp Us
                </a>
                <p className="flex items-start gap-2.5 text-sm text-zinc-500">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" />
                  House No. 499, Chaudhary Rehmat Ali Road, Sector A-1, next to
                  Bloomfield Hall School, Township Sector A 1 Lahore, 54000,
                  Pakistan
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
              © 2026 The Buff
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-600">
              Driven by passion. Perfected by precision.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
