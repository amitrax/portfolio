"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { ErrorBoundary } from "./ErrorBoundary"

const skills = [
  "Python", "C", "C++", "Java", "SQL",
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Tailwind CSS",
  "Pandas", "NumPy", "Scikit-learn",
  "Power BI", "Tableau", "Git", "GitHub"
]

interface SkillTextProps {
  text: string
  position: THREE.Vector3
  sphereRef: React.RefObject<THREE.Group | null>
}

function SkillText({ text, position, sphereRef }: SkillTextProps) {
  const [hovered, setHovered] = useState(false)
  const textRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ camera }) => {
    if (textRef.current && sphereRef.current) {
      // Get world position
      const worldPos = new THREE.Vector3()
      textRef.current.getWorldPosition(worldPos)
      
      // Billboard effect - face camera
      textRef.current.quaternion.copy(camera.quaternion)
      
      // Depth-based opacity
      const cameraDir = new THREE.Vector3()
      camera.getWorldDirection(cameraDir)
      const toText = worldPos.clone().sub(camera.position).normalize()
      const dot = cameraDir.dot(toText)
      const opacity = Math.max(0.3, Math.min(1, (dot + 0.5) * 1.2))
      
      if (textRef.current.material instanceof THREE.MeshBasicMaterial) {
        textRef.current.material.opacity = hovered ? 1 : opacity
      }
    }
    
    if (glowRef.current && hovered) {
      glowRef.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <group position={position}>
      {/* Glow sphere behind text on hover */}
      {hovered && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
      )}
      <Text
        ref={textRef}
        fontSize={hovered ? 0.22 : 0.18}
        color={hovered ? "#00ffff" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        outlineWidth={hovered ? 0.015 : 0}
        outlineColor="#00ffff"
        outlineBlur={hovered ? 0.02 : 0}
        material-transparent
        material-depthWrite={false}
      >
        {text}
      </Text>
    </group>
  )
}

function SphereGlow({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function OrbitRings({ isMobile }: { isMobile: boolean }) {
  const ringRef1 = useRef<THREE.Mesh>(null)
  const ringRef2 = useRef<THREE.Mesh>(null)
  const ringRef3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.1
    if (ringRef1.current) ringRef1.current.rotation.z = t
    if (ringRef2.current) ringRef2.current.rotation.z = -t * 0.7
    if (ringRef3.current) ringRef3.current.rotation.z = t * 0.5
  })

  return (
    <>
      <mesh ref={ringRef1} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.3, 0.005, isMobile ? 8 : 16, isMobile ? 50 : 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.003, isMobile ? 8 : 16, isMobile ? 50 : 100]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.08} />
      </mesh>
      <mesh ref={ringRef3} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <torusGeometry args={[2.5, 0.003, isMobile ? 8 : 16, isMobile ? 50 : 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.06} />
      </mesh>
    </>
  )
}

function SkillCloud({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const velocityRef = useRef(isMobile ? 0.08 : 0.15)
  const { gl } = useThree()
  
  const activeSkills = useMemo(() => isMobile ? skills.slice(0, 10) : skills, [isMobile])
  
  const positions = useMemo(() => {
    const points: THREE.Vector3[] = []
    const numPoints = activeSkills.length
    const phi = Math.PI * (3 - Math.sqrt(5))
    
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      
      points.push(new THREE.Vector3(x * 2, y * 2, z * 2))
    }
    
    return points
  }, [])

  // Inertia-based rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      // Natural slowdown with minimum speed - slower on mobile
      velocityRef.current = Math.max(isMobile ? 0.04 : 0.08, velocityRef.current * 0.998)
      groupRef.current.rotation.y += delta * velocityRef.current
    }
  })

  // Reset velocity on interaction — properly registered via useEffect
  useEffect(() => {
    const handlePointerDown = () => {
      velocityRef.current = isMobile ? 0.15 : 0.3
    }
    const canvas = gl.domElement
    canvas.addEventListener("pointerdown", handlePointerDown)
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [gl.domElement])

  return (
    <group ref={groupRef}>
      <SphereGlow isMobile={isMobile} />
      <OrbitRings isMobile={isMobile} />
      {activeSkills.map((skill, index) => (
        <SkillText
          key={skill}
          text={skill}
          position={positions[index]}
          sphereRef={groupRef}
        />
      ))}
    </group>
  )
}

export default function SkillSphere() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-full h-[250px] md:h-[550px] relative">
      {/* Outer glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 50%)",
        }}
      />
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 55 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true, powerPreference: "default", preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault()
              console.warn('WebGL context lost')
            })
          }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[-10, -10, -10]} intensity={0.4} color="#3b82f6" />
          <SkillCloud isMobile={isMobile} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={isMobile ? 0.15 : 0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 3 / 4}
            dampingFactor={0.05}
            enableDamping
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
