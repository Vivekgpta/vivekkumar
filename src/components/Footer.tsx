import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, MessageCircle, Mail, Sparkles } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold">
                Vivek<span className="text-gradient">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Crafting modern websites and personalized artistic experiences for clients worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Services</Link></li>
              <li><Link to="/work" className="hover:text-foreground transition-colors">Work</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919142457610" target="_blank" rel="noreferrer" aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="mailto:vg877392@gmail.com" aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-secondary hover:scale-105 transition-all">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Available for freelance opportunities.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year} Vivek Kumar. All rights reserved.</p>
          <p>Designed & built with care.</p>
        </div>
      </div>
    </footer>
  );
}
