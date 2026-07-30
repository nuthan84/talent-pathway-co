import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  accent = "accent",
  index = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  accent?: "accent" | "success" | "warning" | "danger";
  index?: number;
}) {
  const accentClass = {
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/10 text-destructive",
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="surface-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid size-10 place-items-center rounded-xl", accentClass)}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      {delta ? (
        <p
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-semibold",
            trend === "up" ? "text-success" : "text-destructive",
          )}
        >
          {trend === "up" ? (
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          ) : (
            <ArrowDownRight className="size-3.5" aria-hidden="true" />
          )}
          {delta}
          <span className="font-normal text-muted-foreground">vs last month</span>
        </p>
      ) : null}
    </motion.div>
  );
}