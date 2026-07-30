import { motion } from "motion/react";
import { Apple, Bell, IndianRupee, MapPin, Play, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadApp() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 overflow-hidden rounded-[32px] gradient-dark px-8 py-12 sm:px-12 lg:grid-cols-2 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-xs font-semibold text-background">
              <Smartphone className="size-3.5" aria-hidden="true" />
              Partner app
            </span>
            <h2 className="mt-5 text-3xl font-bold text-background sm:text-4xl">
              Manage every job from your phone
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-background/70">
              Track your application, accept jobs, navigate to customers and view payout statements
              — all in one lightweight app built for low-data networks.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Bell, text: "Instant job alerts" },
                { icon: MapPin, text: "Smart route planning" },
                { icon: IndianRupee, text: "Live earnings tracker" },
                { icon: Smartphone, text: "Works on 3 MB/day" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-2.5 text-sm text-background/85">
                  <f.icon className="size-4 text-accent" aria-hidden="true" />
                  {f.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 gap-2 rounded-xl px-5 font-semibold"
              >
                <Apple className="size-4.5" aria-hidden="true" />
                App Store
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 gap-2 rounded-xl px-5 font-semibold"
              >
                <Play className="size-4.5" aria-hidden="true" />
                Google Play
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[300px]"
          >
            <div className="rounded-[36px] border-8 border-background/15 bg-card p-4 shadow-card">
              <p className="text-xs font-semibold text-muted-foreground">Today · Thu 30 Jul</p>
              <p className="mt-1 text-2xl font-bold text-foreground">₹3,240 earned</p>
              <div className="mt-4 space-y-3">
                {[
                  { title: "AC deep clean", time: "10:00 AM · Jubilee Hills", amount: "₹1,180" },
                  { title: "Wiring repair", time: "1:30 PM · Banjara Hills", amount: "₹960" },
                  { title: "Fan installation", time: "5:00 PM · Madhapur", amount: "₹1,100" },
                ].map((job) => (
                  <div
                    key={job.title}
                    className="flex items-center justify-between rounded-xl bg-surface p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{job.title}</p>
                      <p className="text-[11px] text-muted-foreground">{job.time}</p>
                    </div>
                    <span className="text-sm font-bold text-success">{job.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}