import { motion } from 'framer-motion';
import { Palette, Code2, Layers, Megaphone, Monitor, PenTool } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'UI/Visual Design',
    percentage: 90,
    description: 'A personal portfolio is a curated collection of an individual\'s professional work, showcasing their skills',
  },
  {
    icon: Layers,
    title: 'Branding Design',
    percentage: 85,
    description: 'Creating memorable brand identities that resonate with your target audience and stand the test of time',
  },
  {
    icon: Code2,
    title: 'Web Development',
    percentage: 80,
    description: 'Building responsive, performant websites using modern technologies and best practices',
  },
  {
    icon: Monitor,
    title: 'App Development',
    percentage: 75,
    description: 'Developing intuitive mobile and web applications that deliver exceptional user experiences',
  },
  {
    icon: PenTool,
    title: 'UX Research',
    percentage: 88,
    description: 'Conducting thorough user research to inform design decisions and create user-centered products',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    percentage: 70,
    description: 'Strategic digital marketing solutions to increase visibility and drive meaningful engagement',
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
            Elevated Designs Personalized <br />the Best Experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Business consulting consultants provide expert advice and guidance to businesses to help them improve their performance, efficiency, and organizational growth.
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