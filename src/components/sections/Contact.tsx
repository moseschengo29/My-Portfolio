export default function Contact() {
    return (
      <section id="contact" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 md:p-16 rounded-3xl text-center relative overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
  
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 relative z-10">
            Have a project in mind?
          </h2>
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto relative z-10 text-lg">
            Whether it&apos;s a complex web platform like <em>Seaquest</em> or a creative video campaign, I&apos;m ready to bring it to life.
          </p>
  
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <a href="mailto:your.email@example.com" className="bg-slate-100 hover:bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1">
              Send me an Email
            </a>
            <a href="https://linkedin.com" target="_blank" className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
              Connect on LinkedIn
            </a>
          </div>
          
          <p className="mt-8 text-slate-600 text-sm">
            Currently based in Nairobi, available for remote work globally.
          </p>
        </div>
      </section>
    );
  }