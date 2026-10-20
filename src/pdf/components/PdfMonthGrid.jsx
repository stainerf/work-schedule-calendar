import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { getScheduleDayVisualState } from '../../utils/calendarDayStyles';
import { getMonthCalendarDays, getWeekdayLabels } from '../../utils/monthGrid';
import { formatLocalDateKey } from '../../utils/schedulePattern';
import { getDayPdfColors, schedulePdfColors } from '../schedulePdfTheme';

const compactStyles = StyleSheet.create({
  month: {
    width: '33.33%',
    padding: 4,
  },
  title: {
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 3,
    textTransform: 'capitalize',
    color: '#2d3748',
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  weekday: {
    width: '14.28%',
    fontSize: 6,
    textAlign: 'center',
    color: '#718096',
    fontWeight: 600,
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginBottom: 1,
  },
  dayText: {
    fontSize: 6,
    fontWeight: 500,
  },
});

const largeStyles = StyleSheet.create({
  month: {
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'capitalize',
    color: '#1a1a2e',
  },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekday: {
    width: '14.28%',
    fontSize: 10,
    textAlign: 'center',
    color: '#718096',
    fontWeight: 600,
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 3,
  },
  dayText: {
    fontSize: 10,
    fontWeight: 500,
  },
});

function PdfMonthGrid({
  year,
  monthIndex,
  scheduleContext,
  vacationPeriods,
  anchorDate,
  compact = false,
}) {
  const styles = compact ? compactStyles : largeStyles;
  const monthDays = getMonthCalendarDays(year, monthIndex);
  const weekdayLabels = getWeekdayLabels();
  const monthLabel = new Date(year, monthIndex, 1).toLocaleDateString('pt-BR', {
    month: compact ? 'long' : 'long',
    year: compact ? undefined : 'numeric',
  });

  return (
    <View style={styles.month}>
      <Text style={styles.title}>{monthLabel}</Text>
      <View style={styles.weekdays}>
        {weekdayLabels.map((label, index) => (
          <Text key={index} style={styles.weekday}>
            {label}
          </Text>
        ))}
      </View>
      <View style={styles.days}>
        {monthDays.map((date) => {
          const inCurrentMonth = date.getMonth() === monthIndex;
          const { status, isAnchor } = getScheduleDayVisualState(
            date,
            scheduleContext,
            vacationPeriods,
            anchorDate,
          );
          const colors = getDayPdfColors(status);

          return (
            <View
              key={formatLocalDateKey(date)}
              style={[
                styles.dayCell,
                {
                  backgroundColor: colors.backgroundColor,
                  opacity: inCurrentMonth ? 1 : schedulePdfColors.outsideOpacity,
                  borderWidth: isAnchor ? 1 : 0,
                  borderColor: schedulePdfColors.anchorBorder,
                },
              ]}
            >
              <Text style={[styles.dayText, { color: colors.color }]}>
                {date.getDate()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default PdfMonthGrid;
