import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

const stats = [
  { value: '2+', label: 'Years of Experience' },
  { value: '17+', label: 'Projects Completed' },
  { value: '10+', label: 'Happy Clients' },
];

const experience = [
  { year: 'June 2022 - Present', title: 'WordPress Developer', company: 'Khired Networks, DHA Phase 6, Lahore' },
];

const education = [
  { year: '2021 - Present', title: 'BSIT (Bachelor of Science in IT)', institution: 'Virtual University of Pakistan' },
];

const designSkills = [
  { name: 'Figma to WordPress', percentage: 95 },
  { name: 'PSD to WordPress', percentage: 95 },
  { name: 'XD to WordPress', percentage: 90 },
  { name: 'Elementor', percentage: 95 },
];

const devSkills = [
  { name: 'WordPress', percentage: 95 },
  { name: 'PHP', percentage: 85 },
  { name: 'HTML/CSS', percentage: 95 },
  { name: 'JavaScript', percentage: 75 },
  { name: 'WooCommerce', percentage: 90 },
];

const SkillBar = ({ name, percentage, delay }: { name: string; percentage: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{name}</span>
        <span className="text-xs font-semibold text-primary">{percentage}%</span>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full bg-gradient-primary rounded-full"
        />
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="text-5xl font-display font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* About Me Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm mb-4 block">About Me</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Building High-Performance <br />WordPress Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I specialize in building and customizing WordPress websites tailored to client needs, focusing on responsive design, performance optimization, and cross-browser compatibility.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { title: 'Custom Development', desc: 'Custom themes and plugins development with clean, maintainable code' },
            { title: 'E-Commerce Solutions', desc: 'WooCommerce integration and customization for online stores' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Briefcase size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Read More About Me
            <ArrowRight size={20} />
          </motion.a>
        </div>

        {/* Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={24} className="text-primary" />
              <h3 className="font-display text-2xl font-bold text-foreground">My Experience</h3>
            </div>
            <div className="space-y-4">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-primary text-sm font-semibold">{item.year}</span>
                  <h4 className="text-lg font-semibold text-foreground mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.company}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={24} className="text-primary" />
              <h3 className="font-display text-2xl font-bold text-foreground">My Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-primary text-sm font-semibold">{item.year}</span>
                  <h4 className="text-lg font-semibold text-foreground mt-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.institution}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Design Skills */}
          <div className="bg-gradient-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">Design Skill</h3>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />
            {designSkills.map((skill, index) => (
              <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
            ))}
          </div>

          {/* Development Skills */}
          <div className="bg-gradient-card rounded-2xl p-8 border border-border">
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">Development Skill</h3>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />
            {devSkills.map((skill, index) => (
              <SkillBar key={skill.name} {...skill} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;