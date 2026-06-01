export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900" />
      <div className="container-page relative py-16 text-center sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-200">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
