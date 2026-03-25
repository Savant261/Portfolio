import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const BOOT_LINES = [
  "> INITIALIZING SAVANT.OS v2.0...",
  "> LOADING MODULES: [■■■■■■■■░░] 82%",
  "> CONNECTING TO NEURAL INTERFACE...",
  "> MODULES LOADED: react · three.js · gsap · tensorflow",
  "> CALIBRATING PORTFOLIO ENGINE...",
  "> STATUS: FULL-STACK · ML/AI · BACKEND · COMPETITIVE",
  "> SYSTEM READY. WELCOME."
]

export default function BootSequence() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentLineIndex >= BOOT_LINES.length) {
      // Sequence complete
      const tl = gsap.timeline({
        onComplete: () => {
          navigate('/home')
        }
      })
      
      tl.to(containerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.7,
        ease: 'power3.inOut',
        delay: 0.8
      })
      return
    }

    const currentFullLine = BOOT_LINES[currentLineIndex]

    if (currentCharIndex < currentFullLine.length) {
      // Typing current line
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1)
      }, 30) // 30ms per char
      return () => clearTimeout(timer)
    } else {
      // Line finished, pause then next line
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentFullLine])
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, 200) // 200ms pause
      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, navigate])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#060606] z-50 flex items-center justify-center font-mono text-sm md:text-base leading-relaxed p-8"
      style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
    >
      <div className="w-full max-w-2xl">
        {displayedLines.map((line, i) => (
          <div key={i} className="mb-2 flex">
            <span className="text-orange mr-2">{line.substring(0, 1)}</span>
            <span className="text-white-dim whitespace-pre-wrap">{line.substring(1)}</span>
          </div>
        ))}
        
        {currentLineIndex < BOOT_LINES.length && (
          <div className="mb-2 flex">
            <span className="text-orange mr-2">
              {BOOT_LINES[currentLineIndex].substring(0, 1) || '>'}
            </span>
            <span className="text-white whitespace-pre-wrap">
              {BOOT_LINES[currentLineIndex].substring(1, currentCharIndex)}
            </span>
            <span className="inline-block w-[10px] h-[1em] bg-white ml-1 animate-pulse" style={{ verticalAlign: 'text-bottom' }}></span>
          </div>
        )}
      </div>
    </div>
  )
}
