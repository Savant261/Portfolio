import { useState, useEffect, useRef } from 'react'
import { Mail, MapPin, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // CURTAIN_REVEAL
      gsap.fromTo('.contact-heading',
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
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // To wire emailjs later
  }

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} id="contact" className="w-full flex flex-col relative z-20">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
          07 — CONTACT
        </div>
        <div className="overflow-hidden pb-4 mb-16 max-w-[900px]">
          <h2 className="contact-heading font-display text-white text-[clamp(44px,7vw,70px)] leading-[1] tracking-[1px]">
            GET IN <span className="text-orange">TOUCH</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 w-full">
          
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="flex flex-col gap-6 mb-16">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-[#111] flex items-center justify-center group-hover:border-orange/50 group-hover:bg-orange/10 transition-colors">
                  <Mail className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-1">Email Me</div>
                  <a href="mailto:savantkumarj@gmail.com" className="font-sans text-[15px] text-white hover:text-orange transition-colors">savantkumarj@email.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-[#111] flex items-center justify-center group-hover:border-orange/50 group-hover:bg-orange/10 transition-colors">
                  <MapPin className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <div className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-1">Location</div>
                  <div className="font-sans text-[15px] text-white">India</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-2">FIND ME ON</div>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'GitHub', url: 'https://github.com/Savant261' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/savant-kumar-jena-990b26283/' },
                  { name: 'Twitter', url: '#' },
                  { name: 'LeetCode', url: 'https://leetcode.com/u/SAVANTKJ/' },
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center w-full max-w-[280px] font-sans text-[14px] text-[#a0a0a0] hover:text-white border-b border-white/5 pb-2 transition-colors group"
                  >
                    <span>{social.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-7/12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="name" className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-[6px]">NAME</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-[#111] border border-white/[0.08] rounded-[6px] px-4 py-3.5 font-sans text-sm text-white focus:outline-none focus:border-[rgba(255,77,0,0.5)] transition-colors placeholder:text-[#a0a0a0]/50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="email" className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-[6px]">EMAIL</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-[#111] border border-white/[0.08] rounded-[6px] px-4 py-3.5 font-sans text-sm text-white focus:outline-none focus:border-[rgba(255,77,0,0.5)] transition-colors placeholder:text-[#a0a0a0]/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="subject" className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-[6px]">SUBJECT</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  className="w-full bg-[#111] border border-white/[0.08] rounded-[6px] px-4 py-3.5 font-sans text-sm text-white focus:outline-none focus:border-[rgba(255,77,0,0.5)] transition-colors placeholder:text-[#a0a0a0]/50"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="flex flex-col w-full mb-2">
                <label htmlFor="message" className="font-sans text-[11px] text-[#a0a0a0] uppercase tracking-widest mb-[6px]">MESSAGE</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className="w-full resize-y bg-[#111] border border-white/[0.08] rounded-[6px] px-4 py-3.5 font-sans text-sm text-white focus:outline-none focus:border-[rgba(255,77,0,0.5)] transition-colors placeholder:text-[#a0a0a0]/50"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#ff4d00] hover:bg-white text-white hover:text-black font-display text-[22px] tracking-widest py-4 rounded-[6px] transition-all duration-300 flex justify-center items-center group uppercase"
              >
                SEND MESSAGE <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.06] mt-12 bg-[#0a0a0a] relative z-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 font-sans text-[12px] text-[#a0a0a0]">
            <span className="text-white">✦ Savant Kumar Jena</span>
            <span className="hidden md:block opacity-30">|</span>
            <span>© 2025 All rights reserved</span>
          </div>
          
          <div className="flex gap-6 font-sans text-[12px] text-[#a0a0a0]">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors uppercase tracking-widest">{link}</a>
            ))}
          </div>

          <button 
            onClick={scrollToHero}
            className="font-sans text-[12px] text-[#a0a0a0] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            Back to top <span>↑</span>
          </button>
        </div>
      </footer>
    </section>
  )
}
