import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'
import gsap from 'gsap'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Code Profiles', href: '#coding-profiles' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const ctaBtnRef = useRef<HTMLAnchorElement>(null)

  const [activeSection, setActiveSection] = useState('')
  useEffect(() => {
    const handleScrollActive = () => {
      let current = ''
      navLinks.forEach(({ href }) => {
        const id = href.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) current = href
        }
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScrollActive, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollActive)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Handle visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Handle background
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    // MAGNETIC_HOVER effect for CTA
    const btn = ctaBtnRef.current
    if (!btn) return
    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      
      // Limit displacement to 8px inside boundaries
      if (Math.abs(distX) < rect.width && Math.abs(distY) < rect.height) {
         gsap.to(btn, { x: distX * 0.15, y: distY * 0.15, duration: 0.3, ease: 'power2.out' })
      } else {
         gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }
    }
    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }
    window.addEventListener('mousemove', onMouseMove)
    btn.addEventListener('mouseleave', onMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      btn.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  if (location.pathname === '/') return null

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out flex justify-center py-4 px-6 lg:px-12 ${
        isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/50' : 'bg-transparent'
      } ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-[1400px]">
        {/* Left: Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-orange group-hover:rotate-12 transition-transform" />
          <span className="font-display font-medium text-xl tracking-widest text-white group-hover:text-orange transition-colors">
            SAVANT
          </span>
        </Link>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link font-sans text-[13px] uppercase tracking-widest ${isActive ? 'active-nav-link' : ''}`}
            >
              {link.name}
            </a>
          )})}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-white hover:text-orange transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Right: Connect CTA (Desktop) */}
        <a 
          ref={ctaBtnRef}
          href="#contact" 
          className="hidden md:flex items-center primary-btn font-display text-[15px] uppercase tracking-widest px-6 py-2 rounded transition-all duration-300 pointer-events-auto"
        >
          Hire Me 
        </a>
      </div>
    </nav>

    {/* Mobile Drawer Overlay */}
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    />

    {/* Mobile Drawer Panel */}
    <div 
      className={`fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:hidden flex flex-col p-8 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
       <button 
         className="absolute top-6 right-6 text-white-dim hover:text-white transition-colors"
         onClick={() => setIsMobileMenuOpen(false)}
       >
         <X className="w-6 h-6" />
       </button>
       <div className="flex flex-col gap-6 mt-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display uppercase tracking-widest text-white hover:text-orange transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-orange text-white font-display text-lg uppercase tracking-widest px-6 py-3 rounded text-center"
          >
            LET'S TALK
          </a>
       </div>
    </div>
    </>
  )
}
