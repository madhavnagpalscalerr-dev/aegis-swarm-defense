import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "System" },
  { to: "/use-cases", label: "Deployments" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative flex size-8 items-center justify-center rotate-45 border border-primary">
            <span className="size-2 -rotate-45 bg-primary" />
          </span>
          <span className="font-display text-sm tracking-[0.28em] uppercase">Aegis Swarm</span>
          <span className="font-mono text-[11px] text-primary">v2.0</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/pricing"
            hash="brief"
            className="rounded-md bg-primary px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
          >
            Request briefing
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
          className="flex size-9 flex-col items-center justify-center gap-1.5 border border-border md:hidden"
        >
          <span className={`h-px w-4 bg-foreground transition ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-foreground transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background/95 px-6 py-4 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.28em]">Aegis Swarm v2.0</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Autonomous cyber-physical perimeter defence for rugged Indian terrain.
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Concept demonstrator · figures illustrative
        </p>
      </div>
    </footer>
  );
}
