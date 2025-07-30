'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="h-screen font-sans bg-white flex flex-col">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-3 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-semibold text-black">CoinVision</span>
        </div>
        <div className="flex space-x-12">
          <button className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors">
            <Image src="/home-icon.png" alt="Home" width={24} height={24} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => router.push('/dashboard')}
          >
            <Image src="/grid-icon.png" alt="Grid" width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#0b0b6f] text-white px-6 py-8 flex-grow">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-4">
            Recognize, Convert & Validate Currency Effortlessly!
          </h1>
          <p className="mb-6 text-lg">
            Upload a photo of note to detect its value, currency type, condition
          </p>
          <button className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-200 transition" onClick={() => router.push('/dashboard/recog')}>
            Start Recognizing
          </button>
        </div>
        <div className="md:mt-0">
          <Image
            src="/bot-currency.png"
            alt="Currency Bot"
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* Bottom Feature Buttons */}
      <div className="flex justify-between items-center px-50 py-6 bg-white relative">
        <button className="flex flex-col items-center hover:scale-105 transition-transform" onClick={() => router.push('/dashboard/fake')}>
          <Image src="/shield-icon.png" alt="Fake Note" width={160} height={150} />
          <p className="mt-2 font-medium text-black">Fake Note Prediction</p>
        </button>
        <div className="h-55 border-r-2 border-black absolute left-1/2 transform -translate-x-1/2"></div>
        <button className="flex flex-col items-center hover:scale-105 transition-transform" onClick={() => router.push('/dashboard/cond')}>
          <Image src="/sparkle-coin.png" alt="Note Condition" width={310} height={150} />
          <p className="mt-2 font-medium text-black"> Note Condition Assessment</p>
        </button>
      </div>
    </main>
  );
}
