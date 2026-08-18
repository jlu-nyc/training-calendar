// 12-week marathon plan

export const WORKOUT_TYPES = {
  REST: 'Rest',
  RECOVERY: 'Recovery',
  GENERAL_AEROBIC: 'General aerobic',
  MEDIUM_LONG: 'Medium-long run',
  LONG: 'Long run',
  LACTATE_THRESHOLD: 'Lactate threshold',
  VO2MAX: 'VO2max intervals',
  MARATHON_PACE: 'Marathon-pace run',
  TUNE_UP: 'Tune-up race',
};

// Color for each workout type (used in UI chips/badges)
export const WORKOUT_COLORS = {
  [WORKOUT_TYPES.REST]: '#9E9E9E',
  [WORKOUT_TYPES.RECOVERY]: '#66BB6A',
  [WORKOUT_TYPES.GENERAL_AEROBIC]: '#26A69A',
  [WORKOUT_TYPES.MEDIUM_LONG]: '#42A5F5',
  [WORKOUT_TYPES.LONG]: '#1565C0',
  [WORKOUT_TYPES.LACTATE_THRESHOLD]: '#FFA726',
  [WORKOUT_TYPES.VO2MAX]: '#EF5350',
  [WORKOUT_TYPES.MARATHON_PACE]: '#F06292',
  [WORKOUT_TYPES.TUNE_UP]: '#AB47BC',
};

export const WORKOUT_TEXT_COLORS = {
  [WORKOUT_TYPES.REST]: '#fff',
  [WORKOUT_TYPES.RECOVERY]: '#fff',
  [WORKOUT_TYPES.GENERAL_AEROBIC]: '#fff',
  [WORKOUT_TYPES.MEDIUM_LONG]: '#fff',
  [WORKOUT_TYPES.LONG]: '#fff',
  [WORKOUT_TYPES.LACTATE_THRESHOLD]: '#fff',
  [WORKOUT_TYPES.VO2MAX]: '#fff',
  [WORKOUT_TYPES.MARATHON_PACE]: '#fff',
  [WORKOUT_TYPES.TUNE_UP]: '#fff',
};

// Miles actually run at marathon pace on a given day. Marathon-pace runs bury
// the MP segment inside a longer run, so each MP day carries an explicit
// `mpMiles` field for the portion run at marathon pace.
export function marathonPaceMiles(day) {
  if (!day || day.type !== WORKOUT_TYPES.MARATHON_PACE) return 0;
  return day.mpMiles || 0;
}

// Total marathon-pace miles across an entire plan.
export function totalMarathonPaceMiles(plan) {
  return plan.reduce(
    (sum, week) =>
      sum + week.days.reduce((wSum, day) => wSum + marathonPaceMiles(day), 0),
    0
  );
}

// Summary stats for a plan, all from structured fields (no description parsing).
// Used by the plan comparison screen.
export function planStats(plan) {
  let totalMiles = 0;
  let longestRun = 0;
  const peakWeek = { week: 0, miles: 0 };
  const counts = { threshold: 0, vo2max: 0, marathonPace: 0, tuneUp: 0 };

  plan.forEach((week) => {
    let weekMiles = 0;
    week.days.forEach((day) => {
      const m = day.miles || 0;
      totalMiles += m;
      weekMiles += m;
      // Longest single run, excluding the marathon itself (a tune-up entry).
      if (day.type !== WORKOUT_TYPES.TUNE_UP && m > longestRun) longestRun = m;
      if (day.type === WORKOUT_TYPES.LACTATE_THRESHOLD) counts.threshold += 1;
      else if (day.type === WORKOUT_TYPES.VO2MAX) counts.vo2max += 1;
      else if (day.type === WORKOUT_TYPES.MARATHON_PACE) counts.marathonPace += 1;
      else if (day.type === WORKOUT_TYPES.TUNE_UP && m === 0) counts.tuneUp += 1;
    });
    if (weekMiles > peakWeek.miles) {
      peakWeek.week = week.week;
      peakWeek.miles = weekMiles;
    }
  });

  return {
    totalMiles: Math.round(totalMiles),
    peakWeek,
    longestRun,
    mpMiles: totalMarathonPaceMiles(plan),
    counts,
  };
}

const R = WORKOUT_TYPES.REST;
const REC = WORKOUT_TYPES.RECOVERY;
const GA = WORKOUT_TYPES.GENERAL_AEROBIC;
const ML = WORKOUT_TYPES.MEDIUM_LONG;
const LR = WORKOUT_TYPES.LONG;
const LT = WORKOUT_TYPES.LACTATE_THRESHOLD;
const V = WORKOUT_TYPES.VO2MAX;
const MP = WORKOUT_TYPES.MARATHON_PACE;
const TU = WORKOUT_TYPES.TUNE_UP;

// Each day: { type, miles, description }
// days[0] = Monday ... days[6] = Sunday
// miles: number (0 for rest/cross-training)
// description: string with pace/effort notes

