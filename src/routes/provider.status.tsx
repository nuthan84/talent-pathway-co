import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Headphones, MessageSquare, Phone } from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { Timeline, type TimelineEntry } from "@/components/common/timeline";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { api, type AuthUser } from "@/lib/api";

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

function makeEntries(status: string, createdAt?: string): TimelineEntry[] {
  const baseDate = createdAt ? new Date(createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Today";

  const states: Record<string, TimelineEntry[]> = {
    draft: [
      {
        title: "Application started",
        description: "Your profile wizard is in progress.",
        date: baseDate,
        state: "current",
      },
      {
        title: "Documents pending",
        description: "Upload your Aadhaar, PAN and profile photo to move ahead.",
        state: "upcoming",
      },
    ],
    submitted: [
      {
        title: "Application submitted",
        description: "Received and queued for document checks.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Documents under review",
        description: "A specialist is reviewing the submitted profile and files.",
        state: "current",
      },
    ],
    under_review: [
      {
        title: "Application submitted",
        description: "Received and queued for document checks.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Under review",
        description: "Your onboarding profile is presently being reviewed by the ProConnect team.",
        state: "current",
      },
    ],
    documents_verified: [
      {
        title: "Application submitted",
        description: "Received and queued for document checks.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Documents verified",
        description: "Identity and document checks cleared successfully.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Background check",
        description: "Your final onboarding review is being completed.",
        state: "current",
      },
    ],
    approved: [
      {
        title: "Application submitted",
        description: "Received and queued for document checks.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Documents verified",
        description: "All onboarding checks completed successfully.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Approved & activated",
        description: "Partner app access, training slot and first job allocation.",
        state: "done",
      },
    ],
    rejected: [
      {
        title: "Application submitted",
        description: "Received and queued for document checks.",
        date: baseDate,
        state: "done",
      },
      {
        title: "Review rejected",
        description: "The application requires changes before it can proceed.",
        state: "failed",
      },
    ],
  };

  return states[status] ?? states.draft;
}

function StatusPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const [meResponse, profileResponse] = await Promise.all([api.me(), api.getProviderProfile()]);
        if (ignore) return;
        setUser(meResponse.user);
        setProfile(profileResponse as Record<string, unknown>);
      } catch {
        if (!ignore) {
          setUser(null);
          setProfile(null);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const status = String((profile?.status as string | undefined) ?? "draft");
  const applicationId = String((profile?._id as string | undefined) ?? `PRO-${(user?._id ?? "0000").slice(-4)}`);
  const entries = makeEntries(status, typeof profile?.createdAt === "string" ? profile.createdAt : undefined);

  return (
    <PageTransition>
      <div className="space-y-7">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Application status
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Application {applicationId} · submitted {profile?.createdAt ? new Date(profile.createdAt as string).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "today"}
            </p>
          </div>
          <StatusBadge status={status} />
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