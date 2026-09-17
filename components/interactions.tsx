"use client";

import { useEffect, useRef, useState } from "react";
import { events, gallery, navigation, wedding } from "@/lib/wedding";
import { ArchMark, Photo } from "./primitives";

export function MotionController() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let frame = 0;
    let heroAway = false;
    const sweep = () => {
      frame = 0;
      pending = pending.filter(el => {
        if (media.matches || el.getBoundingClientRect().top < innerHeight * .92) { el.classList.add("visible"); return false; }
        return true;
      });
      document.documentElement.classList.toggle("scrolled", scrollY > 90);
      const active = navigation.filter(([id]) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 160).at(-1)?.[0] ?? "hero";
      document.querySelectorAll<HTMLAnchorElement>(".desktop-nav a").forEach(a => { if (a.hash === `#${active}`) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current"); });
      if (!media.matches) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach(el => {
          const parent = el.parentElement!.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (innerHeight - parent.top) / (innerHeight + parent.height)));
          el.style.setProperty("--drift", `${progress * Number(el.dataset.parallax)}px`);
          el.style.setProperty("--wash", `${.7 - progress * .15}`);
        });
        const hero = document.getElementById("hero")!;
        if (hero.getBoundingClientRect().bottom < 0) heroAway = true;
        if (heroAway && scrollY < 80) {
          heroAway = false;
          hero.getAnimations({ subtree: true }).forEach(animation => { animation.currentTime = 0; animation.play(); });
        }
      }
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(sweep); };
    document.documentElement.classList.add("motion-ready");
    sweep();
    addEventListener("scroll", request, { passive: true }); addEventListener("resize", request); media.addEventListener("change", request);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", request); removeEventListener("resize", request); media.removeEventListener("change", request); document.documentElement.classList.remove("motion-ready"); };
  }, []);
  return null;
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    if (open) { element.showModal(); document.body.style.overflow = "hidden"; }
    else { element.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return <>
    <header className="navigation"><a className="monogram" href="#hero" aria-label="Back to home"><ArchMark />{wedding.monogram}</a><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([id, name]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav><button ref={trigger} className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><span /><span /></button></header>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu" onCancel={close} onClose={() => setOpen(false)} aria-label="Navigation menu"><div className="menu-top"><span className="monogram"><ArchMark />{wedding.monogram}</span><button autoFocus onClick={close} aria-label="Close menu">×</button></div><nav aria-label="Mobile navigation">{navigation.map(([id, name], i) => <a key={id} href={`#${id}`} style={{ animationDelay: `${i * 60}ms` }} onClick={close}>{name}</a>)}</nav></dialog>
  </>;
}

export function Countdown() {
  const [values, setValues] = useState<string[]>(["—", "—", "—", "—"]);
  useEffect(() => {
    const tick = () => { const seconds = Math.max(0, Math.floor((Date.parse(wedding.target) - Date.now()) / 1000)); setValues([Math.floor(seconds / 86400), Math.floor(seconds % 86400 / 3600), Math.floor(seconds % 3600 / 60), seconds % 60].map(v => String(v).padStart(2, "0"))); };
    tick(); const timer = setInterval(tick, 1000); return () => clearInterval(timer);
  }, []);
  return <div className="countdown hero-enter delay-count" role="timer" aria-label={`Countdown to ${wedding.date}`} aria-live="off">{["Days", "Hours", "Mins", "Secs"].map((label, i) => <div key={label}><span className="count-number" key={values[i]}>{values[i]}</span><span className="count-label">{label}</span></div>)}</div>;
}

export function Schedule() {
  const [selected, setSelected] = useState(1);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [focused, setFocused] = useState(1);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const choose = (index: number) => {
    setFocused(index); if (timer.current) clearTimeout(timer.current);
    setFading(true); timer.current = setTimeout(() => { setSelected(index); setFading(false); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 200);
  };
  const event = events[selected];
  return <div className="schedule-content reveal">
    <div className="tabs" role="tablist" aria-label="Wedding event schedules">{events.map((item, i) => <button key={item.id} ref={el => { refs.current[i] = el; }} id={`tab-${item.id}`} role="tab" aria-selected={selected === i} aria-controls="schedule-panel" tabIndex={focused === i ? 0 : -1} onClick={() => choose(i)} onKeyDown={e => { let next = i; if (e.key === "ArrowRight") next = (i + 1) % 3; else if (e.key === "ArrowLeft") next = (i + 2) % 3; else if (e.key === "Home") next = 0; else if (e.key === "End") next = 2; else return; e.preventDefault(); refs.current[next]?.focus(); choose(next); }}>{item.name}</button>)}</div>
    <div id="schedule-panel" role="tabpanel" aria-labelledby={`tab-${event.id}`} tabIndex={0} className={`schedule-panel ${fading ? "fading" : ""}`}>
      <div className="schedule-title"><h3>{event.name}</h3><p className="meta">{event.day} {event.date}</p><p className="body">{event.venue} · {wedding.city}</p><a className="btn btn-light" href={`#venue-${event.id}`}>View Location</a></div>
      <div key={event.id} className="schedule-rail">{event.schedule.map(([time, name, note], i) => <div className="timeline-row" key={name} style={{ animationDelay: `${i * 60}ms` }}><span className="timeline-time">{time}</span><div className="timeline-copy"><h4>{name}</h4>{note && <p>{note}</p>}</div></div>)}</div>
    </div>
  </div>;
}

export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const choose = (value: string) => { if (timer.current) clearTimeout(timer.current); setFading(true); timer.current = setTimeout(() => { setFilter(value); setFading(false); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 150); };
  const items = gallery.filter(item => filter === "All" || item.category === filter);
  return <div className="gallery-content reveal"><div className="tabs" role="group" aria-label="Filter photographs">{["All", "Couple", "Engagement", "Family"].map(category => <button key={category} aria-pressed={filter === category} onClick={() => choose(category)}>{category}</button>)}</div><p className="sr-only" aria-live="polite">{items.length} photographs, {filter}</p><div className={`gallery-grid ${filter !== "All" ? "filtered" : ""} ${fading ? "fading" : ""}`}>{items.map((item, i) => <figure key={`${filter}-${item.id}`} style={{ animationDelay: `${i * 110}ms` }}><Photo id={item.id} /><figcaption>{item.category}</figcaption></figure>)}</div><button className="text-button" onClick={() => choose("All")}>View all photographs</button></div>;
}
