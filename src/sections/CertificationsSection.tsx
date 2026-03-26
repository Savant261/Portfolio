import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imgFullstack from '../assets/fullstack.png'
import imgComp from '../assets/comp.png'
import imgNptel from '../assets/nptel.png'
import imgAiAgents from '../assets/ai agents.png'

gsap.registerPlugin(ScrollTrigger)

const certifications = [
  {
    title: 'Full-Stack (MERN) with GenAI',
    issuer: 'The Angaar Batch | W3 Grads  ',
    desc: 'Learned full stack application building utilizing modern React, Express, MongoDB and styling frameworks. Worked with GSAP and multiple animation libraries.',
    link: 'https://drive.google.com/file/d/1Cu5xYlkHq0VSdufS7fOuOiRnnv2VT1WD/view',
    year: '2025',
    image: imgFullstack
  },
  {
    title: 'Computer Communications',
    issuer: 'Coursera | University of Colorado Boulder',
    desc: 'Developed and honed essential skills in fundamental networking concepts and principles, apply the network theory and design principles, verify their understandings and build a strong foundation for creating innovations in the internet',
    link: 'https://www.coursera.org/account/accomplishments/specialization/XX65Y8XHHH02?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n',
    year: '2024',
    image: imgComp
  },
  {
    title: 'Social Networks',
    issuer: 'NPTEL | IIT Madras',
    desc: 'Analyzed real-world interconnected systems through graph theory and sociological models. Mastered foundational concepts including relationship dynamics (homophily, weak ties), link properties, and network phenomena such as power laws, cascades, and epidemics.',
    link: 'https://drive.google.com/file/d/13etaU2QQR7PoeQYuo_UFmPjgWXdnuoiT/view',
    year: '2025',
    image: imgNptel
  },
  {
    title: 'Building Autonomous AI Agents',
    issuer: 'IBM SkillsBuild',
    desc: 'Understanding multi-agent workflows, long term memory utilization, tool calling, and deterministic JSON structural reasoning for LLMs.',
    link: 'https://drive.google.com/file/d/1CYaegcRRKwV9gWzUf9tV2zCAjOTSS7jd/view',
    year: '2025',
    image: imgAiAgents
  }
]

export default function CertificationsSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // CURTAIN_REVEAL
      gsap.fromTo('.cert-heading',
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

      // Drift up items
      gsap.fromTo('.cert-banner',
        { y: 60, rotation: 1.5, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="certifications" className="w-full mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col max-w-[1400px]">
      <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
        04 — CERTIFICATIONS
      </div>
      <div className="overflow-hidden pb-4 mb-16">
        <h2 className="cert-heading font-display text-white text-[clamp(48px,8vw,80px)] leading-[0.9] tracking-[-1px]">
          AWARDS AND <span className="text-orange">HONORS</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8 w-full">
        {certifications.map((cert, i) => (
          <div key={i} className="cert-banner w-full flex flex-col md:flex-row bg-[#111111] border-l-[4px] border-[#ff4d00] border-t border-r border-b border-white/5 overflow-hidden hover:bg-[#151515] transition-colors duration-300 group min-h-[180px]">

            {/* Left side details */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h3 className="font-sans text-[22px] md:text-[24px] text-white font-medium tracking-wide leading-tight">{cert.title}</h3>
                <span className="font-display text-orange text-xl tracking-widest leading-none mt-1 sm:mt-0">{cert.year}</span>
              </div>

              <span className="font-sans text-[13px] text-orange mb-4 tracking-wide uppercase font-bold">{cert.issuer}</span>

              <p className="font-sans text-[14px] text-white-dim leading-relaxed mb-6 max-w-[700px]">
                {cert.desc}
              </p>

              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-[13px] text-white hover:text-orange transition-colors group/link w-fit tracking-widest uppercase">
                View Credential <ExternalLink className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Right side thumbnail */}
            <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 h-[200px] md:h-auto overflow-hidden bg-black relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent z-10 hidden md:block" />
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-[1.02] group-hover:scale-100"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link
          to="/certifications"
          className="bg-transparent border border-orange text-orange font-display text-lg uppercase tracking-wider px-10 py-3.5 rounded hover:bg-orange hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          VIEW ALL CERTIFICATIONS <ArrowRight className="w-5 h-5 ml-1" />
        </Link>
      </div>
    </section>
  )
}
