import { Instagram, Twitter, Mail, Linkedin } from 'lucide-react'

export default function SocialSidebar() {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/savantkumarjena/', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/savant_jena', label: 'Twitter' },
    { icon: Mail, href: 'mailto:savantkumarj@gmail.com', label: 'Mail' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/savant-kumar-jena-990b26283/', label: 'LinkedIn' },
  ]

  return (
    <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-6">
      {/* Top Line + Label Container */}
      <div className="relative flex flex-col items-center">
        {/* Rotated Label */}
        <span className="absolute left-1/2 -ml-[40px] top-1/2 -translate-y-1/2 -translate-x-[40px] -rotate-90 text-[10px] tracking-[0.2em] font-sans text-white-dim whitespace-nowrap">
          FIND ME ON
        </span>
        {/* Top Line */}
        <div className="w-px h-20 bg-white/15" />
      </div>

      {/* Icons */}
      <div className="flex flex-col gap-5">
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white-dim hover:text-orange hover:-translate-x-1 transition-all duration-200"
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </a>
          )
        })}
      </div>

      {/* Bottom Line */}
      <div className="w-px h-20 bg-white/15" />
    </div>
  )
}
