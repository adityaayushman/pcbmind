"use client";

export default function CopilotPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hi! I'm the Manufacturing Copilot. Ask me about defects, quality, or production insights." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Based on recent inspection data, the quality score is 94.2% with trending improvements." 
      }]);
    }, 500);
    
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Manufacturing Copilot</h1>
        <p className="text-gray-400">Ask me anything about your PCB production</p>
      </div>

      <div className="glass rounded-xl flex flex-col h-96 p-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs p-3 rounded-lg ${
                msg.role === "user" 
                  ? "bg-brand-electric text-white" 
                  : "bg-white/10 text-gray-100"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about defects, quality, predictions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-brand-electric rounded-lg hover:bg-brand-electric/90 transition-colors font-bold"
          >
            Send
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {[
          "Show high-risk components",
          "Generate quality report",
          "What defects occurred today?",
          "Why did board fail?",
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => setInput(action)}
            className="glass p-4 rounded-xl text-left hover:border-brand-cyan transition-colors"
          >
            <p className="text-sm">{action}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
