import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/utils/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Partner stories"
          title="Professionals who changed their trajectory"
          description="Real partners, real numbers — from first application to a stable monthly income."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="surface-card flex h-full flex-col p-7 hover:shadow-card"
            >
              <Quote className="size-7 text-accent/30" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <div className="mt-5 flex items-center gap-1" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={cn(
                      "size-4",
                      s < t.rating ? "fill-warning text-warning" : "text-border",
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <Avatar className="size-11">
                  <AvatarImage src={t.avatar} alt="" />
                  <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}