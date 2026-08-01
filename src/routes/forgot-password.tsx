import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, MailCheck } from "lucide-react";
import { motion } from "motion/react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const title = "Forgot Password — ProConnect";
const description = "Reset your ProConnect partner account password with a secure email link.";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your registered email and we'll send you a secure reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-accent hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="surface-card p-7 text-center"
        >
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-success/10 text-success">
            <MailCheck className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a reset link to your email. It expires in 30 minutes.
          </p>
          <Link to="/reset-password">
            <Button className="mt-5 h-11 w-full rounded-xl gradient-accent text-accent-foreground">
              Open reset link
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-3 text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            Use a different email
          </button>
        </motion.div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setSent(true);
            }, 650);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="resetEmail">Registered email</Label>
            <Input
              id="resetEmail"
              type="email"
              required
              className="h-12 rounded-xl"
              placeholder="you@example.com"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl font-semibold gradient-accent text-accent-foreground shadow-accent hover:opacity-90"
          >
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            Send reset link
          </Button>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-success" aria-hidden="true" />
            Links are single-use and expire automatically.
          </p>
        </form>
      )}
    </AuthLayout>
  );
}