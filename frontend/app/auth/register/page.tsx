"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark via-brand-slate to-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-electric to-brand-cyan bg-clip-text text-transparent">
            PCBMind AI
          </h1>
          <p className="text-gray-400 mt-2">Join the AI Manufacturing Revolution</p>
        </div>

        <div className="glass p-8 rounded-xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <button className="w-full px-6 py-3 bg-gradient-to-r from-brand-electric to-brand-cyan text-white rounded-lg font-bold hover:opacity-90 transition-all">
            Create Account
          </button>

          <div className="text-center">
            <span className="text-gray-400">Already have an account? </span>
            <a href="/auth/login" className="text-brand-cyan hover:text-brand-cyan/80">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
