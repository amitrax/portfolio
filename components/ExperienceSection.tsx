"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase } from "lucide-react"

const experiences = [
  {
    company: "Tata",
    role: "Data Analytics Virtual Experience",
    period: "2024",
    description: "Analyzed business data to derive actionable insights and created comprehensive data visualizations.",
    type: "Virtual Experience",
  },
  {
    company: "Deloitte",
    role: "Data Analytics Virtual Experience",
    period: "2024",
    description: "Worked on data analysis projects, applying statistical methods and creating business intelligence reports.",
    type: "Virtual Experience",
  },
  {
    company: "Dynamix Networks",
    role: "Python Intern",
    period: "2023",
    description: "Developed Python-based solutions for network automation and data processing tasks.",
    type: "Internship",
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.role}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full glass border border-primary/50 flex items-center justify-center glow-cyan">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>

                  <div className="glass rounded-2xl p-6 hover:border-primary/40 transition-all">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {exp.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{exp.company}</h3>
                    <h4 className="text-primary font-medium mb-3">{exp.role}</h4>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
