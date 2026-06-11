"""Admin and Settings Pages"""

"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="glass p-4 rounded-xl h-fit">
          <h3 className="font-bold mb-4">Settings</h3>
          <div className="space-y-2">
            {[
              { icon: "👤", label: "Profile", id: "profile" },
              { icon: "🔒", label: "Security", id: "security" },
              { icon: "🏭", label: "Factory", id: "factory" },
              { icon: "🔧", label: "API Keys", id: "api" },
              { icon: "🔔", label: "Notifications", id: "notifications" },
              { icon: "📊", label: "Preferences", id: "preferences" },
            ].map((item) => (
              <button key={item.id} className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan">
                  <option>Engineer</option>
                  <option>Manager</option>
                  <option>Operator</option>
                </select>
              </div>
              <button className="w-full px-4 py-2 bg-brand-electric rounded-lg hover:bg-brand-electric/90 transition-colors font-bold">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Security</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <button className="w-full px-4 py-2 bg-brand-electric rounded-lg hover:bg-brand-electric/90 transition-colors font-bold">
                Update Password
              </button>
            </div>
          </div>

          {/* API Keys */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">API Keys</h2>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Production API Key</p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="sk_live_•••••••••••••••••••••"
                    readOnly
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                  <button className="px-4 py-2 bg-brand-cyan text-brand-dark rounded-lg font-bold hover:bg-brand-cyan/90 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-bold">
                Regenerate Key
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass p-6 rounded-xl border border-red-500/20">
        <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>
        <div className="space-y-4">
          <p className="text-gray-400">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-bold">
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
