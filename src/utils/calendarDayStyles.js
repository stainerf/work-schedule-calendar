import { isAnchorDay, isWorkingDay } from './schedulePattern';
import { isVacationDay } from './vacation';

export function getScheduleDayVisualState(
  date,
  scheduleContext,
  vacationPeriods,
  anchorDate,
) {
  const onVacation = isVacationDay(date, vacationPeriods);
  const status = onVacation
    ? 'vacation'
    : isWorkingDay(date, scheduleContext)
      ? 'work'
      : 'off';

  return {
    status,
    isAnchor: isAnchorDay(date, anchorDate),
  };
}

export function getScheduleDayTileClassName(
  date,
  scheduleContext,
  vacationPeriods,
  anchorDate,
) {
  const { status, isAnchor } = getScheduleDayVisualState(
    date,
    scheduleContext,
    vacationPeriods,
    anchorDate,
  );
  const statusClass =
    status === 'vacation'
      ? 'tile-vacation'
      : status === 'work'
        ? 'tile-work'
        : 'tile-off';
  const anchorClass = isAnchor ? 'tile-anchor' : '';

  return [statusClass, anchorClass].filter(Boolean).join(' ');
}
