import { pdf } from '@react-pdf/renderer';

export async function downloadSchedulePdf(documentElement, fileName) {
  const blob = await pdf(documentElement).toBlob();
  const url = URL.createObjectURL(blob);

  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function buildMonthPdfFileName(year, monthIndex) {
  const monthPart = String(monthIndex + 1).padStart(2, '0');
  return `escala-${year}-${monthPart}.pdf`;
}

export function buildYearPdfFileName(year) {
  return `escala-${year}.pdf`;
}
