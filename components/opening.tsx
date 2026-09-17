"use client";

import { useEffect, useRef } from "react";
import { ArchMark } from "./primitives";
import { wedding } from "@/lib/wedding";

const SKIP_EVENTS = ["pointerdown", "wheel", "touchmove", "keydown"] as const;

/** The envelope: a sealed ivory cover that parts to reveal the hero underneath.
 *  Plays on every load, skippable, and never shown under reduced motion. */
export function Opening() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Any intent to interact jumps the cover to its end state.
    const skip = () => el.getAnimations({ subtree: true }).forEach(a => a.finish());
    SKIP_EVENTS.forEach(e => addEventListener(e, skip, { once: true, passive: true }));
    // Skipping and playing out share this path: finish() resolves the same promises.
    let live = true;
    Promise.all(el.getAnimations({ subtree: true }).map(a => a.finished))
      .then(() => { if (live) el.setAttribute("data-done", ""); })
      .catch(() => { /* cancelled on unmount */ });
    return () => { live = false; SKIP_EVENTS.forEach(e => removeEventListener(e, skip)); };
  }, []);
  return <div ref={ref} className="opening" aria-hidden="true">
    <div className="opening-panel" />
    <div className="opening-panel" />
    <div className="opening-seal"><ArchMark /><p>{wedding.monogram}</p><span className="opening-rule" /></div>
  </div>;
}
