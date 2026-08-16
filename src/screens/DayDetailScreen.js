import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { WORKOUT_COLORS, WORKOUT_TYPES } from '../data/plan';
import { PLANS } from '../data/plans';
import { usePaces } from '../context/PacesContext';
import { useSchedule } from '../context/ScheduleContext';
import { getDayLabel, formatFullDate } from '../utils/dateUtils';

function formatPace(value) {
  if (Array.isArray(value)) return `${value[0]} – ${value[1]} /mi`;
  return `${value} /mi`;
}

// Build the per-workout pace rows from the goal-derived training zones.
function buildPaceForType(z) {
  return {
    [WORKOUT_TYPES.RECOVERY]: [
      { label: 'Pace', value: z.recovery },
    ],
    [WORKOUT_TYPES.GENERAL_AEROBIC]: [
      { label: 'Pace', value: z.easy },
    ],
    [WORKOUT_TYPES.MEDIUM_LONG]: [
      { label: 'Pace', value: z.steady },
    ],
    [WORKOUT_TYPES.LONG]: [
      { label: 'Pace', value: z.easy },
    ],
    [WORKOUT_TYPES.LACTATE_THRESHOLD]: [
      { label: 'Warm-up / cool-down', value: z.easy },
      { label: 'Threshold segment', value: z.threshold },
    ],
    [WORKOUT_TYPES.VO2MAX]: [
      { label: 'Warm-up / cool-down', value: z.easy },
      { label: 'Intervals', value: z.interval5K },
    ],
    [WORKOUT_TYPES.MARATHON_PACE]: [
      { label: 'Warm-up / cool-down', value: z.easy },
      { label: 'Marathon-pace segment', value: z.marathon },
    ],
  };
}

const WORKOUT_DESCRIPTIONS = {
  [WORKOUT_TYPES.REST]: 'Full rest or light cross-training (swimming, cycling, yoga). Keep it easy — protect your legs.',
  [WORKOUT_TYPES.RECOVERY]: 'Very easy effort. Conversational pace. Focus on flushing fatigue from prior workouts.',
  [WORKOUT_TYPES.GENERAL_AEROBIC]: 'Moderate aerobic effort. Comfortable but not leisurely. Builds your aerobic base.',
  [WORKOUT_TYPES.MEDIUM_LONG]: 'Medium-long run at a comfortable aerobic pace. Builds endurance without the full recovery cost of a long run.',
  [WORKOUT_TYPES.LONG]: 'Long run at a comfortable aerobic effort. The cornerstone of marathon preparation.',
  [WORKOUT_TYPES.LACTATE_THRESHOLD]: 'Includes warm-up, a tempo segment at lactate threshold pace (comfortably hard — about 10K to half-marathon race pace), and cool-down.',
  [WORKOUT_TYPES.VO2MAX]: 'Interval session targeting VO2max. Typically 600m–1200m repeats at 5K effort with recovery jogs. Includes warm-up and cool-down.',
  [WORKOUT_TYPES.MARATHON_PACE]: 'Includes easy warm-up miles, a sustained segment at goal marathon pace, and easy cool-down miles. Builds race-pace economy and mental familiarity.',
  [WORKOUT_TYPES.TUNE_UP]: 'Race at shorter distance (e.g. 15K, half marathon) to assess fitness and practice race-day execution.',
};

