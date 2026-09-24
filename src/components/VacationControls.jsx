import { VACATION_DURATIONS } from '../utils/vacation';
import { strings } from '../i18n/strings';

function VacationControls({
  vacationDuration,
  vacationMode,
  onVacationDurationChange,
  onVacationModeChange,
  onClearVacations,
  hasVacations,
}) {
  return (
    <div className="schedule-controls vacation-controls">
      <label className="control-field">
        <span>{strings.vacationDurationLabel}</span>
        <select
          value={vacationDuration}
          onChange={(event) => onVacationDurationChange(Number(event.target.value))}
        >
          {VACATION_DURATIONS.map((duration) => (
            <option key={duration} value={duration}>
              {strings[`vacationDays${duration}`]}
            </option>
          ))}
        </select>
      </label>

      <label className="control-field control-checkbox">
        <input
          type="checkbox"
          checked={vacationMode}
          onChange={(event) => onVacationModeChange(event.target.checked)}
        />
        <span>{strings.vacationModeLabel}</span>
      </label>

      {hasVacations && (
        <button
          type="button"
          className="clear-vacations-button"
          onClick={onClearVacations}
        >
          {strings.clearVacations}
        </button>
      )}
    </div>
  );
}

export default VacationControls;
