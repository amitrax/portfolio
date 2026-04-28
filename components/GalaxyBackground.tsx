"use client"

import React, { useCallback, useEffect, useState, useRef } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine, ISourceOptions } from "@tsparticles/engine"

const GalaxyBackground = React.memo(function GalaxyBackground() {
  const [init, setInit] = useState(false)
  const nebulaRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Mouse parallax effect without state updates to prevent re-renders
  useEffect(() => {
    let rafId: number
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 20
      targetY = (e.clientY / window.innerHeight - 0.5) * 20
    }

    const animate = () => {
      if (nebulaRef.current) {
        nebulaRef.current.style.transform = `translate(${targetX * 0.5}px, ${targetY * 0.5}px)`
      }
      if (particlesRef.current) {
        particlesRef.current.style.transform = `translate(${targetX * 0.3}px, ${targetY * 0.3}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    rafId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
          parallax: {
            enable: true,
            force: 40,
            smooth: 80,
          },
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.3,
            color: "#06b6d4",
          },
        },
      },
    },
    particles: {
      color: {
        value: ["#ffffff", "#06b6d4", "#0ea5e9", "#3b82f6", "#a855f7"],
      },
      links: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true,
        speed: 0.2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
        value: 120, // Reduced from 250 for better performance
      },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.3, max: 3 },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
          color: {
            value: ["#ffffff", "#06b6d4"],
          },
        },
      },
    },
    detectRetina: true,
  }

  if (!init) return null

  return (
    <>
      {/* Deep space gradient base */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-500"
        style={{
          background: "linear-gradient(180deg, var(--background) 0%, var(--popover) 25%, var(--card) 50%, var(--popover) 75%, var(--background) 100%)"
        }}
      />

      {/* Nebula clouds with parallax - Hidden on mobile for performance */}
      <div 
        ref={nebulaRef}
        className="hidden md:block fixed inset-0 z-0 pointer-events-none transition-transform duration-300 ease-out"
      >
        {/* Primary nebula - cyan/blue */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full animate-nebula-pulse"
          style={{
            top: "10%",
            left: "60%",
            background: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Secondary nebula - purple/blue */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-nebula-pulse-slow"
          style={{
            top: "50%",
            left: "10%",
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        {/* Tertiary nebula - accent */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full animate-nebula-drift"
          style={{
            bottom: "20%",
            right: "20%",
            background: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.05) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Hero section radial glow */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Animated Wave Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Wave 1 - Bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-64 animate-wave-1"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.05)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.05)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient1)"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,213.3C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        {/* Wave 2 - Bottom overlay */}
        <svg
          className="absolute bottom-0 left-0 w-full h-48 animate-wave-2"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.03)" />
              <stop offset="50%" stopColor="rgba(6, 182, 212, 0.06)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.03)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient2)"
            d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Wave 3 - Top subtle */}
        <svg
          className="absolute top-0 left-0 w-full h-32 rotate-180 animate-wave-3"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.03)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.04)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.03)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient3)"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Floating wave lines (Hidden on mobile for performance) */}
        <svg
          className="hidden md:block absolute top-1/3 left-0 w-full h-64 opacity-30 animate-wave-float"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
              <stop offset="20%" stopColor="rgba(6, 182, 212, 0.5)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="80%" stopColor="rgba(139, 92, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Second floating wave line (Hidden on mobile for performance) */}
        <svg
          className="hidden md:block absolute top-2/3 left-0 w-full h-64 opacity-20 animate-wave-float-reverse"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="url(#lineGradient2)"
            strokeWidth="1.5"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224"
          />
          <defs>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="30%" stopColor="rgba(6, 182, 212, 0.4)" />
              <stop offset="70%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Particles - Enabled on mobile */}
      <div ref={particlesRef} className="fixed inset-0 z-0 transition-transform duration-200 ease-out pointer-events-none">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="w-full h-full pointer-events-auto"
        />
      </div>

      {/* Shooting stars (Hidden on mobile for performance) */}
      <div className="hidden md:block">
        <ShootingStars />
      </div>
    </>
  )
})

export default GalaxyBackground

function ShootingStars() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const createStar = () => {
      const id = Date.now() + Math.random()
      const x = Math.random() * 60 
      const y = Math.random() * 40
      const size = 80 + Math.random() * 60
      const duration = 0.8 + Math.random() * 0.4

      setStars(prev => [...prev, { id, x, y, size, duration }])
      
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== id))
      }, duration * 1000 + 200)
    }

    const scheduleNextStar = () => {
      const delay = 4000 + Math.random() * 4000
      timeoutId = setTimeout(() => {
        createStar()
        scheduleNextStar()
      }, delay)
    }

    const initialTimer = setTimeout(() => {
      createStar()
      scheduleNextStar()
    }, 1500)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(initialTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute shooting-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: "2px",
            background: "linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(6, 182, 212, 0.6) 30%, rgba(255, 255, 255, 0.9) 80%, #ffffff 100%)",
            borderRadius: "100%",
            boxShadow: "0 0 6px rgba(6, 182, 212, 0.8), 0 0 12px rgba(6, 182, 212, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
