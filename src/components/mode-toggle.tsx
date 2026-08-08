"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  // Only light and dark themes available
  const themes = ["light", "dark"] as const;
  // Find current index
  const currentIndex =
    themes.indexOf(theme as (typeof themes)[number]) === -1
      ? 0
      : themes.indexOf(theme as (typeof themes)[number]);
  // Next theme index
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  // For accessibility, label describes next mode.
  const labelMap: Record<string, string> = {
    light: "Switch to dark mode",
    dark: "Switch to light mode",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={labelMap[nextTheme]}
      onClick={() => setTheme(nextTheme)}
    >
      {/* Show sun in light, moon in dark */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "light" ? "scale-100 rotate-0" : "scale-0 rotate-90"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        }`}
      />
      <span className="sr-only">{labelMap[nextTheme]}</span>
    </Button>
  );
}
