const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const strings = {
  appTitle: 'Calendário de escala',
  scheduleTypeLabel: 'Tipo de escala',
  scheduleThreeByThree: '3×3 (3 dias de trabalho, 3 de folga)',
  scheduleTwelveByThirtySix: '12×36 (12h de trabalho, 36h de folga)',
  shiftStartLabel: 'Início do plantão',
  instructionThreeByThree:
    'Clique em um dia para defini-lo como o primeiro dia de trabalho do ciclo 3×3.',
  instructionTwelveByThirtySix:
    'Clique em um dia para definir o início do plantão de 12 horas nesse dia.',
  legendWork: 'Dia de trabalho',
  legendOff: 'Folga',
  legendAnchor: 'Dia âncora',
};

export function formatAnchorSummaryThreeByThree(anchorDate, nextOffStart) {
  return `Âncora: ${dateFormatter.format(anchorDate)} — próximo bloco de folga começa em ${dateFormatter.format(nextOffStart)}.`;
}

export function formatAnchorSummaryTwelveByThirtySix(
  anchorDateTime,
  nextOffStart,
  nextShiftStart,
) {
  return `Âncora: ${dateTimeFormatter.format(anchorDateTime)} — próximo bloco de folga começa em ${dateTimeFormatter.format(nextOffStart)}; próximo plantão em ${dateTimeFormatter.format(nextShiftStart)}.`;
}
