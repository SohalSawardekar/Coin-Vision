'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';

export default function NoteConditionAssessment() {
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
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			{/* Main Content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Top White Navbar */}
				<Header />
				{/* Blue Header */}
				<div className="bg-[#0A0A57] px-6 py-4 font-bold text-white text-2xl">
					Note Condition Assessment
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
								Assess
							</button>
						</div>
					</div>

					{/* Right: Result Section */}
					<div className="flex flex-col p-4 border w-full md:w-1/2">
						<h3 className="mb-4 font-bold text-black text-lg">Note Condition Prediction Result</h3>

						{/* Prediction Status */}
						<div className="bg-white mb-4 p-4 border rounded-lg">
							<h4 className="mb-2 font-semibold text-black text-lg">Prediction Status</h4>
							<div className="flex items-center gap-2">
								<div className="bg-yellow-500 rounded-full w-3 h-3"></div>
								<span className="font-medium text-yellow-600">Good Condition</span>
							</div>
						</div>


					</div>
				</div>
			</div>
		</div>
	);
}
