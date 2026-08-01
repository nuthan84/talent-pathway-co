import { useEffect, useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { FileCheck2, FolderUp, LayoutDashboard, UserRound } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/layout/dashboard-shell";
import { api, getToken, getTokenRole, type AuthUser } from "@/lib/api";

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

  const category = (profile?.category as string | undefined) || "Provider";
  const city = (profile?.city as string | undefined) || "Your city";
  const name = user?.name || "Professional";

  return (
    <DashboardShell
      items={items}
      title="Partner Portal"
      subtitle={`${category} · ${city}`}
      user={{
        name,
        role: category,
        avatar: "",
      }}
    >
      <Outlet />
    </DashboardShell>
  );
}
