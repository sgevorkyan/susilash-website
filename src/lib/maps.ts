import { CONTACT } from "@/lib/constants";

export function buildMapsUrls(address: string) {
  const query = encodeURIComponent(address);

  return {
    google: `https://www.google.com/maps/search/?api=1&query=${query}`,
    apple: `https://maps.apple.com/?address=${query}`,
    yandex: `https://yandex.com/maps/?text=${query}`,
    geo: `geo:0,0?q=${query}`,
  };
}

export function resolveMapsUrl(
  address: string,
  options: { userAgent: string; locale: string },
): string {
  const urls = buildMapsUrls(address);
  const ua = options.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return urls.apple;
  }

  if (/android/.test(ua)) {
    return urls.geo;
  }

  if (options.locale === "hy" || options.locale === "ru") {
    return urls.yandex;
  }

  if (/macintosh/.test(ua)) {
    return urls.apple;
  }

  return urls.google;
}

export const DEFAULT_MAPS_URL = buildMapsUrls(CONTACT.location).google;
