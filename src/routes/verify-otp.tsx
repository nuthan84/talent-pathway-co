import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const title = "Verify OTP — ProConnect";
const description = "Enter the 6-digit one-time password sent to your registered mobile number.";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const [value, setValue] = useState("");
  const [seconds, setSeconds] = useState(38);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <AuthLayout
      title="Verify your number"
      subtitle="We sent a 6-digit code to +91 98490 •••34. Enter it below to continue."
      footer={
        <Link to="/register" className="font-semibold text-accent hover:underline">
          Change mobile number
        </Link>
      }
    >
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            toast.success("Number verified", { description: "Let's complete your profile." });
            navigate({ to: "/provider/profile" });
          }, 700);
        }}
      >
        <InputOTP maxLength={6} value={value} onChange={setValue} aria-label="One-time password">
          <InputOTPGroup className="gap-2.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="size-13 rounded-xl border border-input text-lg font-semibold"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <p className="text-sm text-muted-foreground">
          {seconds > 0 ? (
            <>
              Resend code in <span className="font-semibold text-foreground">0:{String(seconds).padStart(2, "0")}</span>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSeconds(38);
                toast.info("A new OTP has been sent");
              }}
              className="font-semibold text-accent hover:underline"
            >
              Resend code
            </button>
          )}
        </p>

        <Button
          type="submit"
          disabled={loading || value.length < 6}
          className="h-12 w-full rounded-xl font-semibold gradient-accent text-accent-foreground shadow-accent hover:opacity-90"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Verify & continue
        </Button>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
          Never share this code. ProConnect staff will never ask for it.
        </p>
      </form>
    </AuthLayout>
  );
}