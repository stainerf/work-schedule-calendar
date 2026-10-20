import { isAnchorDay, isWorkingDay } from './schedulePattern';
import { isVacationDay } from './vacation';

export function getScheduleDayTileClassName(
  date,
  scheduleContext,
  vacationPeriods,
  anchorDate,
) {
  const onVacation = isVacationDay(date, vacationPeriods);
  const statusClass = onVacation
    ? 'tile-vacation'
    : isWorkingDay(date, scheduleContext)
      ? 'tile-work'
      : 'tile-off';
  const anchorClass = isAnchorDay(date, anchorDate) ? 'tile-anchor' : '';

  return [statusClass, anchorClass].filter(Boolean).join(' ');
}
