// KIRAN Text Generator using JavaScript
function generateKiranText() {
  const kiranArt = [
    "██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗",
    "██║ ██╔╝██║██╔══██╗██╔══██╗████╗  ██║",
    "█████╔╝ ██║██████╔╝███████║██╔██╗ ██║",
    "██╔═██╗ ██║██╔══██╗██╔══██║██║╚██╗██║",
    "██║  ██╗██║██║  ██║██║  ██║██║ ╚████║",
    "╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝"
  ];
  
  return kiranArt.join('\n');
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateKiranText };
} else {
  window.generateKiranText = generateKiranText;
} 