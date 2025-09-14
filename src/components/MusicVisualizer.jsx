import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export const MusicVisualizer = () => {
  const barsRef = useRef([])
  
  useFrame((state) => {
    // Анимация визуализатора под музыку
    barsRef.current.forEach((bar, i) => {
      if (bar) {
        const height = Math.sin(state.clock.elapsedTime * 2 + i * 0.3) * 0.5 + 1
        bar.scale.y = height
      }
    })
  })

  return (
    <group position={[0, -2, 0]}>
      {[...Array(16)].map((_, i) => (
        <mesh
          key={i}
          ref={el => barsRef.current[i] = el}
          position={[i - 7.5, 0.5, 0]}
        >
          <boxGeometry args={[0.4, 1, 0.4]} />
          <meshStandardMaterial color="#4A00E0" />
        </mesh>
      ))}
    </group>
  )
}