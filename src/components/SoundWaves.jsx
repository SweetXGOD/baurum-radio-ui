import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'

export const SoundWaves = ({ position, visible, color }) => {
  const groupRef = useRef()
  const [rings, setRings] = useState([])

  useEffect(() => {
    if (visible) {
      // Создаем 3 кольца для волн
      setRings([
        { scale: 0.5, opacity: 1.0 },
        { scale: 0.3, opacity: 0.7 }, 
        { scale: 0.1, opacity: 0.4 }
      ])
    } else {
      setRings([])
    }
  }, [visible])

  useFrame((state, delta) => {
    if (groupRef.current && visible) {
      // Анимируем кольца
      setRings(currentRings => 
        currentRings.map(ring => ({
          scale: ring.scale + delta * 2,
          opacity: ring.opacity - delta * 0.8
        })).filter(ring => ring.opacity > 0)
      )
    }
  })

  if (!visible || rings.length === 0) return null

  return (
    <group ref={groupRef} position={position}>
      {rings.map((ring, index) => (
        <mesh key={index} scale={ring.scale}>
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}
    </group>
  )
}