export default function Hero() {
  return (
    <section className="relative py-28 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-[#05051a] opacity-90 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          🤖 Powered by AI — Built for Real Wealth
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Your Personal <span className="text-blue-400">AI Financial Trainer</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
          Wealth Builder analyzes your finances, builds your plan, and coaches you every step of the way. Stop guessing — start growing.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#pro" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Upgrade to Pro — $49/mo
          </a>
          <a href="#features" className="px-8 py-3 border border-blue-700 text-blue-300 hover:bg-blue-900/30 font-semibold rounded-lg transition-colors">
            See Features
          </a>
        </div>
      </div>
    </section>
  );
}
