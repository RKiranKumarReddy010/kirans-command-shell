export class CommandProcessor {
  private userData = {
    name: 'R Kiran Kumar Reddy',
    github: 'https://github.com/RKiranKumarReddy010',
    linkedin: 'https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/',
    kaggle: 'https://www.kaggle.com/devitachi',
    topmate: 'https://topmate.io/kiran_kumar_reddy010',
    email: 'rkiran.dev@gmail.com',
    location: 'India',
    title: 'Software Developer',
  };

  private files = {
    'about.txt': `Name: ${this.userData.name}
Title: ${this.userData.title}
Location: ${this.userData.location}

I am a passionate software developer with expertise in various technologies.
I love building innovative solutions and exploring new technologies.
Always eager to learn and contribute to meaningful projects.

"Code is like humor. When you have to explain it, it's bad." - Cory House`,

    'skills.txt': `Programming Languages:
├── JavaScript/TypeScript
├── Python
├── Java
├── C++
└── SQL

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

Data Science & ML:
├── Pandas
├── NumPy
├── Scikit-learn
├── TensorFlow
└── Jupyter Notebooks`,

    'projects.txt': `Available Projects:

Use 'project <name>' to explore a specific project:

📁 portfolio-terminal/
   ├── Description: Interactive bash-style portfolio website
   ├── Tech Stack: React, TypeScript, TailwindCSS
   ├── Features: Command processing, ASCII art, terminal UI
   └── Status: ✅ Complete

📁 data-analysis/
   ├── Description: Various Kaggle competitions and datasets
   ├── Tech Stack: Python, Pandas, Matplotlib, Seaborn
   ├── Features: Data visualization, statistical analysis
   └── Status: 🔄 Ongoing

📁 web-applications/
   ├── Description: Full-stack applications with modern frameworks
   ├── Tech Stack: React, Node.js, MongoDB, Express
   ├── Features: Authentication, CRUD operations, responsive UI
   └── Status: ✅ Multiple completed

📁 ml-models/
   ├── Description: Machine learning and predictive models
   ├── Tech Stack: Python, Scikit-learn, TensorFlow, Jupyter
   ├── Features: Model training, data preprocessing, evaluation
   └── Status: 🔄 Research phase

💡 Usage: Type 'project portfolio-terminal' to dive deeper into any project!
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
      
      case 'vim':
      case 'nano':
        return `${cmd}: Editor not available in this terminal. Everything here is read-only!`;
      
      case 'rm':
        return `rm: Permission denied. You cannot delete my portfolio! 😅`;
      
      case 'history':
        return `Command history is managed by the terminal. Use ↑/↓ arrow keys!`;
      
      default:
        return `Command '${cmd}' not found. Type 'help' for available commands.`;
    }
  }

  private getHelpText(): string {
    return `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    🚀 TERMINAL PORTFOLIO COMMAND CENTER 🚀                   ║
║                        Welcome to Kiran's Interactive Shell                   ║
╚═══════════════════════════════════════════════════════════════════════════════╝

📋 NAVIGATION COMMANDS
┌─────────────────────────────────────────────────────────────────────────────┐
│ help             Display this awesome help menu                             │
│ about            Get to know me and my journey                              │
│ skills           Explore my technical expertise                             │
│ projects         List all my projects                                       │
│ project <name>   Dive deep into a specific project                          │
│ contact          Find all my contact information                            │
│ education        View my educational background                             │
│ clear            Clear the terminal screen                                  │
└─────────────────────────────────────────────────────────────────────────────┘

📁 FILE SYSTEM OPERATIONS
┌─────────────────────────────────────────────────────────────────────────────┐
│ ls [directory]   List files and directories                                 │
│ cat <filename>   Read file contents                                         │
│ pwd              Show current working directory                             │
│ whoami           Display current user                                       │
└─────────────────────────────────────────────────────────────────────────────┘

🌐 SOCIAL NETWORK SHORTCUTS
┌─────────────────────────────────────────────────────────────────────────────┐
│ github           Open my GitHub profile                                     │
│ linkedin         Open my LinkedIn profile                                   │
│ kaggle           Open my Kaggle profile                                     │
│ topmate          Open my Topmate profile                                    │
└─────────────────────────────────────────────────────────────────────────────┘

⚡ SYSTEM UTILITIES
┌─────────────────────────────────────────────────────────────────────────────┐
│ date             Display current date and time                              │
│ echo <text>      Echo text to the terminal                                  │
│ curl -s wttr.in  Check weather information                                  │
│ exit             Display exit message                                       │
└─────────────────────────────────────────────────────────────────────────────┘

💡 PRO TIPS & SHORTCUTS
┌─────────────────────────────────────────────────────────────────────────────┐
│ ↑/↓ Arrow Keys  Navigate through command history                            │
│ Tab Key          Auto-complete commands                                     │
│ Case Insensitive All commands work in any case                              │
│ Quick Projects   Try: project portfolio-terminal                           │
└─────────────────────────────────────────────────────────────────────────────┘

🎭 EASTER EGGS (Try these for fun!)
┌─────────────────────────────────────────────────────────────────────────────┐
│ sudo, vim, nano, rm   ...and discover hidden responses! 😄                  │
└─────────────────────────────────────────────────────────────────────────────┘

🎯 GET STARTED: Type 'projects' to see what I've built, then use 'project <name>'
   to explore any project in detail!`;
  }

  private exploreProject(projectName?: string): string {
    if (!projectName) {
      return `Usage: project <name>
Available projects: portfolio-terminal, data-analysis, web-applications, ml-models

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

      'data-analysis': `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                        📊 DATA ANALYSIS PROJECTS                             ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🎯 PROJECT OVERVIEW
   Collection of data science projects focusing on real-world datasets,
   statistical analysis, and machine learning applications.

💻 TECHNICAL STACK
┌─────────────────────────────────────────────────────────────────────────────┐
│ Language             Python 3.8+                                           │
│ Data Processing      Pandas, NumPy                                          │
│ Visualization        Matplotlib, Seaborn, Plotly                           │
│ ML Libraries         Scikit-learn, TensorFlow                               │
│ Environment          Jupyter Notebooks, Google Colab                       │
└─────────────────────────────────────────────────────────────────────────────┘

🚀 PROJECT CATEGORIES
├── Kaggle Competitions
│   ├── Titanic Survival Prediction (Top 15%)
│   ├── House Prices Prediction (Advanced Regression)
│   └── Customer Segmentation Analysis
├── Exploratory Data Analysis
│   ├── E-commerce Sales Analysis
│   ├── Social Media Engagement Metrics
│   └── Financial Market Trends
├── Machine Learning Applications
│   ├── Sentiment Analysis on Product Reviews
│   ├── Recommendation Systems
│   └── Time Series Forecasting
└── Data Visualization Projects
    ├── Interactive Dashboards
    ├── Geographic Data Mapping
    └── Statistical Report Generation

🔧 KEY METHODOLOGIES
├── Data cleaning and preprocessing pipelines
├── Feature engineering and selection techniques
├── Cross-validation and model evaluation metrics
├── Hyperparameter tuning and optimization
└── Statistical significance testing

📈 STATUS: 🔄 ACTIVELY DEVELOPING
🏆 Achievements: Multiple Kaggle competition entries
📊 Notebooks: 20+ comprehensive analysis notebooks`,

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

      'ml-models': `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                     🤖 MACHINE LEARNING MODELS                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

🎯 PROJECT OVERVIEW
   Advanced machine learning projects focusing on predictive modeling,
   deep learning, and AI-powered solutions for real-world problems.

💻 TECHNICAL FRAMEWORK
┌─────────────────────────────────────────────────────────────────────────────┐
│ Languages            Python, R                                              │
│ ML Frameworks        TensorFlow, PyTorch, Scikit-learn                      │
│ Data Processing      Pandas, NumPy, SciPy                                   │
│ Visualization        Matplotlib, Seaborn, TensorBoard                       │
│ Cloud Platforms      Google Colab, AWS SageMaker                            │
└─────────────────────────────────────────────────────────────────────────────┘

🚀 MODEL CATEGORIES
├── Supervised Learning
│   ├── Classification Models (Random Forest, SVM, Neural Networks)
│   ├── Regression Analysis (Linear, Polynomial, Ridge, Lasso)
│   └── Ensemble Methods (Gradient Boosting, XGBoost)
├── Unsupervised Learning
│   ├── Clustering Algorithms (K-Means, DBSCAN, Hierarchical)
│   ├── Dimensionality Reduction (PCA, t-SNE, UMAP)
│   └── Association Rule Mining
├── Deep Learning
│   ├── Convolutional Neural Networks (Image Classification)
│   ├── Recurrent Neural Networks (Time Series, NLP)
│   └── Transformer Models (BERT, GPT applications)
└── Specialized Applications
    ├── Natural Language Processing
    ├── Computer Vision
    └── Recommendation Systems

🔬 RESEARCH AREAS
├── Model interpretability and explainable AI
├── Transfer learning and fine-tuning techniques
├── Hyperparameter optimization strategies
├── Model deployment and MLOps practices
└── Ethical AI and bias detection

📊 PERFORMANCE METRICS
├── Accuracy, Precision, Recall, F1-Score
├── ROC-AUC and Precision-Recall curves
├── Cross-validation and holdout testing
├── Statistical significance testing
└── Business impact measurement

📈 STATUS: 🔄 RESEARCH & DEVELOPMENT PHASE
🎯 Current Focus: Deploying models to production environments
🏆 Goal: Contributing to open-source ML projects`
    };

    const project = projects[projectName.toLowerCase()];
    if (!project) {
      return `Project '${projectName}' not found.

Available projects:
├── portfolio-terminal
├── data-analysis  
├── web-applications
└── ml-models

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
}