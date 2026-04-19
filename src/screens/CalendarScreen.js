import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PLAN } from '../data/plan';
import WeekCard from '../components/WeekCard';
import { getTodayPosition } from '../utils/dateUtils';

export default function CalendarScreen({ route, navigation }) {
  const { raceDate: raceDateISO } = route.params;
  const raceDate = new Date(raceDateISO);

  const todayPos = getTodayPosition(raceDate);
  const scrollRef = useRef(null);

  // Scroll to current week on load
  useEffect(() => {
    if (todayPos && scrollRef.current) {
      const CARD_HEIGHT = 64; // approximate collapsed card height + margin
      const offset = (todayPos.week - 1) * CARD_HEIGHT;
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: Math.max(0, offset - 100), animated: true });
      }, 300);
    }
  }, []);

  const handleDayPress = (week, dayIndex, day, date) => {
    navigation.navigate('DayDetail', {
      week,
      dayIndex,
      day: JSON.stringify(day),
      date: date.toISOString(),
      raceDate: raceDateISO,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Training Plan</Text>
          <Text style={styles.headerSub}>
            Race:{' '}
            {raceDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>

        {!todayPos && (
          <View style={styles.outsideBanner}>
            <Text style={styles.outsideBannerText}>
              Today is outside this training plan window.
            </Text>
          </View>
        )}

        {PLAN.map((week) => (
          <WeekCard
            key={week.week}
            weekData={week}
            raceDate={raceDate}
            isCurrentWeek={todayPos?.week === week.week}
            onDayPress={handleDayPress}
          />
        ))}

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.changeRaceButton}
          >
            <Text style={styles.changeRaceText}>Change Race Date</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: '#7986cb',
  },
  outsideBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1e1e3a',
    borderRadius: 8,
    padding: 12,
  },
  outsideBannerText: {
    fontSize: 13,
    color: '#78909c',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  changeRaceButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  changeRaceText: {
    fontSize: 14,
    color: '#5c6bc0',
    fontWeight: '600',
  },
});
