import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Settings, SlidersHorizontal } from "lucide-react";
import { jobs, type Job } from "@/data/jobs";
import FilterBar, { type Filters } from "@/components/jobs/FilterBar";
import JobCard from "@/components/jobs/JobCard";
import JobDetailDialog from "@/components/jobs/JobDetailDialog";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { usePreferences } from "@/hooks/usePreferences";
import { useJobStatus } from "@/hooks/useJobStatus";
import { computeMatchScore } from "@/lib/matchScore";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
  status: "all",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [matchOnly, setMatchOnly] = useState(false);
  const { toggle, isSaved } = useSavedJobs();
  const { preferences, hasPreferences } = usePreferences();
  const { getStatus, setStatus } = useJobStatus();

  const scoredJobs = useMemo(() => {
    return jobs.map((job) => ({
      job,
      score: hasPreferences ? computeMatchScore(job, preferences) : undefined,
    }));
  }, [preferences, hasPreferences]);

  const filtered = useMemo(() => {
    let list = [...scoredJobs];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (item) =>
          item.job.title.toLowerCase().includes(kw) ||
          item.job.company.toLowerCase().includes(kw),
      );
    }
    if (filters.location !== "all") list = list.filter((item) => item.job.location === filters.location);
    if (filters.mode !== "all") list = list.filter((item) => item.job.mode === filters.mode);
    if (filters.experience !== "all") list = list.filter((item) => item.job.experience === filters.experience);
    if (filters.source !== "all") list = list.filter((item) => item.job.source === filters.source);
    if (filters.status !== "all") list = list.filter((item) => getStatus(item.job.id) === filters.status);

    if (matchOnly && hasPreferences) {
      list = list.filter((item) => (item.score ?? 0) >= preferences.minMatchScore);
    }

    if (filters.sort === "latest") list.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
    else if (filters.sort === "oldest") list.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
    else if (filters.sort === "match") list.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    else if (filters.sort === "az") list.sort((a, b) => a.job.title.localeCompare(b.job.title));

    return list;
  }, [filters, scoredJobs, matchOnly, hasPreferences, preferences.minMatchScore, getStatus]);

  return (
    <main className="flex-1 px-s4 py-s4">
      <div className="mb-s3">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Job Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} of {jobs.length} jobs
        </p>
      </div>

      {!hasPreferences && (
        <div className="mb-s3 flex items-center gap-s2 rounded-lg border border-border bg-card p-s2">
          <Settings className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            Set your preferences to activate intelligent matching.
          </p>
          <Button variant="outline" size="sm" asChild className="ml-auto shrink-0">
            <Link to="/settings">Go to Settings</Link>
          </Button>
        </div>
      )}

      <FilterBar filters={filters} onChange={setFilters} />

      {hasPreferences && (
        <div className="mt-s2 flex items-center gap-s2">
          <Switch
            id="match-toggle"
            checked={matchOnly}
            onCheckedChange={setMatchOnly}
          />
          <Label htmlFor="match-toggle" className="text-sm font-normal cursor-pointer">
            Show only jobs above my threshold ({preferences.minMatchScore}%)
          </Label>
        </div>
      )}

      <div className="mt-s3 grid gap-s2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <JobCard
            key={item.job.id}
            job={item.job}
            saved={isSaved(item.job.id)}
            matchScore={item.score}
            status={getStatus(item.job.id)}
            onToggleSave={toggle}
            onView={setViewJob}
            onStatusChange={setStatus}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-s5 text-center">
          <SlidersHorizontal className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-s2 font-serif text-xl text-foreground">
            No roles match your criteria.
          </p>
          <p className="mt-s1 text-sm text-muted-foreground">
            Adjust filters or lower your match threshold.
          </p>
        </div>
      )}

      <JobDetailDialog
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(v) => !v && setViewJob(null)}
      />
    </main>
  );
};

export default Dashboard;
