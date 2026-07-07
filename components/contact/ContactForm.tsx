"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-2xl glass px-4 py-3 text-sm text-primary placeholder:text-faint focus:outline-none focus:ring-1 focus:ring-gold/60";

/**
 * General contact / management enquiry form. Client-side Zod validation mirrors
 * the API contract; posts to /api/contact which routes to Supreme Music Group.
 */
export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof values>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ ...values, website });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
      setError("Something went wrong. Please email us directly.");
    }
  }

  if (state === "done") {
    return (
      <div className={cn("rounded-2xl glass p-8 text-center", className)}>
        <p className="font-display text-2xl font-medium text-gold">Message sent.</p>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out. Supreme Music Group will come straight back to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-4", className)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          required
          className={field}
        />
        <input
          type="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          required
          className={field}
        />
      </div>
      <input
        type="text"
        value={values.subject}
        onChange={(e) => set("subject", e.target.value)}
        placeholder="Subject (optional)"
        aria-label="Subject"
        className={field}
      />
      <textarea
        value={values.message}
        onChange={(e) => set("message", e.target.value)}
        placeholder="Tell us about the enquiry"
        aria-label="Message"
        required
        rows={5}
        className={cn(field, "resize-none")}
      />
      {/* Honeypot: hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          data-cursor="send"
          className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-60"
        >
          {state === "loading" ? "Sending" : "Send enquiry"}
        </button>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    </form>
  );
}
