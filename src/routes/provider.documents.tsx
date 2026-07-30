import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { FileUploadCard } from "@/components/common/file-upload";
import { providerDocuments } from "@/utils/data";

const title = "Upload Documents — ProConnect Partner";
const description =
  "Upload and track verification of your Aadhaar, PAN, police verification and skill certificates.";

export const Route = createFileRoute("/provider/documents")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <PageTransition>
      <div className="space-y-7">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Clear photos or PDFs only. Verification usually completes within 24 hours.
          </p>
        </header>

        <div className="flex items-start gap-3 rounded-2xl bg-accent-soft p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-foreground">
            Your documents are encrypted at rest and shared only with our verification partner.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {providerDocuments.map((doc, i) => (
            <FileUploadCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}