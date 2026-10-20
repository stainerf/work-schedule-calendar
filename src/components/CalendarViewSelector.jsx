import { CALENDAR_VIEW_MODES } from '../utils/calendarView';
import { strings } from '../i18n/strings';

function CalendarViewSelector({ calendarViewMode, onCalendarViewModeChange }) {
  return (
    <label className="control-field">
      <span>{strings.calendarViewLabel}</span>
      <select
        value={calendarViewMode}
        onChange={(event) => onCalendarViewModeChange(event.target.value)}
      >
        <option value={CALENDAR_VIEW_MODES.MONTH}>
          {strings.calendarViewMonth}
        </option>
        <option value={CALENDAR_VIEW_MODES.YEAR}>
          {strings.calendarViewYear}
        </option>
      </select>
    </label>
  );
}

export default CalendarViewSelector;
