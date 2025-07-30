'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="CoinVision Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-black">CoinVision</span>
      </div>
      <div className="flex gap-6">
        <button 
          onClick={() => router.push('/')}
          className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
        > 
          <img src="/home-icon.png" alt="Home Icon" className="w-6 h-6" />
        </button>
        <button 
          onClick={() => router.push('/dashboard')}
          className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
        > 
          <img src="/back button.png" alt="Back Button" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 