import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5 text-center">
      <h1 className="font-serif text-5xl md:text-6xl font-semibold tracking-tight text-foreground max-w-2xl">
        Stop Missing The Right Jobs.
      </h1>
      <p className="mt-s3 text-lg text-muted-foreground text-prose">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button
        size="lg"
        className="mt-s4"
        onClick={() => navigate("/settings")}
      >
        Start Tracking
      </Button>
    </main>
  );
};

export default Index;
