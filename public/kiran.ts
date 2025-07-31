// KIRAN Text Generator using TypeScript
interface KiranArt {
  lines: string[];
  generate(): string;
}

class KiranTextGenerator implements KiranArt {
  lines: string[] = [
    "██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗",
    "██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║",
    "█████╔╝ ██║██████╔╝███████║██╔██╗ ██║",
    "██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║",
    "██║  ██╗██║██║  ██║██║  ██║██║ ╚████║",
    "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝"
  ];

  generate(): string {
    return this.lines.join('\n');
  }

  // Method to center the text
  generateCentered(width: number = 80): string {
    const centeredLines = this.lines.map(line => {
      const padding = Math.max(0, Math.floor((width - line.length) / 2));
      return ' '.repeat(padding) + line;
    });
    return centeredLines.join('\n');
  }
}

// Create instance
const kiranGenerator = new KiranTextGenerator();

// Export for use in other files
export { KiranTextGenerator, kiranGenerator };
export default kiranGenerator; 