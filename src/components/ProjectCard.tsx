import { Github, ExternalLink } from 'lucide-react'
import { TechIcon } from './TechIcon'

interface Project {
  id: number;
  title: string;
  tags: string[];
  description: string;
  github: string;
  link: string;
  image: string;
  category: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/30 transition-all duration-500 flex flex-col h-full shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
      {/* Top Banner / Image Area */}
      <div className={`w-full h-[250px] relative overflow-hidden ${project.image.startsWith('bg-') ? project.image : 'bg-black'}`}>
        {!project.image.startsWith('bg-') && (
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105" 
          />
        )}
        <div className="absolute inset-0 bg-black/40 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-all duration-500" />
      </div>

      {/* Content Area */}
      <div className="p-8 pb-10 flex flex-col flex-grow bg-gradient-to-bl from-[#141414] to-[#0a0a0a]">
        <div className="text-orange font-sans text-[11px] font-bold tracking-[2px] uppercase mb-4">
          {project.category}
        </div>
        
        <h3 className="font-display text-[clamp(24px,3vw,32px)] text-white mb-4 leading-none relative z-10">
          {project.title}
        </h3>
        
        <p className="font-sans text-[#a0a0a0] leading-relaxed mb-8 text-[14px] sm:text-[15px] relative z-10 flex-grow">
          {project.description}
        </p>

        <div className="mb-10 relative z-10">
          <div className="flex flex-wrap gap-2.5">
            {project.tags.map(tag => (
               <div key={tag} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
                 <TechIcon name={tag} className="w-3.5 h-3.5 text-white-dim grayscale group-hover:grayscale-0 transition-all duration-300" />
                 <span className="font-sans text-[11px] font-medium tracking-wide text-white-dim uppercase">{tag}</span>
               </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-auto relative z-10">
          {project.github !== '#' && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 outline-btn font-display text-[13px] px-6 py-3 rounded tracking-widest uppercase"
            >
              <Github className="w-4 h-4" /> Code
            </a>
          )}
          {project.link !== '#' && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 outline-btn font-display text-[13px] px-6 py-3 rounded tracking-widest uppercase"
            >
              <ExternalLink className="w-4 h-4" /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
