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

// Removed unused skillCategories array

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="py-12 sm:py-16 px-4 sm:px-6">
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

          {/* 3D Skill Sphere - Visible on all devices */}
          <div className="w-full">
            <Suspense fallback={
              <div className="w-full h-[250px] md:h-[500px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <SkillSphere />
            </Suspense>
            <p className="text-center text-muted-foreground text-sm mt-4">
              Drag to rotate the sphere
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
