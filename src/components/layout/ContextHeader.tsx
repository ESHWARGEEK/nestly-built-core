interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-s4 py-s4 border-b">
      <h1 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        {headline}
      </h1>
      <p className="mt-s1 text-base text-muted-foreground text-prose">
        {subtext}
      </p>
    </section>
  );
};

export default ContextHeader;
