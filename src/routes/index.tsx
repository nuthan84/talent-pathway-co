import { createFileRoute } from "@tanstack/react-router";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { LandingCategories } from "@/components/landing/categories";
import { WhyJoin } from "@/components/landing/why-join";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { LandingFaq } from "@/components/landing/faq";
import { DownloadApp } from "@/components/landing/download-app";
import { LandingFooter } from "@/components/landing/footer";

const title = "ProConnect — Become a Verified Service Professional";
const description =
  "Join 68,000+ verified home-service professionals. Apply once, get verified in 48 hours and start earning with weekly payouts.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingCategories />
        <WhyJoin />
        <HowItWorks />
        <Testimonials />
        <LandingFaq />
        <DownloadApp />
      </main>
      <LandingFooter />
    </div>
  );
}
