import { Mail } from "lucide-react";

const Digest = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <Mail className="h-12 w-12 text-muted-foreground/40" />
      <h1 className="mt-s3 font-serif text-3xl font-semibold tracking-tight text-foreground">
        No digests yet.
      </h1>
      <p className="mt-s1 text-base text-muted-foreground text-prose">
        Your daily 9AM job digest history will be collected here.
      </p>
    </main>
  );
};

export default Digest;
