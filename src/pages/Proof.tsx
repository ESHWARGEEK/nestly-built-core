import { ClipboardCheck, RotateCcw, Info, Lock, CheckCircle2 } from "lucide-react";
import { useTestChecklist, TEST_ITEMS } from "@/hooks/useTestChecklist";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

const Proof = () => {
  const { checked, toggle, reset, passed, total, allPassed } = useTestChecklist();

  return (
    <main className="flex-1 px-s4 py-s5">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-s2 mb-s1">
          <ClipboardCheck className="h-7 w-7 text-primary" />
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Test Checklist
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-s4">
          Verify every feature before shipping. All items must pass.
        </p>

        {/* Summary */}
        <div className="rounded-lg border bg-card p-s3 mb-s3 flex items-center justify-between">
          <div className="flex items-center gap-s2">
            {allPassed ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <Lock className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              Tests Passed: {passed} / {total}
            </span>
          </div>
          {!allPassed && (
            <span className="text-xs text-warning font-medium">
              Resolve all issues before shipping.
            </span>
          )}
          {allPassed && (
            <span className="text-xs text-success font-medium">
              All tests passed — ready to ship.
            </span>
          )}
        </div>

        {/* Checklist */}
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
                  checked[item.id]
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
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

        {/* Reset */}
        <button
          onClick={reset}
          className="mt-s3 inline-flex items-center gap-s1 text-xs text-muted-foreground hover:text-foreground transition-system"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Test Status
        </button>

        {/* Ship lock notice */}
        <div className="mt-s4 rounded-lg border border-dashed p-s3 text-center">
          {allPassed ? (
            <p className="text-sm text-success font-medium">
              ✓ Ship gate unlocked. All checks verified.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              <Lock className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              Ship is locked until all {total} tests are checked.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Proof;
