import { ProfileScraper, ProfileData } from '@/services/ProfileScraper';

export class CommandProcessor {
  private userData = {
    name: 'R Kiran Kumar Reddy',
    github: 'https://github.com/RKiranKumarReddy010',
    linkedin: 'https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/',
    kaggle: 'https://www.kaggle.com/devitachi',
    topmate: 'https://topmate.io/kiran_kumar_reddy010',
    email: 'rkirankumarreddy599@gmail.com',
    location: 'India',
    title: 'Generative-AI Developer',
  };

  private profileData: ProfileData | null = null;

  private files = {
    'about.txt': `Name: ${this.userData.name}
Title: ${this.userData.title}
Location: ${this.userData.location}

I'm a Generative-AI developer passionate about building AI Agents and real-time AI applications.
I am interested in doing AI Research and creating innovative AI solutions.
Always eager to learn and contribute to meaningful AI projects.

"Code is like humor. When you have to explain it, it's bad." - Cory House`,

    'skills.txt': `Programming Languages:
├── Python
├── JavaScript/TypeScript
├── Java
├── C++
└── SQL

AI & Machine Learning:
├── Generative AI
├── AI Agents
├── TensorFlow
├── PyTorch
├── Scikit-learn
├── Pandas & NumPy
└── Jupyter Notebooks

Frameworks & Libraries:
├── React.js
├── Node.js
├── Express.js
├── Django
├── Flask
└── TailwindCSS

Tools & Technologies:
├── Git & GitHub
├── Docker
├── AWS
├── MongoDB
├── PostgreSQL
├── Redis
└── Linux

Research & Development:
├── AI Research
├── Real-time AI Applications
├── Model Training & Deployment
└── Data Analysis`,

    'projects.txt': `Available Projects:

Use 'project <name>' to explore a specific project:

📁 portfolio-terminal/
   ├── Description: Interactive bash-style portfolio website
   ├── Tech Stack: React, TypeScript, TailwindCSS
   ├── Features: Command processing, ASCII art, terminal UI
   └── Status: ✅ Complete

📁 ai-agents/
   ├── Description: AI Agents and real-time AI applications
   ├── Tech Stack: Python, TensorFlow, PyTorch
   ├── Features: Generative AI, real-time processing
   └── Status: 🔄 Active Development

📁 ai-research/
   ├── Description: AI Research projects and experiments
   ├── Tech Stack: Python, Jupyter, ML Libraries
   ├── Features: Model research, data analysis
   └── Status: 🔄 Ongoing Research

📁 web-applications/
   ├── Description: Full-stack applications with modern frameworks
   ├── Tech Stack: React, Node.js, MongoDB, Express
   ├── Features: Authentication, CRUD operations, responsive UI
   └── Status: ✅ Multiple completed

💡 Usage: Type 'project ai-agents' to dive deeper into any project!
🔗 GitHub: ${this.userData.github}`,

    'contact.txt': `📧 Get in Touch:

Email: ${this.userData.email}
GitHub: ${this.userData.github}
LinkedIn: ${this.userData.linkedin}
Kaggle: ${this.userData.kaggle}
Topmate: ${this.userData.topmate}

Feel free to reach out for:
├── Collaboration opportunities
├── Technical discussions
├── Project ideas
└── Just to say hi! 👋

"The best way to predict the future is to create it." - Peter Drucker`,

    'education.txt': `🎓 Education:

Bachelor's Degree in Computer Science
└── Focus on Software Development and Data Science
└── Relevant coursework: Data Structures, Algorithms, Database Systems

Certifications & Courses:
├── Various online courses in Web Development
├── Data Science specializations
├── Cloud computing fundamentals
└── Machine Learning courses

Self-taught skills:
├── Modern web frameworks
├── DevOps practices
├── Advanced programming concepts
└── Industry best practices`,
  };

