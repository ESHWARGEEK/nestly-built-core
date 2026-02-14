import { useState } from "react";
import { Bookmark } from "lucide-react";
import { jobs, type Job } from "@/data/jobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailDialog from "@/components/jobs/JobDetailDialog";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useJobStatus } from "@/hooks/useJobStatus";

const Saved = () => {
  const { savedIds, toggle, isSaved } = useSavedJobs();
  const { getStatus, setStatus } = useJobStatus();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  if (savedJobs.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
        <Bookmark className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          No saved jobs yet.
        </h1>
        <p className="mt-s1 text-base text-muted-foreground text-prose">
          Jobs you save from the dashboard will appear here for quick access.
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 px-s4 py-s4">
      <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
        Saved Jobs
      </h1>
      <p className="mt-1 mb-s3 text-sm text-muted-foreground">
        {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
      </p>

      <div className="grid gap-s2 sm:grid-cols-2 lg:grid-cols-3">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            saved={isSaved(job.id)}
            status={getStatus(job.id)}
            onToggleSave={toggle}
            onView={setViewJob}
            onStatusChange={setStatus}
          />
        ))}
      </div>

      <JobDetailDialog
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(v) => !v && setViewJob(null)}
      />
    </main>
  );
};

export default Saved;
