import { useState } from "react";
import { Check } from "lucide-react";

interface ProofItem {
  id: string;
  label: string;
}

interface ProofFooterProps {
  items: ProofItem[];
}

const ProofFooter = ({ items }: ProofFooterProps) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const completed = Object.values(checked).filter(Boolean).length;

  return (
    <footer className="border-t px-s4 py-s3">
      <div className="flex items-center justify-between mb-s2">
        <span className="text-sm font-medium text-foreground">
          Proof of Completion
        </span>
        <span className="text-xs text-muted-foreground">
          {completed} / {items.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-s2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`
              inline-flex items-center gap-s1 rounded-lg border px-s2 py-1.5 text-sm transition-system
              ${checked[item.id]
                ? "border-success/40 bg-success/10 text-success"
                : "border-border bg-background text-muted-foreground hover:bg-accent"
              }
            `}
          >
            <span
              className={`
                flex h-4 w-4 items-center justify-center rounded border transition-system
                ${checked[item.id]
                  ? "border-success bg-success text-success-foreground"
                  : "border-muted-foreground/40"
                }
              `}
            >
              {checked[item.id] && <Check className="h-3 w-3" />}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
