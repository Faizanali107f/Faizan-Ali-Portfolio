import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">Reeni</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>© 2024 Made with</span>
            <Heart size={14} className="text-primary fill-primary" />
            <span>by Ralph Edwards</span>
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;