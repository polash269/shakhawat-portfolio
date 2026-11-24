import type {
  EducationItem,
  ProfileConfig,
  ProjectItem,
  SkillCategory,
  TrainingItem,
} from '../types/portfolio';

/**
 * Centralized Portfolio Content Configuration
 * ---------------------------------------------------------------------------
 * Edit this file to update personal information, add GitHub/LinkedIn URLs,
 * manage projects, adjust skills, or update your CV file path.
 *
 * Social & Project Link Placeholders:
 * - Leave url as "" (or a "PLACEHOLDER_..." string) while a link is unavailable.
 * - Replace "" with a full https:// URL once ready to publish that button.
 */
export const PROFILE_CONFIG: ProfileConfig = {
  name: 'Shakhawat Hossain',
  title: 'Junior AI Automation Developer',
  location: 'Dhaka, Bangladesh',
  email: 'polashmy3@gmail.com',
  phone: '+880 1973-661913',
  phoneHref: 'tel:+8801973661913',
  heroIntro:
    'I build practical AI-powered solutions, intelligent automation workflows, and technology-driven systems. Focused on AI agents, workflow automation, local LLMs, and reliable system integration.',
  heroVisualPath: '/src/assets/images/hero_ai_workstation_1795505409128.jpg',
  cvPublicPath: '/Shakhawat_Hossain_Professional_ATS_CV.pdf',
  cvUploadFilePath: '/public/Shakhawat_Hossain_Professional_ATS_CV.pdf',
  cvFileName: 'Shakhawat_Hossain_Professional_ATS_CV.pdf',
  aboutParagraphs: [
    'Self-taught technology enthusiast focused on AI automation and practical IT systems. I have built and explored projects involving n8n workflow automation, AI assistants, locally hosted large language models, and automated content workflows.',
    'My technical interests include AI automation, AI agents, Linux, Windows administration, networking, REST API integration, and IT support.',
    'I am continuously developing my technical capabilities and seeking opportunities to contribute to practical technology projects.',
  ],
  technicalInterests: [
    'AI Automation',
    'AI Agents',
    'Ubuntu Linux',
    'Windows Administration',
    'Networking',
    'REST API Integration',
    'IT Support',
  ],
  workspaceFocusNodes: [
    {
      id: 'agents',
      label: 'AI Agents',
      summary:
        'Organizing task-oriented AI assistants and multi-agent concepts into structured personal productivity workflows.',
      components: ['Radius AI', 'Task Routing', 'Prompt Structure'],
    },
    {
      id: 'n8n',
      label: 'n8n Pipelines',
      summary:
        'Connecting external services, scheduled triggers, and automated content pipelines using n8n and REST APIs.',
      components: ['n8n', 'Scheduled Triggers', 'REST APIs'],
    },
    {
      id: 'local-llm',
      label: 'Local LLMs',
      summary:
        'Running and interacting with locally hosted large language models using Ollama in private compute environments.',
      components: ['Ollama', 'Local Inference', 'Ubuntu Linux'],
    },
    {
      id: 'systems',
      label: 'Systems & IT',
      summary:
        'Practical foundation spanning Linux and Windows administration, networking fundamentals, and hardware electronics.',
      components: ['Linux & Windows', 'Networking', 'IT Support'],
    },
  ],
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      // Replace with your GitHub profile URL, e.g. 'https://github.com/yourusername'
      url: '',
      placeholderNote: 'GitHub URL placeholder — set in src/data/portfolioData.ts',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      // Replace with your LinkedIn profile URL, e.g. 'https://linkedin.com/in/yourusername'
      url: '',
      placeholderNote: 'LinkedIn URL placeholder — set in src/data/portfolioData.ts',
    },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    summary: 'Orchestrating intelligent workflows, assistants, and agent architectures.',
    skills: [
      'n8n Workflow Automation',
      'AI Assistant Development',
      'AI Agent Concepts',
      'Google AI Studio',
    ],
  },
  {
    id: 'programming-apis',
    title: 'Programming & APIs',
    summary: 'Connecting applications and services through structured pipelines and data layers.',
    skills: [
      'REST API Integration',
      'Workflow Integration',
      'Database Management',
    ],
  },
  {
    id: 'local-ai',
    title: 'Local AI',
    summary: 'Deploying and interacting with private, locally hosted large language models.',
    skills: [
      'Ollama',
      'Local Large Language Models',
    ],
  },
  {
    id: 'linux-it-support',
    title: 'Linux & IT Support',
    summary: 'Administering desktop and server operating systems with hands-on troubleshooting.',
    skills: [
      'Ubuntu Linux',
      'Windows Administration',
      'IT Support',
    ],
  },
  {
    id: 'networking',
    title: 'Networking',
    summary: 'Maintaining reliable connectivity and diagnosing practical network issues.',
    skills: [
      'Networking Fundamentals',
      'Network Troubleshooting',
    ],
  },
];

