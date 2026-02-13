interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-s4 py-s5">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-s2 text-base text-muted-foreground">
        This section will be built in the next step.
      </p>
    </main>
  );
};

export default PlaceholderPage;
