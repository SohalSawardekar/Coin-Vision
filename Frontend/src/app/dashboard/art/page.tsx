'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function ArticlesNews() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top White Navbar */}
        <Header />
        {/* Blue Header */}
        <div className="px-6 py-4 bg-[#0A0A57] text-white text-2xl font-bold">
          Articles/News
        </div>
        {/* Main Content */}
        <div className="flex-grow p-6">
          {/* Content will be added here */}
        </div>
      </div>
    </div>
  );
}