export const COMPLETED_PROJECTS: ProjectItem[] = [
  {
    id: 'radius-ai',
    index: '01',
    title: 'Radius AI — Personal AI Operating System',
    shortDescription:
      'Designed and developed a personal AI assistant platform focused on organizing AI-powered tasks, managing multiple AI agents, and supporting an integrated productivity system.',
    detailedOverview:
      'Radius AI explores how a unified personal AI workspace can coordinate distinct AI-assisted tasks and multiple agent workflows within a structured productivity system. The focus is on clear task organization and practical everyday interaction.',
    category: 'AI Systems',
    status: 'Completed',
    technologies: ['AI Assistants', 'AI Agent Concepts', 'Workflow Integration', 'Google AI Studio'],
    imagePath: '/src/assets/images/radius_ai_desktop_1795505411189.jpg',
    imageAlt: 'Illustrative desktop workspace visual showing a personal AI dashboard, task management, AI agents, and workflow toggles',
    // Set actual repository or demo URL when ready for public release
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'Centralized organization for AI-powered personal tasks',
      'Structured coordination across multiple AI agent workflows',
      'Designed around an integrated productivity workspace model',
    ],
  },
  {
    id: 'n8n-workflow-automation',
    index: '02',
    title: 'n8n Workflow Automation System',
    shortDescription:
      'Created workflow automation solutions using n8n to connect services, automate repetitive tasks, and build structured automation pipelines.',
    detailedOverview:
      'A suite of practical n8n automation workflows designed to bridge web services, handle repetitive operational steps, and standardize multi-step data routing through visual node pipelines and REST API integrations.',
    category: 'Workflow Automation',
    status: 'Completed',
    technologies: ['n8n', 'REST API Integration', 'Workflow Integration', 'Database Management'],
    imagePath: '/src/assets/images/n8n_workflow_canvas_1795505411337.jpg',
    imageAlt: 'Illustrative n8n-style node workflow automation editor connecting webhook triggers, HTTP API nodes, filters, and outputs',
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'Service-to-service connections built with n8n nodes and REST APIs',
      'Automation of repetitive manual tasks into repeatable pipelines',
      'Modular workflow design allowing straightforward expansion',
    ],
  },
  {
    id: 'local-ai-ollama',
    index: '03',
    title: 'Local AI Assistant — Ollama',
    shortDescription:
      'Set up and explored a locally hosted AI assistant using Ollama, focusing on running and interacting with local large language models.',
    detailedOverview:
      'Configured and evaluated a locally hosted AI assistant powered by Ollama, enabling offline-capable interaction with open-weight large language models without relying exclusively on external cloud endpoints.',
    category: 'Local LLMs',
    status: 'Completed',
    technologies: ['Ollama', 'Local Large Language Models', 'Ubuntu Linux', 'AI Assistant Development'],
    imagePath: '/src/assets/images/ollama_local_env_1795505412688.jpg',
    imageAlt: 'Illustrative local AI development environment showing a developer terminal alongside a local LLM chat and model selector interface',
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'Local model deployment and execution via Ollama',
      'Direct experimentation with local large language model interaction',
      'Privacy-oriented environment running on local system hardware',
    ],
  },
  {
    id: 'facebook-auto-posting',
    index: '04',
    title: 'Facebook Auto-Posting Automation',
    shortDescription:
      'Developed an n8n-based workflow for automating Facebook Page content publishing and scheduled posts.',
    detailedOverview:
      'Built an automated publishing pipeline in n8n to manage scheduled Facebook Page posts, reducing manual posting overhead through structured workflow triggers and API-driven content delivery.',
    category: 'Workflow Automation',
    status: 'Completed',
    technologies: ['n8n', 'REST API Integration', 'Scheduled Workflows', 'Content Automation'],
    imagePath: '/src/assets/images/social_auto_dashboard_1795505412324.jpg',
    imageAlt: 'Illustrative social media automation dashboard displaying a weekly content calendar and scheduled publishing queue',
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'n8n scheduling triggers for consistent publishing cadence',
      'API integration handling automated Facebook Page post submission',
      'Structured workflow sequence from content preparation to publish',
    ],
  },
  {
    id: 'automated-tech-news',
    index: '05',
    title: 'Automated Technology News System',
    shortDescription:
      'Built an automated workflow to collect technology news from online sources, process content, and prepare it for publishing.',
    detailedOverview:
      'An end-to-end automated content pipeline that gathers technology news updates from online feeds, processes and formats the collected entries, and prepares clean output ready for downstream publishing.',
    category: 'Workflow Automation',
    status: 'Completed',
    technologies: ['n8n', 'Workflow Integration', 'REST API Integration', 'Content Processing'],
    imagePath: '/src/assets/images/tech_news_aggregator_1795505412664.jpg',
    imageAlt: 'Illustrative technology news aggregation dashboard showing RSS feeds, content processing stages, and publish-ready articles',
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'Automated collection of technology updates from online sources',
      'Structured content processing and normalization pipeline',
      'Prepared output formatting ready for publishing workflows',
    ],
  },
];

