import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Eye, SearchX, X } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/common/page-transition";
import { DataTableToolbar } from "@/components/common/data-table-toolbar";
import { EmptyState } from "@/components/common/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { providers } from "@/utils/data";
import type { Provider } from "@/types";

const title = "Applications — ProConnect Admin";
const description =
  "Search, filter and action partner onboarding applications with full document context.";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Provider | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(providers.map((p) => p.category))).sort(),
    [],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providers.filter((p) => {
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q);
      return (
        matchQ &&
        (status === "all" || p.status === status) &&
        (category === "all" || p.category === category)
      );
    });
  }, [query, status, category]);

  const action = (p: Provider, approved: boolean) => {
    setSelected(null);
    if (approved) {
      toast.success(`${p.name} approved`, { description: "Partner app access has been granted." });
    } else {
      toast.error(`${p.name} rejected`, { description: "The applicant has been notified." });
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Applications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} of {providers.length} applications shown
          </p>
        </header>

        <DataTableToolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />

        {rows.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No applications match"
            description="Try clearing the search text or resetting the status and category filters."
            actionLabel="Reset filters"
            onAction={() => {
              setQuery("");
              setStatus("all");
              setCategory("all");
            }}
          />
        ) : (
          <div className="surface-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-surface">
                    <TableHead>Applicant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarImage src={p.avatar} alt="" />
                            <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{p.category}</TableCell>
                      <TableCell className="text-sm">{p.city}</TableCell>
                      <TableCell className="text-sm">{p.experience} yrs</TableCell>
                      <TableCell className="text-sm">{p.appliedOn}</TableCell>
                      <TableCell>
                        <StatusBadge status={p.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Review ${p.name}`}
                            onClick={() => setSelected(p)}
                            className="min-h-11 min-w-11 rounded-xl"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Approve ${p.name}`}
                            onClick={() => action(p, true)}
                            className="min-h-11 min-w-11 rounded-xl text-success hover:bg-success/10"
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Reject ${p.name}`}
                            onClick={() => action(p, false)}
                            className="min-h-11 min-w-11 rounded-xl text-destructive hover:bg-destructive/10"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
            {selected ? (
              <>
                <SheetHeader>
                  <SheetTitle>{selected.name}</SheetTitle>
                  <SheetDescription>
                    {selected.id} · applied {selected.appliedOn}
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 px-4 pb-8">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-14">
                      <AvatarImage src={selected.avatar} alt="" />
                      <AvatarFallback>{selected.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <StatusBadge status={selected.status} />
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {selected.category} · {selected.city}, {selected.state}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">{selected.bio}</p>

                  <dl className="grid grid-cols-2 gap-3">
                    {[
                      ["Experience", `${selected.experience} years`],
                      ["Rating", String(selected.rating)],
                      ["Phone", selected.phone],
                      ["Languages", selected.languages.join(", ")],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-surface px-3.5 py-2.5">
                        <dt className="text-xs text-muted-foreground">{k}</dt>
                        <dd className="mt-0.5 text-sm font-semibold text-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Skills</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => action(selected, false)}
                      className="h-11 flex-1 rounded-xl font-semibold text-destructive hover:bg-destructive/10"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => action(selected, true)}
                      className="h-11 flex-1 rounded-xl gradient-accent font-semibold text-accent-foreground"
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </SheetContent>
        </Sheet>
      </div>
    </PageTransition>
  );
}