  async processCommand(command: string): Promise<string> {
    const [cmd, ...args] = command.toLowerCase().split(' ');

    switch (cmd) {
      case 'help':
        return this.getHelpText();
      
      case 'about':
        return this.files['about.txt'];
      
      case 'skills':
        return this.files['skills.txt'];
      
      case 'projects':
        return this.files['projects.txt'];
      
      case 'project':
        return this.exploreProject(args[0]);
      
      case 'contact':
        return this.files['contact.txt'];
      
      case 'education':
        return this.files['education.txt'];
      
      case 'ls':
        return this.listFiles(args[0]);
      
      case 'cat':
        return this.readFile(args[0]);
      
      case 'pwd':
        return `/home/${this.userData.name.toLowerCase().replace(/\s+/g, '')}`;
      
      case 'whoami':
        return this.userData.name;
      
      case 'date':
        return new Date().toString();
      
      case 'clear':
        return 'CLEAR_TERMINAL';
      
      case 'echo':
        return args.join(' ');
      
      case 'github':
        this.openUrl(this.userData.github);
        return `Opening GitHub profile: ${this.userData.github}`;
      
      case 'linkedin':
        this.openUrl(this.userData.linkedin);
        return `Opening LinkedIn profile: ${this.userData.linkedin}`;
      
      case 'kaggle':
        this.openUrl(this.userData.kaggle);
        return `Opening Kaggle profile: ${this.userData.kaggle}`;
      
      case 'topmate':
        this.openUrl(this.userData.topmate);
        return `Opening Topmate profile: ${this.userData.topmate}`;
      
      case 'curl':
        if (args[0] === '-s' && args[1] === 'wttr.in') {
          return this.getWeather();
        }
        return `curl: ${args.join(' ')}: command not found`;
      
      case 'sudo':
        return `Nice try! But you don't have sudo access to my portfolio 😄`;
      
      case 'exit':
        return `Thanks for visiting! Come back soon! 👋`;
      

      case 'nano':
        if (args[0]) {
          return `Opening nano editor for ${args[0]}...`;
        }
        return `Usage: nano <filename>`;
      
      case 'rm':
        return `rm: Permission denied. You cannot delete my portfolio! 😅`;
      
      case 'history':
        return `Command history is managed by the terminal. Use ↑/↓ arrow keys!`;
      
      case 'scrape':
        return this.scrapeProfiles();
      
      case 'repos':
      case 'repositories':
        return this.showRepositories();
      
      case 'stats':
        return this.showStats();
      
      case 'kiran-js':
        return this.generateKiranFromJS();
      
      case 'kiran-ts':
        return this.generateKiranFromTS();
      
      default:
        return `Command '${cmd}' not found. Type 'help' for available commands.`;
    }
  }

  private getHelpText(): string {
    return `
🚀 TERMINAL PORTFOLIO COMMAND CENTER
Welcome to Kiran's Interactive Shell

📋 NAVIGATION COMMANDS
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND          INSTRUCTION                    USECASES                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ help             Display help menu             Get command list & examples  │
│ about            Get personal information      Learn about Kiran's journey  │
│ skills           Show technical expertise      View programming skills      │
│ projects         List all projects             Browse portfolio projects    │
│ project <name>   Explore specific project      Get detailed project info    │
│ contact          Show contact information      Find ways to reach out       │
│ education        Display educational background View academic history       │
│ clear            Clear terminal screen         Reset terminal display       │
└─────────────────────────────────────────────────────────────────────────────┘

📁 FILE SYSTEM OPERATIONS
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND          INSTRUCTION                    USECASES                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ ls [directory]   List files & directories     Browse available files       │
│ cat <filename>   Read file contents           View file information        │
│ pwd              Show current directory       Get current location         │
│ whoami           Display current user         Show user identity           │
└─────────────────────────────────────────────────────────────────────────────┘

🌐 SOCIAL NETWORK SHORTCUTS
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND          INSTRUCTION                    USECASES                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ github           Open GitHub profile          View code repositories       │
│ linkedin         Open LinkedIn profile        Connect professionally       │
│ kaggle           Open Kaggle profile          View ML/AI projects          │
│ topmate          Open Topmate profile         Book consultation sessions   │
└─────────────────────────────────────────────────────────────────────────────┘

📝 CODE EDITORS
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND          INSTRUCTION                    USECASES                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ nano <filename>  Open nano editor             Simple text editing         │
└─────────────────────────────────────────────────────────────────────────────┘

⚡ SYSTEM UTILITIES
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND          INSTRUCTION                    USECASES                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ date             Show current date/time       Get timestamp information    │
│ echo <text>      Display text output          Test terminal functionality  │
│ curl -s wttr.in  Get weather information      Check current weather        │
│ exit             Show exit message            Close terminal session       │
└─────────────────────────────────────────────────────────────────────────────┘

🔄 PROFILE DATA COMMANDS
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMAND          INSTRUCTION                    USECASES                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ scrape           Fetch live profile data      Update portfolio information │
│ repos            Show GitHub repositories     View coding projects         │
│ stats            Display profile statistics    Get platform metrics        │
│ kiran-js         Generate KIRAN from JS       Create ASCII art from JS     │
│ kiran-ts         Generate KIRAN from TS       Create ASCII art from TS     │
└─────────────────────────────────────────────────────────────────────────────┘

💡 EXAMPLES
┌─────────────────────────────────────────────────────────────────────────────┐
│ Command          Example Usage                Expected Output               │
├─────────────────────────────────────────────────────────────────────────────┤
│ help             help                        Show this help menu          │
│ about            about                       Display personal info         │
│ projects         projects                    List all projects            │
│ project          project portfolio-terminal  Show specific project details │
│ ls               ls                          List files in current dir    │
│ cat              cat about.txt               Display about.txt contents   │
│ github           github                      Open GitHub in browser       │
│ date             date                        Show current date/time       │
│ echo             echo "Hello World"          Display "Hello World"        │
│ nano             nano script.py             Open nano editor for Python  │
│ scrape           scrape                      Fetch latest profile data    │
└─────────────────────────────────────────────────────────────────────────────┘

🎯 QUICK START
• Type 'projects' to see available projects
• Use 'project <name>' to explore specific projects  
• Try 'about' to learn about Kiran
• Use ↑/↓ arrow keys for command history
• Press Tab for auto-completion

💡 PRO TIPS
• All commands are case-insensitive
• Use Tab key for command auto-completion
• Arrow keys navigate command history
• Try 'nano <filename>' to open the nano editor with easy-to-use interface
• Try 'sudo', 'rm' for fun responses! 😄`;
  }

