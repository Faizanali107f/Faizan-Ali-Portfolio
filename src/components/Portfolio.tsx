import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'The PartnerX',
    categories: ['WordPress', 'Custom Theme'],
    url: 'http://thepartnerx.com/',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    title: 'Different Calculators',
    categories: ['WordPress', 'Tools'],
    url: 'https://differentcalculators.com/',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
  },
  {
    title: 'Say Cheese Kids Dental',
    categories: ['Healthcare', 'Elementor'],
    url: 'https://www.saycheesekidsdental.com/',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  },
  {
    title: 'SN Builder',
    categories: ['Construction', 'WordPress'],
    url: 'http://snbuilder.com/',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
  },
  {
    title: 'Eagnatech AI',
    categories: ['Technology', 'AI'],
    url: 'http://eagnatech.ai/',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  },
  {
    title: 'Teeth and Gums',
    categories: ['Healthcare', 'Dental'],
    url: 'https://teethandgums.co/',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop',
  },
  {
    title: 'Team 99',
    categories: ['Sports', 'E-Commerce'],
    url: 'https://team99.pk/',
    image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=600&fit=crop',
  },
  {
    title: 'Padel Cafe',
    categories: ['Business', 'Elementor'],
    url: 'https://padelcafe.pk/',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm mb-4 block">
            Latest Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Featured WordPress <br />Projects & Websites
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent WordPress development projects including corporate websites, e-commerce platforms, and custom theme implementations.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-500 block"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* View Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <ExternalLink size={20} className="text-primary-foreground" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;