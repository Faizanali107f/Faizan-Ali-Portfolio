import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Minimize2, Send, ExternalLink, Mail, Phone, Linkedin } from 'lucide-react';
import { portfolioKnowledge, intentPatterns } from '@/data/portfolioKnowledge';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  quickActions?: QuickAction[];
  projectInfo?: ProjectInfo;
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
}

interface ProjectInquiry {
  name?: string;
  email?: string;
  whatsapp?: string;
  projectType?: string;
  details?: string;
  budget?: string;
  timeline?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inquiryStep, setInquiryStep] = useState(0);
  const [projectInquiry, setProjectInquiry] = useState<ProjectInquiry>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const projectTypes = [
    "WordPress Website",
    "WooCommerce Store",
    "Shopify Store",
    "Custom Web Application",
    "Website Redesign",
    "Website Performance Optimization",
    "SEO",
    "Website Maintenance",
    "Other"
  ];

  const budgets = [
    "Not decided",
    "Under $500",
    "$500–$1,000",
    "$1,000–$2,500",
    "$2,500+"
  ];

  const timelines = [
    "ASAP",
    "Within 1–2 weeks",
    "Within 1 month",
    "Flexible"
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage();
    }
  }, [isOpen]);

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: generateId(),
      type: 'assistant',
      content: "Hi! 👋 I'm Faizan's Portfolio Assistant. I can help you learn about Faizan's experience, projects, services, technologies, or help you get in touch about a project.",
      quickActions: [
        { label: "About Faizan", action: "about", intent: "about" },
        { label: "Projects", action: "projects", intent: "projects" },
        { label: "Services", action: "services", intent: "services" },
        { label: "Skills", action: "skills", intent: "skills" },
        { label: "Hire Faizan", action: "hire", intent: "hire" },
        { label: "Contact", action: "contact", intent: "contact" }
      ]
    };
    setMessages([welcomeMessage]);
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

He has completed ${stats[0].value}${stats[0].suffix} projects and maintains a ${stats[3].value}${stats[3].suffix} performance score, showing his commitment to quality and performance.`,
      quickActions: [
        { label: "View Experience", action: "experience", intent: "experience" },
        { label: "See Skills", action: "skills", intent: "skills" },
        { label: "Contact Faizan", action: "contact", intent: "contact" }
      ]
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
        { label: "About Faizan", action: "about", intent: "about" },
        { label: "View Education", action: "education", intent: "education" }
      ]
    };
  };

  const generateSkillsResponse = (): Message => {
    const { skills, technologies } = portfolioKnowledge;
    let skillsText = "Faizan specializes in:\n\n";

    skillsText += "**Languages:**\n" + skills.languages.join(", ") + "\n\n";
    skillsText += "**CMS & Builders:**\n" + skills.cmsBuilders.join(", ") + "\n\n";
    skillsText += "**Backend & Integrations:**\n" + skills.backendIntegrations.join(", ") + "\n\n";
    skillsText += "**Performance & Security:**\n" + skills.performanceSecurity.join(", ") + "\n\n";
    skillsText += "**SEO:**\n" + skills.seo.join(", ") + "\n\n";
    skillsText += "**Tools & Ops:**\n" + skills.toolsOps.join(", ");

    return {
      id: generateId(),
      type: 'assistant',
      content: skillsText,
      quickActions: [
        { label: "See Projects", action: "projects", intent: "projects" },
        { label: "View Services", action: "services", intent: "services" }
      ]
    };
  };

  const generateProjectsResponse = (): Message => {
    const { projects } = portfolioKnowledge;
    let projectsText = `Faizan has worked on **${projects.length} notable projects**:\n\n`;

    projects.slice(0, 5).forEach((project) => {
      projectsText += `**${project.title}**\n${project.categories.join(" • ")}\n\n`;
    });

    projectsText += `\nWould you like to know more about any specific project?`;

    return {
      id: generateId(),
      type: 'assistant',
      content: projectsText,
      quickActions: [
        { label: "Trends Mall", action: "project_trendsmall" },
        { label: "RT Centre", action: "project_rtcentre" },
        { label: "View All Projects", action: "view_all_projects" }
      ]
    };
  };

  const generateProjectDetailResponse = (projectTitle: string): Message => {
    const project = portfolioKnowledge.projects.find(p =>
      p.title.toLowerCase().includes(projectTitle.toLowerCase())
    );

    if (!project) {
      return generateUnknownResponse();
    }

    return {
      id: generateId(),
      type: 'assistant',
      content: `**${project.title}**

