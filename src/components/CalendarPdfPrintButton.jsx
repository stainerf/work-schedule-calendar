import { useState } from 'react';
import { CALENDAR_VIEW_MODES } from '../utils/calendarView';
import { strings } from '../i18n/strings';

function CalendarPdfPrintButton({
  calendarViewMode,
  visibleMonthDate,
  displayYear,
  scheduleContext,
  vacationPeriods,
  anchorDate,
  summaryText,
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handlePrintPdf() {
    setIsGenerating(true);

    try {
      const pdfModule = await import('../pdf/downloadSchedulePdf');

      if (calendarViewMode === CALENDAR_VIEW_MODES.YEAR) {
        const { default: YearSchedulePdfDocument } = await import(
          '../pdf/YearSchedulePdfDocument'
        );

        await pdfModule.downloadSchedulePdf(
          <YearSchedulePdfDocument
            year={displayYear}
            scheduleContext={scheduleContext}
            vacationPeriods={vacationPeriods}
            anchorDate={anchorDate}
            summaryText={summaryText}
          />,
          pdfModule.buildYearPdfFileName(displayYear),
        );
        return;
      }

      const { default: MonthSchedulePdfDocument } = await import(
        '../pdf/MonthSchedulePdfDocument'
      );
      const year = visibleMonthDate.getFullYear();
      const monthIndex = visibleMonthDate.getMonth();

      await pdfModule.downloadSchedulePdf(
        <MonthSchedulePdfDocument
          year={year}
          monthIndex={monthIndex}
          scheduleContext={scheduleContext}
          vacationPeriods={vacationPeriods}
          anchorDate={anchorDate}
          summaryText={summaryText}
        />,
        pdfModule.buildMonthPdfFileName(year, monthIndex),
      );
    } catch (error) {
      console.error(error);
      window.alert(strings.printPdfError);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      type="button"
      className="print-pdf-button"
      onClick={handlePrintPdf}
      disabled={isGenerating}
    >
      {isGenerating ? strings.printPdfGenerating : strings.printPdfLabel}
    </button>
  );
}

export default CalendarPdfPrintButton;
