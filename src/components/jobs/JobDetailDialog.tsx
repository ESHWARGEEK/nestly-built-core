import type { Job } from "@/data/jobs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Props {
  job: Job | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const JobDetailDialog = ({ job, open, onOpenChange }: Props) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{job.title}</DialogTitle>
          <DialogDescription>
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-s2 text-sm text-foreground">
          <div className="flex flex-wrap gap-1">
            <span className="text-muted-foreground font-medium mr-1">Experience:</span>
            {job.experience === "Fresher" ? "Fresher" : `${job.experience} years`}
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="text-muted-foreground font-medium mr-1">Salary:</span>
            {job.salaryRange}
          </div>

          <div>
            <span className="text-muted-foreground font-medium block mb-1">Skills</span>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-xs font-normal">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-muted-foreground font-medium block mb-1">Description</span>
            <p className="whitespace-pre-line leading-relaxed text-foreground/90">
              {job.description}
            </p>
          </div>
        </div>

        <Button asChild className="mt-s2 w-full">
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            Apply Now <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailDialog;
