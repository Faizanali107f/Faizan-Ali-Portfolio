import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Linkedin, Github, Download, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/its_faizan412/?hl=en', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/faizan-ali-471877243/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/faizanali107', label: 'GitHub' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section based on scroll position
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[hsl(0,0%,8%)]/95 backdrop-blur-md shadow-lg border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="Faizan Ali Logo" 
                className="w-10 h-10 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground hidden sm:block">
              Faizan Ali
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 transition-colors duration-300 text-sm font-medium group ${
                  activeSection === link.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === link.id ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                  }`} 
                />
              </a>
            ))}
          </div>

          {/* Right Side: Social Links, Chat & Menu Button */}
          <div className="flex items-center gap-3">
            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
              <a
                href="/Faizan_Ali_Resume.pdf"
                download
                aria-label="Download CV"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Download size={16} />
              </a>
            </div>

            {/* Let's Chat Button - Desktop */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Let's Chat
              <MessageCircle size={16} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary lg:hidden hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[hsl(0,0%,8%)]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`transition-colors duration-300 text-lg font-medium py-2 border-b border-white/5 last:border-0 ${
                    activeSection === link.id ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center gap-3 pt-4 mt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
                <a
                  href="/Faizan_Ali_Resume.pdf"
                  download
                  aria-label="Download CV"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Download size={18} />
                </a>
              </div>

              {/* Mobile Chat Button */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Let's Chat
                <MessageCircle size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
