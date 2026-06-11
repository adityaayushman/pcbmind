"use client";

import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-brand-dark">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } glass border-r border-white/10 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className={`font-bold text-xl bg-gradient-to-r from-brand-electric to-brand-cyan bg-clip-text text-transparent ${!sidebarOpen && "hidden"}`}>
              PCBMind
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? "←" : "→"}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: "📊", label: "Dashboard", href: "/dashboard" },
            { icon: "🔍", label: "Inspections", href: "/dashboard/inspections" },
            { icon: "🎯", label: "Defect Analysis", href: "/dashboard/defects" },
            { icon: "🔮", label: "Predictions", href: "/dashboard/predictions" },
            { icon: "💬", label: "Copilot", href: "/dashboard/copilot" },
            { icon: "🌐", label: "Digital Twin", href: "/dashboard/digital-twin" },
            { icon: "📋", label: "Reports", href: "/dashboard/reports" },
            { icon: "⚙️", label: "Settings", href: "/dashboard/settings" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`group-hover:text-brand-cyan transition-colors ${!sidebarOpen && "hidden"}`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full p-3 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 flex items-center gap-3">
            <span className="text-2xl">🚪</span>
            <span className={!sidebarOpen ? "hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
