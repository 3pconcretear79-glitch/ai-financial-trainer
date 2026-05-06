const features = [
  { icon: "📊", title: "Portfolio Analysis", desc: "AI scans your holdings and gives actionable rebalancing advice in plain English." },
  { icon: "🎯", title: "Goal Tracking", desc: "Set retirement, emergency fund, and investment goals — your trainer keeps you on track." },
  { icon: "⚡", title: "Real-Time Alerts", desc: "Get notified when market conditions create opportunities or risks for your specific portfolio." },
  { icon: "🧠", title: "AI Chat Coach", desc: "Ask anything. Your AI trainer responds with personalized, data-backed financial guidance." },
  { icon: "📈", title: "Weekly Reports", desc: "Receive a weekly wealth summary with wins, risks, and your next best actions." },
  { icon: "🔒", title: "Bank-Level Security", desc: "256-bit encryption and read-only data connections. Your money stays yours." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-black/20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Everything You Need to Build Wealth Faster</h2>
        <p className="mt-4 text-gray-400">Free plan includes the basics. Pro unlocks the full arsenal.</p>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-left">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-base font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
