// 6-week mile plan — low weekly volume, high-frequency VO2max work. Two
// quality sessions a week (progressively longer/faster reps), one moderate
// aerobic-support run, dedicated strides for turnover, and full rest days
// around the hard sessions since intensity — not mileage — drives fitness
// here. Week 4 repeats week 1 as a cutback, mirroring the other plans'
// build-cutback-peak-taper shape.
import { WORKOUT_TYPES } from './plan';

const R   = WORKOUT_TYPES.REST;
const REC = WORKOUT_TYPES.RECOVERY;
const GA  = WORKOUT_TYPES.GENERAL_AEROBIC;
const LR  = WORKOUT_TYPES.LONG;
const LT  = WORKOUT_TYPES.LACTATE_THRESHOLD;
const V   = WORKOUT_TYPES.VO2MAX;
const TU  = WORKOUT_TYPES.TUNE_UP;

export const PLAN = [
  // ─── WEEK 1 ──────────────────────────────────────────────────────────────────
  {
    week: 1,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: V,   miles: 5, description: '6x400m at mile race pace, 400m jog recovery' },
      { type: REC, miles: 4, description: '' },
      { type: V,   miles: 5, description: '8x300m at 3K pace, 200m jog recovery' },
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 4, description: '6x100m strides' },
      { type: LR,  miles: 6, description: '' },
    ],
  },
  // ─── WEEK 2 ──────────────────────────────────────────────────────────────────
  {
    week: 2,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: V,   miles: 5, description: '5x600m at mile race pace, 3 min jog recovery' },
      { type: REC, miles: 4, description: '' },
      { type: LT,  miles: 5, description: '2 miles continuous at LT pace' },
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 5, description: '8x100m strides' },
      { type: LR,  miles: 7, description: '' },
    ],
  },
  // ─── WEEK 3 ──────────────────────────────────────────────────────────────────
  {
    week: 3,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: V,   miles: 6, description: '5x800m at 3K pace, 3 min jog recovery' },
      { type: REC, miles: 5, description: '' },
      { type: V,   miles: 5, description: '8x200m at faster-than-mile pace, full recovery' },
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 5, description: '8x100m strides' },
      { type: LR,  miles: 7, description: '' },
    ],
  },
  // ─── WEEK 4 (cutback — repeats week 1) ───────────────────────────────────────
  {
    week: 4,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: V,   miles: 5, description: '6x400m at mile race pace, 400m jog recovery' },
      { type: REC, miles: 4, description: '' },
      { type: V,   miles: 5, description: '8x300m at 3K pace, 200m jog recovery' },
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 4, description: '6x100m strides' },
      { type: LR,  miles: 6, description: '' },
    ],
  },
  // ─── WEEK 5 (peak week) ──────────────────────────────────────────────────────
  {
    week: 5,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: V,   miles: 6, description: '6x600m at mile race pace, 3 min jog recovery' },
      { type: REC, miles: 5, description: '' },
      { type: V,   miles: 6, description: '10x200m at faster-than-mile pace, full recovery' },
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 5, description: '10x100m strides' },
      { type: LR,  miles: 8, description: '' },
    ],
  },
  // ─── WEEK 6 (taper + race) ───────────────────────────────────────────────────
  {
    week: 6,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: V,   miles: 3, description: '4x200m at mile race pace, full recovery — quick legs, not tired' },
      { type: REC, miles: 3, description: '' },
      { type: GA,  miles: 3, description: '6x100m strides' },
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: REC, miles: 2, description: '4x100m strides — shake out' },
      { type: TU,  miles: 1, description: 'RACE DAY' },
    ],
  },
];
