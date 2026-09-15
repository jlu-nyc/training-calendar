// 8-week half marathon plan — same build shape as the 12-week Classic
// marathon plan (general aerobic variety, VO2max introduced late, a cutback
// week that repeats week 1), compressed to a shorter distance and duration.
import { WORKOUT_TYPES } from './plan';

const R   = WORKOUT_TYPES.REST;
const REC = WORKOUT_TYPES.RECOVERY;
const GA  = WORKOUT_TYPES.GENERAL_AEROBIC;
const ML  = WORKOUT_TYPES.MEDIUM_LONG;
const LR  = WORKOUT_TYPES.LONG;
const LT  = WORKOUT_TYPES.LACTATE_THRESHOLD;
const V   = WORKOUT_TYPES.VO2MAX;
const HMP = WORKOUT_TYPES.HALF_MARATHON_PACE;
const TU  = WORKOUT_TYPES.TUNE_UP;

export const PLAN = [
  // ─── WEEK 1 ──────────────────────────────────────────────────────────────────
  {
    week: 1,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 6, description: '6x10s hill sprints + 6x100m strides' },
      { type: ML,  miles: 7, description: '' },
      { type: REC, miles: 4, description: '' },
      { type: ML,  miles: 6, description: '' },
      { type: REC, miles: 4, description: '' },
      { type: HMP, miles: 7, mpMiles: 3, description: '3 miles at half-marathon pace' },
    ],
  },
  // ─── WEEK 2 ──────────────────────────────────────────────────────────────────
  {
    week: 2,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: ML,  miles: 7,  description: '' },
      { type: ML,  miles: 6,  description: '' },
      { type: LT,  miles: 6,  description: '3 miles at LT pace' },
      { type: REC, miles: 4,  description: '' },
      { type: REC, miles: 4,  description: '' },
      { type: LR,  miles: 10, description: '' },
    ],
  },
  // ─── WEEK 3 ──────────────────────────────────────────────────────────────────
  {
    week: 3,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 7, description: '6x10s hill sprints + 6x100m strides' },
      { type: ML,  miles: 8, description: '' },
      { type: REC, miles: 4, description: '' },
      { type: ML,  miles: 7, description: '' },
      { type: REC, miles: 4, description: '' },
      { type: HMP, miles: 9, mpMiles: 4, description: '4 miles at half-marathon pace' },
    ],
  },
  // ─── WEEK 4 ──────────────────────────────────────────────────────────────────
  {
    week: 4,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: ML,  miles: 8,  description: '' },
      { type: ML,  miles: 9,  description: '' },
      { type: LT,  miles: 7,  description: '4 miles at LT pace' },
      { type: REC, miles: 4,  description: '' },
      { type: REC, miles: 4,  description: '' },
      { type: LR,  miles: 12, description: '' },
    ],
  },
  // ─── WEEK 5 (cutback — repeats week 1) ───────────────────────────────────────
  {
    week: 5,
    days: [
      { type: R,   miles: 0, description: 'Rest or cross-training' },
      { type: GA,  miles: 6, description: '6x10s hill sprints + 6x100m strides' },
      { type: ML,  miles: 7, description: '' },
      { type: REC, miles: 4, description: '' },
      { type: ML,  miles: 6, description: '' },
      { type: REC, miles: 4, description: '' },
      { type: HMP, miles: 7, mpMiles: 3, description: '3 miles at half-marathon pace' },
    ],
  },
  // ─── WEEK 6 ──────────────────────────────────────────────────────────────────
  {
    week: 6,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: REC, miles: 6,  description: 'AM: 4 miles · PM: 2 miles' },
      { type: V,   miles: 7,  description: '5x800m at 5K race pace' },
      { type: ML,  miles: 9,  description: '' },
      { type: GA,  miles: 6,  description: '' },
      { type: REC, miles: 4,  description: '' },
      { type: HMP, miles: 11, mpMiles: 6, description: '6 miles at half-marathon pace' },
    ],
  },
  // ─── WEEK 7 (peak week) ──────────────────────────────────────────────────────
  {
    week: 7,
    days: [
      { type: R,   miles: 0,  description: 'Rest or cross-training' },
      { type: GA,  miles: 6,  description: '8x100m strides' },
      { type: ML,  miles: 9,  description: '' },
      { type: LT,  miles: 8,  description: '5 miles at LT pace' },
      { type: REC, miles: 5,  description: '' },
      { type: REC, miles: 4,  description: '' },
      { type: LR,  miles: 14, description: '' },
    ],
  },
  // ─── WEEK 8 (race week) ──────────────────────────────────────────────────────
  {
    week: 8,
    days: [
      { type: R,   miles: 0,    description: 'Rest or cross-training' },
      { type: REC, miles: 8,    description: '' },
      { type: HMP, miles: 5,    mpMiles: 2, description: '2 miles at half-marathon pace (dress rehearsal)' },
      { type: REC, miles: 4,    description: '' },
      { type: REC, miles: 4,    description: '6x100m strides' },
      { type: REC, miles: 3,    description: '' },
      { type: TU,  miles: 13.1, description: 'RACE DAY' },
    ],
  },
];
