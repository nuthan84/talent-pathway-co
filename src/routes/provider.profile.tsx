import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  ClipboardCheck,
  FolderUp,
  MapPin,
  UserRound,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/common/page-transition";
import { FileUploadCard } from "@/components/common/file-upload";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api, type AuthUser } from "@/lib/api";
import { cn } from "@/lib/utils";
import { providerDocuments, serviceCategories } from "@/utils/data";
import mapImage from "@/assets/map-placeholder.jpg";

const title = "Complete Your Profile — ProConnect Partner";
const description =
  "A guided seven-step wizard covering personal details, services, experience, documents and payouts.";

export const Route = createFileRoute("/provider/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProfileWizard,
});

const steps = [
  { id: 1, label: "Personal details", icon: UserRound },
  { id: 2, label: "Service category", icon: Wrench },
  { id: 3, label: "Experience & skills", icon: ClipboardCheck },
  { id: 4, label: "Service area", icon: MapPin },
  { id: 5, label: "Documents", icon: FolderUp },
  { id: 6, label: "Bank details", icon: Banknote },
  { id: 7, label: "Review & submit", icon: Building2 },
];

const skillOptions = [
  "Wiring & rewiring",
  "Inverter setup",
  "Smart switches",
  "Fan & light fitting",
  "MCB / DB repair",
  "Emergency callouts",
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ProfileWizard() {
  const [step, setStep] = useState(1);
  const [radius, setRadius] = useState([12]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const navigate = useNavigate();
  const progress = Math.round((step / steps.length) * 100);

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

  const me = {
    name: user?.name ?? "Professional",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    category: String((profile?.category as string | undefined) ?? "Service Provider"),
    city: String((profile?.city as string | undefined) ?? "Your city"),
    experience: Number(profile?.experienceYears ?? 0),
    bio: String((profile?.bio as string | undefined) ?? ""),
    languages: Array.isArray(profile?.languages)
      ? (profile.languages as string[])
      : [],
  };
  const documentsUploadedCount = Array.isArray(profile?.documents)
    ? (profile.documents as Array<Record<string, unknown>>).length
    : 0;

  const next = async () => {
    if (step === steps.length) {
      try {
        await api.submitApplication();
        toast.success("Application submitted", {
          description: "We'll review your profile within 48 hours.",
        });
        navigate({ to: "/provider/status" });
      } catch {
        toast.error("Could not submit application", {
          description: "Please try again in a moment.",
        });
      }
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <PageTransition>
      <div className="space-y-7">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Complete your profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Step {step} of {steps.length} · takes about 10 minutes
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Stepper */}
          <aside className="surface-card h-fit p-5 lg:col-span-1">
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-xs font-semibold text-muted-foreground">{progress}% complete</p>
            <ol className="mt-6 space-y-1">
              {steps.map((s) => {
                const done = s.id < step;
                const active = s.id === step;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setStep(s.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-medium transition-colors",
                        active
                          ? "bg-accent-soft text-accent"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground",
                      )}
                      aria-current={active ? "step" : undefined}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold",
                          done
                            ? "bg-success text-success-foreground"
                            : active
                              ? "gradient-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="size-3.5" aria-hidden="true" /> : s.id}
                      </span>
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* Step content */}
          <section className="surface-card p-6 lg:col-span-3 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${user?._id ?? "guest"}-${profile?._id ?? "guest"}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {step === 1 ? (
                  <div className="space-y-5">
                    <StepTitle title="Personal details" hint="As printed on your government ID." />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="wFirst" label="First name" defaultValue={me.name.split(" ")[0] ?? me.name} />
                      <Field id="wLast" label="Last name" defaultValue={me.name.split(" ").slice(1).join(" ") || ""} />
                      <Field id="wDob" label="Date of birth" type="date" defaultValue="1989-04-12" />
                      <div className="space-y-2">
                        <Label htmlFor="wGender">Gender</Label>
                        <Select defaultValue="male">
                          <SelectTrigger id="wGender" className="h-12 w-full rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Field id="wEmail" label="Email" type="email" defaultValue={me.email} />
                      <Field id="wPhone" label="Mobile number" defaultValue={me.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wAddress">Residential address</Label>
                      <Textarea
                        id="wAddress"
                        rows={3}
                        className="rounded-xl"
                        defaultValue="Flat 402, Sai Residency, Kondapur, Hyderabad 500084"
                      />
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-5">
                    <StepTitle
                      title="Service category"
                      hint="Pick the category you want to receive jobs in."
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      {serviceCategories.slice(0, 8).map((c) => (
                        <label
                          key={c.id}
                          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft"
                        >
                          <Checkbox defaultChecked={c.id === "electrician"} className="mt-0.5" />
                          <span>
                            <span className="block text-sm font-semibold text-foreground">
                              {c.name}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {c.description} · {c.avgEarning}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-5">
                    <StepTitle title="Experience & skills" hint="Helps us match you to better jobs." />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="wYears" label="Years of experience" type="number" defaultValue={String(me.experience || 0)} />
                      <Field id="wLangs" label="Languages spoken" defaultValue={me.languages.join(", ") || "English"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wBio">Short bio</Label>
                      <Textarea id="wBio" rows={4} className="rounded-xl" defaultValue={me.bio} />
                    </div>
                    <fieldset>
                      <legend className="text-sm font-medium text-foreground">Key skills</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skillOptions.map((s, i) => (
                          <label
                            key={s}
                            className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent"
                          >
                            <Checkbox defaultChecked={i < 3} className="size-4" />
                            {s}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="space-y-5">
                    <StepTitle title="Service area" hint="Where do you want to take jobs?" />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="wCity" label="Base city" defaultValue={me.city} />
                      <Field id="wPin" label="Base pincode" defaultValue="500084" />
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-border">
                      <img
                        src={mapImage}
                        alt={`Service coverage map around ${me.city}`}
                        width={1024}
                        height={512}
                        loading="lazy"
                        className="aspect-[2/1] w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm font-medium text-foreground">
                        <span>Travel radius</span>
                        <span className="text-accent">{radius[0]} km</span>
                      </div>
                      <Slider
                        value={radius}
                        onValueChange={setRadius}
                        min={2}
                        max={40}
                        step={1}
                        className="mt-4"
                        aria-label="Travel radius in kilometres"
                      />
                    </div>
                    <fieldset>
                      <legend className="text-sm font-medium text-foreground">Working days</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {weekdays.map((d, i) => (
                          <label
                            key={d}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-sm transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent"
                          >
                            <Checkbox defaultChecked={i < 6} className="size-4" />
                            {d}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ) : null}

                {step === 5 ? (
                  <div className="space-y-5">
                    <StepTitle title="Documents" hint="Upload clear images or PDFs under 5 MB." />
                    <div className="grid gap-5 sm:grid-cols-2">
                      {providerDocuments.slice(0, 4).map((doc, i) => (
                        <FileUploadCard key={doc.id} doc={doc} index={i} />
                      ))}
                    </div>
                  </div>
                ) : null}

                {step === 6 ? (
                  <div className="space-y-5">
                    <StepTitle title="Bank details" hint="Payouts are credited every Tuesday." />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="wHolder" label="Account holder name" defaultValue={me.name} />
                      <Field id="wBank" label="Bank name" defaultValue="HDFC Bank" />
                      <Field id="wAcc" label="Account number" defaultValue="50100 2384 9921" />
                      <Field id="wIfsc" label="IFSC code" defaultValue="HDFC0001234" />
                      <Field id="wUpi" label="UPI ID (optional)" defaultValue="ramesh@okhdfcbank" />
                      <Field id="wPan" label="PAN number" defaultValue="AXWPK8821L" />
                    </div>
                  </div>
                ) : null}

                {step === 7 ? (
                  <div className="space-y-5">
                    <StepTitle title="Review & submit" hint="Check everything before submitting." />
                    <dl className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["Name", me.name],
                        ["Category", me.category],
                        ["Experience", `${me.experience} years`],
                        ["Service area", `${me.city} · ${radius[0]} km radius`],
                        ["Documents", `${documentsUploadedCount} uploaded`],
                        ["Payout account", "Bank details on file"],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-2xl bg-surface px-4 py-3">
                          <dt className="text-xs text-muted-foreground">{k}</dt>
                          <dd className="mt-1 text-sm font-semibold text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="flex items-center gap-3 rounded-2xl bg-accent-soft p-4">
                      <StatusBadge status="under_review" label="48 hr review" />
                      <p className="text-sm text-foreground">
                        You'll get an SMS and email as soon as a decision is made.
                      </p>
                    </div>
                    <label className="flex items-start gap-2">
                      <Checkbox id="wConfirm" defaultChecked className="mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        I confirm the information provided is accurate and complete.
                      </span>
                    </label>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex items-center justify-between gap-3 border-t border-border pt-6">
              <Button
                type="button"
                variant="outline"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="h-11 rounded-xl font-semibold"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back
              </Button>
              <Button
                type="button"
                onClick={next}
                className="h-11 rounded-xl gradient-accent px-6 font-semibold text-accent-foreground shadow-accent hover:opacity-90"
              >
                {step === steps.length ? "Submit application" : "Save & continue"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

function StepTitle({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} defaultValue={defaultValue} className="h-12 rounded-xl" />
    </div>
  );
}