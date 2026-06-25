import { NextRequest, NextResponse } from "next/server";
import {
  PREVIEW_COOKIE,
  PREVIEW_COOKIE_MAX_AGE,
  isSiteLive,
} from "@/lib/site-gate";
import { isValidLocale } from "@/lib/locale-persistence";
import { routing } from "@/i18n/routing";

function setPreviewCookie(response: NextResponse) {
  response.cookies.set(PREVIEW_COOKIE, "1", {
    path: "/",
    maxAge: PREVIEW_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

function safeRedirectPath(request: NextRequest, candidate: string | null) {
  if (candidate && candidate.startsWith("/") && !candidate.startsWith("//")) {
    const locale = candidate.split("/")[1];
    if (locale && isValidLocale(locale)) {
      return candidate;
    }
  }

  const preferred = request.cookies.get("susilash-locale")?.value;
  if (preferred && isValidLocale(preferred)) {
    return `/${preferred}`;
  }

  return `/${routing.defaultLocale}`;
}

export async function GET(request: NextRequest) {
  const redirect = safeRedirectPath(
    request,
    request.nextUrl.searchParams.get("redirect"),
  );
  const response = NextResponse.redirect(new URL(redirect, request.url));

  if (!isSiteLive()) {
    setPreviewCookie(response);
  }

  return response;
}

export async function POST(request: NextRequest) {
  const redirect = safeRedirectPath(request, null);
  const response = NextResponse.redirect(new URL(redirect, request.url));

  if (!isSiteLive()) {
    setPreviewCookie(response);
  }

  return response;
}
