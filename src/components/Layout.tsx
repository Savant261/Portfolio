import Navigation from './Navigation'
import SocialSidebar from './SocialSidebar'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BackgroundCanvas from './BackgroundCanvas'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh()
    })
  }, [])

  return (
    <div className="w-screen min-h-screen m-0 p-0 border-none rounded-none font-sans flex flex-col selection:bg-orange/30 selection:text-white">
      <BackgroundCanvas />
      <Navigation />
      <SocialSidebar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      {/* Footer can be added here if needed */}
      <footer className="w-full py-8 text-center text-white-dim text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Savant Kumar Jena. All rights reserved.</p>
      </footer>
    </div>
  )
}
