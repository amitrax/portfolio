"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Database, LineChart, Lightbulb } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code",
  },
  {
    icon: Database,
    title: "Data-Driven",
    description: "Making decisions backed by data",
  },
  {
    icon: LineChart,
    title: "Analytics",
    description: "Transforming data into insights",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Finding elegant solutions",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            I&apos;m a passionate Computer Science Engineering student with a strong foundation in 
            software development and data analytics. I specialize in building intelligent solutions 
            that bridge the gap between complex data and real-world applications.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            With experience in Python, Machine Learning, and modern web technologies, I create 
            tools that not only solve problems but also provide meaningful insights. My goal is 
            to leverage technology to make data accessible and actionable for everyone.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass rounded-2xl p-5 hover:border-primary/40 transition-all group"
              >
                <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
