import Image from "next/image";

const projects = [
  {
    title: "Seaquest",
    category: "Frontend & Animation",
    description: "A high-performance landing page for a deep-sea fishing company featuring complex GSAP animations and a custom React hero section.",
    tech: ["React", "GSAP", "Tailwind"],
    image: "/seaquest-placeholder.jpg" // You will need to add screenshots here
  },
  {
    title: "Career Ecosystem Platform",
    category: "System Architecture",
    description: "A comprehensive platform prototype designed to connect professionals. Focused on scalable UI architecture and low-fidelity wireframing.",
    tech: ["Next.js", "System Design", "Figma"],
    image: "/career-placeholder.jpg"
  },
  {
    title: "Mental Health AI Chatbot",
    category: "AI & Backend",
    description: "A dedicated AI agent tailored for mental health support, prioritizing user privacy and context-aware responses.",
    tech: ["Python", "AI/LLM", "Django"],
    image: "/chatbot-placeholder.jpg"
  }
];

export default function Projects() {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-16 text-slate-200">Selected Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300">
            <div className="aspect-video relative bg-slate-800">
              {/* <Image src={project.image} alt={project.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" /> */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                [Project Screenshot]
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-1">{project.title}</h3>
                  <p className="text-cyan-400 text-sm font-mono">{project.category}</p>
                </div>
              </div>
              
              <p className="text-slate-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}