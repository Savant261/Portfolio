import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const profiles = [
  {
    platform: 'LeetCode',
    handle: '@SAVANTKJ',
    badge: null,
    color: '#ffa116',
    streak: '52 days',
    url: 'https://leetcode.com/u/SAVANTKJ/',
    lcFooter: true,
    stats: [
      { label: 'Problems Solved', val: '128', pct: '40%', customColor: true, hidePlus: true },
      { label: 'Easy', val: '83', pct: '65%', customColor: true, hidePlus: true },
      { label: 'Medium', val: '32', pct: '25%', customColor: true, hidePlus: true },
      { label: 'Hard', val: '13', pct: '10%', customColor: true, hidePlus: true },
    ]
  },
  {
    platform: 'GeeksForGeeks',
    handle: '@savant_jena',
    badge: '5★ Coder',
    color: '#2f8d46',
    streak: '50 days',
    url: 'https://www.geeksforgeeks.org/profile/savantk9asw',
    stats: [
      { label: 'Problems', val: '150', pct: '90%', hidePlus: false },
      { label: 'Score', val: '200', pct: '80%', hidePlus: false },
      { label: 'Inst. Rank', val: '8051', pct: '40%', hidePlus: true },
    ]
  },
  {
    platform: 'CodeStudio',
    handle: '@savant_jena',
    badge: 'Level 6',
    color: '#f5a623',
    streak: '53 days',
    url: 'https://www.naukri.com/code360/profile/91f02fa1-5d1a-46ca-b4b6-aade451d3d4b',
    badges: ['Arrays', 'Math', 'Sorting'],
    stats: [
      { label: 'Problems', val: '160', pct: '70%', hidePlus: false },
      { label: 'XP', val: '3000', pct: '80%', hidePlus: false },
      { label: 'Streak', val: '53', pct: '100%', hidePlus: false },
    ]
  },
  {
    platform: 'GitHub',
    handle: '@Savant261',
    badge: null,
    color: '#2b82f6',
    streak: null,
    url: 'https://github.com/Savant261',
    graph: true,
    stats: [
      { label: 'Repositories', val: '18', pct: '35%', hidePlus: true },
      { label: 'Stars Earned', val: '7', pct: '15%', hidePlus: true },
      { label: 'Commits (2026)', val: '107', pct: '55%', hidePlus: true },
    ]
  }
]

