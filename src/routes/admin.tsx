import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { z } from "zod";
import { Lock, Plus, Trash2, ImageIcon, LogOut, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCustomWorks } from "@/hooks/use-custom-works";
import { works as defaultWorks, type WorkCategory } from "@/data/works";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Manage Work" },
      { name: "description", content: "Private admin area to add new portfolio work." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

// Simple client-side gate. NOT real security — anyone with this passcode can edit.
// For real auth, enable Lovable Cloud and use proper user roles.
const ADMIN_PASSCODE = "vivek2024";
const SESSION_KEY = "vivek_admin_session_v1";

const categories: WorkCategory[] = ["Websites", "Magazines", "Sketches"];

const workSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(80, "Title must be under 80 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be under 300 characters"),
  category: z.enum(["Websites", "Magazines", "Sketches"]),
  image: z
    .string()
    .trim()
    .min(1, "Image is required")
    .max(2_000_000, "Image is too large (max ~1.5MB)"),
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  });

  if (!authed) return <PasscodeGate onSuccess={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}

function PasscodeGate({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim() === ADMIN_PASSCODE) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setError("");
      onSuccess();
    } else {
      setError("Incorrect passcode");
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl glass-strong p-8 shadow-elegant"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Lock className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Enter passcode to continue</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <Input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Passcode"
              autoFocus
              maxLength={64}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">
              <ShieldCheck className="h-4 w-4" /> Unlock
            </Button>
            <p className="text-[11px] text-muted-foreground">
              This is a lightweight client-side gate. For real protection, enable Lovable Cloud auth.
            </p>
          </form>
        </motion.div>
      </div>
    </PageShell>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { items, add, remove } = useCustomWorks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<WorkCategory>("Websites");
  const [image, setImage] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 1_500_000) {
      toast.error("Image too large. Max ~1.5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result || ""));
      setImageName(file.name);
    };
    reader.onerror = () => toast.error("Failed to read image");
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory("Websites");
    setImage("");
    setImageName("");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = workSchema.safeParse({ title, description, category, image });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Invalid input");
      return;
    }
    setSubmitting(true);
    const id = `${slugify(result.data.title)}-${Date.now().toString(36)}`;
    add({ id, ...result.data });
    toast.success("Work added");
    reset();
    setSubmitting(false);
  };

  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    onLogout();
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
              Admin
            </span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Manage <span className="text-gradient">work</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Add new portfolio entries. Saved locally in this browser.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/work"
              className="inline-flex items-center rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              View Work page
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 rounded-2xl glass-strong p-6 shadow-elegant space-y-4"
          >
            <h2 className="font-display text-xl font-semibold">Add new work</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bakery website redesign"
                maxLength={80}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary of the project"
                maxLength={300}
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={
                      "rounded-full px-4 py-1.5 text-xs font-medium border transition-colors " +
                      (category === c
                        ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                        : "border-border text-muted-foreground hover:text-foreground")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Image</label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 hover:bg-secondary/50">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {imageName || "Choose an image (max ~1.5MB)"}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
              </label>
              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="mt-2 h-32 w-full rounded-lg object-cover border border-border"
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-primary text-primary-foreground"
            >
              <Plus className="h-4 w-4" /> Add work
            </Button>
          </motion.form>

          {/* List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Your added works</h2>
              <span className="text-xs text-muted-foreground">
                {items.length} custom · {defaultWorks.length} default
              </span>
            </div>

            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                No custom works yet. Add your first one using the form.
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {items.map((w) => (
                  <motion.li
                    key={w.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative overflow-hidden rounded-2xl glass shadow-card"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={w.image} alt={w.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
                        {w.category}
                      </span>
                      <h3 className="mt-1 font-display text-base font-semibold line-clamp-1">
                        {w.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {w.description}
                      </p>
                      <button
                        onClick={() => {
                          remove(w.id);
                          toast.success("Removed");
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
