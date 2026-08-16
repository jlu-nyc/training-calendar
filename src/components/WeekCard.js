import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DayRow from './DayRow';
import { getWeekStartDate, getDayDate, formatDate } from '../utils/dateUtils';
import { useSchedule } from '../context/ScheduleContext';

export default function WeekCard({ weekData, raceDate, planKey, isCurrentWeek, onDayPress }) {
  const [expanded, setExpanded] = useState(isCurrentWeek);
  const { getWeekOrder } = useSchedule();
  const order = getWeekOrder(planKey, weekData.week);

  const weekStart = getWeekStartDate(raceDate, weekData.week);
  const weekEnd = getDayDate(raceDate, weekData.week, 6);

  const totalMiles = weekData.days.reduce((sum, d) => sum + (d.miles || 0), 0);
  const isRaceWeek = weekData.week === 12;

  return (
    <View style={[styles.card, isCurrentWeek && styles.cardCurrent]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View>
          <View style={styles.headerTop}>
            <Text style={styles.weekLabel}>
              {isRaceWeek ? 'Week 12 · Race Week' : `Week ${weekData.week}`}
            </Text>
            {isCurrentWeek && (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>THIS WEEK</Text>
              </View>
            )}
          </View>
          <Text style={styles.dateRange}>
            {formatDate(weekStart)} – {formatDate(weekEnd)}
          </Text>
        </View>

        <View style={styles.headerRight}>
          {totalMiles > 0 && (
            <View style={styles.milesBubble}>
              <Text style={styles.milesBubbleText}>{totalMiles}</Text>
              <Text style={styles.milesBubbleLabel}>mi</Text>
            </View>
          )}
          <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.days}>
          {order.map((origIdx, slot) => {
            const day = weekData.days[origIdx];
            const date = getDayDate(raceDate, weekData.week, slot);
            return (
              <DayRow
                key={slot}
                dayIndex={slot}
                day={day}
                date={date}
                onPress={() => onDayPress(weekData.week, slot, day, date)}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#12122a',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1e1e3a',
  },
  cardCurrent: {
    borderColor: '#5c6bc0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  weekLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  currentBadge: {
    backgroundColor: '#5c6bc0',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  currentBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  dateRange: {
    fontSize: 12,
    color: '#546e7a',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  milesBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  milesBubbleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#7986cb',
  },
  milesBubbleLabel: {
    fontSize: 11,
    color: '#546e7a',
    marginBottom: 2,
  },
  chevron: {
    fontSize: 10,
    color: '#546e7a',
  },
  days: {
    borderTopWidth: 1,
    borderTopColor: '#1e1e3a',
  },
});
