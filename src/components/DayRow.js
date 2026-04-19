import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WORKOUT_COLORS, WORKOUT_TYPES } from '../data/plan';
import { getDayAbbrev, formatDate, isToday, isPast } from '../utils/dateUtils';

export default function DayRow({ dayIndex, day, date, onPress }) {
  const today = isToday(date);
  const past = isPast(date) && !today;
  const isRace = day.description === 'RACE DAY';

  return (
    <TouchableOpacity
      style={[styles.row, today && styles.rowToday, past && styles.rowPast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Date column */}
      <View style={styles.dateCol}>
        <Text style={[styles.dayAbbrev, past && styles.textFaded]}>
          {getDayAbbrev(dayIndex)}
        </Text>
        <Text style={[styles.dateText, past && styles.textFaded]}>
          {formatDate(date)}
        </Text>
      </View>

      {/* Workout type badge */}
      <View style={[styles.badge, { backgroundColor: past ? '#2a2a3a' : WORKOUT_COLORS[day.type] }]}>
        <Text style={[styles.badgeText, past && styles.textFaded]} numberOfLines={1}>
          {isRace ? '🏁 Race Day' : day.type}
        </Text>
      </View>

      {/* Miles */}
      <View style={styles.milesCol}>
        {day.miles > 0 ? (
          <Text style={[styles.miles, past && styles.textFaded]}>
            {day.miles}
          </Text>
        ) : day.type === WORKOUT_TYPES.REST ? (
          <Text style={[styles.restText, past && styles.textFaded]}>—</Text>
        ) : (
          <Text style={styles.placeholder}>?</Text>
        )}
        {day.miles > 0 && (
          <Text style={[styles.milesLabel, past && styles.textFaded]}>mi</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3a',
  },
  rowToday: {
    backgroundColor: '#1a1a3e',
  },
  rowPast: {
    opacity: 0.5,
  },
  dateCol: {
    width: 52,
  },
  dayAbbrev: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7986cb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 12,
    color: '#90a4ae',
  },
  badge: {
    flex: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  milesCol: {
    width: 40,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 2,
  },
  miles: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  milesLabel: {
    fontSize: 10,
    color: '#78909c',
    alignSelf: 'flex-end',
    marginBottom: 1,
  },
  restText: {
    fontSize: 15,
    color: '#546e7a',
  },
  placeholder: {
    fontSize: 13,
    color: '#37474f',
    fontStyle: 'italic',
  },
  textFaded: {
    color: '#546e7a',
  },
});
