const DEFAULT_PROFILE = {
  name: "Ahteshamul",
  title: "Senior Full-Stack Developer",
  shortBio: "Passionate developer crafting high-performance web applications, premium admin dashboards, and beautiful user interfaces with seamless micro-animations.",
  aboutMe: "I am a professional software engineer with a strong track record of delivering clean, scalable, and responsive web applications. Over the years, I have helped clients scale their platforms, optimize database performance, and build elegant user experiences. I specialize in the React ecosystem, Node.js, Express, and database management, ensuring every project is highly performant and user-friendly.",
  workPhilosophy: "I believe in writing clear, maintainable code rather than clever hacks. I prioritize communication and transparency, making sure my clients are fully updated via regular check-ins and demo builds.",
  skillsFrontend: "React.js, Next.js, Tailwind CSS, Redux Toolkit, Zustand, HTML5 & CSS3, TypeScript",
  skillsBackend: "Node.js, Express.js, PostgreSQL, MongoDB, Redis, RESTful APIs, GraphQL",
  skillsDevops: "Git & GitHub, Docker, Linux Terminal, Vercel / Render, Postman, CI/CD, Figma",
  email: "ahtesam@example.com",
  phone: "+880 1712-345678",
  whatsapp: "https://wa.me/8801712345678",
  linkedin: "https://linkedin.com/in/ahtesam",
  github: "https://github.com/ahtesam",
  location: "Dhaka, Bangladesh",
  resumeUrl: "#",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60", // High-quality mockup profile image
  stats: {
    experienceYears: "5+",
    projectsCompleted: "45+",
    happyClients: "30+",
    successRate: "99%"
  }
};

const DEFAULT_SERVICES = [
  {
    id: "serv-1",
    title: "Web Development",
    description: "Building fast, SEO-friendly single-page and server-side rendered web applications using React, Next.js, and Node.js.",
    iconName: "Code",
    price: "Starting at $500"
  },
  {
    id: "serv-2",
    title: "Dashboard & Admin Panels",
    description: "Developing complex administrative dashboards with real-time statistics, state management, and detailed metrics.",
    iconName: "LayoutDashboard",
    price: "Starting at $800"
  },
  {
    id: "serv-3",
    title: "API & Backend Integration",
    description: "Designing robust, secure, and documented RESTful and GraphQL APIs with advanced caching and background workers.",
    iconName: "Server",
    price: "Starting at $400"
  },
  {
    id: "serv-4",
    title: "UI/UX Implementation",
    description: "Converting high-fidelity Figma designs into responsive, interactive frontend experiences using modern styling frameworks.",
    iconName: "Figma",
    price: "Starting at $300"
  }
];

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "SpeedRing Notification Engine",
    description: "A highly scalable notification backend system handling millions of real-time push events, emails, and SMS with fallback logic.",
    type: "client",
    category: "Backend",
    techStack: ["Node.js", "Express", "TypeScript", "Redis", "Docker"],
    liveUrl: "https://example.com/speedring",
    githubUrl: "https://github.com/ahtesam/speedring-backend",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60"
    ],
    status: "Completed",
    date: "2026-04"
  },
  {
    id: "proj-2",
    title: "Interactive Finance Dashboard",
    description: "A premium glassmorphic analytics dashboard showing financial projections, transaction listings, and user management features.",
    type: "personal",
    category: "Fullstack",
    techStack: ["React", "Vite", "Tailwind CSS", "Zustand", "Chart.js"],
    liveUrl: "https://example.com/finance",
    githubUrl: "https://github.com/ahtesam/finance-dashboard",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60"
    ],
    status: "Completed",
    date: "2026-02"
  },
  {
    id: "proj-3",
    title: "AI Chat Assistant Interface",
    description: "A responsive chat UI featuring streaming markdown replies, custom tools integrations, and thread persistence.",
    type: "personal",
    category: "Frontend",
    techStack: ["React", "Tailwind CSS", "Lucide Icons", "LocalStorage"],
    liveUrl: "https://example.com/ai-chat",
    githubUrl: "https://github.com/ahtesam/ai-chat",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60"
    ],
    status: "In Progress",
    date: "2026-06"
  }
];

