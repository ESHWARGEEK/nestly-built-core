import { Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import type { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  job: Job;
  saved: boolean;
  onToggleSave: (id: number) => void;
  onView: (job: Job) => void;
}

function postedLabel(days: number) {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const sourceBg: Record<string, string> = {
  LinkedIn: "bg-[hsl(210,80%,94%)] text-[hsl(210,80%,30%)]",
  Naukri: "bg-[hsl(270,60%,93%)] text-[hsl(270,60%,30%)]",
  Indeed: "bg-[hsl(30,70%,92%)] text-[hsl(30,70%,30%)]",
};

const JobCard = ({ job, saved, onToggleSave, onView }: Props) => (
  <div className="rounded-lg border border-border bg-card p-s3 flex flex-col gap-s2 transition-system hover:border-primary/30">
    {/* Header row */}
    <div className="flex items-start justify-between gap-s2">
      <div className="min-w-0">
        <h3 className="font-serif text-lg font-semibold leading-tight text-foreground truncate">
          {job.title}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${sourceBg[job.source] ?? ""}`}
      >
        {job.source}
      </span>
    </div>

    {/* Meta */}
    <div className="flex flex-wrap items-center gap-x-s2 gap-y-1 text-sm text-muted-foreground">
      <span>{job.location} · {job.mode}</span>
      <span className="hidden sm:inline">·</span>
      <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
      <span className="hidden sm:inline">·</span>
      <span>{job.salaryRange}</span>
    </div>

    {/* Posted */}
    <p className="text-xs text-muted-foreground">{postedLabel(job.postedDaysAgo)}</p>

    {/* Actions */}
    <div className="mt-auto flex items-center gap-s1 pt-s1 border-t border-border">
      <Button variant="ghost" size="sm" onClick={() => onView(job)}>
        <Eye className="mr-1 h-3.5 w-3.5" /> View
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggleSave(job.id)}
        className={saved ? "text-primary" : ""}
      >
        {saved ? (
          <BookmarkCheck className="mr-1 h-3.5 w-3.5" />
        ) : (
          <Bookmark className="mr-1 h-3.5 w-3.5" />
        )}
        {saved ? "Saved" : "Save"}
      </Button>
      <Button variant="ghost" size="sm" asChild className="ml-auto">
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
          Apply <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>
      </Button>
    </div>
  </div>
);

export default JobCard;
