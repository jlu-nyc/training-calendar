import { PLAN as CLASSIC_PLAN } from './plan';
import { PLAN as THRESHOLD_PLAN } from './plan-threshhold';
import { PLAN as HALF_PLAN } from './plan-half';
import { PLAN as MILE_PLAN } from './plan-mile';

export const PLANS = {
  classic: {
    key: 'classic',
    name: 'Classic',
    subtitle: '12 wks · GA + VO2max focus',
    plan: CLASSIC_PLAN,
  },
  threshold: {
    key: 'threshold',
    name: 'Threshold',
    subtitle: '12 wks · LT emphasis',
    plan: THRESHOLD_PLAN,
  },
  half: {
    key: 'half',
    name: 'Half',
    subtitle: '8 wks · GA + VO2max focus',
    plan: HALF_PLAN,
  },
  mile: {
    key: 'mile',
    name: 'Mile',
    subtitle: '6 wks · VO2max focus',
    plan: MILE_PLAN,
  },
};
