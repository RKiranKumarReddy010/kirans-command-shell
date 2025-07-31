export interface ProfileData {
  github: {
    name: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
    repositories: Array<{
      name: string;
      description: string;
      language: string;
      stars: number;
      forks: number;
      url: string;
    }>;
  };
  linkedin: {
    name: string;
    headline: string;
    location: string;
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      school: string;
      degree: string;
      duration: string;
    }>;
  };
  kaggle: {
    username: string;
    tier: string;
    points: number;
    competitions: number;
    datasets: number;
    notebooks: number;
  };
  topmate: {
    name: string;
    description: string;
    services: Array<{
      title: string;
      price: string;
      duration: string;
    }>;
  };
}

export class ProfileScraper {
  private static cache: ProfileData | null = null;
  private static cacheTimestamp: number = 0;
  private static CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

  static async scrapeAllProfiles(): Promise<ProfileData> {
    // Check cache first
    if (this.cache && Date.now() - this.cacheTimestamp < this.CACHE_DURATION) {
      return this.cache;
    }

    console.log('Scraping all profiles...');
    
    const [github, linkedin, kaggle, topmate] = await Promise.allSettled([
      this.scrapeGitHub(),
      this.scrapeLinkedIn(),
      this.scrapeKaggle(),
      this.scrapeTopmate()
    ]);

    const profileData: ProfileData = {
      github: github.status === 'fulfilled' ? github.value : this.getDefaultGitHub(),
      linkedin: linkedin.status === 'fulfilled' ? linkedin.value : this.getDefaultLinkedIn(),
      kaggle: kaggle.status === 'fulfilled' ? kaggle.value : this.getDefaultKaggle(),
      topmate: topmate.status === 'fulfilled' ? topmate.value : this.getDefaultTopmate()
    };

    this.cache = profileData;
    this.cacheTimestamp = Date.now();
    
    return profileData;
  }

  private static async scrapeGitHub() {
    try {
      console.log('Fetching GitHub data...');
      const username = 'RKiranKumarReddy010';
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      
      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`);
      const reposData = await reposResponse.json();
      
      return {
        name: userData.name || 'R Kiran Kumar Reddy',
        bio: userData.bio || 'Software Developer passionate about technology',
        followers: userData.followers || 0,
        following: userData.following || 0,
        publicRepos: userData.public_repos || 0,
        repositories: reposData.map((repo: any) => ({
          name: repo.name,
          description: repo.description || 'No description available',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          url: repo.html_url
        }))
      };
    } catch (error) {
      console.error('Error scraping GitHub:', error);
      return this.getDefaultGitHub();
    }
  }

  private static async scrapeLinkedIn() {
    try {
      // LinkedIn scraping is complex due to anti-bot measures
      // For now, return structured default data that can be manually updated
      console.log('LinkedIn scraping not implemented due to anti-bot measures');
      return this.getDefaultLinkedIn();
    } catch (error) {
      console.error('Error scraping LinkedIn:', error);
      return this.getDefaultLinkedIn();
    }
  }

  private static async scrapeKaggle() {
    try {
      console.log('Kaggle scraping not implemented - using default data');
      return this.getDefaultKaggle();
    } catch (error) {
      console.error('Error scraping Kaggle:', error);
      return this.getDefaultKaggle();
    }
  }

  private static async scrapeTopmate() {
    try {
      console.log('Topmate scraping not implemented - using default data');
      return this.getDefaultTopmate();
    } catch (error) {
      console.error('Error scraping Topmate:', error);
      return this.getDefaultTopmate();
    }
  }

  private static getDefaultGitHub() {
    return {
      name: 'R Kiran Kumar Reddy',
      bio: 'Software Developer passionate about technology',
      followers: 0,
      following: 0,
      publicRepos: 0,
      repositories: [
        {
          name: 'portfolio-terminal',
          description: 'Interactive terminal-style portfolio',
          language: 'TypeScript',
          stars: 0,
          forks: 0,
          url: 'https://github.com/RKiranKumarReddy010'
        }
      ]
    };
  }

  private static getDefaultLinkedIn() {
    return {
      name: 'R Kiran Kumar Reddy',
      headline: 'Software Developer | Technology Enthusiast',
      location: 'India',
      experience: [
        {
          title: 'Software Developer',
          company: 'Tech Company',
          duration: '2023 - Present',
          description: 'Developing innovative software solutions'
        }
      ],
      education: [
        {
          school: 'University',
          degree: 'Computer Science',
          duration: '2020 - 2024'
        }
      ]
    };
  }

  private static getDefaultKaggle() {
    return {
      username: 'devitachi',
      tier: 'Contributor',
      points: 0,
      competitions: 0,
      datasets: 0,
      notebooks: 0
    };
  }

  private static getDefaultTopmate() {
    return {
      name: 'Kiran Kumar Reddy',
      description: 'Software Developer offering mentorship and consultation',
      services: [
        {
          title: '1:1 Mentorship',
          price: '$50',
          duration: '1 hour'
        },
        {
          title: 'Code Review',
          price: '$30',
          duration: '30 minutes'
        }
      ]
    };
  }
}