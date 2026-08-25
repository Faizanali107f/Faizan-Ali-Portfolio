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
import CustomCursor from '@/components/CustomCursor';
import Chatbot from '@/components/Chatbot';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const canonicalUrl = 'https://faizan-ali-portfolio.vercel.app';

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://faizan-ali-portfolio.vercel.app/#person",
        "name": "Faizan Ali",
        "jobTitle": "WordPress & Full-Stack Developer",
        "email": "faizanali107f@gmail.com",
        "telephone": "+92 321-8956-107",
        "url": "https://faizan-ali-portfolio.vercel.app",
        "sameAs": [
          "https://www.linkedin.com/in/faizan-ali-471877243/",
          "https://www.instagram.com/its_faizan412/",
          "https://wa.me/923218956107"
        ],
        "knowsAbout": [
          "WordPress",
          "WooCommerce",
          "PHP",
          "JavaScript",
          "Vue.js",
          "NestJS",
          "Shopify",
          "Elementor",
          "React",
          "Three.js",
          "Tailwind CSS",
          "REST APIs",
          "Technical SEO",
          "Web Development",
          "E-commerce Development"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Khired Networks",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lahore",
            "addressRegion": "Punjab",
            "addressCountry": "PK"
          }
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Virtual University of Pakistan"
        },
        "description": "Faizan Ali is a WordPress and Full-Stack Developer with 4+ years of experience specializing in WordPress, WooCommerce, PHP, JavaScript, Vue.js, and NestJS development."
      },
      {
        "@type": "WebSite",
        "@id": "https://faizan-ali-portfolio.vercel.app/#website",
        "url": "https://faizan-ali-portfolio.vercel.app",
        "name": "Faizan Ali Portfolio",
        "description": "Professional portfolio of Faizan Ali, a WordPress and Full-Stack Developer specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development.",
        "publisher": {
          "@id": "https://faizan-ali-portfolio.vercel.app/#person"
        },
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": "https://faizan-ali-portfolio.vercel.app/#webpage",
        "url": "https://faizan-ali-portfolio.vercel.app",
        "name": "Faizan Ali | WordPress & Full-Stack Developer",
        "description": "Faizan Ali is a WordPress and Full-Stack Developer with 4+ years of experience building high-performance WordPress websites, WooCommerce stores, and modern web applications.",
        "isPartOf": {
          "@id": "https://faizan-ali-portfolio.vercel.app/#website"
        },
        "about": {
          "@id": "https://faizan-ali-portfolio.vercel.app/#person"
        },
        "mainEntity": {
          "@id": "https://faizan-ali-portfolio.vercel.app/#person"
        }
      },
      {
        "@type": "ItemList",
        "name": "Portfolio Projects",
        "description": "Featured WordPress and web development projects by Faizan Ali",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "CreativeWork",
              "name": "Trends Mall",
              "description": "E-Commerce WordPress Website built with WooCommerce",
              "url": "https://trendsmall.pk/",
              "genre": ["WordPress", "E-Commerce"],
              "keywords": ["WordPress", "WooCommerce", "E-commerce"]
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "CreativeWork",
              "name": "RT Centre",
              "description": "Educational Platform with custom WordPress development",
              "url": "https://rtcentre.co.uk/",
              "genre": ["WordPress", "Education", "Custom Development"],
              "keywords": ["WordPress", "Education", "Custom Development"]
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "CreativeWork",
              "name": "Cathy Trenary",
              "description": "Healthcare website built with WordPress",
              "url": "https://cathytrenary.com/",
              "genre": ["WordPress", "Healthcare"],
              "keywords": ["WordPress", "Healthcare"]
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "CreativeWork",
              "name": "Different Calculators",
              "description": "Calculator platform with custom WordPress development",
              "url": "https://differentcalculators.com/",
              "genre": ["WordPress", "Custom Development"],
              "keywords": ["WordPress", "Custom Development", "Calculators"]
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "CreativeWork",
              "name": "Say Cheese Kids Dental",
              "description": "Healthcare business website for pediatric dentistry",
              "url": "https://www.saycheesekidsdental.com/",
              "genre": ["WordPress", "Healthcare", "Business"],
              "keywords": ["WordPress", "Healthcare", "Business", "Dental"]
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "CreativeWork",
              "name": "CloudFortix",
              "description": "Business platform with WordPress and custom development",
              "url": "https://cloudfortix.com/",
              "genre": ["WordPress", "Business", "Custom Development"],
              "keywords": ["WordPress", "Business", "Custom Development"]
            }
          }
        ]
      },
      {
        "@type": "Service",
        "name": "WordPress Development Services",
        "description": "Professional WordPress development services including custom themes, plugins, WooCommerce stores, and performance optimization",
        "provider": {
          "@id": "https://faizan-ali-portfolio.vercel.app/#person"
        },
        "serviceType": [
          "WordPress Development",
          "WooCommerce Development",
          "Custom Theme Development",
          "Plugin Development",
          "Website Design & Development",
          "E-Commerce Store Development",
          "Performance Optimization",
          "SEO & Analytics Integration",
          "Website Maintenance & Support"
        ],
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "31.5204",
            "longitude": "74.3587"
          },
          "geoRadius": "1000"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://faizan-ali-portfolio.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://faizan-ali-portfolio.vercel.app#about"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Portfolio",
            "item": "https://faizan-ali-portfolio.vercel.app#portfolio"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Services",
            "item": "https://faizan-ali-portfolio.vercel.app#services"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Contact",
            "item": "https://faizan-ali-portfolio.vercel.app#contact"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Faizan Ali | WordPress & Full-Stack Developer</title>
        <meta name="description" content="Faizan Ali is a WordPress and Full-Stack Developer with 4+ years of experience specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development." />
        <meta name="keywords" content="WordPress Developer, WooCommerce, PHP, Full Stack Developer, Vue.js, NestJS, Web Development, WordPress Expert" />
        <meta name="author" content="Faizan Ali" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Faizan Ali | WordPress & Full-Stack Developer" />
        <meta property="og:description" content="Faizan Ali is a WordPress and Full-Stack Developer with 4+ years of experience specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/tPPahrt5pJRNMb2J03ZK1Fdmjrj2/social-images/social-1767118554756-logo (1).png" />
        <meta property="og:site_name" content="Faizan Ali Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FaizanAli" />
        <meta name="twitter:creator" content="@FaizanAli" />
        <meta name="twitter:title" content="Faizan Ali | WordPress & Full-Stack Developer" />
        <meta name="twitter:description" content="Faizan Ali is a WordPress and Full-Stack Developer with 4+ years of experience specializing in WordPress, WooCommerce, Shopify, PHP, JavaScript and modern web development." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/tPPahrt5pJRNMb2J03ZK1Fdmjrj2/social-images/social-1767118554756-logo (1).png" />

        {/* Additional SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Additional SEO for AI Crawlers */}
        <meta name="author" content="Faizan Ali" />
        <meta name="keywords" content="WordPress Developer, WooCommerce Developer, PHP Developer, Full Stack Developer, Vue.js Developer, NestJS Developer, WordPress Expert, Web Development, E-commerce Development, Custom WordPress Development" />
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
        <Chatbot />
      </div>
    </>
  );
};

export default Index;