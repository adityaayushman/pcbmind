"use client";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-b from-brand-dark via-brand-slate to-brand-dark">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-brand-electric rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-brand-cyan rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-electric via-brand-cyan to-brand-electric bg-clip-text text-transparent">
              AI-Powered Manufacturing Intelligence
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Detect defects, identify root causes, and predict failures before they happen.
            </p>

            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <button className="px-8 py-3 bg-brand-electric text-white rounded-lg font-semibold hover:bg-brand-electric/90 transition-all transform hover:scale-105">
                Start Inspection
              </button>
              <button className="px-8 py-3 border border-brand-cyan text-brand-cyan rounded-lg font-semibold hover:bg-brand-cyan/10 transition-all transform hover:scale-105">
                Request Demo
              </button>
            </div>

            <p className="text-sm text-gray-400">
              From Defect Detection to Defect Prediction
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">The Manufacturing Challenge</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "💰", title: "Expensive AOI Systems", desc: "High capital investment" },
                { icon: "👤", title: "Manual Inspection", desc: "Prone to human error" },
                { icon: "📉", title: "Quality Inconsistency", desc: "Unpredictable failures" },
                { icon: "⚠️", title: "Production Losses", desc: "Costly downtime" },
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-xl hover:border-brand-cyan/50 transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">The PCBMind Solution</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <div className="flex-1">
                <div className="space-y-4">
                  {[
                    "📷 Upload PCB Image",
                    "🤖 AI Inspection",
                    "🔍 Root Cause Analysis",
                    "🔮 Failure Prediction",
                    "📊 Intelligence Dashboard",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-electric flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <p className="text-lg">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="glass p-8 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">🔄</div>
                    <p className="text-gray-400">Workflow Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Powerful Features</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Smart PCB Inspection",
                "Defect Detection",
                "Root Cause Analysis",
                "Manufacturing Copilot",
                "Predictive Failure Engine",
                "Digital Twin Dashboard",
                "Multi-Agent AI",
                "Explainable AI",
              ].map((feature, i) => (
                <div key={i} className="glass p-6 rounded-xl hover:border-brand-cyan/50 transition-all group cursor-pointer">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform">
                    {["🔍", "🎯", "🔎", "💬", "🔮", "🌐", "🤖", "🧠"][i]}
                  </div>
                  <h3 className="font-bold">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Manufacturing?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join leading electronics manufacturers using PCBMind AI
            </p>
            <button className="px-12 py-4 bg-gradient-to-r from-brand-electric to-brand-cyan text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105">
              Get Started Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>© 2024 PCBMind AI. All rights reserved.</p>
            <p className="mt-2">Industry 4.0 Manufacturing Intelligence Platform</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
