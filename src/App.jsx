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
  normalizeToLocalDay,
  SCHEDULE_TYPES,
} from "./utils/schedulePattern";
import {
  addVacationPeriod,
  loadVacationPeriods,
  saveVacationPeriods,
} from "./utils/vacation";

function App() {
  const today = normalizeToLocalDay(new Date());
  const defaultShiftStartTime = "07:00";

  const [scheduleType, setScheduleType] = useState(
    SCHEDULE_TYPES.THREE_BY_THREE,
  );
  const [shiftStartTime, setShiftStartTime] = useState(defaultShiftStartTime);
  const [anchorDate, setAnchorDate] = useState(today);
  const [anchorDateTime, setAnchorDateTime] = useState(
    buildAnchorDateTime(today, defaultShiftStartTime),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [vacationDuration, setVacationDuration] = useState(10);
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationPeriods, setVacationPeriods] = useState(() =>
    loadVacationPeriods(),
  );

  useEffect(() => {
    saveVacationPeriods(vacationPeriods);
  }, [vacationPeriods]);

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
