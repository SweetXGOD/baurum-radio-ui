import { Text } from '@react-three/drei'
import * as THREE from 'three'

export const GoldenText = () => {
  return (
    <group position={[0, 3, 0]}>
      {/* Основная надпись BAURUM RADIO */}
      <Text
        font="/fonts/helvetiker_bold.typeface.json"
        fontSize={0.8}
        color="#FFD700"
        letterSpacing={0.05}
        position={[0, 0.5, 0]}
      >
        BAURUM RADIO
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={2}
        />
      </Text>

      {/* Золотая линия */}
      <mesh position={[0, 0.2, 0]}>
        <planeGeometry args={[3, 0.02]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Подпись "искусственный интеллект" */}
      <Text
        font="/fonts/helvetiker_regular.typeface.json"
        fontSize={0.3}
        color="#C0C0C0"
        position={[0, -0.2, 0]}
      >
        искусственный интеллект
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={0.7}
          roughness={0.3}
        />
      </Text>
    </group>
  )
}