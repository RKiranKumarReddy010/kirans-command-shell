import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { ProfileScraper, ProfileData } from '@/services/ProfileScraper';

interface DataScraperProps {
  onDataUpdate: (data: ProfileData) => void;
}

export const DataScraper = ({ onDataUpdate }: DataScraperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<ProfileData | null>(null);
  const { toast } = useToast();

  const handleScrapeData = async () => {
    setIsLoading(true);
    setProgress(0);
    
    try {
      toast({
        title: "Starting data scrape",
        description: "Fetching data from your profiles...",
        duration: 3000,
      });

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const data = await ProfileScraper.scrapeAllProfiles();
      
      clearInterval(progressInterval);
      setProgress(100);
      setScrapedData(data);
      onDataUpdate(data);

      toast({
        title: "Data scraping complete!",
        description: "Your profile data has been updated in the terminal",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error scraping data:', error);
      toast({
        title: "Error",
        description: "Failed to scrape profile data",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-terminal-bg border-terminal-green/20">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-mono font-bold text-terminal-green mb-2">
            Profile Data Scraper
          </h3>
          <p className="text-terminal-text text-sm">
            Fetch real data from GitHub, LinkedIn, Kaggle, and Topmate
          </p>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-terminal-text text-sm text-center">
              Scraping profiles... {progress}%
            </p>
          </div>
        )}

        <Button
          onClick={handleScrapeData}
          disabled={isLoading}
          className="w-full bg-terminal-green text-terminal-bg hover:bg-terminal-green/80 font-mono"
        >
          {isLoading ? "Scraping..." : "Scrape Profile Data"}
        </Button>

        {scrapedData && (
          <div className="mt-4 space-y-2 text-sm font-mono">
            <div className="text-terminal-green">✓ GitHub: {scrapedData.github.publicRepos} repos</div>
            <div className="text-terminal-green">✓ LinkedIn: {scrapedData.linkedin.experience.length} experiences</div>
            <div className="text-terminal-green">✓ Kaggle: {scrapedData.kaggle.tier} tier</div>
            <div className="text-terminal-green">✓ Topmate: {scrapedData.topmate.services.length} services</div>
          </div>
        )}
      </div>
    </Card>
  );
};