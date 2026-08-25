import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

const experience = [
  { year: 'Dec 2021 - Present', title: 'WordPress Developer', company: 'Khired Networks, DHA Phase 6, Lahore' },
  { year: 'Dec 2021 - Aug 2022', title: 'Software Engineer Internship', company: 'Khired Networks, DHA Phase 6, Lahore' },
];

const education = [
  { year: '2021 - Present', title: 'BSIT (Bachelor of Science in IT)', institution: 'Virtual University of Pakistan' },
  { year: '2018 - 2020', title: 'Intermediate (ICS)', institution: 'Aspire Group Off College' },
];

const expertise = [
  'WordPress Expertise', 'WooCommerce', 'Custom Plugin Development', 'Custom Theme Development',
  'Performance Optimization', 'Website Security', 'Vue.js', 'NestJS', 'PHP', 'Git', 'REST APIs',
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* About header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-12 gap-10 mb-12 sm:mb-16 md:mb-20"
        >
          <div className="lg:col-span-5">
            <span className="text-xs font-mono-tech text-primary tracking-[0.3em] uppercase mb-4 block">/ About</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Engineered for performance, built to last.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Faizan Ali, a WordPress & Full-Stack Developer with 4+ years shipping fast, secure, and scalable web platforms. I specialize in high-performance WordPress and WooCommerce builds, custom plugins and themes, and modern application layers with Vue.js and NestJS.
            </p>
            <div className="flex flex-wrap gap-2">
              {expertise.map((e) => (
                <span key={e} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  {e}
                </span>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              Start a project <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Experience</h2>
            </div>
            <div className="space-y-4">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl p-6 border border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <span className="text-primary text-xs font-mono-tech tracking-wider">{item.year}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.company}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Education</h2>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl p-6 border border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all"
                >
                  <span className="text-primary text-xs font-mono-tech tracking-wider">{item.year}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.institution}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;