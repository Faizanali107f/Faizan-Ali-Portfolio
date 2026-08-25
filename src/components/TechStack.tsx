const stack = ['WordPress', 'PHP', 'JavaScript', 'TypeScript', 'Vue.js', 'NestJS', 'React', 'Elementor', 'WooCommerce', 'Git', 'MySQL', 'Tailwind CSS'];

const TechStack = () => {
  const row = [...stack, ...stack];
  return (
    <section className="relative py-16 overflow-hidden border-y border-white/[0.06] bg-white/[0.01]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-3 text-2xl md:text-4xl font-bold tracking-tight text-muted-foreground/40 hover:text-foreground transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;