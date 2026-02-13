import { ReactNode } from "react";

interface WorkspaceLayoutProps {
  primary: ReactNode;
  secondary: ReactNode;
}

const WorkspaceLayout = ({ primary, secondary }: WorkspaceLayoutProps) => {
  return (
    <div className="flex flex-1 flex-col lg:flex-row gap-0 lg:gap-0">
      <main className="flex-1 lg:w-[70%] border-b lg:border-b-0 lg:border-r p-s4">
        {primary}
      </main>
      <aside className="lg:w-[30%] p-s4">
        {secondary}
      </aside>
    </div>
  );
};

export default WorkspaceLayout;
