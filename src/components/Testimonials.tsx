import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, Verified, Calendar } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    company: 'TechStart Inc.',
    date: 'March 2024',
    platform: 'Google',
    verified: true,
    content: 'Faizan delivered an exceptional WordPress website that exceeded our expectations. His attention to detail and understanding of our brand was remarkable. The site is fast, beautiful, and converts visitors into customers. Would definitely recommend!',
    rating: 5,
    project: 'Corporate Website Development'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, Digital Solutions',
    company: 'Digital Solutions',
    date: 'February 2024',
    platform: 'LinkedIn',
    verified: true,
    content: 'Working with Faizan was a game-changer for our business. He transformed our outdated website into a modern, responsive platform. His expertise in WordPress and custom themes is truly impressive. Great communication throughout.',
    rating: 5,
    project: 'Website Redesign & Custom Theme'
  },
  {
    id: 3,
    name: 'Emily Roberts',
    role: 'Marketing Director, HealthPlus',
    company: 'HealthPlus Clinic',
    date: 'January 2024',
    platform: 'Google',
    verified: true,
    content: 'Faizan created a stunning healthcare website for us with perfect SEO optimization. Our organic traffic increased by 200% within three months. Highly recommended for any WordPress project! Professional and reliable.',
    rating: 5,
    project: 'Healthcare Website & SEO'
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Owner, SportGear Pro',
    company: 'SportGear Pro',
    date: 'December 2023',
    platform: 'Facebook',
    verified: true,
    content: 'The e-commerce site Faizan built for us handles thousands of products seamlessly. His WooCommerce expertise and custom functionality development made our online store a success. Very satisfied with the results!',
    rating: 5,
    project: 'E-commerce Platform Development'
  },
  {
    id: 5,
    name: 'Amanda Foster',
    role: 'Director, Creative Agency',
    company: 'Pixel Perfect Agency',
    date: 'November 2023',
    platform: 'LinkedIn',
    verified: true,
    content: 'We\'ve collaborated with Faizan on multiple client projects. His WordPress skills and problem-solving abilities are outstanding. Always delivers on time and exceeds expectations. A true professional.',
    rating: 5,
    project: 'Multiple Client Websites'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
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

  const currentTestimonial = testimonials[currentIndex];

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

        {/* Reviews Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Side Reviews - Desktop Only */}
            {testimonials.slice(currentIndex + 1, currentIndex + 3).map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="hidden lg:block bg-gradient-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => {
                  setDirection(1);
                  setCurrentIndex(testimonials.findIndex(t => t.id === testimonial.id));
                }}
              >
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded ${getPlatformColor(testimonial.platform)} flex items-center justify-center text-white text-xs font-bold`}>
                      {getPlatformIcon(testimonial.platform)}
                    </div>
                    <span className="text-xs text-muted-foreground">{testimonial.platform}</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} />
                    {testimonial.date}
                  </span>
                </div>

                {/* Review Content */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">
                  {testimonial.content}
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Verified size={12} className="text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Review Card */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="bg-gradient-card border-2 border-primary/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full"
                  >
                    {/* Platform Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${getPlatformColor(currentTestimonial.platform)} flex items-center justify-center text-white font-bold`}>
                          {getPlatformIcon(currentTestimonial.platform)}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{currentTestimonial.platform}</span>
                          {currentTestimonial.verified && (
                            <div className="flex items-center gap-1 text-xs text-primary">
                              <Verified size={12} />
                              <span>Verified Review</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        {currentTestimonial.date}
                      </span>
                    </div>

                    {/* Project Tag */}
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                      {currentTestimonial.project}
                    </div>

                    {/* Quote Icon */}
                    <div className="flex justify-start mb-4">
                      <Quote className="w-8 h-8 text-primary/30" />
                    </div>

                    {/* Testimonial Content */}
                    <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                      {currentTestimonial.content}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex gap-0.5">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({currentTestimonial.rating}.0)</span>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-semibold text-foreground text-lg">
                              {currentTestimonial.name}
                            </h3>
                            {currentTestimonial.verified && (
                              <Verified size={16} className="text-primary" />
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{currentTestimonial.role}</p>
                          <p className="text-muted-foreground/70 text-xs">{currentTestimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* All Reviews Link */}
            <div className="text-center mt-8">
              <a
                href="https://www.google.com/search?q=Faizan+Ali+WordPress+Developer+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Star size={14} />
                See all reviews on Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;