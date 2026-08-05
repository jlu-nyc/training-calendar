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
import { PLANS } from '../data/plans';

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
  const [planKey, setPlanKey] = useState('classic');

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

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Plan</Text>
        <View style={styles.planSelector}>
          {Object.values(PLANS).map((p) => {
            const active = planKey === p.key;
            return (
              <TouchableOpacity
                key={p.key}
                style={[styles.planOption, active && styles.planOptionActive]}
                onPress={() => setPlanKey(p.key)}
              >
                <Text style={[styles.planOptionName, active && styles.planOptionNameActive]}>
                  {p.name}
                </Text>
                <Text style={[styles.planOptionSub, active && styles.planOptionSubActive]}>
                  {p.subtitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calendar', { raceDate: raceDate.toISOString(), planKey })}
      >
        <Text style={styles.buttonText}>View Training Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Paces')}
      >
        <Text style={styles.buttonSecondaryText}>View Training Paces</Text>
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
  display: 'block',
  width: '100%',
  minWidth: 0,
  margin: 0,
  padding: '12px 14px',
  fontSize: '16px',
  // appearance:none (below) fixes the iOS width overflow but drops the native
  // control's system font — re-point it at the same system font so the date
  // text renders as it did before.
  fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  color: '#ffffff',
  backgroundColor: '#2a2a4a',
  border: '1px solid #3a3a5a',
  borderRadius: '10px',
  cursor: 'pointer',
  colorScheme: 'dark',
  boxSizing: 'border-box',
  // iOS Safari gives date inputs an intrinsic min-width from their native
  // appearance and won't shrink to width:100%, overflowing the card by a few
  // pixels. Removing the native appearance lets border-box width take effect.
  WebkitAppearance: 'none',
  appearance: 'none',
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
  planSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  planOption: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#2a2a4a',
    alignItems: 'center',
  },
  planOptionActive: {
    backgroundColor: '#5c6bc0',
  },
  planOptionName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#90a4ae',
    marginBottom: 2,
  },
  planOptionNameActive: {
    color: '#ffffff',
  },
  planOptionSub: {
    fontSize: 11,
    color: '#546e7a',
  },
  planOptionSubActive: {
    color: 'rgba(255,255,255,0.75)',
  },
  buttonSecondary: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3a3a5a',
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#90a4ae',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  note: {
    fontSize: 12,
    color: '#546e7a',
    textAlign: 'center',
    lineHeight: 18,
  },
});
