import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../data/storage';
import { derivePaces, DEFAULT_GOAL_SECONDS } from '../data/paces';

// Single source of truth for the goal marathon time and the paces derived from
// it. The goal persists across sessions via the shared storage module.
const PacesContext = createContext(null);

export function PacesProvider({ children }) {
  const [goalSeconds, setGoalSeconds] = useState(DEFAULT_GOAL_SECONDS);

  useEffect(() => {
    let active = true;
    storage.getGoalSeconds().then((n) => {
      if (active && n != null) setGoalSeconds(n);
    });
    return () => {
      active = false;
    };
  }, []);

  const setGoal = (seconds) => {
    setGoalSeconds(seconds);
    storage.setGoalSeconds(seconds);
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
