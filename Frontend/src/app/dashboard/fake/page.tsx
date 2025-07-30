'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function FakeNotePrediction() {
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
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top White Navbar */}
        <Header />
        {/* Blue Header */}
        <div className="px-6 py-4 bg-[#0A0A57] text-white text-2xl font-bold">
          Fake Note Prediction
        </div>
        {/* Main Content */}
        <div className="flex flex-grow p-6 gap-6">
          {/* Left: Upload Section */}
          <div className="flex flex-col w-full md:w-1/2">
            <div 
              className={`flex flex-col items-center justify-center border-2 border-dashed h-[400px] transition-colors duration-200 ${
                isDragOver 
                  ? 'border-[#0A0A57] bg-[#0A0A57]/10' 
                  : 'border-black'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
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
                    <img src="/upload.png" alt="Upload" className="w-10 h-10 mb-2" />
                    <p className="text-black">Click to upload or drag and drop</p>
                  </div>
                )}
              </label>
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <button className="bg-[#0A0A57] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#0A0A57]/90 transition-all duration-200 font-medium">
                Use Camera
              </button>
              <button className="bg-[#0A0A57] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#0A0A57]/90 transition-all duration-200 font-medium">
                Predict
              </button>
            </div>
          </div>

          {/* Right: Result Section */}
          <div className="flex flex-col border w-full md:w-1/2 p-4">
            <h3 className="text-lg font-bold mb-4 text-black">Fake Note Prediction Result</h3>
            
            {/* Prediction Status */}
            <div className="bg-white border rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-lg mb-2 text-black">Prediction Status</h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">Authentic Note</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
