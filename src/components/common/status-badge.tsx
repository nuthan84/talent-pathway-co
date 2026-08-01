import { cn } from "@/lib/utils";
import { statusLabels } from "@/utils/data";

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const toneMap: Record<string, Tone> = {
  approved: "success",
  documents_verified: "info",
  under_review: "warning",
  submitted: "info",
  rejected: "danger",
  draft: "neutral",
  verified: "success",
  verifying: "warning",
  uploaded: "info",
  missing: "neutral",
};

const toneClasses: Record<Tone, string> = {
  success: "bg-success/10 text-success ring-success/20",
  warning: "bg-warning/15 text-warning-foreground ring-warning/30",
  danger: "bg-destructive/10 text-destructive ring-destructive/20",
  info: "bg-accent/10 text-accent ring-accent/20",
  neutral: "bg-muted text-muted-foreground ring-border",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: string;
  label?: string;
  className?: string;
}) {
  const tone = toneMap[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset capitalize",
        toneClasses[tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label ?? statusLabels[status] ?? status.replace(/_/g, " ")}
    </span>
  );
}