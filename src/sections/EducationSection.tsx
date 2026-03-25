import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    year: 'Aug 2023 - Present',
    title: 'Lovely Professional University',
    subtitle: 'Bachelor of Technology - Computer Science and Engineering | CGPA: 8.49',
    desc: 'Relevant Coursework: Machine Learning, Data Structures & Algorithms, Statistics, Database Management Systems',
  },
  {
    year: 'Apr 2020 - Mar 2022',
    title: 'Modern Public School',
    subtitle: 'Intermediate (Class XII) | Percentage: 92%',
    desc: 'Balasore, Odisha',
  },
  {
    year: 'Apr 2019 - Mar 2020',
    title: 'Modern Public School',
    subtitle: 'Matriculation (Class X) | Percentage: 89%',
    desc: 'Balasore, Odisha',
  }
]

export default function EducationSection() {
  const containerRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // CURTAIN_REVEAL
      gsap.fromTo('.edu-heading',
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

      // Timeline draw
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          }
        }
      )

      // Drift up items
      gsap.fromTo('.edu-item',
        { y: 60, rotation: 1.5, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="education" className="w-full mx-auto max-w-[1400px] px-6 lg:px-12 py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col">
      <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
        05 — EDUCATION
      </div>
      <div className="overflow-hidden pb-4 mb-6 max-w-[900px]">
        <h2 className="edu-heading font-display text-white text-[clamp(44px,7vw,70px)] leading-[1] tracking-[1px]">
          MY <span className="text-orange">EDUCATION</span>
        </h2>
      </div>
      <p className="font-sans text-[#a0a0a0] mb-20 max-w-[600px] leading-relaxed">
        My academic journey emphasizing computer science and engineering foundations.
      </p>

      <div className="timeline-container relative pl-4 md:pl-8">
        {/* The glowing vertical line */}
        <div className="timeline-line absolute left-[21px] md:left-[37px] top-0 bottom-0 w-[2px] bg-[rgba(255,77,0,0.3)] origin-top" />

        <div className="flex flex-col gap-12">
          {education.map((edu, i) => (
            <div key={i} className="edu-item relative pl-12 md:pl-16 flex flex-col md:flex-row md:items-start md:gap-8 hover:bg-white/5 p-4 rounded-xl transition-colors duration-300 -ml-4">
              {/* Timeline Dot */}
              <div className="absolute left-[16px] md:left-[16px] top-[24px] w-[12px] h-[12px] rounded-full bg-[#0a0a0a] border-2 border-[#ff4d00] z-10" />
              
              <div className="w-[180px] shrink-0 mb-2 md:mb-0 mt-1">
                <span className="font-display text-orange text-lg tracking-widest">{edu.year}</span>
              </div>
              
              <div className="flex flex-col flex-1">
                <h3 className="font-sans text-[20px] font-medium text-white mb-1 tracking-wide">{edu.title}</h3>
                <span className="font-sans text-[14px] text-white-dim mb-3 tracking-wide">{edu.subtitle}</span>
                <p className="font-sans text-[13px] text-[#888] leading-relaxed max-w-[500px]">
                  {edu.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
