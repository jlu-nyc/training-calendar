import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { derivePaces, DEFAULT_GOAL_SECONDS } from '../data/paces';

// Single source of truth for the goal marathon time and the paces derived from
// it. The goal persists across sessions (AsyncStorage -> localStorage on web).
const GOAL_KEY = 'goalMarathonSeconds';

const PacesContext = createContext(null);

export function PacesProvider({ children }) {
  const [goalSeconds, setGoalSeconds] = useState(DEFAULT_GOAL_SECONDS);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(GOAL_KEY)
      .then((saved) => {
        const n = parseInt(saved, 10);
        if (active && !Number.isNaN(n)) setGoalSeconds(n);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const setGoal = (seconds) => {
    setGoalSeconds(seconds);
    AsyncStorage.setItem(GOAL_KEY, String(seconds)).catch(() => {});
  };

  const value = {
    goalSeconds,
    setGoal,
    paces: derivePaces(goalSeconds),
  };

  return <PacesContext.Provider value={value}>{children}</PacesContext.Provider>;
}

export function usePaces() {
  const ctx = useContext(PacesContext);
  if (!ctx) throw new Error('usePaces must be used within a PacesProvider');
  return ctx;
}
