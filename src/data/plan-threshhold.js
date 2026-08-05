// Threshold variant — the classic Pfitzinger 70 mpw skeleton (the 15ish-mile
// midweek medium-long runs, long runs, MP weeks, tune-up races), with the
// quality emphasis shifted to lactate-threshold work. LT progression runs in
// weeks 2, 4, 6, 7, 8, 9, 10, and 11 (taper). No full rest day — Mondays are a short
// recovery run, and mileage is spread so peak weeks still cap at ~70.
import { WORKOUT_TYPES } from './plan';

const R   = WORKOUT_TYPES.REST;
const REC = WORKOUT_TYPES.RECOVERY;
const GA  = WORKOUT_TYPES.GENERAL_AEROBIC;
const ML  = WORKOUT_TYPES.MEDIUM_LONG;
const LR  = WORKOUT_TYPES.LONG;
const LT  = WORKOUT_TYPES.LACTATE_THRESHOLD;
const V   = WORKOUT_TYPES.VO2MAX;
const MP  = WORKOUT_TYPES.MARATHON_PACE;
const TU  = WORKOUT_TYPES.TUNE_UP;

export const PLAN = [
  // ─── WEEK 1 · 60 mi ──────────────────────────────────────────────────────────
  {
    week: 1,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: GA,  miles: 8,  description: '6x10s hill sprints + 8x100m strides' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 15, mpMiles: 8, description: '8 miles at marathon pace' },
    ],
  },
  // ─── WEEK 2 · 64 mi ──────────────────────────────────────────────────────────
  {
    week: 2,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: ML,  miles: 12, description: '' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: LT,  miles: 9,  description: '2x2 miles at LT pace (7:10–7:20), 2 min jog recovery' },
      { type: REC, miles: 5,  description: '' },
      { type: LR,  miles: 17, description: '' },
    ],
  },
  // ─── WEEK 3 · 67 mi ──────────────────────────────────────────────────────────
  {
    week: 3,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: GA,  miles: 9,  description: '6x10s hill sprints + 8x100m strides' },
      { type: ML,  miles: 14, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: ML,  miles: 12, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 17, mpMiles: 10, description: '10 miles at marathon pace' },
    ],
  },
  // ─── WEEK 4 · 71 mi ──────────────────────────────────────────────────────────
  {
    week: 4,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: ML,  miles: 13, description: '' },
      { type: ML,  miles: 15, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: LT,  miles: 10, description: '5 miles continuous at LT pace (7:10–7:20)' },
      { type: REC, miles: 5,  description: '' },
      { type: LR,  miles: 18, description: '' },
    ],
  },
  // ─── WEEK 5 · 60 mi ──────────────────────────────────────────────────────────
  {
    week: 5,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: GA,  miles: 8,  description: '6x10s hill sprints + 8x100m strides' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: ML,  miles: 11, description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 15, mpMiles: 8, description: '8 miles at marathon pace' },
    ],
  },
  // ─── WEEK 6 · 70 mi ──────────────────────────────────────────────────────────
  {
    week: 6,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: REC, miles: 8,  description: 'AM: 5 miles · PM: 3 miles' },
      { type: LT,  miles: 11, description: '3x2 miles at LT pace (7:10–7:20), 2 min jog recovery' },
      { type: ML,  miles: 15, description: '' },
      { type: GA,  miles: 8,  description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 18, mpMiles: 12, description: '12 miles at marathon pace' },
    ],
  },
  // ─── WEEK 7 · 70 mi ──────────────────────────────────────────────────────────
  {
    week: 7,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: GA,  miles: 6,  description: '10x100m strides' },
      { type: ML,  miles: 15, description: '' },
      { type: REC, miles: 6,  description: '' },
      { type: LT,  miles: 12, description: '4x1.5 miles at LT pace (7:10–7:20), 90s jog recovery' },
      { type: REC, miles: 5,  description: '' },
      { type: LR,  miles: 21, description: '' },
    ],
  },
  // ─── WEEK 8 · 69 mi ──────────────────────────────────────────────────────────
  {
    week: 8,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: V,   miles: 9,  description: '5x600m at 5K pace' },
      { type: ML,  miles: 15, description: '' },
      { type: REC, miles: 7,  description: '6x100m strides' },
      { type: REC, miles: 6,  description: '' },
      { type: LT,  miles: 9,  description: '5 miles at LT pace (7:10–7:20) — or an 8K–15K tune-up race if you find one' },
      { type: LR,  miles: 18, description: '' },
    ],
  },
  // ─── WEEK 9 · 70 mi ──────────────────────────────────────────────────────────
  {
    week: 9,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: REC, miles: 7,  description: 'AM: 4 miles · PM: 3 miles' },
      { type: LT,  miles: 11, description: '6 miles continuous at LT pace (7:10–7:20)' },
      { type: ML,  miles: 15, description: '' },
      { type: GA,  miles: 7,  description: '' },
      { type: REC, miles: 5,  description: '' },
      { type: MP,  miles: 20, mpMiles: 10, description: '20-mile long run — last 10 at marathon pace (7:45–7:50)' },
    ],
  },
  // ─── WEEK 10 · 61 mi ─────────────────────────────────────────────────────────
  {
    week: 10,
    days: [
      { type: REC, miles: 5,  description: 'Easy recovery' },
      { type: V,   miles: 8,  description: '5x600m at 5K pace' },
      { type: ML,  miles: 12, description: '' },
      { type: REC, miles: 6,  description: '6x100m strides' },
      { type: REC, miles: 5,  description: '' },
      { type: LT,  miles: 8,  description: '4 miles at LT pace (7:10–7:20) — or an 8K–10K tune-up race if you find one' },
      { type: LR,  miles: 17, description: '' },
    ],
  },
  // ─── WEEK 11 · 47 mi (taper begins) ──────────────────────────────────────────
  {
    week: 11,
    days: [
      { type: REC, miles: 4,  description: 'Easy recovery' },
      { type: GA,  miles: 8,  description: '10x100m strides' },
      { type: REC, miles: 4,  description: '' },
      { type: LT,  miles: 8,  description: '20–25 minutes at LT pace (7:10–7:20)' },
      { type: REC, miles: 5,  description: '' },
      { type: REC, miles: 5,  description: '10x100m strides' },
      { type: ML,  miles: 13, description: '' },
    ],
  },
  // ─── WEEK 12 · race week ─────────────────────────────────────────────────────
  {
    week: 12,
    days: [
      { type: REC, miles: 4,    description: 'Easy shakeout' },
      { type: REC, miles: 10,   description: '' },
      { type: MP,  miles: 7,    mpMiles: 2, description: '2 miles at marathon pace (dress rehearsal)' },
      { type: REC, miles: 5,    description: '' },
      { type: REC, miles: 5,    description: '6x100m strides' },
      { type: REC, miles: 4,    description: '' },
      { type: TU,  miles: 26.2, description: 'RACE DAY' },
    ],
  },
];
