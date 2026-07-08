// Living overlay for image panels: drifting gold particles + a periodic light
// sweep, so the "patterns move". Pure CSS transform/opacity (compositor-only) —
// no canvas, no rAF, no scroll cost. Decorative, so aria-hidden. Fixed values
// (no Math.random) keep SSR and client identical.
const PARTICLES = [
  { l: "12%", t: "22%", s: 3, d: "0s", dur: "6.5s" },
  { l: "24%", t: "68%", s: 2, d: "1.2s", dur: "7.5s" },
  { l: "33%", t: "40%", s: 4, d: "0.4s", dur: "6s" },
  { l: "44%", t: "78%", s: 2, d: "2.1s", dur: "8s" },
  { l: "52%", t: "30%", s: 3, d: "0.8s", dur: "7s" },
  { l: "61%", t: "58%", s: 2, d: "1.6s", dur: "6.8s" },
  { l: "68%", t: "18%", s: 4, d: "0.2s", dur: "7.8s" },
  { l: "74%", t: "72%", s: 2, d: "2.6s", dur: "6.2s" },
  { l: "82%", t: "44%", s: 3, d: "1s", dur: "7.2s" },
  { l: "88%", t: "64%", s: 2, d: "0.6s", dur: "8.2s" },
  { l: "18%", t: "52%", s: 2, d: "3s", dur: "6.6s" },
  { l: "57%", t: "84%", s: 3, d: "1.9s", dur: "7.4s" },
];

export function PanelFX() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-bright"
          style={{
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s,
            boxShadow: "0 0 6px 1px rgba(242,200,120,0.6)",
            animation: `particle-float ${p.dur} ease-in-out ${p.d} infinite alternate`,
          }}
        />
      ))}
      {/* Light sweep — a soft diagonal glint travelling across the panel */}
      <span
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-gold/15 to-transparent"
        style={{ animation: "sheen-sweep 9s ease-in-out infinite", willChange: "transform" }}
      />
    </div>
  );
}
