import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Palette, Code2, Pencil } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Counter } from "@/components/Counter";
import { works } from "@/data/works";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vivek Kumar — Freelance Creative Developer & Artist" },
      {
        name: "description",
        content:
          "Hi, I'm Vivek Kumar — I build modern websites and create personalized artistic experiences for clients across India.",
      },
      { property: "og:title", content: "Vivek Kumar — Freelance Creative Developer & Artist" },
      {
        property: "og:description",
        content: "Modern websites, magazine design and hand-drawn portraits.",
      },
    ],
  }),
  component: HomePage,
});

const featured = works.slice(0, 3);

function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-center font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            Hi, I'm <span className="text-gradient">Vivek Kumar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Freelance Creative Developer & Artist
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-3 text-center text-base text-muted-foreground max-w-2xl mx-auto"
          >
            I build modern websites and create personalized artistic experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border glass px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:scale-105"
            >
              Hire Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: 20, label: "Local Business Websites", icon: Code2 },
            { value: 30, label: "Magazines Designed", icon: Palette },
            { value: 120, label: "Hand-Drawn Sketch Portraits", icon: Pencil },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all"
            >
              <stat.icon className="h-6 w-6 text-primary" />
              <div className="mt-4 font-display text-4xl sm:text-5xl font-bold text-gradient">
                <Counter to={stat.value} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-28">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Featured Work
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Selected projects
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              A short intro: I blend technical craft with creative storytelling — from production
              websites for local businesses to hand-drawn portrait commissions.
            </p>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            See all work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((w, i) => (
            <motion.article
              key={w.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass shadow-card hover:shadow-elegant transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {w.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{w.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-28">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-16 text-center shadow-elegant">
          <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-20" />
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Have an idea? <span className="text-gradient">Let's build it.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Whether it's a website, a magazine or a portrait — I'd love to bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
