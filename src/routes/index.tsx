import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import commandCenter from "@/assets/command-center.jpg";
import droneNode from "@/assets/drone-node.jpg";
import heroSwamp from "@/assets/hero-swamp.jpg";
import { BreachSim } from "@/components/site/BreachSim";
import { Reveal } from "@/components/site/Reveal";
import { SwarmCanvas } from "@/components/site/SwarmCanvas";
import { ThreatRadar } from "@/components/site/ThreatRadar";

const TITLE = "Aegis Swarm v2.0 — Autonomous Drone Defence for Swamp Terrain";
const DESC =
  "Aegis Swarm v2.0 is an autonomous cyber-physical drone defence system built for rugged Indian swamp and delta terrain: rugged hardware, edge AI, and a unified command centre.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

const LAYERS = [
  {
    id: "01",
    name: "Rugged hardware",
    tag: "Physical layer",
    image: droneNode,
    copy: "IP67 amphibious airframes with salt-fog-hardened rotors, tethered relay masts, and buried fibre-optic tripwires that survive monsoon flooding and 45°C delta heat.",
    points: ["38 min loiter in 25 kt gusts", "Solar-charged floating nests", "Hot-swap sensor pods"],
  },
  {
    id: "02",
    name: "Edge AI",
    tag: "Cognitive layer",
    image: null,
    copy: "On-board fusion of thermal, acoustic, mmWave, and RF spectrum data. Classification happens on the airframe, so detection survives total loss of uplink.",
    points: ["Sub-300 ms classification", "Offline mesh consensus", "Anti-spoofing GNSS fallback"],
  },
  {
    id: "03",
    name: "Command centre",
    tag: "Decision layer",
    image: commandCenter,
    copy: "One tactical picture across every sector: live tracks, tamper-evident incident logs, rules of engagement, and one-tap re-tasking of the entire swarm.",
    points: ["Signed audit trail", "Role-based control", "Air-gapped deployment option"],
  },
];

const OUTCOMES = [
  { v: "9 s", l: "Median breach-to-response" },
  { v: "94%", l: "Nuisance-alert reduction" },
  { v: "24/7", l: "Unmanned sector coverage" },
  { v: "70%", l: "Lower patrol man-hours" },
];

const TICKER = [
  "MESH LINK NOMINAL",
  "SECTOR WB-256 CLEAR",
  "NODE 07 RETURNING TO NEST",
  "SPECTRUM SCAN COMPLETE",
  "TIDE OFFSET +0.4 M",
  "AUDIT LOG SIGNED",
];

function Index() {
  const [mode, setMode] = useState<"patrol" | "converge" | "sweep">("patrol");

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroSwamp}
          alt="Drone formation over an Indian mangrove swamp at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
        <div className="grid-field absolute inset-0 opacity-40" />
        <div className="absolute inset-0">
          <SwarmCanvas mode={mode} count={38} />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-32">
          <Reveal>
            <span className="label-mono">Autonomous perimeter defence · Sundarbans-class terrain</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              The swamp defends
              <span className="block text-primary">itself now.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Aegis Swarm v2.0 puts a self-healing lattice of autonomous drones over terrain no patrol can hold —
              detecting, classifying, and intercepting intrusions in under ten seconds, with or without a network.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/pricing"
                hash="brief"
                className="glow-ring rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
              >
                Request a briefing
              </Link>
              <a
                href="#breach"
                className="rounded-md border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
              >
                Run breach simulation
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-12 flex flex-wrap gap-2">
              {(["patrol", "converge", "sweep"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition ${
                    mode === m
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m} formation
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-border bg-surface/40 py-3">
        <div className="flex w-max gap-10" style={{ animation: "ticker 28s linear infinite" }}>
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Layers */}
      <section id="system" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <Reveal>
          <span className="label-mono">Three layers, one system</span>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Hardware that survives the delta. Intelligence that never phones home.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {LAYERS.map((l, i) => (
            <Reveal key={l.id} delay={i * 120} as="article">
              <div className="panel group h-full overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1 hover:glow-ring">
                {l.image ? (
                  <img
                    src={l.image}
                    alt={l.name}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-52 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                ) : (
                  <div className="relative h-52 overflow-hidden bg-background">
                    <SwarmCanvas mode="converge" count={26} />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-primary">{l.id}</span>
                    <span className="label-mono text-muted-foreground">{l.tag}</span>
                  </div>
                  <h3 className="mt-3 text-2xl">{l.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{l.copy}</p>
                  <ul className="mt-5 space-y-2">
                    {l.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
                        <span className="size-1.5 rotate-45 bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Threat detection */}
      <section id="detection" className="border-y border-border bg-surface/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="label-mono">Threat detection</span>
            <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
              Four sensors argue. The swarm decides in 300 milliseconds.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Wildlife, fishing boats, and tidal debris trip conventional perimeters constantly. Aegis fuses signatures
              across the mesh so operators only ever see what matters.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-14">
            <ThreatRadar />
          </Reveal>
        </div>
      </section>

      {/* Breach simulation */}
      <section id="breach" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <Reveal>
          <span className="label-mono">Simulated breach</span>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">Watch nine seconds of autonomous response.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Trigger an intrusion in mangrove channel 4 and follow the swarm through detection, classification, tracking,
            and hand-off — exactly as it plays out on the command wall.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-12">
          <BreachSim />
        </Reveal>
      </section>

      {/* Outcomes */}
      <section className="border-y border-border bg-surface/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <span className="label-mono">Outcomes</span>
            <h2 className="mt-4 text-4xl sm:text-5xl">What changes on day one.</h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.l} delay={i * 100}>
                <div className="h-full bg-background p-8">
                  <p className="font-display text-5xl text-primary">{o.v}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{o.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Figures from a modelled 40 km delta perimeter · illustrative
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 opacity-60">
          <SwarmCanvas mode="sweep" count={30} />
        </div>
        <div className="grid-field absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-6xl">
              Hold the ground you
              <span className="text-primary"> cannot patrol.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Deployment programmes start at ₹12 Lakhs per year per sector, including hardware, edge models, and command
              centre access.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/pricing"
                className="glow-ring rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition hover:opacity-90"
              >
                See pricing
              </Link>
              <Link
                to="/use-cases"
                className="rounded-md border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-primary hover:text-primary"
              >
                Explore deployments
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
