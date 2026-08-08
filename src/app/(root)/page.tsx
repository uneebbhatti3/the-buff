import { ArrowUpRight, Check, ChevronRight, Phone, Star } from "lucide-react";
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
  // Schema.org structured data JSON-LD
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden pt-28">
        <div className="absolute inset-0">
          <Image
            src="/hero-img.jpg"
            alt="Professional car detailing and paint polishing at The Buff"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.58),rgba(11,11,11,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.35)_100%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center justify-center px-5 pb-16 md:px-8">
          <div className="max-w-4xl text-center">
            <HeroReveal
              delay={0.05}
              className="mb-8 inline-flex items-center border-l border-[#C1121F] pl-4 text-sm uppercase tracking-[0.28em] text-zinc-300"
            >
              Premium Car & Motorcycle Detailing
            </HeroReveal>

            <HeroReveal delay={0.12}>
              <h1 className="text-4xl font-medium leading-[1.02] tracking-[-0.06em] text-[#F5F2EC] md:text-6xl lg:text-7xl">
                Driven by passion.
                <br />
                Perfected by precision.
              </h1>
            </HeroReveal>

            <HeroReveal delay={0.2}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
                The Buff restores, protects, and enhances cars and motorcycles
                through precision detailing, paint correction, ceramic coating,
                and interior care performed with professional techniques and
                premium products.
              </p>
            </HeroReveal>

            <HeroReveal
              delay={0.28}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                Book Appointment
                <ChevronRight className="h-4 w-4" />
              </Link>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F5F2EC] transition hover:border-white/50 hover:bg-white/5"
              >
                View Services
              </a>
            </HeroReveal>

            <HeroReveal
              delay={0.36}
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 border-y border-white/10 py-6 text-center sm:grid-cols-3"
            >
              <div>
                <p className="text-2xl font-medium text-[#F5F2EC]">5+</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Years of experience
                </p>
              </div>

              <div className="sm:border-x sm:border-white/10 sm:px-6">
                <p className="text-2xl font-medium text-[#F5F2EC]">73</p>
                <p className="mt-1 text-sm text-zinc-400">Google reviews</p>
              </div>

              <div>
                <p className="text-2xl font-medium text-[#F5F2EC]">
                  Cars & bikes
                </p>
                <p className="mt-1 text-sm text-zinc-400">Detailed with care</p>
              </div>
            </HeroReveal>
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="border-y border-white/10">
        <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
            About The Buff
          </p>

          <p className="max-w-4xl text-2xl font-light leading-[1.45] tracking-[-0.03em] text-zinc-300 md:text-4xl">
            The Buff is built around one idea: every vehicle deserves careful,
            honest, and precise attention. From daily drivers to motorcycles and
            premium cars, each detail is handled with the goal of restoring
            beauty, protecting value, and delivering a finish customers can feel
            proud of.
          </p>
        </Reveal>
      </section>

      {/* Services */}
      <section
        id="services"
        className="cv-auto mx-auto max-w-7xl px-5 py-24 md:px-8"
      >
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Services
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tighter md:text-6xl">
              Detailing services built around your vehicle&apos;s condition.
            </h2>
          </div>

          <p className="max-w-md leading-7 text-zinc-400">
            From premium washes and full detailing sessions to paint correction,
            wax protection, spray coatings, and chrome care, each service is
            selected based on the vehicle&apos;s condition and the finish you
            want to achieve.
          </p>
        </Reveal>

        <Reveal className="grid border-t border-white/10 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group border-b border-white/10 py-8 md:p-8 ${
                index % 2 === 0 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-4 text-sm text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    {service.title}
                  </h3>

                  <p className="mt-3 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
                    {service.duration}
                  </p>

                  <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                    {service.description}
                  </p>

                  {"details" in service && service.details ? (
                    <ul className="mt-5 space-y-2">
                      {service.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex gap-2 text-sm leading-6 text-zinc-500"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#C1121F]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <ArrowUpRight className="mt-2 h-5 w-5 text-zinc-600 transition group-hover:text-[#C1121F]" />
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Process */}
      <section id="process" className="cv-auto bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Process
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-tighter md:text-6xl">
              Every detail follows a deliberate process.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-2xl text-xl leading-8 text-zinc-700">
              Great detailing is not rushed. Every vehicle is inspected,
              cleaned, corrected, enhanced, and protected through a careful
              sequence designed to bring out a lasting finish.
            </p>

            <div className="mt-12 border-t border-black/10">
              {process.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-black/10 py-6"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-zinc-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-xl font-medium tracking-[-0.03em]">
                      {item}
                    </p>
                  </div>

                  <Check className="h-5 w-5 text-[#C1121F]" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Packages */}
      <section
        id="packages"
        className="cv-auto mx-auto max-w-7xl px-5 py-24 md:px-8"
      >
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
            Packages
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-tighter md:text-6xl">
            Choose the level of care your vehicle needs.
          </h2>
        </Reveal>

        <Reveal className="grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, index) => {
            const waMessage = encodeURIComponent(
              `Hi! I'm interested in the *${pkg.name}* package at The Buff Detailing.\n\n${pkg.description}\n\n*What's included:*\n${pkg.items.map((item) => `• ${item}`).join("\n")}\n\nCould you tell me more about this and the pricing?`,
            );
            const waHref = `https://wa.me/923004196069?text=${waMessage}`;

            return (
              <div
                key={pkg.name}
                className={`rounded-[1.75rem] border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                  index === 1
                    ? "border-[#F5F2EC] bg-white text-black"
                    : "border-white/10 bg-[#111]"
                }`}
              >
                <p
                  className={`text-sm ${
                    index === 1 ? "text-zinc-500" : "text-zinc-600"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
                  {pkg.name}
                </h3>

                <p
                  className={`mt-4 leading-7 ${
                    index === 1 ? "text-zinc-700" : "text-zinc-400"
                  }`}
                >
                  {pkg.description}
                </p>

                <div className="mt-8 space-y-4">
                  {pkg.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check
                        className={`h-4 w-4 ${
                          index === 1 ? "text-[#C1121F]" : "text-zinc-500"
                        }`}
                      />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                    index === 1
                      ? "bg-black text-white hover:bg-[#C1121F]"
                      : "border border-white/15 text-white hover:border-white/40"
                  }`}
                >
                  Get Quote
                </a>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* Gallery Placeholder */}
      <section className="cv-auto mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <Reveal className="relative grid gap-5 md:grid-cols-3">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg md:col-span-2">
            <Image
              src="/portfolio-img-3.webp"
              alt="Portfolio image 3"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 66vw, 100vw"
            />
          </div>

          <div className="grid gap-5">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <Image
                src="/portfolio-img-2.webp"
                alt="Portfolio image 2"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
              <Image
                src="/portfolio-img-1.webp"
                alt="Portfolio image 1"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Before & After
            </p>

            <p className="mt-3 max-w-xl text-zinc-400">
              See the difference through real transformations — restored paint,
              cleaner interiors, sharper reflections, motorcycle details, and
              protective finishes that speak for themselves.
            </p>
          </div>

          <a
            href="https://www.instagram.com/thebuff.detailing"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-[#F5F2EC]"
          >
            View Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="cv-auto overflow-hidden border-y border-white/10 bg-[#0B0B0B] py-24"
      >
        <Reveal className="mx-auto mb-14 flex max-w-7xl flex-col justify-between gap-6 px-5 md:px-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Google Reviews
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tighter md:text-6xl">
              Shining vehicles. Satisfied customers.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-lg leading-8 text-zinc-400">
              The Buff has earned the trust of car and motorcycle owners through
              consistent craftsmanship, honest advice, premium products, and
              results that customers continue to recommend.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-[#C1121F] text-[#C1121F]"
                  />
                ))}
              </div>

              <span className="text-sm font-medium text-[#F5F2EC]">
                73 Google Reviews
              </span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
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

      {/* Contact */}
      <section id="contact" className="cv-auto bg-white text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Experience The Buff
            </p>

            <h2 className="mt-4 max-w-3xl text-5xl font-medium leading-[1.03] tracking-[-0.06em] md:text-7xl">
              Let your ride become the next transformation.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-700">
              Whether you want to restore gloss, protect your paint, refresh the
              interior, or detail your motorcycle, book an appointment and let
              The Buff recommend the right treatment for your vehicle.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="tel:03214012924"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#C1121F]"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <a
                href="https://wa.me/923004196069"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/15 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:border-black/40"
              >
                WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-[2rem] border border-black/10 p-7"
          >
            <div className="border-b border-black/10 pb-6">
              <p className="text-sm text-zinc-500">Phone</p>
              <p className="mt-2 text-2xl font-medium">321 401 2924</p>
              <p className="mt-1 text-2xl font-medium">300 419 6069</p>
            </div>

            <div className="border-b border-black/10 py-6">
              <p className="text-sm text-zinc-500">Social</p>
              <p className="mt-2 text-lg font-medium">
                Facebook:{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=100087778666789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  The Buff
                </a>
              </p>
              <p className="mt-1 text-lg font-medium">
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/thebuff.detailing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  thebuff.detailing
                </a>
              </p>
              <p className="mt-1 text-lg font-medium">
                Threads:{" "}
                <a
                  href="https://www.threads.com/@thebuff.detailing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  @thebuff.detailing
                </a>
              </p>
            </div>

            <div className="pt-6">
              <p className="text-sm text-zinc-500">Location</p>

              <div className="mt-3 overflow-hidden rounded-[1.25rem]">
                <GoogleMapsEmbed
                  apiKey={"AIzaSyC7HG3kfdM-_5F-Q6Wq2XyVw0SqLENMB1I"}
                  height={400}
                  width="100%"
                  mode="place"
                  center="31.458721883844095, 74.31537104394437"
                  q="The BUFF"
                  zoom="15"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 The Buff. Detailing & Beyond.</p>
          <p>Driven by passion. Perfected by precision.</p>
        </div>
      </footer>
    </main>
  );
}
