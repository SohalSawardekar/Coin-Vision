'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';

export default function CurrencyConversion() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const router = useRouter();

	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);

	const handleImageUpload = (file: File) => {
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			handleImageUpload(file);
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);
		const file = event.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			handleImageUpload(file);
		}
	};

	return (
		<div className="flex bg-white h-screen overflow-hidden">
			{/* Sidebar */}
			<div
				className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#0A0A57] text-white flex flex-col py-4 transition-all duration-300`}
				style={{ minWidth: sidebarOpen ? '16rem' : '4rem' }}
			>
				<div className="flex justify-center items-center mb-6">
					{/* Logo removed from sidebar */}
				</div>
				{/* Sidebar Toggle Button */}
				<button
					className="mb-4 px-4 py-2 focus:outline-none"
					onClick={() => setSidebarOpen((prev) => !prev)}
				>
					<img src="/sidebar.png" alt="Menu Icon" className="w-6 h-6" />
				</button>
				{/* Sidebar Links */}
				<div className={`flex flex-col h-full justify-between transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
					<div className="flex flex-col flex-1 justify-evenly divide-y divide-black">
						<button className="flex items-center gap-2 hover:bg-white px-3 py-4 rounded-lg hover:text-[#0A0A57] transition-colors cursor-pointer">
							{sidebarOpen && 'Currency Conversion'}
						</button>
						<button className="flex items-center gap-2 hover:bg-white px-3 py-4 rounded-lg hover:text-[#0A0A57] transition-colors cursor-pointer" onClick={() => router.push('/dashboard/recog')}>
							{sidebarOpen && 'Currency Recognition'}
						</button>
						<button className="flex items-center gap-2 hover:bg-white px-3 py-4 rounded-lg hover:text-[#0A0A57] transition-colors cursor-pointer" onClick={() => router.push('/dashboard/fake')}>
							{sidebarOpen && 'Fake Note Prediction'}
						</button>
						<button className="flex items-center gap-2 hover:bg-white px-3 py-4 rounded-lg hover:text-[#0A0A57] transition-colors cursor-pointer" onClick={() => router.push('/dashboard/cond')}>
							{sidebarOpen && 'Note Condition Assessment'}
						</button>
						<button className="flex items-center gap-2 hover:bg-white px-3 py-4 rounded-lg hover:text-[#0A0A57] transition-colors cursor-pointer" onClick={() => router.push('/dashboard/art')}>
							{sidebarOpen && 'Articles/News'}
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Top White Navbar */}
				<Header />
				{/* Blue Header */}
				<div className="bg-[#0A0A57] px-6 py-4 font-bold text-white text-2xl">
					Currency Conversion
				</div>
				{/* Main Content */}
				<div className="flex flex-grow gap-6 p-6">
					{/* Left: Upload Section */}
					<div className="flex flex-col w-full md:w-1/2">
						<div
							className={`flex flex-col items-center justify-center border-2 border-dashed h-[400px] transition-colors duration-200 ${isDragOver
									? 'border-[#0A0A57] bg-[#0A0A57]/10'
									: 'border-black'
								}`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
								<input
									type="file"
									accept="image/*"
									onChange={handleFileInput}
									className="hidden"
								/>
								{imagePreview ? (
									<img src={imagePreview} alt="Preview" className="h-full object-contain" />
								) : (
									<div className="flex flex-col items-center">
										<img src="/upload.png" alt="Upload" className="mb-2 w-10 h-10" />
										<p className="text-black">Click to upload or drag and drop</p>
									</div>
								)}
							</label>
						</div>
						<div className="flex justify-center gap-4 mt-6">
							<button className="bg-[#0A0A57] hover:bg-[#0A0A57]/90 shadow-lg px-6 py-3 rounded-lg font-medium text-white transition-all duration-200">
								Use Camera
							</button>
							<button className="bg-[#0A0A57] hover:bg-[#0A0A57]/90 shadow-lg px-6 py-3 rounded-lg font-medium text-white transition-all duration-200">
								Recognize
							</button>
						</div>
					</div>

					{/* Right: Result Section */}
					<div className="flex flex-col p-4 border w-full md:w-1/2">
						<h3 className="mb-4 font-bold text-black text-lg">Result</h3>
						<div className="bg-gray-200 mb-4 rounded h-48" />
						<div className="bg-gray-200 rounded h-48" />
					</div>
				</div>
			</div>
		</div>
	);
}
