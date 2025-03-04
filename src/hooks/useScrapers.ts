import { useState, useEffect } from 'react';
import { ScraperData } from '../types';
import { getScrapers, updateScrapers, deleteScraper, updateScraper } from '../utils/github';
import { v4 as uuidv4 } from 'uuid';

export function useScrapers() {
  const [scrapers, setScrapers] = useState<ScraperData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScrapers();
  }, []);

  const loadScrapers = async () => {
    setLoading(true);
    try {
      const data = await getScrapers();
      setScrapers(data);
    } catch (error) {
      console.error('Error loading scrapers:', error);
    } finally {
      setLoading(false);
    }
  };

  const addScraper = async (newScraper: ScraperData) => {
    const scraperWithId = { ...newScraper, id: uuidv4() };
    const updatedScrapers = [...scrapers, scraperWithId];
    const success = await updateScrapers(updatedScrapers);
    
    if (success) {
      setScrapers(updatedScrapers);
      return true;
    }
    return false;
  };

  const removeScraper = async (id: string) => {
    const success = await deleteScraper(id);
    if (success) {
      setScrapers(scrapers.filter(s => s.id !== id));
      return true;
    }
    return false;
  };

  const editScraper = async (scraper: ScraperData) => {
    const success = await updateScraper(scraper);
    if (success) {
      setScrapers(scrapers.map(s => s.id === scraper.id ? scraper : s));
      return true;
    }
    return false;
  };

  return { scrapers, loading, addScraper, removeScraper, editScraper };
}