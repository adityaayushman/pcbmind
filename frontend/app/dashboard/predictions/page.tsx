"use client";

export default function PredictionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Predictive Failure Engine</h1>
        <p className="text-gray-400">AI-powered failure forecasting</p>
      </div>

      {/* Risk Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Defect Probability", value: "35%", icon: "🎯", color: "from-orange-500" },
          { label: "Risk Score", value: "4.2/10", icon: "⚠️", color: "from-yellow-500" },
          { label: "Line Health", value: "87.5%", icon: "💪", color: "from-green-500" },
        ].map((item, i) => (
          <div key={i} className={`glass p-6 rounded-xl bg-gradient-to-br ${item.color} to-transparent`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-3xl font-bold mt-2">{item.value}</p>
              </div>
              <span className="text-4xl">{item.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Predicted Issues */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Predicted Issues</h2>
        <div className="space-y-4">
          {[
            { component: "C12", issue: "Capacitor degradation", prob: "45%", timeline: "In 250 hours" },
            { component: "IC1", issue: "Thermal stress", prob: "30%", timeline: "In 380 hours" },
            { component: "R7", issue: "Resistor drift", prob: "18%", timeline: "In 600 hours" },
          ].map((pred, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex-1">
                <p className="font-bold">{pred.component}: {pred.issue}</p>
                <p className="text-sm text-gray-400">{pred.timeline}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-400">{pred.prob}</p>
                <p className="text-xs text-gray-400">probability</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Forecast */}
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Quality Forecast</h2>
        <div className="bg-white/5 p-6 rounded-lg">
          <p className="mb-4">Expected yield in next 7 days: <span className="text-2xl font-bold text-green-400">96.8%</span></p>
          <p className="text-gray-400">Based on current defect rate trends and maintenance schedules, production yield is expected to remain above target thresholds.</p>
        </div>
      </div>
    </div>
  );
}