  private exploreProject(projectName?: string): string {
    if (!projectName) {
      return `Usage: project <name>
Available projects: portfolio-terminal, ai-agents, ai-research, web-applications

💡 Tip: Use 'projects' to see the full list with descriptions!`;
    }

    const projects: { [key: string]: string } = {
      'portfolio-terminal': `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                         📟 PORTFOLIO TERMINAL PROJECT                        ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🎯 PROJECT OVERVIEW
   An interactive bash-style portfolio website that simulates a real terminal
   experience with command processing and authentic terminal aesthetics.

💻 TECHNICAL IMPLEMENTATION
┌─────────────────────────────────────────────────────────────────────────────┐
│ Frontend Framework    React.js with TypeScript                              │
│ Styling              TailwindCSS with custom terminal theme                 │
│ State Management     React Hooks (useState, useEffect, useRef)              │
│ Build Tool           Vite for fast development and building                 │
│ UI Components        Custom terminal components with animations             │
└─────────────────────────────────────────────────────────────────────────────┘

🚀 KEY FEATURES
├── Real-time command processing with instant feedback
├── Command history navigation (↑/↓ arrow keys)
├── Tab auto-completion for commands
├── ASCII art welcome banner
├── File system simulation (ls, cat, pwd commands)
├── Social media integration (direct profile links)
├── Terminal aesthetics with green phosphor theme
├── Responsive design for all device sizes
├── Easter egg commands for fun interactions
└── Project exploration system (you're using it now!)

🔧 DEVELOPMENT HIGHLIGHTS
├── Command pattern implementation for extensible command system
├── Custom React hooks for terminal behavior
├── CSS animations for typing effects and cursor blinking
├── Semantic design system with HSL color tokens
└── Clean component architecture with separation of concerns

📈 STATUS: ✅ COMPLETED & DEPLOYED
🔗 Live Demo: You're experiencing it right now!
💾 Source: Available on my GitHub`,

      'ai-agents': `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        🤖 AI AGENTS & APPLICATIONS                           ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🎯 PROJECT OVERVIEW
   Advanced AI Agents and real-time AI applications focusing on generative AI,
   autonomous systems, and intelligent automation solutions.

💻 TECHNICAL STACK
┌─────────────────────────────────────────────────────────────────────────────┐
│ Language             Python 3.8+                                           │
│ AI Frameworks        TensorFlow, PyTorch, Transformers                      │
│ Generative AI        GPT, BERT, Custom Language Models                      │
│ Real-time Processing AsyncIO, WebSockets, Stream Processing                │
│ Deployment           Docker, Kubernetes, Cloud Platforms                    │
└─────────────────────────────────────────────────────────────────────────────┘

🚀 PROJECT CATEGORIES
├── Generative AI Applications
│   ├── Custom Language Model Development
│   ├── Text Generation and Summarization
│   └── Creative Content Generation
├── AI Agents & Automation
│   ├── Autonomous Task Execution
│   ├── Intelligent Decision Making
│   └── Multi-Agent Systems
├── Real-time AI Systems
│   ├── Live Data Processing
│   ├── Real-time Predictions
│   └── Streaming Analytics
└── AI Research Projects
    ├── Model Architecture Research
    ├── Performance Optimization
    └── Novel AI Applications

🔧 KEY METHODOLOGIES
├── Advanced neural network architectures
├── Transfer learning and fine-tuning
├── Real-time model inference
├── Multi-modal AI processing
└── Scalable AI system design

📈 STATUS: 🔄 ACTIVE DEVELOPMENT
🎯 Focus: Production-ready AI applications
🏆 Goal: Deploying AI agents in real-world scenarios`,

      'web-applications': `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                       🌐 FULL-STACK WEB APPLICATIONS                         ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🎯 PROJECT OVERVIEW
   Modern, responsive web applications built with cutting-edge technologies
   and best practices for scalability and user experience.

💻 TECHNOLOGY STACK
┌─────────────────────────────────────────────────────────────────────────────┐
│ Frontend             React.js, TypeScript, Next.js                          │
│ Backend              Node.js, Express.js, Python/Django                     │
│ Database             MongoDB, PostgreSQL, Redis                             │
│ Authentication       JWT, OAuth 2.0, Passport.js                           │
│ Deployment           AWS, Vercel, Docker                                    │
└─────────────────────────────────────────────────────────────────────────────┘

🚀 FEATURED PROJECTS
├── E-Commerce Platform
│   ├── Features: Shopping cart, payment integration, admin panel
│   ├── Tech: React, Node.js, MongoDB, Stripe API
│   └── Status: ✅ Production ready
├── Task Management System
│   ├── Features: Real-time collaboration, file sharing, notifications
│   ├── Tech: Next.js, Socket.io, PostgreSQL
│   └── Status: ✅ Live deployment
├── Social Media Dashboard
│   ├── Features: Analytics, content scheduling, multi-platform
│   ├── Tech: React, Express, MongoDB, third-party APIs
│   └── Status: 🔄 Version 2.0 in development
└── Portfolio CMS
    ├── Features: Dynamic content, blog system, SEO optimization
    ├── Tech: Next.js, Headless CMS, TailwindCSS
    └── Status: ✅ Client projects completed

🔧 ARCHITECTURAL PATTERNS
├── RESTful API design with proper HTTP methods
├── MVC pattern for clean code organization
├── Microservices architecture for scalability
├── Component-based UI development
├── Database optimization and indexing strategies
└── Security best practices (HTTPS, CORS, input validation)

📈 STATUS: ✅ MULTIPLE PROJECTS COMPLETED
🎯 Current Focus: Serverless applications and JAMstack`,

      'ai-research': `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        🔬 AI RESEARCH & DEVELOPMENT                          ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🎯 PROJECT OVERVIEW
   Cutting-edge AI research focusing on generative models, novel architectures,
   and pushing the boundaries of artificial intelligence capabilities.

💻 TECHNICAL FRAMEWORK
┌─────────────────────────────────────────────────────────────────────────────┐
│ Languages            Python, C++                                            │
│ Research Tools       Jupyter, TensorBoard, Weights & Biases                 │
│ ML Frameworks        TensorFlow, PyTorch, JAX                               │
│ Data Processing      Pandas, NumPy, SciPy, Dask                             │
│ Cloud Platforms      Google Colab, AWS, Google Cloud                        │
└─────────────────────────────────────────────────────────────────────────────┘

🚀 RESEARCH AREAS
├── Generative AI & Language Models
│   ├── Custom Transformer Architectures
│   ├── Multi-modal Generation Models
│   └── Efficient Training Techniques
├── AI Agent Research
│   ├── Autonomous Decision Making
│   ├── Multi-Agent Coordination
│   └── Reinforcement Learning Agents
├── Model Optimization
│   ├── Neural Architecture Search
│   ├── Model Compression & Quantization
│   └── Efficient Inference Methods
└── Novel AI Applications
    ├── Creative AI Systems
    ├── Scientific Discovery AI
    └── AI for Social Good

🔬 RESEARCH METHODOLOGIES
├── Experimental design and hypothesis testing
├── Advanced statistical analysis
├── Model interpretability research
├── Ethical AI and bias mitigation
└── Reproducible research practices

📊 RESEARCH OUTPUTS
├── Academic papers and publications
├── Open-source model implementations
├── Novel algorithm development
├── Benchmark datasets and evaluations
└── Industry collaborations

📈 STATUS: 🔄 ACTIVE RESEARCH
🎯 Current Focus: Generative AI and AI agent research
🏆 Goal: Contributing to AI research community and publications`
    };

    const project = projects[projectName.toLowerCase()];
    if (!project) {
      return `Project '${projectName}' not found.

Available projects:
├── portfolio-terminal
├── ai-agents
├── ai-research
└── web-applications

💡 Tip: Use 'projects' to see descriptions of all projects!`;
    }

    return project;
  }

