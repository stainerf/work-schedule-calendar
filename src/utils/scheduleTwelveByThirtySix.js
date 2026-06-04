const WORK_HOURS = 12;
const CYCLE_HOURS = 48;
const WORK_MILLISECONDS = WORK_HOURS * 60 * 60 * 1000;
const CYCLE_MILLISECONDS = CYCLE_HOURS * 60 * 60 * 1000;
const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

function getDayBounds(date, normalizeToLocalDay) {
  const normalizedDay = normalizeToLocalDay(date);
  const dayStart = normalizedDay.getTime();
  const dayEnd = dayStart + DAY_MILLISECONDS;
  return { dayStart, dayEnd };
}

export function isWorkingDayTwelveByThirtySix(date, anchorDateTime, normalizeToLocalDay) {
  const { dayStart, dayEnd } = getDayBounds(date, normalizeToLocalDay);
  const anchorMilliseconds = anchorDateTime.getTime();

  const offsetFromAnchor = dayStart - anchorMilliseconds;
  const cyclesBack = Math.floor(offsetFromAnchor / CYCLE_MILLISECONDS) - 1;
  let workStart = anchorMilliseconds + cyclesBack * CYCLE_MILLISECONDS;

  while (workStart < dayEnd) {
    const workEnd = workStart + WORK_MILLISECONDS;
    if (workEnd > dayStart && workStart < dayEnd) {
      return true;
    }
    workStart += CYCLE_MILLISECONDS;
  }

  return false;
}

export function getNextOffBlockStartTwelveByThirtySix(anchorDateTime) {
  return new Date(anchorDateTime.getTime() + WORK_MILLISECONDS);
}

export function getNextShiftStartTwelveByThirtySix(anchorDateTime) {
  return new Date(anchorDateTime.getTime() + CYCLE_MILLISECONDS);
}
