import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { api, ApiError, setToken } from "@/lib/api";

const title = "Partner Login — ProConnect";
const description = "Log in to your ProConnect partner account to track your onboarding application.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your onboarding or check your application status."
      footer={
        <>
          New to ProConnect?{" "}
          <Link to="/register" className="font-semibold text-accent hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          const password = (form.elements.namedItem("password") as HTMLInputElement).value;

          setLoading(true);
          try {
            const { token, user } = await api.login({ email, password });
            setToken(token);
            toast.success("Signed in", { description: "Welcome back to ProConnect." });
            navigate({ to: user.role === "admin" ? "/admin" : "/provider" });
          } catch (err) {
            const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
            toast.error("Login failed", { description: message });
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email or phone</Label>
          <Input
            id="email"
            name="email"
            type="text"
            required
            autoComplete="username"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              required
              autoComplete="current-password"
              className="h-12 rounded-xl pe-11"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
            Keep me signed in on this device
          </Label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl font-semibold gradient-accent text-accent-foreground shadow-accent hover:opacity-90"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Log in
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Admins log in with the same form — you'll land on the right dashboard automatically.
        </p>
      </form>
    </AuthLayout>
  );
}
