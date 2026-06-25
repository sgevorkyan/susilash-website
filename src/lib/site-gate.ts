export const PREVIEW_COOKIE = "susilash-preview";
export const PREVIEW_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function isSiteLive() {
  return process.env.SITE_LIVE === "true";
}

export function hasPreviewAccess(cookieValue: string | undefined) {
  return cookieValue === "1";
}
