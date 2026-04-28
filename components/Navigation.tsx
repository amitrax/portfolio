"use client"

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Menu, X, Sparkles, Code2, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

interface NavigationProps {
  onNavigate: (sectionId: string) => void
  activeSection: string
}

const navItems = [
  { id: "hero", label: "Home", icon: "01" },
  { id: "about", label: "About", icon: "02" },
  { id: "skills", label: "Skills", icon: "03" },
  { id: "projects", label: "Projects", icon: "04" },
  { id: "research", label: "Research", icon: "05" },
  { id: "experience", label: "Experience", icon: "06" },
  { id: "contact", label: "Contact", icon: "07" },
]

export default function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          onMouseMove={handleMouseMove}
          className={`relative rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between overflow-hidden transition-all duration-500 ${
            isScrolled 
              ? "bg-popover/90 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]" 
              : "bg-card/60 backdrop-blur-lg border border-white/5"
          }`}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 animate-[shimmer_3s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }} />
          </div>
          
          {/* Mouse follow glow */}
          <motion.div
            className="pointer-events-none absolute w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl"
            style={{
              left: springX,
              top: springY,
              x: "-50%",
              y: "-50%",
            }}
          />

          {/* Floating particles inside navbar */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%",
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.button
            onClick={() => handleClick("hero")}
            className="relative z-10 flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Logo container - round pill shape */}
            <div className="relative">
              {/* Animated gradient border glow */}
              <motion.div
                className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-80 blur-[2px] group-hover:opacity-100 group-hover:blur-[3px] transition-all"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />
              {/* Inner container */}
              <div className="relative bg-popover rounded-full px-4 py-2 flex items-center justify-center border border-cyan-500/30">
                <span className="text-lg font-bold text-foreground tracking-wide">
                  AM
                </span>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-emerald-400 font-medium">Available</span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 relative z-10">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id
              const isHovered = hoveredItem === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 py-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  {/* Background glow on hover/active */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        layoutId="navHighlight"
                        className={`absolute inset-0 rounded-xl ${
                          isActive 
                            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40" 
                            : "bg-white/5"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      layoutId="activeDot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Label with number */}
                  <div className="relative flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono transition-colors duration-300 ${
                      isActive ? "text-cyan-400" : "text-muted-foreground/50 group-hover:text-cyan-400/70"
                    }`}>
                      {item.icon}
                    </span>
                    <span className={`text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? "text-cyan-400" 
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Sparkle effect on active */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-foreground hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-2 overflow-hidden"
            >
              <div className="bg-popover/95 backdrop-blur-xl rounded-2xl p-3 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3.5 transition-all rounded-xl mb-1 last:mb-0 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/10 border border-cyan-500/30"
                          : "hover:bg-white/5"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className={`text-xs font-mono px-2 py-1 rounded-md ${
                        isActive 
                          ? "bg-cyan-500/20 text-cyan-400" 
                          : "bg-white/5 text-muted-foreground"
                      }`}>
                        {item.icon}
                      </span>
                      <span className={`font-medium ${
                        isActive ? "text-cyan-400" : "text-muted-foreground"
                      }`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="ml-auto"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
