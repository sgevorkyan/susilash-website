import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { Button } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/PhoneIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { CONTACT } from "@/lib/constants";
import {
  formatCourseDate,
  getPastCourses,
  getUpcomingCourses,
  type CourseMeta,
} from "@/lib/courses";

interface CourseCopy {
  id: string;
  title: string;
  location: string;
  description: string;
  guests: string;
}

function CourseCard({
  course,
  copy,
  dateLabel,
}: {
  course: CourseMeta;
  copy: CourseCopy;
  dateLabel: string;
}) {
  return (
    <article className="h-full overflow-hidden border border-foreground/8 bg-background">
      <div className="relative aspect-[4/5] bg-beige/30">
        <Image
          src={course.poster}
          alt={copy.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-8 md:p-10">
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
          {dateLabel}
        </p>
        <h3 className="font-serif text-xl md:text-2xl font-light tracking-tight">
          {copy.title}
        </h3>
        <p className="mt-2 text-sm text-muted font-light">{copy.location}</p>
        <p className="mt-4 text-muted text-sm md:text-base font-light leading-relaxed">
          {copy.description}
        </p>
        <p className="mt-4 text-sm text-foreground/80 font-light">
          {copy.guests}
        </p>
      </div>
    </article>
  );
}

function CourseGrid({
  courses,
  copyById,
  locale,
}: {
  courses: CourseMeta[];
  copyById: Map<string, CourseCopy>;
  locale: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl">
      {courses.map((course) => {
        const copy = copyById.get(course.id);
        if (!copy) return null;

        return (
          <FadeIn key={course.id}>
            <CourseCard
              course={course}
              copy={copy}
              dateLabel={formatCourseDate(course.date, locale)}
            />
          </FadeIn>
        );
      })}
    </div>
  );
}

export async function Courses() {
  const t = await getTranslations("courses");
  const locale = await getLocale();
  const upcoming = getUpcomingCourses();
  const past = getPastCourses();
  const items = t.raw("items") as CourseCopy[];
  const details = t.raw("details") as string[];
  const body = t.raw("body") as string[];
  const copyById = new Map(items.map((item) => [item.id, item]));

  return (
    <section className="pt-28 pb-24 md:pt-32 md:pb-32 lg:pb-40">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <SectionHeading
          title={t("title")}
          action={
            <LinkButton href="/" variant="outline">
              {t("backToHome")}
            </LinkButton>
          }
        />

        <FadeIn className="max-w-2xl mb-16 md:mb-24 -mt-8 md:-mt-12">
          <p className="text-muted text-base md:text-lg leading-relaxed font-light">
            {t("intro")}
          </p>
          <ul className="mt-6 space-y-3">
            {details.map((item) => (
              <li
                key={item}
                className="text-sm md:text-base text-foreground/80 font-light flex items-start gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-2.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-4">
            {body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted text-base md:text-lg leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Button href={`tel:${CONTACT.phone}`}>
              <PhoneIcon />
              {t("bookCall")}
            </Button>
            <Button href={CONTACT.instagram} variant="outline" external>
              <InstagramIcon />
              {t("bookInstagram")}
            </Button>
          </div>
        </FadeIn>

        <div className="space-y-20 md:space-y-24">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight mb-8 md:mb-10">
              {t("upcoming")}
            </h2>
            {upcoming.length > 0 ? (
              <CourseGrid
                courses={upcoming}
                copyById={copyById}
                locale={locale}
              />
            ) : (
              <p className="text-muted text-base md:text-lg font-light leading-relaxed max-w-xl">
                {t("upcomingEmpty")}
              </p>
            )}
          </div>

          {past.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight mb-8 md:mb-10">
                {t("past")}
              </h2>
              <CourseGrid courses={past} copyById={copyById} locale={locale} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
