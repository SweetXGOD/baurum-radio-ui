import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export const MagicCard = ({ element, position, onClick, isSelected }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Время для анимаций
    const time = state.clock.elapsedTime;
    
    // 1. ГЛУБОКОЕ ДЫХАНИЕ - основа жизни
    const heartBeat = Math.sin(time * 0.8) * 0.03;
    const breath = Math.sin(time * 2.5) * 0.07;
    const pulse = heartBeat + breath + 1;
    
    // 2. ЦВЕТОВОЕ ДЫХАНИЕ - смена энергетических состояний
    const hueShift = (Math.sin(time * 0.3) + 1) * 0.1;
    const energyPulse = Math.sin(time * 4) * 0.2;
    
    const baseColor = new THREE.Color(getElementColor());
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl);
    
    hsl.h += hueShift;
    hsl.s += energyPulse * 0.3;
    hsl.l += breath * 0.1;
    
    // 3. ПЛАВУЧЕСТЬ И ЛЕВИТАЦИЯ - магическое парение (ИСПРАВЛЕНО: убрано смещение по X)
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    meshRef.current.rotation.x = Math.cos(time * 0.7) * 0.05;
    
    // Парение только вверх-вниз (оси Y и Z для глубины)
    if (position && position.length >= 3) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.15;
      meshRef.current.position.z = position[2] + Math.cos(time * 0.6) * 0.05; // Легкое движение вглубь
    }
    
    // 4. АНИМАЦИЯ ВЫБОРА - превращение в чистую энергию
    if (isSelected && animationProgress < 1) {
      setAnimationProgress(prev => Math.min(prev + delta * 2.5, 1));
    } else if (!isSelected && animationProgress > 0) {
      setAnimationProgress(prev => Math.max(prev - delta * 1.5, 0));
    }
    
    // 5. ФИНАЛЬНАЯ ТРАНСФОРМАЦИЯ
    meshRef.current.scale.set(pulse, pulse, pulse);
    meshRef.current.children[0].material.color.setHSL(hsl.h, hsl.s, hsl.l);
    
    if (animationProgress > 0) {
      meshRef.current.scale.x = pulse + animationProgress * 0.5;
      meshRef.current.scale.y = pulse + animationProgress * 0.5;
      meshRef.current.scale.z = pulse + animationProgress * 0.3;
      meshRef.current.children[0].material.opacity = 1 - animationProgress * 0.5;
    }
  })

  const getElementColor = () => {
    const colors = {
      'air': '#8A2BE2',     // маджента
      'water': '#4A00E0',   // фиолет
      'earth': '#00D4AA',   // бирюза
      'fire': '#E25822'     // огненный
    }
    return colors[element]
  }

  const handleClick = () => {
    if (isSelected) return;
    
    // ТАКТИЛЬНАЯ МАГИЯ - вибрация для разных стихий
    const vibrationPatterns = {
      'air': [50, 100, 50],     // Легкое касание, как ветер
      'water': [100, 150, 100], // Плавные волны  
      'earth': [200, 100, 200], // Глубокие вибрации
      'fire': [50, 50, 50, 200] // Короткие всплески энергии
    }
    
    // Активируем вибрацию если устройство поддерживает
    if ('vibrate' in navigator) {
      const pattern = vibrationPatterns[element] || [100]
      navigator.vibrate(pattern)
      console.log(`📳 Вибрация для ${element}:`, pattern)
    }
    
    console.log("Клик по карте!", element)
    onClick()
  };

  return (
    <group 
      ref={meshRef} 
      position={position || [0, 0, 0]}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    >
      {/* Основная карта */}
      <mesh>
        <boxGeometry args={[1, 1.6, 0.1]} /> {/* 3D-бокс вместо плоскости */}
        <meshPhysicalMaterial 
          color={getElementColor()} 
          transparent={true}
          opacity={1}
          transmission={0.9}
          roughness={0.05}
          metalness={0.95}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={3.0}
          ior={1.5}
          thickness={0.1}
        />
      </mesh>

      {/* Светящиеся ребра */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1.6, 0.1)]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}