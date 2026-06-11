"use client";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Reports</h1>
        <p className="text-gray-400">Generate and download inspection reports</p>
      </div>

      {/* Generate Report */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Generate Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { type: "Inspection Report", icon: "📋", desc: "Detailed inspection results" },
            { type: "Quality Report", icon: "📊", desc: "Weekly quality metrics" },
            { type: "Failure Analysis", icon: "🔍", desc: "Root cause analysis" },
          ].map((report, i) => (
            <button key={i} className="glass p-6 rounded-xl text-left hover:border-brand-cyan transition-colors group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{report.icon}</div>
              <h3 className="font-bold mb-2">{report.type}</h3>
              <p className="text-sm text-gray-400">{report.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
        <div className="space-y-2">
          {[
            { name: "Weekly Quality Report", date: "2024-01-15", size: "2.4 MB" },
            { name: "Inspection Report - Line 2", date: "2024-01-14", size: "1.8 MB" },
            { name: "Failure Analysis Report", date: "2024-01-13", size: "3.1 MB" },
          ].map((report, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div>
                <p className="font-bold">{report.name}</p>
                <p className="text-sm text-gray-400">{report.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{report.size}</span>
                <button className="px-4 py-2 bg-brand-electric rounded-lg hover:bg-brand-electric/90 transition-colors">
                  📥
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
