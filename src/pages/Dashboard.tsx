import { useState, useMemo } from "react";
import { jobs, type Job } from "@/data/jobs";
import FilterBar, { type Filters } from "@/components/jobs/FilterBar";
import JobCard from "@/components/jobs/JobCard";
import JobDetailDialog from "@/components/jobs/JobDetailDialog";
import { useSavedJobs } from "@/hooks/useSavedJobs";

const defaultFilters: Filters = {
  keyword: "",
  location: "all",
  mode: "all",
  experience: "all",
  source: "all",
  sort: "latest",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const { toggle, isSaved } = useSavedJobs();

  const filtered = useMemo(() => {
    let list = [...jobs];

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw),
      );
    }
    if (filters.location !== "all") list = list.filter((j) => j.location === filters.location);
    if (filters.mode !== "all") list = list.filter((j) => j.mode === filters.mode);
    if (filters.experience !== "all") list = list.filter((j) => j.experience === filters.experience);
    if (filters.source !== "all") list = list.filter((j) => j.source === filters.source);

    if (filters.sort === "latest") list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    else if (filters.sort === "oldest") list.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    else if (filters.sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [filters]);

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

      <FilterBar filters={filters} onChange={setFilters} />

      <div className="mt-s3 grid gap-s2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            saved={isSaved(job.id)}
            onToggleSave={toggle}
            onView={setViewJob}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-s5 text-center">
          <p className="font-serif text-xl text-foreground">No jobs match your filters.</p>
          <p className="mt-s1 text-sm text-muted-foreground">
            Try broadening your search criteria.
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
