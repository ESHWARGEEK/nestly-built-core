import { useState, useCallback } from "react";

export interface Preferences {
  roleKeywords: string;
  preferredLocations: string[];
  preferredModes: string[];
  experienceLevel: string;
  skills: string;
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

const defaultPreferences: Preferences = {
  roleKeywords: "",
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};

function readPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultPreferences;
  }
}

export function usePreferences() {
  const [preferences, setPreferencesState] = useState<Preferences>(readPreferences);

  const save = useCallback((prefs: Preferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferencesState(prefs);
  }, []);

  const hasPreferences = Boolean(
    preferences.roleKeywords ||
    preferences.preferredLocations.length > 0 ||
    preferences.preferredModes.length > 0 ||
    preferences.experienceLevel ||
    preferences.skills
  );

  return { preferences, save, hasPreferences };
}

export { defaultPreferences };
