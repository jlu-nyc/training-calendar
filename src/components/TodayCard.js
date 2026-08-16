import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PLANS } from '../data/plans';
import { WORKOUT_COLORS } from '../data/plan';
import { useSchedule } from '../context/ScheduleContext';
import {
  getTodayPosition,
  getDayDate,
  getWeekStartDate,
  getDayLabel,
  formatDate,
} from '../utils/dateUtils';

// A glance card for the home screen: what's on today's schedule for the
// selected plan and race date. Tapping opens the full workout detail.
export default function TodayCard({ raceDate, planKey, navigation }) {
  const PLAN = PLANS[planKey].plan;
  const { getWeekOrder } = useSchedule();
  const pos = getTodayPosition(raceDate);

  // Today falls outside the 12-week window — show a short status instead.
  if (!pos) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const planStart = getWeekStartDate(raceDate, 1);
    planStart.setHours(0, 0, 0, 0);
    const daysUntil = Math.round((planStart - today) / 86400000);

    let message;
    if (daysUntil > 0) {
      message =
        daysUntil === 1
          ? 'Training begins tomorrow.'
          : `Training begins in ${daysUntil} days.`;
    } else {
      message = 'This training plan is complete. 🎉';
    }
    return (
      <View style={[styles.card, styles.cardMuted]}>
        <Text style={styles.todayLabel}>Today</Text>
        <Text style={styles.mutedMessage}>{message}</Text>
      </View>
    );
  }

  const { week, dayIndex } = pos;
  // dayIndex is the calendar slot; map it through any swap to the actual workout.
  const order = getWeekOrder(planKey, week);
  const day = PLAN[week - 1].days[order[dayIndex]];
  const date = getDayDate(raceDate, week, dayIndex);
  const color = WORKOUT_COLORS[day.type];
  const isRace = day.description === 'RACE DAY';

  const openDetail = () => {
    navigation.navigate('DayDetail', {
      week,
      dayIndex,
      day: JSON.stringify(day),
      date: date.toISOString(),
      raceDate: raceDate.toISOString(),
      planKey,
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openDetail} activeOpacity={0.8}>
      <View style={styles.headerRow}>
        <View style={styles.todayPill}>
          <Text style={styles.todayPillText}>TODAY</Text>
        </View>
        <Text style={styles.weekText}>Week {week}</Text>
      </View>

      <Text style={styles.dateText}>
        {getDayLabel(dayIndex)}, {formatDate(date)}
      </Text>

      <View style={styles.workoutRow}>
        <View style={[styles.accent, { backgroundColor: color }]} />
        <View style={styles.workoutInfo}>
          <Text style={styles.workoutType}>{isRace ? '🏁 Race Day' : day.type}</Text>
          {day.miles > 0 && (
            <Text style={styles.milesText}>
              {day.miles}
              <Text style={styles.milesUnit}> mi</Text>
            </Text>
          )}
        </View>
      </View>

      {!!day.description && !isRace && (
        <Text style={styles.notes} numberOfLines={2}>
          {day.description}
        </Text>
      )}

      <Text style={styles.link}>View workout ›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e3a',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  cardMuted: {
    alignItems: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  todayPill: {
    backgroundColor: '#5c6bc0',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  todayPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  weekText: {
    fontSize: 12,
    color: '#7986cb',
    fontWeight: '600',
  },
  todayLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7986cb',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  mutedMessage: {
    fontSize: 15,
    color: '#b0bec5',
  },
  dateText: {
    fontSize: 13,
    color: '#90a4ae',
    marginBottom: 14,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accent: {
    width: 4,
    alignSelf: 'stretch',
    minHeight: 40,
    borderRadius: 2,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutType: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 2,
  },
  milesText: {
    fontSize: 15,
    color: '#7986cb',
    fontWeight: '700',
  },
  milesUnit: {
    fontSize: 13,
    color: '#546e7a',
    fontWeight: '600',
  },
  notes: {
    fontSize: 13,
    color: '#b0bec5',
    lineHeight: 19,
    marginTop: 12,
  },
  link: {
    fontSize: 13,
    color: '#5c6bc0',
    fontWeight: '700',
    marginTop: 14,
  },
});
