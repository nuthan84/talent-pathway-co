import { createFileRoute } from "@tanstack/react-router";
import { Headphones, MessageSquare, Phone } from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { Timeline, type TimelineEntry } from "@/components/common/timeline";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { providers } from "@/utils/data";

const title = "Application Status — ProConnect Partner";
const description = "See where your ProConnect onboarding application stands and what happens next.";

export const Route = createFileRoute("/provider/status")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: StatusPage,
});

const entries: TimelineEntry[] = [
  {
    title: "Application submitted",
    description: "Received and queued for document checks.",
    date: "24 Jul 2026, 10:42 AM",
    state: "done",
  },
  {
    title: "Identity documents verified",
    description: "Aadhaar and PAN matched government records.",
    date: "26 Jul 2026, 01:08 PM",
    state: "done",
  },
  {
    title: "Police verification rejected",
    description: "Certificate expired. Upload one issued after Aug 2025 to continue.",
    date: "27 Jul 2026, 06:31 PM",
    state: "failed",
  },
  {
    title: "Background check",
    description: "Runs automatically once the new certificate is verified.",
    state: "current",
  },
  {
    title: "Approved & activated",
    description: "Partner app access, training slot and first job allocation.",
    state: "upcoming",
  },
];

function StatusPage() {
  const me = providers[0];

  return (
    <PageTransition>
      <div className="space-y-7">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Application status
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Application {me.id} · submitted 24 Jul 2026
            </p>
          </div>
          <StatusBadge status={me.status} />
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="surface-card p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground">Review timeline</h2>
            <div className="mt-7">
              <Timeline entries={entries} />
            </div>
          </section>

          <section className="surface-card h-fit p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
              <Headphones className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">Need help?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Our onboarding desk is available 9 AM – 8 PM, all days.
            </p>
            <div className="mt-5 space-y-3">
              <Button variant="outline" className="h-11 w-full justify-start rounded-xl font-semibold">
                <Phone className="size-4" aria-hidden="true" />
                1800 202 4040
              </Button>
              <Button className="h-11 w-full justify-start rounded-xl gradient-accent font-semibold text-accent-foreground">
                <MessageSquare className="size-4" aria-hidden="true" />
                Chat with a specialist
              </Button>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}