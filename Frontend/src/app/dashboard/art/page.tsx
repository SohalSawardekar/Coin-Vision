'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

export default function ArticlesNews() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const router = useRouter();

	return (
		<div className="flex bg-white h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Main Content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Top White Navbar */}
				<Header />
				{/* Blue Header */}
				<div className="bg-[#0A0A57] px-6 py-4 font-bold text-white text-2xl">
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
