import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { usePaces } from '../context/PacesContext';

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

const MIN_HOURS = 2;
const MAX_HOURS = 6;

function formatPace(value) {
  if (Array.isArray(value)) return `${value[0]} – ${value[1]}`;
  return value;
}

function Stepper({ label, value, display, onDec, onInc }) {
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <TouchableOpacity style={styles.stepBtn} onPress={onDec}>
          <Text style={styles.stepBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{display}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={onInc}>
          <Text style={styles.stepBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PacesScreen() {
  const { goalSeconds, setGoal, paces } = usePaces();

  const [editing, setEditing] = useState(false);
  const [draftH, setDraftH] = useState(3);
  const [draftM, setDraftM] = useState(25);

  const openEditor = () => {
    setDraftH(Math.floor(goalSeconds / 3600));
    setDraftM(Math.floor((goalSeconds % 3600) / 60));
    setEditing(true);
  };

  const confirm = () => {
    setGoal(draftH * 3600 + draftM * 60);
    setEditing(false);
  };

  const cancel = () => setEditing(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.metaCard}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Goal Marathon</Text>
          {editing ? (
            <Text style={styles.metaValue}>
              {draftH}:{String(draftM).padStart(2, '0')}:00
            </Text>
          ) : (
            <TouchableOpacity onPress={openEditor} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.metaValueEditable}>{paces.goalMarathonTime}  ✎</Text>
            </TouchableOpacity>
          )}
        </View>

        {editing && (
          <View style={styles.editor}>
            <Stepper
              label="Hours"
              display={String(draftH)}
              onDec={() => setDraftH((h) => Math.max(MIN_HOURS, h - 1))}
              onInc={() => setDraftH((h) => Math.min(MAX_HOURS, h + 1))}
            />
            <Stepper
              label="Minutes"
              display={String(draftM).padStart(2, '0')}
              onDec={() => setDraftM((m) => (m === 0 ? 59 : m - 1))}
              onInc={() => setDraftM((m) => (m === 59 ? 0 : m + 1))}
            />
            <View style={styles.editorActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={confirm}>
                <Text style={styles.confirmBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.divider} />
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Marathon Pace</Text>
          <Text style={styles.metaValue}>{paces.currentFitness.marathonPace} /mi</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Threshold Pace</Text>
          <Text style={styles.metaValue}>{paces.currentFitness.thresholdPace} /mi</Text>
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
              {formatPace(paces.trainingZones[key])}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.footnote}>
        Paces are derived from your goal marathon time. Race-effort zones use
        race-equivalent performances; aerobic zones are offsets from marathon pace.
      </Text>
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
  metaValueEditable: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7986cb',
  },
  editor: {
    marginTop: 12,
    backgroundColor: '#16162e',
    borderRadius: 10,
    padding: 14,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  stepperLabel: {
    fontSize: 14,
    color: '#b0bec5',
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#2a2a4a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  stepperValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    minWidth: 34,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  editorActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 11,
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
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: '#5c6bc0',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
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
  footnote: {
    fontSize: 12,
    color: '#546e7a',
    lineHeight: 18,
    marginTop: 16,
    paddingHorizontal: 4,
  },
});
