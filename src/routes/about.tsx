import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Calendar, Code2, Palette, Pencil, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vivek Kumar" },
      {
        name: "description",
        content:
          "About Vivek Kumar — 21-year-old freelance developer and artist from India focused on modern digital experiences and creative design.",
      },
      { property: "og:title", content: "About — Vivek Kumar" },
      {
        property: "og:description",
        content: "Freelance developer & artist from India — passionate about craft and creativity.",
      },
      { property: "og:image", content: portrait },
      { name: "twitter:image", content: portrait },
    ],
  }),
  component: AboutPage,
});

const skills = [
  { icon: Code2, label: "Web Development", desc: "React, TypeScript, modern stacks" },
  { icon: Palette, label: "Design", desc: "Editorial layout, branding, UI" },
  { icon: Pencil, label: "Sketching", desc: "Hyper-realistic graphite portraits" },
];

const journey = [
  { year: "2021", title: "Started freelancing", desc: "First local business website launched." },
  { year: "2022", title: "Pencil portrait commissions", desc: "Crossed 50 hand-drawn portraits." },
  { year: "2023", title: "Magazine design clients", desc: "Designed birthday and college magazines." },
  { year: "2024", title: "Modern web focus", desc: "Specialised in conversion-driven websites." },
];

function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-gradient-primary blur-3xl opacity-30" />
              <div className="relative overflow-hidden rounded-3xl glass shadow-elegant">
                <img
                  src={portrait}
                  alt="Vivek Kumar"
                  width={768}
                  height={896}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-elegant">
                <p className="text-xs text-muted-foreground">Based in</p>
                <p className="text-sm font-semibold flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> India
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
              About Me
            </span>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold tracking-tight">
              Vivek <span className="text-gradient">Kumar</span>
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" /> 21 years old
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> India
              </span>
            </div>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I am a passionate freelancer with a growth mindset, focused on building modern digital
              experiences and creative designs. I enjoy working with clients and turning ideas into
              reality through websites and artwork.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-105 transition-transform"
              >
                See my work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border glass px-5 py-2.5 text-sm font-semibold transition-all hover:bg-secondary hover:scale-105"
              >
                Let's talk
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <section className="mt-28">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-center">
            What I bring to the table
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {skills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Journey timeline */}
        <section className="mt-28">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-center">
            My journey
          </h2>
          <div className="relative mt-12 max-w-2xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />
            <div className="space-y-10">
              {journey.map((j, i) => (
                <motion.div
                  key={j.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`relative flex flex-col sm:flex-row sm:items-center gap-4 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-3 w-3 items-center justify-center">
                    <span className="absolute h-3 w-3 rounded-full bg-gradient-primary shadow-glow" />
                  </div>
                  <div className="sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="glass rounded-2xl p-5 shadow-card">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {j.year}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold">{j.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{j.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
