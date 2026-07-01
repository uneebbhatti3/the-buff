import {
  ArrowUpRight,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Interior Detailing",
    description:
      "Deep cabin cleaning for seats, carpets, dashboard, panels, vents, and high-touch surfaces.",
  },
  {
    title: "Exterior Washing",
    description:
      "Careful exterior cleaning to remove dust, road grime, and surface contamination.",
  },
  {
    title: "Paint Correction",
    description:
      "Refines dull paint, swirl marks, haze, and light defects to restore visual depth.",
  },
  {
    title: "Compounding",
    description:
      "Targets oxidation and surface imperfections to prepare the finish for gloss and protection.",
  },
  {
    title: "Waxing",
    description:
      "Adds smoothness, reflection, and a protective gloss layer for a cleaner finish.",
  },
  {
    title: "Protective Coating",
    description:
      "Helps preserve the finish and protect the surface from daily exposure.",
  },
];

const process = [
  "Vehicle inspection",
  "Surface preparation",
  "Deep cleaning",
  "Correction where needed",
  "Protection and final finish",
];

const packages = [
  {
    name: "Essential",
    description: "For regular maintenance and a clean, refreshed appearance.",
    items: ["Exterior wash", "Interior refresh", "Basic surface cleaning"],
  },
  {
    name: "Complete",
    description:
      "For vehicles that need a deeper interior and exterior detailing session.",
    items: ["Interior detailing", "Degreasing", "Waxing", "Final finish"],
  },
  {
    name: "Signature",
    description:
      "For a refined finish with paint improvement and longer-lasting protection.",
    items: ["Paint correction", "Compounding", "Waxing or coating", "Detail inspection"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC]">
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden pt-28">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90"
            alt="Dark premium sports car"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Dark readability overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.58),rgba(11,11,11,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.35)_100%)]" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center justify-center px-5 pb-16 md:px-8">
          <div className="max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center border-l border-[#C1121F] pl-4 text-sm uppercase tracking-[0.28em] text-zinc-300">
              Premium Auto Detailing
            </div>

            <h1 className="text-5xl font-medium leading-[1.02] tracking-[-0.06em] text-[#F5F2EC] md:text-7xl lg:text-8xl">
              Detailing for vehicles
              <br />
              that deserve presence.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              The Buff delivers refined interior and exterior detailing, paint
              correction, waxing, compounding, and surface protection with a careful,
              appointment-based approach.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#F5F2EC] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
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
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 border-y border-white/10 py-6 text-center sm:grid-cols-3">
              <div>
                <p className="text-2xl font-medium text-[#F5F2EC]">7+</p>
                <p className="mt-1 text-sm text-zinc-400">Core services</p>
              </div>

              <div className="sm:border-x sm:border-white/10 sm:px-6">
                <p className="text-2xl font-medium text-[#F5F2EC]">1:1</p>
                <p className="mt-1 text-sm text-zinc-400">Custom plans</p>
              </div>

              <div>
                <p className="text-2xl font-medium text-[#F5F2EC]">By appointment</p>
                <p className="mt-1 text-sm text-zinc-400">Focused service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
            About the service
          </p>

          <p className="max-w-4xl text-2xl font-light leading-[1.45] tracking-[-0.03em] text-zinc-300 md:text-4xl">
            A professional detailing experience for customers who want their
            vehicle to look cleaner, sharper, and better cared for — without
            the rushed feel of an ordinary wash.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Services
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-[-0.05em] md:text-6xl">
              Focused care for every surface.
            </h2>
          </div>

          <p className="max-w-md leading-7 text-zinc-400">
            Choose individual services or combine them into a custom detailing
            plan based on your vehicle’s condition.
          </p>
        </div>

        <div className="grid border-t border-white/10 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group border-b border-white/10 py-8 md:p-8 ${index % 2 === 0 ? "md:border-r md:border-white/10" : ""
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
                  <p className="mt-4 max-w-xl leading-7 text-zinc-400">
                    {service.description}
                  </p>
                </div>

                <ArrowUpRight className="mt-2 h-5 w-5 text-zinc-600 transition group-hover:text-[#C1121F]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#F5F2EC] text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Process
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-6xl">
              Careful work. Clear sequence.
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-xl leading-8 text-zinc-700">
              The difference is not only in the products used. It is in the
              order, patience, and attention given to each stage of the detail.
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
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
            Packages
          </p>
          <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-6xl">
            Simple options. Customized after inspection.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`rounded-[1.75rem] border p-7 ${index === 1
                ? "border-[#F5F2EC] bg-[#F5F2EC] text-black"
                : "border-white/10 bg-[#111]"
                }`}
            >
              <p
                className={`text-sm ${index === 1 ? "text-zinc-500" : "text-zinc-600"
                  }`}
              >
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
                {pkg.name}
              </h3>

              <p
                className={`mt-4 leading-7 ${index === 1 ? "text-zinc-700" : "text-zinc-400"
                  }`}
              >
                {pkg.description}
              </p>

              <div className="mt-8 space-y-4">
                {pkg.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check
                      className={`h-4 w-4 ${index === 1 ? "text-[#C1121F]" : "text-zinc-500"
                        }`}
                    />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/923214012924"
                target="_blank"
                rel="noreferrer"
                className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition ${index === 1
                  ? "bg-black text-white hover:bg-[#C1121F]"
                  : "border border-white/15 text-white hover:border-white/40"
                  }`}
              >
                Get Quote
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Placeholder */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="aspect-[16/10] rounded-[2rem] bg-[#171717]" />
          </div>
          <div className="grid gap-5">
            <div className="aspect-[16/10] rounded-[2rem] bg-[#1F1F1F]" />
            <div className="aspect-[16/10] rounded-[2rem] bg-[#141414]" />
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Results Gallery
            </p>
            <p className="mt-3 max-w-xl text-zinc-400">
              Replace these placeholders with real before-and-after photos,
              exterior gloss shots, interior cleaning results, and coating
              finishes.
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#F5F2EC] text-black">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:px-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-500">
              Book an appointment
            </p>

            <h2 className="mt-4 max-w-3xl text-5xl font-medium leading-[1.03] tracking-[-0.06em] md:text-7xl">
              Give your vehicle the finish it deserves.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-700">
              Call or WhatsApp The Buff to discuss your vehicle’s condition,
              choose the right service, and schedule your detailing appointment.
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
          </div>

          <div className="rounded-[2rem] border border-black/10 p-7">
            <div className="border-b border-black/10 pb-6">
              <p className="text-sm text-zinc-500">Phone</p>
              <p className="mt-2 text-2xl font-medium">0321-4012924</p>
              <p className="mt-1 text-2xl font-medium">0300-4196069</p>
            </div>

            <div className="border-b border-black/10 py-6">
              <p className="text-sm text-zinc-500">Social</p>
              <p className="mt-2 text-lg font-medium">Facebook: The Buff</p>
              <p className="mt-1 text-lg font-medium">
                Instagram: thebuff.detailing
              </p>
            </div>

            <div className="pt-6">
              <p className="text-sm text-zinc-500">Location</p>
              <div className="mt-3 flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-[#C1121F]" />
                <p className="text-lg font-medium">
                  Add business address or Google Maps location here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 The Buff. Detailing & Beyond.</p>
          <p>Professional auto detailing by appointment.</p>
        </div>
      </footer>
    </main>
  );
}