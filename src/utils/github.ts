import { Octokit } from '@octokit/rest';
import { GitHubFileResponse, ScraperData, User, WaBotData } from '../types';
import { v4 as uuidv4 } from 'uuid';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

const owner = 'NamaGithub';
const repo = 'NamaRepo';

export async function getUsers(): Promise<User[]> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'user.json',
    });

    const fileContent = (response.data as GitHubFileResponse).content;
    const decodedContent = atob(fileContent);
    const userData = JSON.parse(decodedContent);
    return userData.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function getScrapers(): Promise<ScraperData[]> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database.json',
    });

    const fileContent = (response.data as GitHubFileResponse).content;
    const decodedContent = atob(fileContent);
    return JSON.parse(decodedContent);
  } catch (error) {
    console.error('Error fetching scrapers:', error);
    return [];
  }
}

export async function getWaBots(): Promise<WaBotData[]> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database2.json',
    });

    const fileContent = (response.data as GitHubFileResponse).content;
    const decodedContent = atob(fileContent);
    return JSON.parse(decodedContent);
  } catch (error) {
    console.error('Error fetching WA bots:', error);
    return [];
  }
}

export async function updateScrapers(scrapers: ScraperData[]): Promise<boolean> {
  try {
    const currentFile = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database.json',
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'database.json',
      message: 'Update scrapers data',
      content: btoa(JSON.stringify(scrapers, null, 2)),
      sha: (currentFile.data as GitHubFileResponse).sha,
    });

    return true;
  } catch (error) {
    console.error('Error updating scrapers:', error);
    return false;
  }
}

export async function updateWaBots(bots: WaBotData[]): Promise<boolean> {
  try {
    const currentFile = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database2.json',
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'database2.json',
      message: 'Update WA bots data',
      content: btoa(JSON.stringify(bots, null, 2)),
      sha: (currentFile.data as GitHubFileResponse).sha,
    });

    return true;
  } catch (error) {
    console.error('Error updating WA bots:', error);
    return false;
  }
}

export async function deleteScraper(id: string): Promise<boolean> {
  try {
    const scrapers = await getScrapers();
    const updatedScrapers = scrapers.filter(scraper => scraper.id !== id);
    return await updateScrapers(updatedScrapers);
  } catch (error) {
    console.error('Error deleting scraper:', error);
    return false;
  }
}

export async function deleteWaBot(id: string): Promise<boolean> {
  try {
    const bots = await getWaBots();
    const updatedBots = bots.filter(bot => bot.id !== id);
    return await updateWaBots(updatedBots);
  } catch (error) {
    console.error('Error deleting WA bot:', error);
    return false;
  }
}

export async function updateScraper(scraper: ScraperData): Promise<boolean> {
  try {
    const scrapers = await getScrapers();
    const updatedScrapers = scrapers.map(s => s.id === scraper.id ? scraper : s);
    return await updateScrapers(updatedScrapers);
  } catch (error) {
    console.error('Error updating scraper:', error);
    return false;
  }
}

export async function updateWaBot(bot: WaBotData): Promise<boolean> {
  try {
    const bots = await getWaBots();
    const updatedBots = bots.map(b => b.id === bot.id ? bot : b);
    return await updateWaBots(updatedBots);
  } catch (error) {
    console.error('Error updating WA bot:', error);
    return false;
  }
}