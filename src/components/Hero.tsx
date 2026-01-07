import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Linkedin, Github, Facebook } from 'lucide-react';
import profileImage from '@/assets/faizan-nobg.png';

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
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center bg-[hsl(0,0%,6%)]">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,5%)] via-[hsl(0,0%,7%)] to-[hsl(340,80%,10%,0.4)]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-primary font-semibold tracking-[0.3em] text-sm mb-6 block"
            >
              I AM
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-[1.1]"
            >
              Faizan Ali, a Complete
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <span className="text-primary font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                {displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-10"
            >
              A personal <span className="text-primary">portfolio</span> is a collection of your work, that is achievements, and skills that highlights in your abilities and professional{' '}
              <span className="text-primary">web design</span> growth. It serves as
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-primary/30 hover:shadow-xl transition-all duration-300"
              >
                Learn More
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-14"
            >
              <span className="text-muted-foreground text-sm mb-5 block">Find me on</span>
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://www.instagram.com/its_faizan412/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary bg-background/5 backdrop-blur-sm transition-all duration-300"
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/faizan-ali-471877243/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary bg-background/5 backdrop-blur-sm transition-all duration-300"
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="https://github.com/faizanali107"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary bg-background/5 backdrop-blur-sm transition-all duration-300"
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-11 h-11 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary bg-background/5 backdrop-blur-sm transition-all duration-300"
                >
                  <Facebook size={18} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Pink/Magenta accent shape behind person */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[260px] md:w-[320px] lg:w-[380px] h-[350px] md:h-[450px] lg:h-[520px]">
                {/* Main blob shape */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(340,85%,35%)] via-[hsl(340,75%,40%)] to-[hsl(340,70%,50%)] rounded-t-[180px] rounded-b-[50px]" />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(340,85%,40%,0.6)] via-[hsl(340,75%,45%,0.4)] to-transparent rounded-t-[180px] rounded-b-[50px] blur-2xl -z-10" />
              </div>
              
              {/* Large "Creative" Text - Outline style */}
              <div className="absolute right-[-40px] md:right-[-60px] bottom-[180px] md:bottom-[220px] z-20 pointer-events-none select-none">
                <span 
                  className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-transparent whitespace-nowrap"
                  style={{ 
                    WebkitTextStroke: '1px hsl(var(--foreground) / 0.8)',
                    textShadow: '0 0 40px hsl(340 80% 50% / 0.3)'
                  }}
                >
                  Creative
                </span>
              </div>
              
              {/* Large "Developer" Text - Outline style with glow */}
              <div className="absolute right-[-40px] md:right-[-60px] bottom-[110px] md:bottom-[140px] z-20 pointer-events-none select-none">
                <span 
                  className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-transparent whitespace-nowrap"
                  style={{ 
                    WebkitTextStroke: '1px hsl(340 80% 50% / 0.8)',
                    textShadow: '0 0 30px hsl(340 80% 50% / 0.5), 0 0 60px hsl(340 80% 50% / 0.3)'
                  }}
                >
                  Developer
                </span>
              </div>

              {/* Profile Image */}
              <div className="relative z-10">
                <img
                  src={profileImage}
                  alt="Faizan Ali - WordPress Developer"
                  className="w-full max-w-[280px] md:max-w-[340px] lg:max-w-[400px] mx-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Rotating Badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-[60px] md:bottom-[80px] left-[-20px] md:left-[-10px] w-24 h-24 md:w-28 md:h-28 border border-dashed border-muted-foreground/40 rounded-full flex items-center justify-center bg-background/5 backdrop-blur-sm z-30"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[9px] fill-muted-foreground tracking-[0.15em] uppercase">
                      <textPath href="#circlePath">
                        Best Work • Since 2022 • Best Work •
                      </textPath>
                    </text>
                  </svg>
                </div>
                {/* Center icon */}
                <div className="w-7 h-7 border-2 border-primary flex items-center justify-center relative">
                  <div className="w-3 h-3 border-2 border-primary" />
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
