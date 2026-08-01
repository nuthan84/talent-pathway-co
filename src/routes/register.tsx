import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceCategories } from "@/utils/data";
import { api, ApiError, setToken } from "@/lib/api";

const title = "Register as a Professional — ProConnect";
const description =
  "Create your ProConnect partner account in two minutes and start the verified onboarding process.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Become a Professional"
      subtitle="Create your account — verification takes about 48 hours."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-accent hover:underline">
            Log in instead
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value;
          const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value;
          const email = (form.elements.namedItem("regEmail") as HTMLInputElement).value;
          const phone = (form.elements.namedItem("regPhone") as HTMLInputElement).value;
          const password = (form.elements.namedItem("regPassword") as HTMLInputElement).value;

          setLoading(true);
          try {
            const { token } = await api.register({
              name: `${firstName} ${lastName}`.trim(),
              email,
              phone: `+91${phone}`,
              password,
              category,
            });
            setToken(token);
            toast.success("Account created", { description: "Welcome to ProConnect." });
            navigate({ to: "/provider" });
          } catch (err) {
            const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
            toast.error("Registration failed", { description: message });
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required className="h-12 rounded-xl" placeholder="Ramesh" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required className="h-12 rounded-xl" placeholder="Kulkarni" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regEmail">Email address</Label>
          <Input
            id="regEmail"
            name="regEmail"
            type="email"
            required
            className="h-12 rounded-xl"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regPhone">Mobile number</Label>
          <div className="flex gap-2">
            <span className="grid h-12 w-16 shrink-0 place-items-center rounded-xl border border-input bg-surface text-sm font-medium">
              +91
            </span>
            <Input
              id="regPhone"
              name="regPhone"
              type="tel"
              required
              inputMode="numeric"
              className="h-12 rounded-xl"
              placeholder="98490 21134"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regCategory">Primary service category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="regCategory" className="h-12 w-full rounded-xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {serviceCategories.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regPassword">Create password</Label>
          <Input
            id="regPassword"
            name="regPassword"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="h-12 rounded-xl"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="terms" required className="mt-0.5" />
          <Label htmlFor="terms" className="text-sm leading-relaxed font-normal text-muted-foreground">
            I agree to the partner agreement, terms of service and privacy policy.
          </Label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl font-semibold gradient-accent text-accent-foreground shadow-accent hover:opacity-90"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
