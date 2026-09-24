import {
  buildAnchorDateTime,
  formatLocalDateKey,
  normalizeToLocalDay,
  parseLocalDateKey,
} from './schedulePattern';

export const ANCHOR_STORAGE_KEY = 'workScheduleAnchor';

function isValidTimeString(timeString) {
  return typeof timeString === 'string' && /^\d{2}:\d{2}$/.test(timeString);
}

function isValidStoredAnchorSettings(storedSettings) {
  return (
    storedSettings &&
    typeof storedSettings.anchorDate === 'string' &&
    isValidTimeString(storedSettings.shiftStartTime)
  );
}

export function loadAnchorSettings(defaultShiftStartTime = '07:00') {
  const today = normalizeToLocalDay(new Date());
  const fallbackSettings = {
    anchorDate: today,
    shiftStartTime: defaultShiftStartTime,
    anchorDateTime: buildAnchorDateTime(today, defaultShiftStartTime),
  };

  try {
    const storedValue = localStorage.getItem(ANCHOR_STORAGE_KEY);
    if (!storedValue) {
      return fallbackSettings;
    }

    const storedSettings = JSON.parse(storedValue);
    if (!isValidStoredAnchorSettings(storedSettings)) {
      return fallbackSettings;
    }

    const anchorDate = parseLocalDateKey(storedSettings.anchorDate);

    return {
      anchorDate,
      shiftStartTime: storedSettings.shiftStartTime,
      anchorDateTime: buildAnchorDateTime(
        anchorDate,
        storedSettings.shiftStartTime,
      ),
    };
  } catch {
    return fallbackSettings;
  }
}

export function saveAnchorSettings(anchorDate, shiftStartTime) {
  localStorage.setItem(
    ANCHOR_STORAGE_KEY,
    JSON.stringify({
      anchorDate: formatLocalDateKey(anchorDate),
      shiftStartTime,
    }),
  );
}
