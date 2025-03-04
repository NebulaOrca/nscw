import React from 'react';

export const LoadingCard: React.FC = () => {
  return (
    <div className="bg-[#2F3136] rounded-xl p-6 shadow-lg border border-gray-700 animate-pulse">
      <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-24 bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};