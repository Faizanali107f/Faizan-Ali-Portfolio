import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Instagram, Linkedin, Download, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number is too long').regex(/^[+]?[\d\s-]+$/, 'Please enter a valid phone number'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be less than 200 characters'),
  service: z.string().optional(),
  message: z.string().trim().max(2000, 'Message must be less than 2000 characters').optional(),
});

const services = [
  'Website Design & Development',
  'WordPress Development',
  'WooCommerce & Shopify Development',
  'E-Commerce Store Development',
  'Theme Development',
  'Plugin Development',
  'Custom Web Applications',
  'Website Speed & Performance Optimization',
  'SEO & Analytics Integration',
  'Website Maintenance & Support',
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/its_faizan412/?hl=en', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/faizan-ali-471877243/', label: 'LinkedIn' },
  { icon: Download, href: '/Faizan_Ali_Resume.pdf', label: 'Download CV', download: true },
];

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Lahore, Pakistan' },
  { icon: Phone, label: 'Phone', value: '+92 321-8956-107' },
  { icon: Mail, label: 'Email', value: 'faizanali107f@gmail.com' },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState(''); // Spam trap
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out.",
      });
      return;
    }

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      if (data?.error === 'rate_limit') {
        toast({
          title: "Too Many Requests",
          description: "Please wait a few minutes before sending another message.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (value: string) => {
    setFormData({ ...formData, service: value });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest text-sm mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Let's Work Together <br />On Your Next Project
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-card border border-border flex items-center justify-center flex-shrink-0">
                  <info.icon size={24} className="text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">{info.label}</span>
                  <span className="text-foreground font-medium">{info.value}</span>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="pt-6">
              <span className="text-muted-foreground text-sm mb-4 block">Follow Me</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    {...(social.download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-gradient-card rounded-2xl p-8 border border-border">
              {/* Honeypot field - hidden from users, visible to bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`bg-muted border-border focus:border-primary ${errors.name ? 'border-destructive' : ''}`}
                    required
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`bg-muted border-border focus:border-primary ${errors.email ? 'border-destructive' : ''}`}
                    required
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className={`bg-muted border-border focus:border-primary ${errors.phone ? 'border-destructive' : ''}`}
                    required
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-foreground mb-2 block">
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={`bg-muted border-border focus:border-primary ${errors.subject ? 'border-destructive' : ''}`}
                    required
                  />
                  {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="service" className="text-sm font-medium text-foreground mb-2 block">
                  Service Interested In
                </label>
                <Select value={formData.service} onValueChange={handleServiceChange}>
                  <SelectTrigger className="bg-muted border-border focus:border-primary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-muted border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 rounded-xl transition-all duration-300 shadow-glow hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;