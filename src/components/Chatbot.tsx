import { useState, useEffect, useRef } from 'react';
import { Bot, X, RotateCcw, Send, ExternalLink } from 'lucide-react';
import { portfolioKnowledge, intentPatterns } from '@/data/portfolioKnowledge';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  quickActions?: QuickAction[];
  projectInfo?: ProjectInfo;
  projectsList?: ProjectInfo[];
}

interface QuickAction {
  label: string;
  action: string;
  intent?: string;
  url?: string;
}

interface ProjectInfo {
  title: string;
  categories: string[];
  url: string;
  description: string;
  image?: string;
}

interface ProjectInquiry {
  name?: string;
  email?: string;
  whatsapp?: string;
  projectType?: string;
  websiteType?: string;
  details?: string;
  budget?: string;
  timeline?: string;
}

const serviceCategories: Record<string, string[]> = {
  WordPress: ['WordPress Development', 'Theme Development', 'Plugin Development'],
  WooCommerce: ['WooCommerce & Shopify Development', 'E-Commerce Store Development'],
  Shopify: ['WooCommerce & Shopify Development', 'E-Commerce Store Development'],
  'Custom Web App': ['Custom Web Applications', 'Website Design & Development'],
  Other: ['Website Speed & Performance Optimization', 'SEO & Analytics Integration', 'Website Maintenance & Support'],
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inquiryStep, setInquiryStep] = useState(0);
  const [projectInquiry, setProjectInquiry] = useState<ProjectInquiry>({});
  const [isOnline, setIsOnline] = useState(true);
  const [offlineForm, setOfflineForm] = useState({ name: '', email: '', message: '' });
  const [offlineSent, setOfflineSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const projectTypes = [
    'WordPress Website',
    'WooCommerce Store',
    'Shopify Store',
    'Custom Web Application',
    'Other / Not Sure',
  ];

  const budgets = ['Not decided', 'Under $500', '$500–$1,000', '$1,000–$2,500', '$2,500+'];

  const timelines = ['ASAP', '1 week', '2–3 weeks', '1 month', 'Flexible'];

  // Track connectivity for offline fallback
  useEffect(() => {
    setIsOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize with welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage();
    }
  }, [isOpen]);

  // Focus input and support Escape to close
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: generateId(),
      type: 'assistant',
      content:
        "Hi! I'm Faizan AI 👋\n\nI'm here to help you learn about Faizan, his experience, projects, services, and help you discuss your project.\n\nHow can I help you today?",
      quickActions: [
        { label: 'About Faizan', action: 'about', intent: 'about' },
        { label: 'My Services', action: 'services', intent: 'services' },
        { label: 'View Projects', action: 'projects', intent: 'projects' },
        { label: 'Hire Me', action: 'hire', intent: 'hire' },
      ],
    };
    setMessages([welcomeMessage]);
  };

  const resetChat = () => {
    setMessages([]);
    setInputValue('');
    setInquiryStep(0);
    setProjectInquiry({});
    setIsTyping(false);
    addWelcomeMessage();
  };

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const detectIntent = (text: string): string => {
    const lowerText = text.toLowerCase();

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      for (const pattern of patterns) {
        if (lowerText.includes(pattern)) {
          return intent;
        }
      }
    }

    return 'unknown';
  };

  const generateResponse = (userInput: string): Message => {
    const intent = detectIntent(userInput);

    switch (intent) {
      case 'about':
        return generateAboutResponse();
      case 'experience':
        return generateExperienceResponse();
      case 'skills':
        return generateSkillsResponse();
      case 'projects':
        return generateProjectsResponse();
      case 'services':
        return generateServicesResponse();
      case 'contact':
        return generateContactResponse();
      case 'hire':
        return generateHireResponse();
      case 'education':
        return generateEducationResponse();
      case 'pricing':
        return generatePricingResponse();
      case 'faq':
        return generateFAQResponse(userInput);
      default:
        return generateUnknownResponse();
    }
  };

  const generateAboutResponse = (): Message => {
    const { profile, stats } = portfolioKnowledge;
    return {
      id: generateId(),
      type: 'assistant',
      content: `${profile.name} is a ${profile.title} with ${profile.experience} of experience building high-performance WordPress websites, WooCommerce stores, and modern web applications.

📍 Location: ${profile.location}
🎓 Education: ${profile.education}
📧 Email: ${profile.email}

He has completed ${stats[0].value}${stats[0].suffix} projects and maintains a ${stats[3].value}${stats[3].suffix} performance score, and is currently available for new freelance projects.`,
      quickActions: [
        { label: 'View Skills', action: 'skills', intent: 'skills' },
        { label: 'View Experience', action: 'experience', intent: 'experience' },
        { label: 'View Projects', action: 'projects', intent: 'projects' },
        { label: 'Hire Me', action: 'hire', intent: 'hire' },
      ],
    };
  };

  const generateExperienceResponse = (): Message => {
    const { experience } = portfolioKnowledge;
    let experienceText = "Faizan's professional experience:\n\n";

    experience.forEach((exp) => {
      experienceText += `• **${exp.title}**\n  ${exp.year}\n  ${exp.company}\n  ${exp.location}\n\n`;
    });

    return {
      id: generateId(),
      type: 'assistant',
      content: experienceText.trim(),
      quickActions: [
        { label: 'About Faizan', action: 'about', intent: 'about' },
        { label: 'View Education', action: 'education', intent: 'education' },
      ],
    };
  };

  const generateSkillsResponse = (): Message => {
    const { skills } = portfolioKnowledge;
    let skillsText = 'Faizan specializes in:\n\n';

    skillsText += '**Languages:**\n' + skills.languages.join(', ') + '\n\n';
    skillsText += '**CMS & Builders:**\n' + skills.cmsBuilders.join(', ') + '\n\n';
    skillsText += '**Backend & Integrations:**\n' + skills.backendIntegrations.join(', ') + '\n\n';
    skillsText += '**Performance & Security:**\n' + skills.performanceSecurity.join(', ') + '\n\n';
    skillsText += '**SEO:**\n' + skills.seo.join(', ') + '\n\n';
    skillsText += '**Tools & Ops:**\n' + skills.toolsOps.join(', ');

    return {
      id: generateId(),
      type: 'assistant',
      content: skillsText,
      quickActions: [
        { label: 'See Projects', action: 'projects', intent: 'projects' },
        { label: 'View Services', action: 'services', intent: 'services' },
      ],
    };
  };

  const generateProjectsResponse = (): Message => {
    const { projects } = portfolioKnowledge;
    const featured = projects.slice(0, 3);

    return {
      id: generateId(),
      type: 'assistant',
      content: `Here are some of Faizan's featured projects. Click on any project to view details.`,
      projectsList: featured,
      quickActions: [{ label: 'View More Projects', action: 'view_all_projects' }],
    };
  };

  const generateProjectDetailResponse = (projectTitle: string): Message => {
    const project = portfolioKnowledge.projects.find((p) =>
      p.title.toLowerCase().includes(projectTitle.toLowerCase())
    );

    if (!project) {
      return generateUnknownResponse();
    }

    return {
      id: generateId(),
      type: 'assistant',
      content: `**${project.title}**

**Type:** ${project.categories.join(' • ')}

${project.description}`,
      projectInfo: project,
      quickActions: [{ label: 'View Project →', action: 'external_link', url: project.url }],
    };
  };

  const generateServicesResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content: `Faizan offers a wide range of web development services. Which service are you interested in?`,
      quickActions: [
        { label: 'WordPress', action: 'service_WordPress' },
        { label: 'WooCommerce', action: 'service_WooCommerce' },
        { label: 'Shopify', action: 'service_Shopify' },
        { label: 'Custom Web App', action: 'service_Custom Web App' },
        { label: 'Other', action: 'service_Other' },
      ],
    };
  };

  const generateServiceCategoryResponse = (category: string): Message => {
    const { services } = portfolioKnowledge;
    const titles = serviceCategories[category] || [];
    const matched = services.filter((s) => titles.includes(s.title));

    let content = `Here's what Faizan can provide for **${category}**:\n\n`;
    matched.forEach((s) => {
      content += `**${s.title}**\n${s.description}\n\n`;
    });
    content += "I'd be happy to discuss your project in more detail!";

    return {
      id: generateId(),
      type: 'assistant',
      content: content.trim(),
      quickActions: [
        { label: 'Hire Me', action: 'hire', intent: 'hire' },
        { label: 'Other Services', action: 'services', intent: 'services' },
      ],
    };
  };

  const generateContactResponse = (): Message => {
    const { profile } = portfolioKnowledge;
    return {
      id: generateId(),
      type: 'assistant',
      content:
        `You can contact Faizan through:\n\n` +
        `📧 **Email:** ${profile.email}\n` +
        `📱 **WhatsApp:** ${profile.whatsapp}\n` +
        `📞 **Phone:** ${profile.phone}\n` +
        `💼 **LinkedIn:** ${profile.linkedin}`,
      quickActions: [
        { label: 'WhatsApp', action: 'whatsapp' },
        { label: 'Email', action: 'email' },
        { label: 'LinkedIn', action: 'linkedin', url: profile.linkedin },
      ],
    };
  };

  const generateHireResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content: "Great! Let's discuss your project 🚀",
      quickActions: [{ label: 'Start Project Inquiry', action: 'start_inquiry' }],
    };
  };

  const generateEducationResponse = (): Message => {
    const { education } = portfolioKnowledge;
    let educationText = "Faizan's education:\n\n";

    education.forEach((edu) => {
      educationText += `• **${edu.title}**\n  ${edu.year}\n  ${edu.institution}\n\n`;
    });

    return {
      id: generateId(),
      type: 'assistant',
      content: educationText.trim(),
      quickActions: [
        { label: 'View Experience', action: 'experience', intent: 'experience' },
        { label: 'Contact Faizan', action: 'contact', intent: 'contact' },
      ],
    };
  };

  const generatePricingResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content:
        'Project pricing varies based on scope and requirements. Faizan provides custom quotes for each project.\n\n' +
        "To get an accurate quote, he'll need to understand:\n" +
        '• Project type and requirements\n' +
        '• Desired features and functionality\n' +
        '• Timeline and deadline\n\n' +
        'The best way to get pricing is to start a project inquiry!',
      quickActions: [
        { label: 'Start Project Inquiry', action: 'start_inquiry' },
        { label: 'Contact Directly', action: 'whatsapp' },
      ],
    };
  };

  const faqStopwords = new Set(['what', 'does', 'your', 'have', 'that', 'with', 'this', 'from', 'they', 'them', 'provide', 'services']);

  const generateFAQResponse = (userInput: string): Message => {
    const { faqs } = portfolioKnowledge;
    const lower = userInput.toLowerCase();

    let best: (typeof faqs)[number] | undefined;
    let bestScore = 0;
    faqs.forEach((f) => {
      const keywords = f.question
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 3 && !faqStopwords.has(w));
      const score = keywords.filter((k) => lower.includes(k)).reduce((sum, k) => sum + k.length, 0);
      if (score > bestScore) {
        bestScore = score;
        best = f;
      }
    });
    const match = best;

    if (match) {
      return {
        id: generateId(),
        type: 'assistant',
        content: match.answer,
        quickActions: [
          { label: 'More FAQs', action: 'faq_menu' },
          { label: 'Hire Me', action: 'hire', intent: 'hire' },
        ],
      };
    }

    return generateFAQMenu();
  };

  const generateFAQMenu = (): Message => {
    const { faqs } = portfolioKnowledge;
    return {
      id: generateId(),
      type: 'assistant',
      content: 'Here are some common questions. Tap one to see the answer:',
      quickActions: faqs.map((f, i) => ({ label: f.question, action: `faq_${i}` })),
    };
  };

  const generateUnknownResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content:
        "I don't have that information available right now. You can contact Faizan directly and he'll be happy to help.",
      quickActions: [
        { label: 'About Faizan', action: 'about', intent: 'about' },
        { label: 'Projects', action: 'projects', intent: 'projects' },
        { label: 'Contact Faizan', action: 'contact', intent: 'contact' },
      ],
    };
  };

  const handleQuickAction = (action: string) => {
    if (action === 'start_inquiry') {
      startProjectInquiry();
      return;
    }

    if (action === 'whatsapp') {
      openWhatsApp();
      return;
    }

    if (action === 'email') {
      openEmail();
      return;
    }

    if (action === 'external_link') {
      return;
    }

    if (action === 'view_all_projects') {
      setIsOpen(false);
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (action === 'faq_menu') {
      setMessages((prev) => [...prev, generateFAQMenu()]);
      return;
    }

    if (action.startsWith('faq_')) {
      const index = parseInt(action.replace('faq_', ''), 10);
      const faq = portfolioKnowledge.faqs[index];
      if (faq) {
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            type: 'assistant',
            content: faq.answer,
            quickActions: [
              { label: 'More FAQs', action: 'faq_menu' },
              { label: 'Hire Me', action: 'hire', intent: 'hire' },
            ],
          },
        ]);
      }
      return;
    }

    if (action.startsWith('service_')) {
      const category = action.replace('service_', '');
      setMessages((prev) => [...prev, generateServiceCategoryResponse(category)]);
      return;
    }

    if (action.startsWith('project_')) {
      const projectName = action.replace('project_', '');
      const response = generateProjectDetailResponse(projectName);
      setMessages((prev) => [...prev, response]);
      return;
    }

    const response = generateResponse(action);
    setMessages((prev) => [...prev, response]);
  };

  const startProjectInquiry = () => {
    setInquiryStep(1);
    const inquiryMessage: Message = {
      id: generateId(),
      type: 'assistant',
      content: "Great! Let's discuss your project 🚀\n\nWhat type of project do you need?",
      quickActions: projectTypes.map((type) => ({ label: type, action: `inquiry_type_${type}` })),
    };
    setMessages((prev) => [...prev, inquiryMessage]);
  };

  const handleInquiryResponse = (userInput: string): Message => {
    const updatedInquiry = { ...projectInquiry };

    switch (inquiryStep) {
      case 2: // Website type / details
        updatedInquiry.websiteType = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(3);
        return {
          id: generateId(),
          type: 'assistant',
          content: 'Do you have any specific requirements? (e.g. features, pages, functionality)',
        };

      case 3: // Requirements
        updatedInquiry.details = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(4);
        return {
          id: generateId(),
          type: 'assistant',
          content: 'What is your expected timeline?',
          quickActions: timelines.map((t) => ({ label: t, action: `inquiry_timeline_${t}` })),
        };

      case 5: // Budget (free text fallback)
        updatedInquiry.budget = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(6);
        return showInquirySummary(updatedInquiry);

      default:
        return generateUnknownResponse();
    }
  };

  const showInquirySummary = (inquiry: ProjectInquiry): Message => {
    const { projectType, websiteType, details, budget, timeline } = inquiry;

    let summary = "Thanks! Here's a summary of your project:\n\n";
    summary += `🚀 **Project Type:** ${projectType}\n`;
    if (websiteType) summary += `📌 **Website Type:** ${websiteType}\n`;
    if (details) summary += `📝 **Requirements:** ${details}\n`;
    if (timeline) summary += `⏱ **Timeline:** ${timeline}\n`;
    if (budget) summary += `💰 **Budget:** ${budget}\n`;
    summary += "\nI can definitely help you with this! 🚀\nShall we discuss it further on WhatsApp?";

    return {
      id: generateId(),
      type: 'assistant',
      content: summary,
      quickActions: [
        { label: 'Chat on WhatsApp', action: 'send_whatsapp' },
        { label: 'Send Email Instead', action: 'send_email' },
      ],
    };
  };

  const buildInquiryMessage = () => {
    const { projectType, websiteType, details, budget, timeline } = projectInquiry;
    let message = `Hi Faizan,\nI'd like to discuss a project.\n\n`;
    message += `Project Type: ${projectType || 'N/A'}\n`;
    if (websiteType) message += `Website Type: ${websiteType}\n`;
    if (details) message += `Requirements: ${details}\n`;
    if (timeline) message += `Timeline: ${timeline}\n`;
    if (budget) message += `Budget: ${budget}\n`;
    message += `\nPlease let me know how we can proceed.`;
    return message;
  };

  const openWhatsApp = (inquiry = false) => {
    const { profile } = portfolioKnowledge;
    const message = inquiry
      ? buildInquiryMessage()
      : 'Hello Faizan, I found your portfolio and would like to discuss a project.';

    window.open(
      `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const openEmail = (inquiry = false) => {
    const { profile } = portfolioKnowledge;
    const subject = inquiry ? 'New Project Inquiry — Faizan Ali Portfolio' : 'Project Inquiry from Portfolio';
    const body = inquiry
      ? buildInquiryMessage()
      : 'Hello Faizan, I found your portfolio and would like to discuss a project.';

    window.open(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: inputValue,
    };

    const currentInput = inputValue;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    if (inquiryStep > 0) {
      setIsTyping(true);
      setTimeout(() => {
        const response = handleInquiryResponse(currentInput);
        setMessages((prev) => [...prev, response]);
        setIsTyping(false);
      }, 700);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(currentInput);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 900);
  };

  // Quick actions that drive the guided inquiry flow use dedicated action
  // prefixes so free-text input and buttons share the same handler.
  const handleInquiryQuickAction = (action: string) => {
    if (action.startsWith('inquiry_type_')) {
      const projectType = action.replace('inquiry_type_', '');
      const updated = { ...projectInquiry, projectType };
      setProjectInquiry(updated);
      setInquiryStep(2);
      setMessages((prev) => [
        ...prev,
        { id: generateId(), type: 'user', content: projectType },
        {
          id: generateId(),
          type: 'assistant',
          content: 'What type of website is it? (e.g. business, blog, portfolio, e-commerce)',
        },
      ]);
      return true;
    }

    if (action.startsWith('inquiry_timeline_')) {
      const timeline = action.replace('inquiry_timeline_', '');
      const updated = { ...projectInquiry, timeline };
      setProjectInquiry(updated);
      setInquiryStep(5);
      setMessages((prev) => [
        ...prev,
        { id: generateId(), type: 'user', content: timeline },
        {
          id: generateId(),
          type: 'assistant',
          content: "What's your approximate budget? (Optional — you can skip this)",
          quickActions: budgets.map((b) => ({ label: b, action: `inquiry_budget_${b}` })),
        },
      ]);
      return true;
    }

    if (action.startsWith('inquiry_budget_')) {
      const budget = action.replace('inquiry_budget_', '');
      const updated = { ...projectInquiry, budget: budget === 'Not decided' ? undefined : budget };
      setProjectInquiry(updated);
      setInquiryStep(6);
      setMessages((prev) => [...prev, { id: generateId(), type: 'user', content: budget }, showInquirySummary(updated)]);
      return true;
    }

    if (action === 'send_whatsapp') {
      openWhatsApp(true);
      setInquiryStep(0);
      return true;
    }

    if (action === 'send_email') {
      openEmail(true);
      setInquiryStep(0);
      return true;
    }

    return false;
  };

  const onQuickActionClick = (action: string) => {
    if (handleInquiryQuickAction(action)) return;
    handleQuickAction(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOfflineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { profile } = portfolioKnowledge;
    const subject = encodeURIComponent('Message from Portfolio Chatbot (offline)');
    const body = encodeURIComponent(
      `Name: ${offlineForm.name}\nEmail: ${offlineForm.email}\n\nMessage:\n${offlineForm.message}`
    );
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
    setOfflineSent(true);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-[hsl(340,90%,55%)] to-primary text-primary-foreground shadow-[0_0_30px_-5px_hsl(var(--primary))] hover:shadow-[0_0_45px_-5px_hsl(var(--primary))] transition-all duration-300 hover:scale-110 motion-safe:animate-float flex items-center justify-center group border border-white/10"
          aria-label="Open chat with Faizan AI, portfolio assistant"
        >
          <Bot size={28} className="group-hover:rotate-6 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-background motion-safe:animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Faizan AI chat window"
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-40 bg-background border border-white/10 sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 w-full h-full sm:w-96 sm:h-[600px] sm:max-h-[80vh]"
        >
          {/* Header */}
          <div className="bg-gradient-card border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(340,90%,55%)] flex items-center justify-center shadow-[0_0_15px_-2px_hsl(var(--primary))]">
                <Bot size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Faizan AI</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                  {isOnline ? 'Online • Ready to help!' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Reset conversation"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isOnline ? (
            /* Offline fallback */
            <div className="p-6 flex flex-col items-center text-center h-[calc(100%-73px)] overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[hsl(340,90%,55%)] flex items-center justify-center mb-4">
                <Bot size={28} className="text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-1">I'm currently offline 😴</h4>
              <p className="text-sm text-muted-foreground mb-6">
                But don't worry! Leave a message and I'll get back to you as soon as possible.
              </p>
              {offlineSent ? (
                <p className="text-sm text-primary">Thanks! Your message is ready to send from your email client.</p>
              ) : (
                <form onSubmit={handleOfflineSubmit} className="w-full space-y-3 text-left">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={offlineForm.name}
                    onChange={(e) => setOfflineForm({ ...offlineForm, name: e.target.value })}
                    className="w-full bg-muted border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                    aria-label="Your Name"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={offlineForm.email}
                    onChange={(e) => setOfflineForm({ ...offlineForm, email: e.target.value })}
                    className="w-full bg-muted border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50"
                    aria-label="Your Email"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Your Message"
                    value={offlineForm.message}
                    onChange={(e) => setOfflineForm({ ...offlineForm, message: e.target.value })}
                    className="w-full bg-muted border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 resize-none"
                    aria-label="Your Message"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-[hsl(340,90%,55%)] text-primary-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div
                className="h-[calc(100%-73px-73px)] sm:h-[440px] overflow-y-auto p-4 space-y-4"
                aria-live="polite"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-[hsl(340,90%,55%)] flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot size={14} className="text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>

                      {message.projectInfo && (
                        <a
                          href={message.projectInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 mt-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink size={14} />
                          View Project →
                        </a>
                      )}

                      {message.projectsList && message.projectsList.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {message.projectsList.map((project) => (
                            <a
                              key={project.title}
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
                            >
                              {project.image && (
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                  loading="lazy"
                                />
                              )}
                              <div className="min-w-0">
                                <div className="text-sm font-semibold truncate">{project.title}</div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {project.categories.join(', ')}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-primary mt-0.5">
                                  <ExternalLink size={11} />
                                  View Project
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}

                      {message.quickActions && message.quickActions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.quickActions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => onQuickActionClick(action.action)}
                              className="px-3 py-1.5 text-xs rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-[hsl(340,90%,55%)] flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Faizan AI is typing</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 motion-safe:animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 motion-safe:animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 motion-safe:animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-muted border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    aria-label="Type your message to Faizan AI"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-[hsl(340,90%,55%)] text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-2 text-center">
                  We never share your data with anyone.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
