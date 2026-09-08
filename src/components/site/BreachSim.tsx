import { useEffect, useRef, useState } from "react";

const STEPS = [
  { t: "T+0.0s", title: "Perimeter tripped", detail: "Buried fibre sensor registers movement in mangrove channel 4." },
  { t: "T+0.8s", title: "Swarm re-tasked", detail: "Three nearest nodes break patrol lattice and vector to the contact." },
  { t: "T+2.4s", title: "Target classified", detail: "Edge model fuses thermal + acoustic signature: two-person intrusion, 94%." },
  { t: "T+4.1s", title: "Track locked", detail: "Relay node holds mesh link; command centre receives live overhead feed." },
  { t: "T+6.5s", title: "Response dispatched", detail: "Ground team routed on dry-path navigation; deterrent lighting armed." },
  { t: "T+9.0s", title: "Sector secured", detail: "Contact escorted out of the exclusion zone. Incident log auto-signed." },
];

export function BreachSim() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setRunning(false);
          return s;
        }
        return s + 1;
      });
    }, 1300);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  const start = () => {
    setStep(0);
    setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setStep(-1);
  };

  const armed = step >= 0;
  const done = step === STEPS.length - 1 && !running;

  return (
    <div className="panel overflow-hidden rounded-xl">
      <div
        className={`flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 transition-colors duration-500 ${
          armed && !done ? "bg-alert/10" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`size-2.5 rounded-full ${armed && !done ? "bg-alert" : done ? "bg-primary" : "bg-muted-foreground"}`}
            style={armed && !done ? { animation: "pulse-ring 1.4s ease-out infinite" } : undefined}
          />
          <span className="label-mono">
            {done ? "Sector secured" : armed ? "Breach in progress" : "Simulation standby"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={start}
            disabled={running}
            className="rounded-md bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            Trigger breach
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[300px] overflow-hidden border-b md:border-b-0 md:border-r">
          <div className="grid-field absolute inset-0 opacity-50" />
          <div
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-primary/12 to-transparent"
            style={{ animation: "scan-line 6s linear infinite" }}
          />
          {[
            { x: 20, y: 26 },
            { x: 74, y: 22 },
            { x: 46, y: 52 },
            { x: 80, y: 68 },
            { x: 26, y: 76 },
          ].map((n, i) => {
            const converged = armed && i < 3;
            return (
              <span
                key={i}
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary bg-primary/30 transition-all duration-[1200ms] ease-out"
                style={{
                  left: converged ? `${52 + i * 4}%` : `${n.x}%`,
                  top: converged ? `${60 + i * 3}%` : `${n.y}%`,
                }}
              />
            );
          })}
          <span
            className={`absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${
              armed ? "bg-alert opacity-100" : "opacity-0"
            }`}
            style={{ left: "60%", top: "68%", animation: armed ? "pulse-ring 1.8s ease-out infinite" : undefined }}
          />
          <span className="label-mono absolute bottom-4 left-4">Channel 4 · mangrove belt</span>
        </div>

        <ol className="divide-y">
          {STEPS.map((s, i) => (
            <li
              key={s.t}
              className={`flex gap-4 px-6 py-4 transition-all duration-500 ${
                i <= step ? "opacity-100" : "opacity-30"
              }`}
            >
              <span className="mt-1 font-mono text-xs tracking-widest text-primary">{s.t}</span>
              <div>
                <p className="font-display text-base">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
