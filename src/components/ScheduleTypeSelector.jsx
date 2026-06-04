import { SCHEDULE_TYPES } from '../utils/schedulePattern';
import { strings } from '../i18n/strings';

function ScheduleTypeSelector({
  scheduleType,
  shiftStartTime,
  onScheduleTypeChange,
  onShiftStartTimeChange,
}) {
  return (
    <div className="schedule-controls">
      <label className="control-field">
        <span>{strings.scheduleTypeLabel}</span>
        <select
          value={scheduleType}
          onChange={(event) => onScheduleTypeChange(event.target.value)}
        >
          <option value={SCHEDULE_TYPES.THREE_BY_THREE}>
            {strings.scheduleThreeByThree}
          </option>
          <option value={SCHEDULE_TYPES.TWELVE_BY_THIRTY_SIX}>
            {strings.scheduleTwelveByThirtySix}
          </option>
        </select>
      </label>

      {scheduleType === SCHEDULE_TYPES.TWELVE_BY_THIRTY_SIX && (
        <label className="control-field">
          <span>{strings.shiftStartLabel}</span>
          <input
            type="time"
            value={shiftStartTime}
            onChange={(event) => onShiftStartTimeChange(event.target.value)}
          />
        </label>
      )}
    </div>
  );
}

export default ScheduleTypeSelector;
