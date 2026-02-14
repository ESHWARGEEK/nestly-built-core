import type { Job } from "@/data/jobs";
import type { Preferences } from "@/hooks/usePreferences";

/**
 * Deterministic match score engine.
 *
 * +25  any roleKeyword in job.title (case-insensitive)
 * +15  any roleKeyword in job.description
 * +15  job.location in preferredLocations
 * +10  job.mode in preferredModes
 * +10  job.experience matches experienceLevel
 * +15  overlap between job.skills and user.skills (any match)
 * +5   postedDaysAgo <= 2
 * +5   source is LinkedIn
 *
 * Cap at 100.
 */
export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0;

  const keywords = prefs.roleKeywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

  const userSkills = prefs.skills
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // +25 roleKeyword in title
  if (keywords.length > 0) {
    const titleLower = job.title.toLowerCase();
    if (keywords.some((kw) => titleLower.includes(kw))) {
      score += 25;
    }
  }

  // +15 roleKeyword in description
  if (keywords.length > 0) {
    const descLower = job.description.toLowerCase();
    if (keywords.some((kw) => descLower.includes(kw))) {
      score += 15;
    }
  }

  // +15 location match
  if (
    prefs.preferredLocations.length > 0 &&
    prefs.preferredLocations.includes(job.location)
  ) {
    score += 15;
  }

  // +10 mode match
  if (
    prefs.preferredModes.length > 0 &&
    prefs.preferredModes.includes(job.mode)
  ) {
    score += 10;
  }

  // +10 experience match
  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  // +15 skills overlap
  if (userSkills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    if (userSkills.some((us) => jobSkillsLower.includes(us))) {
      score += 15;
    }
  }

  // +5 recent post
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 LinkedIn source
  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(score, 100);
}

export function scoreBadgeColor(score: number): string {
  if (score >= 80) return "bg-success text-success-foreground";
  if (score >= 60) return "bg-warning text-warning-foreground";
  if (score >= 40) return "bg-secondary text-secondary-foreground";
  return "bg-muted text-muted-foreground";
}
