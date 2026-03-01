const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Happy Clients" },
  { value: "30+", label: "Projects Completed" },
  { value: "5+", label: "Technologies" },
];

export function StatsSection() {
  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl border border-border/50 bg-secondary/30"
            >
              <p className="text-4xl md:text-5xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
