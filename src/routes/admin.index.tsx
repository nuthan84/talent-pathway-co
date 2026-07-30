import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Clock3, ShieldCheck, UserPlus, Users } from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { categorySplit, monthlyApplications, providers, weeklyOnboarding } from "@/utils/data";

const title = "Admin Overview — ProConnect Operations";
const description =
  "Monitor partner applications, approval rates and onboarding throughput across every category.";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminOverview,
});

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-card)",
  fontSize: 12,
};

function AdminOverview() {
  const queue = providers.filter((p) => p.status === "under_review" || p.status === "submitted");

  return (
    <PageTransition>
      <div className="space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Onboarding performance for July 2026.
            </p>
          </div>
          <Link to="/admin/applications">
            <Button className="h-11 rounded-xl gradient-accent px-5 font-semibold text-accent-foreground shadow-accent hover:opacity-90">
              Review queue ({queue.length})
            </Button>
          </Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total applications" value="2,969" delta="+22.1%" icon={UserPlus} index={0} />
          <StatCard
            label="Approved partners"
            value="2,090"
            delta="+17.6%"
            icon={ShieldCheck}
            accent="success"
            index={1}
          />
          <StatCard
            label="Pending review"
            value="184"
            delta="-6.3%"
            trend="down"
            icon={Clock3}
            accent="warning"
            index={2}
          />
          <StatCard label="Active this week" value="1,342" delta="+4.2%" icon={Users} index={3} />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="surface-card p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground">Applications vs approvals</h2>
            <p className="mt-1 text-sm text-muted-foreground">Last six months.</p>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyApplications}>
                  <defs>
                    <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gAppr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} width={36} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="var(--color-accent)"
                    fill="url(#gApps)"
                    strokeWidth={2.5}
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stroke="var(--color-success)"
                    fill="url(#gAppr)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Category split</h2>
            <p className="mt-1 text-sm text-muted-foreground">Share of approved partners.</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySplit}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={82}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {categorySplit.map((entry, i) => (
                      <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-2">
              {categorySplit.map((c, i) => (
                <li key={c.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: pieColors[i % pieColors.length] }}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-muted-foreground">{c.name}</span>
                  <span className="font-semibold text-foreground">{c.value}%</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="surface-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Onboarded this week</h2>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyOnboarding}>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} width={28} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-surface)" }} />
                  <Bar dataKey="onboarded" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="surface-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Priority review queue</h2>
              <Link
                to="/admin/applications"
                className="text-sm font-semibold text-accent hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-5 divide-y divide-border">
              {queue.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3.5">
                  <Avatar className="size-10">
                    <AvatarImage src={p.avatar} alt="" />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.category} · {p.city} · {p.experience} yrs
                    </p>
                  </div>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}