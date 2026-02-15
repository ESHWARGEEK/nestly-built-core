import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "jobTrackerProofLinks";

export interface ProofLinks {
  lovableLink: string;
  githubLink: string;
  deployedLink: string;
}

const STEPS = [
  "Preferences & Match Scoring",
  "Dashboard with Filters",
  "Save Jobs System",
  "Job Status Tracking",
  "Status Filter Integration",
  "Daily Digest Engine",
  "Test Checklist",
  "Proof & Submission",
] as const;

export function useProofSubmission(allTestsPassed: boolean) {
  const [links, setLinks] = useState<ProofLinks>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { lovableLink: "", githubLink: "", deployedLink: "" };
    } catch {
      return { lovableLink: "", githubLink: "", deployedLink: "" };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const updateLink = useCallback((key: keyof ProofLinks, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  }, []);

  const isValidUrl = (url: string) => {
    if (!url.trim()) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const allLinksValid =
    isValidUrl(links.lovableLink) &&
    isValidUrl(links.githubLink) &&
    isValidUrl(links.deployedLink);

  const canShip = allLinksValid && allTestsPassed;

  const shipStatus: "Not Started" | "In Progress" | "Shipped" = !allLinksValid && !allTestsPassed
    ? "Not Started"
    : canShip
    ? "Shipped"
    : "In Progress";

  const submissionText = `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovableLink}

GitHub Repository:
${links.githubLink}

Live Deployment:
${links.deployedLink}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;

  const copySubmission = useCallback(async () => {
    await navigator.clipboard.writeText(submissionText);
  }, [submissionText]);

  return {
    links,
    updateLink,
    isValidUrl,
    allLinksValid,
    canShip,
    shipStatus,
    copySubmission,
    steps: STEPS,
  };
}
