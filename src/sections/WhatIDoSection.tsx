import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import imgNasa from '../assets/nasa.png'
import imgChefAssist from '../assets/chefassist.png'
import imgSecureWork from '../assets/securework.png'
import imgData from '../assets/data.png'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TechIcon } from '../components/TechIcon'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { 
    id: '01', 
    name: 'Machine Learning', 
    link: 'https://nasa-asteroid-profiller-9ejht8uomshfamyz38a6of.streamlit.app/', 
    thumbnail: imgNasa, 
    desc: 'End-to-end model training pipelines focusing on structured evaluation, hyperparameter tuning, and seamless cloud deployment integration.', 
    tags: ['Python', 'Pandas', 'Scikit-Learn'] 
  },
  { 
    id: '02', 
    name: 'Web Development', 
    link: 'https://chef-assist-frontend.vercel.app/', 
    thumbnail: imgChefAssist, 
    desc: 'Building responsive, beautifully animated, full-stack Single Page Applications utilizing modern React ecosystems and GSAP animations.', 
    tags: ['React', 'NodeJS', 'Express', 'MongoDB'] 
  },
  { 
    id: '03', 
    name: 'Backend Engineering', 
    link: 'https://secure-work.vercel.app/', 
    thumbnail: imgSecureWork, 
    desc: 'Designing scalable microservices, robust REST APIs, and securing data structures over high-performance relational databases.', 
    tags: ['Django', 'PostgreSQL', 'Tailwind', 'VanillaJS'] 
  },
  { 
    id: '04', 
    name: 'Data Engineering', 
    link: 'https://data-analyzer-app-b5g8hci3xltt9cna9dgi85.streamlit.app/', 
    thumbnail: imgData, 
    desc: 'Constructing resilient data lakes, ETL pipelines, and analytical processing structures combining structured and unstructured data.', 
    tags: ['Python', 'Pandas', 'Numpy', 'Matplotlib', 'SQL', 'Airflow'] 
  },
]

export default function WhatIDoSection() {
  const containerRef = useRef<HTMLElement>(null)
  const [activeSvc, setActiveSvc] = useState(techStack[0])
  const detailsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // CURTAIN_REVEAL for heading
      gsap.fromTo('.what-heading', 
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

      gsap.fromTo('.services-container', 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // Fade animation when active service changes
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(detailsRef.current, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeSvc])

  return (
    <section ref={containerRef} id="services" className="w-full mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col justify-center max-w-[1400px]">
      <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
        02 — SERVICES
      </div>
      <div className="overflow-hidden pb-4 mb-10 lg:mb-16">
        <h2 className="what-heading font-display text-white text-[clamp(40px,7vw,68px)] leading-[0.9] tracking-[-1px]">
          WHAT I <span className="text-orange">DO</span>
        </h2>
      </div>

      <div className="services-container flex flex-col lg:flex-row gap-16 lg:gap-24 w-full items-start">
        
        {/* Left: Infinite Vertical Scrolling List */}
        <div className="w-full lg:w-1/2 relative h-[450px] lg:h-[600px] overflow-hidden group">
          <style>{`
            @keyframes vertical-marquee {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            .animate-v-marquee {
              display: flex;
              flex-direction: column;
              animation: vertical-marquee 18s linear infinite;
            }
          `}</style>
          
          {/* Gradient masking for smooth fade out at top/bottom */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 15%, transparent 85%, #0a0a0a 100%)' }} />
          
          <div className="animate-v-marquee w-full group-hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((svc, i) => (
              <div 
                key={`${svc.id}-${i}`}
                className="w-full py-4 sm:py-6 cursor-pointer"
                onMouseEnter={() => setActiveSvc(svc)}
              >
                <div 
                  className={`font-display text-[clamp(40px,5vw,72px)] leading-none transition-all duration-300 ${activeSvc.id === svc.id ? 'text-white translate-x-4' : 'text-[#333] hover:text-[#555]'}`}
                >
                  {svc.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Service Details Panel */}
        <div ref={detailsRef} className="w-full lg:w-1/2 flex flex-col justify-center min-h-[450px] lg:min-h-[600px] py-8 lg:py-0">
          <div className="w-full h-[220px] sm:h-[280px] rounded-lg overflow-hidden relative bg-[#111] mb-8 border border-white/5">
            <img src={activeSvc.thumbnail} alt={activeSvc.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="w-full border-t border-white/10 pt-6 mb-8">
            <div className="font-sans text-[11px] text-[#888] font-bold tracking-widest uppercase mb-4">About</div>
            <p className="font-sans text-[14px] text-[#ccc] leading-relaxed max-w-[500px]">
              {activeSvc.desc}
            </p>
          </div>
          
          <div className="w-full border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-8 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="font-sans text-[11px] text-[#888] font-bold tracking-widest uppercase">Tags</span>
              <div className="flex flex-wrap gap-2">
                {activeSvc.tags.map((tag, i) => (
                  <span key={tag} className={`flex items-center gap-1.5 font-sans text-[11px] rounded-[20px] px-3.5 py-1.5 border tracking-wide uppercase ${i === 0 ? 'border-orange text-orange font-medium' : 'border-white/20 text-[#aaa]'}`}>
                    <TechIcon name={tag} className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <a 
              href={activeSvc.link} 
              target="_blank" 
              rel="noreferrer" 
              className="group/link text-white hover:text-orange transition-colors font-sans text-[12px] tracking-widest uppercase flex items-center gap-2"
            >
              Check This Out 
              <span className="bg-[#222] group-hover/link:bg-orange p-1.5 rounded-full transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
