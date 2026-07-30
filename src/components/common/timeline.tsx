import { motion } from "motion/react";
import { Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  description: string;
  date?: string;
  state: "done" | "current" | "upcoming" | "failed";
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-8 ps-10">
      <span
        className="absolute top-2 bottom-2 left-[15px] w-px bg-border"
        aria-hidden="true"
      />
      {entries.map((entry, i) => (
        <motion.li
          key={entry.title}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
          className="relative"
        >
          <span
            className={cn(
              "absolute top-0.5 -left-10 grid size-8 place-items-center rounded-full ring-4 ring-background",
              entry.state === "done" && "bg-success text-success-foreground",
              entry.state === "current" && "bg-accent text-accent-foreground",
              entry.state === "failed" && "bg-destructive text-destructive-foreground",
              entry.state === "upcoming" && "bg-muted text-muted-foreground",
            )}
          >
            {entry.state === "failed" ? (
              <X className="size-4" aria-hidden="true" />
            ) : entry.state === "done" ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <Clock className="size-4" aria-hidden="true" />
            )}
          </span>
          <h3 className="text-sm font-semibold text-foreground">{entry.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
          {entry.date ? (
            <p className="mt-1 text-xs font-medium text-muted-foreground/80">{entry.date}</p>
          ) : null}
        </motion.li>
      ))}
    </ol>
  );
}