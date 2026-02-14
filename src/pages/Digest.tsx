import { Mail, Copy, ExternalLink, Sparkles, SlidersHorizontal, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scoreBadgeColor } from "@/lib/matchScore";
import { useDigest } from "@/hooks/useDigest";
import { useJobStatus, type StatusChange } from "@/hooks/useJobStatus";
import { useToast } from "@/hooks/use-toast";

const statusColor: Record<string, string> = {
  Applied: "bg-[hsl(210,70%,92%)] text-[hsl(210,70%,30%)]",
  Rejected: "bg-[hsl(0,60%,92%)] text-[hsl(0,60%,35%)]",
  Selected: "bg-[hsl(140,40%,90%)] text-[hsl(140,40%,25%)]",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const Digest = () => {
  const { digest, generate, digestText, hasPreferences, today } = useDigest();
  const { changes } = useJobStatus();
  const { toast } = useToast();

  if (!hasPreferences) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
        <SlidersHorizontal className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          Set preferences first.
        </h1>
        <p className="mt-s1 text-base text-muted-foreground text-prose">
          Set preferences to generate a personalized digest.
        </p>
        <Button asChild className="mt-s3">
          <Link to="/settings">Go to Settings</Link>
        </Button>
      </main>
    );
  }

  const handleCopy = () => {
    if (!digest) return;
    navigator.clipboard.writeText(digestText(digest)).then(() => {
      toast({ title: "Copied!", description: "Digest copied to clipboard." });
    });
  };

  const handleEmail = () => {
    if (!digest) return;
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(digestText(digest));
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  if (!digest) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
        <Mail className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
          No digests yet.
        </h1>
        <p className="mt-s1 text-base text-muted-foreground text-prose">
          Your daily 9AM job digest history will be collected here.
        </p>
        <Button onClick={generate} className="mt-s3 gap-2">
          <Sparkles className="h-4 w-4" /> Generate Today's 9AM Digest (Simulated)
        </Button>
        <p className="mt-s2 text-xs text-muted-foreground italic">
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>
      </main>
    );
  }

  const allZero = digest.entries.every((e) => e.score === 0);

  return (
    <main className="flex-1 px-s4 py-s4">
      {/* Top actions */}
      <div className="mb-s3 flex flex-col gap-s2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Daily Digest
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{today}</p>
        </div>
        <div className="flex gap-s1">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy Digest
          </Button>
          <Button variant="outline" size="sm" onClick={handleEmail}>
            <Mail className="mr-1.5 h-3.5 w-3.5" /> Create Email Draft
          </Button>
        </div>
      </div>

      {/* Email-style card */}
      <Card className="mx-auto max-w-2xl border-border bg-card shadow-sm">
        <CardContent className="p-s4 sm:p-s5">
          <div className="border-b border-border pb-s3 text-center">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Top 10 Jobs For You — 9AM Digest
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{today}</p>
          </div>

          {allZero ? (
            <div className="py-s5 text-center">
              <p className="font-serif text-lg text-foreground">No matching roles today.</p>
              <p className="mt-s1 text-sm text-muted-foreground">Check again tomorrow.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {digest.entries.map((entry, i) => (
                <li key={entry.job.id} className="flex items-start gap-s2 py-s3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-s1">
                      <div className="min-w-0">
                        <p className="font-serif text-base font-semibold leading-tight text-foreground truncate">
                          {entry.job.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.job.company} · {entry.job.location}
                        </p>
                      </div>
                      <Badge className={`shrink-0 text-[11px] ${scoreBadgeColor(entry.score)}`}>
                        {entry.score}%
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {entry.job.experience === "Fresher" ? "Fresher" : `${entry.job.experience} yrs`}{" "}
                      · {entry.job.salaryRange}
                    </p>
                    <Button variant="link" size="sm" asChild className="mt-1 h-auto p-0 text-xs">
                      <a href={entry.job.applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Footer */}
          <div className="mt-s3 border-t border-border pt-s3 text-center">
            <p className="text-xs text-muted-foreground">
              This digest was generated based on your preferences.
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground/60 italic">
              Demo Mode: Daily 9AM trigger simulated manually.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Status Updates */}
      {changes.length > 0 && (
        <Card className="mx-auto mt-s3 max-w-2xl border-border bg-card shadow-sm">
          <CardContent className="p-s4">
            <div className="flex items-center gap-s1 mb-s3">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Recent Status Updates
              </h3>
            </div>
            <ul className="divide-y divide-border">
              {changes.slice(0, 10).map((c, i) => (
                <li key={`${c.jobId}-${i}`} className="flex items-center justify-between gap-s2 py-s2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.jobTitle}</p>
                    <p className="text-xs text-muted-foreground">{c.company} · {formatDate(c.date)}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusColor[c.status] ?? "bg-muted text-muted-foreground"}`}>
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Digest;
