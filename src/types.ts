export interface User {
  username: string;
  password: string;
}

export interface ScraperData {
  id?: string;
  title: string;
  description: string;
  creator: string;
  code: string;
  creatorUrl: string;
}

export interface WaBotData {
  id?: string;
  name: string;
  description: string;
  creator: string;
  imageUrl: string;
  buttonType: 'download' | 'buy';
  buttonUrl: string;
}

export interface GitHubFileResponse {
  content: string;
  sha: string;
}

export interface CreatorStats {
  name: string;
  avatarUrl: string;
  scrapers: number;
  waBots: number;
  totalContributions: number;
  rank: number;
}