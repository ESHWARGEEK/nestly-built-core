import { ClipboardCheck } from "lucide-react";

const Proof = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <ClipboardCheck className="h-12 w-12 text-muted-foreground/40" />
      <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        Proof of Work
      </h1>
      <p className="mt-s1 text-base text-muted-foreground text-prose">
        Artifacts and verification for each build step will be collected here.
      </p>
    </main>
  );
};

export default Proof;
