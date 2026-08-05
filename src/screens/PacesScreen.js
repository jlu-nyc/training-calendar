import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PACES } from '../data/paces';

const ZONES = [
  { label: 'Recovery',     key: 'recovery',     color: '#78909c' },
  { label: 'Easy',         key: 'easy',         color: '#66bb6a' },
  { label: 'Steady',       key: 'steady',       color: '#26c6da' },
  { label: 'Marathon',     key: 'marathon',     color: '#7986cb' },
  { label: 'Threshold',    key: 'threshold',    color: '#ffa726' },
  { label: '10K Interval', key: 'interval10K',  color: '#ef5350' },
  { label: '5K Interval',  key: 'interval5K',   color: '#e53935' },
  { label: 'Strides',      key: 'strides',      color: '#ab47bc' },
];

function formatPace(value) {
  if (Array.isArray(value)) return `${value[0]} – ${value[1]}`;
  return value;
}

export default function PacesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.metaCard}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Goal Marathon</Text>
          <Text style={styles.metaValue}>{PACES.goalMarathonTime}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Current Marathon Pace</Text>
          <Text style={styles.metaValue}>{PACES.currentFitness.marathonPace} /mi</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Current Threshold Pace</Text>
          <Text style={styles.metaValue}>{PACES.currentFitness.thresholdPace} /mi</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, styles.zoneCell]}>Zone</Text>
          <Text style={[styles.cell, styles.headerCell, styles.paceCell]}>Pace (min/mi)</Text>
        </View>

        {ZONES.map(({ label, key, color }, i) => (
          <View key={key} style={[styles.row, i % 2 === 1 && styles.rowAlt]}>
            <View style={[styles.cell, styles.zoneCell, styles.zoneLabelWrap]}>
              <View style={[styles.dot, { backgroundColor: color }]} />
              <Text style={styles.zoneText}>{label}</Text>
            </View>
            <Text style={[styles.cell, styles.paceCell, styles.paceText]}>
              {formatPace(PACES.trainingZones[key])}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f0f23',
    padding: 16,
    paddingBottom: 40,
  },
  metaCard: {
    backgroundColor: '#1e1e3a',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  metaLabel: {
    fontSize: 13,
    color: '#90a4ae',
  },
  metaValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginVertical: 8,
  },
  table: {
    backgroundColor: '#1e1e3a',
    borderRadius: 14,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowAlt: {
    backgroundColor: '#16162e',
  },
  headerRow: {
    backgroundColor: '#12122a',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4a',
  },
  cell: {
    fontSize: 14,
  },
  headerCell: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7986cb',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  zoneCell: {
    flex: 1,
  },
  paceCell: {
    width: 140,
    textAlign: 'right',
  },
  zoneLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  zoneText: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  paceText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
