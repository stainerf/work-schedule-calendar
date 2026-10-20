export const schedulePdfColors = {
  workBackground: '#63f186',
  workText: '#150218',
  offBackground: '#cdd4d6',
  offText: '#4a5568',
  vacationBackground: '#f6ad55',
  vacationText: '#150218',
  anchorBorder: '#2b6cb0',
  outsideOpacity: 0.35,
};

export function getDayPdfColors(status) {
  if (status === 'work') {
    return {
      backgroundColor: schedulePdfColors.workBackground,
      color: schedulePdfColors.workText,
    };
  }

  if (status === 'vacation') {
    return {
      backgroundColor: schedulePdfColors.vacationBackground,
      color: schedulePdfColors.vacationText,
    };
  }

  return {
    backgroundColor: schedulePdfColors.offBackground,
    color: schedulePdfColors.offText,
  };
}
