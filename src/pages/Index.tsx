import { Terminal } from '@/components/Terminal';
import { ProfileData } from '@/services/ProfileScraper';
import { useRef } from 'react';

const Index = () => {
  const terminalRef = useRef<{ updateProfileData: (data: ProfileData) => void }>(null);

  return (
    <div className="relative h-screen">
      <Terminal ref={terminalRef} />
    </div>
  );
};

export default Index;
