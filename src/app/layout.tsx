import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { BuffAIChat } from "@/components/buff-ai-chat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
      className={cn("h-full antialiased font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <BuffAIChat />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