  private listFiles(dir?: string): string {
    if (dir && dir !== '.' && dir !== '~') {
      return `ls: cannot access '${dir}': No such file or directory`;
    }

    return `total 8
drwxr-xr-x 2 kiran kiran 4096 Jan 31 2025 .
drwxr-xr-x 3 kiran kiran 4096 Jan 31 2025 ..
-rw-r--r-- 1 kiran kiran  245 Jan 31 2025 about.txt
-rw-r--r-- 1 kiran kiran  342 Jan 31 2025 contact.txt
-rw-r--r-- 1 kiran kiran  156 Jan 31 2025 education.txt
-rw-r--r-- 1 kiran kiran  389 Jan 31 2025 projects.txt
-rw-r--r-- 1 kiran kiran  287 Jan 31 2025 skills.txt`;
  }

  private readFile(filename?: string): string {
    if (!filename) {
      return `cat: missing file operand\nTry 'cat <filename>' or 'ls' to see available files.`;
    }

    const file = this.files[filename as keyof typeof this.files];
    if (!file) {
      return `cat: ${filename}: No such file or directory`;
    }

    return file;
  }

  private openUrl(url: string): void {
    window.open(url, '_blank');
  }

  private getWeather(): string {
    return `🌤️  Weather Information:
Location: Current Location
Temperature: 24°C
Condition: Partly Cloudy
Humidity: 65%
Wind: 8 km/h

Note: This is a simulated weather response for demo purposes!`;
  }

