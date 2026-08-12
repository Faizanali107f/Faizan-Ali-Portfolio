import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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
      const offsetTop = targetElement.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveSection(targetId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
    >
      <div className="w-full max-w-5xl px-4 md:px-6 py-2.5 flex items-center justify-between rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-[0_8px_32px_hsl(0_0%_0%/0.4)]">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group"
        >
          <span className="text-base md:text-lg font-bold tracking-tight text-foreground">
            Faizan<span className="text-primary">Ali</span>
          </span>
          <span className="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-300 text-xs font-medium tracking-wide ${
                activeSection === link.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/Faizan_Ali_Resume.pdf"
            download
            aria-label="Download Resume"
            onClick={() => trackCvDownload('navbar')}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 text-xs font-medium tracking-wide transition-all"
          >
            <Download size={12} />
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            Hire Me
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-foreground lg:hidden hover:bg-white/5 transition-all"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.id ? 'bg-white/[0.06] text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-2 pt-3 mt-2 border-t border-white/5">
                <a href="/Faizan_Ali_Resume.pdf" download onClick={() => trackCvDownload('navbar_mobile')} className="flex-1 text-center px-4 py-3 rounded-xl border border-white/10 text-foreground text-sm font-medium">
                  Resume
                </a>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="flex-1 text-center px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
