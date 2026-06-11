"use client";

export default function DigitalTwinPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Digital Twin Dashboard</h1>
        <p className="text-gray-400">Interactive PCB visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* PCB Visualization */}
        <div className="lg:col-span-3 glass p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">PCB Component View</h2>
          <div className="bg-gradient-to-b from-brand-slate to-black p-8 rounded-lg h-96 flex items-center justify-center border border-brand-cyan/20">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">🔌</div>
              <p className="text-gray-400">PCB Layout (Interactive)</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">Click on components to view health status and historical data</p>
        </div>

        {/* Component List */}
        <div className="glass p-6 rounded-xl h-fit">
          <h3 className="font-bold mb-4">Component Health</h3>
          <div className="space-y-2">
            {[
              { name: "IC1", status: "⚠️ At Risk" },
              { name: "C12", status: "🔴 Critical" },
              { name: "R5", status: "🟡 Warning" },
              { name: "U1", status: "✅ Healthy" },
            ].map((comp, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="font-bold text-sm">{comp.name}</div>
                <div className="text-xs text-gray-400">{comp.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Data */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Component History</h2>
        <div className="space-y-4">
          {[
            { date: "2024-01-15", event: "Component C12 - Capacitor detected with high ESR" },
            { date: "2024-01-14", event: "IC1 - Temperature spike detected" },
            { date: "2024-01-13", event: "System maintenance completed" },
          ].map((record, i) => (
            <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400 whitespace-nowrap">{record.date}</div>
              <div className="text-sm">{record.event}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
