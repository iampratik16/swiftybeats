"use client";

import { useRef, useCallback, useEffect } from "react";

/**
 * BorderGlow (React Bits). Cursor-reactive mesh-gradient border + glow that
 * lights up as the pointer nears an edge. CSS lives in app/globals.css
 * (.border-glow-card ...) because Next App Router only allows global CSS from
 * the root layout. Glow layers sit at opacity 0 until hover, so idle/scroll
 * cost is negligible.
 */

type BorderGlowProps = {
  children: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string; // "H S L"
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  /** Show a static full-perimeter glow always (no hover needed, no per-frame cost) */
  alwaysOn?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

type Vars = Record<string, string | number>;

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number): Vars {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]): Vars {
  const vars: Vars = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInCubic = (x: number) => x * x * x;

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}) {
  function tick(t0: number) {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(() => tick(t0));
    else if (onEnd) onEnd();
  }
  setTimeout(() => {
    const t0 = performance.now();
    requestAnimationFrame(() => tick(t0));
  }, delay);
}

export function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 65",
  backgroundColor = "#131316",
  borderRadius = 20,
  glowRadius = 30,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  alwaysOn = false,
  colors = ["#e6b45a", "#6e56f6", "#2bd9c6"],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const getCenter = (el: HTMLElement): [number, number] => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const [cx, cy] = getCenter(card);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let degrees = 0;
    if (dx !== 0 || dy !== 0) {
      degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
    }
    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${degrees.toFixed(3)}deg`);
  }, []);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);
    animateValue({ duration: 500, onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`) });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (v) =>
        card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`),
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (v) =>
        card.style.setProperty("--cursor-angle", `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`),
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`),
      onEnd: () => card.classList.remove("sweep-active"),
    });
  }, [animated]);

  const styleVars: Vars = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={alwaysOn ? undefined : handlePointerMove}
      className={`border-glow-card ${alwaysOn ? "border-glow-always" : ""} ${className}`}
      style={styleVars as React.CSSProperties}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default BorderGlow;
