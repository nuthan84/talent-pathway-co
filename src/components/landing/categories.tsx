import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { serviceCategories } from "@/utils/data";

export function LandingCategories() {
  return (
    <section id="categories" className="scroll-mt-24 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Service categories"
          title="Pick the trade you're best at"
          description="We onboard specialists across 12 high-demand categories. Every category comes with training, branded kits and guaranteed job volume."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((category, i) => {
            const Icon = (Icons[category.icon as keyof typeof Icons] ??
              Icons.Sparkles) as Icons.LucideIcon;
            return (
              <motion.article
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -6 }}
                className="surface-card group p-6 transition-shadow hover:shadow-card"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-colors group-hover:gradient-accent group-hover:text-accent-foreground">
                  <Icon className="size-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{category.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                <dl className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Open jobs</dt>
                    <dd className="mt-0.5 font-semibold text-foreground">
                      {category.jobs.toLocaleString("en-IN")}
                    </dd>
                  </div>
                  <div className="text-right">
                    <dt className="text-muted-foreground">Avg. earning</dt>
                    <dd className="mt-0.5 font-semibold text-success">{category.avgEarning}</dd>
                  </div>
                </dl>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}