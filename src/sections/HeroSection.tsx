import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Download } from 'lucide-react'
import profileImg from '../assets/profile.jpeg'

const GeometricProfile = () => {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-[10/11] mx-auto group z-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
      {/* Outer Glow */}
      <div className="absolute -inset-6 bg-orange/20 blur-[50px] rounded-full opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Main Container Layer (Outer Thin Border) */}
      <div 
        className="absolute inset-0 bg-[#3a1d13] transition-all duration-500 group-hover:bg-[#5A3226]"
        style={{ clipPath: 'polygon(32px 0, calc(100% - 80px) 0, 100% 80px, 100% calc(100% - 32px), calc(100% - 32px) 100%, 80px 100%, 0 calc(100% - 80px), 0 32px)' }}
      >
        {/* Gap Layer */}
        <div 
          className="absolute inset-[2px] bg-[#0a0a0a]"
          style={{ clipPath: 'polygon(30px 0, calc(100% - 78px) 0, 100% 78px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 78px 100%, 0 calc(100% - 78px), 0 30px)' }}
        >
          {/* Inner Thick Border */}
          <div 
            className="absolute inset-[10px] bg-[#3a1d13] transition-all duration-500 group-hover:bg-[#5A3226]"
            style={{ clipPath: 'polygon(22px 0, calc(100% - 70px) 0, 100% 70px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 70px 100%, 0 calc(100% - 70px), 0 22px)' }}
          >
            {/* Image Layer */}
            <div 
              className="absolute inset-[14px] bg-[#111] overflow-hidden"
              style={{ clipPath: 'polygon(18px 0, calc(100% - 66px) 0, 100% 66px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 66px 100%, 0 calc(100% - 66px), 0 18px)' }}
            >
              <img 
                src={profileImg}
                alt="Savant Profile Geometric"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const roles = [
  ['Full-Stack', 'Developer'],
  ['ML', 'Engineer'],
  ['Backend', 'Developer'],
  ['AI Systems', 'Builder'],
  ['Open Source', 'Contributor'],
];

const RedactedWord = ({
  text,
  revealed
}: {
  text: string;
  revealed: boolean;
}) => {
  return (
    <span className="redacted-word-wrapper">
      <span
        className="real-word"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          position: 'relative',
          zIndex: 2,
          color: '#ffffff',
        }}
      >
        {text}
      </span>
      <span
        className="redaction-bar"
        style={{
          position: 'absolute',
          top: '2px', left: '-3px', right: '-3px', bottom: '2px',
          background: revealed ? 'transparent' : 'rgba(255, 77, 0, 0.15)',
          borderRadius: '2px',
          transition: 'background 0.35s ease',
          zIndex: 3,
          boxShadow: revealed ? 'none' : 'inset 0 0 0 100px rgba(20, 10, 5, 0.92)',
        }}
      />
      <span
        className="reveal-flash"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255, 77, 0, 0.3)',
          borderRadius: '2px',
          opacity: 0,
          animation: revealed ? 'revealFlash 0.5s ease forwards' : 'none',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />
    </span>
  );
};

