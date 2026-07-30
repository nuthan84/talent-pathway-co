import { useRef, useState } from "react";
import { motion } from "motion/react";
import { FileText, ImageIcon, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/common/status-badge";
import type { ProviderDocument } from "@/types";
import { cn } from "@/lib/utils";

/** Premium drag & drop upload card. UI-only: no network requests are made. */
export function FileUploadCard({ doc, index = 0 }: { doc: ProviderDocument; index?: number }) {
  const [state, setState] = useState(doc);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (fileName: string) => {
    setState((s) => ({ ...s, fileName, status: "uploaded", progress: 8 }));
    let p = 8;
    const timer = setInterval(() => {
      p += 14;
      if (p >= 100) {
        clearInterval(timer);
        setState((s) => ({ ...s, progress: 100, status: "verifying" }));
        toast.success(`${doc.label} uploaded`, { description: "Sent for verification." });
      } else {
        setState((s) => ({ ...s, progress: p }));
      }
    }, 220);
  };

  const Icon = state.type === "pdf" ? FileText : ImageIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="surface-card flex flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {state.label}
            {state.required ? <span className="ms-1 text-destructive">*</span> : null}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{state.hint}</p>
        </div>
        <StatusBadge status={state.status} />
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload ${state.label}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          simulateUpload(file?.name ?? "uploaded-document.pdf");
        }}
        className={cn(
          "mt-4 grid cursor-pointer place-items-center rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          dragging ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/60",
        )}
      >
        <UploadCloud className="size-6 text-accent" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-foreground">Drag & drop or browse</p>
        <p className="text-xs text-muted-foreground">PNG, JPG or PDF · max 5 MB</p>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept="image/*,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) simulateUpload(file.name);
          }}
        />
      </div>

      {state.fileName ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{state.fileName}</p>
            <Progress value={state.progress} className="mt-2 h-1.5" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toast.info(`Preview for ${state.label}`)}
          >
            Preview
          </Button>
        </div>
      ) : null}

      {state.status === "rejected" ? (
        <p className="mt-3 rounded-xl bg-destructive/10 p-3 text-xs font-medium text-destructive">
          Rejected: document expired. Please upload a certificate issued after Aug 2025.
        </p>
      ) : null}
    </motion.div>
  );
}