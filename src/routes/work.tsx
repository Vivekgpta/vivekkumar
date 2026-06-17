import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { works, type WorkCategory } from "@/data/works";
import { useCustomWorks } from "@/hooks/use-custom-works";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Vivek Kumar" },
      {
        name: "description",
        content:
          "Selected freelance work — websites for local businesses, magazine designs and hand-drawn pencil portraits.",
      },
      { property: "og:title", content: "Work — Vivek Kumar" },
      {
        property: "og:description",
        content: "Portfolio of websites, magazine designs and pencil portrait artwork.",
      },
    ],
  }),
  component: WorkPage,
});

const filters: ("All" | WorkCategory)[] = ["All", "Websites", "Magazines", "Sketches"];

function WorkPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const { items: customWorks } = useCustomWorks();
  const allWorks = [...customWorks, ...works];
  const filtered = active === "All" ? allWorks : allWorks.filter((w) => w.category === active);

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
            Portfolio
          </span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold tracking-tight">
            Recent <span className="text-gradient">work</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            A curated look at projects across web, print and pencil.
          </p>
        </motion.div>

        {/* Filters */}
        <LayoutGroup>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="relative rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span
                  className={
                    active === f
                      ? "relative z-10 text-primary-foreground"
                      : "relative z-10"
                  }
                >
                  {f}
                </span>
                {active === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((w) => (
              <motion.article
                key={w.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl glass shadow-card hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium uppercase tracking-widest text-primary">
                    {w.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {w.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageShell>
  );
}