export default function CodingProfilesSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      // Numerical counter roll
      const counters = document.querySelectorAll('.code-stat-num')
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0')
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          ease: 'power3.out',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%'
          }
        })
      })

      // CURTAIN_REVEAL
      gsap.fromTo('.profile-heading',
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

      // Card reveals (DRIFT_UP)
      gsap.fromTo('.term-card',
        { y: 60, rotation: 1.5, opacity: 0 },
        {
          y: 0, rotation: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: '.cards-grid', start: 'top 80%' }
        }
      )
      
      gsap.fromTo('.spotlight-card',
        { y: 60, rotation: 1.5, opacity: 0 },
        {
          y: 0, rotation: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.spotlight-card', start: 'top 85%' }
        }
      )
      
      // Progress bars
      const bars = document.querySelectorAll('.term-bar-fill')
      bars.forEach(bar => {
        const pct = bar.getAttribute('data-pct') || '0%'
        gsap.to(bar, {
          width: pct, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: bar, start: 'top 85%' }
        })
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="coding-profiles" className="w-full mx-auto px-6 lg:px-12 py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col max-w-[1400px]">
      <style>{`
        .lc-footer-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: monospace;
          font-size: 13px;
          color: #a0a0a0;
          padding: 4px 0;
        }

        .lc-footer-line:hover {
          color: #ffffff;
          transition: color 0.2s ease;
        }
      `}</style>
      <div className="text-orange font-sans text-xs sm:text-sm uppercase tracking-[3px] mb-4">
        06 — COMPETITIVE
      </div>
      <div className="overflow-hidden pb-4 mb-6 text-left max-w-[900px]">
        <h2 className="profile-heading font-display text-white text-[clamp(44px,7vw,70px)] leading-[1] tracking-[1px]">
          CODING <span className="text-orange">PROFILES</span>
        </h2>
      </div>
      <p className="font-sans text-[#a0a0a0] mb-16 max-w-[600px] leading-relaxed">
        My competitive programming journey across different platforms.
      </p>

      {/* Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop. Equal heights using items-stretch */}
      <div className="cards-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 items-stretch">
        {profiles.map((profile, idx) => (
          <div 
            key={idx}
            className="term-card flex flex-col bg-[#0d0d0d] rounded-lg overflow-hidden font-mono group transition-transform duration-300 hover:-translate-y-2 h-full"
            style={{ border: `1px solid ${profile.color}40`, boxShadow: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 16px 40px ${profile.color}20`; e.currentTarget.style.border = `1px solid ${profile.color}` }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.border = `1px solid ${profile.color}40` }}
          >
            {/* Top Bar */}
            <div className="w-full h-8 bg-[#1a1a1a] flex items-center justify-between px-4 border-b border-white/5 shrink-0">
              <div className="flex items-center">
                <div className="flex gap-1.5 mr-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-white-dim text-[11px] opacity-70 leading-none mt-0.5">~ / {profile.platform.toLowerCase()}</span>
              </div>
              
              {/* TODO: Replace href with real profile URL */}
              {/* LeetCode: https://leetcode.com/u/SAVANTKJ/ */}
              {/* GFG: https://auth.geeksforgeeks.org/user/savant_jena */}
              {/* CodeStudio: https://www.naukri.com/code360/profile/91f02fa1-5d1a-46ca-b4b6-aade451d3d4b */}
              {/* GitHub: https://github.com/Savant261*/}
              <a href={profile.url} target="_blank" rel="noopener noreferrer" className="group/link flex items-center shrink-0">
                <ExternalLink className="w-[14px] h-[14px] text-[#a0a0a0] group-hover/link:text-[#ff4d00] transition-colors duration-300" />
              </a>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              {/* Handle */}
              <div className="text-[13px] text-white-dim mb-6 flex items-center shrink-0">
                <span className="text-orange mr-1.5 leading-none">▸</span> <span className="leading-none mt-0.5">{profile.platform}</span> <span className="opacity-70 ml-1 leading-none mt-0.5">{profile.handle}</span> 
                {profile.badge && (
                  <span className="ml-2 px-2 py-0.5 rounded text-[10px] leading-tight" style={{ backgroundColor: `${profile.color}20`, color: profile.color }}>
                    {profile.badge}
                  </span>
                )}
              </div>

              {/* Stats Layout */}
              <div className="flex flex-col gap-0 border border-white/5 rounded bg-white/[0.02]">
                {profile.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col p-3 border-b border-white/5 last:border-b-0">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[12px] text-white-dim">{stat.label}:</span>
                      <div>
                         <span className="text-[13px] code-stat-num" style={{ color: (stat as any).customColor ? profile.color : 'white' }} data-target={stat.val}>0</span>
                         {!stat.hidePlus && <span className="text-[13px]" style={{ color: (stat as any).customColor ? profile.color : 'white' }}>+</span>}
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                      <div className="term-bar-fill h-full rounded-full w-0" style={{ backgroundColor: profile.color }} data-pct={stat.pct} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Badges Custom Block */}
              {profile.badges && (
                <div className="mt-6 shrink-0">
                   <div className="text-[#a0a0a0] text-[13px] font-mono mb-2">DSA Achiever Badges:</div>
                   <div className="flex flex-row items-center gap-[8px]">
                     {profile.badges.map(b => (
                       <span key={b} className="bg-[#ff4d00]/10 border border-[#ff4d00]/30 text-[#ff4d00] rounded px-2 py-0.5 text-[11px] font-mono whitespace-nowrap leading-none overflow-hidden">
                         {b}
                       </span>
                     ))}
                   </div>
                </div>
              )}

              {/* GitHub Graph Custom Block */}
              {profile.graph && (
                <div className="mt-6 flex flex-col shrink-0">
                   <div className="text-[#a0a0a0] text-[11px] font-sans mb-3">Contributions · 2026</div>
                   <div className="flex flex-col gap-[3px]">
                     {Array.from({ length: 7 }).map((_, row) => (
                       <div key={row} className="flex flex-row gap-[3px]">
                         {Array.from({ length: 12 }).map((_, col) => {
                            const weight = Math.random() + (col / 12);
                            let bgClass = "bg-white/5";
                            if (weight > 1.5) bgClass = "bg-[#ff4d00]/90";
                            else if (weight > 1.2) bgClass = "bg-[#ff4d00]/60";
                            else if (weight > 0.8) bgClass = "bg-[#ff4d00]/30";
                            
                            return (
                              <div key={`${row}-${col}`} className={`w-[10px] h-[10px] rounded-[2px] ${bgClass}`} />
                            )
                         })}
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* LeetCode Custom Footer Block */}
              {(profile.platform === 'LeetCode' || (profile as any).lcFooter) && (
                <div className="mt-auto pt-6 flex flex-col shrink-0">
                  <div className="lc-footer-line">
                    <span>📊</span>
                    <span>371 Submissions · 71 Active Days</span>
                  </div>
                  <div className="lc-footer-line">
                    <span>🏅</span>
                    <span>50 Days Badge 2026</span>
                  </div>
                  <div className="lc-footer-line">
                    <span>🔥</span>
                    <span>Max Streak: 51 days</span>
                  </div>
                </div>
              )}

              {/* Streak Footer */}
              {profile.streak && (
                <div className="mt-auto pt-6 text-[12px] shrink-0">
                  🔥 Streak: <span className="text-white">{profile.streak}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Spotlight */}
      <div className="spotlight-card w-full flex flex-col bg-[#111] border border-white/10 rounded-xl overflow-hidden group hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,77,0,0.18)] transition-all duration-300">
        <div className="text-orange font-sans text-[10px] uppercase tracking-[2px] px-8 pt-8 pb-4">
          HACKATHON SPOTLIGHT
        </div>
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-[35%] bg-gradient-to-br from-[#ff4d00]/20 to-black p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/5 min-h-[220px]">
            <Trophy className="w-16 h-16 text-orange mb-4 opacity-90" strokeWidth={1.5} />
            <h3 className="font-display text-2xl text-white tracking-wider text-center">College Hackathon 2025</h3>
          </div>
          <div className="w-full md:w-[65%] p-8 flex flex-col justify-center">
            <h4 className="font-sans text-[22px] text-white font-medium mb-3">FutureForge</h4>
            <p className="font-sans text-[14px] text-white-dim leading-relaxed mb-6 max-w-[600px]">
              Led the development of a unified platform aggregating engineering resources with curated learning paths. Built and shipped a functioning prototype in under 48 hours, earning high marks for complete technical execution.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'Express'].map(tag => (
                <span key={tag} className="font-mono text-[10px] text-white-dim border border-white/10 rounded px-2.5 py-1 uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
