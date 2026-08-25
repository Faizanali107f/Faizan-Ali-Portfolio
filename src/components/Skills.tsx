import { motion } from 'framer-motion';
import { Code2, Layers, Wrench, Globe, Shield, Search } from 'lucide-react';

const groups = [
  {
    icon: Code2,
    title: 'Languages',
    items: ['PHP', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'MySQL'],
  },
  {
    icon: Layers,
    title: 'CMS & Builders',
    items: ['WordPress', 'Elementor', 'WPBakery', 'Gutenberg', 'Shopify', 'WooCommerce'],
  },
  {
    icon: Globe,
    title: 'Backend & Integrations',
    items: ['REST APIs', 'Liquid', 'Payment Gateways', 'ACF', 'Custom Post Types'],
  },
  {
    icon: Shield,
    title: 'Performance & Security',
    items: ['Core Web Vitals', 'Caching', 'Asset Optimization', 'Security Hardening'],
  },
  {
    icon: Search,
    title: 'SEO',
    items: ['Technical SEO', 'Google Search Console', 'On-Page SEO', 'Schema Markup'],
  },
  {
    icon: Wrench,
    title: 'Tools & Ops',
    items: ['Git', 'cPanel', 'SSH', 'Staging', 'Backups', 'Figma'],
  },
];


const Skills = () => {
  return (
    <section id="skills" className="relative py-16 sm:py-20 md:py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-8 sm:mb-10 md:mb-14">
          <span className="text-xs font-mono-tech text-primary tracking-[0.3em] uppercase mb-4 block">/ Toolkit</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            The stack behind the work
          </h2>
          <p className="text-muted-foreground text-lg">
            Languages, frameworks and tools I reach for daily to ship performant, maintainable products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-primary">
                  <g.icon size={18} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/[0.06] transition-all font-mono-tech"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;