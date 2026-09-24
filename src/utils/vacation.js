import {
  differenceInCalendarDays,
  formatLocalDateKey,
  normalizeToLocalDay,
  parseLocalDateKey,
} from './schedulePattern';

export const VACATION_DURATIONS = [10, 15, 20, 30];
export const VACATION_STORAGE_KEY = 'workScheduleVacationPeriods';

function isValidVacationPeriod(period) {
  return (
    period &&
    typeof period.start === 'string' &&
    typeof period.duration === 'number' &&
    VACATION_DURATIONS.includes(period.duration)
  );
}

export function serializeVacationPeriods(vacationPeriods) {
  return vacationPeriods.map(({ start, duration }) => ({
    start: formatLocalDateKey(start),
    duration,
  }));
}

export function parseVacationPeriods(storedPeriods) {
  if (!Array.isArray(storedPeriods)) {
    return [];
  }

  return storedPeriods
    .filter(isValidVacationPeriod)
    .map(({ start, duration }) => ({
      start: parseLocalDateKey(start),
      duration,
    }));
}

export function loadVacationPeriods() {
  try {
    const storedValue = localStorage.getItem(VACATION_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    return parseVacationPeriods(JSON.parse(storedValue));
  } catch {
    return [];
  }
}

export function saveVacationPeriods(vacationPeriods) {
  localStorage.setItem(
    VACATION_STORAGE_KEY,
    JSON.stringify(serializeVacationPeriods(vacationPeriods)),
  );
}

export function isVacationDay(date, vacationPeriods) {
  const normalizedDate = normalizeToLocalDay(date);

  return vacationPeriods.some(({ start, duration }) => {
    const normalizedStart = normalizeToLocalDay(start);
    const dayOffset = differenceInCalendarDays(normalizedDate, normalizedStart);
    return dayOffset >= 0 && dayOffset < duration;
  });
}

export function addVacationPeriod(vacationPeriods, startDate, duration) {
  return [...vacationPeriods, { start: normalizeToLocalDay(startDate), duration }];
}
