import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/layout/dashboard-shell";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const items: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Applications", to: "/admin/applications", icon: ShieldCheck },
  { label: "Providers", to: "/admin/providers", icon: Users },
];

function AdminLayout() {
  return (
    <DashboardShell
      items={items}
      title="Admin Console"
      subtitle="Onboarding operations"
      user={{
        name: "Ananya Rao",
        role: "Onboarding Lead",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      }}
    >
      <Outlet />
    </DashboardShell>
  );
}