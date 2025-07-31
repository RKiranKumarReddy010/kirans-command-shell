import React, { useState, useEffect, useRef } from 'react';

interface NanoEditorProps {
  filename: string;
  initialContent?: string;
  onSave: (content: string) => void;
  onExit: () => void;
}

export const NanoEditor: React.FC<NanoEditorProps> = ({ 
  filename, 
  initialContent = '', 
  onSave, 
  onExit 
}) => {
  const [content, setContent] = useState(initialContent);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, col: 0 });
  const [statusMessage, setStatusMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lines = content.split('\n');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Ctrl key combinations
    if (e.ctrlKey) {
      e.preventDefault();
      switch (e.key.toLowerCase()) {
        case 'o':
          onSave(content);
          setStatusMessage(`File "${filename}" saved`);
          break;
        case 'x':
          onExit();
          break;
        case 'g':
          setShowHelp(!showHelp);
          break;
        case 'k':
          // Cut line
          cutLine();
          break;
        case 'u':
          // Paste
          pasteText();
          break;
        case 'w':
          // Search
          setStatusMessage('Search: Type your search term and press Enter');
          break;
        case 'a':
          // Go to line
          setStatusMessage('Go to line: Type line number and press Enter');
          break;
        case 'c':
          // Show cursor position
          setStatusMessage(`Line ${cursorPosition.line + 1}, Column ${cursorPosition.col + 1}`);
          break;
        default:
          break;
      }
      return;
    }

    // Handle regular keys
    switch (e.key) {
      case 'Enter':
        insertNewline();
        break;
      case 'Backspace':
        deleteChar();
        break;
      case 'Tab':
        e.preventDefault();
        insertText('    '); // 4 spaces for Python
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveCursor(-1, 0);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveCursor(1, 0);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveCursor(0, -1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveCursor(0, 1);
        break;
      case 'Home':
        e.preventDefault();
        setCursorPosition(prev => ({ ...prev, col: 0 }));
        break;
      case 'End':
        e.preventDefault();
        setCursorPosition(prev => ({ 
          ...prev, 
          col: lines[prev.line]?.length || 0 
        }));
        break;
      case 'PageUp':
        e.preventDefault();
        moveCursor(-10, 0);
        break;
      case 'PageDown':
        e.preventDefault();
        moveCursor(10, 0);
        break;
      default:
        if (e.key.length === 1) {
          insertText(e.key);
        }
        break;
    }
  };

  const moveCursor = (lineDelta: number, colDelta: number) => {
    setCursorPosition(prev => {
      const newLine = Math.max(0, Math.min(lines.length - 1, prev.line + lineDelta));
      const maxCol = lines[newLine]?.length || 0;
      const newCol = Math.max(0, Math.min(maxCol, prev.col + colDelta));
      return { line: newLine, col: newCol };
    });
  };

  const insertText = (text: string) => {
    const newLines = [...lines];
    const line = newLines[cursorPosition.line] || '';
    const newLine = line.slice(0, cursorPosition.col) + text + line.slice(cursorPosition.col);
    newLines[cursorPosition.line] = newLine;
    setContent(newLines.join('\n'));
    setCursorPosition(prev => ({ ...prev, col: prev.col + text.length }));
  };

  const insertNewline = () => {
    const newLines = [...lines];
    const line = newLines[cursorPosition.line] || '';
    const beforeCursor = line.slice(0, cursorPosition.col);
    const afterCursor = line.slice(cursorPosition.col);
    
    // Auto-indent for Python
    const currentIndent = beforeCursor.match(/^\s*/)?.[0] || '';
    let newIndent = currentIndent;
    
    // Increase indent if line ends with colon
    if (afterCursor.trim().startsWith(':')) {
      newIndent = currentIndent + '    ';
    }
    
    newLines[cursorPosition.line] = beforeCursor;
    newLines.splice(cursorPosition.line + 1, 0, newIndent + afterCursor);
    
    setContent(newLines.join('\n'));
    setCursorPosition(prev => ({ line: prev.line + 1, col: newIndent.length }));
  };

  const deleteChar = () => {
    if (cursorPosition.col > 0) {
      const newLines = [...lines];
      const line = newLines[cursorPosition.line] || '';
      const newLine = line.slice(0, cursorPosition.col - 1) + line.slice(cursorPosition.col);
      newLines[cursorPosition.line] = newLine;
      setContent(newLines.join('\n'));
      setCursorPosition(prev => ({ ...prev, col: prev.col - 1 }));
    } else if (cursorPosition.line > 0) {
      // Join with previous line
      const newLines = [...lines];
      const prevLine = newLines[cursorPosition.line - 1] || '';
      const currentLine = newLines[cursorPosition.line] || '';
      newLines[cursorPosition.line - 1] = prevLine + currentLine;
      newLines.splice(cursorPosition.line, 1);
      setContent(newLines.join('\n'));
      setCursorPosition(prev => ({ line: prev.line - 1, col: prevLine.length }));
    }
  };

  const cutLine = () => {
    const line = lines[cursorPosition.line] || '';
    navigator.clipboard.writeText(line);
    
    const newLines = [...lines];
    newLines.splice(cursorPosition.line, 1);
    setContent(newLines.join('\n'));
    setCursorPosition(prev => ({ 
      line: Math.min(prev.line, newLines.length - 1), 
      col: 0 
    }));
    
    setStatusMessage('Line cut to clipboard');
  };

  const pasteText = () => {
    navigator.clipboard.readText().then(text => {
      const newLines = [...lines];
      newLines.splice(cursorPosition.line + 1, 0, text);
      setContent(newLines.join('\n'));
      setCursorPosition(prev => ({ line: prev.line + 1, col: 0 }));
      setStatusMessage('Text pasted');
    });
  };

  const highlightPythonSyntax = (line: string) => {
    return line
      // Keywords
      .replace(/\b(def|class|import|from|as|if|else|elif|for|while|try|except|finally|with|return|yield|break|continue|pass|raise|assert|del|global|nonlocal|lambda|and|or|not|in|is|True|False|None)\b/g, 
        '<span class="text-blue-400 font-semibold">$1</span>')
      // Built-in functions
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round|pow|divmod|all|any|chr|ord|hex|oct|bin|format|repr|eval|exec|compile|hash|id|isinstance|issubclass|getattr|setattr|hasattr|delattr|vars|dir|locals|globals|__import__|open|input|raw_input)\b/g, 
        '<span class="text-green-400">$1</span>')
      // Comments
      .replace(/(#.*)/g, '<span class="text-gray-500 italic">$1</span>')
      // Strings
      .replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/g, 
        '<span class="text-yellow-400">$1</span>')
      // Numbers
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-purple-400">$1</span>')
      // Function calls
      .replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="text-cyan-400">$1</span>(')
      // Decorators
      .replace(/@(\w+)/g, '<span class="text-magenta-400">@$1</span>')
      // Special methods
      .replace(/\b(__\w+__)\b/g, '<span class="text-orange-400">$1</span>');
  };

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono text-sm z-50">
      {/* Nano header */}
      <div className="bg-blue-900 text-white px-4 py-2 border-b border-blue-700">
        <div className="flex justify-between items-center">
          <span className="font-bold">GNU nano {filename}</span>
          <span className="text-xs">File: {filename}</span>
        </div>
      </div>

      {/* Instructions */}
      {showHelp && (
        <div className="bg-blue-800 text-white px-4 py-2 border-b border-blue-600">
          <div className="text-xs space-y-1">
            <div><strong>Nano Editor Commands:</strong></div>
            <div>• <strong>Ctrl+O</strong> - Save file</div>
            <div>• <strong>Ctrl+X</strong> - Exit nano</div>
            <div>• <strong>Ctrl+G</strong> - Toggle this help</div>
            <div>• <strong>Ctrl+K</strong> - Cut current line</div>
            <div>• <strong>Ctrl+U</strong> - Paste text</div>
            <div>• <strong>Ctrl+W</strong> - Search text</div>
            <div>• <strong>Ctrl+A</strong> - Go to line</div>
            <div>• <strong>Ctrl+C</strong> - Show cursor position</div>
            <div>• <strong>Arrow Keys</strong> - Navigate</div>
            <div>• <strong>Home/End</strong> - Start/End of line</div>
            <div>• <strong>Page Up/Down</strong> - Scroll</div>
            <div>• <strong>Tab</strong> - Insert 4 spaces (Python indentation)</div>
          </div>
        </div>
      )}

      {/* Editor area */}
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="bg-gray-900 text-gray-500 px-2 py-1 border-r border-gray-700 overflow-y-auto">
          {lines.map((_, index) => (
            <div key={index} className="text-right text-xs">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-1">
          {lines.map((line, lineIndex) => (
            <div 
              key={lineIndex} 
              className={`whitespace-pre ${
                lineIndex === cursorPosition.line ? 'bg-blue-900' : ''
              }`}
            >
              <span dangerouslySetInnerHTML={{ 
                __html: highlightPythonSyntax(line) 
              }} />
              {lineIndex === cursorPosition.line && (
                <span className="bg-white text-black">█</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Status line */}
      <div className="bg-blue-900 text-white px-4 py-1 border-t border-blue-700 flex justify-between items-center">
        <div className="text-xs">
          {statusMessage || `Line ${cursorPosition.line + 1}, Column ${cursorPosition.col + 1}`}
        </div>
        <div className="text-xs">
          <span className="mr-2">Ctrl+G</span>
          <span className="mr-2">Help</span>
          <span className="mr-2">Ctrl+O</span>
          <span className="mr-2">Save</span>
          <span className="mr-2">Ctrl+X</span>
          <span>Exit</span>
        </div>
      </div>

      {/* Hidden textarea for input handling */}
      <textarea
        ref={textareaRef}
        className="absolute opacity-0 pointer-events-none"
        onKeyDown={handleKeyDown}
        value=""
        readOnly
      />
    </div>
  );
}; 