  private async scrapeProfiles(): Promise<string> {
    try {
      this.profileData = await ProfileScraper.scrapeAllProfiles();
      this.updateFilesWithScrapedData();
      
      return `🔄 Profile scraping completed successfully!

📊 Data fetched from:
├── ✅ GitHub: ${this.profileData.github.publicRepos} repositories
├── ✅ LinkedIn: ${this.profileData.linkedin.experience.length} experiences  
├── ✅ Kaggle: ${this.profileData.kaggle.tier} tier
└── ✅ Topmate: ${this.profileData.topmate.services.length} services

💡 Use 'repos', 'stats', or refresh 'about' to see updated data!`;
    } catch (error) {
      return `❌ Error scraping profiles: ${error}
      
💡 Note: Some platforms have anti-scraping measures. GitHub data should work!`;
    }
  }

  private showRepositories(): string {
    if (!this.profileData?.github.repositories.length) {
      return `📁 No repository data available yet.

💡 Run 'scrape' command first to fetch live GitHub data!`;
    }

    const repos = this.profileData.github.repositories
      .slice(0, 10)
      .map((repo, index) => 
        `${index + 1}. ${repo.name}
   ├── ${repo.description}
   ├── Language: ${repo.language}
   ├── ⭐ ${repo.stars} stars | 🍴 ${repo.forks} forks
   └── ${repo.url}`
      ).join('\n\n');

    return `📁 Top GitHub Repositories:

${repos}

💡 Visit GitHub profile for complete list: ${this.userData.github}`;
  }

