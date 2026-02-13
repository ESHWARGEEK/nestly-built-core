import TopBar from "@/components/layout/TopBar";
import ContextHeader from "@/components/layout/ContextHeader";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import SecondaryPanel from "@/components/layout/SecondaryPanel";
import ProofFooter from "@/components/layout/ProofFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const proofItems = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deploy", label: "Deployed" },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={6}
        status="in-progress"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="Establish the visual language, component library, and interaction patterns that will unify your entire product."
      />

      <WorkspaceLayout
        primary={<PrimaryContent />}
        secondary={
          <SecondaryPanel
            stepTitle="What you're building"
            stepDescription="Set up your design tokens — colors, typography, spacing — and create the foundational components. Every element should feel like it belongs to one coherent system."
            promptText="Create a design system with off-white background (#F7F6F3), deep red accent (#8B0000), serif headings, clean sans-serif body text, and an 8px spacing scale."
          />
        }
      />

      <ProofFooter items={proofItems} />
    </div>
  );
};

const PrimaryContent = () => {
  return (
    <div className="space-y-s5">
      {/* Typography Showcase */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">Typography</h2>
        <div className="text-prose space-y-s2">
          <h1 className="font-serif text-4xl font-bold">Heading One</h1>
          <h2 className="font-serif text-3xl font-semibold">Heading Two</h2>
          <h3 className="font-serif text-2xl font-medium">Heading Three</h3>
          <h4 className="font-serif text-xl">Heading Four</h4>
          <p className="text-base leading-relaxed text-foreground">
            Body text at 16px with generous line-height. Every paragraph should feel
            comfortable to read. The maximum width is capped at 720px to maintain
            optimal readability across all viewports.
          </p>
          <p className="text-sm text-muted-foreground">
            Secondary text for captions, metadata, and supporting information.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-s2">
          <ColorSwatch label="Background" className="bg-background border" />
          <ColorSwatch label="Foreground" className="bg-foreground" light />
          <ColorSwatch label="Primary (Accent)" className="bg-primary" light />
          <ColorSwatch label="Muted" className="bg-muted border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-s2">
          <ColorSwatch label="Success" className="bg-success" light />
          <ColorSwatch label="Warning" className="bg-warning" />
          <ColorSwatch label="Card" className="bg-card border" />
          <ColorSwatch label="Border" className="bg-border" />
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-s2 items-center">
          <Button variant="default">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link Style</Button>
        </div>
        <div className="flex flex-wrap gap-s2 items-center">
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-s2 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Form Elements */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">Form Elements</h2>
        <div className="max-w-md space-y-s2">
          <div>
            <label className="text-sm font-medium mb-s1 block">Text Input</label>
            <Input placeholder="Enter project name…" />
          </div>
          <div>
            <label className="text-sm font-medium mb-s1 block">Textarea</label>
            <Textarea placeholder="Describe your approach…" rows={3} />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-s3">
          <div className="rounded-lg border bg-card p-s3 space-y-s1">
            <h3 className="font-serif text-lg font-semibold">Standard Card</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subtle border, no drop shadows, balanced padding. Content is
              organized and scannable.
            </p>
            <Button variant="secondary" size="sm" className="mt-s1">
              Learn More
            </Button>
          </div>
          <div className="rounded-lg border bg-card p-s3 space-y-s1">
            <h3 className="font-serif text-lg font-semibold">Information Card</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consistent with the rest of the system. Same radius, same
              spacing, same visual weight.
            </p>
            <Button variant="default" size="sm" className="mt-s1">
              Take Action
            </Button>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">Spacing Scale</h2>
        <div className="flex items-end gap-s2">
          {[
            { label: "8px", size: "w-s1 h-s1" },
            { label: "16px", size: "w-s2 h-s2" },
            { label: "24px", size: "w-s3 h-s3" },
            { label: "40px", size: "w-s4 h-s4" },
            { label: "64px", size: "w-s5 h-s5" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-s1">
              <div className={`${s.size} rounded bg-primary/20 border border-primary/30`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Error & Empty States */}
      <section className="space-y-s3">
        <h2 className="font-serif text-2xl font-semibold">States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-s3">
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-s3 space-y-s1">
            <h4 className="font-medium text-foreground">Build failed</h4>
            <p className="text-sm text-muted-foreground">
              The deployment could not complete. Check your environment variables
              and try again.
            </p>
            <Button variant="default" size="sm">
              Retry Build
            </Button>
          </div>
          <div className="rounded-lg border p-s3 space-y-s1">
            <h4 className="font-medium text-foreground">No screenshots yet</h4>
            <p className="text-sm text-muted-foreground">
              Upload a screenshot to document your progress and verify your
              implementation.
            </p>
            <Button variant="secondary" size="sm">
              Add Screenshot
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ColorSwatch = ({
  label,
  className,
  light = false,
}: {
  label: string;
  className: string;
  light?: boolean;
}) => (
  <div className="space-y-s1">
    <div className={`h-16 rounded-lg ${className}`} />
    <span className={`text-xs ${light ? "text-foreground" : "text-muted-foreground"}`}>
      {label}
    </span>
  </div>
);

export default Index;
