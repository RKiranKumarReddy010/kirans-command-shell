export class CommandProcessor {
  private userData = {
    name: 'R Kiran Kumar Reddy',
    github: 'https://github.com/RKiranKumarReddy010',
    linkedin: 'https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/',
    kaggle: 'https://www.kaggle.com/devitachi',
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

    'projects.txt': `🚀 Notable Projects:

1. Portfolio Terminal
   └── Interactive bash-style portfolio website
   └── Tech: React, TypeScript, TailwindCSS
   
2. Data Analysis Projects
   └── Various Kaggle competitions and datasets
   └── Tech: Python, Pandas, Matplotlib, Seaborn
   
3. Web Applications
   └── Full-stack applications with modern frameworks
   └── Tech: React, Node.js, MongoDB

4. Machine Learning Models
   └── Predictive models and data science projects
   └── Tech: Python, Scikit-learn, TensorFlow

Check out my GitHub for more: ${this.userData.github}`,

    'contact.txt': `📧 Get in Touch:

Email: ${this.userData.email}
GitHub: ${this.userData.github}
LinkedIn: ${this.userData.linkedin}
Kaggle: ${this.userData.kaggle}

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
    return `Available Commands:

Basic Commands:
├── help          Show this help message
├── about         Learn about me
├── skills        View my technical skills
├── projects      See my projects
├── contact       Get my contact information
├── education     View my educational background
└── clear         Clear the terminal

File Operations:
├── ls [dir]      List files and directories
├── cat <file>    Display file contents
├── pwd           Show current directory
└── whoami        Display current user

Social Links:
├── github        Open my GitHub profile
├── linkedin      Open my LinkedIn profile
└── kaggle        Open my Kaggle profile

System Commands:
├── date          Show current date and time
├── echo <text>   Display text
├── curl -s wttr.in  Check weather
└── exit          Exit message

Tips:
├── Use ↑/↓ arrow keys for command history
├── Use Tab for command auto-completion
└── Commands are case-insensitive

Easter Eggs:
Try: sudo, vim, rm, nano for some fun responses! 🎉`;
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