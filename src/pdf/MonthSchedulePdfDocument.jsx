import { Document, Page, StyleSheet, Text } from '@react-pdf/renderer';
import { strings } from '../i18n/strings';
import { SCHEDULE_TYPES } from '../utils/schedulePattern';
import PdfMonthGrid from './components/PdfMonthGrid';
import SchedulePdfLegend from './components/SchedulePdfLegend';

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 4,
  },
  headerMeta: {
    fontSize: 9,
    color: '#4a5568',
    marginBottom: 2,
  },
  summary: {
    marginTop: 12,
    fontSize: 8,
    color: '#2d3748',
    lineHeight: 1.4,
  },
});

function getScheduleTypeLabel(scheduleType) {
  return scheduleType === SCHEDULE_TYPES.THREE_BY_THREE
    ? strings.scheduleThreeByThree
    : strings.scheduleTwelveByThirtySix;
}

function MonthSchedulePdfDocument({
  year,
  monthIndex,
  scheduleContext,
  vacationPeriods,
  anchorDate,
  summaryText,
}) {
  return (
    <Document title={`${strings.appTitle} — ${year}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.headerTitle}>{strings.appTitle}</Text>
        <Text style={styles.headerMeta}>
          {strings.calendarViewMonth}:{' '}
          {new Date(year, monthIndex, 1).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.headerMeta}>
          {strings.scheduleTypeLabel}: {getScheduleTypeLabel(scheduleContext.scheduleType)}
        </Text>
        <SchedulePdfLegend />
        <PdfMonthGrid
          year={year}
          monthIndex={monthIndex}
          scheduleContext={scheduleContext}
          vacationPeriods={vacationPeriods}
          anchorDate={anchorDate}
          compact={false}
        />
        <Text style={styles.summary}>{summaryText}</Text>
      </Page>
    </Document>
  );
}

export default MonthSchedulePdfDocument;