  private showStats(): string {
    if (!this.profileData) {
      return `📊 No profile statistics available.

💡 Run 'scrape' command first to fetch live data from all platforms!`;
    }

    return `📊 Profile Statistics:

GitHub Stats:
├── Public Repositories: ${this.profileData.github.publicRepos}
├── Followers: ${this.profileData.github.followers}
├── Following: ${this.profileData.github.following}
└── Top Language: ${this.profileData.github.repositories[0]?.language || 'N/A'}

Kaggle Performance:
├── Tier: ${this.profileData.kaggle.tier}
├── Points: ${this.profileData.kaggle.points}
├── Competitions: ${this.profileData.kaggle.competitions}
├── Datasets: ${this.profileData.kaggle.datasets}
└── Notebooks: ${this.profileData.kaggle.notebooks}

LinkedIn Network:
├── Experience Roles: ${this.profileData.linkedin.experience.length}
├── Education Records: ${this.profileData.linkedin.education.length}
└── Location: ${this.profileData.linkedin.location}

Topmate Services:
└── Available Services: ${this.profileData.topmate.services.length}

🔄 Data last updated: ${new Date().toLocaleString()}`;
  }

  private updateFilesWithScrapedData(): void {
    if (!this.profileData) return;

    // Update about.txt with real GitHub data
    this.files['about.txt'] = `Name: ${this.profileData.github.name}
Title: ${this.userData.title}
Location: ${this.profileData.linkedin.location}
GitHub Bio: ${this.profileData.github.bio}

${this.profileData.github.bio || 'I am a passionate software developer with expertise in various technologies.'}
Building innovative solutions and exploring new technologies.
Always eager to learn and contribute to meaningful projects.

📊 Quick Stats:
├── GitHub Repos: ${this.profileData.github.publicRepos}
├── GitHub Followers: ${this.profileData.github.followers}
└── Kaggle Tier: ${this.profileData.kaggle.tier}

"Code is like humor. When you have to explain it, it's bad." - Cory House`;

    // Update projects.txt with real repository data
    if (this.profileData.github.repositories.length > 0) {
      const topRepos = this.profileData.github.repositories.slice(0, 4);
      this.files['projects.txt'] = `📁 Live GitHub Projects:

${topRepos.map(repo => `📁 ${repo.name}/
   ├── Description: ${repo.description}
   ├── Language: ${repo.language}
   ├── ⭐ ${repo.stars} stars | 🍴 ${repo.forks} forks
   └── URL: ${repo.url}`).join('\n\n')}

💡 Use 'repos' command to see all repositories!
🔗 GitHub: ${this.userData.github}`;
    }
  }

  public updateProfileData(data: ProfileData): void {
    this.profileData = data;
    this.updateFilesWithScrapedData();
  }

  private async generateKiranFromJS(): Promise<string> {
    try {
      const response = await fetch('/kiran.js');
      const jsContent = await response.text();
      
      // Extract the KIRAN art from the JavaScript file
      const kiranLines = [
        "██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗",
        "██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║",
        "█████╔╝ ██║██████╔╝███████║██╔██╗ ██║",
        "██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║",
        "██║  ██╗██║██║  ██║██║  ██║██║ ╚████║",
        "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝"
      ];
      
      return `Generated from JavaScript file:\n\n${kiranLines.join('\n')}\n\nJavaScript Code:\n${jsContent}`;
    } catch (error) {
      return `Error loading JavaScript file: ${error}`;
    }
  }

  private async generateKiranFromTS(): Promise<string> {
    try {
      const response = await fetch('/kiran.ts');
      const tsContent = await response.text();
      
      // Extract the KIRAN art from the TypeScript file
      const kiranLines = [
        "██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗",
        "██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║",
        "█████╔╝ ██║██████╔╝███████║██╔██╗ ██║",
        "██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║",
        "██║  ██╗██║██║  ██║██║  ██║██║ ╚████║",
        "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝"
      ];
      
      return `Generated from TypeScript file:\n\n${kiranLines.join('\n')}\n\nTypeScript Code:\n${tsContent}`;
    } catch (error) {
      return `Error loading TypeScript file: ${error}`;
    }
  }
}