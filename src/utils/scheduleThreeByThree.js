const WORK_DAYS = 3;
const CYCLE_LENGTH = 6;

export function getCyclePosition(date, anchorDate, differenceInCalendarDays) {
  const dayOffset = differenceInCalendarDays(date, anchorDate);
  return ((dayOffset % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
}

export function isWorkingDayThreeByThree(date, anchorDate, differenceInCalendarDays) {
  return getCyclePosition(date, anchorDate, differenceInCalendarDays) < WORK_DAYS;
}

export function getNextOffBlockStartThreeByThree(anchorDate) {
  const nextOffStart = new Date(anchorDate);
  nextOffStart.setDate(nextOffStart.getDate() + WORK_DAYS);
  return nextOffStart;
}
