'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
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
            <button className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" onClick={() => router.push('/dashboard/conv')}>
              {sidebarOpen && 'Currency Conversion'}
            </button>
            <button className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" onClick={() => router.push('/dashboard/recog')}>
              {sidebarOpen && 'Currency Recognition'}
            </button>
            <button className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" onClick={() => router.push('/dashboard/fake')}>
              {sidebarOpen && 'Fake Note Prediction'}
            </button>
            <button className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" onClick={() => router.push('/dashboard/cond')}>
              {sidebarOpen && 'Note Condition Assessment'}
            </button>
            <button className="flex items-center gap-2 py-4 px-3 rounded-lg transition-colors hover:bg-white hover:text-[#0A0A57] cursor-pointer" onClick={() => router.push('/dashboard/art')}>
              {sidebarOpen && 'Articles/News'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top White Navbar */}
        <Header />
        {/* Blue Header aligned with sidebar icon */}
        <div className="flex items-center px-6 py-4 bg-[#0A0A57] text-white" style={{marginTop: 0}}>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 flex-shrink-0">
          <div className="p-8 border rounded-lg text-black text-center text-2xl font-bold flex flex-col justify-center items-center h-40">
            <p className="font-semibold text-2xl">Total Recognitions</p>
            <p className="text-4xl mt-2">50</p>
          </div>
          <div className="p-8 border rounded-lg text-black text-center text-2xl font-bold flex flex-col justify-center items-center h-40">
            <p className="font-semibold text-2xl">Today's Activity</p>
            <p className="text-4xl mt-2">10</p>
          </div>
          <div className="p-8 border rounded-lg text-black text-center text-2xl font-bold flex flex-col justify-center items-center h-40">
            <p className="font-semibold text-2xl">Conversions</p>
            <p className="text-4xl mt-2">25</p>
          </div>
          <div className="p-8 border rounded-lg text-black text-center text-2xl font-bold flex flex-col justify-center items-center h-40">
            <p className="font-semibold text-2xl">Top Recognized Currencies</p>
            <p className="text-4xl mt-2">INR, USD</p>
          </div>
        </div>
        {/* Recent Uploads Table */}
        <div className="p-6 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4 text-black">Recent Uploads</h2>
          <table className="w-full border border-black text-left text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Country</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">27 July</td>
                <td className="p-2 border">100</td>
                <td className="p-2 border">Note</td>
                <td className="p-2 border">India</td>
                <td className="p-2 border">Recognized</td>
              </tr>
              <tr>
                <td className="p-2 border">27 July</td>
                <td className="p-2 border">1 USD</td>
                <td className="p-2 border">Note</td>
                <td className="p-2 border">USD</td>
                <td className="p-2 border">Fake</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
