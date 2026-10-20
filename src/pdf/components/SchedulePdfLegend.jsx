import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { strings } from '../../i18n/strings';
import { schedulePdfColors } from '../schedulePdfTheme';

const styles = StyleSheet.create({
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  swatchAnchor: {
    borderWidth: 1,
    borderColor: schedulePdfColors.anchorBorder,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 8,
    color: '#4a5568',
  },
});

function SchedulePdfLegend() {
  return (
    <View style={styles.legend}>
      <View style={styles.legendItem}>
        <View
          style={[
            styles.swatch,
            { backgroundColor: schedulePdfColors.workBackground },
          ]}
        />
        <Text style={styles.label}>{strings.legendWork}</Text>
      </View>
      <View style={styles.legendItem}>
        <View
          style={[
            styles.swatch,
            { backgroundColor: schedulePdfColors.offBackground },
          ]}
        />
        <Text style={styles.label}>{strings.legendOff}</Text>
      </View>
      <View style={styles.legendItem}>
        <View
          style={[
            styles.swatch,
            { backgroundColor: schedulePdfColors.vacationBackground },
          ]}
        />
        <Text style={styles.label}>{strings.legendVacation}</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.swatch, styles.swatchAnchor]} />
        <Text style={styles.label}>{strings.legendAnchor}</Text>
      </View>
    </View>
  );
}

export default SchedulePdfLegend;
