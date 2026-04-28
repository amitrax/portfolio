"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection"
import ProjectsSection from "@/components/ProjectsSection"
import ResearchSection from "@/components/ResearchSection"
import ExperienceSection from "@/components/ExperienceSection"
import ContactSection from "@/components/ContactSection"

const GalaxyBackground = dynamic(() => import("@/components/GalaxyBackground"), {
  ssr: false,
})

const sectionIds = ["hero", "about", "skills", "projects", "research", "experience", "contact"]

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            })
          },
          {
            threshold: 0,
            rootMargin: "-50% 0px -50% 0px",
          }
        )
        observer.observe(section)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500">
      <GalaxyBackground />
      <Navigation onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Single Column Full Page Layout */}
      <div className="relative z-10 pt-20 overflow-y-auto custom-scrollbar">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResearchSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  )
}
