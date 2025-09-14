import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

export const CosmicBackground = () => {
  const meshRef = useRef()
  const starsRef = useRef()
  const [starTexture, setStarTexture] = useState(null)

  // Создаем текстуру после монтирования компонента
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d')
    
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)') 
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 64)
    
    const texture = new THREE.CanvasTexture(canvas)
    setStarTexture(texture)
    
    // Cleanup
    return () => texture.dispose()
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.05) * 0.02
    }
    
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001
      starsRef.current.rotation.y += 0.0002
    }
  })

  // Создаем позиции для звезд
  const starPositions = useRef(
    new Float32Array(555000 * 3).map(() => (Math.random() - 0.5) * 200)
  )

  // Если текстура еще не загружена, не рендерим stars
  if (!starTexture) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[100, 64, 64]} />
        <meshBasicMaterial color="#000010" side={THREE.BackSide} />
      </mesh>
    )
  }

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[100, 64, 64]} />
        <meshBasicMaterial color="#000010" side={THREE.BackSide} />
      </mesh>

      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={555000}
            array={starPositions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.1} 
          sizeAttenuation 
          color="#FFFFFF"
          transparent
          opacity={0.8}
          alphaTest={0.5}
          blending={THREE.AdditiveBlending}
          map={starTexture}
          alphaMap={starTexture}
        />
      </points>
    </group>
  )
}