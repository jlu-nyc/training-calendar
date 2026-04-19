import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DEFAULT_RACE = (() => {
  const d = new Date();
  const daysUntilSunday = (7 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + daysUntilSunday);
  d.setHours(0, 0, 0, 0);
  return d;
})();

function toLocalDateString(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// yyyy-mm-dd string from a Date (avoids timezone shifting issues with toISOString)
function toInputValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Parse a yyyy-mm-dd string as local time (not UTC)
function fromInputValue(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export default function HomeScreen({ navigation }) {
  const [raceDate, setRaceDate] = useState(DEFAULT_RACE);
  const [tempDate, setTempDate] = useState(DEFAULT_RACE);
  const [showPicker, setShowPicker] = useState(false);

  const planStart = new Date(raceDate);
  planStart.setDate(planStart.getDate() - 83);

  const openPicker = () => {
    setTempDate(raceDate);
    setShowPicker(true);
  };

  const confirmDate = () => {
    setRaceDate(tempDate);
    setShowPicker(false);
  };

  const cancelDate = () => {
    setShowPicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Marathon{'\n'}Training Calendar</Text>
      <Text style={styles.subtitle}>Pfitzinger · 70 mpw · 12 weeks</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Race Date</Text>

        {Platform.OS === 'web' ? (
          // Native HTML date input — works reliably across all browsers
          <input
            type="date"
            value={toInputValue(raceDate)}
            min={toInputValue(new Date())}
            onChange={(e) => {
              if (e.target.value) setRaceDate(fromInputValue(e.target.value));
            }}
            style={webInputStyle}
          />
        ) : (
          <>
            <TouchableOpacity style={styles.dateButton} onPress={openPicker}>
              <Text style={styles.dateButtonText}>
                {toLocalDateString(raceDate)}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <View>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={(event, selected) => {
                    if (selected) setTempDate(selected);
                  }}
                  minimumDate={new Date()}
                  textColor="#ffffff"
                  themeVariant="dark"
                />
                <View style={styles.pickerActions}>
                  <TouchableOpacity onPress={cancelDate} style={styles.pickerCancel}>
                    <Text style={styles.pickerCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmDate} style={styles.pickerConfirm}>
                    <Text style={styles.pickerConfirmText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}

        <View style={styles.divider} />

        <Text style={styles.infoLabel}>Training begins</Text>
        <Text style={styles.infoValue}>{toLocalDateString(planStart)}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calendar', { raceDate: raceDate.toISOString() })}
      >
        <Text style={styles.buttonText}>View Training Plan</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Plan assumes race day is Sunday.{'\n'}
        For best results, select a Sunday.
      </Text>
    </ScrollView>
  );
}

// Inline style object for the HTML input (StyleSheet doesn't apply to DOM elements)
const webInputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: '16px',
  color: '#ffffff',
  backgroundColor: '#2a2a4a',
  border: '1px solid #3a3a5a',
  borderRadius: '10px',
  cursor: 'pointer',
  colorScheme: 'dark',
  boxSizing: 'border-box',
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f0f23',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7986cb',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#1e1e3a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7986cb',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  dateButton: {
    backgroundColor: '#2a2a4a',
    borderRadius: 10,
    padding: 14,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a4a',
    marginVertical: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#7986cb',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#b0bec5',
  },
  button: {
    backgroundColor: '#5c6bc0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    gap: 12,
  },
  pickerCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#2a2a4a',
    alignItems: 'center',
  },
  pickerCancelText: {
    color: '#90a4ae',
    fontSize: 15,
    fontWeight: '600',
  },
  pickerConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#5c6bc0',
    alignItems: 'center',
  },
  pickerConfirmText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  note: {
    fontSize: 12,
    color: '#546e7a',
    textAlign: 'center',
    lineHeight: 18,
  },
});
