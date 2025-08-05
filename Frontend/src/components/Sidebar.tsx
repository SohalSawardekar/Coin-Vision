'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const router = useRouter();

  return (
    <div
      className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#0A0A57] text-white flex flex-col py-4 transition-all duration-300`}
      style={{ minWidth: sidebarOpen ? '16rem' : '4rem' }}
    >
      <div className="flex items-center justify-center mb-6">
        {/* Logo removed from sidebar */}
      </div>
      {/* Sidebar Toggle Button */}
      <button
        className="px-4 py-2 mb-4 focus:outline-none"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <img src="/sidebar.png" alt="Menu Icon" className="w-6 h-6" />
      </button>
      {/* Sidebar Links */}
      <div className={`flex flex-col h-full justify-between transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col flex-1 justify-evenly divide-y divide-black">
          <button 
            className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" 
            onClick={() => router.push('/dashboard/conv')}
          >
            {sidebarOpen && 'Currency Conversion'}
          </button>
          <button 
            className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" 
            onClick={() => router.push('/dashboard/recog')}
          >
            {sidebarOpen && 'Currency Recognition'}
          </button>
          <button 
            className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" 
            onClick={() => router.push('/dashboard/fake')}
          >
            {sidebarOpen && 'Fake Note Prediction'}
          </button>
          <button 
            className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" 
            onClick={() => router.push('/dashboard/cond')}
          >
            {sidebarOpen && 'Note Condition Assessment'}
          </button>
          <button 
            className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" 
            onClick={() => router.push('/dashboard/art')}
          >
            {sidebarOpen && 'Articles/News'}
          </button>
        </div>
      </div>
    </div>
  );
} 