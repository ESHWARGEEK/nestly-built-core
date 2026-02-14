import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export const JOB_STATUSES: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

export interface StatusChange {
  jobId: number;
  jobTitle: string;
  company: string;
  status: JobStatus;
  date: string; // ISO string
}

const STATUS_KEY = "jobTrackerStatus";
const CHANGES_KEY = "jobTrackerStatusChanges";

function loadStatuses(): Record<number, JobStatus> {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadChanges(): StatusChange[] {
  try {
    const raw = localStorage.getItem(CHANGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<number, JobStatus>>(loadStatuses);
  const [changes, setChanges] = useState<StatusChange[]>(loadChanges);

  const getStatus = useCallback(
    (jobId: number): JobStatus => statuses[jobId] ?? "Not Applied",
    [statuses]
  );

  const setStatus = useCallback(
    (jobId: number, status: JobStatus, jobTitle: string, company: string) => {
      setStatuses((prev) => {
        const next = { ...prev, [jobId]: status };
        localStorage.setItem(STATUS_KEY, JSON.stringify(next));
        return next;
      });

      if (status !== "Not Applied") {
        const change: StatusChange = {
          jobId,
          jobTitle,
          company,
          status,
          date: new Date().toISOString(),
        };
        setChanges((prev) => {
          const next = [change, ...prev].slice(0, 50); // keep last 50
          localStorage.setItem(CHANGES_KEY, JSON.stringify(next));
          return next;
        });

        toast({
          title: `Status updated: ${status}`,
          description: `${jobTitle} — ${company}`,
        });
      }
    },
    []
  );

  return { getStatus, setStatus, changes };
}
