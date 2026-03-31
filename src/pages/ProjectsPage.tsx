import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { ProjectCard } from '../components/ProjectCard'
import imgRainfall from '../assets/rainfall.png'
import imgData from '../assets/data.png'
import imgSecureWork from '../assets/securework.png'
import imgChefAssist from '../assets/chefassist.png'
import imgNasa from '../assets/nasa.png'
import imgKernelLens from '../assets/kernelsens.png'

const projectsDatabase = [
  {
    id: 1,
    title: 'RainWise',
    tags: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'scikit-learn'],
    description: 'A machine learning project designed to predict the probability of rainfall using historical weather data. This system provides an interactive dashboard, built with Streamlit, to visualize data and make live predictions.',
    github: 'https://github.com/Savant261/Rainfall-Prediction-System',
    link: 'https://rainfall-prediction-system-hq23cbe26hkk6ltymxdjiq.streamlit.app/',
    image: imgRainfall,
    category: 'ML/AI'
  },
  {
    id: 2,
    title: 'Data Analyzer',
    tags: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'SQL'],
    description: 'Data Analyzer is a powerful web application built with Streamlit that allows you to upload, clean, filter, group, and visualize your datasets—all without writing a single line of code.This tool is perfect for data analysts, students, and anyone curious to find insights in their data quickly.',
    github: 'https://github.com/Savant261/Data-Analyzer-app',
    link: 'https://data-analyzer-app-b5g8hci3xltt9cna9dgi85.streamlit.app/',
    image: imgData,
    category: 'DATA'
  },
  {
    id: 3,
    title: 'SecureWork',
    tags: ['Python', 'Javascript', 'Django', 'PostgreSQL', 'Tailwind'],
    description: 'SecureWork is a production-ready freelance marketplace designed to solve the single biggest bottleneck in the gig economy: Trust. SecureWork replaces insecure paper contracts with a cryptographic Escrow Vault. Clients deposit and lock funds safely before work begins, giving freelancers a 100% guarantee that the capital exists and is waiting for them upon approval.',
    github: 'https://github.com/Savant261/SecureWork',
    link: 'https://secure-work.vercel.app/',
    image: imgSecureWork,
    category: 'FULL-STACK, BACKEND'
  },
  {
    id: 4,
    title: 'KernelLens',
    tags: ['HTML', 'CSS', 'JavaScript', 'Flask', 'psutil'],
    description: 'KernelLens is a real-time process monitoring dashboard that provides real-time information on running processes and system parameters, similar to a task manager. It allows users to monitor system metrics like CPU and memory usage, and terminate processes directly from the dashboard.-agent orchestration framework for autonomous business processes.',
    github: 'https://github.com/Savant261/KernelLens',
    link: '#',
    image: imgKernelLens,
    category: 'OS'
  },
  {
    id: 5,
    title: 'ChefAssist',
    tags: ['React', 'Vite', 'Node.js', 'Tailwind', 'MongoDB'],
    description: 'ChefAssist is an intelligent recipe generation and adaptation platform that combines AI-powered cooking assistance with a vibrant social community for food lovers. Transform your available ingredients into personalized recipes while connecting with fellow cooking enthusiasts who share similar dietary restrictions and culinary preferences.',
    github: 'https://github.com/Savant261/Flames-2025-Project-ChefAssist',
    link: 'https://chef-assist-frontend.vercel.app/',
    image: imgChefAssist,
    category: 'FULL-STACK'
  },
  {
    id: 6,
    title: 'NASA Asteroid Profiller',
    tags: ['Python', 'Streamlit', 'Pandas', 'scikit-learn', 'Plotly'],
    description: 'A machine learning project that uses a 3-stage AI pipeline to profile, measure, and assess the potential hazard of Near-Earth Objects (NEOs). This system provides an interactive dashboard built with Streamlit to visualize data and make live predictions.',
    github: 'https://github.com/Savant261/NASA-Asteroid-Profiller',
    link: 'https://nasa-asteroid-profiller-9ejht8uomshfamyz38a6of.streamlit.app/',
    image: imgNasa,
    category: 'ML/AI'
  }
]

const categories = ['ALL', 'FULL-STACK', 'ML/AI', 'BACKEND', 'DATA', 'OS']

export default function ProjectsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('ALL')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mount transition
    gsap.fromTo(containerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
  }, [])

  const filteredProjects = filter === 'ALL'
    ? projectsDatabase
    : projectsDatabase.filter(p => p.category === filter)

  return (
    <div ref={containerRef} className="w-full min-h-screen px-6 lg:px-12 py-12 md:py-24 max-w-[1400px] mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-sans text-[13px] text-white-dim hover:text-white transition-colors uppercase tracking-widest mb-16"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="font-display text-white text-[clamp(48px,8vw,80px)] leading-[0.9] mb-12 tracking-[-1px]">
        ALL MY <span className="text-orange">PROJECTS</span>
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-16">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 ${filter === cat
              ? 'bg-orange text-white border-orange border hover:opacity-90'
              : 'bg-[#111] text-white-dim border border-white/10 hover:border-white/30 hover:text-white'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {filteredProjects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  )
}
