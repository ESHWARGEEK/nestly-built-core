import {
  ClipboardCheck, RotateCcw, Info, Lock, CheckCircle2,
  Link as LinkIcon, Copy, ExternalLink, Circle,
} from "lucide-react";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/useTestChecklist";
import { useProofSubmission } from "@/hooks/useProofSubmission";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Proof = () => {
  const { checked, toggle, reset, passed, total, allPassed } = useTestChecklist();
  const {
    links, updateLink, isValidUrl, allLinksValid,
    canShip, shipStatus, copySubmission, steps,
  } = useProofSubmission(allPassed);

  const statusColor = shipStatus === "Shipped"
    ? "text-success"
    : shipStatus === "In Progress"
    ? "text-warning"
    : "text-muted-foreground";

  const handleCopy = async () => {
    await copySubmission();
    toast({ title: "Copied", description: "Final submission copied to clipboard." });
  };

  return (
    <main className="flex-1 px-s4 py-s5">
      <div className="mx-auto max-w-2xl space-y-s4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-s2 mb-s1">
            <ClipboardCheck className="h-7 w-7 text-primary" />
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              Proof &amp; Submission
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Project 1 — Job Notification Tracker
          </p>
        </div>

        {/* Ship Status Badge */}
        <div className="rounded-lg border bg-card p-s3 flex items-center justify-between">
          <div className="flex items-center gap-s2">
            {shipStatus === "Shipped" ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <Circle className={`h-5 w-5 ${statusColor}`} />
            )}
            <span className="text-sm font-medium text-foreground">
              Status: <span className={statusColor}>{shipStatus}</span>
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Tests {passed}/{total} · Links {allLinksValid ? "✓" : "pending"}
          </span>
        </div>

        {/* A) Step Completion Summary */}
        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground mb-s2">
            Step Completion Summary
          </h2>
          <div className="rounded-lg border bg-card divide-y">
            {steps.map((step, i) => {
              const done = i < 7 || canShip;
              return (
                <div key={i} className="flex items-center gap-s2 px-s3 py-s2">
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className="flex-1 text-sm text-foreground">
                    Step {i + 1}: {step}
                  </span>
                  <span className={`text-xs font-medium ${done ? "text-success" : "text-muted-foreground"}`}>
                    {done ? "Completed" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* B) Artifact Collection */}
        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground mb-s2">
            Artifact Collection
          </h2>
          <div className="rounded-lg border bg-card p-s3 space-y-s2">
            {([
              { key: "lovableLink" as const, label: "Lovable Project Link", placeholder: "https://lovable.dev/projects/..." },
              { key: "githubLink" as const, label: "GitHub Repository Link", placeholder: "https://github.com/..." },
              { key: "deployedLink" as const, label: "Deployed URL", placeholder: "https://your-app.vercel.app" },
            ]).map(({ key, label, placeholder }) => {
              const val = links[key];
              const valid = isValidUrl(val);
              const showError = val.trim().length > 0 && !valid;
              return (
                <div key={key}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                    <LinkIcon className="h-3 w-3" />
                    {label}
                  </label>
                  <div className="relative">
                    <Input
                      value={val}
                      onChange={(e) => updateLink(key, e.target.value)}
                      placeholder={placeholder}
                      className={showError ? "border-destructive" : valid ? "border-success" : ""}
                    />
                    {valid && (
                      <a
                        href={val}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-system"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  {showError && (
                    <p className="text-xs text-destructive mt-0.5">Enter a valid URL</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Test Checklist */}
        <section>
          <div className="flex items-center justify-between mb-s2">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Test Checklist
            </h2>
            <span className="text-sm text-muted-foreground">
              {passed} / {total} passed
            </span>
          </div>
          <div className="rounded-lg border bg-card divide-y">
            {TEST_ITEMS.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-s2 px-s3 py-s2 cursor-pointer transition-system hover:bg-accent/50"
              >
                <Checkbox
                  checked={!!checked[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                />
                <span
                  className={`flex-1 text-sm ${
                    checked[item.id] ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="p-0.5 text-muted-foreground/60 hover:text-foreground transition-system"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[240px] text-xs">
                    {item.hint}
                  </TooltipContent>
                </Tooltip>
              </label>
            ))}
          </div>
          <button
            onClick={reset}
            className="mt-s2 inline-flex items-center gap-s1 text-xs text-muted-foreground hover:text-foreground transition-system"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Test Status
          </button>
        </section>

        {/* Copy Submission */}
        <section>
          <button
            onClick={handleCopy}
            disabled={!canShip}
            className={`w-full rounded-lg border p-s3 flex items-center justify-center gap-s1 text-sm font-medium transition-system ${
              canShip
                ? "bg-foreground text-background hover:opacity-90 cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <Copy className="h-4 w-4" />
            Copy Final Submission
          </button>
          {!canShip && (
            <p className="text-xs text-muted-foreground text-center mt-s1">
              <Lock className="inline h-3 w-3 mr-0.5 -mt-0.5" />
              Provide all 3 links and pass all {total} tests to unlock.
            </p>
          )}
        </section>

        {/* Ship confirmation */}
        <div className="rounded-lg border border-dashed p-s3 text-center">
          {canShip ? (
            <p className="text-sm text-success font-medium">
              ✓ Project 1 Shipped Successfully.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              <Lock className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              Ship is locked until all conditions are met.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Proof;
