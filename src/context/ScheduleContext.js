import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../data/storage';

// Per-week day-order overrides let the user rearrange which workout falls on
// which day within a week (e.g. swap Saturday and Sunday). An order is a
// permutation of [0..6]: order[slot] = the original plan-day index whose workout
// now sits on that weekday slot. No override means the identity order (the plan
// as written). The base plan is never mutated, so "reset week" is trivial.
const ScheduleContext = createContext(null);
const IDENTITY = [0, 1, 2, 3, 4, 5, 6];

export function ScheduleProvider({ children }) {
  // { [planKey]: { [week]: number[] } }
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    let active = true;
    storage.getWeekOverrides().then((o) => {
      if (active) setOverrides(o || {});
    });
    return () => {
      active = false;
    };
  }, []);

  const getWeekOrder = (planKey, week) =>
    overrides?.[planKey]?.[week] || IDENTITY;

  const hasOverride = (planKey, week) => Boolean(overrides?.[planKey]?.[week]);

  const persist = (next) => {
    setOverrides(next);
    storage.setWeekOverrides(next);
  };

  const swapDays = (planKey, week, slotA, slotB) => {
    const order = [...getWeekOrder(planKey, week)];
    [order[slotA], order[slotB]] = [order[slotB], order[slotA]];

    const next = { ...overrides, [planKey]: { ...(overrides[planKey] || {}) } };
    if (order.every((v, i) => v === i)) {
      // back to plan order — drop the override entirely
      delete next[planKey][week];
    } else {
      next[planKey][week] = order;
    }
    persist(next);
  };

  const resetWeek = (planKey, week) => {
    if (!overrides?.[planKey]?.[week]) return;
    const next = { ...overrides, [planKey]: { ...overrides[planKey] } };
    delete next[planKey][week];
    persist(next);
  };

  const value = { getWeekOrder, hasOverride, swapDays, resetWeek };
  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule must be used within a ScheduleProvider');
  return ctx;
}
