import { useState, useCallback, useEffect } from "react";

export interface TestItem {
  id: string;
  label: string;
  hint: string;
}

export const TEST_ITEMS: TestItem[] = [
  { id: "pref-persist", label: "Preferences persist after refresh", hint: "Set preferences in /settings, refresh the page, and confirm they remain." },
  { id: "match-score", label: "Match score calculates correctly", hint: "Set keywords matching a job title and verify the score badge updates." },
  { id: "show-matches", label: '"Show only matches" toggle works', hint: "Enable the toggle on /dashboard and confirm low-score jobs are hidden." },
  { id: "save-persist", label: "Save job persists after refresh", hint: "Save a job, refresh the page, and check /saved." },
  { id: "apply-tab", label: "Apply opens in new tab", hint: "Click Apply on a job card and confirm it opens in a new browser tab." },
  { id: "status-persist", label: "Status update persists after refresh", hint: "Change a job status, refresh, and confirm it stays." },
  { id: "status-filter", label: "Status filter works correctly", hint: "Filter by 'Applied' on /dashboard and confirm only matching jobs show." },
  { id: "digest-top10", label: "Digest generates top 10 by score", hint: "Generate a digest and verify it contains the top 10 scored jobs." },
  { id: "digest-persist", label: "Digest persists for the day", hint: "Generate a digest, refresh, and confirm it loads without regenerating." },
  { id: "no-errors", label: "No console errors on main pages", hint: "Open browser console and navigate through all pages." },
];

const STORAGE_KEY = "jobTrackerTestChecklist";

export function useTestChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const reset = useCallback(() => {
    setChecked({});
  }, []);

  const passed = TEST_ITEMS.filter((t) => checked[t.id]).length;
  const allPassed = passed === TEST_ITEMS.length;

  return { checked, toggle, reset, passed, total: TEST_ITEMS.length, allPassed };
}
