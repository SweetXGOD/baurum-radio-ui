import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const AuraField = ({ position, color, isSelected = false }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      // Пульсация ауры
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.y = pulse
      
      // Если выбрана - сжимаемся
      if (isSelected) {
        meshRef.current.scale.x = 0.3
        meshRef.current.scale.z = 0.3
      } else {
        meshRef.current.scale.x = 1
        meshRef.current.scale.z = 1
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 3, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}