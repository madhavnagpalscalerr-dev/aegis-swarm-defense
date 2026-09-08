import { useEffect, useState } from "react";

const CONTACTS = [
  { id: "TRK-014", x: 32, y: 38, kind: "Hostile UAV", conf: 0.97, hostile: true },
  { id: "TRK-021", x: 68, y: 30, kind: "Boat wake", conf: 0.82, hostile: false },
  { id: "TRK-033", x: 58, y: 71, kind: "Foot intrusion", conf: 0.91, hostile: true },
  { id: "TRK-047", x: 22, y: 66, kind: "Wildlife", conf: 0.74, hostile: false },
];

export function ThreatRadar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % CONTACTS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="panel relative aspect-square overflow-hidden rounded-lg">
        <div className="grid-field absolute inset-0 opacity-60" />
        <div className="absolute inset-6 rounded-full border border-primary/25" />
        <div className="absolute inset-16 rounded-full border border-primary/20" />
        <div className="absolute inset-28 rounded-full border border-primary/15" />
        <div
          className="absolute inset-6 rounded-full"
          style={{
            animation: "sweep 4.5s linear infinite",
            background:
              "conic-gradient(from 0deg, color-mix(in oklab, var(--color-signal) 42%, transparent), transparent 22%)",
            maskImage: "radial-gradient(circle, black 62%, transparent 63%)",
          }}
        />
        {CONTACTS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${c.id} ${c.kind}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <span
              className={`block size-2.5 rounded-full ${c.hostile ? "bg-alert" : "bg-primary"} ${
                i === active ? "ring-4 ring-current/25" : ""
              }`}
            />
            {i === active && (
              <span
                className={`absolute inset-0 rounded-full ${c.hostile ? "bg-alert" : "bg-primary"}`}
                style={{ animation: "pulse-ring 1.6s ease-out infinite" }}
              />
            )}
          </button>
        ))}
        <span className="label-mono absolute bottom-4 left-4">Sector WB-256 · live feed</span>
      </div>

      <ul className="flex flex-col gap-3">
        {CONTACTS.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`panel w-full rounded-lg px-5 py-4 text-left transition-all duration-500 ${
                i === active ? "glow-ring translate-x-1" : "opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">{c.id}</span>
                <span
                  className={`font-mono text-[11px] uppercase tracking-widest ${
                    c.hostile ? "text-alert" : "text-primary"
                  }`}
                >
                  {c.hostile ? "Intercept" : "Cleared"}
                </span>
              </div>
              <p className="mt-1 font-display text-lg">{c.kind}</p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ${
                    c.hostile ? "bg-alert" : "bg-primary"
                  }`}
                  style={{ width: i === active ? `${c.conf * 100}%` : "12%" }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Classifier confidence {(c.conf * 100).toFixed(0)}% · fused thermal + acoustic + mmWave
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
