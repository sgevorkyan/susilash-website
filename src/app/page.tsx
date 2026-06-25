import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RootLanding } from "@/components/RootLanding";
import { LOCALE_PREFERENCE_KEY, isValidLocale } from "@/lib/locale-persistence";
import { routing } from "@/i18n/routing";
import {
  PREVIEW_COOKIE,
  hasPreviewAccess,
  isSiteLive,
} from "@/lib/site-gate";

export default async function HomePage() {
  const cookieStore = await cookies();
  const previewCookie = cookieStore.get(PREVIEW_COOKIE)?.value;

  if (isSiteLive() || hasPreviewAccess(previewCookie)) {
    const preferred = cookieStore.get(LOCALE_PREFERENCE_KEY)?.value;
    const locale =
      preferred && isValidLocale(preferred)
        ? preferred
        : routing.defaultLocale;
    redirect(`/${locale}`);
  }

  return <RootLanding />;
}
