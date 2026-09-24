import Calendar from "react-calendar";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-calendar/dist/Calendar.css";
import {
  buildAnchorDateTime,
  isAnchorDay,
  isWorkingDay,
  normalizeToLocalDay,
} from "../utils/schedulePattern";
import { isVacationDay } from "../utils/vacation";

function WorkScheduleCalendar({
  scheduleType,
  shiftStartTime,
  anchorDate,
  anchorDateTime,
  selectedDate,
  vacationPeriods,
  vacationMode,
  vacationDuration,
  onAnchorChange,
  onSelectedDateChange,
  onVacationAdd,
}) {
  const scheduleContext = {
    scheduleType,
    anchorDate,
    anchorDateTime,
    shiftStartTime,
  };

  function handleDayChange(date) {
    const day = normalizeToLocalDay(date);
    onSelectedDateChange(day);

    if (vacationMode) {
      onVacationAdd(day, vacationDuration);
      return;
    }

    const dateTime = buildAnchorDateTime(day, shiftStartTime);
    onAnchorChange(day, dateTime);
  }

  return (
    <Calendar
      value={selectedDate}
      onChange={handleDayChange}
      locale={ptBR}
      maxDetail="month"
      minDetail="month"
      tileClassName={({ date, view }) => {
        if (view !== "month") {
          return null;
        }

        const onVacation = isVacationDay(date, vacationPeriods);
        const statusClass = onVacation
          ? "tile-vacation"
          : isWorkingDay(date, scheduleContext)
            ? "tile-work"
            : "tile-off";
        const anchorClass = isAnchorDay(date, anchorDate) ? "tile-anchor" : "";

        return [statusClass, anchorClass].filter(Boolean).join(" ");
      }}
      formatShortWeekday={(_locale, date) =>
        date.toLocaleDateString("pt-BR", { weekday: "narrow" })
      }
    />
  );
}

export default WorkScheduleCalendar;