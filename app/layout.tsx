import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/latin-300.css";
import "@fontsource/cormorant-garamond/latin-300-italic.css";
import "@fontsource/jost/latin-300.css";
import "@fontsource/jost/latin-400.css";
import "@fontsource/jost/latin-500.css";
import "@fontsource/amiri/arabic-400.css";
import "./globals.css";
import { wedding } from "@/lib/wedding";

export const metadata: Metadata = {
  title: `${wedding.bride} & ${wedding.groom} — ${wedding.date}`,
  description: `Join us to celebrate our wedding on ${wedding.date}, in ${wedding.city}, Pakistan. Events, ceremony details and directions.`,
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F8F5EF" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: extensions (ColorZilla, Grammarly, password managers)
  // add their own attributes to <body> before hydration; the inline script below
  // sets data-opened on <html>. One level deep only, so genuine mismatches inside
  // the app are still reported.
  return <html lang="en" suppressHydrationWarning>
    <head>
      {/* Runs synchronously during parse, so reduced-motion users never see the
          envelope flash. See Next.js "preventing flash before hydration". */}
      <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-opened","1")}catch(e){}})()` }} />
    </head>
    <body suppressHydrationWarning>{children}</body>
  </html>;
}
