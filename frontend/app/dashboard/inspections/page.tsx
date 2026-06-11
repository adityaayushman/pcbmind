"use client";

import { useState } from "react";

export default function InspectionsPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">PCB Inspection</h1>
        <p className="text-gray-400">Upload and analyze PCB images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div className="glass p-8 rounded-xl border-2 border-dashed border-brand-cyan/50 hover:border-brand-cyan transition-colors cursor-pointer">
            <div className="text-center">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-bold mb-2">Upload PCB Image</h3>
              <p className="text-gray-400 mb-4">Drag and drop or click to select</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setUploadedImage(e.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="inline-block">
                <div className="px-6 py-2 bg-brand-electric text-white rounded-lg cursor-pointer hover:bg-brand-electric/90 transition-colors">
                  Select Image
                </div>
              </label>
            </div>
          </div>

          {/* Image Preview */}
          {uploadedImage && (
            <div className="glass p-4 rounded-xl">
              <h3 className="font-bold mb-3">Original Image</h3>
              <img
                src={uploadedImage}
                alt="PCB"
                className="w-full h-auto rounded-lg border border-white/10"
              />
            </div>
          )}

          {/* Inspection Results */}
          {uploadedImage && (
            <div className="glass p-6 rounded-xl space-y-4">
              <h3 className="text-xl font-bold">Analysis Results</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Components</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Defects Found</p>
                  <p className="text-2xl font-bold text-red-400">3</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Quality Score</p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold">92.5%</div>
                  <div className="flex-1 bg-white/10 rounded-full h-3">
                    <div className="bg-gradient-to-r from-brand-electric to-brand-cyan h-3 rounded-full" style={{ width: "92.5%" }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full px-6 py-3 bg-brand-cyan text-brand-dark rounded-lg font-bold hover:bg-brand-cyan/90 transition-colors">
                  View Detailed Analysis
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Template Selection */}
          <div className="glass p-4 rounded-xl">
            <h3 className="font-bold mb-3">PCB Template</h3>
            <select className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:outline-none focus:border-brand-cyan">
              <option>Select Reference PCB</option>
              <option>PCB-v1.0</option>
              <option>PCB-v2.0</option>
              <option>PCB-v3.0</option>
            </select>
          </div>

          {/* Production Line */}
          <div className="glass p-4 rounded-xl">
            <h3 className="font-bold mb-3">Production Line</h3>
            <select className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:outline-none focus:border-brand-cyan">
              <option>Line 1</option>
              <option>Line 2</option>
              <option>Line 3</option>
            </select>
          </div>

          {/* Run Inspection */}
          <button className="w-full px-6 py-3 bg-gradient-to-r from-brand-electric to-brand-cyan text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105">
            🚀 Run Inspection
          </button>

          {/* Recent Inspections */}
          <div className="glass p-4 rounded-xl">
            <h3 className="font-bold mb-3">Recent</h3>
            <div className="space-y-2">
              {["INS-1247", "INS-1246", "INS-1245"].map((id) => (
                <div key={id} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm">
                  {id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
