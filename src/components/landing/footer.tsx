import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Sparkles, Twitter } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Blog", "Contact"],
  },
  {
    title: "For professionals",
    links: ["Become a partner", "Training centres", "Partner app", "Payout policy", "Safety"],
  },
  {
    title: "Categories",
    links: ["Salon at home", "Appliance repair", "Electrician", "Home cleaning", "Fitness"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Partner agreement", "Grievance redressal"],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.4fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5" aria-label="ProConnect home">
              <span className="grid size-9 place-items-center rounded-xl gradient-accent text-accent-foreground">
                <Sparkles className="size-4.5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight">ProConnect</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              India's onboarding platform for verified home-service professionals. Apply once, get
              verified, start earning.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={["Instagram", "Twitter", "Facebook", "LinkedIn"][i]}
                  className="grid size-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 ProConnect Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made for service professionals across 42 Indian cities.
          </p>
        </div>
      </div>
    </footer>
  );
}