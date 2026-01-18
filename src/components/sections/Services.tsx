import { VideoCameraIcon, CodeBracketIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-200">What I Do</h2>
        <p className="text-slate-400 mt-4 max-w-xl">
          I bridge the gap between engineering and storytelling. I don&apos;t just write code; I create experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        
        {/* Large Block: Full Stack Dev */}
        <div className="md:col-span-2 md:row-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CodeBracketIcon className="w-64 h-64" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Full Stack Engineering</h3>
              <p className="text-slate-400">
                Building scalable web apps from scratch. Specialized in <strong>React/Next.js</strong> for frontend and <strong>Python/Django</strong> for backend logic.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-2 mt-8 text-sm text-slate-300">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>System Architecture</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>Database Design (SQL)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>API Development</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>Real-time Systems</li>
            </ul>
          </div>
        </div>

        {/* Medium Block: Video Editing */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20">
            <VideoCameraIcon className="w-32 h-32" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Motion & Video</h3>
          <p className="text-slate-400 text-sm">
            Professional editing and motion graphics. I make code look good and videos feel alive.
          </p>
        </div>

        {/* Medium Block: UI/UX & Interactions */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-pink-500/30 transition-all">
           <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20">
            <SparklesIcon className="w-32 h-32" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Micro-Interactions</h3>
          <p className="text-slate-400 text-sm">
            Mastery of <strong>GSAP</strong> and <strong>Tailwind</strong> to create fluid, award-winning web animations.
          </p>
        </div>

      </div>
    </section>
  );
}