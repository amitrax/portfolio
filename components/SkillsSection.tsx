"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, Suspense } from "react"
import dynamic from "next/dynamic"

const SkillSphere = dynamic(() => import("./SkillSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "C", "C++", "Java", "SQL"],
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "Data & ML",
    skills: ["Pandas", "NumPy", "Scikit-learn"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Power BI", "Tableau", "Git", "GitHub"],
  },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-10 mx-auto" />

          {/* 3D Skill Sphere - Desktop */}
          <div className="hidden md:block">
            <Suspense fallback={
              <div className="w-full h-[500px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <SkillSphere />
            </Suspense>
            <p className="text-center text-muted-foreground text-sm mt-4">
              Drag to rotate the sphere
            </p>
          </div>

          {/* Grid Fallback - Mobile */}
          <div className="md:hidden space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="glass-card p-5 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-primary mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-secondary/50 text-foreground rounded-full text-sm border border-primary/20 hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
