interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
}

const statusLabels: Record<TopBarProps["status"], string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "shipped": "Shipped",
};

const statusStyles: Record<TopBarProps["status"], string> = {
  "not-started": "bg-muted text-muted-foreground",
  "in-progress": "bg-warning/15 text-warning",
  "shipped": "bg-success/15 text-success",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b px-s4 h-14">
      <span className="font-serif text-lg font-semibold tracking-tight">
        {projectName}
      </span>

      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>

      <span
        className={`inline-flex items-center rounded-lg px-s2 py-1 text-xs font-medium ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
    </header>
  );
};

export default TopBar;
