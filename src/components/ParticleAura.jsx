import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export const ParticleAura = ({ position, color }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Простое свечение вместо сложных частиц */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={2}
        />
      </mesh>
    </group>
  )
}