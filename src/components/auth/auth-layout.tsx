import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import authImage from "@/assets/auth-illustration.jpg";

/** Split-screen shell shared by every authentication screen. */
export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Visual panel */}
      <aside className="relative hidden overflow-hidden gradient-dark lg:block">
        <img
          src={authImage}
          alt=""
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2.5" aria-label="ProConnect home">
            <span className="grid size-9 place-items-center rounded-xl gradient-accent text-accent-foreground">
              <Sparkles className="size-4.5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold text-background">ProConnect</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="max-w-md text-4xl leading-tight font-bold text-background">
              Your next 5 years of steady work start here.
            </h2>
            <p className="mt-4 max-w-md text-background/70">
              One application. Verified in 48 hours. Weekly payouts, insurance and training
              included.
            </p>

            <div className="mt-10 grid max-w-md gap-3 sm:grid-cols-3">
              {[
                { icon: Users, value: "68.4k", label: "Partners" },
                { icon: Star, value: "4.86", label: "Avg. rating" },
                { icon: ShieldCheck, value: "₹5L", label: "Insurance" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-background/10 p-4 backdrop-blur-sm">
                  <s.icon className="size-4 text-accent" aria-hidden="true" />
                  <p className="mt-2 text-xl font-bold text-background">{s.value}</p>
                  <p className="text-xs text-background/60">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <p className="text-xs text-background/50">© 2026 ProConnect Technologies Pvt. Ltd.</p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-background px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer ? <div className="mt-8 text-sm text-muted-foreground">{footer}</div> : null}
        </motion.div>
      </main>
    </div>
  );
}