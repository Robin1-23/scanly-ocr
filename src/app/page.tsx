


'use client';

import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  // State to store uploaded image URL
  const [image, setImage] = useState<string | null>(null);

  // State to store the extracted text
  const [ocrText, setOcrText] = useState('');

  // State to manage selected OCR language
  const [language, setLanguage] = useState('eng');

  // Reference to file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle image file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    // Show alert if user tries to upload a PDF
    if (isPdf) {
      alert('Only image files can be uploaded.');
      return;
    }

    // Set image preview and clear previous OCR result
    if (isImage) {
      setImage(URL.createObjectURL(file));
      setOcrText('');
    }
  };

  // Run OCR on the uploaded image
  const handleExtractText = async () => {
    if (!image) return;

    const {
      data: { text },
    } = await Tesseract.recognize(image, language);

    // Store extracted text in state
    setOcrText(text);
  };

  // Download OCR result as a .txt file
  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([ocrText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ocr_result.txt';
    document.body.appendChild(element);
    element.click();
  };

  // Copy OCR result to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(ocrText);
  };

  return (
    <div className="min-h-screen bg-black text-white"
    style={{
            backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)`,
            backgroundSize: '8px 8px',
            backgroundRepeat: 'repeat',
          }}
    
    >
      {/* Navbar */}
      <nav className="bg-neutral-900 p-4 shadow-md text-center">
        <h1 className="text-2xl font-bold">📄 Scanly OCR</h1>
      </nav>

      {/* Main Content Section */}
      <main className="p-4 max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-4">

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="bg-gray-100 text-black p-2 rounded w-full"
          />

          {/* OCR Language Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="language" className="font-medium">
              OCR Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="eng">English</option>
              <option value="hin">Hindi</option>
              <option value="jpn">Japanese</option>
              <option value="spa">Spanish</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
            </select>
          </div>

          {/* Extract Text Button */}
          <button
            onClick={handleExtractText}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Extract Text
          </button>

          {/* Image Preview & OCR Result Side-by-Side */}
          {image && (
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              {/* Left Column: Uploaded Image */}
              <div className="flex-1">
                <h2 className="font-semibold mb-2">Uploaded Image</h2>
                <img
                  src={image}
                  alt="Uploaded"
                  className="rounded w-full max-h-[500px] object-contain border border-gray-700"
                />
              </div>

              {/* Right Column: Extracted OCR Text */}
              <div className="flex-1">
                <h2 className="font-semibold mb-2">Extracted Text</h2>
                <textarea
                  value={ocrText}
                  readOnly
                  rows={20}
                  className="w-full p-2 text-black rounded resize-none"
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button
                    onClick={handleCopyToClipboard}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Download as .txt
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}



