import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { strings } from '../i18n/strings';
import { SCHEDULE_TYPES } from '../utils/schedulePattern';
import PdfMonthGrid from './components/PdfMonthGrid';
import SchedulePdfLegend from './components/SchedulePdfLegend';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 4,
  },
  headerMeta: {
    fontSize: 9,
    color: '#4a5568',
    marginBottom: 2,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  summary: {
    marginTop: 8,
    fontSize: 7,
    color: '#2d3748',
    lineHeight: 1.35,
  },
});

function getScheduleTypeLabel(scheduleType) {
  return scheduleType === SCHEDULE_TYPES.THREE_BY_THREE
    ? strings.scheduleThreeByThree
    : strings.scheduleTwelveByThirtySix;
}

function YearSchedulePdfDocument({
  year,
  scheduleContext,
  vacationPeriods,
  anchorDate,
  summaryText,
}) {
  return (
    <Document title={`${strings.appTitle} — ${year}`}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.headerTitle}>{strings.appTitle}</Text>
        <Text style={styles.headerMeta}>
          {strings.calendarViewYear}: {year}
        </Text>
        <Text style={styles.headerMeta}>
          {strings.scheduleTypeLabel}: {getScheduleTypeLabel(scheduleContext.scheduleType)}
        </Text>
        <SchedulePdfLegend />
        <View style={styles.monthGrid}>
          {Array.from({ length: 12 }, (_, monthIndex) => (
            <PdfMonthGrid
              key={monthIndex}
              year={year}
              monthIndex={monthIndex}
              scheduleContext={scheduleContext}
              vacationPeriods={vacationPeriods}
              anchorDate={anchorDate}
              compact
            />
          ))}
        </View>
        <Text style={styles.summary}>{summaryText}</Text>
      </Page>
    </Document>
  );
}

export default YearSchedulePdfDocument;
