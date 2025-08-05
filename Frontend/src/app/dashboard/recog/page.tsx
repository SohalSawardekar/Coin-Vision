/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';

export default function CurrencyRecognition() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>({});
	const router = useRouter();

	const handleImageUpload = (file: File) => {
		setSelectedFile(file);
		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleRecognize = async () => {
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append('file', selectedFile);

		try {
			setLoading(true)
			const response = await fetch(`${process.env.NEXT_PUBLIC_MODEL_URL}/predict`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) throw new Error('Prediction failed');

			const result = await response.json();
			setData(result);
			setLoading(false)
			// console.log('Prediction result:', result);
		} catch (error) {
			console.error('Error during recognition:', error);
			setLoading(false)
		}
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) handleImageUpload(file);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		const file = e.dataTransfer.files[0];
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
				<button className="mb-4 px-4 py-2 focus:outline-none" onClick={() => setSidebarOpen((prev) => !prev)}>
					<img src="/sidebar.png" alt="Menu Icon" className="w-6 h-6" />
				</button>
				<div className={`flex flex-col h-full justify-between transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
					<div className="flex flex-col flex-1 justify-evenly divide-y divide-black">
						{[
							['Currency Conversion', '/dashboard/conv'],
							['Currency Recognition', '/dashboard/recog'],
							['Fake Note Prediction', '/dashboard/fake'],
							['Note Condition Assessment', '/dashboard/cond'],
							['Articles/News', '/dashboard/art'],
						].map(([label, path]) => (
							<button key={path} className="flex items-center gap-2 hover:bg-white px-3 py-4 rounded-lg hover:text-[#0A0A57] transition-colors cursor-pointer" onClick={() => router.push(path)}>
								{sidebarOpen && label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				<Header />
				<div className="bg-[#0A0A57] px-6 py-4 font-bold text-white text-2xl">Currency Recognition</div>
				<div className="flex flex-grow gap-6 p-6">
					{/* Upload Section */}
					<div className="flex flex-col w-full md:w-1/2">
						<div
							className={`flex flex-col items-center justify-center border-2 border-dashed h-[400px] transition-colors duration-200 ${isDragOver ? 'border-[#0A0A57] bg-[#0A0A57]/10' : 'border-black'
								}`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
								<input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
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
							<button disabled className="bg-[#0a0a5782] shadow-lg px-6 py-3 rounded-lg text-white">Use Camera</button>
							<button disabled={selectedFile == null ? true : false} onClick={handleRecognize} className={` shadow-lg px-6 py-3 rounded-lg text-white ${selectedFile == null ? "bg-[#0a0a5771]" : "bg-[#0A0A57] hover:cursor-pointer"}`}>
								Recognize
							</button>
						</div>
					</div>

					{/* Result Section */}
					<div className="flex flex-col p-4 border w-full md:w-1/2">
						<h3 className="mb-4 font-bold text-black text-lg">Result</h3>
						<div className="bg-gray-100 mb-4 p-4 rounded h-48 overflow-auto">
							{!loading ? (
								data?.prediction ? (
									<div className='flex flex-col text-gray-500'>
										<p><strong className='font-semibold text-lg'>Prediction:</strong> {data.prediction}</p>
										<p><strong className='font-semibold text-lg'>Confidence:</strong> {data.confidence}%</p>
									</div>
								) : (
									<p className="text-gray-500">No prediction available yet.</p>
								)
							) : (
								<div className='flex flex-col gap-y-[1rem] mt-[1rem]'>
									<div className='bg-gray-500 rounded-3xl w-[50%] text-transparent animate-pulse' >h</div>
									<div className='bg-gray-500 rounded-3xl w-[50%] text-transparent animate-pulse' >h</div>
								</div>
							)}

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
