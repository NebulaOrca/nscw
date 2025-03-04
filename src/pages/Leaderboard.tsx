import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code2, Trophy, Medal, Search, Github, User } from 'lucide-react';
import { useScrapers } from '../hooks/useScrapers';
import { useWaBots } from '../hooks/useWaBots';
import { CreatorStats } from '../types';

export const Leaderboard: React.FC = () => {
  const { scrapers } = useScrapers();
  const { waBots } = useWaBots();
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState<CreatorStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (scrapers.length > 0 || waBots.length > 0) {
      calculateCreatorStats();
    }
  }, [scrapers, waBots]);

  const calculateCreatorStats = () => {
    setLoading(true);
    
    const creatorMap = new Map<string, CreatorStats>();
    
    scrapers.forEach(scraper => {
      if (!creatorMap.has(scraper.creator)) {
        creatorMap.set(scraper.creator, {
          name: scraper.creator,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(scraper.creator)}&background=5865F2&color=fff`,
          scrapers: 0,
          waBots: 0,
          totalContributions: 0,
          rank: 0
        });
      }
      
      const creatorStats = creatorMap.get(scraper.creator)!;
      creatorStats.scrapers += 1;
      creatorStats.totalContributions += 1;
    });
    
    waBots.forEach(bot => {
      if (!creatorMap.has(bot.creator)) {
        creatorMap.set(bot.creator, {
          name: bot.creator,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(bot.creator)}&background=5865F2&color=fff`,
          scrapers: 0,
          waBots: 0,
          totalContributions: 0,
          rank: 0
        });
      }
      
      const creatorStats = creatorMap.get(bot.creator)!;
      creatorStats.waBots += 1;
      creatorStats.totalContributions += 1;
    });
    
    const sortedCreators = Array.from(creatorMap.values())
      .sort((a, b) => b.totalContributions - a.totalContributions);
    
    sortedCreators.forEach((creator, index) => {
      creator.rank = index + 1;
    });
    
    setCreators(sortedCreators);
    setLoading(false);
  };

  const filteredCreators = creators.filter(creator => 
    creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="text-yellow-400" size={24} />;
    } else if (rank === 2) {
      return <Medal className="text-gray-400" size={24} />;
    } else if (rank === 3) {
      return <Medal className="text-amber-700" size={24} />;
    } else {
      return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#36393F] text-white">
      {/* Header */}
      <header className="bg-[#2F3136] border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="flex items-center gap-2 ml-2">
                <img
                  src="https://pomf2.lain.la/f/b4k5if9w.png"
                  alt="SCode Logo"
                  className="w-8 h-8"
                />
                <Code2 className="text-[#5865F2]" size={24} />
              </div>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-[#40444B] text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5865F2] border border-gray-700"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5865F2] to-[#7289DA] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Creator Leaderboard
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Recognizing our top contributors who make SCode better every day
            </p>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-12 bg-[#36393F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#2F3136] rounded-xl border border-gray-700 shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="text-[#5865F2]" size={24} />
                  Top Contributors
                </h2>
                <p className="text-gray-300 mt-1">
                  Ranked by total number of contributions
                </p>
              </div>

              {loading ? (
                <div className="p-12 flex justify-center">
                  <div className="w-12 h-12 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredCreators.length > 0 ? (
                <div className="divide-y divide-gray-700">
                  {filteredCreators.map((creator) => (
                    <div key={creator.name} className="p-4 sm:p-6 hover:bg-[#36393F] transition-colors">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                          {getRankBadge(creator.rank)}
                        </div>
                        
                        <div className="flex-shrink-0">
                          <img
                            src={creator.avatarUrl}
                            alt={creator.name}
                            className="w-12 h-12 rounded-full border-2 border-[#5865F2]"
                          />
                        </div>
                        
                        <div className="flex-grow text-center sm:text-left">
                          <h3 className="text-xl font-semibold">{creator.name}</h3>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-gray-300 justify-center sm:justify-start">
                            <div className="flex items-center gap-1">
                              <Code2 size={16} className="text-[#5865F2]" />
                              <span>{creator.scrapers} Scrapers</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={16} className="text-[#5865F2]" />
                              <span>{creator.waBots} WA Bots</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0 bg-[#5865F2] px-4 py-2 rounded-full mt-4 sm:mt-0">
                          <span className="font-bold">{creator.totalContributions}</span>
                          <span className="text-sm ml-1">contributions</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-xl text-gray-400">No creators found matching your search.</p>
                </div>
              )}
            </div>
          </div>
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