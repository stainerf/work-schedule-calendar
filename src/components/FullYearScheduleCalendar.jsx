import { useState } from 'react';
import { strings } from '../i18n/strings';
import { getScheduleDayTileClassName } from '../utils/calendarDayStyles';
import {
  buildAnchorDateTime,
  formatLocalDateKey,
  isSameCalendarDay,
  normalizeToLocalDay,
} from '../utils/schedulePattern';
import { getMonthCalendarDays, getWeekdayLabels } from '../utils/monthGrid';

function FullYearScheduleCalendar({
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
  const [displayYear, setDisplayYear] = useState(() =>
    selectedDate.getFullYear(),
  );
  const weekdayLabels = getWeekdayLabels();

  const scheduleContext = {
    scheduleType,
    anchorDate,
    anchorDateTime,
    shiftStartTime,
  };

  function handleDaySelect(date) {
    const day = normalizeToLocalDay(date);
    setDisplayYear(day.getFullYear());
    onSelectedDateChange(day);

    if (vacationMode) {
      onVacationAdd(day, vacationDuration);
      return;
    }

    const dateTime = buildAnchorDateTime(day, shiftStartTime);
    onAnchorChange(day, dateTime);
  }

  function handlePreviousYear() {
    setDisplayYear((currentYear) => currentYear - 1);
  }

  function handleNextYear() {
    setDisplayYear((currentYear) => currentYear + 1);
  }

  const today = normalizeToLocalDay(new Date());

  return (
    <section
      className="full-year-calendar"
      aria-label={strings.calendarViewYear}
    >
      <div className="full-year-calendar-header">
        <button
          type="button"
          className="full-year-nav-button"
          onClick={handlePreviousYear}
          aria-label={strings.fullYearPrevious}
        >
          ‹
        </button>
        <h2 className="full-year-calendar-title">{displayYear}</h2>
        <button
          type="button"
          className="full-year-nav-button"
          onClick={handleNextYear}
          aria-label={strings.fullYearNext}
        >
          ›
        </button>
      </div>

      <div className="full-year-month-grid">
        {Array.from({ length: 12 }, (_, monthIndex) => {
          const monthDays = getMonthCalendarDays(displayYear, monthIndex);
          const monthLabel = new Date(displayYear, monthIndex, 1).toLocaleDateString(
            'pt-BR',
            { month: 'long' },
          );

          return (
            <article
              key={monthIndex}
              className="full-year-month"
              aria-label={monthLabel}
            >
              <h3 className="full-year-month-title">{monthLabel}</h3>
              <div className="full-year-weekdays" aria-hidden="true">
                {weekdayLabels.map((label, index) => (
                  <span key={index} className="full-year-weekday">
                    {label}
                  </span>
                ))}
              </div>
              <div className="full-year-days">
                {monthDays.map((date) => {
                  const inCurrentMonth = date.getMonth() === monthIndex;
                  const tileClassName = getScheduleDayTileClassName(
                    date,
                    scheduleContext,
                    vacationPeriods,
                    anchorDate,
                  );
                  const isToday = isSameCalendarDay(date, today);
                  const isSelected = isSameCalendarDay(date, selectedDate);
                  const dayClassName = [
                    'full-year-day',
                    tileClassName,
                    !inCurrentMonth ? 'full-year-day-outside' : '',
                    isToday ? 'full-year-day-today' : '',
                    isSelected ? 'full-year-day-selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <button
                      key={formatLocalDateKey(date)}
                      type="button"
                      className={dayClassName}
                      onClick={() => handleDaySelect(date)}
                      aria-label={date.toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                      aria-pressed={isSelected}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FullYearScheduleCalendar;
