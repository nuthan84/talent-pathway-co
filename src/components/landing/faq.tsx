import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/common/section-heading";
import { faqs } from "@/utils/data";

export function LandingFaq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Answers before you apply"
          description="Still unsure? Our partner helpline is available 24×7 in 8 regional languages."
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}