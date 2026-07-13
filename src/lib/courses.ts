export interface CourseMeta {
  id: string;
  /** ISO calendar date: YYYY-MM-DD */
  date: string;
  poster: string;
  width: number;
  height: number;
}

export const COURSES: CourseMeta[] = [
  {
    id: "essen-2026-10-02",
    date: "2026-10-02",
    poster: "/courses/essen-2026-10-02.webp",
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

export function formatCourseDate(date: string, locale: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}
