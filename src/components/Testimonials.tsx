import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Verified, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'Trends Mall',
    platform: 'Google',
    verified: true,
    content: 'Faizan delivered an exceptional WordPress WooCommerce website for our fashion e-commerce store. His attention to detail and understanding of our brand was remarkable. The site is fast, beautiful, and converts visitors into customers.',
    rating: 5,
    project: 'Fashion E-commerce Platform',
    industry: 'Fashion & Retail'
  },
  {
    id: 2,
    name: 'Robert Williams',
    role: 'Director',
    company: 'RT Centre',
    platform: 'LinkedIn',
    verified: true,
    content: 'Working with Faizan was a game-changer for our security training center. He transformed our outdated website into a modern, responsive platform. His expertise in WordPress and education-focused design is truly impressive.',
    rating: 5,
    project: 'Education & Security Training Website',
    industry: 'Education & Training'
  },
  {
    id: 3,
    name: 'Emily Roberts',
    role: 'Marketing Director',
    company: 'Cathy Trenary Therapy',
    platform: 'Google',
    verified: true,
    content: 'Faizan created a stunning healthcare website for our therapy practice with perfect SEO optimization. Our organic traffic increased by 200% within three months. Highly recommended for any WordPress project!',
    rating: 5,
    project: 'Healthcare Therapy Website',
    industry: 'Healthcare'
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Different Calculators',
    platform: 'Facebook',
    verified: true,
    content: 'The calculator tools website Faizan built for us handles complex mathematical functions seamlessly. His JavaScript expertise and custom functionality development made our tools platform a success.',
    rating: 5,
    project: 'Interactive Calculator Tools Platform',
    industry: 'Tools & Utilities'
  },
  {
    id: 5,
    name: 'Amanda Foster',
    role: 'Practice Manager',
    company: 'Say Cheese Kids Dental',
    platform: 'Google',
    verified: true,
    content: 'We needed a kid-friendly website for our dental practice, and Faizan delivered exactly that. The parents and children both love the design. Great communication throughout the project and excellent SEO results.',
    rating: 5,
    project: 'Pediatric Dental Practice Website',
    industry: 'Healthcare'
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Owner',
    company: 'SN Builder',
    platform: 'LinkedIn',
    verified: true,
    content: 'The construction company website Faizan built showcases our projects beautifully. His WordPress skills and attention to our industry needs made our online presence stand out from competitors. Very professional work!',
    rating: 5,
    project: 'Construction Company Website',
    industry: 'Construction'
  },
  {
    id: 7,
    name: 'Jennifer Martinez',
    role: 'Broker Owner',
    company: 'Team 99',
    platform: 'Google',
    verified: true,
    content: 'Our real estate agency needed a website that could handle property listings effectively. Faizan\'s WordPress expertise and custom development made our property search seamless. Highly recommend his services!',
    rating: 5,
    project: 'Real Estate Agency Website',
    industry: 'Real Estate'
  },
  {
    id: 8,
    name: 'Thomas Wilson',
    role: 'CTO',
    company: 'CloudFortix',
    platform: 'LinkedIn',
    verified: true,
    content: 'We\'ve collaborated with Faizan on multiple tech projects. His full-stack capabilities and problem-solving abilities are outstanding. Always delivers on time and exceeds expectations. A true professional.',
    rating: 5,
    project: 'Technology Solutions Platform',
    industry: 'Technology'
  }
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 4;
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Get current page testimonials
  const getCurrentPageTestimonials = () => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'Google':
        return 'G';
      case 'LinkedIn':
        return 'in';
      case 'Facebook':
        return 'f';
      default:
        return platform[0];
    }
  };

  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case 'Google':
        return 'bg-blue-500';
      case 'LinkedIn':
        return 'bg-blue-600';
      case 'Facebook':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all group"
    >
      {/* Platform Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded ${getPlatformColor(testimonial.platform)} flex items-center justify-center text-white text-xs font-bold`}>
            {getPlatformIcon(testimonial.platform)}
          </div>
          <span className="text-xs text-muted-foreground">{testimonial.platform}</span>
        </div>
        {testimonial.verified && (
          <div className="flex items-center gap-1 text-xs text-primary">
            <Verified size={12} />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Industry Tag */}
      <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
        {testimonial.industry}
      </div>

      {/* Review Content */}
      <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-4 min-h-[80px]">
        "{testimonial.content}"
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">({testimonial.rating}.0)</span>
      </div>

      {/* Project Type */}
      <div className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
        <ArrowRight size={12} className="text-primary" />
        {testimonial.project}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
          {testimonial.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
            {testimonial.verified && (
              <Verified size={12} className="text-primary" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm mb-4 block">
            Client Reviews
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Clients Say <br />About My Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from real clients. Here's what my clients have to say about their experience working with me.
          </p>
        </div>

        {/* Reviews Grid Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div ref={containerRef} className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {getCurrentPageTestimonials().map((testimonial, index) => (
                    <TestimonialCard
                      key={`${currentPage}-${testimonial.id}`}
                      testimonial={testimonial}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 z-10"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 z-10"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentPage ? 1 : -1);
                  setCurrentPage(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Page Info */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages} • {testimonials.length} Reviews
          </div>

          {/* All Reviews Link */}
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/search?q=Faizan+Ali+WordPress+Developer+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <Star size={14} className="group-hover:fill-primary transition-all" />
              See all reviews on Google
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;