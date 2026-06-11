"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Manufacturing Dashboard</h1>
        <p className="text-gray-400">Real-time PCB inspection and quality metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Inspections", value: "1,247", change: "+12%", icon: "🔍" },
          { title: "Defects Found", value: "89", change: "-5%", icon: "⚠️" },
          { title: "Quality Score", value: "94.2%", change: "+2.3%", icon: "⭐" },
          { title: "Predicted Failures", value: "12", change: "+3", icon: "🔮" },
        ].map((kpi, i) => (
          <div key={i} className="glass p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">{kpi.title}</h3>
              <span className="text-2xl">{kpi.icon}</span>
            </div>
            <div className="text-3xl font-bold mb-2">{kpi.value}</div>
            <div className={`text-sm ${kpi.change.startsWith("+") && kpi.change[1] !== "1" ? "text-green-400" : "text-red-400"}`}>
              {kpi.change} from last week
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Defects Chart */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Weekly Defects</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 78, 45, 92, 68, 85, 72].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-brand-electric to-brand-cyan rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                style={{ height: `${(height / 100) * 100}%` }}
              >
                <div className="h-full flex items-end justify-center pb-2 text-xs text-white opacity-0 hover:opacity-100 transition-opacity">
                  {height}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        {/* Defect Categories */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Defect Categories</h2>
          <div className="space-y-4">
            {[
              { name: "Missing Components", value: 34, color: "bg-red-500" },
              { name: "Solder Defects", value: 28, color: "bg-orange-500" },
              { name: "Polarity Issues", value: 15, color: "bg-yellow-500" },
              { name: "Misplaced", value: 12, color: "bg-blue-500" },
            ].map((category, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm font-bold">{category.value}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`${category.color} h-2 rounded-full`}
                    style={{ width: `${(category.value / 34) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Inspections */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Recent Inspections</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-gray-400 font-medium">ID</th>
                <th className="text-left py-3 text-gray-400 font-medium">Line</th>
                <th className="text-left py-3 text-gray-400 font-medium">Defects</th>
                <th className="text-left py-3 text-gray-400 font-medium">Quality</th>
                <th className="text-left py-3 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "INS-1247", line: "Line 2", defects: 3, quality: 92.5, status: "✅" },
                { id: "INS-1246", line: "Line 1", defects: 1, quality: 97.2, status: "✅" },
                { id: "INS-1245", line: "Line 3", defects: 5, quality: 87.8, status: "⚠️" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="py-3">{row.id}</td>
                  <td className="py-3">{row.line}</td>
                  <td className="py-3">{row.defects}</td>
                  <td className="py-3">{row.quality}%</td>
                  <td className="py-3">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