export const PLAN = [
  // ─── WEEK 1 ──────────────────────────────────────────────────────────────────
  {
    week: 1,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: GA,  miles: 8,  description: '6x10s hill sprints + 8x100m strides' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 15, mpMiles: 8, description: '8 miles at marathon pace' },
    ],
  },
  // ─── WEEK 2 ──────────────────────────────────────────────────────────────────
  {
    week: 2,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: ML,  miles: 12, description: '' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: LT,  miles: 9,  description: '4 miles at LT pace' },
      { type: REC, miles: 5,  description: '' },
      { type: LR,  miles: 17, description: '' },
    ],
  },
  // ─── WEEK 3 ──────────────────────────────────────────────────────────────────
  {
    week: 3,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: GA,  miles: 9,  description: '6x10s hill sprints + 8x100m strides' },
      { type: ML,  miles: 14, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: ML,  miles: 12, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 17, mpMiles: 10, description: '10 miles at marathon pace' },
    ],
  },
  // ─── WEEK 4 ──────────────────────────────────────────────────────────────────
  {
    week: 4,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: ML,  miles: 13, description: '' },
      { type: ML,  miles: 15, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: LT,  miles: 10, description: '5 miles at LT pace' },
      { type: REC, miles: 5,  description: '' },
      { type: LR,  miles: 18, description: '' },
    ],
  },
  // ─── WEEK 5 ──────────────────────────────────────────────────────────────────
  {
    week: 5,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: GA,  miles: 8,  description: '6x10s hill sprints + 8x100m strides' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 15, mpMiles: 8, description: '8 miles at marathon pace' },
    ],
  },
  // ─── WEEK 6 ──────────────────────────────────────────────────────────────────
  {
    week: 6,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: REC, miles: 10, description: 'AM: 6 miles · PM: 4 miles' },
      { type: V,   miles: 11, description: '5x1200m at 5K race pace' },
      { type: ML,  miles: 15, description: '' },
      { type: GA,  miles: 10, description: '' },
      { type: REC, miles: 6,  description: '' },
      { type: MP,  miles: 18, mpMiles: 12, description: '12 miles at marathon pace' },
    ],
  },
  // ─── WEEK 7 ──────────────────────────────────────────────────────────────────
  {
    week: 7,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: GA,  miles: 9,  description: '10x100m strides' },
      { type: ML,  miles: 15, description: '' },
      { type: REC, miles: 7,  description: '' },
      { type: LT,  miles: 12, description: '7 miles at LT pace' },
      { type: REC, miles: 6,  description: '' },
      { type: LR,  miles: 21, description: '' },
    ],
  },
  // ─── WEEK 8 ──────────────────────────────────────────────────────────────────
  {
    week: 8,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: V,   miles: 9,  description: '5x600m at 5K pace' },
      { type: ML,  miles: 15, description: '' },
      { type: REC, miles: 7,  description: '6x100m strides' },
      { type: REC, miles: 6,  description: '' },
      { type: TU,  miles: 0,  description: '8K–15K tune-up race' },
      { type: LR,  miles: 18, description: '' },
    ],
  },
  // ─── WEEK 9 ──────────────────────────────────────────────────────────────────
  {
    week: 9,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: REC, miles: 10, description: 'AM: 6 miles · PM: 4 miles' },
      { type: V,   miles: 11, description: '6x1000m at 5K pace' },
      { type: ML,  miles: 15, description: '' },
      { type: GA,  miles: 8,  description: '' },
      { type: REC, miles: 6,  description: '' },
      { type: LR,  miles: 20, description: '' },
    ],
  },
  // ─── WEEK 10 ─────────────────────────────────────────────────────────────────
  {
    week: 10,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: V,   miles: 8,  description: '5x600m at 5K pace' },
      { type: ML,  miles: 12, description: '' },
      { type: REC, miles: 6,  description: '6x100m strides' },
      { type: REC, miles: 5,  description: '' },
      { type: TU,  miles: 0,  description: '8K–10K tune-up race' },
      { type: LR,  miles: 17, description: '' },
    ],
  },
  // ─── WEEK 11 (taper begins) ───────────────────────────────────────────────────
  {
    week: 11,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: GA,  miles: 8,  description: '10x100m strides' },
      { type: REC, miles: 4,  description: '' },
      { type: V,   miles: 8,  description: '4x1200m at 5K pace' },
      { type: REC, miles: 6,  description: '' },
      { type: REC, miles: 6,  description: '10x100m strides' },
      { type: ML,  miles: 13, description: '' },
    ],
  },
  // ─── WEEK 12 (race week) ─────────────────────────────────────────────────────
  {
    week: 12,
    days: [
      { type: R,   miles: 0,    description: 'Rest or cross-training' },
      { type: REC, miles: 12,   description: '' },
      { type: MP,  miles: 7,    mpMiles: 2, description: '2 miles at marathon pace (dress rehearsal)' },
      { type: REC, miles: 5,    description: '' },
      { type: REC, miles: 5,    description: '6x100m strides' },
      { type: REC, miles: 4,    description: '' },
      { type: TU,  miles: 26.2, description: 'RACE DAY' },
    ],
  },
];
