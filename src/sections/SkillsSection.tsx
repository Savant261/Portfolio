import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = {
  Languages: [
    { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Java',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C++',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  ],
  'Web Development': [
    { name: 'React.js',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'FastAPI',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Django',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Three.js',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  ],
  'Machine Learning & AI': [
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Scikit-learn',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Keras',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
    { name: 'Hugging Face',icon: 'https://huggingface.co/front/assets/huggingface_logo-nobg.svg' },
    { name: 'Pandas',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
    { name: 'NumPy',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  ],
  'Data & Visualization': [
    { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
    { name: 'Plotly',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg' },
    { name: 'Tableau',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg' },
    { name: 'Power BI',   icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
    { name: 'MS Excel',   icon: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' },
  ],
  Databases: [
    { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  ],
  'DevOps & Cloud': [
    { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'AWS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
    { name: 'Linux',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Celery',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/celery/celery-original.svg' },
  ],
  'Developer Tools': [
    { name: 'VS Code',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'Postman',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    { name: 'Jupyter',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
  ],
};

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // 1. Epic Header Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 75%',
          toggleActions: 'restart none none reverse'
        }
      });

      tl.fromTo('.skills-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo('.skills-word',
        { opacity: 0, y: 40, rotation: 5 },
        { opacity: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' },
        "-=0.4"
      )
      .fromTo('.skills-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.5"
      );

      // 2. 3D Card Entrance & Dynamic Tilt Hover
      const cards = gsap.utils.toArray('.skill-card');
      gsap.fromTo(cards,
        {
          opacity: 0,
          y: 120,
          rotationX: 45,
          rotationY: -15,
          z: -300,
          scale: 0.8,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 85%',
          },
          onComplete: () => {
             // Attach 3D tilt hover listeners
             cards.forEach((card: any) => {
                card.addEventListener('mousemove', (e: MouseEvent) => {
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  
                  gsap.to(card, {
                    rotationY: 15 * (x / (rect.width / 2)),
                    rotationX: -15 * (y / (rect.height / 2)),
                    transformPerspective: 1000,
                    ease: 'power2.out',
                    duration: 0.4
                  });
                });
                
                card.addEventListener('mouseleave', () => {
                  gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'elastic.out(1, 0.4)',
                    duration: 1
                  });
                });
             });
          }
        }
      );

      // 3. Icon item stagger inside cards
      gsap.fromTo('.skill-item',
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          stagger: 0.02,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 75%',
          }
        }
      );
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="skills" className="skills-section w-full mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col max-w-[1400px]">
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        .skill-card:last-child {
          grid-column: 1 / -1;
          max-width: 480px;
          margin: 0 auto;
          width: 100%;
        }

        .skill-card {
          background: #111111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 28px;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .skill-card:hover {
          border-color: rgba(255, 77, 0, 0.4);
          box-shadow: 0 30px 60px rgba(255, 77, 0, 0.15);
        }

        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 2px;
          width: 0%;
          background: #ff4d00;
          transition: width 0.4s ease;
        }

        .skill-card:hover::before {
          width: 100%;
        }

        .skill-item img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      filter 0.25s ease;
        }

        .skill-item span {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #a0a0a0;
          text-align: center;
          line-height: 1.3;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        .skill-item:hover img {
          transform: scale(1.2);
          filter: drop-shadow(0 0 8px rgba(255, 77, 0, 0.5));
        }

        .skill-item:hover .icon-fallback {
          transform: scale(1.2);
          filter: drop-shadow(0 0 8px rgba(255, 77, 0, 0.5));
          background: rgba(255,77,0,0.4) !important;
          color: white !important;
        }

        .skill-item:hover span {
          color: #ffffff;
        }
      `}</style>
      
      {/* Header */}
      <div className="flex flex-col mb-[60px] w-full items-start" style={{ perspective: '1000px' }}>
        <div className="text-orange font-sans text-[11px] uppercase tracking-[3px] mb-4 overflow-hidden">
          <span className="skills-subtitle inline-block">07 — SKILLS</span>
        </div>
        <h2 className="font-display text-white text-[clamp(44px,7vw,70px)] leading-[1] tracking-[1px] mb-6 flex flex-wrap gap-x-4">
          <span className="overflow-hidden inline-block py-2"><span className="skills-word inline-block">SKILLS</span></span>
          <span className="overflow-hidden inline-block py-2"><span className="skills-word inline-block">&</span></span>
          <span className="overflow-hidden inline-block py-2"><span className="skills-word inline-block text-orange">TECHNOLOGIES</span></span>
        </h2>
        <div className="overflow-hidden max-w-[600px]">
          <p className="skills-desc font-sans text-[#a0a0a0] text-[15px] leading-relaxed">
            Every tool, language, and framework I've used to build real things.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="skills-grid w-full">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skill-card">
             <h3 className="font-display text-[#ff4d00] text-[13px] uppercase tracking-[3px] font-bold mb-5">
               {category}
             </h3>

             <div className="flex flex-wrap gap-[16px]">
               {items.map((skill) => (
                 <div key={skill.name} className="skill-item flex flex-col items-center gap-[6px] w-[64px] cursor-default group relative">
                   <div className="relative flex items-center justify-center">
                     <img 
                       src={skill.icon} 
                       alt={skill.name} 
                       onError={(e) => {
                         const target = e.currentTarget;
                         target.style.display = 'none';
                         const fallback = target.parentElement?.querySelector('.icon-fallback') as HTMLElement;
                         if (fallback) fallback.style.display = 'flex';
                       }}
                     />
                     <div
                       className="icon-fallback"
                       style={{
                         display: 'none',
                         width: '36px',
                         height: '36px',
                         background: 'rgba(255,77,0,0.15)',
                         border: '1px solid rgba(255,77,0,0.3)',
                         borderRadius: '6px',
                         alignItems: 'center',
                         justifyContent: 'center',
                         fontSize: '11px',
                         fontFamily: "'Quantico', sans-serif",
                         color: '#ff4d00',
                         fontWeight: '700',
                         transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease, background 0.25s ease, color 0.25s ease'
                       }}
                     >
                       {skill.name.slice(0, 2).toUpperCase()}
                     </div>
                   </div>
                   <span>
                     {skill.name}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        ))}
      </div>
    </section>
  )
}
