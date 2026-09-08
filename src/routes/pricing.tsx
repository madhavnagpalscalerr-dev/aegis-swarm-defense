import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";

const TITLE = "Pricing — Enterprise Programmes from ₹12 Lakhs/Year | Aegis Swarm v2.0";
const DESC =
  "Aegis Swarm v2.0 enterprise pricing for Indian deployments: sector programmes from ₹12 Lakhs per year, including hardware, edge AI, and command centre access.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    name: "Sentinel",
    price: "₹12 Lakhs",
    unit: "per year · 1 sector",
    blurb: "A single perimeter under continuous autonomous watch.",
    features: [
      "6 amphibious nodes + 2 nests",
      "Edge classification pack",
      "Cloud command centre, 5 seats",
      "Business-hours response desk",
    ],
    featured: false,
  },
  {
    name: "Bastion",
    price: "₹42 Lakhs",
    unit: "per year · up to 4 sectors",
    blurb: "Multi-sector coverage with a shared tactical picture.",
    features: [
      "24 nodes + relay mast network",
      "Spectrum & anti-jamming module",
      "Unlimited command seats",
      "24/7 response desk, 15 min SLA",
      "Quarterly red-team exercise",
    ],
    featured: true,
  },
  {
    name: "Sovereign",
    price: "Custom",
    unit: "national & defence programmes",
    blurb: "Air-gapped deployment under your own doctrine.",
    features: [
      "On-premise, air-gapped command",
      "Model tuning on your terrain data",
      "Indigenous supply-chain compliance",
      "Embedded engineering detachment",
    ],
    featured: false,
  },
];

const FAQ = [
  {
    q: "What counts as a sector?",
    a: "A contiguous perimeter of up to 40 km of corridor or 25 sq km of area, served by one nest network.",
  },
  {
    q: "Is hardware included in the annual fee?",
    a: "Yes. Airframes, nests, sensor pods, and replacements for fair wear are covered for the term of the programme.",
  },
  {
    q: "Does it work without connectivity?",
    a: "Detection and classification run entirely on the airframe. The mesh reaches consensus locally and syncs logs when a link returns.",
  },
  {
    q: "How long is deployment?",
    a: "Site survey to live coverage typically runs six to ten weeks, depending on monsoon windows and clearances.",
  },
];

function Pricing() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="border-b border-border pb-16 pt-36">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="label-mono">Indian enterprise pricing</span>
            <h1 className="mt-4 max-w-3xl text-5xl sm:text-6xl">Programmes from ₹12 Lakhs per year.</h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              One annual figure per sector. Hardware, edge intelligence, command centre, and response are not sold
              separately.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div
                className={`panel flex h-full flex-col rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                  t.featured ? "glow-ring border-primary/50" : ""
                }`}
              >
                {t.featured && <span className="label-mono">Most deployed</span>}
                <h2 className="mt-2 text-2xl">{t.name}</h2>
                <p className="mt-6 font-display text-4xl text-primary">{t.price}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t.unit}</p>
                <p className="mt-5 text-sm text-muted-foreground">{t.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#brief"
                  className={`mt-8 rounded-md px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition ${
                    t.featured
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  Request briefing
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Prices exclusive of GST · indicative for concept evaluation
        </p>
      </section>

      <section className="border-y border-border bg-surface/30 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl">Questions procurement always asks</h2>
          <ul className="mt-8 divide-y border-y">
            {FAQ.map((f, i) => (
              <li key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg">{f.q}</span>
                  <span className={`text-primary transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <p className="overflow-hidden text-sm text-muted-foreground">
                    <span className="block pb-5">{f.a}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="brief" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
        <span className="label-mono">Request a briefing</span>
        <h2 className="mt-4 text-4xl">Bring us a perimeter.</h2>
        <p className="mt-4 text-muted-foreground">
          Share the terrain and threat picture; we will come back with a nest layout and coverage model.
        </p>

        {sent ? (
          <div className="panel glow-ring mt-10 rounded-xl p-8">
            <p className="font-display text-2xl text-primary">Request logged</p>
            <p className="mt-2 text-sm text-muted-foreground">
              This demonstrator does not send anything yet — connect a mailbox or database to receive real enquiries.
            </p>
          </div>
        ) : (
          <form
            className="panel mt-10 grid gap-5 rounded-xl p-8 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "org", label: "Organisation", type: "text" },
              { id: "email", label: "Work email", type: "email" },
              { id: "sector", label: "Site / sector location", type: "text" },
            ].map((f) => (
              <div key={f.id} className="flex flex-col gap-2">
                <label htmlFor={f.id} className="label-mono">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  required
                  className="rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label htmlFor="notes" className="label-mono">
                Threat picture
              </label>
              <textarea
                id="notes"
                rows={4}
                className="rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="glow-ring rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90 sm:col-span-2"
            >
              Submit request
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
