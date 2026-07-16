"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; content: React.ReactNode };

/**
 * Simple accessible tab switcher. All panels are server-rendered and toggled
 * with `hidden`, so switching is instant and there's no re-fetch.
 */
export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div
        role="tablist"
        className="inline-flex gap-1 rounded-full border border-white/10 bg-raised p-1.5"
      >
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(t.id)}
              className={cn(
                "rounded-full px-7 py-3 text-base font-medium transition-colors duration-300",
                on ? "bg-gold text-ink" : "text-muted hover:text-primary",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="mt-10">
        {tabs.map((t) => (
          <div key={t.id} role="tabpanel" hidden={active !== t.id}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
