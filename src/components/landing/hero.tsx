import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Search, ShieldCheck, Star, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-professional.jpg";

const trustPoints = [
  { icon: Wallet, label: "Weekly payouts" },
  { icon: ShieldCheck, label: "Free insurance cover" },
  { icon: BadgeCheck, label: "Verified job leads" },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            Onboarding open in 42 cities
          </span>

          <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Grow your service career with <span className="text-gradient">ProConnect</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Join 68,000+ verified professionals earning a predictable income. Apply once, get
            verified in 48 hours and start receiving jobs near you.
          </p>

          <div className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-card sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                aria-label="Search a service category"
                placeholder="Search a service — electrician, salon, cleaning…"
                className="h-12 rounded-xl border-transparent bg-surface ps-11 text-sm"
              />
            </div>
            <Link to="/register">
              <Button
                size="lg"
                className="h-12 w-full rounded-xl px-6 font-semibold gradient-accent text-accent-foreground shadow-accent hover:opacity-90 sm:w-auto"
              >
                Apply Now
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustPoints.map((t) => (
              <li key={t.label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <t.icon className="size-4.5 text-accent" aria-hidden="true" />
                {t.label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-card">
            <img
              src={heroImage}
              alt="Verified ProConnect service professional with a toolkit at a customer's home"
              width={1024}
              height={1280}
              className="h-[420px] w-full object-cover object-top sm:h-[520px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="absolute -bottom-6 -left-2 w-56 rounded-2xl border border-border bg-card p-4 shadow-card sm:left-6"
          >
            <p className="text-xs font-medium text-muted-foreground">Average monthly earning</p>
            <p className="mt-1 text-2xl font-bold text-foreground">₹46,800</p>
            <p className="mt-1 text-xs font-semibold text-success">+18% after ProConnect</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -top-4 right-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-card"
          >
            <Star className="size-4 fill-warning text-warning" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground">4.86</span>
            <span className="text-xs text-muted-foreground">partner rating</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}