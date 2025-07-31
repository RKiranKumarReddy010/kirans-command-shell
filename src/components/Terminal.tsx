import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { CommandProcessor } from './CommandProcessor';
import { ProfileData } from '@/services/ProfileScraper';
import { NanoEditor } from './NanoEditor';

interface TerminalOutput {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

export interface TerminalRef {
  updateProfileData: (data: ProfileData) => void;
}

export const Terminal = forwardRef<TerminalRef>((props, ref) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [nanoEditor, setNanoEditor] = useState<{
    isOpen: boolean;
    filename: string;
    content: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandProcessor = useRef(new CommandProcessor()).current;

  useImperativeHandle(ref, () => ({
    updateProfileData: (data: ProfileData) => {
      commandProcessor.updateProfileData(data);
      setHistory(prev => [
        ...prev,
        { 
          type: 'output', 
          content: '🔄 Profile data updated! Try "about", "repos", or "stats" to see changes.',
          timestamp: new Date() 
        }
      ]);
    }
  }));

  useEffect(() => {
    // Generate welcome message using JavaScript
    const loadWelcomeMessage = async () => {
      try {
        // Generate KIRAN text from JavaScript
        const kiranLines = [
          "██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗",
          "██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║",
          "█████╔╝ ██║██████╔╝███████║██╔██╗ ██║",
          "██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║",
          "██║  ██╗██║██║  ██║██║  ██║██║ ╚████║",
          "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝"
        ];
        
        const welcomeContent = `
                                                                               
                                                                               
                                                                               
                              ${kiranLines[0]}                              
                              ${kiranLines[1]}                              
                              ${kiranLines[2]}                              
                              ${kiranLines[3]}                              
                              ${kiranLines[4]}                              
                              ${kiranLines[5]}                              
                                                                               
                    🤖 Generative-AI Developer Portfolio Terminal 🤖           
                                                                               
  Welcome to my interactive terminal! Type 'help' to see available commands.  
                                                                               
        `;
        
        setHistory([
          {
            type: 'output',
            content: welcomeContent,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error('Error generating welcome message:', error);
        // Fallback to default welcome message
        setHistory([
          {
            type: 'output',
            content: `
                                                                               
                    🤖 Generative-AI Developer Portfolio Terminal 🤖           
                                                                               
  Welcome to my interactive terminal! Type 'help' to see available commands.  
                                                                               
            `,
            timestamp: new Date(),
          },
        ]);
      }
    };

    loadWelcomeMessage();

    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Add command to terminal output
    setHistory(prev => [
      ...prev,
      { type: 'command', content: `$ ${command}`, timestamp: new Date() }
    ]);



    // Handle nano command
    if (command.startsWith('nano ')) {
      const filename = command.substring(5).trim();
      if (filename) {
        setNanoEditor({
          isOpen: true,
          filename,
          content: `# ${filename} - Python file
# Created with nano editor

def hello_world():
    """Simple hello world function"""
    print("Hello, World!")
    return "Hello from Python!"

if __name__ == "__main__":
    hello_world()
`
        });
        return;
      }
    }

    // Process command
    try {
      const result = await commandProcessor.processCommand(command.trim());
      
      // Handle special commands
      if (result === 'CLEAR_TERMINAL') {
        setHistory([]);
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'output', content: result, timestamp: new Date() }
        ]);
      }
    } catch (error) {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Error: ${error}`, timestamp: new Date() }
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const completion = getAutoCompletion(input);
      if (completion.completed) {
        setInput(completion.completed);
      } else if (completion.suggestions.length > 0) {
        // Show suggestions in terminal
        setHistory(prev => [
          ...prev,
          { type: 'output', content: completion.suggestions.join('  '), timestamp: new Date() }
        ]);
      }
    }
  };

  const formatOutput = (output: TerminalOutput) => {
    const lines = output.content.split('\n');
    return lines.map((line, index) => (
      <div key={index} className={getLineClassName(output.type)}>
        {line || '\u00A0'}
      </div>
    ));
  };

  const getLineClassName = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-terminal-prompt terminal-glow';
      case 'error':
        return 'text-terminal-error';
      case 'output':
      default:
        return 'text-terminal-text';
    }
  };

  const getAutoCompletion = (input: string): { completed?: string; suggestions: string[] } => {
    const parts = input.trim().split(' ');
    const command = parts[0]?.toLowerCase() || '';
    
    // All available commands
    const commands = [
      'help', 'about', 'skills', 'projects', 'project', 'contact', 'education',
      'ls', 'cat', 'pwd', 'whoami', 'date', 'clear', 'echo', 'github', 
      'linkedin', 'kaggle', 'topmate', 'curl', 'sudo', 'exit', 'vim', 
      'nano', 'rm', 'history', 'scrape', 'repos', 'repositories', 'stats'
    ];

    // Available files
    const files = [
      'about.txt', 'skills.txt', 'projects.txt', 'contact.txt', 'education.txt'
    ];

    // Available project names
    const projects = [
      'portfolio-terminal', 'ai-agents', 'ai-research', 'web-applications'
    ];

    if (parts.length === 1) {
      // Auto-complete commands
      const matches = commands.filter(cmd => cmd.startsWith(command));
      if (matches.length === 1) {
        return { completed: matches[0], suggestions: [] };
      } else if (matches.length > 1) {
        return { suggestions: matches };
      }
    } else if (parts.length === 2) {
      const secondArg = parts[1]?.toLowerCase() || '';
      
      if (command === 'cat') {
        // Auto-complete file names for cat command
        const matches = files.filter(file => file.startsWith(secondArg));
        if (matches.length === 1) {
          return { completed: `${command} ${matches[0]}`, suggestions: [] };
        } else if (matches.length > 1) {
          return { suggestions: matches };
        }
      } else if (command === 'project') {
        // Auto-complete project names
        const matches = projects.filter(proj => proj.startsWith(secondArg));
        if (matches.length === 1) {
          return { completed: `${command} ${matches[0]}`, suggestions: [] };
        } else if (matches.length > 1) {
          return { suggestions: matches };
        }
      } else if (command === 'ls') {
        // For ls command, suggest directories (simplified)
        const dirs = ['.', '..', '~'];
        const matches = dirs.filter(dir => dir.startsWith(secondArg));
        if (matches.length === 1) {
          return { completed: `${command} ${matches[0]}`, suggestions: [] };
        } else if (matches.length > 1) {
          return { suggestions: matches };
        }
      }
    }

    return { suggestions: [] };
  };



  const handleNanoSave = (content: string) => {
    setHistory(prev => [
      ...prev,
      { type: 'output', content: `File "${nanoEditor?.filename}" saved successfully!`, timestamp: new Date() }
    ]);
  };

  const handleNanoExit = () => {
    setNanoEditor(null);
    setHistory(prev => [
      ...prev,
      { type: 'output', content: `Nano editor closed. File "${nanoEditor?.filename}" was edited.`, timestamp: new Date() }
    ]);
  };

  return (
    <div className="h-screen bg-terminal-bg flex flex-col overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-terminal-bg border-b border-terminal-muted/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-terminal-error rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-warning rounded-full"></div>
          <div className="w-3 h-3 bg-terminal-success rounded-full"></div>
        </div>
        <div className="text-terminal-muted text-sm ml-4">
          kiran@portfolio:~$
        </div>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {history.map((output, index) => (
          <div key={index} className="mb-1">
            {formatOutput(output)}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center mt-2">
          <span className="text-terminal-prompt terminal-glow mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-terminal-text outline-none border-none font-mono caret-terminal-prompt"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="text-terminal-prompt cursor-blink">█</span>
        </div>
      </div>



      {/* Nano Editor */}
      {nanoEditor && (
        <NanoEditor
          filename={nanoEditor.filename}
          initialContent={nanoEditor.content}
          onSave={handleNanoSave}
          onExit={handleNanoExit}
        />
      )}
    </div>
  );
});

Terminal.displayName = 'Terminal';