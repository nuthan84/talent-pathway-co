import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  FolderUp,
  IndianRupee,
  Star,
} from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { Timeline, type TimelineEntry } from "@/components/common/timeline";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { notifications, providerDocuments, providers } from "@/utils/data";

const title = "Partner Dashboard — ProConnect";
const description =
  "Track your onboarding progress, pending documents and application status in one place.";

export const Route = createFileRoute("/provider/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProviderDashboard,
});

const timeline: TimelineEntry[] = [
  {
    title: "Application submitted",
    description: "We received your onboarding application.",
    date: "24 Jul 2026, 10:42 AM",
    state: "done",
  },
  {
    title: "Documents verified",
    description: "Aadhaar, PAN and profile photo verified successfully.",
    date: "27 Jul 2026, 04:20 PM",
    state: "done",
  },
  {
    title: "Under review",
    description: "An onboarding specialist is reviewing your profile.",
    date: "28 Jul 2026, 09:15 AM",
    state: "current",
  },
  {
    title: "Approved & activated",
    description: "You will be onboarded to the partner app and start receiving jobs.",
    state: "upcoming",
  },
];

function ProviderDashboard() {
  const me = providers[0];
  const pending = providerDocuments.filter((d) => d.status !== "verified");

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Progress banner */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl gradient-dark p-7 sm:p-9"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <StatusBadge status={me.status} />
              <h1 className="mt-4 text-2xl font-bold text-background sm:text-3xl">
                Hi {me.name.split(" ")[0]}, you're almost there.
              </h1>
              <p className="mt-2 text-sm text-background/70">
                Two items are pending before your profile goes live. Most partners finish this in
                under 10 minutes.
              </p>
              <div className="mt-6 max-w-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-background/80">
                  <span>Profile completion</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="mt-2 h-2 bg-background/20" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/provider/profile">
                  <Button className="h-11 rounded-xl gradient-accent px-5 font-semibold text-accent-foreground shadow-accent hover:opacity-90">
                    Continue profile
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/provider/documents">
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl border-background/25 bg-background/10 px-5 font-semibold text-background hover:bg-background/20"
                  >
                    Fix documents
                  </Button>
                </Link>
              </div>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Application ID", value: me.id },
                { label: "Applied on", value: "24 Jul 2026" },
                { label: "Category", value: me.category },
                { label: "Service city", value: me.city },
              ].map((d) => (
                <div key={d.label} className="rounded-2xl bg-background/10 px-4 py-3">
                  <dt className="text-xs text-background/60">{d.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-background">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Documents verified" value="4 of 6" icon={BadgeCheck} accent="success" index={0} />
          <StatCard label="Est. monthly earning" value="₹44,200" delta="+8.4%" icon={IndianRupee} index={1} />
          <StatCard
            label="Review ETA"
            value="36 hrs"
            icon={CalendarClock}
            accent="warning"
            index={2}
          />
          <StatCard label="Profile rating" value={String(me.rating)} icon={Star} index={3} />
        </section>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Timeline */}
          <section className="surface-card p-6 lg:col-span-3">
            <h2 className="text-lg font-semibold text-foreground">Application progress</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Live status of your onboarding review.
            </p>
            <div className="mt-7">
              <Timeline entries={timeline} />
            </div>
          </section>

          <div className="space-y-6 lg:col-span-2">
            {/* Pending documents */}
            <section className="surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Pending items</h2>
                <FolderUp className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <ul className="mt-4 space-y-3">
                {pending.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.label}</p>
                      <p className="text-xs text-muted-foreground">{doc.hint}</p>
                    </div>
                    <StatusBadge status={doc.status} />
                  </li>
                ))}
              </ul>
              <Link to="/provider/documents">
                <Button variant="outline" className="mt-5 h-11 w-full rounded-xl font-semibold">
                  Manage documents
                </Button>
              </Link>
            </section>

            {/* Updates */}
            <section className="surface-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Recent updates</h2>
                <FileCheck2 className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <ul className="mt-4 space-y-4">
                {notifications.slice(0, 4).map((n) => (
                  <li key={n.id} className="flex gap-3">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">{n.message}</p>
                      <p className="mt-1 text-xs text-muted-foreground/70">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}