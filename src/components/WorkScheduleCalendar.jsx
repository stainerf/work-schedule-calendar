import Calendar from "react-calendar";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-calendar/dist/Calendar.css";
import {
  buildAnchorDateTime,
  isAnchorDay,
  isWorkingDay,
  normalizeToLocalDay,
} from "../utils/schedulePattern";

function WorkScheduleCalendar({
  scheduleType,
  shiftStartTime,
  anchorDate,
  anchorDateTime,
  selectedDate,
  onAnchorChange,
  onSelectedDateChange,
}) {
  const scheduleContext = {
    scheduleType,
    anchorDate,
    anchorDateTime,
    shiftStartTime,
  };

  function handleDayChange(date) {
    const day = normalizeToLocalDay(date);
    const dateTime = buildAnchorDateTime(day, shiftStartTime);
    onAnchorChange(day, dateTime);
    onSelectedDateChange(day);
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

        const statusClass = isWorkingDay(date, scheduleContext)
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