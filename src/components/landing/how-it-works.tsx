import { motion } from "motion/react";
import { ClipboardCheck, FileCheck2, Rocket, UserPlus } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    body: "Register with your phone number and verify it with a one-time password. Takes under two minutes.",
  },
  {
    icon: ClipboardCheck,
    title: "Complete your profile",
    body: "Add personal details, categories, skills, service area and bank details in a guided 7-step wizard.",
  },
  {
    icon: FileCheck2,
    title: "Upload & get verified",
    body: "Submit Aadhaar, PAN and police verification. Our team reviews everything within 48 hours.",
  },
  {
    icon: Rocket,
    title: "Start earning",
    body: "Get your branded kit, attend training and receive your first job leads the same week.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps from application to your first job"
          description="A transparent onboarding funnel — you can see exactly where your application stands at every moment."
        />

        <div className="relative mt-14">
          <span
            className="absolute top-6 right-0 left-0 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative"
              >
                <span className="relative z-10 grid size-12 place-items-center rounded-2xl border border-border bg-card text-accent shadow-soft">
                  <s.icon className="size-5.5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-bold tracking-widest text-accent uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}