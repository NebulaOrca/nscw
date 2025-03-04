import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Code2, Bot, Github, Trophy } from 'lucide-react';
import { ScraperCard } from '../components/ScraperCard';
import { WaBotCard } from '../components/WaBotCard';
import { LoadingCard } from '../components/LoadingCard';
import { useScrapers } from '../hooks/useScrapers';
import { useWaBots } from '../hooks/useWaBots';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scrapers' | 'wabots'>('scrapers');
  const [searchQuery, setSearchQuery] = useState('');
  const { scrapers, loading: loadingScrapers } = useScrapers();
  const { waBots, loading: loadingWaBots } = useWaBots();

  const filteredScrapers = scrapers.filter(scraper => 
    scraper.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWaBots = waBots.filter(bot => 
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#36393F] text-white">
      {/* Header */}
      <header className="bg-[#2F3136] border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://pomf2.lain.la/f/b4k5if9w.png"
                alt="SCode Logo"
                className="w-10 h-10"
              />
              <div className="flex items-center gap-2">
                <Code2 className="text-[#5865F2]" size={28} />
                <span className="text-xl font-bold">SCode</span>
              </div>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-[#40444B] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                to="/leaderboard"
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
              >
                <Trophy size={20} />
                <span>Leaderboard</span>
              </Link>
              <Link
                to="/login"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-full font-medium transition-colors duration-300"
              >
                CF-Team
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5865F2] to-[#7289DA] py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Discover Powerful Web Scrapers & WhatsApp Bots
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Find the perfect tools to automate your tasks and enhance your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('scrapers')}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'scrapers'
                    ? 'bg-white text-[#5865F2] shadow-lg'
                    : 'bg-[#4752C4]/50 text-white hover:bg-[#4752C4]'
                }`}
              >
                <Code2 size={20} />
                Web Scrapers
              </button>
              <button
                onClick={() => setActiveTab('wabots')}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'wabots'
                    ? 'bg-white text-[#5865F2] shadow-lg'
                    : 'bg-[#4752C4]/50 text-white hover:bg-[#4752C4]'
                }`}
              >
                <Bot size={20} />
                WhatsApp Bots
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-[#36393F]">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              {activeTab === 'scrapers' ? (
                <>
                  <Code2 className="text-[#5865F2]" size={28} />
                  Web Scrapers
                </>
              ) : (
                <>
                  <Bot className="text-[#5865F2]" size={28} />
                  WhatsApp Bots
                </>
              )}
            </h2>
            <p className="text-gray-300">
              {activeTab === 'scrapers'
                ? 'Powerful web scrapers to extract data from any website'
                : 'Automate your WhatsApp messaging with these powerful bots'}
            </p>
          </div>

          {activeTab === 'scrapers' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingScrapers ? (
                Array(6)
                  .fill(null)
                  .map((_, index) => <LoadingCard key={`loading-scraper-${index}`} />)
              ) : filteredScrapers.length > 0 ? (
                filteredScrapers.map((scraper) => (
                  <ScraperCard key={scraper.id || `scraper-${Math.random().toString(36).substr(2, 9)}`} scraper={scraper} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-400">No scrapers found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loadingWaBots ? (
                Array(6)
                  .fill(null)
                  .map((_, index) => <LoadingCard key={`loading-wabot-${index}`} />)
              ) : filteredWaBots.length > 0 ? (
                filteredWaBots.map((bot) => (
                  <WaBotCard key={bot.id || `wabot-${Math.random().toString(36).substr(2, 9)}`} bot={bot} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-400">No WhatsApp bots found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F3136] border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://pomf2.lain.la/f/b4k5if9w.png"
                alt="SCode Logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold">SCode</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/YoshCasaster"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Github size={24} />
                <span>YoshCasaster</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};