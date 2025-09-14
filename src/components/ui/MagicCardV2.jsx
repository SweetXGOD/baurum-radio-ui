import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export const MagicCardV2 = ({ element, position, rotation, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Парение и пульсация
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.15;
    const pulse = Math.sin(time * 2) * 0.05 + 1;
    meshRef.current.scale.setScalar(pulse);
    
    // Медленное вращение вокруг своей оси
    meshRef.current.rotation.y += 0.003;
  })

  const getElementColor = () => {
    const colors = {
      'air': '#8A2BE2',
      'water': '#4A00E0', 
      'earth': '#00D4AA',
      'fire': '#E25822'
    }
    return colors[element]
  }

  const handleClick = () => {
    if (isSelected) return;
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onClick();
  };

  return (
    <group 
      ref={meshRef} 
      position={position}
      rotation={rotation} // <- Теперь карта принимает параметр вращения!
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh>
        <boxGeometry args={[1, 1.6, 0.1]} />
        <meshPhysicalMaterial 
          color={getElementColor()} 
          transparent={true}
          opacity={0.9}
          transmission={0.95}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1.6, 0.1)]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}