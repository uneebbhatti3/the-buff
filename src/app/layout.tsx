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

  keywords: [
    "The Buff",
    "car detailing",
    "auto detailing",
    "premium car detailing",
    "interior detailing",
    "exterior washing",
    "paint correction",
    "car waxing",
    "car coating",
    "car cleaning service",
  ],

  authors: [{ name: "The Buff" }],
  creator: "The Buff",
  publisher: "The Buff",

  metadataBase: new URL("https://thebuff.vercel.app"),

  openGraph: {
    title: {
      default: "The Buff | Premium Car Detailing in Lahore",
      template: "%s | The Buff",
    },
    description:
      "The Buff offers premium car detailing in Lahore, including interior detailing, exterior washing, paint correction, waxing, compounding, and protective coating.",
    url: "https://thebuff.vercel.app",
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

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
