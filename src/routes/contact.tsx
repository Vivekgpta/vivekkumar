import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Instagram, Linkedin, MessageCircle, Mail, Send, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const CONTACT_PHONE = "9142457610"; // WhatsApp number (India)
const CONTACT_EMAIL = "vg877392@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vivek Kumar" },
      {
        name: "description",
        content:
          "Let's work together. Reach out to Vivek Kumar for websites, magazine design or pencil portrait commissions.",
      },
      { property: "og:title", content: "Contact — Vivek Kumar" },
      {
        property: "og:description",
        content: "Get in touch for freelance websites, magazines and portrait commissions.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim().slice(0, 100);
    const email = String(formData.get("email") || "").trim().slice(0, 255);
    const message = String(formData.get("message") || "").trim().slice(0, 1000);

    const composed =
      `Hi Vivek, I'd like to get in touch.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    setTimeout(() => {
      if (channel === "whatsapp") {
        const url = `https://wa.me/91${CONTACT_PHONE}?text=${encodeURIComponent(composed)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        const subject = `New project enquiry from ${name || "website"}`;
        const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(composed)}`;
        window.location.href = url;
      }
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

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
            Get in touch
          </span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold tracking-tight">
            Let's <span className="text-gradient">work together</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Tell me a little about your project — I usually respond within 24 hours.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative glass-strong rounded-3xl p-6 sm:p-8 shadow-elegant overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow"
                    >
                      <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-semibold">Message sent!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you. I'll get back to you very soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        type="text"
                        placeholder="Your name"
                        className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        required
                        type="email"
                        placeholder="you@email.com"
                        className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        maxLength={1000}
                        placeholder="Tell me about your project..."
                        className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                      />
                    </div>

                    <div>
                      <span className="block text-sm font-medium mb-2">Send via</span>
                      <div className="inline-flex rounded-xl border border-border p-1 bg-secondary/40">
                        <button
                          type="button"
                          onClick={() => setChannel("whatsapp")}
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            channel === "whatsapp"
                              ? "bg-gradient-primary text-primary-foreground shadow-glow"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => setChannel("email")}
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                            channel === "email"
                              ? "bg-gradient-primary text-primary-foreground shadow-glow"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Email
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Your message will open in {channel === "whatsapp" ? "WhatsApp" : "your email app"} pre-filled — just hit send.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                          Opening…
                        </>
                      ) : (
                        <>
                          {channel === "whatsapp" ? "Send on WhatsApp" : "Send via Email"}
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-3xl p-6 shadow-card">
              <h3 className="font-display text-xl font-semibold">Reach me directly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer email or messaging? Use any of the channels below.
              </p>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm hover:bg-secondary transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                    <Mail className="h-4 w-4 text-primary-foreground" />
                  </span>
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={`https://wa.me/91${CONTACT_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm hover:bg-secondary transition-colors"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                    <MessageCircle className="h-4 w-4 text-primary-foreground" />
                  </span>
                  WhatsApp · +91 {CONTACT_PHONE}
                </a>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-card">
              <h3 className="font-display text-xl font-semibold">Follow along</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                See more of my recent work on social.
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/91${CONTACT_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
