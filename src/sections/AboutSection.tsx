import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const techSkills = [
  { id: '/01', name: 'MACHINE LEARNING', desc: 'Predictive & Generative Models', score: 82 },
  { id: '/02', name: 'AGENTIC AI', desc: 'Autonomous LLM Workflows', score: 71 },
  { id: '/03', name: 'BACKEND DESIGN', desc: 'Scalable Cloud Architectures', score: 79 },
  { id: '/04', name: 'FULL-STACK DEV', desc: 'Rich Interactive Web Apps', score: 85 },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bio & Grid Reveal
      gsap.fromTo('.bio-reveal', 
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out'
        }
      )

      // Tech Cards Reveal
      gsap.fromTo('.tech-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 85%'
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out'
        }
      )

      // Progress bars fill upward
      gsap.fromTo('.tech-bar-fill',
        { height: '0%' },
        {
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 85%'
          },
          height: (_, target) => `${target.dataset.target}%`,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.1,
          delay: 0.2
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="about" className="w-full py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
          01 — ABOUT ME
        </div>
        <h2 className="font-display text-white text-[clamp(44px,7vw,70px)] leading-[1] mb-16 tracking-[1px] max-w-[900px]">
          My Experience And Expertise With <br className="hidden md:block"/> Technologies Used <span className="text-orange">Through Out My Career.</span>
        </h2>

        {/* Top Section: Bio & Grid */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-12 mb-20 lg:mb-24 bio-reveal">
          <div className="w-full xl:w-[55%] flex flex-col justify-center space-y-6">
            <p className="font-sans text-[16px] text-white-dim leading-relaxed max-w-[600px]">
              Let's be honest — I didn't choose computer science. Computer science chose me, and honestly, it could've given me more warning.
              My earliest relationship with computers was purely transactional. I gave it electricity, it gave me Road Rash. Nobody told me there was an entire universe of logic, syntax, and sleep deprivation hiding behind that screen.
            </p>
            <p className="font-sans text-[16px] text-white-dim leading-relaxed max-w-[600px]">
              Fast forward through one very consequential entrance exam — B.Tech, CSE. What followed was a masterclass in humbling experiences. I met Python before I met my college friends. I learned what a merge conflict was at 2 AM before I learned what healthy sleep was. I built apps nobody asked for, in languages I barely understood — and embarrassingly often, they worked.
              The graveyard of abandoned repositories tells its own story. Projects dropped like hot potatoes the moment complexity outpaced confidence. But here's the thing about curiosity — it doesn't respect your frustration. It just keeps pulling you back in, whispering "but what if you tried this." And every single time, I found my way through the mess I'd made myself. Not gracefully. Not efficiently. But I found it.
            </p>
            <p className="font-sans text-[16px] text-white-dim leading-relaxed max-w-[600px]">
              Today I sit at the <span className="text-white font-medium">intersection of full-stack development and machine learning</span> — building things end-to-end, from the React component a user touches to the TensorFlow model making decisions underneath it. I've shipped production-ready applications, engineered ML pipelines, and survived enough merge conflicts to have opinions about git branching strategies.
            </p>
            <p className="font-sans text-[16px] text-white-dim leading-relaxed max-w-[600px]">
              I'm not the developer who knows everything. <span className="text-orange font-medium">I'm the developer who figures everything out</span> — and there's a meaningful difference between those two things.
            </p>
          </div>
        
        <div className="w-full xl:w-[45%] flex items-center">
          <div className="grid grid-cols-2">
            <div className="border-b border-r border-white/10 pb-6 pr-6 flex flex-col gap-1.5">
              <span className="font-sans text-[11px] text-white-dim uppercase tracking-[2px]">Name</span>
              <span className="font-sans text-[15px] text-white font-medium tracking-wide">Savant Kumar Jena</span>
            </div>
            
            <div className="border-b border-white/10 pb-6 pl-6 flex flex-col gap-1.5">
              <span className="font-sans text-[11px] text-white-dim uppercase tracking-[2px]">Education</span>
              <span className="font-sans text-[15px] text-white font-medium tracking-wide">B.Tech CSE</span>
            </div>

            <div className="border-r border-white/10 pt-6 pr-6 flex flex-col gap-1.5">
              <span className="font-sans text-[11px] text-white-dim uppercase tracking-[2px]">Focus</span>
              <span className="font-sans text-[15px] text-white font-medium tracking-wide">Full-Stack · ML/AI</span>
            </div>
            
            <div className="pt-6 pl-6 flex flex-col gap-1.5">
              <span className="font-sans text-[11px] text-white-dim uppercase tracking-[2px]">Location</span>
              <span className="font-sans text-[15px] text-white font-medium tracking-wide">India</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Section: Technologies 4-Column Grid layout */}
      <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border-y border-white/10 w-full px-0 mx-auto">
        {techSkills.map((skill) => (
          <div 
            key={skill.id} 
            className="tech-card bg-transparent transition-colors duration-500 flex flex-col py-10 px-6 lg:px-10 xl:px-14 group cursor-default relative overflow-hidden"
          >
             {/* Hover faint shadow/background behind the entire card */}
            <div className="absolute inset-0 bg-transparent transition-opacity duration-500 pointer-events-none" />

            {/* Card Header */}
            <div className="flex justify-between items-start mb-1.5 relative z-10">
              <span className="font-sans font-medium text-[12px] text-white tracking-widest uppercase">{skill.name}</span>
              <span className="font-sans text-[12px] text-white-dim uppercase tracking-wide group-hover:text-white transition-colors">{skill.id}</span>
            </div>
            
            {/* Subtitle */}
            <div className="font-sans text-[12px] text-[#888] group-hover:text-[#aaa] transition-colors mb-8 tracking-wide min-h-[36px] relative z-10">
              {skill.desc}
            </div>
            
            {/* Vertical Progress Bar Container */}
            <div className="relative w-full h-[320px] bg-transparent group-hover:bg-[#1a1a1a] overflow-hidden border border-white/5 relative z-10 transition-colors duration-500">
              {/* Fill layer */}
              <div 
                data-target={skill.score}
                className="tech-bar-fill absolute bottom-0 left-0 w-full transition-colors duration-500 ease-out bg-white/5 group-hover:bg-orange"
                style={{ height: '0%' }}
              >
                {/* Diagonal Hatch overlay inside the fill area */}
                <div 
                  className="absolute inset-0 opacity-[0.25] transition-opacity duration-500" 
                  style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 8px)' }}
                />
              </div>
              
              {/* Percentage Text overlapping everything */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-display text-[72px] lg:text-[84px] text-white tracking-widest leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mix-blend-plus-lighter">
                  {skill.score}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
