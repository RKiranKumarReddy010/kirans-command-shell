██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗
██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║
█████╔╝ ██║██████╔╝███████║██╔██╗ ██║
██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║
██║  ██╗██║██║  ██║██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝

🤖 Generative-AI Developer Portfolio Terminal
```

# 🚀 Interactive Terminal Portfolio

A modern, interactive terminal-style portfolio website built with React, TypeScript, and TailwindCSS. Experience a realistic terminal interface that showcases my skills, projects, and professional information through command-line interactions.

## ✨ Features

### 🎯 **Interactive Terminal Experience**
- **Realistic Command Processing** - Type commands just like a real terminal
- **Command History** - Navigate through previous commands with arrow keys
- **Auto-completion** - Tab key for smart command suggestions
- **ASCII Art Welcome** - Dynamic KIRAN logo generation

### 📋 **Portfolio Commands**
- `help` - Display comprehensive command menu
- `about` - Learn about my background and journey
- `skills` - View technical expertise and technologies
- `projects` - Browse portfolio projects
- `contact` - Get in touch information
- `education` - Academic background and certifications

### 🌐 **Social Integration**
- `github` - Direct link to GitHub profile
- `linkedin` - Professional networking
- `kaggle` - Machine Learning projects
- `topmate` - Consultation bookings

### 📁 **File System Simulation**
- `ls` - List available files
- `cat <filename>` - Read file contents
- `pwd` - Show current directory
- `whoami` - Display user information

### 📝 **Code Editor Integration**
- `nano <filename>` - Built-in nano editor for Python coding
- **Python Syntax Highlighting** - Color-coded code display
- **Auto-indentation** - Smart Python indentation
- **Save & Exit** - Full editor functionality

### ⚡ **System Utilities**
- `date` - Current date and time
- `echo` - Text output display
- `curl -s wttr.in` - Weather information
- `clear` - Terminal screen clearing

### 🔄 **Live Data Features**
- `scrape` - Fetch live profile data from platforms
- `repos` - Display GitHub repositories
- `stats` - Show platform statistics
- `kiran-js/ts` - Generate ASCII art from code files

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **Vite** - Fast build tool

### **Key Libraries**
- **React Hooks** - State management
- **Custom Terminal Theme** - Authentic terminal aesthetics
- **ASCII Art Generation** - Dynamic logo creation
- **Profile Scraping** - Live data integration

### **Development Tools**
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RKiranKumarReddy010/portfolio-terminal.git
   cd portfolio-terminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🎮 Usage Guide

### **Getting Started**
1. Open the terminal interface
2. Type `help` to see all available commands
3. Explore different sections using navigation commands
4. Try the nano editor with `nano script.py`

### **Essential Commands**
```bash
help                    # Show command menu
about                   # Learn about me
skills                  # View technical skills
projects                # Browse projects
project ai-agents       # Explore specific project
contact                 # Get contact information
nano script.py          # Open code editor
github                  # Visit GitHub profile
scrape                  # Fetch live data
```

### **Terminal Navigation**
- **↑/↓ Arrow Keys** - Navigate command history
- **Tab** - Auto-complete commands
- **Enter** - Execute commands
- **Ctrl+C** - Clear current input

## 🎨 Customization

### **Personal Information**
Update your details in `src/components/CommandProcessor.ts`:
```typescript
private userData = {
  name: 'Your Name',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-profile',
  email: 'your-email@example.com',
  // ... other details
};
```

### **Adding New Commands**
1. Add command case in `processCommand()` method
2. Update help text in `getHelpText()` method
3. Add to auto-completion in `getAutoCompletion()` method

### **Styling**
- Modify terminal theme in `tailwind.config.js`
- Update colors in `src/index.css`
- Customize ASCII art in welcome message

## 📁 Project Structure

```
portfolio-terminal/
├── src/
│   ├── components/
│   │   ├── Terminal.tsx          # Main terminal component
│   │   ├── CommandProcessor.ts   # Command handling logic
│   │   ├── NanoEditor.tsx        # Code editor component
│   │   └── ui/                   # UI components
│   ├── services/
│   │   └── ProfileScraper.ts     # Data scraping service
│   ├── pages/
│   │   └── Index.tsx             # Main page
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── README.md                     # This file
```

## 🔧 Development

### **Adding New Features**
1. **New Commands**: Extend `CommandProcessor` class
2. **UI Components**: Create in `src/components/`
3. **Styling**: Use TailwindCSS classes
4. **Data**: Integrate with `ProfileScraper` service

### **Code Style**
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add proper error handling

## 🌟 Key Features Explained

### **Command Processing System**
The terminal uses a sophisticated command processing system that:
- Parses user input into commands and arguments
- Provides intelligent auto-completion
- Maintains command history
- Handles special commands and utilities

### **Real-time Data Integration**
- Fetches live data from GitHub, LinkedIn, Kaggle
- Updates portfolio information dynamically
- Displays real-time statistics and metrics
- Maintains data consistency across platforms

### **Responsive Design**
- Works seamlessly on desktop, tablet, and mobile
- Maintains terminal aesthetics across devices
- Optimized for different screen sizes
- Touch-friendly interface for mobile users

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: rkirankumarreddy599@gmail.com
- **GitHub**: [@RKiranKumarReddy010](https://github.com/RKiranKumarReddy010)
- **LinkedIn**: [R Kiran Kumar Reddy](https://www.linkedin.com/in/r-kiran-kumar-reddy-54400230b/)
- **Kaggle**: [devitachi](https://www.kaggle.com/devitachi)
- **Topmate**: [kiran_kumar_reddy010](https://topmate.io/kiran_kumar_reddy010)

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **TailwindCSS** - For the utility-first CSS framework
- **Vite** - For the fast build tool
- **ASCII Art Community** - For inspiration on terminal aesthetics

---

**Made with ❤️ by R Kiran Kumar Reddy**

*"Code is like humor. When you have to explain it, it's bad." - Cory House*
