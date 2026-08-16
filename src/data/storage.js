import AsyncStorage from '@react-native-async-storage/async-storage';

// Single choke point for all persisted user state. Keeping every read/write here
// (instead of scattered AsyncStorage calls in components) means a future
// multi-user move is a one-file change: prefix keys with a userId, or swap the
// AsyncStorage backend for an API. All fields together form one serializable
// "user document": { raceDate, goalSeconds, planKey, weekOverrides }.
const KEYS = {
  raceDate: 'raceDate',                 // 'yyyy-mm-dd'
  goalSeconds: 'goalMarathonSeconds',   // number (as string)
  planKey: 'planKey',                   // 'classic' | 'threshold'
  weekOverrides: 'weekOverrides',       // JSON: { [planKey]: { [week]: number[] } }
};

async function getRaw(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

async function setRaw(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    // best-effort; ignore write failures
  }
}

export const storage = {
  // Race date — stored as a local 'yyyy-mm-dd' string
  getRaceDate: () => getRaw(KEYS.raceDate),
  setRaceDate: (str) => setRaw(KEYS.raceDate, str),

  // Goal marathon time in seconds
  async getGoalSeconds() {
    const n = parseInt(await getRaw(KEYS.goalSeconds), 10);
    return Number.isNaN(n) ? null : n;
  },
  setGoalSeconds: (seconds) => setRaw(KEYS.goalSeconds, String(seconds)),

  // Selected plan key
  getPlanKey: () => getRaw(KEYS.planKey),
  setPlanKey: (key) => setRaw(KEYS.planKey, key),

  // Per-week day-order overrides: { [planKey]: { [week]: number[] } }
  async getWeekOverrides() {
    const raw = await getRaw(KEYS.weekOverrides);
    if (!raw) return {};
    try {
      return JSON.parse(raw) || {};
    } catch {
      return {};
    }
  },
  setWeekOverrides: (obj) => setRaw(KEYS.weekOverrides, JSON.stringify(obj)),
};