const RedactionReveal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [word1Revealed, setWord1Revealed] = useState(false);
  const [word2Revealed, setWord2Revealed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setWord1Revealed(true), 400);
    const t2 = setTimeout(() => setWord2Revealed(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setWord1Revealed(false);
      setWord2Revealed(false);

      setTimeout(() => {
        setCurrentIndex((prev: number) => (prev + 1) % roles.length);
      }, 500);

      setTimeout(() => setWord1Revealed(true), 700);
      setTimeout(() => setWord2Revealed(true), 1050);
    }, 3800);

    return () => clearInterval(cycle);
  }, []);

  const [w1, w2] = roles[currentIndex];

  return (
    <div className="hero-subtitle">
      <span className="subtitle-prefix">— </span>
      <RedactedWord text={w1} revealed={word1Revealed} />
      {' '}
      <RedactedWord text={w2} revealed={word2Revealed} />
      <span className="subtitle-suffix">, India</span>
    </div>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Refs for animation targets
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const ctaContainerRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

    const hireBtnRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      // Initial states for stagger elements
      gsap.set([labelRef.current, subtitleRef.current, quoteRef.current, ctaContainerRef.current], { 
        y: 60, rotation: 1.5, opacity: 0 
      })
    
    gsap.set(titleRef.current, { clipPath: 'inset(100% 0 0 0)' })
    gsap.set(rightColRef.current, { x: 40, opacity: 0 })
    
    const statItems = statsRef.current?.children
    if (statItems) {
      gsap.set(statItems, { y: 20, opacity: 0 })
    }

    // Animation Sequence
    tl.to(labelRef.current, { y: 0, rotation: 0, opacity: 1, duration: 0.6 }, 0.1)
      .to(titleRef.current, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.out' }, 0.25)
      .to(subtitleRef.current, { y: 0, rotation: 0, opacity: 1, duration: 0.5 }, 0.5)
      .to(quoteRef.current, { y: 0, rotation: 0, opacity: 1, duration: 0.5 }, 0.65)
      .to(ctaContainerRef.current, { y: 0, rotation: 0, opacity: 1, duration: 0.5 }, 0.8)
      .to(rightColRef.current, { x: 0, opacity: 1, duration: 0.8 }, 0.9)
    
    if (statItems) {
      tl.to(statItems, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 1.2)
      
      // Animate numbers
      const numbers = statsRef.current?.querySelectorAll('.stat-num')
      if (numbers) {
        numbers.forEach((num) => {
          const target = parseFloat(num.getAttribute('data-target') || '0')
          const prefix = num.getAttribute('data-prefix') || ''
          const suffix = num.getAttribute('data-suffix') || ''
          
          gsap.timeline({
            scrollTrigger: {
              trigger: num,
              start: 'top 90%',
              once: true
            }
          }).to({ val: 0 }, {
            val: target,
            duration: 1.5,
            ease: 'power3.out',
            onUpdate: function() {
              if (num) num.textContent = `${prefix}${Math.floor(this.targets()[0].val)}${suffix}`
            }
          })
        })
      }
    }
    
    // MAGNETIC_HOVER effect for Hire Me
    const btn = hireBtnRef.current
    const onMouseMove = (e: MouseEvent) => {
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      
      if (Math.abs(distX) < rect.width && Math.abs(distY) < rect.height) {
         gsap.to(btn, { x: distX * 0.15, y: distY * 0.15, duration: 0.3, ease: 'power2.out' })
      } else {
         gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }
    }
    const onMouseLeave = () => {
      if (!btn) return
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    }
    
    if (btn) {
      window.addEventListener('mousemove', onMouseMove)
      btn.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      tl.kill()
      if (btn) {
        window.removeEventListener('mousemove', onMouseMove)
        btn.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [])

  const stats = [
    { label: 'Problems Solved', value: 245, suffix: '+' },
    { label: 'Certifications', value: 10, suffix: '+' },
    { label: 'Projects Built', value: 7, suffix: '+' },
    { label: 'Years Coding', value: 3, suffix: '+' },
  ]

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-screen px-8 pt-24 pb-12 box-border flex flex-col max-w-[1600px] mx-auto overflow-hidden">
      
      {/* Main Split Content */}
      <div className="flex-1 flex flex-col lg:flex-row mb-16 gap-12 lg:gap-8">
        
        {/* Left Column */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          
          <div ref={labelRef} className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-6 flex items-center gap-2">
            <span>✦</span> <span>Available for Work</span>
          </div>
          
          {/* Giant Title Wrapper for ClipPath */}
          <div className="overflow-hidden pb-2 mb-2">
            <h1 
              ref={titleRef} 
              className="hero-name font-display text-white tracking-[-2px] leading-[0.9]"
              style={{ fontSize: 'clamp(80px, 12vw, 140px)' }}
            >
              SAVANT
            </h1>
          </div>
          
          <div ref={subtitleRef} className="mt-2 mb-6">
            <RedactionReveal />
          </div>
          
          <div ref={quoteRef} className="hero-quote font-sans text-[15px] sm:text-base text-[#a0a0a0] max-w-[420px] pl-4 italic hidden sm:block">
            "Engineering intelligent systems at the intersection of full-stack development and machine learning."
          </div>
          
          <div ref={ctaContainerRef} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a 
              ref={hireBtnRef} 
              href="/CV.pdf"
              download="CV.pdf"
              className="group primary-btn font-display text-xl px-10 py-3.5 rounded transition-all duration-300 uppercase tracking-wide flex items-center gap-2 relative"
            >
              <span>Resume</span>
              <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-[2px]" />
            </a>
            <div className="bg-[#111] border border-white/10 rounded-full px-5 py-2 text-sm text-white-dim">
              🎓 B.Tech CSE · Open to Opportunities
            </div>
          </div>
          
        </div>
        
        {/* Right Column */}
        <div ref={rightColRef} className="w-full lg:w-[45%] flex items-center justify-center relative min-h-[350px] md:min-h-[450px] lg:min-h-[550px]">
          <GeometricProfile />
        </div>
        
      </div>
      
      {/* Stat Bar */}
      <div 
        ref={statsRef} 
        className="w-full flex justify-between border-t border-white/10 pt-12 lg:pt-16 flex-wrap"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex-1 min-w-[140px] flex flex-col items-center relative gap-1.5 mb-8 lg:mb-0">
            <div className="font-display text-[48px] text-white leading-none stat-num text-center" data-target={stat.value} data-suffix={stat.suffix}>
              0{stat.suffix}
            </div>
            <div className="font-sans text-[12px] text-white-dim uppercase tracking-[2px] text-center whitespace-nowrap">
              {stat.label}
            </div>
            {i !== stats.length - 1 && (
              <div 
                className="hidden lg:block absolute w-px bg-[rgba(255,255,255,0.08)]" 
                style={{ 
                  height: '40px', 
                  right: 0, 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }} 
              />
            )}
          </div>
        ))}
      </div>
      
    </section>
  )
}
