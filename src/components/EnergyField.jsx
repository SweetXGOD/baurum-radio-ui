import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Points, PointMaterial } from '@react-three/drei'

export const EnergyField = ({ position, color = '#4A00E0' }) => {
  const pointsRef = useRef()
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.1
      pointsRef.current.rotation.y += delta * 0.2
      pointsRef.current.rotation.z += delta * 0.05
    }
  })

  // Создаем частицы в сфере
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 2 * Math.cbrt(Math.random())
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
  }

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}