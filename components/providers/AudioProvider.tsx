"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { audio as audioLinks } from "@/lib/links";

type AudioStatus = "idle" | "playing" | "paused" | "unavailable";

type AudioContextValue = {
  status: AudioStatus;
  /** True once the hosted loop has enough data to play (brief §8) */
  ready: boolean;
  toggle: () => void;
  pause: () => void;
  /** Live analyser for the WebGL visualiser; null until first play */
  analyser: AnalyserNode | null;
};

const Ctx = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used within <AudioProvider>");
  return v;
}

/**
 * Owns the single Web Audio graph that drives the hero visualiser (brief §8).
 * The AudioContext + MediaElementSource are built lazily on the first play
 * gesture (autoplay policy). If the hosted loop is missing/erroring, status
 * becomes "unavailable" so the UI can deep-link to Spotify instead.
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const elRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = new Audio();
    el.src = audioLinks.featuredLoop;
    el.loop = true;
    el.preload = "metadata";
    el.crossOrigin = "anonymous";
    const onReady = () => setReady(true);
    const onError = () => setStatus("unavailable");
    const onEnded = () => setStatus("paused");
    el.addEventListener("canplay", onReady);
    el.addEventListener("error", onError);
    el.addEventListener("ended", onEnded);
    elRef.current = el;
    return () => {
      el.pause();
      el.removeEventListener("canplay", onReady);
      el.removeEventListener("error", onError);
      el.removeEventListener("ended", onEnded);
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const buildGraph = useCallback(() => {
    if (ctxRef.current || !elRef.current) return;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const src = ctx.createMediaElementSource(elRef.current);
    const node = ctx.createAnalyser();
    node.fftSize = 1024;
    node.smoothingTimeConstant = 0.82;
    src.connect(node);
    node.connect(ctx.destination);
    ctxRef.current = ctx;
    srcRef.current = src;
    setAnalyser(node);
  }, []);

  const pause = useCallback(() => {
    elRef.current?.pause();
    setStatus((s) => (s === "playing" ? "paused" : s));
  }, []);

  const toggle = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    if (status === "playing") {
      pause();
      return;
    }
    buildGraph();
    void ctxRef.current?.resume();
    el.play().then(
      () => setStatus("playing"),
      () => setStatus("unavailable"),
    );
  }, [status, pause, buildGraph]);

  const value = useMemo<AudioContextValue>(
    () => ({ status, ready, toggle, pause, analyser }),
    [status, ready, toggle, pause, analyser],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
