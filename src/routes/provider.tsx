import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { FileCheck2, FolderUp, LayoutDashboard, UserRound } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/layout/dashboard-shell";
import { providers } from "@/utils/data";
import { getToken, getTokenRole } from "@/lib/api";

export const Route = createFileRoute("/provider")({
  // Client-side guard for UX only — real enforcement is server-side in
  // backend/middleware/auth.js. See the comment on getTokenRole() in src/lib/api.ts.
  beforeLoad: () => {
    if (!getToken() || getTokenRole() !== "provider") {
      throw redirect({ to: "/login" });
    }
  },
  component: ProviderLayout,
});

const items: NavItem[] = [
  { label: "Dashboard", to: "/provider", icon: LayoutDashboard },
  { label: "Complete profile", to: "/provider/profile", icon: UserRound },
  { label: "Documents", to: "/provider/documents", icon: FolderUp },
  { label: "Application status", to: "/provider/status", icon: FileCheck2 },
];

function ProviderLayout() {
  const me = providers[0];
  return (
    <DashboardShell
      items={items}
      title="Partner Portal"
      subtitle={`${me.category} · ${me.city}`}
      user={{ name: me.name, role: me.category, avatar: me.avatar }}
    >
      <Outlet />
    </DashboardShell>
  );
}