export const IN_DEVELOPMENT_PROJECTS: ProjectItem[] = [
  {
    id: 'ai-multi-agent-system',
    index: '01',
    title: 'AI Multi-Agent System',
    shortDescription:
      'Developing a multi-agent AI platform in which specialized agents can handle different tasks and collaborate through a shared system.',
    detailedOverview:
      'Active research and development focused on coordinating specialized AI agents within a shared architecture so distinct responsibilities can be delegated, executed, and combined reliably.',
    category: 'AI Systems',
    status: 'In Development',
    technologies: ['AI Agent Concepts', 'Workflow Integration', 'REST API Integration'],
    imagePath: '/src/assets/images/multi_agent_orchestration_1795505413227.jpg',
    imageAlt: 'Illustrative multi-agent orchestration visual showing specialized AI agents collaborating via a central coordinator hub',
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'Role-specialized AI agents assigned to focused task domains',
      'Shared coordination layer for inter-agent handoffs and context',
      'Designed for practical extensibility across automation pipelines',
    ],
  },
  {
    id: 'cross-platform-ai-computer-control',
    index: '02',
    title: 'Cross-Platform AI Computer Control System',
    shortDescription:
      'Developing an AI-powered computer interaction system intended to support Windows, Ubuntu Linux, macOS, and ChromeOS environments.',
    detailedOverview:
      'Exploring an AI-driven computer control layer designed to bridge operating system boundaries across desktop environments, combining systems administration familiarity with AI assistant execution.',
    category: 'AI Systems',
    status: 'In Development',
    technologies: ['AI Assistant Development', 'Ubuntu Linux', 'Windows Administration', 'System Integration'],
    targetEnvironments: ['Windows', 'Ubuntu Linux', 'macOS', 'ChromeOS'],
    imagePath: '/src/assets/images/cross_platform_control_1795505414133.jpg',
    imageAlt: 'Illustrative cross-platform computer control setup showing synchronized desktop environments with automated AI cursor paths',
    githubUrl: '',
    liveDemoUrl: '',
    architectureHighlights: [
      'Cross-OS interaction architecture targeting Windows, Ubuntu Linux, macOS, and ChromeOS',
      'Practical focus on bridging AI decision layers with OS-level tasks',
      'Active early-stage systems design and prototyping',
    ],
  },
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    id: 'hsc-science',
    qualification: 'HSC — Science',
    statusOrYear: 'Currently Studying',
    institution: 'Sher-e-Bangla School and College, Dhaka, Bangladesh',
    boardOrBatch: 'HSC Batch: 2027',
  },
  {
    id: 'ssc-electrical',
    qualification: 'SSC — General Electrical Works',
    statusOrYear: 'Passing Year: 2024',
    institution: 'Dhobaura Government Technical School and College',
    boardOrBatch: 'Bangladesh Technical Education Board',
    result: 'GPA: 3.82',
  },
];

export const INDUSTRIAL_TRAINING: TrainingItem = {
  id: 'biddut-taranga-training',
  organization: 'Biddut Taranga',
  role: 'Electrical / Electronics Industrial Trainee',
  duration: '12 weeks total (two separate six-week training periods)',
  classificationNote: 'Industrial Training',
  exposures: [
    'PCB board setup',
    'IPS systems',
    'UPS systems',
    'Inverter systems',
    'Electrical and electronic equipment',
  ],
};
