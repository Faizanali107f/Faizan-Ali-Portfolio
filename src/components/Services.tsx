import { motion } from 'framer-motion';
import { Palette, Code2, Layers, Megaphone, Monitor, PenTool } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'WordPress Development',
    percentage: 95,
    description: 'Building and customizing high-performance WordPress websites tailored to client needs with responsive design and cross-browser compatibility',
  },
  {
    icon: Layers,
    title: 'Theme Development',
    percentage: 90,
    description: 'Creating custom WordPress themes from scratch or converting PSD, Figma, and XD designs to fully functional WordPress sites',
  },
  {
    icon: Monitor,
    title: 'WooCommerce Solutions',
    percentage: 90,
    description: 'Integrating and customizing WooCommerce for complete e-commerce solutions with payment gateways and inventory management',
  },
  {
    icon: PenTool,
    title: 'Plugin Development',
    percentage: 85,
    description: 'Developing custom WordPress plugins and integrating REST APIs to extend functionality and meet specific requirements',
  },
  {
    icon: Palette,
    title: 'Page Builders',
    percentage: 95,
    description: 'Expert in Elementor, Divi, WPBakery, and Avada theme to create beautiful, responsive layouts quickly and efficiently',
  },
  {
    icon: Megaphone,
    title: 'SEO & Performance',
    percentage: 85,
    description: 'Site maintenance, speed optimization, security updates, and SEO best practices to improve visibility and performance',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm mb-4 block">
            My Expertise
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Professional WordPress <br />Development Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I provide expert WordPress development services to help businesses establish their online presence with high-quality, performant, and user-friendly websites.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 group"
            >
              {/* Icon & Percentage */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                  <service.icon size={28} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="text-right">
                  <span className="text-3xl font-display font-bold text-gradient">{service.percentage}%</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${service.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-primary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;