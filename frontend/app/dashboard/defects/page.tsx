"use client";

export default function DefectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Defect Analysis</h1>
        <p className="text-gray-400">Root cause analysis and recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filter */}
        <div className="glass p-4 rounded-xl h-fit">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400">Severity</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg p-2 mt-1">
                <option>All</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Type</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg p-2 mt-1">
                <option>All Types</option>
                <option>Missing Component</option>
                <option>Solder Defect</option>
                <option>Polarity Issue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Defects List */}
        <div className="lg:col-span-2 space-y-4">
          {[
            {
              type: "Missing Component",
              component: "C12 (Capacitor)",
              severity: "high",
              cause: "Pick-and-place feeder issue",
              probability: "87%",
              action: "Inspect feeder slot #3",
            },
            {
              type: "Solder Defect",
              component: "R5 (Resistor)",
              severity: "medium",
              cause: "Reflow temperature profile",
              probability: "65%",
              action: "Verify thermal profile",
            },
            {
              type: "Polarity Issue",
              component: "IC1 (Microcontroller)",
              severity: "critical",
              cause: "Wrong component placed",
              probability: "92%",
              action: "Review placement program",
            },
          ].map((defect, i) => (
            <div key={i} className="glass p-6 rounded-xl border-l-4" style={{
              borderColor: { critical: "#FF006E", high: "#FF4444", medium: "#FFA500", low: "#4444FF" }[defect.severity]
            }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{defect.type}</h3>
                  <p className="text-gray-400">{defect.component}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  defect.severity === "critical" ? "bg-red-500/20 text-red-400" :
                  defect.severity === "high" ? "bg-orange-500/20 text-orange-400" :
                  defect.severity === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>
                  {defect.severity.toUpperCase()}
                </span>
              </div>

              <div className="bg-white/5 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-2">Root Cause Analysis</p>
                <p className="font-semibold mb-3">{defect.cause}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand-electric to-brand-cyan h-2 rounded-full" 
                         style={{ width: defect.probability }}></div>
                  </div>
                  <span className="text-sm font-bold">{defect.probability} probability</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-xl">💡</span>
                <div>
                  <p className="text-sm text-gray-400">Recommended Action</p>
                  <p className="font-semibold">{defect.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
