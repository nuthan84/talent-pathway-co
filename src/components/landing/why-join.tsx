import { motion } from "motion/react";
import {
  CalendarClock,
  GraduationCap,
  HeartHandshake,
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable income",
    body: "Guaranteed job volume in your area with transparent per-job pricing and weekly settlements every Tuesday.",
  },
  {
    icon: CalendarClock,
    title: "You own your schedule",
    body: "Set availability slots and a service radius up to 25 km. Pause anytime without penalty.",
  },
  {
    icon: GraduationCap,
    title: "Free skill training",
    body: "Category-specific certification programmes at 30+ training centres, plus refreshers in the partner app.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance & safety",
    body: "₹5 lakh accident cover, in-app SOS and verified customer profiles on every booking.",
  },
  {
    icon: HeartHandshake,
    title: "Growth to crew leader",
    body: "Top-rated partners get crew-lead roles, equipment loans and priority premium bookings.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated support",
    body: "A named onboarding specialist plus 24×7 partner helpline in 8 regional languages.",
  },
];

export function WhyJoin() {
  return (
    <section id="why-join" className="scroll-mt-24 bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why join us"
          title="Everything a professional needs to grow"
          description="ProConnect handles demand, payments and trust so you can focus on the craft you're great at."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -5 }}
              className="surface-card p-7 hover:shadow-card"
            >
              <span className="grid size-12 place-items-center rounded-2xl gradient-accent text-accent-foreground shadow-accent">
                <b.icon className="size-5.5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl gradient-dark p-8 text-center sm:grid-cols-4 sm:p-10">
          {[
            { value: "68,400+", label: "Active professionals" },
            { value: "42", label: "Cities live" },
            { value: "₹46,800", label: "Avg. monthly earning" },
            { value: "48 hrs", label: "Avg. verification time" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-background">{s.value}</p>
              <p className="mt-1 text-sm text-background/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}