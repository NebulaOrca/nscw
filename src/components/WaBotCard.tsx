import React from 'react';
import { Download, ShoppingCart } from 'lucide-react';
import { WaBotData } from '../types';

interface Props {
  bot: WaBotData;
}

export const WaBotCard: React.FC<Props> = ({ bot }) => {
  return (
    <div className="bg-[#2F3136] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700">
      <img
        src={bot.imageUrl}
        alt={bot.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <div className="space-y-4">
        <div>
          <h3 className="text-white text-xl font-bold">{bot.name}</h3>
          <p className="text-gray-400">by {bot.creator}</p>
        </div>
        
        <p className="text-gray-300">{bot.description}</p>
        
        <a
          href={bot.buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
            bot.buttonType === 'download'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
          }`}
        >
          {bot.buttonType === 'download' ? (
            <>
              <Download size={20} />
              Download Now
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              Buy Now
            </>
          )}
        </a>
      </div>
    </div>
  );
};