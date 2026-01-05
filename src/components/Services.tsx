import { motion } from 'framer-motion';
import { Globe, Paintbrush, ShoppingCart, Puzzle, LayoutGrid, Rocket, MessageCircle, FileCode, Figma, Code, Database, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Paintbrush,
    title: 'Website Design & Development',
    description: 'Creating stunning, responsive websites from scratch with modern design principles, UX best practices, and pixel-perfect attention to detail',
  },
  {
    icon: Globe,
    title: 'WordPress Development',
    description: 'Building and customizing high-performance WordPress websites tailored to client needs with responsive design and cross-browser compatibility',
  },
  {
    icon: ShoppingCart,
    title: 'WooCommerce & Shopify Development',
    description: 'Expert e-commerce solutions with WooCommerce and Shopify, including payment gateways, inventory management, and custom storefronts',
  },
  {
    icon: LayoutGrid,
    title: 'E-Commerce Store Development',
    description: 'Complete online store solutions with product catalogs, shopping carts, secure checkout, and seamless customer experiences',
  },
  {
    icon: FileCode,
    title: 'Theme Development',
    description: 'Creating custom WordPress themes from scratch or converting PSD, Figma, and XD designs to fully functional, responsive websites',
  },
  {
    icon: Puzzle,
    title: 'Plugin Development',
    description: 'Developing custom WordPress plugins and integrating REST APIs to extend functionality and meet specific business requirements',
  },
  {
    icon: Code,
    title: 'Custom Web Applications',
    description: 'Building tailored web applications with PHP, JavaScript, and modern frameworks to solve unique business challenges',
  },
  {
    icon: Rocket,
    title: 'Website Speed & Performance Optimization',
    description: 'Optimizing website loading speed, Core Web Vitals, caching, image optimization, and server performance for better user experience',
  },
  {
    icon: Database,
    title: 'SEO & Analytics Integration',
    description: 'Implementing SEO best practices, Google Analytics, Search Console integration, and data-driven insights for improved visibility',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance & Support',
    description: 'Regular updates, backups, security monitoring, troubleshooting, and ongoing support to keep your website running smoothly',
  },
];

const Services = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/923244972277?text=Hi%20Faizan,%20I%20am%20interested%20in%20your%20services.', '_blank');
  };

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 group flex flex-col"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                    <IconComponent size={28} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={handleWhatsApp}
                    size="sm"
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={handleContact}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary/50 hover:bg-primary/10"
                  >
                    Contact
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;