"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { FaDownload } from "react-icons/fa"
import Image from "next/image"

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Open to Opportunities Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Open to Opportunities</span>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-40 h-40 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-blue-500 blur-lg opacity-50 animate-pulse" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/50 glow-cyan animate-float">
              <Image
                src="/profile.jpg"
                alt="Amit Mishra"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-balance"
          >
            <span className="text-foreground">Hi, I&apos;m </span>
            <span className="gradient-text">Amit Mishra</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-primary font-medium mb-4"
          >
            Software Developer & Data Analyst
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground text-lg mb-10 max-w-md mx-auto text-pretty"
          >
            Turning complex data into scalable, real-world solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => onNavigate("projects")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-2xl flex items-center gap-2 glow-cyan transition-all"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-2xl flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:border-transparent transition-all duration-300"
            >
              <FaDownload className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
