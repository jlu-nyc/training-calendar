import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WORKOUT_COLORS, WORKOUT_TYPES } from '../data/plan';
import { getDayLabel, formatFullDate } from '../utils/dateUtils';

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

export default function DayDetailScreen({ route }) {
  const { week, dayIndex, day: dayJSON, date: dateISO } = route.params;
  const day = JSON.parse(dayJSON);
  const date = new Date(dateISO);

  const isRace = day.description === 'RACE DAY';
  const color = WORKOUT_COLORS[day.type];

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

      {/* Notes from plan */}
      {day.description && day.description !== 'RACE DAY' && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notes</Text>
          <Text style={styles.sectionBody}>{day.description}</Text>
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
