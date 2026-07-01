"use client";

import { useState } from "react";
import { newsletterSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email, company });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your email");
      return;
    }
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return <p className="text-sm text-gold">You are on the list. Talk soon.</p>;
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <div className="flex items-center gap-2 rounded-full glass p-1.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          required
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-primary placeholder:text-faint focus:outline-none"
        />
        {/* Honeypot: hidden from real users */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          data-cursor="join"
          className="shrink-0 rounded-full bg-gold px-5 py-2 text-xs font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-60"
        >
          {state === "loading" ? "Joining" : "Join"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </form>
  );
}
