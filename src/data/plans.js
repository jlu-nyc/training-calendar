import { PLAN as CLASSIC_PLAN } from './plan';
import { PLAN as THRESHOLD_PLAN } from './plan-threshhold';

export const PLANS = {
  classic: {
    key: 'classic',
    name: 'Classic',
    subtitle: 'GA + VO2max focus',
    plan: CLASSIC_PLAN,
  },
  threshold: {
    key: 'threshold',
    name: 'Threshold',
    subtitle: 'LT emphasis',
    plan: THRESHOLD_PLAN,
  },
};
