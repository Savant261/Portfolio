import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHARS = [
  '{', '}', '(', ')', '=>', '[]', '||', '&&',
  'def', 'import', 'null', 'true', 'false', 'return',
  'const', 'async', 'await', 'class', 'self', 'if',
  '01', '10', '00', '11', '//', '/*', '*/',
  'fn', 'let', 'var', 'for', 'while', 'try',
  '[]', '{}', '::', '->', '!=', '==', '+='
];

const CodeRainCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    const FONT_SIZE = 15;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    let cols = Math.floor(W / (FONT_SIZE * 2.2));

    type Column = {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      charIndex: number;
    };

    let columns: Column[] = Array.from({ length: cols }, (_, i) => ({
      x: i * (FONT_SIZE * 2.2),
      y: Math.random() * -H,
      speed: 0.8 + Math.random() * 1.8,
      opacity: 0.3 + Math.random() * 0.7,
      charIndex: Math.floor(Math.random() * CHARS.length),
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.10)';
      ctx.fillRect(0, 0, W, H);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', 'Courier New', monospace`;

      columns.forEach((col) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        ctx.fillStyle = `rgba(255, 77, 0, ${col.opacity})`;
        ctx.fillText(char, col.x, col.y);

        if (col.y > FONT_SIZE * 3) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = `rgba(255, 140, 60, ${col.opacity * 0.7})`;
          ctx.fillText(trailChar, col.x, col.y - FONT_SIZE * 2);
        }

        col.y += isHovered.current ? col.speed * 1.8 : col.speed;

        if (col.y > H + FONT_SIZE) {
          col.y = Math.random() * -H * 0.5;
          col.speed = 0.8 + Math.random() * 1.8;
          col.opacity = 0.3 + Math.random() * 0.7;
        }
      });

      if (Math.random() < 0.016) {
        const flashCol = columns[Math.floor(Math.random() * columns.length)];
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(
          CHARS[Math.floor(Math.random() * CHARS.length)],
          flashCol.x,
          flashCol.y
        );
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      cols = Math.floor(W / (FONT_SIZE * 2.2));
      columns = Array.from({ length: cols }, (_, i) => ({
        x: i * (FONT_SIZE * 2.2),
        y: Math.random() * -H,
        speed: 0.8 + Math.random() * 1.8,
        opacity: 0.3 + Math.random() * 0.7,
        charIndex: Math.floor(Math.random() * CHARS.length),
      }));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        .code-rain-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 340px;
          background: rgba(10, 10, 10, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          cursor: crosshair;
        }
        .code-rain-wrapper canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
        }
        .code-rain-initials {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', 'Quantico', sans-serif;
          font-size: clamp(64px, 8vw, 96px);
          color: #ffffff;
          letter-spacing: 8px;
          z-index: 10;
          pointer-events: none;
          text-shadow:
            0 0 40px rgba(255, 77, 0, 0.6),
            0 0 80px rgba(255, 77, 0, 0.3);
        }
      `}</style>
      <div 
        className="code-rain-wrapper"
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
      >
        <canvas ref={canvasRef} />
        <div className="code-rain-initials">SKJ</div>
      </div>
    </>
  );
};

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null)
  
  // Custom split text logic since we don't have GSAP SplitText plugin
  const titleText1 = "LET'S WORK"
  const titleText2 = "TOGETHER"

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // LETTER_SPLIT animation
      gsap.fromTo('.cta-letter',
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.cta-title-container',
            start: 'top 80%',
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Generate 20 repetitions for infinite marquee
  const marqueeItems = Array.from({ length: 20 }).map((_, i) => (
    <span key={i} className="flex items-center gap-4 shrink-0 mx-2">
      <span className="font-display text-[clamp(18px,2.5vw,28px)] text-white tracking-widest whitespace-nowrap">GET STARTED</span>
      <span className="font-display text-[clamp(18px,2.5vw,28px)] text-[#ff4d00]">✦</span>
    </span>
  ))

  return (
    <section ref={containerRef} className="w-full flex flex-col overflow-hidden bg-[#0a0a0a] pt-12">
      {/* Marquee Ticker */}
      <div className="w-full bg-[rgba(255,77,0,0.08)] border-y border-[rgba(255,77,0,0.2)] py-4 overflow-hidden flex relative">
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { display: flex; width: max-content; animation: marquee 18s linear infinite; }
        `}</style>
        <div className="animate-marquee">
          {marqueeItems}
          {marqueeItems}
        </div>
      </div>

      {/* Main CTA Content */}
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex flex-col cta-title-container relative z-20">
          <h2 className="font-display text-[clamp(60px,9vw,120px)] leading-[0.85] tracking-tight mb-8">
            <div className="overflow-hidden flex">
              {titleText1.split('').map((char, i) => (
                <span key={`1-${i}`} className={`cta-letter inline-block ${char === ' ' ? 'w-[clamp(16px,2vw,30px)]' : ''}`}>{char}</span>
              ))}
            </div>
            <div className="overflow-hidden flex text-orange">
              {titleText2.split('').map((char, i) => (
                <span key={`2-${i}`} className="cta-letter inline-block">{char}</span>
              ))}
            </div>
          </h2>
          
          <p className="font-sans text-[14px] text-[#a0a0a0] uppercase tracking-widest max-w-[400px] leading-relaxed mb-10">
            FULL-STACK DEVELOPER FROM INDIA, CRAFTING HIGH-PERFORMANCE, INTELLIGENT WEB SYSTEMS.
          </p>

          <a 
            href="#contact" 
            onClick={handleScrollToContact}
            className="w-fit primary-btn font-display text-[20px] uppercase tracking-widest px-10 py-3.5 rounded flex items-center justify-center group"
          >
            CONTACT ME <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Right Column (Portrait) */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[400px] lg:h-[500px]">
          {/* Layer 1: Ghost Text */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
            <span 
              className="font-display text-[clamp(60px,16vw,200px)] tracking-[-4px] leading-none"
              style={{ color: 'rgba(255,255,255,0.07)' }}
            >
              SAVANT
            </span>
          </div>

          {/* Layer 2: Orange Glow */}
          <div 
            className="absolute z-10 w-[260px] h-[260px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,77,0,0.25), transparent 70%)',
              filter: 'blur(40px)'
            }}
          />

          {/* Layer 3: Profile Photo */}
          <div className="relative z-20 w-[300px] h-[360px] md:w-[380px] md:h-[400px] lg:w-[480px] lg:h-[480px] flex justify-center items-center">
             <CodeRainCard />
          </div>
        </div>

      </div>
    </section>
  )
}
