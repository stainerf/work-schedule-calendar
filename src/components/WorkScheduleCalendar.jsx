import Calendar from "react-calendar";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-calendar/dist/Calendar.css";
import { getScheduleDayTileClassName } from "../utils/calendarDayStyles";
import {
  buildAnchorDateTime,
  normalizeToLocalDay,
} from "../utils/schedulePattern";

function WorkScheduleCalendar({
  scheduleType,
  shiftStartTime,
  anchorDate,
  anchorDateTime,
  selectedDate,
  visibleMonthDate,
  onVisibleMonthDateChange,
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
      activeStartDate={visibleMonthDate}
      onActiveStartDateChange={({ activeStartDate }) =>
        onVisibleMonthDateChange(activeStartDate)
      }
      onChange={handleDayChange}
      locale={ptBR}
      maxDetail="month"
      minDetail="month"
      tileClassName={({ date, view }) => {
        if (view !== "month") {
          return null;
        }

        return getScheduleDayTileClassName(
          date,
          scheduleContext,
          vacationPeriods,
          anchorDate,
        );
      }}
      formatShortWeekday={(_locale, date) =>
        date.toLocaleDateString("pt-BR", { weekday: "narrow" })
      }
    />
  );
}

export default WorkScheduleCalendar;