const DEFAULT_MESSAGES = [
  {
    id: "msg-1",
    name: "John Doe",
    email: "john@company.com",
    subject: "Collaboration Request",
    message: "Hi Ahtesam, I saw your portfolio and loved your client dashboard work. We need a similar custom backend and dashboard set up. Are you available for a freelance contract?",
    date: "2026-07-06T15:30:00.000Z",
    read: false
  }
];

const DEFAULT_EXPERIENCES = [
  {
    id: "exp-1",
    role: "Lead Full-Stack Freelancer",
    company: "Upwork & Independent Clients",
    period: "2024 - Present",
    description: "Spearheaded frontend redesigns and custom backend architectures for start-ups. Handled project requirements gathering, delivery, database optimization, and deployment."
  },
  {
    id: "exp-2",
    role: "Software Engineer Intern",
    company: "TechSolutions Ltd",
    period: "2023 - 2024",
    description: "Contributed to Node.js backend development, wrote automated unit tests, and developed UI features using React. Collaborated in Agile/Scrum teams."
  }
];

const initStorage = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem("portfolio_profile")) {
    localStorage.setItem("portfolio_profile", JSON.stringify(DEFAULT_PROFILE));
  } else {
    try {
      const existingProfile = localStorage.getItem("portfolio_profile");
      if (existingProfile) {
        let parsed = JSON.parse(existingProfile);
        
        // Auto-migrate female avatar to male avatar if it was the default
        if (parsed.avatarUrl && parsed.avatarUrl.includes("photo-1534528741775-53994a69daeb")) {
          parsed.avatarUrl = DEFAULT_PROFILE.avatarUrl;
        }

        if (parsed && (!parsed.workPhilosophy || !parsed.skillsFrontend)) {
          const upgradedProfile = {
            ...DEFAULT_PROFILE,
            ...parsed,
            workPhilosophy: parsed.workPhilosophy || DEFAULT_PROFILE.workPhilosophy,
            skillsFrontend: parsed.skillsFrontend || DEFAULT_PROFILE.skillsFrontend,
            skillsBackend: parsed.skillsBackend || DEFAULT_PROFILE.skillsBackend,
            skillsDevops: parsed.skillsDevops || DEFAULT_PROFILE.skillsDevops
          };
          localStorage.setItem("portfolio_profile", JSON.stringify(upgradedProfile));
        } else {
          localStorage.setItem("portfolio_profile", JSON.stringify(parsed));
        }
      }
    } catch (e) {}
  }
  if (!localStorage.getItem("portfolio_services")) {
    localStorage.setItem("portfolio_services", JSON.stringify(DEFAULT_SERVICES));
  }
  if (!localStorage.getItem("portfolio_experiences")) {
    localStorage.setItem("portfolio_experiences", JSON.stringify(DEFAULT_EXPERIENCES));
  }

  let resetProjects = false;
  try {
    const existing = localStorage.getItem("portfolio_projects");
    if (existing) {
      const parsed = JSON.parse(existing);
      if (parsed.length > 0 && !parsed[0].images) {
        resetProjects = true;
      }
    }
  } catch (e) {}

  if (!localStorage.getItem("portfolio_projects") || resetProjects) {
    localStorage.setItem("portfolio_projects", JSON.stringify(DEFAULT_PROJECTS));
  }
  if (!localStorage.getItem("portfolio_messages")) {
    localStorage.setItem("portfolio_messages", JSON.stringify(DEFAULT_MESSAGES));
  }
};

