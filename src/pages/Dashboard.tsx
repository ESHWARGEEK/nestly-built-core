import { Briefcase } from "lucide-react";

const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <Briefcase className="h-12 w-12 text-muted-foreground/40" />
      <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        No jobs yet.
      </h1>
      <p className="mt-s1 text-base text-muted-foreground text-prose">
        In the next step, you will load a realistic dataset.
      </p>
    </main>
  );
};

export default Dashboard;
