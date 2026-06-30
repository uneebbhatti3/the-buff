import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Buff | Premium Car Detailing Services",
    template: "%s | The Buff",
  },
  description:
    "The Buff provides premium car detailing services including interior detailing, exterior washing, paint correction, compounding, waxing, and protective coating by appointment.",

  metadataBase: new URL("https://thebuffdetailing.vercel.app"),

  openGraph: {
    title: "The Buff | Premium Car Detailing Services",
    description:
      "Refined interior and exterior car detailing, paint correction, waxing, compounding, and protective coating for vehicles that deserve presence.",
    url: "https://thebuffdetailing.vercel.app",
    siteName: "The Buff",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Buff premium car detailing service",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Buff | Premium Car Detailing Services",
    description:
      "Premium car detailing services including interior detailing, exterior washing, paint correction, waxing, and protective coating.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
