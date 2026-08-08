"use client";

import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Packages", href: "/#packages" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-[#0B0B0B]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="The Buff"
            priority
            width={100}
            height={100}
            // If your SVG is pure vector, consider using 'fill' for full responsiveness,
            // but for predictable layout and optimization, width and height is recommended.
            // SVGs provide better scaling and smaller file size vs PNG for logos.
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative transition hover:text-[#F5F2EC]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:03214012924"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#F5F2EC] transition hover:border-white/30 hover:bg-white/5"
            aria-label="Call The Buff"
          >
            <Phone className="h-4 w-4" />
          </a>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-[#F5F2EC] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white"
          >
            Book Now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#F5F2EC] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-[#0B0B0B] px-5 py-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-[#F5F2EC]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-[#F5F2EC] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-black"
            >
              Book Appointment
            </Link>

            <a
              href="tel:03214012924"
              className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm text-[#F5F2EC]"
            >
              Call 0321-4012924
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
