import { Terminal } from '@/components/Terminal';
import { DataScraper } from '@/components/DataScraper';
import { ProfileData } from '@/services/ProfileScraper';
import { useState, useRef } from 'react';

const Index = () => {
  const terminalRef = useRef<{ updateProfileData: (data: ProfileData) => void }>(null);
  const [showScraper, setShowScraper] = useState(false);

  const handleDataUpdate = (data: ProfileData) => {
    terminalRef.current?.updateProfileData(data);
    setShowScraper(false);
  };

  return (
    <div className="relative h-screen">
      <Terminal ref={terminalRef} />
      
      {/* Floating scraper button */}
      <button
        onClick={() => setShowScraper(!showScraper)}
        className="fixed top-4 right-4 bg-terminal-green text-terminal-bg px-4 py-2 rounded font-mono text-sm hover:bg-terminal-green/80 transition-colors z-10"
      >
        {showScraper ? '✕ Close' : '🔄 Scrape Data'}
      </button>

      {/* Floating scraper panel */}
      {showScraper && (
        <div className="fixed top-16 right-4 w-96 z-20 animate-in slide-in-from-right">
          <DataScraper onDataUpdate={handleDataUpdate} />
        </div>
      )}
    </div>
  );
};

export default Index;
