import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Check, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  promptText: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, promptText }: SecondaryPanelProps) => {
  return (
    <div className="space-y-s3">
      <div>
        <h3 className="font-serif text-lg font-semibold">{stepTitle}</h3>
        <p className="mt-s1 text-sm text-muted-foreground leading-relaxed">
          {stepDescription}
        </p>
      </div>

      <div className="rounded-lg border bg-card p-s2">
        <p className="text-sm font-mono leading-relaxed text-foreground/80">
          {promptText}
        </p>
      </div>

      <div className="flex flex-wrap gap-s1">
        <Button variant="secondary" size="sm">
          <Copy className="mr-1.5" />
          Copy
        </Button>
        <Button variant="default" size="sm">
          <ExternalLink className="mr-1.5" />
          Build in Lovable
        </Button>
      </div>

      <div className="flex flex-wrap gap-s1 pt-s1 border-t">
        <Button variant="secondary" size="sm">
          <Check className="mr-1.5" />
          It Worked
        </Button>
        <Button variant="secondary" size="sm">
          <AlertCircle className="mr-1.5" />
          Error
        </Button>
        <Button variant="secondary" size="sm">
          <Camera className="mr-1.5" />
          Add Screenshot
        </Button>
      </div>
    </div>
  );
};

export default SecondaryPanel;
