// Training paces derived from a goal marathon time.
//
// Aerobic zones (recovery / easy / steady) are training efforts, so they're set
// as fixed offsets from marathon pace. Race-effort zones (threshold / 10K / 5K)
// are derived from race-equivalent performances using Riegel's formula
//   pace(D) = marathonPace * (D / marathonDistance) ^ 0.06
// which scales more realistically across abilities than a flat offset would.

export const DEFAULT_GOAL_SECONDS = 3 * 3600 + 25 * 60; // 3:25:00

const MARATHON_MILES = 26.2188;
const DIST = {
  fiveK: 3.10686,
  tenK: 6.21371,
  fifteenK: 9.32057,
  half: 13.10940,
};

// seconds/mile -> "M:SS"
function pace(sec) {
  const s = Math.round(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

// total seconds -> "H:MM:SS"
export function formatGoalTime(totalSec) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = Math.round(totalSec % 60);
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function derivePaces(goalSeconds) {
  const mp = goalSeconds / MARATHON_MILES; // marathon pace, sec/mile
  const raceEquiv = (miles) => mp * Math.pow(miles / MARATHON_MILES, 0.06);

  const p5 = raceEquiv(DIST.fiveK);
  const p10 = raceEquiv(DIST.tenK);
  const p15 = raceEquiv(DIST.fifteenK);
  const pHalf = raceEquiv(DIST.half);

  return {
    goalMarathonTime: formatGoalTime(Math.round(goalSeconds)),
    currentFitness: {
      thresholdPace: pace((p15 + pHalf) / 2),
      marathonPace: pace(mp),
    },
    trainingZones: {
      recovery: [pace(mp + 115), pace(mp + 175)],
      easy: [pace(mp + 60), pace(mp + 110)],
      steady: [pace(mp + 25), pace(mp + 45)],
      marathon: pace(mp),
      threshold: [pace(p15), pace(pHalf)],
      interval10K: [pace(p10 - 5), pace(p10 + 5)],
      interval5K: [pace(p5 - 5), pace(p5 + 5)],
      strides: 'Fast but relaxed (~mile pace)',
    },
  };
}

// Default-derived paces, for any consumer that doesn't have a user goal yet.
export const PACES = derivePaces(DEFAULT_GOAL_SECONDS);
