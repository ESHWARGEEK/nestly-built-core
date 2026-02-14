import { useState, useCallback } from "react";
import { jobs, type Job } from "@/data/jobs";
import { usePreferences } from "@/hooks/usePreferences";
import { computeMatchScore } from "@/lib/matchScore";

export interface DigestEntry {
  job: Job;
  score: number;
}

export interface Digest {
  date: string;
  entries: DigestEntry[];
  generatedAt: string;
}

function storageKey(date: string) {
  return `jobTrackerDigest_${date}`;
}

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function useDigest() {
  const { preferences, hasPreferences } = usePreferences();
  const today = todayStr();

  const loadExisting = useCallback((): Digest | null => {
    try {
      const raw = localStorage.getItem(storageKey(today));
      if (!raw) return null;
      return JSON.parse(raw) as Digest;
    } catch {
      return null;
    }
  }, [today]);

  const [digest, setDigest] = useState<Digest | null>(loadExisting);

  const generate = useCallback(() => {
    // Check if already exists
    const existing = loadExisting();
    if (existing) {
      setDigest(existing);
      return existing;
    }

    const scored = jobs
      .map((job) => ({ job, score: computeMatchScore(job, preferences) }))
      .sort((a, b) => b.score - a.score || a.job.postedDaysAgo - b.job.postedDaysAgo)
      .slice(0, 10);

    const newDigest: Digest = {
      date: today,
      entries: scored,
      generatedAt: new Date().toLocaleTimeString(),
    };

    localStorage.setItem(storageKey(today), JSON.stringify(newDigest));
    setDigest(newDigest);
    return newDigest;
  }, [today, preferences, loadExisting]);

  const digestText = useCallback((d: Digest) => {
    const lines = d.entries.map(
      (e, i) =>
        `${i + 1}. ${e.job.title} — ${e.job.company} (${e.job.location}, ${e.job.experience}) [${e.score}% match]\n   Apply: ${e.job.applyUrl}`
    );
    return `Top 10 Jobs For You — 9AM Digest (${d.date})\n\n${lines.join("\n\n")}\n\nGenerated based on your preferences.`;
  }, []);

  return { digest, generate, digestText, hasPreferences, today };
}
