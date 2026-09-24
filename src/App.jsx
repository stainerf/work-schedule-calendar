import { useEffect, useState } from "react";
import ScheduleTypeSelector from "./components/ScheduleTypeSelector";
import VacationControls from "./components/VacationControls";
import WorkScheduleCalendar from "./components/WorkScheduleCalendar";
import {
  formatAnchorSummaryThreeByThree,
  formatAnchorSummaryTwelveByThirtySix,
  strings,
} from "./i18n/strings";
import {
  buildAnchorDateTime,
  getNextOffBlockStart,
  getNextShiftStart,
  SCHEDULE_TYPES,
} from "./utils/schedulePattern";
import {
  loadAnchorSettings,
  saveAnchorSettings,
} from "./utils/scheduleStorage";
import {
  addVacationPeriod,
  loadVacationPeriods,
  saveVacationPeriods,
} from "./utils/vacation";

function App() {
  const defaultShiftStartTime = "07:00";
  const initialAnchorSettings = loadAnchorSettings(defaultShiftStartTime);

  const [scheduleType, setScheduleType] = useState(
    SCHEDULE_TYPES.THREE_BY_THREE,
  );
  const [shiftStartTime, setShiftStartTime] = useState(
    initialAnchorSettings.shiftStartTime,
  );
  const [anchorDate, setAnchorDate] = useState(initialAnchorSettings.anchorDate);
  const [anchorDateTime, setAnchorDateTime] = useState(
    initialAnchorSettings.anchorDateTime,
  );
  const [selectedDate, setSelectedDate] = useState(
    initialAnchorSettings.anchorDate,
  );
  const [vacationDuration, setVacationDuration] = useState(10);
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationPeriods, setVacationPeriods] = useState(() =>
    loadVacationPeriods(),
  );

  useEffect(() => {
    saveVacationPeriods(vacationPeriods);
  }, [vacationPeriods]);

  useEffect(() => {
    saveAnchorSettings(anchorDate, shiftStartTime);
  }, [anchorDate, shiftStartTime]);

  const scheduleContext = {
    scheduleType,
    anchorDate,
    anchorDateTime,
    shiftStartTime,
  };

  const nextOffStart = getNextOffBlockStart(scheduleContext);
  const nextShiftStart = getNextShiftStart(scheduleContext);

  const instruction = vacationMode
    ? strings.instructionVacationMode
    : scheduleType === SCHEDULE_TYPES.THREE_BY_THREE
      ? strings.instructionThreeByThree
      : strings.instructionTwelveByThirtySix;

  const summary =
    scheduleType === SCHEDULE_TYPES.THREE_BY_THREE
      ? formatAnchorSummaryThreeByThree(anchorDate, nextOffStart)
      : formatAnchorSummaryTwelveByThirtySix(
          anchorDateTime,
          nextOffStart,
          nextShiftStart,
        );

  function handleScheduleTypeChange(newScheduleType) {
    setScheduleType(newScheduleType);
  }

  function handleShiftStartTimeChange(newShiftStartTime) {
    setShiftStartTime(newShiftStartTime);
    setAnchorDateTime(buildAnchorDateTime(anchorDate, newShiftStartTime));
  }

  function handleAnchorChange(day, dateTime) {
    setAnchorDate(day);
    setAnchorDateTime(dateTime);
  }

  function handleVacationAdd(startDate, duration) {
    setVacationPeriods((currentPeriods) =>
      addVacationPeriod(currentPeriods, startDate, duration),
    );
  }

  function handleClearVacations() {
    setVacationPeriods([]);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>{strings.appTitle}</h1>
        <p className="instruction">{instruction}</p>
      </header>
      <div>
        <ScheduleTypeSelector
          scheduleType={scheduleType}
          shiftStartTime={shiftStartTime}
          onScheduleTypeChange={handleScheduleTypeChange}
          onShiftStartTimeChange={handleShiftStartTimeChange}
        />

        <VacationControls
          vacationDuration={vacationDuration}
          vacationMode={vacationMode}
          onVacationDurationChange={setVacationDuration}
          onVacationModeChange={setVacationMode}
          onClearVacations={handleClearVacations}
          hasVacations={vacationPeriods.length > 0}
        />

        <WorkScheduleCalendar
          scheduleType={scheduleType}
          shiftStartTime={shiftStartTime}
          anchorDate={anchorDate}
          anchorDateTime={anchorDateTime}
          selectedDate={selectedDate}
          vacationPeriods={vacationPeriods}
          vacationMode={vacationMode}
          vacationDuration={vacationDuration}
          onAnchorChange={handleAnchorChange}
          onSelectedDateChange={setSelectedDate}
          onVacationAdd={handleVacationAdd}
        />
      </div>

      <p className="summary">{summary}</p>

      <ul className="legend" aria-label="Legenda">
        <li className="legend-item legend-work">{strings.legendWork}</li>
        <li className="legend-item legend-off">{strings.legendOff}</li>
        <li className="legend-item legend-vacation">{strings.legendVacation}</li>
        <li className="legend-item legend-anchor">{strings.legendAnchor}</li>
      </ul>
    </main>
  );
}

export default App;
