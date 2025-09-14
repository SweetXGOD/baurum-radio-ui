import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { QuantumPortal } from './QuantumPortal'

export const SlavicRune = ({ rune, position = [0, 2, 0] }) => {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Плавное парение руны
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  const getRuneSymbol = () => {
    const symbols = {
      'air': '🌬️',     // Символ Воздуха
      'water': '💧',   // Символ Воды
      'earth': '🌍',   // Символ Земли
      'fire': '🔥'     // Символ Огня
    }
    return symbols[rune] || '✨'
  }

  const getRuneColor = () => {
    const colors = {
      'air': '#8A2BE2',     // фиолетовый
      'water': '#4A00E0',   // синий
      'earth': '#00D4AA',   // бирюзовый
      'fire': '#E25822'     // оранжевый
    }
    return colors[rune] || '#FFFFFF'
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Квантовый портал */}
      <QuantumPortal 
        position={[0, -0.5, 0]}
        color={getRuneColor()}
        active={true}
      />
      
      {/* Светящаяся руна */}
      <Text
        position={[0, 0, 0.5]}
        fontSize={1.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        renderOrder={1}
      >
        {getRuneSymbol()}
      </Text>

      {/* Свечение вокруг руны */}
      <Text
        position={[0, 0, 0.4]}
        fontSize={1.4}
        color={getRuneColor()}
        anchorX="center"
        anchorY="middle"
        opacity={0.3}
        renderOrder={0}
      >
        {getRuneSymbol()}
      </Text>
    </group>
  )
}