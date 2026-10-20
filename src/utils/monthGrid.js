import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

const weekOptions = { locale: ptBR };

export function getMonthCalendarDays(year, monthIndex) {
  const monthStart = startOfMonth(new Date(year, monthIndex, 1));
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, weekOptions);
  const calendarEnd = endOfWeek(monthEnd, weekOptions);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
}

export function getWeekdayLabels() {
  const referenceWeek = startOfWeek(new Date(2024, 0, 1), weekOptions);

  return Array.from({ length: 7 }, (_, index) => {
    const weekday = new Date(referenceWeek);
    weekday.setDate(referenceWeek.getDate() + index);
    return weekday.toLocaleDateString('pt-BR', { weekday: 'narrow' });
  });
}
