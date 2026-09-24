import {
  getNextOffBlockStartThreeByThree,
  isWorkingDayThreeByThree,
} from './scheduleThreeByThree';
import {
  getNextOffBlockStartTwelveByThirtySix,
  getNextShiftStartTwelveByThirtySix,
  isWorkingDayTwelveByThirtySix,
} from './scheduleTwelveByThirtySix';

export const SCHEDULE_TYPES = {
  THREE_BY_THREE: 'threeByThree',
  TWELVE_BY_THIRTY_SIX: 'twelveByThirtySix',
};

export function normalizeToLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatLocalDateKey(date) {
  const normalizedDate = normalizeToLocalDay(date);
  const year = normalizedDate.getFullYear();
  const month = String(normalizedDate.getMonth() + 1).padStart(2, '0');
  const day = String(normalizedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return normalizeToLocalDay(new Date(year, month - 1, day));
}

export function isSameCalendarDay(firstDate, secondDate) {
  const normalizedFirst = normalizeToLocalDay(firstDate);
  const normalizedSecond = normalizeToLocalDay(secondDate);
  return normalizedFirst.getTime() === normalizedSecond.getTime();
}

export function isAnchorDay(date, anchorDate) {
  return isSameCalendarDay(date, anchorDate);
}

export function differenceInCalendarDays(later, earlier) {
  const normalizedLater = normalizeToLocalDay(later);
  const normalizedEarlier = normalizeToLocalDay(earlier);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round(
    (normalizedLater.getTime() - normalizedEarlier.getTime()) / millisecondsPerDay,
  );
}

export function buildAnchorDateTime(day, timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    hours,
    minutes,
    0,
    0,
  );
}

export function isWorkingDay(date, context) {
  if (context.scheduleType === SCHEDULE_TYPES.THREE_BY_THREE) {
    return isWorkingDayThreeByThree(
      date,
      context.anchorDate,
      differenceInCalendarDays,
    );
  }

  return isWorkingDayTwelveByThirtySix(
    date,
    context.anchorDateTime,
    normalizeToLocalDay,
  );
}

export function getDayStatus(date, context) {
  return isWorkingDay(date, context) ? 'work' : 'off';
}

export function getNextOffBlockStart(context) {
  if (context.scheduleType === SCHEDULE_TYPES.THREE_BY_THREE) {
    return getNextOffBlockStartThreeByThree(context.anchorDate);
  }

  return getNextOffBlockStartTwelveByThirtySix(context.anchorDateTime);
}

export function getNextShiftStart(context) {
  if (context.scheduleType === SCHEDULE_TYPES.TWELVE_BY_THIRTY_SIX) {
    return getNextShiftStartTwelveByThirtySix(context.anchorDateTime);
  }

  const nextWorkBlock = new Date(context.anchorDate);
  nextWorkBlock.setDate(nextWorkBlock.getDate() + 6);
  return nextWorkBlock;
}