export default function DayDetailScreen({ route, navigation }) {
  const {
    week,
    dayIndex,
    day: dayJSON,
    date: dateISO,
    planKey = 'classic',
  } = route.params;
  const day = JSON.parse(dayJSON);
  const date = new Date(dateISO);

  const { paces } = usePaces();
  const { getWeekOrder, hasOverride, swapDays, resetWeek } = useSchedule();
  const PACE_FOR_TYPE = buildPaceForType(paces.trainingZones);

  const isRace = day.description === 'RACE DAY';
  const color = WORKOUT_COLORS[day.type];

  // Reschedule (swap this workout onto another day in the same week).
  const [swapping, setSwapping] = useState(false);
  const [target, setTarget] = useState(null);
  const weekDays = PLANS[planKey].plan[week - 1].days;
  const order = getWeekOrder(planKey, week);

  const confirmSwap = () => {
    if (target === null) return;
    swapDays(planKey, week, dayIndex, target);
    setSwapping(false);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Color header strip */}
      <View style={[styles.strip, { backgroundColor: color }]}>
        <Text style={styles.stripWeek}>Week {week} · {getDayLabel(dayIndex)}</Text>
        <Text style={styles.stripDate}>{formatFullDate(date)}</Text>
        {isRace ? (
          <Text style={styles.stripMiles}>🏁 Race Day</Text>
        ) : (
          <Text style={styles.stripType}>{day.type}</Text>
        )}
      </View>

      {/* Miles */}
      {day.miles > 0 && (
        <View style={styles.milesBlock}>
          <Text style={styles.milesNumber}>{day.miles}</Text>
          <Text style={styles.milesUnit}>miles</Text>
        </View>
      )}

      {/* Workout description */}
      {!isRace && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About this workout</Text>
          <Text style={styles.sectionBody}>
            {WORKOUT_DESCRIPTIONS[day.type] || ''}
          </Text>
        </View>
      )}

      {/* Paces */}
      {PACE_FOR_TYPE[day.type] && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Paces</Text>
          <View style={styles.paceCard}>
            {PACE_FOR_TYPE[day.type].map(({ label, value }, i) => (
              <View key={label}>
                {i > 0 && <View style={styles.paceDivider} />}
                <View style={styles.paceRow}>
                  <Text style={styles.paceLabel}>{label}</Text>
                  <Text style={styles.paceValue}>{formatPace(value)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Notes from plan */}
      {day.description && day.description !== 'RACE DAY' && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notes</Text>
          <Text style={styles.sectionBody}>{day.description}</Text>
        </View>
      )}

      {/* Reschedule — swap this workout onto another day this week */}
      {!isRace && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Reschedule</Text>

          {!swapping ? (
            <>
              <TouchableOpacity
                style={styles.rescheduleBtn}
                onPress={() => {
                  setTarget(null);
                  setSwapping(true);
                }}
              >
                <Text style={styles.rescheduleBtnText}>Swap with another day</Text>
              </TouchableOpacity>
              {hasOverride(planKey, week) && (
                <TouchableOpacity
                  style={styles.resetBtn}
                  onPress={() => resetWeek(planKey, week)}
                >
                  <Text style={styles.resetBtnText}>Reset week to plan order</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View>
              <Text style={styles.swapHint}>
                Swap {getDayLabel(dayIndex)}'s workout with:
              </Text>
              {order.map((origIdx, slot) => {
                if (slot === dayIndex) return null;
                const d = weekDays[origIdx];
                const selected = target === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    style={[styles.swapOption, selected && styles.swapOptionSel]}
                    onPress={() => setTarget(slot)}
                  >
                    <Text style={styles.swapOptionDay}>{getDayLabel(slot)}</Text>
                    <Text style={styles.swapOptionWorkout}>
                      {d.type}
                      {d.miles > 0 ? ` · ${d.miles} mi` : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={styles.swapActions}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setSwapping(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmBtn, target === null && styles.confirmBtnDisabled]}
                  disabled={target === null}
                  onPress={confirmSwap}
                >
                  <Text style={styles.confirmBtnText}>Confirm swap</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      {isRace && (
        <View style={styles.raceBlock}>
          <Text style={styles.raceText}>
            All 12 weeks of training have been building to this moment.{'\n\n'}
            Trust your preparation. Run your race.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  content: {
    paddingBottom: 40,
  },
  strip: {
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  stripWeek: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  stripDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  stripType: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  stripMiles: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  milesBlock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 6,
  },
  milesNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 52,
  },
  milesUnit: {
    fontSize: 16,
    color: '#7986cb',
    marginBottom: 8,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7986cb',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 15,
    color: '#b0bec5',
    lineHeight: 24,
  },
  paceCard: {
    backgroundColor: '#1e1e3a',
    borderRadius: 10,
    overflow: 'hidden',
  },
  paceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  paceDivider: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginHorizontal: 14,
  },
  paceLabel: {
    fontSize: 14,
    color: '#90a4ae',
  },
  paceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    fontVariant: ['tabular-nums'],
  },
  rescheduleBtn: {
    backgroundColor: '#1e1e3a',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  rescheduleBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7986cb',
  },
  resetBtn: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  resetBtnText: {
    fontSize: 13,
    color: '#78909c',
    fontWeight: '600',
  },
  swapHint: {
    fontSize: 13,
    color: '#90a4ae',
    marginBottom: 10,
  },
  swapOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e1e3a',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  swapOptionSel: {
    borderColor: '#5c6bc0',
    backgroundColor: '#26264a',
  },
  swapOptionDay: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  swapOptionWorkout: {
    fontSize: 13,
    color: '#90a4ae',
  },
  swapActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 9,
    backgroundColor: '#2a2a4a',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#90a4ae',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 9,
    backgroundColor: '#5c6bc0',
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    opacity: 0.4,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  raceBlock: {
    margin: 24,
    backgroundColor: '#1e1e3a',
    borderRadius: 12,
    padding: 24,
  },
  raceText: {
    fontSize: 16,
    color: '#cfd8dc',
    lineHeight: 26,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
