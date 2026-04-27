"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Star, Sparkles, Zap } from "lucide-react"

const projects = [
  {
    title: "NeuroForge AI",
    subtitle: "Multi-Feature AI SaaS Platform",
    description:
      "Built a full-stack AI-powered SaaS platform integrating multiple intelligent tools into a unified system, including an AI chat assistant, image generator, resume builder, and ATS resume analyzer. The platform uses Google Gemini API for real-time responses and intelligent content generation, along with ATS scoring, keyword extraction, and resume optimization.",
    tech: ["Next.js", "Tailwind CSS", "Flask", "MongoDB", "Gemini API"],
    featured: true,
    isFeaturedMain: true,
    github: "https://github.com/amitrax/ai-saas-frontend",
    demo: "https://ai-saas-frontend-henna.vercel.app",
  },
  {
    title: "AI Resume SaaS Platform",
    description:
      "A comprehensive AI-powered resume builder featuring ATS score analysis, AI resume generator, chatbot assistant, and AI image generation. Built to help job seekers create optimized resumes.",
    tech: ["Python", "Flask", "NLP", "AI APIs", "React"],
    featured: true,
    github: "#",
    demo: "#",
  },
  {
    title: "Emotion Detection System",
    description:
      "Real-time emotion detection system using computer vision. Analyzes facial expressions to identify emotions using OpenCV and FER library.",
    tech: ["Python", "OpenCV", "FER", "Deep Learning"],
    featured: false,
    github: "#",
    demo: "#",
  },
  {
    title: "Data Analytics Dashboard",
    description:
      "Interactive business intelligence dashboard providing actionable insights through dynamic visualizations. Built with Power BI and Tableau.",
    tech: ["Power BI", "Tableau", "SQL", "DAX"],
    featured: false,
    github: "#",
    demo: "#",
  },
]

interface ProjectCardProps {
  project: typeof projects[0]
  index: number
  isInView: boolean
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl transition-all duration-500 ${
        project.isFeaturedMain ? "md:col-span-2" : ""
      }`}
    >
      {/* Animated border glow */}
      <div 
        className={`absolute -inset-[1px] rounded-2xl transition-all duration-500 ${
          project.isFeaturedMain 
            ? "bg-gradient-to-r from-primary via-accent to-blue-500 opacity-60" 
            : isHovered 
              ? "bg-gradient-to-r from-primary/80 to-accent/80 opacity-100" 
              : "bg-gradient-to-r from-primary/30 to-accent/30 opacity-0"
        }`}
        style={{
          filter: isHovered || project.isFeaturedMain ? "blur(1px)" : "blur(0px)",
        }}
      />
      
      {/* Card content */}
      <div 
        className={`relative glass rounded-2xl p-6 md:p-8 h-full transition-all duration-500 ${
          isHovered ? "bg-card/90" : "bg-card/75"
        }`}
        style={{
          transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered 
            ? "0 20px 40px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.1)" 
            : project.isFeaturedMain 
              ? "0 10px 30px rgba(6, 182, 212, 0.1)" 
              : "none",
        }}
      >
        {/* Featured badge */}
        {project.isFeaturedMain ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/30 to-accent/30 text-primary text-sm font-semibold rounded-full mb-4 border border-primary/40"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Featured Project
            <Zap className="w-4 h-4" />
          </motion.div>
        ) : project.featured ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Featured
          </div>
        ) : null}

        {/* Title */}
        <h3 className={`font-bold text-foreground mb-2 transition-colors ${
          project.isFeaturedMain ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
        } ${isHovered ? "text-primary" : ""}`}>
          {project.title}
        </h3>
        
        {project.subtitle && (
          <p className="text-accent font-medium mb-3">{project.subtitle}</p>
        )}

        {/* Description with reveal effect */}
        <motion.p 
          className={`text-muted-foreground mb-5 leading-relaxed ${
            project.isFeaturedMain ? "text-base" : "text-sm md:text-base"
          }`}
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack with stagger animation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + techIndex * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
              className={`px-3 py-1.5 text-sm bg-secondary/80 text-foreground rounded-lg border border-border transition-all cursor-default ${
                isHovered ? "border-primary/40" : ""
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons with enhanced hover */}
        <div className="flex gap-3">
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center gap-2 px-5 py-2.5 font-medium rounded-xl overflow-hidden transition-all ${
              project.isFeaturedMain 
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" 
                : "bg-gradient-to-r from-primary to-accent text-primary-foreground"
            }`}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <ExternalLink className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Live Demo</span>
          </motion.a>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 glass border border-primary/30 text-foreground font-medium rounded-xl transition-all"
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={ref} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
