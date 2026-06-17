import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, BookOpen, Pencil, ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Vivek Kumar" },
      {
        name: "description",
        content:
          "Web development for local businesses, magazine design and hyper-realistic pencil portraits — services tailored to your story.",
      },
      { property: "og:title", content: "Services — Vivek Kumar" },
      {
        property: "og:description",
        content: "Web development, magazine design and hand-drawn portrait services.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Code2,
    title: "Website Development",
    subtitle: "for Local Businesses",
    description:
      "Fast, responsive, modern websites that turn visitors into customers — SEO-friendly and mobile optimized from day one.",
    features: [
      "Mobile-first responsive design",
      "Fast load times & Core Web Vitals",
      "SEO optimised structure",
      "Easy-to-update content",
    ],
  },
  {
    icon: BookOpen,
    title: "Magazine Design",
    subtitle: "Birthday • Anniversary • College",
    description:
      "Custom layouts and creative themes for personal magazines that become keepsakes worth holding on to.",
    features: [
      "Bespoke editorial layouts",
      "Custom typography & themes",
      "Print-ready PDF delivery",
      "Personal photo curation",
    ],
  },
  {
    icon: Pencil,
    title: "Pencil Portrait Sketches",
    subtitle: "Hyper-Realistic Hand-Drawn",
    description:
      "Hand-drawn portraits from your photos with hyper-realistic shading and detail — perfect as gifts and heirlooms.",
    features: [
      "From any reference photo",
      "Premium archival paper",
      "Glass-framed delivery option",
      "120+ portraits delivered",
    ],
  },
];

function ServicesPage() {
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
            What I Do
          </span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold tracking-tight">
            Services crafted with <span className="text-gradient">care</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Three focused crafts — built around quality, communication and your unique story.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 shadow-card hover:shadow-elegant transition-all"
            >
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-primary opacity-10 blur-3xl group-hover:opacity-30 transition-opacity" />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="text-sm text-primary mt-1">{s.subtitle}</p>
              <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>

              <ul className="mt-6 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-gradient-primary hover:text-primary-foreground hover:shadow-glow"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
