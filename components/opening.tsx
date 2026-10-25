"use client";

import { useRef } from "react";
import { ArchMark } from "./primitives";
import { wedding } from "@/lib/wedding";


/** The envelope: two ivory doors held shut by a wax seal. Tapping the seal splits
 *  it with the doors and starts the hero underneath. Never shown under reduced motion. */
export function Opening() {
  const ref = useRef<HTMLDivElement>(null);
  const seal = <div className="seal" aria-hidden="true"><ArchMark /><p>{wedding.monogram}</p></div>;
  return <div ref={ref} className="opening" onAnimationEnd={e => { if (e.animationName === "door-right") ref.current?.setAttribute("data-done", ""); }}>
    <div className="door door-left"><div className="jaali" />{seal}</div>
    <div className="door door-right"><div className="jaali" />{seal}</div>
    <div className="opening-copy">
      <p className="opening-names">{wedding.bride}<em>&amp;</em>{wedding.groom}</p>
      <span />
      <p className="opening-hint">{wedding.date}<br /><em>Tap the seal to open</em></p>
    </div>
    <button className="seal-button" aria-label="Open the invitation" onClick={() => document.documentElement.setAttribute("data-opening", "")} />
  </div>;
}
