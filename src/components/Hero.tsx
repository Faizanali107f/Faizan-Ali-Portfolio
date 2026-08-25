import { trackCvDownload } from '@/lib/analytics';
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, MessageCircle } from 'lucide-react';
import profileImage from '@/assets/faizan-nobg.png';
import TechCube from '@/components/three/TechCube';
import { useMotionProfile } from '@/hooks/useMotionProfile';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));

const floatingBadges = [
  { label: 'PHP', color: '#777BB4', top: '4%', left: '-6%', delay: 0 },
  { label: 'Vue', color: '#42b883', top: '18%', right: '-8%', delay: 0.4 },
  { label: 'WP', color: '#21759B', bottom: '28%', left: '-10%', delay: 0.8 },
  { label: 'Nest', color: '#E0234E', bottom: '10%', right: '-6%', delay: 1.2 },
];

const Hero = () => {
  const { tier, prefersReducedMotion } = useMotionProfile();
  const calm = tier !== 'full';
  return (
    <section id="home" className="relative min-h-0 lg:min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/[0.08] blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] bg-primary/[0.05] blur-[120px] rounded-full" />
      </div>

      {/* 3D animated background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-7 order-2 lg:order-1 min-w-0 text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-primary text-xs font-medium tracking-wide mb-4 sm:mb-6 md:mb-8"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              <span className="text-muted-foreground">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold tracking-[-0.02em] sm:tracking-[-0.03em] leading-[1.15] sm:leading-[1.1] md:leading-[0.95] mb-4 sm:mb-6 md:mb-8 break-words"
            >
              <span className="text-gradient-white">WordPress &</span>
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[hsl(340,90%,65%)] to-primary">
                Full-Stack Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8 md:mb-10"
            >
              Building high-performance WordPress websites, WooCommerce stores, and modern web applications using{' '}
              <span className="text-foreground">PHP, JavaScript, Vue.js, and NestJS</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3"
            >
              <motion.a
                href="/Faizan_Ali_Resume.pdf"
                download
                onClick={() => trackCvDownload('hero')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-[0_0_30px_-5px_hsl(var(--primary))] hover:shadow-[0_0_40px_-5px_hsl(var(--primary))] transition-all"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
              <motion.a
                href="https://wa.me/923218956107?text=Hi%20Faizan%2C%20I%E2%80%99d%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-primary via-[hsl(340,90%,65%)] to-primary text-primary-foreground px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-[0_0_30px_-5px_hsl(var(--primary))] hover:shadow-[0_0_40px_-5px_hsl(var(--primary))] transition-all group"
              >
                <span className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <MessageCircle size={16} className="relative z-10" />
                <span className="relative z-10">Hire Me</span>
                {!prefersReducedMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    animate={{
                      boxShadow: [
                        '0 0 20px hsl(340 82% 52% / 0.4)',
                        '0 0 35px hsl(340 82% 52% / 0.6)',
                        '0 0 20px hsl(340 82% 52% / 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </motion.a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 sm:mt-10 md:mt-14 flex flex-wrap items-center justify-start gap-x-4 gap-y-3 text-[10px] sm:text-xs font-mono-tech text-muted-foreground/60 tracking-widest uppercase"
            >
              <span>Trusted stack</span>
              <div className="hidden sm:block h-px flex-1 bg-white/5" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {['WordPress', 'WooCommerce', 'Vue', 'NestJS'].map((t) => (
                  <span key={t} className="hover:text-foreground transition-colors">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:col-span-5 order-1 lg:order-2 relative justify-center min-w-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
              {/* Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/25 blur-[100px] rounded-full -z-10" />

              {/* Portrait frame */}
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent">
                {/* Gradient backdrop behind portrait */}
                <div className="absolute inset-x-6 bottom-0 top-1/4 bg-gradient-to-t from-primary/70 via-primary/40 to-transparent rounded-t-[50%] blur-2xl" />
                <div className="absolute inset-x-8 bottom-0 top-1/3 bg-gradient-to-t from-primary via-primary/60 to-transparent rounded-t-[50%]" />
                <img
                  src={profileImage}
                  alt="Faizan Ali, WordPress and Full-Stack Developer"
                  className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-2xl"
                  loading="eager"
                  width={280}
                  height={350}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Rotating badge */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full glass-card flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <defs>
                    <path id="heroCircle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                  </defs>
                  <text className="text-[7px] fill-muted-foreground tracking-[0.25em] uppercase font-mono-tech">
                    <textPath href="#heroCircle">Open to Work • Full Stack • WordPress •</textPath>
                  </text>
                </svg>
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] animate-pulse" />
              </div>

              {/* Floating tech badges */}
              {floatingBadges.map((b) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + b.delay, duration: 0.5 }}
                  style={{ top: b.top, left: b.left, right: b.right, bottom: b.bottom }}
                  className="absolute z-20 hidden md:flex"
                >
                  <motion.div
                    animate={calm ? undefined : { y: [0, -8, 0] }}
                    transition={calm ? undefined : { duration: 4, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
                  >
                    <TechCube label={b.label} color={b.color} delay={b.delay} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground/60 font-mono-tech tracking-widest uppercase"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
