import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const title = "Reset Password — ProConnect";
const description = "Choose a new password for your ProConnect partner account.";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ResetPasswordPage,
});

function score(pw: string) {
  let s = 0;
  if (pw.length >= 8) s += 34;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s += 33;
  if (/\d|[^\w\s]/.test(pw)) s += 33;
  return s;
}

function ResetPasswordPage() {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const strength = score(pw);
  const label = strength < 40 ? "Weak" : strength < 80 ? "Good" : "Strong";

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Back to login
        </Link>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            toast.success("Password updated", { description: "You can now log in." });
            navigate({ to: "/login" });
          }, 700);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            required
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="new-password"
            className="h-12 rounded-xl"
          />
          <div className="flex items-center gap-3">
            <Progress value={strength} className="h-1.5 flex-1" />
            <span className="text-xs font-semibold text-muted-foreground">{label}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            className="h-12 rounded-xl"
          />
        </div>

        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li>• At least 8 characters</li>
          <li>• One uppercase and one lowercase letter</li>
          <li>• One number or symbol</li>
        </ul>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl font-semibold gradient-accent text-accent-foreground shadow-accent hover:opacity-90"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Update password
        </Button>
      </form>
    </AuthLayout>
  );
}