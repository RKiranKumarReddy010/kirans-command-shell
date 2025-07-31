import React, { useState, useEffect, useRef } from 'react';
import { CommandProcessor } from './CommandProcessor';

interface TerminalOutput {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: Date;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandProcessor = new CommandProcessor();

  useEffect(() => {
    // Show welcome message
    setHistory([
      {
        type: 'output',
        content: `
 ██████╗ ██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗    ██████╗ ███████╗██████╗ ██████╗ ██╗   ██╗
██╔══██╗██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║    ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝
██████╔╝█████╔╝ ██║██████╔╝███████║██╔██╗ ██║    ██████╔╝█████╗  ██║  ██║██║  ██║ ╚████╔╝ 
██╔══██╗██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║    ██╔══██╗██╔══╝  ██║  ██║██║  ██║  ╚██╔╝  
██║  ██║██║  ██╗██║██║  ██║██║  ██║██║ ╚████║    ██║  ██║███████╗██████╔╝██████╔╝   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═════╝    ╚═╝   

Welcome to R Kiran Kumar Reddy's Portfolio Terminal!
Type 'help' to see available commands.
        `,
        timestamp: new Date(),
      },
    ]);

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
      // Simple auto-complete for common commands
      const commands = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'ls', 'cat'];
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
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
    </div>
  );
};