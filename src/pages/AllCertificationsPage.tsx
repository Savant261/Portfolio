import { useEffect, useRef } from 'react'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import imgFullstack from '../assets/fullstack.png'
import imgComp from '../assets/comp.png'
import imgNptel from '../assets/nptel.png'
import imgAiAgents from '../assets/ai agents.png'
import imgOS from '../assets/os.png'
import imgdig from '../assets/digital.png'
import imgauto from '../assets/automata.png'
import imgjava from '../assets/java.png'
import imggenai from '../assets/mastergenai.png'
import imgexcel from '../assets/excel.png'
import imgdsa from '../assets/dsa.png'



const allCertifications = [
  {
    title: 'Full-Stack (MERN) with GenAI',
    issuer: 'The Angaar Batch | W3 Grads',
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
    title: 'Applied Artificial Intelligence: Learn, Build and Create an AI Agent',
    issuer: 'IBM SkillsBuild',
    desc: 'building future-ready skills in Artificial Intelligence and emerging technologies, covering everything from core concepts like machine learning, neural networks, and deep learning to advanced areas such as agentic AI and autonomous systems. ',
    link: 'https://drive.google.com/file/d/1CYaegcRRKwV9gWzUf9tV2zCAjOTSS7jd/view',
    year: '2025',
    image: imgAiAgents
  },
  {
    title: 'Introduction to Hardware and Operating Systems',
    issuer: 'Coursera | IBM',
    desc: 'Explored fundamental hardware components, GPU architectures, and operating system functions. Developed strategies for secure IoT integration and evaluated the organizational deployment of VR/AR technologies.',
    link: 'https://drive.google.com/file/d/1iwLHwD-HiHWcKOJTV4y-RG_B7aua3H-E/view',
    year: '2024',
    image: imgOS
  },
  {
    title: 'Digital Systems : From Logic Gates to Processors',
    issuer: 'Coursera',
    desc: 'Mastered digital design methodologies from basic logic gates to complex processor architecture. Gained hands-on experience in high-level hardware description languages like VHDL to design and simulate digital circuits.',
    link: 'https://drive.google.com/file/d/1z7wr7fm_iLBYBaIv9hI1RgoUD5Ww4X4c/view',
    year: '2025',
    image: imgdig
  },
  {
    title: 'Computational Theory: Language Principle and Finite Automata Theory',
    issuer: 'Infosys Springboard',
    desc: 'Studied the mathematical foundations of computer science, focusing on finite automata, regular languages, and grammar. Explored the principles of computational logic and the theoretical limits of algorithmic processing.',
    link: 'https://drive.google.com/file/d/1IPP8gjibzYw8voHkTGZW-CUmK5nAnZGT/view',
    year: '2023',
    image: imgauto
  },
  {
    title: 'Java Programming',
    issuer: 'iamNeo | Lovely Professional University',
    desc: 'Completed a comprehensive 72-hour deep dive into core Java, focusing on Object-Oriented Programming (OOP) principles. Developed a strong foundation in building scalable, robust applications using the Java ecosystem.',
    link: 'https://drive.google.com/file/d/1WNaqY5B_sEdDu-6Ye3RcPoNvfW-znBv0/view',
    year: '2025',
    image: imgjava
  },
  {
    title: 'Master Generative AI and GenAI tools',
    issuer: 'Udemy',
    desc: 'Gained expert-level proficiency in Large Language Models (LLMs) and the broader GenAI landscape. Explored prompt engineering and integrated tools like ChatGPT into professional workflows to enhance productivity and innovation.',
    link: 'https://drive.google.com/file/d/1oA1W1QrlvoomXbSy5Rh-Ox7H571QKIlf/view',
    year: '2025',
    image: imggenai
  },
  {
    title: 'Introduction to MS Excel',
    issuer: 'Simplilearn',
    desc: 'Mastered essential data organization and analysis techniques within Microsoft Excel. Developed proficiency in using formulas, functions, and data visualization tools to generate actionable business insights and reports.',
    link: 'https://drive.google.com/file/d/1B1YEOxhf2OGoO3cTOaUHK-xV-Xo_6jIn/view',
    year: '2023',
    image: imgexcel
  },
  {
    title: 'Data Structures and Algorithms',
    issuer: 'iamNeo | Lovely Professional University',
    desc: 'Intensive 72-hour certification focused on algorithm optimization and complex data structure implementation. Mastered dynamic programming, graph traversals, and advanced problem-solving paradigms to build high-performance software.',
    link: 'https://drive.google.com/file/d/1mXFnbWIEIRpG_YpFNpuOvrsEbMmiMs56/view',
    year: '2024',
    image: imgdsa
  }
]

export default function AllCertificationsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.page-heading',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )

      gsap.fromTo('.cert-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-32 pb-24 px-6 lg:px-12 flex flex-col max-w-[1600px] mx-auto">

      <div className="mb-12 page-heading opacity-0">
        <Link to="/home" className="inline-flex items-center gap-2 text-white/60 hover:text-orange font-sans text-sm tracking-widest uppercase transition-colors duration-300 mb-8">
          <ArrowLeft className="w-4 h-4" /> BACK TO HOME
        </Link>
        <h1 className="font-display text-[clamp(48px,8vw,90px)] leading-[0.9] text-white tracking-[-1px] uppercase">
          All <span className="text-orange">Certifications</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
        {allCertifications.map((cert, index) => (
          <div key={index} className="cert-card opacity-0 group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:bg-[#151515] transition-all duration-500 shadow-xl flex flex-col h-full hover:border-orange/30 hover:shadow-[0_0_30px_rgba(255,77,0,0.1)] hover:-translate-y-2">

            {/* 16:9 Thumbnail Image */}
            <div className="w-full aspect-video bg-black overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/80 z-10 pointer-events-none" />
              <img src={cert.image} alt={cert.title} loading="lazy" className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-[1.02] group-hover:scale-110" />
            </div>

            {/* Content Block */}
            <div className="p-8 flex flex-col flex-grow relative z-20">
              <span className="font-display text-orange text-[15px] tracking-[0.2em] mb-3">{cert.year}</span>
              <h3 className="font-sans text-[22px] font-medium text-white mb-2 tracking-wide leading-tight">{cert.title}</h3>
              <span className="font-sans text-[12px] text-white/50 mb-5 tracking-widest uppercase font-bold">{cert.issuer}</span>

              <p className="font-sans text-[14px] text-[#888] leading-relaxed mb-8 flex-grow">
                {cert.desc}
              </p>

              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 font-display text-[13px] text-white border border-white/20 hover:border-orange hover:bg-orange px-6 py-3 rounded tracking-widest uppercase transition-all duration-300">
                View Credential <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
