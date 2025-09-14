import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export const QuantumPortal = ({ position, color, active }) => {
  const portalRef = useRef()

  useFrame((state, delta) => {
    if (portalRef.current) {
      // Вращение портала
      portalRef.current.rotation.x += delta * 0.5
      portalRef.current.rotation.y += delta * 0.8
      portalRef.current.rotation.z += delta * 0.3
      
      // Пульсация энергии
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      portalRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group position={position}>
      {/* Внешнее кольцо портала */}
      <mesh ref={portalRef}>
        <ringGeometry args={[1.0, 1.3, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.7}
          blending={2}
        />
      </mesh>

      {/* Внутреннее кольцо */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[0.7, 0.9, 32]} />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Энергетическое ядро */}
      {active && (
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.4}
            blending={2}
          />
        </mesh>
      )}
    </group>
  )
}