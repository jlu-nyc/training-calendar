import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PLANS } from '../data/plans';
import { planStats, WORKOUT_COLORS, WORKOUT_TYPES } from '../data/plan';

const PLAN_KEYS = Object.keys(PLANS);

// Metrics are defined generically so any plan in the registry can be compared —
// each pulls one value from a plan's stats. `color` (optional) tints the leading
// dot to tie a workout-type row to the app's color language.
const METRICS = [
  { label: 'Total miles', get: (s) => s.totalMiles },
  { label: 'Peak week', get: (s) => s.peakWeek.miles },
  { label: 'Longest run', get: (s) => s.longestRun },
  {
    label: 'Marathon-pace miles',
    color: WORKOUT_COLORS[WORKOUT_TYPES.MARATHON_PACE],
    get: (s) => s.mpMiles,
  },
  {
    label: 'Threshold sessions',
    color: WORKOUT_COLORS[WORKOUT_TYPES.LACTATE_THRESHOLD],
    get: (s) => s.counts.threshold,
  },
  {
    label: 'VO₂max sessions',
    color: WORKOUT_COLORS[WORKOUT_TYPES.VO2MAX],
    get: (s) => s.counts.vo2max,
  },
  {
    label: 'Marathon-pace runs',
    color: WORKOUT_COLORS[WORKOUT_TYPES.MARATHON_PACE],
    get: (s) => s.counts.marathonPace,
  },
  {
    label: 'Tune-up races',
    color: WORKOUT_COLORS[WORKOUT_TYPES.TUNE_UP],
    get: (s) => s.counts.tuneUp,
  },
];

// Next plan key in the registry that isn't already shown in the other column.
function nextKey(current, other) {
  const start = PLAN_KEYS.indexOf(current);
  for (let i = 1; i <= PLAN_KEYS.length; i += 1) {
    const k = PLAN_KEYS[(start + i) % PLAN_KEYS.length];
    if (k !== other) return k;
  }
  return current;
}

export default function ComparePlansScreen({ route }) {
  const initial = route.params?.planKey && PLANS[route.params.planKey]
    ? route.params.planKey
    : PLAN_KEYS[0];

  const [leftKey, setLeftKey] = useState(initial);
  const [rightKey, setRightKey] = useState(
    PLAN_KEYS.find((k) => k !== initial) || initial
  );

  const leftStats = useMemo(() => planStats(PLANS[leftKey].plan), [leftKey]);
  const rightStats = useMemo(() => planStats(PLANS[rightKey].plan), [rightKey]);

  const switchable = PLAN_KEYS.length > 2;

  const ColumnHeader = ({ planKey, onPress }) => (
    <TouchableOpacity style={styles.valueCol} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.planName}>
        {PLANS[planKey].name}
        {switchable ? ' ▾' : ''}
      </Text>
      <Text style={styles.planSub}>{PLANS[planKey].subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View style={styles.labelCol} />
        <ColumnHeader planKey={leftKey} onPress={() => setLeftKey(nextKey(leftKey, rightKey))} />
        <ColumnHeader planKey={rightKey} onPress={() => setRightKey(nextKey(rightKey, leftKey))} />
      </View>

      {switchable && (
        <Text style={styles.switchHint}>Tap a plan name to compare a different one.</Text>
      )}

      <View style={styles.table}>
        {METRICS.map((metric, i) => {
          const c = metric.get(leftStats);
          const t = metric.get(rightStats);
          return (
            <View key={metric.label} style={[styles.row, i % 2 === 1 && styles.rowAlt]}>
              <View style={styles.labelCol}>
                {metric.color && <View style={[styles.dot, { backgroundColor: metric.color }]} />}
                <Text style={styles.label}>{metric.label}</Text>
              </View>
              <View style={styles.valueCol}>
                <Text style={[styles.value, c > t && styles.valueHighlight]}>{c}</Text>
              </View>
              <View style={styles.valueCol}>
                <Text style={[styles.value, t > c && styles.valueHighlight]}>{t}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.footnote}>
        All plans are 12-week, ~70 mpw builds. Higher value in each row is highlighted.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  planName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  planSub: {
    fontSize: 10,
    color: '#7986cb',
    textAlign: 'center',
    marginTop: 2,
  },
  switchHint: {
    fontSize: 12,
    color: '#546e7a',
    textAlign: 'center',
    marginBottom: 12,
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
    paddingHorizontal: 12,
  },
  rowAlt: {
    backgroundColor: '#16162e',
  },
  labelCol: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueCol: {
    flex: 1,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 13,
    color: '#b0bec5',
    flexShrink: 1,
  },
  value: {
    fontSize: 17,
    fontWeight: '700',
    color: '#78909c',
    fontVariant: ['tabular-nums'],
  },
  valueHighlight: {
    color: '#ffffff',
  },
  footnote: {
    fontSize: 12,
    color: '#546e7a',
    lineHeight: 18,
    marginTop: 16,
    paddingHorizontal: 4,
  },
});
