import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en", "ja"];
const defaultLocale = "es";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname doesn't have a locale, redirect to default locale
  if (!pathnameHasLocale) {
    // Skip API routes, static files, and studio
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/studio") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Redirect to default locale
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|api|studio).*)",
};
