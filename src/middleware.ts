import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_PREFERENCE_KEY,
  isValidLocale,
} from "./lib/locale-persistence";
import { routing, type Locale } from "./i18n/routing";
import {
  PREVIEW_COOKIE,
  hasPreviewAccess,
  isSiteLive,
} from "./lib/site-gate";

const intlMiddleware = createMiddleware(routing);

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_PREFERENCE_KEY, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/preview/unlock") {
    return NextResponse.next();
  }

  if (pathname === "/coming-soon") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const previewCookie = request.cookies.get(PREVIEW_COOKIE)?.value;
  const gated = !isSiteLive() && !hasPreviewAccess(previewCookie);

  if (gated) {
    if (pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname === "/") {
    const preferred = request.cookies.get(LOCALE_PREFERENCE_KEY)?.value;
    if (preferred && isValidLocale(preferred)) {
      const response = NextResponse.redirect(
        new URL(`/${preferred}`, request.url),
      );
      setLocaleCookie(response, preferred);
      return response;
    }
  }

  const response = intlMiddleware(request);

  const segment = pathname.split("/")[1];
  if (segment && isValidLocale(segment)) {
    setLocaleCookie(response, segment);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
