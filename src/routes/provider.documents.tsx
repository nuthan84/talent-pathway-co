import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageTransition } from "@/components/common/page-transition";
import { FileUploadCard } from "@/components/common/file-upload";
import { api, type AuthUser } from "@/lib/api";
import type { ProviderDocument } from "@/types";

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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);

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

  const documents = useMemo<ProviderDocument[]>(() => {
    const backendDocuments = Array.isArray(profile?.documents)
      ? (profile.documents as Array<Record<string, unknown>>)
      : [];

    return backendDocuments.length > 0
      ? backendDocuments.map((doc, index) => ({
          id: String(doc.label ?? `doc-${index + 1}`),
          label: String(doc.label ?? `Document ${index + 1}`),
          hint: String(doc.hint ?? "Upload a clear image or PDF to continue verification."),
          required: Boolean(doc.required),
          status: String(doc.status ?? "missing") as ProviderDocument["status"],
          fileName: typeof doc.fileName === "string" ? doc.fileName : undefined,
          progress: 100,
          type: String(doc.type ?? "image") as "image" | "pdf",
        }))
      : [
          {
            id: "aadhaar",
            label: "Aadhaar Card",
            hint: "Front & back, JPG or PDF up to 5 MB",
            required: true,
            status: "missing",
            progress: 0,
            type: "image",
          },
          {
            id: "pan",
            label: "PAN Card",
            hint: "Clear photo of the original card",
            required: true,
            status: "missing",
            progress: 0,
            type: "pdf",
          },
          {
            id: "photo",
            label: "Profile Photo",
            hint: "Recent passport-size photo on plain background",
            required: true,
            status: "missing",
            progress: 0,
            type: "image",
          },
          {
            id: "police",
            label: "Police Verification",
            hint: "Issued within the last 12 months",
            required: true,
            status: "missing",
            progress: 0,
            type: "pdf",
          },
        ];
  }, [profile]);

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
          {documents.map((doc, i) => (
            <FileUploadCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Signed in as {user?.name ?? "provider"} · {user?.email ?? ""}
        </p>
      </div>
    </PageTransition>
  );
}