export const mockDb = {
  getDefaultProfile: () => DEFAULT_PROFILE,
  getProfile: () => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    initStorage();
    const data = localStorage.getItem("portfolio_profile");
    if (!data) return DEFAULT_PROFILE;
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },
  updateProfile: (profileData) => {
    if (typeof window === 'undefined') return profileData;
    localStorage.setItem("portfolio_profile", JSON.stringify(profileData));
    return profileData;
  },

  getDefaultServices: () => DEFAULT_SERVICES,
  getServices: () => {
    if (typeof window === 'undefined') return DEFAULT_SERVICES;
    initStorage();
    const data = localStorage.getItem("portfolio_services");
    if (!data) return DEFAULT_SERVICES;
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_SERVICES;
    }
  },
  saveService: (service) => {
    if (typeof window === 'undefined') return service;
    const services = mockDb.getServices();
    if (service.id) {
      const idx = services.findIndex(s => s.id === service.id);
      if (idx !== -1) services[idx] = service;
    } else {
      service.id = "serv-" + Date.now();
      services.push(service);
    }
    localStorage.setItem("portfolio_services", JSON.stringify(services));
    return service;
  },
  deleteService: (id) => {
    if (typeof window === 'undefined') return true;
    const services = mockDb.getServices();
    const filtered = services.filter(s => s.id !== id);
    localStorage.setItem("portfolio_services", JSON.stringify(filtered));
    return true;
  },

  getDefaultProjects: () => DEFAULT_PROJECTS,
  getProjects: () => {
    if (typeof window === 'undefined') return DEFAULT_PROJECTS;
    initStorage();
    const data = localStorage.getItem("portfolio_projects");
    if (!data) return DEFAULT_PROJECTS;
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_PROJECTS;
    }
  },
  saveProject: (project) => {
    if (typeof window === 'undefined') return project;
    const projects = mockDb.getProjects();
    if (project.id) {
      const idx = projects.findIndex(p => p.id === project.id);
      if (idx !== -1) projects[idx] = project;
    } else {
      project.id = "proj-" + Date.now();
      projects.push(project);
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
    return project;
  },
  deleteProject: (id) => {
    if (typeof window === 'undefined') return true;
    const projects = mockDb.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem("portfolio_projects", JSON.stringify(filtered));
    return true;
  },

  getMessages: () => {
    if (typeof window === 'undefined') return DEFAULT_MESSAGES;
    initStorage();
    const data = localStorage.getItem("portfolio_messages");
    if (!data) return DEFAULT_MESSAGES;
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_MESSAGES;
    }
  },
  addMessage: (message) => {
    if (typeof window === 'undefined') return message;
    const messages = mockDb.getMessages();
    message.id = "msg-" + Date.now();
    message.date = new Date().toISOString();
    message.read = false;
    messages.unshift(message);
    localStorage.setItem("portfolio_messages", JSON.stringify(messages));
    return message;
  },
  markMessageRead: (id) => {
    if (typeof window === 'undefined') return true;
    const messages = mockDb.getMessages();
    const idx = messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      messages[idx].read = true;
      localStorage.setItem("portfolio_messages", JSON.stringify(messages));
    }
    return true;
  },
  deleteMessage: (id) => {
    if (typeof window === 'undefined') return true;
    const messages = mockDb.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    localStorage.setItem("portfolio_messages", JSON.stringify(filtered));
    return true;
  },

  getDefaultExperiences: () => DEFAULT_EXPERIENCES,
  getExperiences: () => {
    if (typeof window === 'undefined') return DEFAULT_EXPERIENCES;
    initStorage();
    const data = localStorage.getItem("portfolio_experiences");
    if (!data) return DEFAULT_EXPERIENCES;
    try {
      return JSON.parse(data) || [];
    } catch (e) {
      return DEFAULT_EXPERIENCES;
    }
  },
  saveExperience: (expData) => {
    if (typeof window === 'undefined') return expData;
    const list = mockDb.getExperiences();
    if (expData.id) {
      const idx = list.findIndex(e => e.id === expData.id);
      if (idx !== -1) list[idx] = expData;
    } else {
      expData.id = "exp-" + Date.now();
      list.unshift(expData);
    }
    localStorage.setItem("portfolio_experiences", JSON.stringify(list));
    return expData;
  },
  deleteExperience: (id) => {
    if (typeof window === 'undefined') return true;
    const list = mockDb.getExperiences();
    const filtered = list.filter(e => e.id !== id);
    localStorage.setItem("portfolio_experiences", JSON.stringify(filtered));
    return true;
  }
};
