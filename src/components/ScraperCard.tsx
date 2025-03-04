import React, { useState } from 'react';
import { Copy, ExternalLink, Code2, ChevronDown, ChevronUp, User } from 'lucide-react';
import { ScraperData } from '../types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import toast from 'react-hot-toast';

SyntaxHighlighter.registerLanguage('javascript', js);

interface Props {
  scraper: ScraperData;
}

export const ScraperCard: React.FC<Props> = ({ scraper }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(scraper.code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="bg-[#2F3136] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white text-xl font-bold mb-2">{scraper.title}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <User size={16} />
              <span>{scraper.creator}</span>
            </div>
          </div>
          <Code2 className="text-[#5865F2]" size={24} />
        </div>
        
        <p className="text-gray-300">{scraper.description}</p>
      </div>

      {/* Expandable Section */}
      <div className="border-t border-gray-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-3 flex items-center justify-between text-gray-300 hover:bg-[#36393F] transition-colors"
        >
          <span className="font-medium">View Code</span>
          {isExpanded ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {/* Code Section */}
        <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          <div className="p-6 pt-2">
            <div className="relative rounded-lg overflow-hidden">
              {isFollowed && (
                <div className="mb-3">
                  <button
                    onClick={copyToClipboard}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <Copy size={18} />
                    Copy Code
                  </button>
                </div>
              )}
              
              <div className={`transition-all duration-500 ${!isFollowed ? 'blur-sm' : ''}`}>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneDark}
                    className="rounded-lg !m-0 !p-4"
                    customStyle={{
                      fontSize: '14px',
                      lineHeight: '1.5',
                      background: '#2F3136'
                    }}
                  >
                    {scraper.code}
                  </SyntaxHighlighter>
                </div>
              </div>
              
              {!isFollowed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(scraper.creatorUrl, '_blank');
                      setIsFollowed(true);
                    }}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl flex items-center gap-2 transform hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink size={20} />
                    Follow Creator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};