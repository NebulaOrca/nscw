import { useState, useEffect } from 'react';
import { WaBotData } from '../types';
import { getWaBots, updateWaBots, deleteWaBot, updateWaBot } from '../utils/github';
import { v4 as uuidv4 } from 'uuid';

export function useWaBots() {
  const [waBots, setWaBots] = useState<WaBotData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWaBots();
  }, []);

  const loadWaBots = async () => {
    setLoading(true);
    try {
      const data = await getWaBots();
      setWaBots(data);
    } catch (error) {
      console.error('Error loading WA bots:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWaBot = async (newBot: WaBotData) => {
    const botWithId = { ...newBot, id: uuidv4() };
    const updatedBots = [...waBots, botWithId];
    const success = await updateWaBots(updatedBots);
    
    if (success) {
      setWaBots(updatedBots);
      return true;
    }
    return false;
  };

  const removeWaBot = async (id: string) => {
    const success = await deleteWaBot(id);
    if (success) {
      setWaBots(waBots.filter(b => b.id !== id));
      return true;
    }
    return false;
  };

  const editWaBot = async (bot: WaBotData) => {
    const success = await updateWaBot(bot);
    if (success) {
      setWaBots(waBots.map(b => b.id === bot.id ? bot : b));
      return true;
    }
    return false;
  };

  return { waBots, loading, addWaBot, removeWaBot, editWaBot };
}