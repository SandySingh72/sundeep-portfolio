import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// ── Shape texture generator ───────────────────────────────────────────────────
function makeShapeTexture(shape) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()

  if (shape === 'circle') {
    ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
  } else if (shape === 'triangle') {
    ctx.moveTo(size / 2, 2)
    ctx.lineTo(size - 2, size - 2)
    ctx.lineTo(2, size - 2)
    ctx.closePath()
  } else if (shape === 'hexagon') {
    const cx = size / 2, cy = size / 2, r = size / 2 - 2
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      i === 0
        ? ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
        : ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
    }
    ctx.closePath()
  } else if (shape === 'diamond') {
    ctx.moveTo(size / 2, 2)
    ctx.lineTo(size - 2, size / 2)
    ctx.lineTo(size / 2, size - 2)
    ctx.lineTo(2, size / 2)
    ctx.closePath()
  } else {
    // square
    ctx.rect(4, 4, size - 8, size - 8)
  }

  ctx.fill()
  return new THREE.CanvasTexture(canvas)
}

// ── Particle field ────────────────────────────────────────────────────────────
function ParticleField() {
  const shapes = ['circle', 'triangle', 'hexagon', 'diamond', 'square']
  const groupRef = useRef()

  const groups = useMemo(() => {
    return shapes.map((shape) => {
      const count = 360
      const positions = new Float32Array(count * 3)
      const speeds = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 28
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14
        speeds[i] = 0.2 + Math.random() * 0.5
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      return { shape, geo, speeds }
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.018
    groupRef.current.rotation.x = Math.sin(t * 0.012) * 0.08

    groupRef.current.children.forEach((points, idx) => {
      const pos = points.geometry.attributes.position
      const speeds = groups[idx].speeds
      for (let i = 0; i < speeds.length; i++) {
        let y = pos.getY(i) + speeds[i] * 0.003
        if (y > 8) y = -8
        pos.setY(i, y)
      }
      pos.needsUpdate = true
    })
  })

  return (
    <group ref={groupRef}>
      {groups.map(({ shape, geo }) => (
        <points key={shape} geometry={geo}>
          <pointsMaterial
            size={shape === 'circle' ? 0.055 : 0.07}
            map={makeShapeTexture(shape)}
            color="#7dd3fc"
            transparent
            opacity={0.5}
            alphaTest={0.1}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  )
}

// ── Wireframe globe ───────────────────────────────────────────────────────────
function WireframeGlobe() {
  const groupRef = useRef()
  const glowRef  = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.rotation.y = t * 0.12
    groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.06
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.07 + Math.sin(t * 0.9) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.12, 32, 32]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Main wireframe globe */}
      <mesh>
        <sphereGeometry args={[2.0, 28, 18]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Bright equator ring */}
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[2.0, 0.008, 8, 120]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.7} />
      </mesh>

      {/* Second ring tilted */}
      <mesh rotation-x={Math.PI / 3.5}>
        <torusGeometry args={[2.0, 0.005, 8, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* Bright core */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#38bdf8"
          emissiveIntensity={2.5}
        />
      </mesh>
    </group>
  )
}

// ── Canvas export ─────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
      >
      <color attach="background" args={['#020c1b']} />
      <ambientLight intensity={0.4} />

      <pointLight position={[4, 4, 4]}    intensity={1.2} color="#60a5fa" />
      <pointLight position={[-4, -3, -4]} intensity={0.5} color="#1e40af" />
      <pointLight position={[0, 6, 0]}    intensity={0.6} color="#ffffff" />
      <ParticleField />
      <WireframeGlobe />
    </Canvas>
  )
}
