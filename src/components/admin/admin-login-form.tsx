"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.message || "Invalid credentials.");
      setLoading(false);
      return;
    }

    router.push("/admin/bookings");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/10 bg-[#111111] p-5 sm:p-7"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Lock className="h-5 w-5 text-zinc-300" />
      </div>

      <div className="space-y-5">
        <div>
          <Label className="mb-2 block text-sm text-zinc-400">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@thebuff.com"
            required
            className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
          />
        </div>

        <div>
          <Label className="mb-2 block text-sm text-zinc-400">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            required
            className="h-12 rounded-2xl border-white/10 bg-[#0B0B0B] text-[#F5F2EC] placeholder:text-zinc-700 focus-visible:ring-white/20"
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-full bg-[#F5F2EC] text-sm font-semibold uppercase tracking-[0.16em] text-black hover:bg-white disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </div>
    </form>
  );
}