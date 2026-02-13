import { Bookmark } from "lucide-react";

const Saved = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <Bookmark className="h-12 w-12 text-muted-foreground/40" />
      <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        No saved jobs yet.
      </h1>
      <p className="mt-s1 text-base text-muted-foreground text-prose">
        Jobs you save from the dashboard will appear here for quick access.
      </p>
    </main>
  );
};

export default Saved;
