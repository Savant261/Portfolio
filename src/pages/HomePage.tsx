import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import WhatIDoSection from '../sections/WhatIDoSection'
import SkillsSection from '../sections/SkillsSection'
import ProjectsSection from '../sections/ProjectsSection'
import CertificationsSection from '../sections/CertificationsSection'
import EducationSection from '../sections/EducationSection'
import CodingProfilesSection from '../sections/CodingProfilesSection'
import CTASection from '../sections/CTASection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <WhatIDoSection />
      <ProjectsSection />
      <CertificationsSection />
      <EducationSection />
      <CodingProfilesSection />
      <SkillsSection />
      <CTASection />
      <ContactSection />
    </div>
  )
}
