export interface CourseMeta {
  id: string;
  /** ISO calendar date: YYYY-MM-DD */
  date: string;
  /** Optional end date for multi-day events: YYYY-MM-DD */
  endDate?: string;
  poster: string;
  width: number;
  height: number;
}

export const COURSES: CourseMeta[] = [
  {
    id: "yerevan-2026-09-19",
    date: "2026-09-19",
    endDate: "2026-09-20",
    poster: "/courses/yerevan-2026-09-19.webp",
    width: 2565,
    height: 3206,
  },
  {
    id: "essen-2026-10-02",
    date: "2026-10-02",
    poster: "/courses/essen-2026-10-02.webp",
    width: 1890,
    height: 2363,
  },
  {
    id: "yerevan-2026-04-10",
    date: "2026-04-10",
    poster: "/courses/yerevan-2026-04-10.webp",
    width: 1890,
    height: 2363,
  },
];

export function isCourseUpcoming(date: string, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return date >= today;
}

export function getUpcomingCourses(now = new Date()) {
  return COURSES.filter((course) => isCourseUpcoming(course.date, now)).sort(
    (a, b) => a.date.localeCompare(b.date),
  );
}

export function getPastCourses(now = new Date()) {
  return COURSES.filter((course) => !isCourseUpcoming(course.date, now)).sort(
    (a, b) => b.date.localeCompare(a.date),
  );
}

function formatSingleDate(date: string, locale: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export function formatCourseDate(course: CourseMeta, locale: string) {
  if (!course.endDate) {
    return formatSingleDate(course.date, locale);
  }

  const [startYear, startMonth, startDay] = course.date.split("-").map(Number);
  const [endYear, endMonth, endDay] = course.endDate.split("-").map(Number);
  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);

  // Same month & year → "19–20 September 2026"
  if (startYear === endYear && startMonth === endMonth) {
    const monthYear = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(end);
    return `${startDay}–${endDay} ${monthYear}`;
  }

  return `${formatSingleDate(course.date, locale)} – ${formatSingleDate(
    course.endDate,
    locale,
  )}`;
}
