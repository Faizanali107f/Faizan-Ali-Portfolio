import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 40, suffix: '+', label: 'Completed Projects' },
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Happy Clients' },
  { value: 90, suffix: '+', label: 'Performance Score' },
];

const Counter = ({ to, suffix, active }: { to: number; suffix: string; active: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);
  return <>{n}{suffix}</>;
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="relative py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-6 md:p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-foreground group-hover:text-primary transition-colors">
                <Counter to={s.value} suffix={s.suffix} active={inView} />
              </div>
              <div className="text-[10px] md:text-xs font-mono-tech text-muted-foreground uppercase tracking-[0.2em]">
                {s.label}
              </div>
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;