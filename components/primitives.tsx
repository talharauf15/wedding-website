import Image from "next/image";
import { photos } from "@/lib/wedding";

// `position` is object-position: these crops are tight, so it decides which part
// of a photo survives. "50% 70%" pulls the visible window down the image.
export type PhotoSpec = { src: string; alt: string; position?: string; zoom?: number };
// Either `id` (looked up in the shared photos map) or an inline `photo`, which
// lets list data such as brideParty carry its own portraits.
export function Photo({ id, photo: spec, className = "", priority = false, sizes = "(min-width: 1100px) 45vw, (min-width: 768px) 60vw, 100vw" }: { id?: string; photo?: PhotoSpec; className?: string; priority?: boolean; sizes?: string }) {
  const photo = spec ?? photos[id!];
  return <div className={`photo ${className}`}>
    {photo.src ? <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: photo.position, transform: photo.zoom ? `scale(${photo.zoom})` : undefined, transformOrigin: photo.position }} /> : <div className="photo-placeholder"><span>Photograph to come</span><em>{photo.alt}</em></div>}
  </div>;
}
export function Arch({ className = "" }: { className?: string }) {
  return <svg className={`arch-outline reveal draw ${className}`} viewBox="0 0 640 760" fill="none" aria-hidden="true" preserveAspectRatio="none"><path d="M1 760V380C1 152 206 76 320 1C434 76 639 152 639 380V760" pathLength="1" /></svg>;
}
export function Ornament() { return <div className="ornament" aria-hidden="true"><span /><i /><span /></div>; }
// The mark is the pointed arch, never a decorative glyph — see DESIGN-SPEC §1.
export function ArchMark() {
  return <svg className="arch-mark" viewBox="0 0 26 34" fill="none" aria-hidden="true"><path d="M1 33V22A24 24 0 0 1 13 1.2A24 24 0 0 1 25 22v11" /></svg>;
}
export function Heading({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="section-heading"><p className="eyebrow reveal">{label}</p><h2 className="reveal">{children}</h2></div>;
}