**Type:** ${project.categories.join(" • ")}
**Technologies:** WordPress, ${project.categories.slice(1).join(", ")}

${project.description}`,
      projectInfo: {
        title: project.title,
        categories: project.categories,
        url: project.url,
        description: project.description
      },
      quickActions: [
        { label: "View Project →", action: "external_link", url: project.url }
      ]
    };
  };

  const generateServicesResponse = (): Message => {
    const { services } = portfolioKnowledge;
    let servicesText = `Faizan offers **${services.length} professional services**:\n\n`;

    services.slice(0, 6).forEach((service) => {
      servicesText += `**${service.title}**\n${service.description}\n\n`;
    });

    return {
      id: generateId(),
      type: 'assistant',
      content: servicesText.trim(),
      quickActions: [
        { label: "Hire Faizan", action: "hire", intent: "hire" },
        { label: "Get Quote", action: "hire", intent: "hire" },
        { label: "View All Services", action: "view_all_services" }
      ]
    };
  };

  const generateContactResponse = (): Message => {
    const { profile } = portfolioKnowledge;
    return {
      id: generateId(),
      type: 'assistant',
      content: `You can contact Faizan through:\n\n` +
        `📧 **Email:** ${profile.email}\n` +
        `📱 **WhatsApp:** ${profile.whatsapp}\n` +
        `📞 **Phone:** ${profile.phone}\n` +
        `💼 **LinkedIn:** ${profile.linkedin}`,
      quickActions: [
        { label: "WhatsApp", action: "whatsapp" },
        { label: "Email", action: "email" },
        { label: "LinkedIn", action: "linkedin", url: profile.linkedin }
      ]
    };
  };

  const generateHireResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content: "Great! I'd be happy to help you get in touch with Faizan. Let me collect a few details about your project.",
      quickActions: [
        { label: "Start Project Inquiry", action: "start_inquiry" }
      ]
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
        { label: "View Experience", action: "experience", intent: "experience" },
        { label: "Contact Faizan", action: "contact", intent: "contact" }
      ]
    };
  };

  const generatePricingResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content: "Project pricing varies based on scope and requirements. Faizan provides custom quotes for each project.\n\n" +
        "To get an accurate quote, he'll need to understand:\n" +
        "• Project type and requirements\n" +
        "• Desired features and functionality\n" +
        "• Timeline and deadline\n" +
        "• Design requirements\n\n" +
        "The best way to get pricing is to start a project inquiry!",
      quickActions: [
        { label: "Start Project Inquiry", action: "start_inquiry" },
        { label: "Contact Directly", action: "whatsapp" }
      ]
    };
  };

  const generateUnknownResponse = (): Message => {
    return {
      id: generateId(),
      type: 'assistant',
      content: "I don't have enough information about that in Faizan's portfolio. You can contact Faizan directly and he'll be happy to provide more details.",
      quickActions: [
        { label: "About Faizan", action: "about", intent: "about" },
        { label: "Projects", action: "projects", intent: "projects" },
        { label: "Contact Faizan", action: "contact", intent: "contact" }
      ]
    };
  };

  const handleQuickAction = (action: string) => {
    if (action === "start_inquiry") {
      startProjectInquiry();
      return;
    }

    if (action === "whatsapp") {
      openWhatsApp();
      return;
    }

    if (action === "email") {
      openEmail();
      return;
    }

    if (action === "external_link") {
      // Handle project link - will be processed separately
      return;
    }

    if (action.startsWith("project_")) {
      const projectName = action.replace("project_", "");
      const response = generateProjectDetailResponse(projectName);
      setMessages(prev => [...prev, response]);
      return;
    }

    // Generate response for intent-based actions
    const response = generateResponse(action);
    setMessages(prev => [...prev, response]);
  };

  const startProjectInquiry = () => {
    setInquiryStep(1);
    const inquiryMessage: Message = {
      id: generateId(),
      type: 'assistant',
      content: "Let's start with the basics. What's your name?"
    };
    setMessages(prev => [...prev, inquiryMessage]);
  };

  const handleInquiryResponse = (userInput: string): Message => {
    const updatedInquiry = { ...projectInquiry };

    switch (inquiryStep) {
      case 1: // Name
        updatedInquiry.name = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(2);
        return {
          id: generateId(),
          type: 'assistant',
          content: "Thanks! What's your email address?"
        };

      case 2: // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userInput)) {
          return {
            id: generateId(),
            type: 'assistant',
            content: "Please provide a valid email address. What's your email?"
          };
        }
        updatedInquiry.email = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(3);
        return {
          id: generateId(),
          type: 'assistant',
          content: "Great! What's your WhatsApp number? (Optional - you can skip this)"
        };

      case 3: // WhatsApp (optional)
        if (userInput.toLowerCase() !== 'skip' && userInput.toLowerCase() !== 'no') {
          updatedInquiry.whatsapp = userInput;
        }
        setProjectInquiry(updatedInquiry);
        setInquiryStep(4);
        return {
          id: generateId(),
          type: 'assistant',
          content: "What type of project do you need?",
          quickActions: projectTypes.map(type => ({ label: type, action: `project_type_${type}` }))
        };

      case 4: // Project Type
        updatedInquiry.projectType = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(5);
        return {
          id: generateId(),
          type: 'assistant',
          content: "Tell me briefly about your project requirements."
        };

      case 5: // Project Details
        updatedInquiry.details = userInput;
        setProjectInquiry(updatedInquiry);
        setInquiryStep(6);
        return {
          id: generateId(),
          type: 'assistant',
          content: "What's your approximate budget? (Optional)",
          quickActions: budgets.map(budget => ({ label: budget, action: `budget_${budget}` }))
        };

      case 6: // Budget (optional)
        if (!userInput.startsWith("budget_")) {
          updatedInquiry.budget = userInput;
        }
        setProjectInquiry(updatedInquiry);
        setInquiryStep(7);
        return {
          id: generateId(),
          type: 'assistant',
          content: "When would you like to start? (Optional)",
          quickActions: timelines.map(timeline => ({ label: timeline, action: `timeline_${timeline}` }))
        };

      case 7: // Timeline (optional)
        if (!userInput.startsWith("timeline_")) {
          updatedInquiry.timeline = userInput;
        }
        setProjectInquiry(updatedInquiry);
        setInquiryStep(8);
        return showInquirySummary();

      default:
        return generateUnknownResponse();
    }
  };

  const showInquirySummary = (): Message => {
    const { name, email, whatsapp, projectType, details, budget, timeline } = projectInquiry;

    let summary = "**Project Inquiry Summary**\n\n";
    summary += `**Name:** ${name}\n`;
    summary += `**Email:** ${email}\n`;
    if (whatsapp) summary += `**WhatsApp:** ${whatsapp}\n`;
    summary += `**Project:** ${projectType}\n`;
    if (budget) summary += `**Budget:** ${budget}\n`;
    if (timeline) summary += `**Timeline:** ${timeline}\n`;
    summary += `\n**Project Details:**\n${details}\n\n`;
    summary += "How would you like to send this inquiry?";

    return {
      id: generateId(),
      type: 'assistant',
      content: summary,
      quickActions: [
        { label: "Send via WhatsApp", action: "send_whatsapp" },
        { label: "Send via Email", action: "send_email" },
        { label: "Edit Details", action: "start_inquiry" }
      ]
    };
  };

  const openWhatsApp = (inquiry = false) => {
    const { profile } = portfolioKnowledge;
    let message = "";

    if (inquiry && projectInquiry.name) {
      message = `Hello Faizan,%0A%0AI found your portfolio and would like to discuss a project.%0A%0A`;
      message += `Name: ${projectInquiry.name}%0A`;
      message += `Email: ${projectInquiry.email}%0A`;
      if (projectInquiry.whatsapp) message += `WhatsApp: ${projectInquiry.whatsapp}%0A`;
      message += `Project Type: ${projectInquiry.projectType}%0A`;
      if (projectInquiry.budget) message += `Budget: ${projectInquiry.budget}%0A`;
      if (projectInquiry.timeline) message += `Timeline: ${projectInquiry.timeline}%0A`;
      message += `%0AProject Details:%0A${projectInquiry.details}%0A`;
      message += `%0AThank you.`;
    } else {
      message = `Hello Faizan, I found your portfolio and would like to discuss a project.`;
    }

    window.open(`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const openEmail = (inquiry = false) => {
    const { profile } = portfolioKnowledge;
    let subject = "";
    let body = "";

    if (inquiry && projectInquiry.name) {
      subject = encodeURIComponent("New Project Inquiry — Faizan Ali Portfolio");
      body = `Hello Faizan,%0A%0AI found your portfolio and would like to discuss a project.%0A%0A`;
      body += `Name: ${projectInquiry.name}%0A`;
      body += `Email: ${projectInquiry.email}%0A`;
      if (projectInquiry.whatsapp) body += `WhatsApp: ${projectInquiry.whatsapp}%0A`;
      body += `Project Type: ${projectInquiry.projectType}%0A`;
      if (projectInquiry.budget) body += `Budget: ${projectInquiry.budget}%0A`;
      if (projectInquiry.timeline) body += `Timeline: ${projectInquiry.timeline}%0A`;
      body += `%0AProject Details:%0A${projectInquiry.details}%0A`;
      body += `%0AThank you.`;
    } else {
      subject = encodeURIComponent("Project Inquiry from Portfolio");
      body = encodeURIComponent("Hello Faizan, I found your portfolio and would like to discuss a project.");
    }

    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Handle inquiry flow
    if (inquiryStep > 0) {
      setIsTyping(true);
      setTimeout(() => {
        const response = handleInquiryResponse(inputValue);
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // Handle special actions
    if (inputValue.startsWith("project_type_")) {
      const projectType = inputValue.replace("project_type_", "");
      const updatedInquiry = { ...projectInquiry, projectType };
      setProjectInquiry(updatedInquiry);
      setInquiryStep(5);
      setMessages(prev => [...prev, {
        id: generateId(),
        type: 'assistant',
        content: "Tell me briefly about your project requirements."
      }]);
      setInputValue('');
      return;
    }

    if (inputValue.startsWith("budget_")) {
      const budget = inputValue.replace("budget_", "");
      const updatedInquiry = { ...projectInquiry, budget };
      setProjectInquiry(updatedInquiry);
      setInquiryStep(7);
      setMessages(prev => [...prev, {
        id: generateId(),
        type: 'assistant',
        content: "When would you like to start? (Optional)",
        quickActions: timelines.map(timeline => ({ label: timeline, action: `timeline_${timeline}` }))
      }]);
      setInputValue('');
      return;
    }

    if (inputValue.startsWith("timeline_")) {
      const timeline = inputValue.replace("timeline_", "");
      const updatedInquiry = { ...projectInquiry, timeline };
      setProjectInquiry(updatedInquiry);
      setInquiryStep(8);
      const summary = showInquirySummary();
      setMessages(prev => [...prev, summary]);
      setInputValue('');
      return;
    }

    if (inputValue === "send_whatsapp") {
      openWhatsApp(true);
      setInquiryStep(0);
      return;
    }

    if (inputValue === "send_email") {
      openEmail(true);
      setInquiryStep(0);
      return;
    }

    // Generate response for normal messages
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Close chatbot on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Open chat with Faizan's Portfolio Assistant"
        >
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-40 bg-background border border-border rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          } max-h-[80vh]`}
        >
          {/* Header */}
          <div className="bg-gradient-card border-b border-border px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Faizan's Portfolio Assistant</h3>
              {!isMinimized && (
                <p className="text-xs text-muted-foreground">Ask me about Faizan, his work, or hiring.</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                <Minimize2 size={18} />
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

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="h-[440px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>

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

                      {message.quickActions && message.quickActions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.quickActions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickAction(action.action)}
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
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    aria-label="Type your message to the assistant"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;