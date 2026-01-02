import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Instagram, Linkedin, Github } from 'lucide-react';
import profileImage from '@/assets/profile-image.png';

const roles = ['WordPress Developer', 'Web Developer', 'Theme Developer', 'Plugin Developer', 'WooCommerce Expert'];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(role.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-2xl" />

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <span className="text-primary font-semibold tracking-widest text-sm mb-4 block">
              I AM
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Faizan Ali, a Complete{' '}
              <span className="text-gradient block mt-2">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8">
              Expert <span className="text-primary">WordPress Developer</span> with 3.5+ years of experience 
              building high-performance websites, custom themes & plugins, and{' '}
              <span className="text-primary">WooCommerce</span> solutions. Specializing in Elementor, Divi, and page builders. Based in Lahore, Pakistan.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:shadow-lg transition-all duration-300"
              >
                Learn More
                <ArrowRight size={20} />
              </motion.a>
              
              <motion.a
                href="/Faizan_Ali_Resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Download CV
                <Download size={20} />
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <span className="text-muted-foreground text-sm mb-4 block">Find me on</span>
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://www.linkedin.com/in/faizan-ali-471877243/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="https://github.com/faizanali107"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Instagram size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              {/* Background Shape */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-[500px] bg-gradient-primary rounded-full blur-sm" />
              
              {/* Large Text Behind */}
              <div className="absolute right-0 top-1/3 text-7xl md:text-8xl font-display font-bold text-foreground/10 whitespace-nowrap">
                Developer
              </div>
              <div className="absolute right-0 top-1/2 text-5xl md:text-6xl font-display font-bold text-foreground/20 whitespace-nowrap">
                Developer
              </div>

              {/* Profile Image */}
              <div className="relative z-10">
                <img
                  src={profileImage}
                  alt="Faizan Ali - WordPress Developer"
                  className="w-full max-w-md mx-auto object-cover"
                />
              </div>

              {/* Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-10 left-10 w-28 h-28 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[10px] fill-muted-foreground tracking-widest">
                      <textPath href="#circlePath">
                        Best Work • Since 2022 • Best Work •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="w-8 h-8 border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;