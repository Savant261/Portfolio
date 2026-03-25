import { ArrowRight, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TechIcon } from '../components/TechIcon'

gsap.registerPlugin(ScrollTrigger)

const secureWork = {
  title: 'SecureWork',
  description: 'SecureWork is a production-ready freelance marketplace designed to solve the single biggest bottleneck in the gig economy: Trust. SecureWork replaces insecure paper contracts with a cryptographic Escrow Vault. Clients deposit and lock funds safely before work begins, giving freelancers a 100% guarantee that the capital exists and is waiting for them upon approval.',
  github: 'https://github.com/Savant261/SecureWork',
  link: 'https://secure-work.vercel.app/',
  technologies: [
    { name: 'Python', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { name: 'Django', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { name: 'Vanilla JS', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
    { name: 'HTML5', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { name: 'Tailwind CSS', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' }
  ]
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // CURTAIN_REVEAL
      gsap.fromTo('.proj-heading',
        { clipPath: 'inset(100% 0 0 0)' },
        { 
          clipPath: 'inset(0% 0 0 0)', 
          duration: 1.2, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%'
          }
        }
      )

      // Banner Drift Up
      gsap.fromTo('.proj-banner',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.proj-banner',
            start: 'top 85%'
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="projects" className="w-full mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col max-w-[1400px]">
      <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
        03 — PROJECTS
      </div>
      <div className="overflow-hidden pb-4 mb-4">
        <h2 className="proj-heading font-display text-white text-[clamp(48px,8vw,80px)] leading-[0.9] tracking-[-1px]">
          MY RECENT <span className="text-orange">WORK</span>
        </h2>
      </div>
      <p className="font-sans text-[#a0a0a0] mb-12 max-w-[600px] leading-relaxed">
        Selected feature project showcasing scalable architecture and complex problem solving.
      </p>

      {/* Modern Sleek Banner */}
      <div className="proj-banner w-full flex flex-col lg:flex-row bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mb-16 shadow-[0_30px_60px_rgba(0,0,0,0.6)] group transition-all duration-500">
        
        {/* Left Side - Video */}
        <div className="w-full lg:w-[55%] h-[300px] sm:h-[400px] lg:h-auto relative overflow-hidden bg-[#000]">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange/20 via-transparent to-transparent mix-blend-overlay z-10 pointer-events-none" />
          <video 
            src="/securework.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full lg:w-[45%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative bg-gradient-to-bl from-[#141414] to-[#0a0a0a]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <h3 className="font-display text-[clamp(32px,4vw,48px)] text-white mb-6 leading-none relative z-10">
            {secureWork.title}
          </h3>
          
          <p className="font-sans text-[#a0a0a0] leading-relaxed mb-10 text-[14px] sm:text-[15px] relative z-10">
            {secureWork.description}
          </p>

          <div className="mb-12 relative z-10">
            <h4 className="font-sans text-[11px] text-[#888] font-bold tracking-widest uppercase mb-5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-3">
              {secureWork.technologies.map((tech) => {
                return (
                  <div key={tech.name} className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${tech.bg} ${tech.border} shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300`}>
                     <TechIcon name={tech.name} className="w-3.5 h-3.5" />
                     <span className={`font-sans text-[11px] font-medium tracking-wide ${tech.color}`}>{tech.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-auto relative z-10">
            <a 
              href={secureWork.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 outline-btn font-display text-[15px] px-8 py-3.5 rounded tracking-widest uppercase"
            >
              <Github className="w-4 h-4" /> Code
            </a>
            <a 
              href={secureWork.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 outline-btn font-display text-[15px] px-8 py-3.5 rounded tracking-widest uppercase text-center"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link 
          to="/projects"
          className="view-all-btn bg-transparent border border-orange text-orange font-display text-lg uppercase tracking-wider px-10 py-3.5 rounded flex items-center gap-2"
        >
          VIEW ALL PROJECTS <ArrowRight className="btn-arrow w-5 h-5 ml-1" />
        </Link>
      </div>
    </section>
  )
}
