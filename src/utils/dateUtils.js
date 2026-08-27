const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The plan's last week ends on race day (Sunday).
 * Last week's Monday = raceDate - 6 days
 * Week N Monday      = raceDate - 6 - (totalWeeks - N) * 7 days
 */
export function getWeekStartDate(raceDate, weekNumber, totalWeeks = 12) {
  const daysBack = 6 + (totalWeeks - weekNumber) * 7;
  const d = new Date(raceDate);
  d.setDate(d.getDate() - daysBack);
  return d;
}

export function getDayDate(raceDate, weekNumber, dayIndex, totalWeeks = 12) {
  const weekStart = getWeekStartDate(raceDate, weekNumber, totalWeeks);
  const d = new Date(weekStart);
  d.setDate(d.getDate() + dayIndex);
  return d;
}

export function formatDate(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function formatFullDate(date) {
  return `${DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function getDayLabel(index) {
  return DAYS[index];
}

export function getDayAbbrev(index) {
  return DAYS[index].slice(0, 3);
}

// Find which week + day "today" falls on, given a race date.
// Returns { week, dayIndex } or null if today is outside the plan.
export function getTodayPosition(raceDate, totalWeeks = 12) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const planStart = getWeekStartDate(raceDate, 1, totalWeeks);
  planStart.setHours(0, 0, 0, 0);

  const planEnd = new Date(raceDate);
  planEnd.setHours(0, 0, 0, 0);

  if (today < planStart || today > planEnd) return null;

  const diffDays = Math.round((today - planStart) / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  const dayIndex = diffDays % 7;
  return { week, dayIndex };
}
