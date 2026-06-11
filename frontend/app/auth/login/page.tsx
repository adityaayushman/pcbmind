"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark via-brand-slate to-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-electric to-brand-cyan bg-clip-text text-transparent">
            PCBMind AI
          </h1>
          <p className="text-gray-400 mt-2">Manufacturing Intelligence Platform</p>
        </div>

        {/* Form */}
        <div className="glass p-8 rounded-xl space-y-6">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan transition-colors"
            />
          </div>

          <button className="w-full px-6 py-3 bg-gradient-to-r from-brand-electric to-brand-cyan text-white rounded-lg font-bold hover:opacity-90 transition-all transform hover:scale-105">
            Sign In
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-b from-brand-dark via-brand-slate to-brand-dark text-gray-400">
                New to PCBMind?
              </span>
            </div>
          </div>

          <a href="/auth/register" className="block w-full px-6 py-3 border border-brand-cyan text-brand-cyan text-center rounded-lg font-bold hover:bg-brand-cyan/10 transition-colors">
            Create Account
          </a>

          <div className="text-center">
            <a href="/auth/forgot-password" className="text-sm text-brand-cyan hover:text-brand-cyan/80 transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
