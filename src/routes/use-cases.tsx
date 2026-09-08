import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SwarmCanvas } from "@/components/site/SwarmCanvas";

const TITLE = "Deployments — Pipelines, Comms Towers & Naval Perimeters | Aegis Swarm";
const DESC =
  "How Aegis Swarm v2.0 protects cross-country pipelines, remote communications infrastructure, and naval perimeters across India's delta and swamp terrain.";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: UseCases,
});

const CASES = [
  {
    key: "pipelines",
    name: "Pipelines",
    kicker: "Cross-country energy corridors",
    body: "Hot-tap theft and sabotage cluster where pipelines cross marsh and mangrove — precisely where foot patrols cannot reach at night. Aegis flies the right-of-way on a rolling schedule and holds a persistent watch on valve stations.",
    metrics: [
      ["40 km", "Corridor per sector"],
      ["11 min", "Full right-of-way sweep"],
      ["6", "Valve stations under watch"],
    ],
  },
  {
    key: "comms",
    name: "Communications infrastructure",
    kicker: "Remote towers and landing stations",
    body: "Copper theft, generator siphoning, and RF interference at unmanned tower sites drive outage costs. Swarm nodes double as spectrum sensors, flagging jamming and rogue transmitters alongside physical intrusions.",
    metrics: [
      ["120", "Sites per command centre"],
      ["<300 ms", "Signature classification"],
      ["0", "Fibre trenching required"],
    ],
  },
  {
    key: "naval",
    name: "Naval perimeters",
    kicker: "Creek approaches and harbour flanks",
    body: "Small craft using tidal creeks stay under coastal radar. Amphibious nodes launch from floating nests, hold station in gusts, and hand tracks to harbour control with a signed chain of custody.",
    metrics: [
      ["18 km", "Creek approach coverage"],
      ["25 kt", "Sustained wind tolerance"],
      ["100%", "Tamper-evident logging"],
    ],
  },
] as const;

function UseCases() {
  const [active, setActive] = useState(0);
  const c = CASES[active]!;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border pb-16 pt-36">
        <div className="absolute inset-0 opacity-50">
          <SwarmCanvas mode="patrol" count={30} />
        </div>
        <div className="grid-field absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="label-mono">Deployments</span>
            <h1 className="mt-4 max-w-3xl text-5xl sm:text-6xl">Three terrains that break conventional security.</h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Every Aegis programme is scoped to a sector: a defined perimeter, a nest network, and a response doctrine
              agreed with your security leadership.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap gap-2">
          {CASES.map((x, i) => (
            <button
              key={x.key}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-md border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition ${
                i === active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>

        <div key={c.key} className="panel mt-8 grid gap-0 rounded-xl lg:grid-cols-[1.2fr_1fr]">
          <div className="p-8 lg:p-12">
            <span className="label-mono">{c.kicker}</span>
            <h2 className="mt-4 text-4xl">{c.name}</h2>
            <p className="mt-5 max-w-xl text-muted-foreground">{c.body}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {c.metrics.map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl text-primary">{v}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden border-t lg:border-l lg:border-t-0">
            <SwarmCanvas mode={active === 2 ? "sweep" : active === 1 ? "converge" : "patrol"} count={34} />
            <span className="label-mono absolute bottom-4 left-4">Formation preview · {c.name}</span>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-4xl">Scoping a sector of your own?</h2>
            <p className="mt-4 text-muted-foreground">
              Bring a map and a threat history. We return a nest layout, coverage model, and response timeline.
            </p>
            <Link
              to="/pricing"
              hash="brief"
              className="glow-ring mt-8 inline-block rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
            >
              Request a briefing
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
