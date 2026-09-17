import { NextRequest, NextResponse } from "next/server";

// Logs visible in Vercel dashboard -> Logs (Runtime Logs), one line per request.
export function middleware(req: NextRequest) {
  console.log({
    ip: req.headers.get("x-forwarded-for") ?? "unknown",
    country: req.headers.get("x-vercel-ip-country") ?? "unknown",
    city: req.headers.get("x-vercel-ip-city") ?? "unknown",
    latitude: req.headers.get("x-vercel-ip-latitude") ?? "unknown",
    longitude: req.headers.get("x-vercel-ip-longitude") ?? "unknown",
    timezone: req.headers.get("x-vercel-ip-timezone") ?? "unknown",
    userAgent: req.headers.get("user-agent") ?? "unknown",
    referer: req.headers.get("referer") ?? "direct",
    path: req.nextUrl.pathname,
    time: new Date().toISOString(),
  });

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
