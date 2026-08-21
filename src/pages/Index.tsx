import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Skills from '@/components/Skills';
import TechStack from '@/components/TechStack';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CustomCursor from '@/components/CustomCursor';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const canonicalUrl = 'https://faizan-ali-portfolio.vercel.app';

  return (
    <>
      <Helmet>
        <title>Faizan Ali | WordPress & Full-Stack Developer</title>
        <meta name="description" content="Faizan Ali is a WordPress and Full-Stack Developer specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development." />
        <meta name="keywords" content="WordPress Developer, WooCommerce, PHP, Full Stack Developer, Vue.js, NestJS, Web Development" />
        <meta name="author" content="Faizan Ali" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Faizan Ali | WordPress & Full-Stack Developer" />
        <meta property="og:description" content="Faizan Ali is a WordPress and Full-Stack Developer specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/tPPahrt5pJRNMb2J03ZK1Fdmjrj2/social-images/social-1767118554756-logo (1).png" />
        <meta property="og:site_name" content="Faizan Ali Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FaizanAli" />
        <meta name="twitter:title" content="Faizan Ali | WordPress & Full-Stack Developer" />
        <meta name="twitter:description" content="Faizan Ali is a WordPress and Full-Stack Developer specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/tPPahrt5pJRNMb2J03ZK1Fdmjrj2/social-images/social-1767118554756-logo (1).png" />

        {/* Additional SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <CustomCursor />
        <header>
          <Navbar />
        </header>
        <main id="main-content">
          <Hero />
          <Stats />
          <About />
          <Skills />
          <TechStack />
          <Portfolio />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;