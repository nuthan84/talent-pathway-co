import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MapPin, SearchX, Star } from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { EmptyState } from "@/components/common/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { providers } from "@/utils/data";

const title = "Approved Providers — ProConnect Admin";
const description = "Browse the directory of verified ProConnect service partners by city and skill.";

export const Route = createFileRoute("/admin/providers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProvidersDirectory,
});

function ProvidersDirectory() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providers.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PageTransition>
      <div className="space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Providers</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {rows.length} partners in the directory
            </p>
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city or skill"
            aria-label="Search providers"
            className="h-11 w-full rounded-xl sm:max-w-xs"
          />
        </header>

        {rows.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No providers found"
            description="No partner matches that search. Try a different name, city or skill."
            actionLabel="Clear search"
            onAction={() => setQuery("")}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {rows.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
                whileHover={{ y: -4 }}
                className="surface-card p-5"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-12">
                    <AvatarImage src={p.avatar} alt="" />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-semibold text-foreground">{p.name}</h2>
                    <p className="truncate text-sm text-muted-foreground">{p.category}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-foreground">
                    <Star className="size-3.5 text-warning" aria-hidden="true" />
                    {p.rating}
                  </span>
                </div>

                <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" aria-hidden="true" />
                  {p.city}, {p.state} · {p.experience} yrs
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">{p.id}</span>
                  <StatusBadge status={p.status} />
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}